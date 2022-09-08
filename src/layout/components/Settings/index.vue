<template>
  <div class="layout-setings">
    <el-button class="theme-button" type="primary" icon="Setting" @click="drawer = true"></el-button>
    <el-drawer v-model="drawer" :size="260" title="系统布局设置">
      <div class="theme-drawer">
        <div class="theme-drawer-body">
          <div class="theme-item">
            <span class="label">固定Header</span>
            <el-switch
              size="default"
              v-model="settings.fixedHeader">
            </el-switch>
          </div>
          <div class="theme-item">
            <span class="label">开启Tagsbar</span>
            <el-switch
              size="default"
              v-model="settings.tagsView">
            </el-switch>
          </div>
          <div class="theme-item">
            <span class="label">显示Logo</span>
            <el-switch
              size="default"
              v-model="settings.sidebarLogo">
            </el-switch>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" size="default" @click="handleSubmit">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import defaultSettings from '@/config/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const drawer = ref(false)
const settings = reactive({
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo
})
const settingsStore = useSettingsStore()
const themeChange = () => {}
const handleSubmit = () => {
  settingsStore.changeSetting(settings)
  drawer.value = false
}
</script>
<style lang="scss" scoped>
  .theme-button {
    height: auto;
    font-size: 20px;
    padding: 10px;
    position: fixed;
    top: 50%;
    right:0;
    z-index: 100;
    transition: right 0.3s;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .theme-drawer {
    .footer {
      padding:10px;
      text-align: right;
      .el-button {
        width: 100%;
      }
    }
    .theme-drawer-body {
      padding: 0 10px;
      .theme-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }
    }
  }
</style>