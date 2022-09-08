<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition :name="routeTransition || 'fade'" mode="out-in">
        <keep-alive>
          <suspense>
            <template #default>
              <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : route.name"
              />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const routeTransition = route.meta.transition as string
</script>