import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* 路由之前检查token */
router.beforeEach((to, from, next) => {
  next()
})

/* 路由之后关闭进度条 */
router.afterEach(() => {
  
})

export default router;