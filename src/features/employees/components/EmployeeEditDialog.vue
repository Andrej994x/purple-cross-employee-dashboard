<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100vw-2rem)] max-w-[520px] rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-auto"
    >
      <DialogHeader>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogDescription>Update employee info and save changes.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-3 py-2">
        <div class="grid gap-2">
          <label class="text-sm text-muted-foreground">Full name</label>
          <Input v-model="form.fullName" />
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Occupation</label>
            <Select :model-value="form.occupation" @update:model-value="onOccupationChange">
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="o in occupations" :key="o" :value="o">{{ o }}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Department</label>
            <Select :model-value="form.department" @update:model-value="onDepartmentChange">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="d in departments" :key="d" :value="d">{{ d }}</SelectItem>
              </SelectContent>
            </Select>
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
});

const { toast } = useToast();


watch(
  open,
  async isOpen => {
    if (!isOpen) return;

    
    form.fullName = props.employee.fullName;
    form.occupation = props.employee.occupation;
    form.department = props.employee.department;

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
  { immediate: false },
);

const onOccupationChange = (val: AcceptableValue) => {
  form.occupation = val == null ? "" : String(val);
};

const onDepartmentChange = (val: AcceptableValue) => {
  form.department = val == null ? "" : String(val);
};

const canSave = computed(() => {
  return form.fullName.trim().length > 0 && form.occupation.trim().length > 0 && form.department.trim().length > 0;
});

const onSave = () => {
  const updated: EmployeeRowVm = {
    ...props.employee,
    fullName: form.fullName.trim(),
    occupation: form.occupation,
    department: form.department,
  };

  emit("save", updated);
  
   toast({
    title: "Employee updated",
    description: `${updated.fullName} was successfully updated.`,
  });
  open.value = false;
};


</script>
