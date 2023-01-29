<script setup lang="ts">
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';
import LoggedOut from '../LoggedOut.vue';
import CardList from '../CardList.vue';

const email = localStorage.getItem('user');
const token = localStorage.getItem('token');

const checkedLoggedOut = !!(email && token);

</script>

<template>
  <navbar is-active="Home" :is-logged-out="!checkedLoggedOut" :email="email" />
  <div>
    <div
      v-show="
        checkedLoggedOut"
      class="mt-20 mb-32">
      <card-list />
    </div>
    <LoggedOut v-show="!checkedLoggedOut" />
  </div>
  <Footer class="mt-20" />
</template>
<style scoped>
</style>
