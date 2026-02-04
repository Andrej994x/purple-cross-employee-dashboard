<template>
  <div class="flex justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" aria-label="Actions">
          <MoreVertical class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" class="w-44">
        <DropdownMenuItem @select.prevent="viewOpen = true">
          <Eye class="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem @select.prevent="editOpen = true">
          <Pencil class="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          class="text-destructive focus:text-destructive"
          @select.prevent="deleteOpen = true"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EmployeeDialogView v-model:open="viewOpen" :employee="employee" />
    <EmployeeEditDialog v-model:open="editOpen" :employee="employee" />
    <EmployeeDeleteDialog v-model:open="deleteOpen" :employee="employee" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-vue-next";
import type { EmployeeRowVm } from "../model/employee.types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmployeeDialogView from "./EmployeeDialogView.vue";
import EmployeeEditDialog from "./EmployeeEditDialog.vue";
import EmployeeDeleteDialog from "./EmployeeDeleteDialog.vue";

defineProps<{ employee: EmployeeRowVm }>();

const viewOpen = ref(false);
const editOpen = ref(false);
const deleteOpen = ref(false);
</script>
