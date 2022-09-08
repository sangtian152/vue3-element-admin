<template>
  <el-aside class="sidebar-container" width="">
    <Logo v-if="sidebarLogo" :collapse="collapse" />
    <el-menu
      unique-opened
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="#545c64"
      :collapse="collapse"
      :default-active="activeMenu"
    >
      <template v-for="route in routes" :key="route.path">
        <Menu :item="route" :base-path="route.path" />
      </template>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/routes';
import { useAppStore } from '@/stores/app';
import { useSettingsStore } from '@/stores/settings'
import Logo from "./Logo.vue"
import Menu from "./MenuItem.vue"

const appStore =  useAppStore()
const routeStore = useRouteStore()
const settingsStore = useSettingsStore()

const routes = computed(() => {
  return routeStore.routes
})

const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  // 侧边栏菜单高亮
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const sidebarLogo = computed(() => {
  return settingsStore.settings.sidebarLogo
})
const collapse = computed(() => {
  return appStore.sidebar.collapse
})

onMounted(() => {
  routeStore.generateRoutes(['admin'])
})
</script>