<template>
  <div class="space-y-4">
    <EmployeesHeader @create="onCreate" />

    <EmployeeFiltersBar
      :search="search"
      :department="department"
      :sort="sort"
      :departments="departments"
      @update:search="search = $event"
      @update:department="department = $event"
      @update:sort="sort = $event"
    />

    <div v-if="isLoading" class="text-sm text-muted-foreground">
      Loading employees...
    </div>

    <EmployeeTable v-else :rows="filteredRows" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import EmployeesHeader from "@/features/employees/components/EmployeesHeader.vue";
import EmployeeFiltersBar, {
  type EmployeeSort,
} from "@/features/employees/components/EmployeeFiltersBar.vue";
import EmployeeTable from "@/features/employees/components/EmployeeTable.vue";

import type { EmployeeRowVm } from "@/features/employees/model/employee.types";
import { employeesService } from "@/features/api/employees.mock";

const onCreate = () => {};

// data
const rows = ref<EmployeeRowVm[]>([]);
const isLoading = ref(false);

// live filters
const search = ref("");
const department = ref<string>("all");
const sort = ref<EmployeeSort>("name_asc");

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

const departments = computed(() => {
  const set = new Set<string>();
  for (const r of rows.value) set.add(r.department);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
});

const normalize = (s: string) => s.toLowerCase().trim();

const filteredRows = computed(() => {
  let result = [...rows.value];

  // department filter
  if (department.value !== "all") {
    result = result.filter(r => r.department === department.value);
  }

  // search
  const q = normalize(search.value);
  if (q) {
    result = result.filter(r => {
      const hay = normalize(`${r.fullName} ${r.occupation} ${r.department}`);
      return hay.includes(q);
    });
  }

  // sort
  switch (sort.value) {
    case "name_asc":
      result.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
    case "name_desc":
      result.sort((a, b) => b.fullName.localeCompare(a.fullName));
      break;
    case "employment_new":
      result.sort((a, b) => (b.employmentDate || "").localeCompare(a.employmentDate || ""));
      break;
    case "employment_old":
      result.sort((a, b) => (a.employmentDate || "").localeCompare(b.employmentDate || ""));
      break;
  }

  return result;
});
</script>
