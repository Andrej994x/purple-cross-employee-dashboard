<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100vw-2rem)] max-w-[560px] rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-auto"
    >
      <DialogHeader>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogDescription>Update employee info and save changes.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div class="grid gap-2">
          <label class="text-sm text-muted-foreground">Full name *</label>
          <Input v-model="form.fullName" />
          <p v-if="errors.fullName" class="text-sm text-destructive">{{ errors.fullName }}</p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Occupation *</label>

            <Select :model-value="form.occupation" @update:model-value="onOccupationChange">
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="o in occupations" :key="o" :value="o">{{ o }}</SelectItem>
              </SelectContent>
            </Select>

            <p v-if="errors.occupation" class="text-sm text-destructive">{{ errors.occupation }}</p>
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Department *</label>

            <Select :model-value="form.department" @update:model-value="onDepartmentChange">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="d in departments" :key="d" :value="d">{{ d }}</SelectItem>
              </SelectContent>
            </Select>

            <p v-if="errors.department" class="text-sm text-destructive">{{ errors.department }}</p>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Date of Employment</label>
            <Input v-model="form.employmentDate" type="date" />
            <p v-if="errors.employmentDate" class="text-sm text-destructive">{{ errors.employmentDate }}</p>
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Termination Date</label>
            <Input v-model="form.terminationDate" type="date" />
            <p v-if="errors.terminationDate" class="text-sm text-destructive">{{ errors.terminationDate }}</p>
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col gap-2 sm:flex-row sm:justify-end">
        <Button class="w-full sm:w-auto" variant="outline" @click="open = false">Cancel</Button>
        <Button class="w-full sm:w-auto" :disabled="!canSave" @click="onSave">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import type { AcceptableValue } from "reka-ui";

import type { EmployeeRowVm } from "../model/employee.types";
import { employeesService } from "@/features/api/employees.mock";
import { useToast } from "@/components/ui/toast";

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

const props = defineProps<{ employee: EmployeeRowVm }>();
const emit = defineEmits<{ (e: "save", value: EmployeeRowVm): void }>();

const open = defineModel<boolean>("open", { default: false });

const occupations = ref<string[]>([]);
const departments = ref<string[]>([]);

const form = reactive({
  fullName: "",
  occupation: "",
  department: "",
  employmentDate: "", 
  terminationDate: "", 
});

const errors = reactive({
  fullName: "",
  occupation: "",
  department: "",
  employmentDate: "",
  terminationDate: "",
});

const { toast } = useToast();

const clearErrors = () => {
  errors.fullName = "";
  errors.occupation = "";
  errors.department = "";
  errors.employmentDate = "";
  errors.terminationDate = "";
};

const toDateOrNull = (s: string) => {
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
};

const validate = () => {
  clearErrors();

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.occupation.trim()) errors.occupation = "Occupation is required";
  if (!form.department.trim()) errors.department = "Department is required";

  const emp = toDateOrNull(form.employmentDate);
  const term = toDateOrNull(form.terminationDate);

  if (form.employmentDate && !emp) errors.employmentDate = "Invalid employment date";
  if (form.terminationDate && !term) errors.terminationDate = "Invalid termination date";

  // business rules
  if (term && !emp) {
    errors.terminationDate = "Termination date requires employment date";
  }

  if (emp && term && term.getTime() < emp.getTime()) {
    errors.terminationDate = "Termination date cannot be before employment date";
  }

  return (
    !errors.fullName &&
    !errors.occupation &&
    !errors.department &&
    !errors.employmentDate &&
    !errors.terminationDate
  );
};

const canSave = computed(() => {
 
  return form.fullName.trim() && form.occupation.trim() && form.department.trim();
});

watch(
  open,
  async isOpen => {
    if (!isOpen) return;

    clearErrors();

    // prefill
    form.fullName = props.employee.fullName ?? "";
    form.occupation = props.employee.occupation ?? "";
    form.department = props.employee.department ?? "";
    form.employmentDate = props.employee.employmentDate ?? "";
    form.terminationDate = props.employee.terminationDate ?? "";

    // load dropdown options from service
    const meta = await employeesService.meta();
    occupations.value = meta.occupations;
    departments.value = meta.departments;

    if (form.occupation && !occupations.value.includes(form.occupation)) {
      occupations.value = [form.occupation, ...occupations.value];
    }
    if (form.department && !departments.value.includes(form.department)) {
      departments.value = [form.department, ...departments.value];
    }
  },
);

const onOccupationChange = (val: AcceptableValue) => {
  form.occupation = val == null ? "" : String(val);
};

const onDepartmentChange = (val: AcceptableValue) => {
  form.department = val == null ? "" : String(val);
};

const computeStatuses = (employmentDate: string, terminationDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const emp = toDateOrNull(employmentDate);
  const term = toDateOrNull(terminationDate);

  const employmentStatus =
    !emp ? "/" : emp.getTime() > today.getTime() ? "Employed soon" : "Currently employed";

  const terminationStatus =
    !term ? "/" : term.getTime() > today.getTime() ? "To be terminated" : "Terminated";

  return { employmentStatus, terminationStatus };
};

const onSave = () => {
  if (!validate()) return;

  const fullName = form.fullName.trim();

  const { employmentStatus, terminationStatus } = computeStatuses(
    form.employmentDate,
    form.terminationDate,
  );

  const updated: EmployeeRowVm = {
    ...props.employee,
    fullName,
    occupation: form.occupation,
    department: form.department,
    employmentDate: form.employmentDate || "",
    terminationDate: form.terminationDate || "",
    employmentStatus,
    terminationStatus,
  };

  emit("save", updated);

  toast({
    title: "Employee updated",
    description: `${updated.fullName} was successfully updated.`,
  });

  open.value = false;
};
</script>
