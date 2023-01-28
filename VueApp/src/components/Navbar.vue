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
        </NavbarCollapse>
        <div v-show="props.isLoggedOut">
          <button
            type="button"
            v-show="isSubmitted"
            @click="showModal"
            class="mt-2 ml-40 lg:ml-0 lg:mt-0 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log in
          </button>
          <button
            type="button"
            v-show="!isSubmitted"
            @click="showModal"
            class="mt-2 ml-40 lg:ml-0 lg:mt-0 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register Account
          </button>
        </div>
        <div v-show="!props.isLoggedOut">
          <button
            type="button"
            @click="logout"
            class="mt-2 ml-40 lg:ml-0 lg:mt-0 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </template>
    </Navbar>
    <SignUpAndLogin
      :close-modal="closeModal"
      :show-modal="isShowModal"
      :is-submitted="isSubmitted"
      :set-submit="isSubmit"
      :delete-submit="deleteSubmit" />
  </div>
</template>

<script setup lang="ts">
import {
  Navbar, NavbarLogo, NavbarCollapse, NavbarLink,
} from 'flowbite-vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import SignUpAndLogin from './SignUpAndLogin.vue';
import UserDataService from '../services/UserDataService';

const props = defineProps({
  isActive: { type: String, required: true },
  isLoggedOut: { type: Boolean, required: true },
  email: { type: String, default() { return ''; } },
});

const isShowModal = ref(false);
const isSubmitted = ref(false);

const toast = useToast();

const logout = () => {
  UserDataService.logout(props.email).then((res) => {
    if (res.status !== 200) {
      toast.error('Could not logout');
    } else {
      isSubmitted.value = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      document.location.reload();
    }
  });
};

function isSubmit() {
  isSubmitted.value = true;
}

function deleteSubmit() {
  isSubmitted.value = false;
}
function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

</script>
