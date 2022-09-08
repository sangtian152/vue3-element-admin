<template>
  <component :is="component" v-bind="linkProps">
    <slot />
  </component>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { isExternal } from "@/utils/validate";

  const { to = '' } = defineProps({
    to: String
  })
  const linkProps = computed(() => {
    if (isExternal(to)) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
  })
  const component = computed(() => {
    if (isExternal(to)) {
      return 'a'
    }
    return 'router-link'
  })
</script>