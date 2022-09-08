import { defineStore } from 'pinia'
import type { RouteRecordRaw, _RouteRecordBase } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断当前用户是否具有权限
 * @param roles
 * @param route
 */
 function hasPermission(roles:string[], route:RouteRecordRaw) {
  if (route.meta?.roles) {
    const _roles = (route.meta.roles || []) as string[]
    return roles.some(role => _roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
 export function filterAsyncRoutes(routes:RouteRecordRaw[], roles:string[]):RouteRecordRaw[] {
  const res:RouteRecordRaw[] = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
export const useRouteStore = defineStore({
  id: 'routes',
  state: () => ({
    routes: <RouteRecordRaw[]>[],
    dynamicRoutes: <RouteRecordRaw[]>[]
  }),
  getters: {
  },
  actions: {
    generateRoutes(roles:string[]) {
      return new Promise(resolve => {
        let accessedRoutes = []
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.routes = constantRoutes.concat(accessedRoutes)
        this.dynamicRoutes = accessedRoutes;
        resolve(accessedRoutes)
      })
    }
  }
})
