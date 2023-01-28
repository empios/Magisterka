<script setup lang="ts">
import { TheCard } from 'flowbite-vue';
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';
import LoggedOut from '../LoggedOut.vue';

const email = localStorage.getItem('user');
const token = localStorage.getItem('token');

const checkedLoggedOut = !!(email && token);

</script>

<template>
  <div>
    <navbar is-active="Home" :is-logged-out="!checkedLoggedOut" :email="email" />
    <div class="h-full">
      <div v-show="checkedLoggedOut" class="mt-20">
        <the-card>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far,
            in reverse chronological order.
          </p>
        </the-card>
      </div>
      <LoggedOut v-show="!checkedLoggedOut" />
    </div>
    <Footer />
  </div>
</template>
<style scoped>
</style>
