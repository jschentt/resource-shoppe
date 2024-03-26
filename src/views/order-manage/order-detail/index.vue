<template>
  <div class="page">
    <el-card class="mb-[16px]">
      <h3>友情提醒！！！</h3>
      <p>您在本网站购买的商品，如遇任何问题请咨询客服微信：maiyunshare ，备注：麦云分享</p>
    </el-card>

    <el-skeleton :loading="loading" animated class="mb-[16px]" v-if="!showError">
      <template #default>
        <el-card class="cursor-pointer">
          <order-item :data="data" />
        </el-card>
      </template>
    </el-skeleton>

    <el-skeleton :loading="loading" animated v-if="!showError">
      <template #default>
        <el-card class="mt-[16px]" body-style="word-wrap: break-word">
          <template #header>
            <span class="font-semibold mr-[15px]">网盘地址</span>
            <el-button type="primary" size="small" @click="copyGoodUrl">复制</el-button>
          </template>
          <a :href="data?.goodUrl" class="link" target="_blank">{{ data?.goodUrl }}</a>
        </el-card>
      </template>
    </el-skeleton>

    <el-result icon="warning" v-if="showError">
      <template #sub-title>
        <p>{{ showErrorMessage }}</p>
      </template>
      <template #extra>
        <el-button type="primary" @click="$router.push('/resource/home')">返回主页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import OrderItem from '@/views/order-manage/auth-order/order-item.vue'
import { fetchAuthOrderDetail, fetchOpenOrderDetail, fetchOpenPayOrderDetail } from '@/api/orders'
import { UserActionTypes } from '@/store/modules/user/actions'
import useGlobalConfig from '@/hooks/useGlobalConfig'
import { copy, message } from '@/libs'
import type { OrderDetailInfo } from '@/interfaces/order'

const store = useStore()
const data = ref<OrderDetailInfo>()
const showError = ref<boolean>(false)
const showErrorMessage = ref<string>()
const loading = ref<boolean>(false)
const route = useRoute()
const { orderNo } = route.params
const { isLogin } = useGlobalConfig()

// 获取订单详情
const getOrderDetail = async () => {
  const fn = isLogin.value ? fetchAuthOrderDetail : fetchOpenOrderDetail
  const res = await fn(orderNo as string)

  if (res.success) {
    data.value = res.data
    store.dispatch(UserActionTypes.GetUserPoints)
    // 清除刷新标记
    localStorage.removeItem('retryTimes')
  } else {
    showError.value = true
    showErrorMessage.value = res.message || '订单异常！！！请联系管理员'
  }
}

const run = async () => {
  // 商户订单号
  const outTradeNo = route.query.out_trade_no
  loading.value = true
  try {
    if (outTradeNo) {
      // 获取订单支付状态
      const res = await fetchOpenPayOrderDetail(outTradeNo as string)
      if (res.success) {
        await getOrderDetail()
      } else {
        showError.value = true
        showErrorMessage.value = res.message || '订单异常！！！请联系管理员'
      }
    } else {
      await getOrderDetail()
    }
  } catch (err) {
    let retryTimes = Number(localStorage.getItem('retryTimes') ?? '0')
    // 默认页面加载失败，重刷一次
    if (!retryTimes) {
      localStorage.setItem('retryTimes', String(++retryTimes))
      window.location.reload()
    }
  } finally {
    loading.value = false
  }
}

const copyGoodUrl = () => {
  copy(data.value?.goodUrl)
  message.success('复制成功')
}

onMounted(() => {
  if (orderNo) {
    run()
  }
})
</script>

<style lang="scss" scoped>
@mixin link-style {
  color: $primary-color;
  text-decoration: underline;
}
.link {
  @include link-style;

  &:link,
  &:hover,
  &:active,
  &:visited {
    @include link-style;
  }
}
</style>
