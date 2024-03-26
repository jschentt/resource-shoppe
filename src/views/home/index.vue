<template>
  <div class="page">
    <adv-banner />

    <div class="mt-[12px]"><good-tags @refresh="getAppVersion" /></div>

    <el-card class="mt-[12px]">
      <el-input
        v-model="keywords"
        placeholder="请输入关键字查询"
        size="large"
        @keyup.enter.native="onSearch"
      >
        <template #suffix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-card>

    <el-card class="mt-[12px]">
      <goods-category />
    </el-card>

    <div class="content mt-[12px]">
      <div class="tag-group">
        <el-button :autofocus="true" @click="switchMenu('recommend')">猜你喜欢</el-button>
        <el-button @click="switchMenu('new')">最新发布</el-button>
        <el-button @click="switchMenu('points')">金币兑换</el-button>
      </div>
      <goods-list :active-name="activeName" :keywords="keywords" ref="refMode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { GoodsList, GoodsCategory, GoodTags } from './components'
import AdvBanner from '@/components/adv-banner/index.vue'
import { getAppInfo } from '@/api/auth'

const keywords = ref('')
const activeName = ref('recommend')
const refMode = ref(null)
const route = useRoute()

const switchMenu = (menu: string) => {
  activeName.value = menu
}

const onSearch = () => {
  refMode.value.fetchGoodsList()
}

// 判断 APP 更新版本，刷新本地缓存
const getAppVersion = async () => {
  const source = localStorage.getItem('source')

  if (route?.query?.source !== 'app' && source !== 'app') {
    return
  }

  try {
    const res = await getAppInfo()

    const version = localStorage.getItem('version')

    if (version && version !== res.version) {
      window.location.reload()
    }

    localStorage.setItem('version', res.version)
  } finally {
    localStorage.setItem('source', 'app')
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  border-radius: 5px;

  ::v-deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  .content {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    .tag-group {
      display: flex;
      justify-content: flex-start;

      ::v-deep(.el-button) {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        font-size: 13px;
        padding: 18px 24px;
        margin-bottom: 5px;
        margin-left: 0px;
        margin-right: 12px;
        border: none;
        outline: none;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

        &:last-child {
          margin-right: 0px;
        }

        &::before {
          content: '';
          position: relative;
          left: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 1.2px;
          background: #409eff;
          box-shadow: 5px -6px #409eff, 5px 6px #409eff;
          transition: width 0.5s, left 0.5s, height 0.5s, box-shadow 0.5s;
          transition-delay: 1s, 1s, 0.5s, 0s, 0s;
        }
      }
    }

    @media screen and (min-width: 350px) and (max-width: 365px) {
      .tag-group {
        display: flex;
        justify-content: space-between;

        ::v-deep(.el-button) {
          padding-left: 24px;
          padding-right: 15px;
          margin-left: 0px;
          margin-right: 0px;
          font-size: 14px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }

    @media screen and (max-width: 350px) {
      .tag-group {
        display: flex;
        justify-content: flex-start;
        overflow-x: auto;

        ::v-deep(.el-button) {
          padding-left: 24px;
          padding-right: 15px;
          margin-left: 0px;
          margin-right: 5px;
          font-size: 14px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>
