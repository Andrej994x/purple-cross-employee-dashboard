<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete employee?</DialogTitle>
        <DialogDescription>
          This will remove <span class="font-medium">{{ employee.fullName }}</span> from the list.
          (UI only for now)
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" @click="open = false">Cancel</Button>
        <Button variant="destructive" @click="open = false">Delete</Button>
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

defineProps<{ employee: EmployeeRowVm }>();

const open = defineModel<boolean>("open", { default: false });
</script>
