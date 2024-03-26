<template>
  <el-card @click="jumpPageDetail" class="container" body-style="padding: 10px">
    <el-image
      :src="data?.pictures?.[0] ?? defaultImg"
      class="image"
      fit="cover"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
    <div class="good-container">
      <div class="good-info">
        <span class="title">{{ data?.name }}</span>
      </div>
      <div class="good-bottom">
        <span class="good-tags">
          <el-tag type="warning">销量{{ data?.saleCount }}</el-tag>
          <el-tag type="info" class="ml-[5px]" v-if="data?.isPoints === USE_POINTS.YES">
            {{ data?.points }}金币</el-tag
          >
        </span>
        <div class="good-footer">
          <span class="good-price">
            <span class="unit">¥</span>
            <span class="price"> {{ price }}</span>
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import NP from 'number-precision'
import { numberFixed } from '@/libs'
import { defaultImg, USE_POINTS } from '../const'

const router = useRouter()

const props = defineProps({
  goodType: {
    type: String
  },
  data: {
    type: Object
  }
})

const price = computed(() =>
  numberFixed(NP.divide(props?.data?.price ?? 0, 100), 2, { unit: false })
)

const jumpPageDetail = () => {
  router.push(`/resource/good-detail/${props?.data?.id}`)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  margin-bottom: 5px;
  cursor: pointer;

  .image {
    width: 100%;
    height: 150px;
    display: block;
  }

  .good-container {
    position: relative;
    padding: 10px 0;
    height: 120px;

    .good-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .title {
        font-size: 15px;
        font-weight: 600;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
      }
    }

    .good-bottom {
      position: absolute;
      bottom: 0;
    }

    .good-footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 5px;
      line-height: 24px;

      & > span {
        white-space: nowrap;
      }

      .good-tags {
        display: flex;
        justify-content: space-between;
        ::v-deep(.el-tag) {
          padding: 0;
          padding: 0 4px;
        }
      }

      .good-price {
        display: inline-block;
        width: 24px;
        font-size: 15px;
        color: #f54e4e;
        font-weight: 700;

        .unit {
          display: inline-block;
          transform: scale(0.8);
        }

        .price {
          position: relative;
          left: 2px;
        }
      }
    }
  }
}
</style>
