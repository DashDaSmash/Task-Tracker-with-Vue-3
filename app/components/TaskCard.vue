<script setup lang="ts">
import type { Task } from "~/types/task";

defineProps<{ task: Task }>();
const emit = defineEmits<{ (e: "toggle", id: number): void }>();
</script>

<template>
  <div
    class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-purple-100 hover:border-purple-200 hover:shadow-md hover:shadow-purple-50 transition-all group"
  >
    <div class="flex items-center gap-3 min-w-0 pr-2">
      <!-- Category Badge -->
      <span
        class="text-[11px] font-semibold px-2.5 py-0.5 rounded-md shrink-0"
        :class="{
          'bg-rose-50 text-rose-600 border border-rose-100':
            task.category === 'Bug',
          'bg-purple-100 text-purple-700 border border-purple-200':
            task.category === 'Feature',
          'bg-slate-100 text-slate-600 border border-slate-200':
            task.category === 'Docs',
        }"
      >
        {{ task.category }}
      </span>

      <!-- Title -->
      <span
        class="text-sm font-medium truncate transition-colors"
        :class="[
          task.completed
            ? 'line-through text-purple-300'
            : 'text-purple-950 group-hover:text-purple-700',
        ]"
      >
        {{ task.title }}
      </span>
    </div>

    <!-- Toggle Action -->
    <button
      @click="emit('toggle', task.id)"
      class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all shrink-0"
      :class="[
        task.completed
          ? 'border-purple-200 text-purple-600 hover:bg-purple-50'
          : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
      ]"
    >
      {{ task.completed ? "Undo" : "Complete" }}
    </button>
  </div>
</template>
