<template>
  <component :is="component" v-bind="menuProps">
    <el-icon v-if="icon">
      <component :is="icon" />
    </el-icon>
    <span v-if="subMenu">{{title}}</span>
    <template v-if="!subMenu && title" #title>{{title}}</template>
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const { icon = '', title = '', index, isNest } = defineProps({
    icon: String,
    title: String,
    index: String,
    isNest: Boolean
  })
  const subMenu = computed(() => {
    return !index
  })
  // index 有值说明是 el-menu-item
  const component = computed(() => {
    return index ? 'el-menu-item' : 'div'
  })

  const menuProps = computed(() => {
    if (index) {
        return {
          index,
          class: !isNest ? 'submenu-title-noDropdown' : '',
        }
      }
  })
</script>
