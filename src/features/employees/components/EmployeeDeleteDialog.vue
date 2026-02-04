<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon" aria-label="Delete">
        <Trash2 class="h-4 w-4 text-red-600" />
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete employee?</DialogTitle>
        <DialogDescription>
          This will remove <span class="font-medium">{{ employee.fullName }}</span> from the list.
          (UI only for now)
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import type { EmployeeRowVm } from "../model/employee.types";

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

defineProps<{
  employee: EmployeeRowVm;
}>();
</script>
