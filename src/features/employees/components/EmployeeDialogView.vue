<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon" aria-label="View">
        <Eye class="h-4 w-4" />
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Employee Profile</DialogTitle>
        <DialogDescription>Read-only view (UI only for now)</DialogDescription>
      </DialogHeader>

      <div class="grid gap-3 py-2 text-sm">
        <div class="grid grid-cols-3 gap-2">
          <div class="text-muted-foreground">Full Name</div>
          <div class="col-span-2 font-medium">{{ employee.fullName }}</div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-muted-foreground">Occupation</div>
          <div class="col-span-2">{{ employee.occupation }}</div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-muted-foreground">Department</div>
          <div class="col-span-2">{{ employee.department }}</div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-muted-foreground">Employment</div>
          <div class="col-span-2">{{ employee.employmentStatus }}</div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-muted-foreground">Termination</div>
          <div class="col-span-2">{{ employee.terminationStatus }}</div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Eye } from "lucide-vue-next";
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
