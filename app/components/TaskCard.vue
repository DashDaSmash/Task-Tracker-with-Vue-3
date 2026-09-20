<script setup lang="ts">
export interface Task {
  id: number;
  title: string;
  category: "Bug" | "Feature" | "Docs";
  completed: boolean;
}

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
}>();
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    "
  >
    <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
      <strong>[{{ task.category }}]</strong> {{ task.title }}
    </span>
    <button @click="emit('toggle', task.id)">
      {{ task.completed ? "Undo" : "Complete" }}
    </button>
  </div>
</template>
