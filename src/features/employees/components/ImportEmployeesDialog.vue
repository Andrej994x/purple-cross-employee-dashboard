<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText } from "lucide-vue-next";

import type { EmployeeRowVm } from "@/features/employees/model/employee.types";

const emit = defineEmits<{
  (e: "imported", payload: { added: EmployeeRowVm[]; skipped: number }): void;
}>();

const open = ref(false);
const file = ref<File | null>(null);
const error = ref<string | null>(null);
const isSubmitting = ref(false);

const onPickFile = (e: Event) => {
  error.value = null;
  const target = e.target as HTMLInputElement;
  const f = target.files?.[0] ?? null;

  if (!f) {
    file.value = null;
    return;
  }

  const isCsv = f.type === "text/csv" || f.name.toLowerCase().endsWith(".csv");
  if (!isCsv) {
    file.value = null;
    error.value = "Please attach a .csv file.";
    return;
  }

  file.value = f;
};

// CSV helpers 
const splitCsvLine = (line: string) => {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur.trim());
  return out;
};

const normalizeHeader = (h: string) =>
  h
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase();

const val = (obj: Record<string, string>, key: string) =>
  (obj[key] ?? "").trim();

const toEmployeeVm = (obj: Record<string, string>): EmployeeRowVm => {
  const id = val(obj, "id") || crypto.randomUUID();

  const firstName = val(obj, "firstname");
  const lastName = val(obj, "lastname");
  const fullName = `${firstName} ${lastName}`.trim() || "(No name)";

  const occupation = val(obj, "occupation") || val(obj, "title");
  const department = val(obj, "department");

  const employmentDate = val(obj, "employmentdate");
  const terminationDate = val(obj, "terminationdate");

  const employmentStatus = "Currently employed";
  const terminationStatus = terminationDate ? "To be terminated" : "/";

  return {
    id,
    fullName,
    occupation,
    department,
    employmentDate,
    terminationDate,
    employmentStatus,
    terminationStatus,
  } as EmployeeRowVm;
};

const handleImport = async () => {
  if (!file.value) return;

  try {
    isSubmitting.value = true;
    error.value = null;

    const text = await file.value.text();
    const rawLines: string[] = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (rawLines.length < 2) {
      error.value = "CSV must contain header + data.";
      return;
    }

    const headerLine = rawLines[0] as string;
    const headers = splitCsvLine(headerLine).map(normalizeHeader);

    const added: EmployeeRowVm[] = [];
    let skipped = 0;

    for (let i = 1; i < rawLines.length; i++) {
      const line = rawLines[i] as string;
      const cols = splitCsvLine(line);

      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = (cols[idx] ?? "").trim();
      });

      const hasName =
        (val(obj, "firstname") || val(obj, "lastname")).length > 0;

      if (!hasName) {
        skipped++;
        continue;
      }

      added.push(toEmployeeVm(obj));
    }

    emit("imported", { added, skipped });

    open.value = false;
    file.value = null;
  } catch (e: any) {
    error.value = "Import failed";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button class="gap-2 cursor-pointer">
        <Upload class="h-4 w-4" />
        Import
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Import employees</DialogTitle>
        <DialogDescription>
          Upload a CSV file with employee data.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <Alert>
          <FileText class="h-4 w-4" />
        
          <AlertDescription class="leading-relaxed">
            Please upload a CSV file with the following columns:
            <br />
            <span class="font-medium">
              First Name, Last Name, Email, Job Title, Department, Employment
              Date, Termination Date
            </span>
            <br /><br />
            Dates should be in format:
            <span class="font-medium">YYYY-MM-DD</span>
            <br />
            <span class="text-xs text-muted-foreground">
              Example: 2023-01-10
            </span>
          </AlertDescription>
        </Alert>

        <div class="space-y-2">
          <label class="text-sm font-medium">Attach CSV file</label>
          <Input type="file" accept=".csv,text/csv" @change="onPickFile" />
        </div>

        <p v-if="file" class="text-sm">
          Selected: <span class="font-medium">{{ file.name }}</span>
        </p>

        <p v-if="error" class="text-sm text-destructive">
          {{ error }}
        </p>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="open = false"> Cancel </Button>
        <Button :disabled="!file || isSubmitting" @click="handleImport">
          {{ isSubmitting ? "Importing..." : "Import" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
