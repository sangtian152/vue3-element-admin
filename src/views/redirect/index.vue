<template>
  <span></span>
</template>
<script setup lang="ts" name="Redirect">
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter()
  const { params } = useRoute();
  onMounted(() => {
    setTimeout(() => {
      router.replace({path: decodeURIComponent(params.path as string)})
    }, 50)
  })
</script>