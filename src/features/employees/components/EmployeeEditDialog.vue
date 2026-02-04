<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100vw-2rem)] max-w-[520px] rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-auto"
    >
      <DialogHeader>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogDescription>Form placeholder (no saving yet)</DialogDescription>
      </DialogHeader>

      <div class="grid gap-3 py-2">
        <div class="grid gap-2">
          <label class="text-sm text-muted-foreground">Full Name</label>
          <Input :model-value="employee.fullName" disabled />
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Occupation</label>
            <Input :model-value="employee.occupation" disabled />
          </div>

          <div class="grid gap-2">
            <label class="text-sm text-muted-foreground">Department</label>
            <Input :model-value="employee.department" disabled />
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col gap-2 sm:flex-row sm:justify-end">
        <Button class="w-full sm:w-auto" variant="outline" @click="open = false"
          >Cancel</Button
        >
        <Button class="w-full sm:w-auto" @click="open = false">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { EmployeeRowVm } from "../model/employee.types";

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

defineProps<{ employee: EmployeeRowVm }>();

const open = defineModel<boolean>("open", { default: false });
</script>
