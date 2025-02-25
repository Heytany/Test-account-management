<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    type="text"
    v-bind="$attrs"
    class="x-4 y-2 rounded gray-200 text-gray-700"
  >
</template>
