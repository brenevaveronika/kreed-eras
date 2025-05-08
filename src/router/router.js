import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/views/Home.vue';
import Album from '@/components/views/Album.vue';
import SongPage from '@/components/views/SongPage.vue'; // Импортируем новую страницу

const routes = [
  { path: '/', component: Home },
  { path: '/album/:id', component: Album },
  { path: '/song/:id', name: 'song', component: SongPage }, // Добавляем новый маршрут
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;