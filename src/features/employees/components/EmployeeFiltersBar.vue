<template>
  <div class="rounded-md border bg-background p-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div class="grid w-full gap-2 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-3">
        <Input
          placeholder="Search (Full Name)"
          :model-value="search"
          @update:model-value="$emit('update:search', String($event ?? ''))"
        />

        <Select :model-value="department" @update:model-value="onDepartmentChange">
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="d in departments" :key="d" :value="d">{{ d }}</SelectItem>
          </SelectContent>
        </Select>

        <Select :model-value="sort" @update:model-value="onSortChange">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">Name (A → Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z → A)</SelectItem>
            <SelectItem value="employment_new">Employment (Newest)</SelectItem>
            <SelectItem value="employment_old">Employment (Oldest)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AcceptableValue } from "reka-ui";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EmployeeSort =
  | "name_asc"
  | "name_desc"
  | "employment_new"
  | "employment_old";

defineProps<{
  search: string;
  department: string; 
  sort: EmployeeSort;
  departments: string[];
}>();

const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:department", value: string): void;
  (e: "update:sort", value: EmployeeSort): void;
}>();

const onDepartmentChange = (val: AcceptableValue) => {
  if (val == null) return;
  emit("update:department", String(val));
};

const onSortChange = (val: AcceptableValue) => {
  if (val == null) return;
  emit("update:sort", String(val) as EmployeeSort);
};
</script>
