<template>
  <div class="flex justify-end gap-1">
    <EmployeeDialogView :employee="employee" />
    <EmployeeEditDialog :employee="employee" />
    <EmployeeDeleteDialog :employee="employee" />
  </div>
</template>

<script setup lang="ts">
import type { EmployeeRowVm } from "../model/employee.types";

import EmployeeDialogView from "./EmployeeDialogView.vue";
import EmployeeEditDialog from "./EmployeeEditDialog.vue";
import EmployeeDeleteDialog from "./EmployeeDeleteDialog.vue";

defineProps<{
  employee: EmployeeRowVm;
}>();
</script>
