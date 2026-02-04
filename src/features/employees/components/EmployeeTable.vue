<template>
  <div class="rounded-md border bg-background">
    <div class="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[40px]">
              <Checkbox aria-label="Select all" />
            </TableHead>

            <TableHead>Full Name</TableHead>
            <TableHead class="hidden md:table-cell">Occupation</TableHead>
            <TableHead class="hidden lg:table-cell">Department</TableHead>

            <TableHead>Date of Employment</TableHead>
            <TableHead class="hidden md:table-cell">Termination Date</TableHead>

            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="emp in rows" :key="emp.id">
            <TableCell class="w-[40px]">
              <Checkbox aria-label="Select row" />
            </TableCell>

            <TableCell class="font-medium">
              <div class="flex flex-col">
                <span class="truncate max-w-[220px] sm:max-w-none">{{ emp.fullName }}</span>

                <div class="mt-1 flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
                  <span>{{ emp.occupation }}</span>
                  <span>{{ emp.department }}</span>
                  <span class="flex items-center gap-2">
                    <Badge variant="secondary">{{ emp.employmentStatus }}</Badge>
                    <span>•</span>
                    <Badge variant="secondary">{{ emp.terminationStatus }}</Badge>
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell class="hidden md:table-cell">{{ emp.occupation }}</TableCell>
            <TableCell class="hidden lg:table-cell">{{ emp.department }}</TableCell>

            <TableCell>
              <div class="flex flex-col gap-1">
                <Badge variant="secondary">{{ emp.employmentStatus }}</Badge>
                <span class="text-xs text-muted-foreground hidden sm:block">{{ emp.employmentDate }}</span>
              </div>
            </TableCell>

            <TableCell class="hidden md:table-cell">
              <div class="flex flex-col gap-1">
                <Badge variant="secondary">{{ emp.terminationStatus }}</Badge>
                <span class="text-xs text-muted-foreground">{{ emp.terminationDate || "—" }}</span>
              </div>
            </TableCell>

            <TableCell class="text-right">
              <EmployeeRowActions :employee="emp" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div
      class="flex flex-col gap-2 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="text-muted-foreground">0 of {{ rows.length }} row(s) selected.</div>

      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">Rows per page</span>
        <Select>
          <SelectTrigger class="w-[90px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>

        <div class="ml-2 flex items-center gap-1">
          <Button variant="outline" size="icon" aria-label="Prev">
            <ChevronLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next">
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

import type { EmployeeRowVm } from "../model/employee.types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

defineProps<{
  rows: EmployeeRowVm[];
}>();
</script>
