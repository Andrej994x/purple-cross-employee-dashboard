<template>
  <div class="rounded-md border bg-background">
    <div class="hidden md:block">
      <div class="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Department</TableHead>

              <TableHead>Date of Employment</TableHead>
              <TableHead>Termination Date</TableHead>

              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="emp in pagedRows" :key="emp.id">
              <TableCell class="font-medium">{{ emp.fullName }}</TableCell>
              <TableCell>{{ emp.occupation }}</TableCell>
              <TableCell>{{ emp.department }}</TableCell>

              <TableCell>
                <div class="flex flex-col gap-1">
                  <Badge
                    v-if="emp.employmentStatus !== '/'"
                    variant="outline"
                    :class="[
                      'w-fit border',
                      statusBadgeClass(emp.employmentStatus),
                    ]"
                  >
                    {{ emp.employmentStatus }}
                  </Badge>

                  <span class="text-xs text-muted-foreground">
                    {{ formatMkDate(emp.employmentDate) }}
                  </span>
                </div>
              </TableCell>

              <!-- Termination -->
              <TableCell>
                <div class="flex flex-col gap-1">
                  <Badge
                    v-if="emp.terminationStatus !== '/'"
                    variant="outline"
                    :class="[
                      'w-fit border',
                      statusBadgeClass(emp.terminationStatus),
                    ]"
                  >
                    {{ emp.terminationStatus }}
                  </Badge>

                  <span class="text-xs text-muted-foreground">
                    {{ formatMkDate(emp.terminationDate) }}
                  </span>
                </div>
              </TableCell>

              <TableCell class="text-right">
                <EmployeeRowActions
                  :employee="emp"
                  @edit="$emit('edit', $event)"
                  @delete="$emit('delete', $event)"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <div class="md:hidden p-3">
      <EmployeeCardsMobile :rows="pagedRows" />
    </div>

    <div
      class="flex flex-col gap-2 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="text-muted-foreground">
        <template v-if="rows.length === 0">No employees.</template>
        <template v-else>
          Showing {{ startLabel }}–{{ endLabel }} of {{ rows.length }}
        </template>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">Rows per page</span>

        <Select
          :model-value="String(pageSize)"
          @update:model-value="onPageSizeChange"
        >
          <SelectTrigger class="w-[90px]">
            <SelectValue :placeholder="String(pageSize)" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>

        <div class="ml-2 flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label="Prev"
            :disabled="page === 1 || rows.length === 0"
            @click="prevPage"
          >
            <ChevronLeft class="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Next"
            :disabled="page === pageCount || rows.length === 0"
            @click="nextPage"
          >
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>

        <div class="ml-2 text-xs text-muted-foreground">
          Page {{ page }} / {{ pageCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import type { AcceptableValue } from "reka-ui";

import type { EmployeeRowVm } from "../model/employee.types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmployeeRowActions from "./EmployeeRowActions.vue";
import EmployeeCardsMobile from "./EmployeeMobileCards.vue";

const props = defineProps<{
  rows: EmployeeRowVm[];
}>();

// pagination
const page = ref(1);
const pageSize = ref(5);

const pageCount = computed(() => {
  return Math.max(1, Math.ceil(props.rows.length / pageSize.value));
});

const startIndex = computed(() => (page.value - 1) * pageSize.value);

const endIndex = computed(() => {
  return Math.min(props.rows.length, startIndex.value + pageSize.value);
});

const pagedRows = computed(() => {
  return props.rows.slice(startIndex.value, startIndex.value + pageSize.value);
});

const startLabel = computed(() =>
  props.rows.length === 0 ? 0 : startIndex.value + 1,
);
const endLabel = computed(() => endIndex.value);

watch(
  () => props.rows.length,
  () => {
    page.value = 1;
  },
);

const prevPage = () => {
  if (page.value > 1) page.value -= 1;
};

const nextPage = () => {
  if (page.value < pageCount.value) page.value += 1;
};

const onPageSizeChange = (value: AcceptableValue) => {
  if (value == null) return;

  const newSize = Number(value);
  if (!Number.isFinite(newSize) || newSize <= 0) return;

  pageSize.value = newSize;
  page.value = 1;
};

const emit = defineEmits<{
  (e: "edit", value: EmployeeRowVm): void;
  (e: "delete", id: string): void;
}>();



const formatMkDate = (date?: string) => {
  if (!date) return "/";

  const d = new Date(date);
  if (isNaN(d.getTime())) return date;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
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
