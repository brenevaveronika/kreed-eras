import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/views/Home.vue';
import SongPage from '@/components/views/SongPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/song/:id', name: 'song', component: SongPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;