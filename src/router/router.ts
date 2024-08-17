import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useUserStore } from '../stores/user';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach(async to => {
  if (!await useUserStore().userGet() && to.name !== 'Login') return { name: 'Login' };
});
