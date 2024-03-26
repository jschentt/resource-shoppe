<template>
  <div class="container">
    <transition name="zoom-fade" mode="out-in" appear>
      <div v-if="isReady">
        <div v-if="list?.length > 0">
          <el-row :gutter="8" class="mt-[10px]">
            <el-col v-for="good in list" :key="good.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
              <good-detail :data="good" />
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
      </div>
      <div v-else>
        <div class="loading-box">
          <awesome-loading />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, defineExpose } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import AwesomeLoading from '@/components/loading/index.vue'
import { GoodDetail } from '@/views/home/components'
import { fetchGoodListByTagId } from '@/api/goods'
import { debounce } from '@/libs'

const props = defineProps({
  tagId: {
    type: Number
  }
})

const emit = defineEmits(['setTotal'])

const pages = reactive({
  pageIndex: 1,
  pageSize: 12
})

const isReady = ref(false)
const isBottom = ref(false)
const loading = ref(true)
const list = ref([])

const fetchGoodsList = async () => {
  try {
    const res = await fetchGoodListByTagId(
      {
        ...pages
      },
      props.tagId
    )

    emit('setTotal', res.total)

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
  } finally {
    isReady.value = true
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

defineExpose({
  fetchGoodsList: init
})

watch(
  () => props.tagId,
  (newVal, preVal) => {
    if (newVal && newVal !== preVal) {
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
  .loading-box {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 50px 0;
  }
}
</style>
