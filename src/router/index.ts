import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw,_RouteRecordBase } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
 export const constantRoutes:RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {title: '用户登录', hidden: true},
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/home/index.vue"),
        name: 'Home',
        meta: { title: 'Dashboard', icon: 'HomeFilled', affix: true }
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    redirect: '/image/watermark',
    name: 'Image',
    meta: {title: '图片', icon: 'Picture'},
    children: [
      {
        path: 'watermark',
        component: () => import('@/views/image/index.vue'),
        name: 'Watermark',
        meta: { title: '图片加水印' }
      },
    ]
  },
  {
    path: '/tree',
    component: Layout,
    redirect: '/tree/base',
    name: 'Tree',
    meta: {title: '组织树', icon: 'Picture', alwaysShow: true },
    children: [
      {
        path: 'base',
        component: () => import('@/views/tree/index.vue'),
        name: 'TreeBase',
        meta: { title: '组织树'}
      },
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {title: 'Table', icon: 'Grid'},
    children: [
      {
        path: 'dynamic-table',
        component: () => import('@/views/table/dynamic.vue'),
        name: 'DynamicTable',
        meta: { title: 'Dynamic Table' }
      },
      {
        path: 'drag-table',
        component: () => import('@/views/home/index.vue'),
        name: 'DragTable',
        meta: { title: 'Drag Table' }
      },
      {
        path: 'inline-edit-table',
        component: () => import('@/views/home/index.vue'),
        name: 'InlineEditTable',
        meta: { title: 'Inline Edit' }
      },
      {
        path: 'complex-table',
        component: () => import('@/views/home/index.vue'),
        name: 'ComplexTable',
        meta: { title: 'Complex Table' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes:RouteRecordRaw[] = [

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...constantRoutes,
    ...asyncRoutes
  ]
})

export const addRoutes = (routes:RouteRecordRaw[]) => {
  for(let i = 0; i < routes.length; i++) {
    router.addRoute(routes[i])
  }
}

export default router
