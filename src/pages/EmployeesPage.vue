<template>
  <div class="space-y-4">
    <EmployeesHeader />

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

    <EmployeeTable
      v-else
      :rows="filteredRows"
      @edit="onEditEmployee"
      @delete="onDeleteEmployee"
    />

    <EmployeeCreateFab @create="createOpen = true" />

    <EmployeeCreateDialog
      v-model:open="createOpen"
      :occupations="meta.occupations"
      :departments="meta.departments"
      @created="onCreateEmployee"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import EmployeesHeader from "@/features/employees/components/EmployeesHeader.vue";
import EmployeeFiltersBar, { type EmployeeSort } from "@/features/employees/components/EmployeeFiltersBar.vue";
import EmployeeTable from "@/features/employees/components/EmployeeTable.vue";

import EmployeeCreateFab from "@/features/employees/components/EmployeeCreateFab.vue";
import EmployeeCreateDialog from "@/features/employees/components/EmployeeCreateDialog.vue";

import type { EmployeeRowVm } from "@/features/employees/model/employee.types";
import { employeesService } from "@/features/api/employees.mock";

import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

const rows = ref<EmployeeRowVm[]>([]);
const isLoading = ref(false);

const meta = ref({ occupations: [] as string[], departments: [] as string[] });

// create
const createOpen = ref(false);

// live filters
const search = ref("");
const department = ref<string>("all");
const sort = ref<EmployeeSort>("name_asc");

onMounted(async () => {
  isLoading.value = true;
  try {
    const [list, m] = await Promise.all([employeesService.list(), employeesService.meta()]);
    rows.value = list;
    meta.value = m;
  } finally {
    isLoading.value = false;
  }
});

const departments = computed(() => meta.value.departments);

const normalize = (s: string) => s.toLowerCase().trim();

const filteredRows = computed(() => {
  let result = [...rows.value];

  if (department.value !== "all") {
    result = result.filter(r => r.department === department.value);
  }

  // search by full name only
  const q = normalize(search.value);
  if (q) result = result.filter(r => normalize(r.fullName).includes(q));


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

// edit in-memory
const onEditEmployee = (updated: EmployeeRowVm) => {
  rows.value = rows.value.map(r => (r.id === updated.id ? updated : r));
};

// delete in-memory
const onDeleteEmployee = (id: string) => {
  rows.value = rows.value.filter(r => r.id !== id);
};

// create in-memory
const onCreateEmployee = (newEmployee: EmployeeRowVm) => {
  if (rows.value.some(r => r.id === newEmployee.id)) {
    toast({
      title: "Code already exists",
      description: "Please use a unique employee code.",
      variant: "destructive",
    });
    return;
  }

  rows.value = [newEmployee, ...rows.value];

  toast({
    title: "Employee created",
    description: `${newEmployee.fullName} added successfully.`,
  });
};
</script>
