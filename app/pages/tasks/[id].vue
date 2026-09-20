<script setup lang="ts">
const route = useRoute();

const taskId = computed(() => route.params.id);
</script>

<template>
  <div>
    <h1>Task Details for ID: {{ taskId }}</h1>
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>
