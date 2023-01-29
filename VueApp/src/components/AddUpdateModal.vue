<template>
  <Modal v-if="props.showModal" @close="props.closeModal">
    <template #header>
      <div v-show="!props.isEditing" class="flex items-center text-lg">
        Add Post
      </div>
      <div v-show="props.isEditing" class="flex items-center text-lg">
        Edit Post
      </div>
    </template>
    <template #body>
      <add-update-post-modal-body
        :add-new-post="props.addNewPost"
        :close-modal="props.closeModal"
        :current-post="props.currentPost"
        :is-editing="props.isEditing"
        :posts="props.posts"
        :set-posts="props.setPosts" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Modal } from 'flowbite-vue';
import { PropType } from 'vue';
import AddUpdatePostModalBody from './AddUpdatePostModalBody.vue';
import PostSchema from '../types/PostSchema';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  addNewPost: {
    type: Function,
    required: true,
  },
  currentPost: {
    type: Object as PropType<PostSchema>,
    default() { return null; },
  },
  posts: {
    type: Object as PropType<PostSchema[]>,
    default() { return null; },
  },
  setPosts: {
    type: Function,
    default() { return null; },
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

</script>
