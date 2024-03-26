<template>
  <el-row :gutter="8" class="goods-category-row" v-if="data.length > 0">
    <el-col
      v-for="{ categoryId, categoryName, goodsTotal } in data"
      :key="categoryId"
      :xs="12"
      :sm="8"
      :md="6"
      :lg="4"
      :xl="3"
    >
      <el-card
        shadow="hover"
        class="good-card"
        body-style="padding: 0"
        @click="jumpCategoryPage(categoryName, categoryId)"
      >
        <div class="p-[10px]">
          <span style="font-size: 16px">{{ categoryName }}</span>
          <div style="font-size: 14px"><span>商品数量：</span> {{ goodsTotal }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { pick } from 'lodash-es'
import { fetchCategoryAllGoods } from '@/api/goods'

const data = ref([])

const router = useRouter()

const run = () => {
  fetchCategoryAllGoods().then((res) => {
    data.value = res.map((it) => ({
      ...pick(it, ['categoryId', 'categoryName', 'goodsTotal'])
    }))
  })
}

const jumpCategoryPage = (name, id) => {
  router.push(`/resource/goods-category/${name}/${id}`)
}

onMounted(() => {
  run()
})
</script>

<style lang="scss">
.goods-category-row {
  @media screen and (max-width: 768px) {
    .el-col-xs-12:nth-child(2) ~ .el-col-xs-12 {
      margin-top: 5px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .el-col-sm-8:nth-child(3) ~ .el-col-sm-8 {
      margin-top: 5px;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .el-col-md-6:nth-child(4) ~ .el-col-md-6 {
      margin-top: 5px;
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1920px) {
    .el-col-lg-4:nth-child(6) ~ .el-col-lg-4 {
      margin-top: 5px;
    }
  }

  @media screen and (min-width: 1920px) {
    .el-col-xl-3:nth-child(8) ~ .el-col-xl-3 {
      margin-top: 5px;
    }
  }
}
</style>
<style lang="scss" scoped>
.good-card {
  font-size: 14px;
  color: #fff;
  background: linear-gradient(to right, #52a0fd 0, #2cc8d9 80%, #04cce1 100%);
  padding: 0;
  cursor: pointer;
}
</style>
