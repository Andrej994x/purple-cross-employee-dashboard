<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100vw-2rem)] max-w-[460px] rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-auto"
    >
      <DialogHeader>
        <DialogTitle>Delete employee?</DialogTitle>
        <DialogDescription>
          This will remove <span class="font-medium">{{ employee.fullName }}</span> from the list.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex-col gap-2 sm:flex-row sm:justify-end">
        <Button class="w-full sm:w-auto" variant="outline" @click="open = false">Cancel</Button>
        <Button class="w-full sm:w-auto" variant="destructive" @click="onConfirm">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { EmployeeRowVm } from "../model/employee.types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const props = defineProps<{ employee: EmployeeRowVm }>();
const emit = defineEmits<{ (e: "confirm"): void }>();

const open = defineModel<boolean>("open", { default: false });

const onConfirm = () => {
  emit("confirm");
  open.value = false;
};
</script>
