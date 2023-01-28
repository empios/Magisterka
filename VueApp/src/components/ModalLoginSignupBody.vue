<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <div class="mb-2 block">
      <label for="email1">Your Email</label>
      <input
        placeholder="name@name.com"
        type="email"
        id="email1"
        v-model="email"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div class="mb-2 block">
      <label for="password1">Your password</label>
      <input
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="password"
        v-model="password"
        id="password1" />
    </div>
    <Button v-show="!props.isSubmitted" type="submit">Submit</Button>
    <Button v-show="props.isSubmitted" type="submit">Log In</Button>
  </form>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { checkEmptyString } from '../utils/StringUtils';
import UserDataService from '../services/UserDataService';

const props = defineProps({
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  setSubmit: {
    type: Function,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});

const email = ref('');
const password = ref('');
const toast = useToast();
const onSubmit = () => {
  const checked = !(checkEmptyString(email.value) && checkEmptyString(password.value));
  if (checked) {
    if (props.isSubmitted) {
      UserDataService.login({
        email: email.value,
        password: password.value,
      }).then((res) => {
        if (res.status !== 200) {
          toast.error('Could not login user');
        } else {
          toast.success('Hello!');
          const emailResponse = res.data.data.email;
          localStorage.setItem('user', emailResponse);
          localStorage.setItem('token', res.data.token);
          props.closeModal();
          document.location.reload();
        }
      });
    } else {
      UserDataService.create({
        email: email.value,
        password: password.value,
      }).then((res) => {
        if (res.status !== 201) {
          toast.error('Could not register user');
        } else {
          toast.success('User registered!');
          props.setSubmit();
        }
      });
    }
  }
};

</script>
