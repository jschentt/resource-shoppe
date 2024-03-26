<template>
  <div class="container">
    <transition name="zoom-fade" mode="out-in" appear>
      <div v-if="list?.length > 0">
        <el-row :gutter="8">
          <el-col v-for="good in list" :key="good.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
            <good-detail :data="good" :good-type="activeName" />
          </el-col>
        </el-row>
        <div class="loading" v-show="loading || isBottom">
          <el-icon class="is-loading" v-show="loading"><Loading /></el-icon>
          <span class="ml-[5px]" v-show="loading">加载中...</span>
          <span v-show="isBottom">没有更多数据了</span>
        </div>
      </div>
      <div v-else>
        <el-empty :image-size="200" description="暂无数据" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { GoodDetail } from '@/views/home/components'
import { fetchLikeGoodList, fetchFavoriteGoodList } from '@/api/behaviour'
import { debounce } from '@/libs'

const props = defineProps({
  activeName: {
    type: String
  }
})

const pages = reactive({
  pageIndex: 1,
  pageSize: 12
})

const isBottom = ref(false)
const loading = ref(true)
const list = ref([])

const fetchGoodsList = async () => {
  let res = null
  if (props.activeName === 'favorite') {
    res = await fetchFavoriteGoodList({
      ...pages
    })
  } else if (props.activeName === 'like') {
    res = await fetchLikeGoodList({
      ...pages
    })
  }

  if (res?.list?.length <= 0) {
    isBottom.value = true
    loading.value = false
    return
  }

  list.value = list.value.concat(res.list)
  pages.pageIndex++

  if (list.value.length <= 6) {
    loading.value = false
  }
}

// 下拉加载
const refresh = debounce(() => {
  fetchGoodsList()
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

const init = () => {
  list.value = []
  pages.pageIndex = 1
  isBottom.value = false
  loading.value = true
  fetchGoodsList()
}

onMounted(() => {
  document
    .querySelector('.layout-container')
    .addEventListener('scroll', () => checkScrollToBottom(), false)
})

onUnmounted(() => {
  document
    .querySelector('.layout-container')
    .removeEventListener('scroll', () => checkScrollToBottom(), false)
})

watch(
  () => props.activeName,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      init()
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
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
