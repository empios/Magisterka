<template>
  <div class="col-span-1" />
  <div class="col-span-1">
    <the-card class="my-5 mx-auto">
      <h1 v-text="props.message" />
      <div class="flex">
        <p class="text-gray-500 text-xs" v-text="props.user" />
        <p class="text-gray-500 text-xs ml-3" v-text="props.date" />
      </div>
    </the-card>
  </div>
  <div class="col-span-1" />
</template>

<script setup lang="ts">
import { TheCard } from 'flowbite-vue';

const props = defineProps({
  message: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: String, required: true },
});
</script>

<style scoped>

</style>
