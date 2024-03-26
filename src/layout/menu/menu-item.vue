<template>
  <template v-if="!menuInfo.meta.hidden">
    <el-sub-menu v-if="menuInfo.children?.length" :index="menuInfo.name" v-bind="$attrs">
      <template #title>
        <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" />
        <span>{{ menuInfo.meta.title }}</span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.meta.hidden">
          <template v-if="!item.children">
            <router-link :to="{ name: item.name }">
              <el-menu-item :index="item.name">
                <icon-font style="color: aliceblue" :type="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </template>
          <template v-else>
            <menu-item :menu-info="item" :key="item.name" />
          </template>
        </template>
      </template>
    </el-sub-menu>
    <router-link v-else :to="{ name: menuInfo.name }">
      <el-menu-item :index="menuInfo.name">
        <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" />
        <span>{{ menuInfo.meta.title }}</span>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IconFont } from '@/components/iconfont'

export default defineComponent({
  name: 'menu-item',
  components: {
    IconFont
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
