import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Album from '../views/Album.vue';
import Track from '../views/Track.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/album/:id', component: Album },
  { path: '/track/:id', component: Track },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;