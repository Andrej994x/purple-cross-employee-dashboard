<template>
  <Button
    class="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
    size="icon"
    aria-label="Create employee"
    @click="$emit('create')"
  >
    <Plus class="h-6 w-6" />
  </Button>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineEmits<{ (e: "create"): void }>();
</script>
