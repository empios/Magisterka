<template>
  <div>
    <navbar is-active="Panel" :is-logged-out="!checkedLoggedOut" :email="email" />
    <div v-show="checkedLoggedOut" class="h-screen">
      <div class="flex justify-end">
        <Button @click="openAddModal" class="mr-40 mt-10">Add Post</Button>
      </div>
      <div class="grid lg:grid-cols-3 grid-cols-1 my-5">
        <user-post
          v-bind:key="post._id"
          v-for="post in userPosts"
          :date="new Date(post.createdAt).toDateString()"
          :id="post._id"
          :user="post.userEmail"
          :message="post.message"
          :set-edit-post-modal="openEditModal"
          :posts="userPosts"
          :set-posts="setPosts" />
      </div>
    </div>
    <LoggedOut v-show="!checkedLoggedOut" />
    <add-update-modal
      :close-modal="closeModal"
      :show-modal="showModal"
      :add-new-post="addNewPostState"
      :current-post="currentPost"
      :is-editing="!!currentPost"
      :posts="userPosts"
      :set-posts="setPosts" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button } from 'flowbite-vue';
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';
import PostDataService from '../../services/PostDataService';
import PostSchema from '../../types/PostSchema';
import UserPost from '../UserPost.vue';
import LoggedOut from '../LoggedOut.vue';
import AddUpdateModal from '../AddUpdateModal.vue';

const email = localStorage.getItem('user');
const token = localStorage.getItem('token');

const checkedLoggedOut = !!(email && token);
const userPosts = ref<PostSchema[]>([]);
const showModal = ref(false);
const currentPost = ref<PostSchema>();

function addNewPostState(data: PostSchema) {
  userPosts.value = [...userPosts.value, data];
}

const closeModal = () => {
  showModal.value = false;
};

const setPosts = (data: PostSchema[]) => {
  userPosts.value = data;
};

const openEditModal = (post: PostSchema) => {
  currentPost.value = post;
  showModal.value = true;
};

const openAddModal = () => {
  currentPost.value = undefined;
  showModal.value = true;
};

function setUserPosts(data: PostSchema[]) {
  userPosts.value = data;
}

onMounted(async () => {
  if (email) {
    const response = await PostDataService.fetchPostsByEmail(email);
    setUserPosts(response.data.data);
  }
});

</script>
