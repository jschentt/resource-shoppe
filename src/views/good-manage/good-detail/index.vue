<template>
  <div class="page" v-if="!loading">
    <adv-banner class="mb-[10px]" v-if="!isLogin" />
    <el-card>
      <div class="good-container">
        <el-row>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="cover">
              <el-image
                :src="data?.pictures[0] ?? defaultImg"
                fit="cover"
                loading="lazy"
                :zoom-rate="1.2"
                :preview-src-list="data?.pictures"
                referrerPolicy="no-referrer"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="goods-info">
            <div class="desc">
              <div>
                <span class="mr-[10px]">{{ data?.name }}</span>
                <el-tag type="warning" class="mr-[10px]">销量{{ data?.saleCount }}</el-tag>
                <el-tag type="info" v-if="data?.isPoints === USE_POINTS.YES"
                  >金币{{ data?.points }}</el-tag
                >
              </div>
              <div class="mt-[14px]">
                <el-tag type="success">商品单价：{{ formatYuanPrice(data?.price ?? 0) }}</el-tag>
                <el-tag class="ml-[10px] cursor-pointer" @click="switchGoodCatgory">{{
                  data?.goodCategoryName
                }}</el-tag>
              </div>
              <div class="mt-[14px] total">
                <span class="text-gray-500"
                  >小计：
                  <span class="text-base font-semibold good-price"
                    ><span class="unit">¥</span>
                    <span class="price">{{ formatYuanPrice(state?.realSale ?? 0, false) }}</span>
                  </span>
                </span>
                <el-tag class="ml-[10px] points-select" type="warning" v-if="allowUsePoints">
                  <span class="discount">
                    金币抵扣： {{ formatYuanPrice(state?.payPrice ?? 0) }}</span
                  >
                  <el-checkbox v-model="checkPointsValue" />
                </el-tag>
              </div>
              <div class="mt-[14px]">
                <div class="text-gray-500" style="font-size: 12px">
                  注：虚拟产品具有可复制性，一旦售出不支持退款
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="mt-[10px]" v-if="!isLogin">
      <el-form
        ref="payFormRef"
        :model="state.formInline"
        :rules="state.rules"
        label-position="top"
        class="form-container"
      >
        <el-form-item prop="email" label="接收邮箱">
          <el-input
            v-model="state.formInline.email"
            size="large"
            placeholder="订单信息接收邮箱，为空则不发送"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt-[10px]">
      <el-radio-group v-model="state.payWay">
        <!-- <el-radio :label="1" size="large" border :disabled="state.realSale === 0"
          >微信支付</el-radio
        > -->
        <el-radio :label="2" size="large" border :disabled="state.realSale === 0"
          >支付宝支付</el-radio
        >
      </el-radio-group>
      <div class="mt-[20px]">
        <el-button type="primary" size="large" @click="submit" :loading="state.loading"
          >提交订单</el-button
        >
      </div>
    </el-card>

    <el-card class="mt-[10px]" v-if="data?.comment">
      <div v-html="data?.comment" class="comment" />
    </el-card>

    <el-card class="mt-[10px] notice">
      <template #header><strong>郑重声明</strong> </template>
      <p>
        本站所提供的资源均高价搜集于网络，资源版权争议与本站无关，版权归原创者所有！仅限用于学习和研究目的，不得将上述内容资源用于商业或者非法用途，否则，一切后果请用户自负。
      </p>
      <p>
        本站针对资源收取的费用，均为用来本站资源搜集和维持本站运营成本，并非资源本身价格。同时对资源完整度和真实可靠性不做保证。
      </p>
      <p>
        资源购买后，仅提供对应的资源下载权限，不提供对资源的任何指导和相关技术服务。订单支付成功均视为已阅读并知晓上述声明。
      </p>
    </el-card>

    <div class="mt-[10px]"><good-tags /></div>

    <div class="mt-[10px]" v-if="data?.id">
      <user-behavior :goodId="data?.id" :data="data" />
    </div>

    <div>
      <div class="tag-group">
        <el-button :autofocus="true">相关推荐</el-button>
      </div>
      <goods-list :category-id="data?.goodCategoryId" :exclude="[data?.id]" />
    </div>
  </div>
  <good-skeleton :loading="loading" v-else />
</template>

<script lang="ts" setup>
import NP from 'number-precision'
import type { FormInstance } from 'element-plus'
import Viewer from 'viewerjs'
import AdvBanner from '@/components/adv-banner/index.vue'
import UserBehavior from './components/user-behavior.vue'
import GoodSkeleton from './components/good-skeleton.vue'
import { GoodsList, GoodTags } from '@/views/home/components'
import { fetchGoodDetail } from '@/api/goods'
import { createAuthOrder, createOpenOrder } from '@/api/orders'
import { message, modal, numberFixed, isMobile } from '@/libs'
import { defaultImg } from '@/views/home/const'
import { UserActionTypes } from '@/store/modules/user/actions'
import { CURRENT_USER } from '@/store/mutation-types'
import { PAY_WAY, SOURCE_TYPE, USE_POINTS } from './const'
import { storage } from '@/libs/Storage'
import 'viewerjs/dist/viewer.css'
import type { CreateOrderParams } from '@/interfaces/order'
import type { GoodDetailInfo } from '@/interfaces/goods'

