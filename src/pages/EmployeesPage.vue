<template>
  <div class="space-y-4">
    <EmployeesHeader @create="onCreate" />
    <EmployeeFiltersBar />

    <div v-if="isLoading" class="text-sm text-muted-foreground">
      Loading employees...
    </div>

    <EmployeeTable v-else :rows="rows" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import EmployeesHeader from "@/features/employees/components/EmployeesHeader.vue";
import EmployeeFiltersBar from "@/features/employees/components/EmployeeFiltersBar.vue";
import EmployeeTable from "@/features/employees/components/EmployeeTable.vue";

import type { EmployeeRowVm } from "@/features/employees/model/employee.types";

import { employeesService } from "@/features/api/employees.mock";

const onCreate = () => {
  //to do
};

const rows = ref<EmployeeRowVm[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;

  try {
    rows.value = await employeesService.list();
  } catch (err) {
    console.error(err);
    rows.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>
