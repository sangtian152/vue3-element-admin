<template>
  <el-config-provider :size="'small'">
    <el-container class="app-container" :class="classObj">
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
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/app';
  import { useSettingsStore } from '@/stores/settings'
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
        hideSidebar: appStore.sidebar.collapse,
        openSidebar: !appStore.sidebar.collapse,
      }
  })
</script>