const store = useStore()
const route = useRoute()
const router = useRouter()
const payFormRef = ref<FormInstance>()

let retryTimes = 0
const storeUser = store?.state?.user
const cacheUser = storage.get(CURRENT_USER)
const user = cacheUser ?? storeUser // 用户信息
const isLogin = ref(Boolean(user?.oauth)) // 用户是否已登录
const checkPointsValue = ref(true) // // 用户切换复选框是否使用金币
const isPoints = ref(USE_POINTS.YES) // 用户是否使用金币
const loading = ref(false)

const viewer = ref(null)

// 用户是否允许使用金币
const allowUsePoints = ref(true)

// 定时器
const timer = ref(null)

const checkEmail = (_, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    return callback(new Error('请输入订单信息接收地址'))
  }
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (value) {
    if (emailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱地址'))
    }
  }
}

const state = reactive({
  loading: false,
  realSale: 0, // 实际支付金额
  payPoints: 0, // 抵扣金币
  payPrice: 0, // 抵扣金额
  payWay: undefined, // 默认支付方式微信
  formInline: {
    email: ''
  },
  rules: {
    email: [
      {
        required: true,
        message: '请输入订单信息接收地址',
        trigger: ['blur', 'change']
      },
      {
        validator: checkEmail,
        trigger: 'blur'
      }
    ]
  }
} as any)

const data = ref<GoodDetailInfo>() // 商品详情

// 初始化图片放大器
const initViewer = () => {
  // eslint-disable-next-line no-new
  viewer.value = new Viewer(document.querySelector('.comment'), {
    title: false,
    navbar: false
  })
}

// 销毁查看器
const destroyViewer = () => {
  if (viewer.value) {
    viewer.value.destroy()
  }
}

// 获取商品详情
const getGoodDetail = async (id: string) => {
  loading.value = true
  try {
    const res = await fetchGoodDetail(Number(id))
    data.value = res
    state.realSale = res?.price // 实际价格
    isPoints.value = res?.isPoints // 用户是否使用金币

    document.title = data.value.name

    setTimeout(() => {
      initViewer()
    })
  } finally {
    loading.value = false
  }
}

// 获取订单来源
const getPlatform = () => {
  const source = localStorage.getItem('source')

  let sourceType

  if (source === 'app') {
    sourceType = SOURCE_TYPE.APP
  } else if (isMobile()) {
    sourceType = SOURCE_TYPE.PHONE
  } else {
    sourceType = SOURCE_TYPE.PC
  }

  return sourceType
}

// 确认支付
const confirmPay = (params: CreateOrderParams) => {
  state.loading = true
  const createOrderFn = isLogin.value ? createAuthOrder : createOpenOrder

  createOrderFn({
    ...params,
    sourceType: getPlatform()
  }).then((res) => {
    const { orderNo, payUrl } = res

    if (state.formInline.email) {
      localStorage.setItem('email', state.formInline.email)
    }

    if (payUrl) {
      window.open(payUrl, '_self')
      timer.value = setInterval(() => {
        ++retryTimes

        // 唤起支付页失败，重新下单
        confirmPay(params)

        //  重试5次
        if (retryTimes >= 5) {
          message.error('唤起支付页失败，请刷新页面重试')
          clearInterval(timer.value)
          state.loading = false
        }
      }, 1000)
      return
    }

    if (isLogin.value) {
      store.dispatch(UserActionTypes.GetUserPoints).then(() => {
        router.push(`/resource/order-detail/${orderNo}`)
      })
    } else {
      router.push('/resource/view-order')
    }

    message.success('订单支付成功')
    state.loading = false
  })
}

