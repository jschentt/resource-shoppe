<template>
  <el-menu
    :default-active="selectedKeys"
    :default-openeds="openKeys"
    :collapse="collapsed"
    :collapse-transition="false"
    mode="vertical"
    :unique-opened="true"
    text-color="#fff"
    active-text-color="#40a082"
    background-color="#545c64"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MenuItem from './menu-item.vue'
import { routes } from '@/router'

export default defineComponent({
  components: {
    MenuItem
  },
  props: {
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    }
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.name]

    const state = reactive({
      openKeys: getOpenKeys() as any[],
      selectedKeys: currentRoute.name as any
    })

    const menus = computed(() => routes.find((item) => item.name === 'Layout')!.children)

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys()
        state.selectedKeys = currentRoute.name
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name === 'login' || props.collapsed) return
        state.openKeys = getOpenKeys()
        state.selectedKeys = currentRoute.name
      }
    )

    // 点击菜单
    const clickMenuItem = (key: string) => {
      router.push({ name: key })
    }

    return {
      ...toRefs(state),
      menus,
      clickMenuItem
    }
  }
})
</script>
<style lang="scss">
.el-menu {
  border-right: none !important;
  .el-sub-menu__title,
  .el-menu-item {
    & > span {
      padding-left: 5px !important;
    }
  }
}
</style>
