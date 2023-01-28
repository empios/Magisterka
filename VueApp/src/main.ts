import { createApp } from 'vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';
import Toast from 'vue-toastification';
import App from './App.vue';
import FirstPage from './components/pages/FirstPage.vue';
import SecondPage from './components/pages/SecondPage.vue';
import 'vue-toastification/dist/index.css';

const routes = [
  { path: '/', component: FirstPage, name: 'Home' },
  { path: '/panel', component: SecondPage, name: 'Panel' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(Toast).mount('#app');
