<template>
  <div class="min-h-screen w-full bg-background">
    <div class="flex min-h-screen">
      <AppSidebar />

      <div class="flex min-w-0 flex-1 flex-col">
        <AppTopbar />

        <main class="flex-1 p-4 sm:p-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from "./parts/AppSidebar.vue";
import AppTopbar from "./parts/AppTopbar.vue";
</script>
