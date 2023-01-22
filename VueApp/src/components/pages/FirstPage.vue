<script setup lang="ts">
import { TheCard } from 'flowbite-vue';
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';
</script>

<template>
  <div>
    <navbar is-active="Home" />
    <div class="h-full">
      <div class="mt-20">
        <the-card>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far,
            in reverse chronological order.
          </p>
        </the-card>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped>
</style>
