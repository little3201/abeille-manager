import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach(to => {
  if (to.fullPath === '/signin') {
    sessionStorage.removeItem("user")
  }
  return true
})

/* 路由之后 */
router.afterEach(() => {

})

export default router;