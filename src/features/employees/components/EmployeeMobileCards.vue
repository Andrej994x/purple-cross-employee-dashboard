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

            <div class="mt-3 grid grid-cols-2 gap-4">
              <div class="text-[10px] uppercase tracking-wide text-muted-foreground">
                Date of Employment
              </div>
              <div class="text-[10px] uppercase tracking-wide text-muted-foreground">
                Termination Date
              </div>

              <div>
                <Badge
                  v-if="emp.employmentStatus !== '/'"
                  variant="outline"
                  :class="['w-fit border', statusBadgeClass(emp.employmentStatus)]"
                >
                  {{ emp.employmentStatus }}
                </Badge>
              </div>

              <div>
                <Badge
                  v-if="emp.terminationStatus !== '/'"
                  variant="outline"
                  :class="['w-fit border', statusBadgeClass(emp.terminationStatus)]"
                >
                  {{ emp.terminationStatus }}
                </Badge>
              </div>

              <div class="text-xs font-medium text-foreground">
                {{ formatDate(emp.employmentDate) }}
              </div>

              <div
                class="text-xs font-medium"
                :class="formatDate(emp.terminationDate) === '/' ? 'text-muted-foreground' : 'text-foreground'"
              >
                {{ formatDate(emp.terminationDate) }}
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

// MM/DD/YYYY or "/"
const formatDate = (date?: string) => {
  if (!date) return "/";

  const parts = date.split("-");
  if (parts.length !== 3) return date;

  const [y, m, d] = parts;
  if (!y || !m || !d) return date;

  return `${m}/${d}/${y}`;
};

const statusBadgeClass = (status?: string) => {
  if (!status) return "";

  switch (status.toLowerCase()) {
    case "currently employed":
      return "bg-green-100 text-green-800 border-green-200";
    case "terminated":
      return "bg-red-100 text-red-800 border-red-200";
    case "employed soon":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "to be terminated":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};
</script>
