<template>
  <div class="flex justify-center">
    <div class="justify-center flex-row mx-10 w-full bg-amber-100 rounded-md">
      <h1 class="my-5 text-center text-xl">Recent Post List</h1>
      <div class="grid grid-cols-3 mb-5">
        <post
          v-bind:key="post._id"
          v-for="post in posts"
          :date="new Date(post.createdAt).toDateString()"
          :user="post.userEmail"
          :message="post.message"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PostDataService from '../services/PostDataService';
import PostSchema from '../types/PostSchema';
import Post from './Post.vue';

const posts = ref<PostSchema[]>([]);

function setPosts(data: PostSchema[]) {
  posts.value = data;
}

onMounted(async () => {
  const response = await PostDataService.fetchPost();
  setPosts(response.data.data);
});
</script>
