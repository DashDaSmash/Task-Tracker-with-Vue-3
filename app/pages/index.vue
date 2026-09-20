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
  <main style="max-width: 600px; margin: 40px auto; font-family: sans-serif">
    <h1>Day 1: Task Tracker</h1>

    <!-- Add Task Form -->
    <form
      @submit.prevent="addTask"
      style="display: flex; gap: 8px; margin-bottom: 20px"
    >
      <input
        v-model="newTaskTitle"
        placeholder="Enter task title..."
        style="flex: 1; padding: 8px"
      />
      <select v-model="selectedCategory" style="padding: 8px">
        <option value="Feature">Feature</option>
        <option value="Bug">Bug</option>
        <option value="Docs">Docs</option>
      </select>
      <button type="submit" style="padding: 8px 16px">Add Task</button>
    </form>

    <!-- Filter Buttons -->
    <div style="display: flex; gap: 8px; margin-bottom: 20px">
      <button
        v-for="filter in ['All', 'Pending', 'Completed'] as const"
        :key="filter"
        @click="activeFilter = filter"
        :style="{ fontWeight: activeFilter === filter ? 'bold' : 'normal' }"
      >
        {{ filter }}
      </button>
    </div>

    <p>
      Pending Tasks: <strong>{{ pendingCount }}</strong>
    </p>

    <!-- Task List -->
    <div style="margin-top: 16px">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
      />
    </div>
  </main>
</template>
