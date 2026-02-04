<template>
  <div class="space-y-4">
    <EmployeesHeader @create="onCreate" />
    <EmployeeFiltersBar />
    <EmployeeTable :rows="demoRows" />
  </div>
</template>

<script setup lang="ts">
import EmployeesHeader from "@/features/employees/components/EmployeesHeader.vue";
import EmployeeFiltersBar from "@/features/employees/components/EmployeeFiltersBar.vue";
import EmployeeTable from "@/features/employees/components/EmployeeTable.vue";

import type { EmployeeRowVm } from "@/features/employees/model/employee.types";

const onCreate = () => {
  // UI only for now

};

const demoRows: EmployeeRowVm[] = [
  {
    id: "1",
    fullName: "John Doe",
    occupation: "Pharmacist",
    department: "Operations",
    employmentStatus: "Currently employed",
    employmentDate: "2021-02-10",
    terminationStatus: "—",
    terminationDate: "",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    occupation: "Analyst",
    department: "Finance",
    employmentStatus: "Employed soon",
    employmentDate: "2026-03-01",
    terminationStatus: "To be terminated",
    terminationDate: "2026-06-01",
  },
];
</script>
