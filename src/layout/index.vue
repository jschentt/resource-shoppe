<template>
  <el-container class="layout">
    <el-container class="layout-container">
      <page-header v-model:collapsed="collapsed" />
      <div class="layout-content">
        <el-main>
          <tabs-view />
        </el-main>
      </div>
      <page-footer />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { TabsView } from './tabs'
import PageHeader from './header/index.vue'
import PageFooter from '@/layout/footer'

export default defineComponent({
  name: 'Layout',
  components: {
    TabsView,
    PageHeader,
    PageFooter
  },
  setup() {
    const collapsed = ref<boolean>(false)

    const asiderWidth = computed(() => (collapsed.value ? '64px' : '200px'))

    return {
      collapsed,
      asiderWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  overflow: hidden;
  height: 100vh;

  .layout-container {
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #f5f5f5;
    overflow: auto;
    width: 100%;

    .layout-content {
      display: flex;
      justify-content: center;
      width: 100%;
      /* height: calc(100vh - #{$header-height} - #{$footer-height}); */
      ::v-deep(.el-main) {
        padding: 0;
        width: 100%;
      }
    }
  }

  ::v-deep(.el-aside) {
    background-color: #545c64;
    overflow: hidden;
  }
}
</style>
