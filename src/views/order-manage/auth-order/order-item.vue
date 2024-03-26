<template>
  <div @click="jumpGoodDetail">
    <div class="container">
      <div class="cover">
        <el-image
          :src="data?.pictures?.[0] ?? defaultImg"
          fit="cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div class="content">
        <div class="font-semibold truncate">{{ data?.goodName }}</div>
        <div class="mt-[5px]">
          <span class="text-gray-400">订单编号：</span>
          <span>{{ data?.orderNo }}</span>
        </div>
        <div class="mt-[5px] pc-order-date">
          <span class="text-gray-400">下单日期：</span>
          <span>{{ dayjs(data?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
        <div class="mt-[5px]">
          <span class="text-gray-400">实付款：</span>
          <el-tag type="danger">{{ formatYuanPrice(data?.realPrice) }}</el-tag>
        </div>
        <div class="mt-[5px]">
          <span class="text-gray-400">金币抵扣：</span>
          <el-tag type="success">{{ formatYuanPrice(data?.payPrice) }}</el-tag>
        </div>
      </div>
    </div>
    <div class="mobile-order-date">
      <span class="text-gray-400">下单日期：</span>
      <span>{{ dayjs(data?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import NP from 'number-precision'
import dayjs from 'dayjs'
import { numberFixed } from '@/libs'
import { defaultImg } from '@/views/home/const'

enum RESOURCE_STATUS {
  // 禁用
  FORBIDDEN = 0,
  // 启用
  ENABLE = 1
}

const props = defineProps({
  data: {
    type: Object
  }
})

const router = useRouter()

// 跳转到商品详情
const jumpGoodDetail = () => {
  if (props?.data?.state === RESOURCE_STATUS.FORBIDDEN) {
    return
  }
  router.push(`/resource/good-detail/${props?.data?.goodId}`)
}

// 金额转换为元
const formatYuanPrice = (price = 0) =>
  numberFixed(NP.divide(price, 100), 2, {
    unit: true
  })
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;

  .cover {
    width: 120px;
    text-align: center;
    ::v-deep(.el-image) {
      border-radius: 3px;
      margin: 0 auto;
      max-width: 100%;
      height: 120px;
      display: block;
    }
  }

  .content {
    width: calc(100% - 100px);
    padding-left: 15px;
  }
}

@media screen and (max-width: 768px) {
  .pc-order-date {
    display: none;
  }
  .mobile-order-date {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}

@media screen and (min-width: 768px) {
  .mobile-order-date {
    display: none;
  }
  .pc-order-date {
    display: block;
  }

  .cover {
    width: 160px !important;
    height: 160px;
    text-align: center;
    ::v-deep(.el-image) {
      border-radius: 3px;
      margin: 0 auto;
      width: 160px !important;
      height: 160px !important;
      display: block;

      img {
        width: 160px !important;
        height: 160px !important;
      }
    }
  }
}
</style>
