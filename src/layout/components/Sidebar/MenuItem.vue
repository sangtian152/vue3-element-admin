<template>
  <div v-if="!item.hidden && !item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild?.children || onlyOneChild.noShowingChildren) &&!item.meta?.alwaysShow">
      <app-link v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild.path)">
        <item :index="resolvePath(onlyOneChild.path)" :icon="onlyOneChild.meta.icon || item.meta?.icon" :title="routeTitle" :isNest="isNest" />
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts" name="MenuItem">
import { ref, computed, } from 'vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'
import type { _RouteRecordBase, _RouteRecordPartial } from 'vue-router'
const { item, isNest = false, basePath = '' } = defineProps({
  // 路由对象
  item: {
    type: Object,
    required: true
  },
  isNest: Boolean,
  basePath: String
})
const onlyOneChild = ref<_RouteRecordBase>()
const routeTitle = computed(() => {
  return onlyOneChild.value?.meta?.title as string
})

const hasOneShowingChild = (children: _RouteRecordBase[] = [], parent: _RouteRecordPartial) => {
  const showingChildren = children.filter(item => {
    if (item.meta?.hidden) {
      return false
    } else {
      // 临时保存当前路由，只有一个显示子项时将使用
      onlyOneChild.value = item
      return true
    }
  })

  // 如果只有一个子路由
  if (showingChildren.length === 1) {
    return true
  }
  // 如果只有一个字路由，展示父级
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
    return true
  }
  
  return false
}
const resolvePath = (routePath='') => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(basePath)) {
    return basePath
  }
  return path.resolve(basePath, routePath)
}
</script>
