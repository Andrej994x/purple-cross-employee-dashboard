<template>
  <div class="space-y-3">
    <Card v-for="emp in rows" :key="emp.id">
      <CardContent class="p-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <div class="font-medium truncate">
              {{ emp.fullName }}
            </div>

            <div class="mt-1 text-sm text-muted-foreground">
              {{ emp.occupation }} · {{ emp.department }}
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{{ emp.employmentStatus }}</Badge>
              <Badge variant="secondary">{{ emp.terminationStatus }}</Badge>
            </div>

            <div class="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div class="rounded-md bg-muted/40 px-2 py-1">
                <div class="uppercase tracking-wide">Employment</div>
                <div class="text-foreground">{{ emp.employmentDate }}</div>
              </div>

              <div class="rounded-md bg-muted/40 px-2 py-1">
                <div class="uppercase tracking-wide">Termination</div>
                <div class="text-foreground">{{ emp.terminationDate || "—" }}</div>
              </div>
            </div>
          </div>

          <EmployeeRowActions :employee="emp" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { EmployeeRowVm } from "@/features/employees/model/employee.types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import EmployeeRowActions from "@/features/employees/components/EmployeeRowActions.vue";

defineProps<{
  rows: EmployeeRowVm[];
}>();
</script>
