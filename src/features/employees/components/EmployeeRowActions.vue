<template>
  <div class="flex justify-end">
    <DropdownMenu v-model:open="menuOpen">
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" aria-label="Actions">
          <MoreVertical class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" class="w-44">
        <DropdownMenuItem @select.prevent="onView">
          <Eye class="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem @select.prevent="onEdit">
          <Pencil class="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          class="text-destructive focus:text-destructive"
          @select.prevent="onDelete"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EmployeeDialogView v-model:open="viewOpen" :employee="employee" />

    <EmployeeEditDialog
      v-model:open="editOpen"
      :employee="employee"
      @save="onSave"
    />

    <EmployeeDeleteDialog
      v-model:open="deleteOpen"
      :employee="employee"
      @confirm="onConfirmDelete"
    />
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

const props = defineProps<{ employee: EmployeeRowVm }>();

const emit = defineEmits<{
  (e: "edit", value: EmployeeRowVm): void;
  (e: "delete", id: string): void;
}>();

const menuOpen = ref(false);

const viewOpen = ref(false);
const editOpen = ref(false);
const deleteOpen = ref(false);

const onView = () => {
  menuOpen.value = false;
  viewOpen.value = true;
};

const onEdit = () => {
  menuOpen.value = false;
  editOpen.value = true;
};

const onDelete = () => {
  menuOpen.value = false;
  deleteOpen.value = true;
};

const onSave = (updated: EmployeeRowVm) => {
  emit("edit", updated);
  editOpen.value = false;
  menuOpen.value = false; 
};

const onConfirmDelete = () => {
  emit("delete", props.employee.id);
  deleteOpen.value = false;
  menuOpen.value = false; 
};
</script>
