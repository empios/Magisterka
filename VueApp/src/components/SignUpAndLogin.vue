<template>
  <Modal v-if="props.showModal" @close="props.closeModal">
    <template #header>
      <div class="grid grid-rows-2">
        <div v-show="isSubmitted" class="flex items-center text-lg">
          Log In
        </div>
        <div v-show="!isSubmitted" class="flex items-center text-lg">
          Register Account
        </div>
        <button v-if="!isSubmitted" type="button" class="text-xs flex" @click="props.setSubmit">Choose to Log In</button>
        <button v-if="isSubmitted" type="button" class="text-xs flex" @click="props.deleteSubmit">Choose to Sign Up</button>
      </div>
    </template>
    <template #body>
      <ModalLoginSignupBody
        :set-submit="props.setSubmit"
        :is-submitted="props.isSubmitted"
        :close-modal="props.closeModal" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Modal } from 'flowbite-vue';
import ModalLoginSignupBody from './ModalLoginSignupBody.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  deleteSubmit: {
    type: Function,
    required: true,
  },
  setSubmit: {
    type: Function,
    required: true,
  },
});

</script>
