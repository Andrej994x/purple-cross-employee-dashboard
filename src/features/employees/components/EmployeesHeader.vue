<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight">Employees</h2>
      <p class="text-sm text-muted-foreground">View and manage employee records</p>
    </div>

    <Button class="sm:self-end" @click="$emit('create')">Create Employee</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineEmits<{
  (e: "create"): void;
}>();
</script>
