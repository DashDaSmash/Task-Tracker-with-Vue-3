<script setup lang="ts">
import type { Task, TaskFilter } from "~/types/task";

// Reactive State
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Read existing codebase structure",
    category: "Docs",
    completed: true,
  },
  {
    id: 2,
    title: "Fix reactivity bug in user list",
    category: "Bug",
    completed: false,
  },
  {
    id: 3,
    title: "Add search filter to dashboard",
    category: "Feature",
    completed: false,
  },
]);

const newTaskTitle = ref("");
const selectedCategory = ref<Task["category"]>("Feature");
const activeFilter = ref<TaskFilter>("All");

// Methods
const addTask = () => {
  if (!newTaskTitle.value.trim()) return;

  tasks.value.push({
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    category: selectedCategory.value,
    completed: false,
  });

  newTaskTitle.value = "";
};

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
};

// Computed Properties
const filteredTasks = computed(() => {
  if (activeFilter.value === "Completed")
    return tasks.value.filter((t) => t.completed);
  if (activeFilter.value === "Pending")
    return tasks.value.filter((t) => !t.completed);
  return tasks.value;
});

const pendingCount = computed(
  () => tasks.value.filter((t) => !t.completed).length,
);
</script>

<template>
  <div class="min-h-screen bg-purple-50/50 py-12 px-4 sm:px-6">
    <main
      class="max-w-xl mx-auto bg-white rounded-2xl shadow-xl shadow-purple-100/50 border border-purple-100 p-6 sm:p-8 space-y-6"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-purple-100 pb-5"
      >
        <div>
          <h1 class="text-2xl font-bold text-purple-950 tracking-tight">
            Task Tracker
          </h1>
          <p class="text-xs text-purple-500 font-medium mt-0.5">
            Day 1: Vue 3 & Nuxt Practice
          </p>
        </div>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700"
        >
          {{ pendingCount }} Pending
        </span>
      </div>

      <!-- Add Task Form -->
      <form @submit.prevent="addTask" class="flex gap-2">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Enter task title..."
          class="flex-1 px-4 py-2.5 text-sm rounded-xl border border-purple-200 bg-purple-50/30 text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        />
        <select
          v-model="selectedCategory"
          class="px-3 py-2.5 text-sm rounded-xl border border-purple-200 bg-purple-50/30 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
        >
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Docs">Docs</option>
        </select>
        <button
          type="submit"
          class="px-5 py-2.5 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 active:scale-[0.98] transition-all"
        >
          Add
        </button>
      </form>

      <!-- Filter Tabs -->
      <div
        class="flex gap-1.5 p-1 bg-purple-50 rounded-xl border border-purple-100"
      >
        <button
          v-for="filter in ['All', 'Pending', 'Completed'] as const"
          :key="filter"
          @click="activeFilter = filter"
          class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
          :class="[
            activeFilter === filter
              ? 'bg-white text-purple-900 shadow-sm'
              : 'text-purple-600 hover:text-purple-900 hover:bg-white/50',
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Task List -->
      <div class="space-y-2.5 pt-2">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
        />

        <div
          v-if="filteredTasks.length === 0"
          class="text-center py-8 text-sm text-purple-400 font-medium"
        >
          No tasks found in this view.
        </div>
      </div>
    </main>
  </div>
</template>
