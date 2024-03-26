<template>
  <div class="logo" @click="$router.push('/resource/home')">
    <svg-icon icon-class="icon-logo" />
    <h2 v-show="!collapsed" class="title">{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SvgIcon } from '@/components/svg-icon'
import { isMobile } from '@/libs'

export default defineComponent({
  name: 'index',
  components: { SvgIcon },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const title = ref('麦云分享')
    const route = useRoute()

    const createShareGoodTitle = (path) => {
      title.value = path !== '/resource/home' && isMobile() ? '首页' : '麦云分享'
    }

    onMounted(() => {
      createShareGoodTitle(route.path)
    })

    watch(
      () => route.path,
      (newVal) => {
        createShareGoodTitle(newVal)
      }
    )

    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  h2 {
    position: relative;
    top: 1px;
    font-size: 18px;
  }

  .svg-icon {
    font-size: 32px;
    margin-right: 5px;
  }

  .title {
    margin-bottom: 0;
  }
}
</style>
