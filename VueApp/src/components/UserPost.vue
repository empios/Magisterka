<template>
  <div class="col-span-1">
    <the-card class="my-5 mx-auto">
      <h1 v-text="props.message" />
      <div class="flex">
        <p class="text-gray-500 text-xs" v-text="props.user" />
        <p class="text-gray-500 text-xs ml-3" v-text="props.date" />
      </div>
      <div class="flex mt-2">
        <p @click="onDelete" class="text-xs cursor-pointer underline text-red-400">Delete</p>
        <p @click="setEditPostModal({ _id: props.id, message: props.message, userEmail: props.user })" class="text-xs ml-3 text-xs cursor-pointer underline text-violet-400">Update</p>
      </div>
    </the-card>
  </div>
</template>

<script setup lang="ts">
import { TheCard } from 'flowbite-vue';
import { useToast } from 'vue-toastification';
import { PropType } from 'vue';
import PostDataService from '../services/PostDataService';
import PostSchema from '../types/PostSchema';

const props = defineProps({
  message: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: String, required: true },
  id: { type: String, required: true },
  setEditPostModal: { type: Function, required: true },
  posts: {
    type: Object as PropType<PostSchema[]>,
    default() { return null; },
  },
  setPosts: {
    type: Function,
    default() { return null; },
  },
});

const toast = useToast();

const onDelete = () => {
  PostDataService.deletePost(props.id).then((res) => {
    if (res.status !== 200) {
      toast.error('Could not delete post');
    } else {
      const newPostsArray = props.posts.filter((post) => post._id !== props.id);
      props.setPosts(newPostsArray);
      toast.success('Deleted post');
    }
  });
};
</script>

<style scoped>

</style>
