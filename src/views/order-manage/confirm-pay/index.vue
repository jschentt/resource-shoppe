<template>
  <div class="iframe-container">
    <iframe :src="iframeSrc" frameborder="0" height="100%" width="100%"></iframe>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const iframeSrc = route.query.payUrl as string
</script>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
