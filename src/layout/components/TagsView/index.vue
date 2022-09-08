<template>
  <div class="tags-view">
    <div class="tags-view-scroll">
      <el-tabs
        v-model="tagsValue"
        type="card"
        @tab-click="handleClick"
        @tab-remove="handleClose"
      >
        <el-tab-pane
          v-for="item in dynamicTags"
          :key="item.name"
          :label="item.meta?.title"
          :name="item.name"
          :closable="!item.meta?.affix"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="refresh">刷新页签</el-dropdown-item>
          <el-dropdown-item command="closeLeft">关闭左侧</el-dropdown-item>
          <el-dropdown-item command="closeRight">关闭右侧</el-dropdown-item>
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import path from 'path-browserify'
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsStore } from '@/stores/tagsView'
import { useRouteStore } from '@/stores/routes'
import type { _RouteRecordBase, RouteRecordRaw, _RouteTagsView } from 'vue-router'
import type { TabsPaneContext, TabPanelName } from 'element-plus'
const tagsStore = useTagsStore()
const routeStore = useRouteStore()
const dynamicTags = computed(() => {
  return tagsStore.visitedViews || []
})
const route = useRoute()
const router = useRouter()
const tagsValue = ref(route.name)
onMounted(() => {
  initTags();
  addTags(route);
})
watch(route, () => {
  addTags(route)
})

let affixTags:_RouteTagsView[] = []
const initTags = () => {
  affixTags = filterAffixTags(routeStore.routes);
  for (const tag of affixTags) {
    if (tag.name) {
      tagsStore.addVisitedView(tag)
    }
  }
}
const filterAffixTags = (routes: RouteRecordRaw[], basePath = "/") => {
  let tags: _RouteTagsView[] = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({...route, path: tagPath, fullPath: tagPath});
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
}

const isActive = (tag:_RouteTagsView) => {
  return route.path === tag.path
}

const toLastView = (visitedViews:_RouteTagsView[]) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    router.push('/')
  }
}

const addTags = (route:_RouteTagsView) => {
  if (route.name) {
    tagsValue.value = route.name
    tagsStore.addView(route)
  }
  return false
}
const refreshRoute = () => {
  tagsStore.delCachedView(route);
  const { fullPath } = route
  nextTick(() => {
    router.replace({
      path: '/redirect/' + encodeURIComponent(fullPath)
    })
  })
}
const closeOtherRoutes = () => {
  tagsStore.delOthersViews(route);
}

const closeAllRoutes = () => {
  tagsStore.delAllViews();
  if (affixTags.some(tag => tag.path === route.path)) {
    return
  }
  router.push("/")
}

const handleClick = (panel:TabsPaneContext) => {
  const tag = tagsStore.visitedViews.find(item => item.name === panel.paneName)
  if (tag) {
    router.push(tag.fullPath)
  }
}
const handleClose = (name: TabPanelName) => {
  const tag = tagsStore.visitedViews.find(item => item.name === name)
  if (tag) {
    tagsStore.delView(tag).then(visitedViews => {
      if (isActive(tag)) {
        toLastView(visitedViews as _RouteTagsView[])
      }
    })
  }
}

const handleCommand = (command:string) => {
  if( command=== 'refresh') {
    refreshRoute()
  } else if (command === 'closeOther') {
    closeOtherRoutes()
  } else if(command === 'closeLeft'){
    // this.closeLeftRoutes()
  } else if (command === 'closeRight') {
    // this.closeRightRoutes()
  } else if (command === 'closeAll') {
    closeAllRoutes()
  }
}

</script>
<style lang="scss" scoped>
.tags-view {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .el-scrollbar {
    flex: 1;
  }
  .scrollbar-flex-content {
    display: flex;
    height: 33px;
    align-items: center;
  }
  .el-tag {
    & + .el-tag {
      margin-left: 10px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    font-size: 12px;
  }
}

</style>