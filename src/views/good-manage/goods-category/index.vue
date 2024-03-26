<template>
  <div>
    <el-card>
      <h3>友情提醒！！！</h3>
      <p>您在本网站购买的商品，如遇任何问题请咨询客服微信：maiyunshare ，备注：麦云分享</p>
    </el-card>

    <el-card class="mt-[12px]">
      <goods-category />
    </el-card>

    <div class="mt-[24px] mb-[15px]">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/resource/home' }">网站首页</el-breadcrumb-item>
        <el-breadcrumb-item
          >{{ categoryName }}
          <span v-show="total > 0" class="icon-spot"> ( 共{{ total }}篇 )</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <goods-list :category-id="categoryid" @setTotal="changeTotal" />
  </div>
</template>

<script setup lang="ts">
import { GoodsCategory, GoodsList } from '@/views/home/components'

const route = useRoute()

const total = ref(0)
const categoryid = ref()
const categoryName = ref('')

const changeTotal = (count) => {
  total.value = count
}

const run = () => {
  const { id, name } = route.params
  if (id) {
    categoryName.value = name as string
    categoryid.value = Number(id)
  }
}

onMounted(() => {
  run()
})

watch(
  () => route.params.id,
  (newVal, preVal) => {
    if (newVal && newVal !== preVal) {
      run()
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
