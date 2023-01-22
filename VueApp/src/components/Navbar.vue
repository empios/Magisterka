<script setup>
import {
  Navbar, NavbarLogo, NavbarCollapse, NavbarLink, Button,
} from 'flowbite-vue';

const props = defineProps({
  isActive: { type: String, required: true },
});

</script>
<template>
  <div>
    <Navbar>
      <template #logo>
        <NavbarLogo class="text-gray-700" link="/" image-url="https://masteringjs.io/assets/images/vue/vue.svg">
          MasterVueApp
        </NavbarLogo>
      </template>
      <template #default="{ isShowMenu }">
        <NavbarCollapse class="center-nav" :isShowMenu="isShowMenu">
          <NavbarLink class="text-nav" :is-active="props.isActive === 'Home'" link="/">Home</NavbarLink>
          <NavbarLink class="text-nav" :is-active="props.isActive === 'Panel'" link="/panel">Panel</NavbarLink>
          <Button>Log in</Button>
        </NavbarCollapse>
      </template>
    </Navbar>
  </div>
</template>
