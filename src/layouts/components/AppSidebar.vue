<template>
  <aside class="hidden w-64 flex-col border-r bg-background sm:flex">
    <div class="flex h-14 items-center border-b px-4">
      <div class="text-sm font-semibold">Purple Cross Ltd</div>
    </div>

    <div class="flex-1 overflow-auto py-2">
      <nav class="grid gap-1 px-2 text-sm">
        <RouterLink
          to="/employees"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          :class="isActive('/employees') ? 'bg-accent text-accent-foreground' : ''"
        >
          Employees
        </RouterLink>

        <a
          href="#"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Analytics
        </a>
        <a
          href="#"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Reports
        </a>
        <a
          href="#"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Settings
        </a>
      </nav>
    </div>

    <div class="border-t p-4 text-xs text-muted-foreground">
      Demo dashboard
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const isActive = (path: string) => route.path === path || route.path.startsWith(path + "/");
</script>
