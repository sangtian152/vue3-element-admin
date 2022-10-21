<template>
  <el-config-provider :size="'small'">
    <el-container class="app-container" :class="classObj">
      <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleClickOutside" />
      <Sidebar />
      <el-container class="main-container" :class="{'has-tags-view':showTagsView}" direction="vertical">
        <div :class="{'fixed-header':fixedHeader}">
          <Navbar />
          <TagsView v-if="showTagsView" />
        </div>
        <AppMain />
      </el-container>
      <Settings />
    </el-container>
  </el-config-provider>
</template>
<script setup lang="ts">
  import { computed, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
  import { useAppStore } from '@/stores/app';
  import { useSettingsStore } from '@/stores/settings'
  // import { $_isMobile, $_resizeHandler } from '@/utils/resizeHandler'
  import { AppMain, Navbar, Sidebar, TagsView, Settings } from './components'

  const appStore =  useAppStore()
  const settingsStore = useSettingsStore()
  const showTagsView = computed(() => {
    return settingsStore.settings.tagsView
  })
  const fixedHeader = computed(() => {
    return settingsStore.settings.fixedHeader
  })
  const classObj = computed(() => {
    return {
        mobile: appStore.device === 'mobile',
        hideSidebar: appStore.sidebar.collapse,
        openSidebar: !appStore.sidebar.collapse,
      }
  })
  const $_isMobile = () => {
    const WIDTH = 992
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        appStore.toggleSideBar(true)
      }
    }
  }
  const handleClickOutside = () => {
    appStore.toggleSideBar(true)
  }
  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      appStore.toggleDevice('mobile')
      appStore.toggleSideBar(true)
    }
  })
</script>