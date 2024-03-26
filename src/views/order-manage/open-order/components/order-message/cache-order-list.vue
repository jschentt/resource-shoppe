<template>
  <div class="order-container">
    <template v-if="orderList.length > 0">
      <el-card
        v-for="order in orderList"
        :key="order.id"
        shadow="hover"
        class="mb-[10px] cursor-pointer"
        @click="$router.push(`/resource/order-detail/${order.orderNo}`)"
      >
        <order-item :data="order" />
      </el-card>
      <div class="loading" v-show="loading || isBottom">
        <el-icon class="is-loading" v-show="loading"><Loading /></el-icon>
        <span class="ml-[5px]" v-show="loading">加载中...</span>
        <span v-show="isBottom">没有更多数据了</span>
      </div>
    </template>
    <template v-else>
      <el-empty :image-size="200" description="暂无数据" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import OrderItem from '@/views/order-manage/auth-order/order-item.vue'
import { fetchEmailOrderList } from '@/api/orders'
import { uniqueArray, debounce } from '@/libs'

const orderList = ref([])

const pages = reactive({
  pageIndex: 1,
  pageSize: 12
})

const loading = ref(true)
const isBottom = ref(false)

const getOrdersList = async () => {
  loading.value = true

  const cacheEmail = localStorage.getItem('email')

  if (!cacheEmail) {
    return
  }

  const res = await fetchEmailOrderList({
    email: cacheEmail,
    ...pages
  })

  if (res?.list?.length <= 0) {
    isBottom.value = true
    loading.value = false
    return
  }

  orderList.value = uniqueArray(orderList.value.concat(res.list) ?? [], 'id')
  pages.pageIndex++

  if (orderList.value.length <= 6) {
    loading.value = false
  }
}

// 下拉加载
const refresh = debounce(() => {
  getOrdersList()
}, 500)

// 判断页面是否触底
const checkScrollToBottom = () => {
  // 获取滑动内容外部盒子高度
  const windowHeight = document.querySelector('.layout-container').clientHeight
  // 获取整个内容的高度
  const { scrollHeight } = document.querySelector('.tabs-view')
  // 获取卷曲出去的高度
  const { scrollTop } = document.querySelector('.layout-container')

  // 外部盒子高度+卷曲出去的高度>=内容的高度 - 离底部距离高度（自定义）
  if (scrollTop + windowHeight >= scrollHeight - 100 && !isBottom.value) {
    refresh()
  }
}

onMounted(() => {
  getOrdersList().then(() => {
    document
      .querySelector('.layout-container')
      .addEventListener('scroll', () => checkScrollToBottom(), false)
  })
})

onUnmounted(() => {
  document
    .querySelector('.layout-container')
    .removeEventListener('scroll', () => checkScrollToBottom(), false)
})
</script>

<style lang="scss" scoped>
.order-container {
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20px;
    width: 100%;
    margin-top: 20px;
    font-size: 13px;
    color: #999999;
  }
}
</style>
