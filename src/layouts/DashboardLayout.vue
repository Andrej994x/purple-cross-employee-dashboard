<template>
  <SidebarProvider>
    <div class="min-h-screen w-full bg-background">
      <div class="flex min-h-screen">
        <AppSidebar />

        <SidebarInset class="flex min-w-0 flex-1 flex-col">
          <AppTopbar />

          <main class="flex-1 p-4 sm:p-6">
            <router-view />
          </main>
        </SidebarInset>
      </div>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "./parts/AppSidebar.vue";
import AppTopbar from "./parts/AppTopbar.vue";
</script>
