import router, { addRoutes } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import type { MessageParamsWithType } from 'element-plus'
import type { RouteLocationNormalized } from 'vue-router'
import setting from './settings'
import { useRouteStore } from '@/stores/routes'
import { useUserStore } from '@/stores/user'
NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/image/watermark'];

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next:Function)=>{
  const userStore = useUserStore()
  const routeStore = useRouteStore()
  NProgress.start();
  if (userStore.token) {
    if (to.path === '/login') {
      // If is login, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (userStore.roles.length === 0) {
        try {
          await userStore.getUserInfo()
          const roles = userStore.roles
          // Generate accessible routes map based on role
          routeStore.generateRoutes(roles);
          // Dynamically add accessible routes
          addRoutes(routeStore.dynamicRoutes);

          next()
        } catch(err) {
          userStore.resetToken();
          ElMessage.error((err || "error") as MessageParamsWithType)
          next(`/login?redirect=${to.path}`);
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach((to: RouteLocationNormalized) => {
	NProgress.done();
	document.title = to.meta?.title as string || '';
})