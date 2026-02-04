<template>
  <header class="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6">
    
    <SidebarTrigger class="-ml-1 sm:hidden" />

    <div class="flex flex-1 items-center gap-2">
      <h1 class="text-lg font-semibold">Employee Management</h1>
    </div>

    <div class="flex items-center gap-2">
      <div class="hidden text-sm text-muted-foreground sm:block">Signed in as</div>
      <div class="rounded-full border px-3 py-1 text-sm">HR Admin</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { SidebarTrigger } from "@/components/ui/sidebar";
</script>
