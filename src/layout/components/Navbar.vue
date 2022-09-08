<template>
  <el-header class="navbar">
    <div class="left">
      <el-icon class="collapse" @click="toggleSideBar(!collapse)">
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">{{item.meta?.title || ''}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
        <el-avatar :size="40" :src="avatarUrl" />
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { ArrowRight } from '@element-plus/icons-vue'
import defaultUrl from '@/assets/avatar.gif'
const appStore =  useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const avatarUrl = computed(() => {
  return userStore.avatar || defaultUrl
})
const collapse = computed(() => {
  return appStore.sidebar.collapse
})
const breadcrumb = computed(() => {
  return route.path!=='/home' ? route.matched : []
})

const toggleSideBar = (collapse:boolean) => {
  appStore.toggleSideBar(collapse)
}
const handleCommand = (command:string) => {
  if (command === 'logout') {
    userStore.logout().then(() => {
      router.push({path: '/login'})
    })
  }
} 
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .collapse {
    cursor: pointer;
    font-size: 24px;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .avatar-container {
    .el-avatar {
      cursor: pointer;
    }
  }
  .el-breadcrumb {
    margin-left: 8px;
  }
}
</style>