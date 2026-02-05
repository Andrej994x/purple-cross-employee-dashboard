<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100vw-2rem)] max-w-[560px] rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-auto"
    >
      <DialogHeader>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogDescription>Fill out details and save.</DialogDescription>
      </DialogHeader>

      <form class="grid gap-4 py-2" @submit="onSubmit">
        <div class="grid gap-2">
          <label class="text-sm text-muted-foreground">Code *</label>
          <Input v-model="code" placeholder="e.g. EMP-001" />
          <p v-if="errors.code" class="text-sm text-destructive">
            {{ errors.code }}
          </p>
        </div>

        <div class="grid gap-2">
          <label class="text-sm text-muted-foreground">Full Name *</label>
          <Input v-model="fullName" placeholder="e.g. Alan Anderson" />
          <p v-if="errors.fullName" class="text-sm text-destructive">
            {{ errors.fullName }}
          </p>
        </div>



        <div class="grid gap-2 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Occupation *</label>

            <Select :model-value="occupation" @update:model-value="setOccupation">
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="o in occupations" :key="o" :value="o">
                  {{ o }}
                </SelectItem>
              </SelectContent>
            </Select>

            <p v-if="errors.occupation" class="text-sm text-destructive">
              {{ errors.occupation }}
            </p>
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Department *</label>

            <Select :model-value="department" @update:model-value="setDepartment">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="d in departments" :key="d" :value="d">
                  {{ d }}
                </SelectItem>
              </SelectContent>
            </Select>

            <p v-if="errors.department" class="text-sm text-destructive">
              {{ errors.department }}
            </p>
          </div>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Date of Employment</label>
            <Input v-model="employmentDate" type="date" />
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Termination Date</label>
            <Input v-model="terminationDate" type="date" />
            <p v-if="errors.terminationDate" class="text-sm text-destructive">
              {{ errors.terminationDate }}
            </p>
          </div>
        </div>

        <DialogFooter class="flex-col gap-2 sm:flex-row sm:justify-end">
          <Button class="w-full sm:w-auto" type="button" variant="outline" @click="onCancel">
            Cancel
          </Button>
          <Button class="w-full sm:w-auto" type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { AcceptableValue } from "reka-ui";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { EmployeeRowVm } from "../model/employee.types";

const open = defineModel<boolean>("open", { default: false });

const props = defineProps<{
  occupations: string[];
  departments: string[];
}>();

const emit = defineEmits<{
  (e: "created", employee: EmployeeRowVm): void;
}>();

const schema = toTypedSchema(
  z
    .object({
      code: z.string().trim().min(1, "Code is required"),
      fullName: z.string().trim().min(1, "Full Name is required"),
      occupation: z.string().trim().min(1, "Occupation is required"),
      department: z.string().trim().min(1, "Department is required"),
      employmentDate: z.string().optional(),
      terminationDate: z.string().optional(),
    })
    .refine(
      v => {
        if (!v.employmentDate || !v.terminationDate) return true;
        return new Date(v.terminationDate).getTime() >= new Date(v.employmentDate).getTime();
      },
      { message: "Termination date cannot be before employment date", path: ["terminationDate"] }
    )
);

const { errors, defineField, handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    code: "",
    fullName: "",
    occupation: "",
    department: "",
    employmentDate: "",
    terminationDate: "",
  },
});

const [code] = defineField("code");
const [fullName] = defineField("fullName");
const [occupation] = defineField("occupation");
const [department] = defineField("department");
const [employmentDate] = defineField("employmentDate");
const [terminationDate] = defineField("terminationDate");

const setOccupation = (val: AcceptableValue) => {
  setFieldValue("occupation", String(val ?? ""));
};

const setDepartment = (val: AcceptableValue) => {
  setFieldValue("department", String(val ?? ""));
};

const onSubmit = handleSubmit(v => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const empDate = v.employmentDate || "";
  const termDate = v.terminationDate || "";

  const employmentStatus = empDate
    ? new Date(empDate).getTime() > today.getTime()
      ? "Employed soon"
      : "Currently employed"
    : "/";

  const terminationStatus = termDate
    ? new Date(termDate).getTime() > today.getTime()
      ? "To be terminated"
      : "Terminated"
    : "/";

  const newRow: EmployeeRowVm = {
    id: v.code,
    fullName: v.fullName,
    occupation: v.occupation,
    department: v.department,
    employmentDate: empDate,
    employmentStatus,
    terminationDate: termDate,
    terminationStatus,
  };

  emit("created", newRow);
  open.value = false;
});

const onCancel = () => {
  open.value = false;
};

watch(open, isOpen => {
  if (isOpen) resetForm();
});
</script>