// 订单提交
const submit = async () => {
  const { realSale, payPoints, payPrice } = state
  const { email } = state.formInline

  if (!isLogin.value) {
    isPoints.value = USE_POINTS.NO
    const valid = await payFormRef.value.validate()
    if (!valid) return
  }

  if (data.value?.isPoints === USE_POINTS.NO) {
    isPoints.value = USE_POINTS.NO
  }

  const params = {
    goodId: data.value?.id, // 商品ID,
    payPoints, // 抵扣金币
    payPrice, // 抵扣金额
    isUsePoints: isPoints.value, // 用户是否使用金币
    realSale, // 实际支付金额
    email // 邮箱地址
  } as CreateOrderParams

  // 完全金币支付
  const fullPointsPay = realSale === 0 && isPoints.value === USE_POINTS.YES

  // 金币支付
  if (fullPointsPay) {
    params.payWay = PAY_WAY.Points
    // 混合支付
  } else if (realSale !== 0 && isPoints.value === USE_POINTS.YES) {
    if (![PAY_WAY.Wechat, PAY_WAY.Alipay].includes(state.payWay)) {
      message.error('请选择支付方式')
      return
    }
    if (state.payWay === PAY_WAY.Wechat) {
      params.payWay = PAY_WAY.WechatPoints // 微信金币支付
    } else if (state.payWay === PAY_WAY.Alipay) {
      params.payWay = PAY_WAY.AlipayPoints // 支付宝金币支付
    }
    // 微信/支付宝支付
  } else if (isPoints.value === USE_POINTS.NO) {
    if (![PAY_WAY.Wechat, PAY_WAY.Alipay].includes(state.payWay)) {
      message.error('请选择支付方式')
      return
    }
    params.payWay = state.payWay // 微信/支付宝支付
  }

  modal.warning('支付提醒', '是否确认下单', () => confirmPay(params))
}

const visibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    state.loading = false
    clearInterval(timer.value)
  }
}

// 滑动到顶部
const scrollTopListener = () => {
  document.querySelector('.layout-container')?.scrollTo(0, 0)
  document.addEventListener('visibilitychange', visibilityChange)
}

// 窗体滑动到页头位置
onMounted(() => {
  setTimeout(() => {
    scrollTopListener()
  }, 250)
})

// 取消加载动画
onUnmounted(() => {
  destroyViewer()
  state.loading = false
})

// 跳转商品分类
const switchGoodCatgory = () => {
  router.push(
    `/resource/goods-category/${data.value?.goodCategoryName}/${data.value?.goodCategoryId}`
  )
}
// 金额转换为元
const formatYuanPrice = (price = 0, unit = true) =>
  numberFixed(NP.divide(price, 100), 2, {
    unit
  })

// 监控是否采用金币抵扣
watch(
  () => checkPointsValue.value,
  (val) => {
    isPoints.value = val ? USE_POINTS.YES : USE_POINTS.NO
    // 不采用积分支付默认采用支付宝支付
    if (!val) {
      state.payWay = PAY_WAY.Alipay
    }
  },
  {
    immediate: true
  }
)

// 监听路由变化
watch(
  () => route.params.id,
  (goodId) => {
    if (goodId) {
      destroyViewer()
      getGoodDetail(goodId as string)
      scrollTopListener()
    }
  },
  { immediate: true }
)

// 监听用户是否已登录
watch(
  () => user?.oauth,
  (oauth) => {
    isLogin.value = Boolean(oauth)
    if (isLogin.value) {
      store.dispatch(UserActionTypes.GetUserPoints)
    } else {
      // 未登录设置默认支付方式
      state.payWay = PAY_WAY.Alipay // 默认采用支付宝支付
    }
  },
  { immediate: true }
)

// 监听用户账户总金币/商品金币/商品价格/是否采用金币抵扣/用户是否已登录
watch(
  () => [
    storeUser?.points, // 用户积分
    data.value?.points, // 商品所需积分
    data.value?.price, // 商品价格
    data.value?.isPoints, // 商品是否允许使用积分
    isPoints.value, // 用户支付是否使用积分
    isLogin.value // 用户是否登录
  ],
  ([userPoints, goodPoints, goodPrice, allowPoints, isPoints, isLogin]) => {
    // 已登录&用户使用金币兑换&商品允许用户使用金币
    if (isLogin && allowPoints === USE_POINTS.YES && isPoints === USE_POINTS.YES) {
      if (userPoints >= goodPoints) {
        state.payPoints = goodPoints // 抵扣金币
        state.payPrice = goodPrice // 抵扣金额
        state.realSale = 0 // 实际支付价格
      } else {
        state.payPoints = userPoints // 抵扣金币
        state.payPrice = NP.times(userPoints ?? 0, 10) // 抵扣金额(单位：分)
        state.realSale = NP.minus(goodPrice ?? 0, state.payPrice ?? 0) // 实际支付价格
      }
    } else {
      state.payPoints = 0 // 抵扣金币
      state.payPrice = 0 // 抵扣金额
      state.realSale = goodPrice // 实际支付价格
    }

    // 积分抵扣金额小于商品售价，默认采用支付宝支付
    if (state.payPrice < goodPrice) {
      state.payWay = PAY_WAY.Alipay
    }

    // 用户是否允许使用金币(登录状态&用户金币大于0&商品允许用户使用金币)
    allowUsePoints.value = isLogin && userPoints > 0 && allowPoints
  }
)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
