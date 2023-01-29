<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <div class="mb-2 block">
      <label for="message">Your Post</label>
      <textarea
        placeholder="Enter a message"
        id="message"
        v-model="message"
        required
        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <Button type="submit">{{props.isEditing ? 'Edit' : 'Add'}}</Button>
  </form>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue';
import { onMounted, PropType, ref } from 'vue';
import { useToast } from 'vue-toastification';
import PostDataService from '../services/PostDataService';
import PostSchema from '../types/PostSchema';

const toast = useToast();
const email = localStorage.getItem('user');
const message = ref<string>();

const props = defineProps({
  addNewPost: {
    type: Function,
    required: true,
  },
  closeModal: {
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

onMounted(() => {
  if (props.currentPost) {
    message.value = props.currentPost.message;
  }
});

const onSubmit = () => {
  if (email && message.value) {
    const newPost: PostSchema = {
      userEmail: email,
      message: message.value,
    };
    if (!props.currentPost) {
      PostDataService.addPost(newPost).then((res) => {
        if (res.status !== 201) {
          toast.error('Could not create post');
          return;
        }
        props.addNewPost(res.data.data);
        toast.success('Added new post');
        props.closeModal();
      });
    } else if (props.currentPost._id) {
      PostDataService.updatePost(newPost, props.currentPost._id).then((res) => {
        if (res.status === 200) {
          const newPostsArray = props.posts.map((post) => {
            if (post._id === props.currentPost._id) {
              return {
                ...post,
                message: newPost.message,
              };
            }
            return post;
          });
          props.setPosts(newPostsArray);
          props.closeModal();
          toast.success('Post edited');
        } else {
          toast.error('Could not update post');
        }
      });
    } else {
      toast.error('Error with post');
    }
  }
};
</script>
