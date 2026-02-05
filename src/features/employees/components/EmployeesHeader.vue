<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Upload, Download } from "lucide-vue-next"
import ImportEmployeesDialog from "./ImportEmployeesDialog.vue"

const emit = defineEmits<{
  (e: "imported", payload: any): void
  (e: "export"): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight">Employees</h2>
      <p class="text-sm text-muted-foreground">
        View and manage employee records
      </p>
    </div>

    <div class="flex gap-2">
      <Button
        variant="outline"
        class="gap-2 cursor-pointer"
        @click="$emit('export')"
      >
        <Download class="h-4 w-4" />
        Export
      </Button>

      <ImportEmployeesDialog
        @imported="(payload) => $emit('imported', payload)"
      />
    </div>
  </div>
</template>
