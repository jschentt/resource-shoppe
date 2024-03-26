<template>
  <el-card class="tag-container" v-if="data.length > 0">
    <template #header>
      <strong>标签云</strong>
    </template>

    <el-row :gutter="8">
      <el-col v-for="{ name, id, index } in data" :key="id" :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
        <el-tag :class="`color-${index}`" :key="id" @click="jumpTagPage(name, id)">{{
          name
        }}</el-tag>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { fetchTagAllGoods } from '@/api/goods'

const emit = defineEmits(['refresh'])

const data = ref([])

const router = useRouter()

const run = () => {
  fetchTagAllGoods().then((res) => {
    res.forEach((it, index) => {
      it.index = index + 1 <= 11 ? index + 1 : (index + 1) % 11
    })
    data.value = res
    emit('refresh')
  })
}

const jumpTagPage = (name, id) => {
  router.push(`/resource/goods-tag/${name}/${id}`)
}

onMounted(() => {
  run()
})
</script>

<style lang="scss">
.tag-container {
  .el-card__header,
  .el-card__body {
    padding: 15px;
  }

  @media screen and (max-width: 768px) {
    .el-col-xs-6:nth-child(4) ~ .el-col-xs-6 {
      margin-top: 10px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .el-col-sm-4:nth-child(6) ~ .el-col-sm-4 {
      margin-top: 10px;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .el-col-md-3:nth-child(8) ~ .el-col-md-3 {
      margin-top: 10px;
    }
  }

  @media screen and (min-width: 1200px) {
    .el-col-lg-2:nth-child(12) ~ .el-col-lg-2 {
      margin-top: 10px;
    }
    .el-col-xl-2:nth-child(12) ~ .el-col-xl-2 {
      margin-top: 10px;
    }
  }

  .el-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    height: 32px;
    width: 100%;
    padding: 15px 0;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
.color-1 {
  color: #8e4aff;
  text-shadow: #8e4aff 0px 0px 0px;
  background-color: rgba(154, 72, 245, 0.1);
}

.color-2 {
  color: #d6064c;
  text-shadow: #d6064c 0px 0px 0px;
  background-color: rgba(194, 41, 46, 0.1);
}

.color-3 {
  color: #2997f7;
  text-shadow: #2997f7 0px 0px 0px;
  background-color: rgba(41, 151, 247, 0.1);
}

.color-4 {
  color: #ff6f06;
  text-shadow: #ff6f06 0px 0px 0px;
  background-color: rgba(255, 111, 6, 0.1);
}

.color-5 {
  color: #18a52a;
  text-shadow: #18a52a 0px 0px 0px;
  background-color: rgba(18, 185, 40, 0.1);
}

.color-6 {
  color: #e434e1;
  text-shadow: #e434e1 0px 0px 0px;
  background-color: rgba(213, 72, 245, 0.1);
}

.color-7 {
  color: #ff5473;
  text-shadow: #ff5473 0px 0px 0px;
  background-color: rgba(255, 84, 115, 0.1);
}

.color-8 {
  color: #888;
  text-shadow: #888 0px 0px 0px;
  background-color: rgba(136, 136, 136, 0.1);
}

.color-9 {
  color: #5c7cff;
  text-shadow: #5c7cff 0px 0px 0px;
  background-color: rgba(77, 130, 249, 0.1);
}

.color-10 {
  color: #c58516;
  text-shadow: #c58516 0px 0px 0px;
  background-color: rgba(179, 103, 8, 0.1);
}

.color-11 {
  color: #6a933e;
  text-shadow: #6a933e 0px 0px 0px;
  background-color: rgba(72, 135, 24, 0.1);
}

strong {
  display: flex;

  &::before {
    display: block;
    content: '';
    width: 3px;
    height: 14px;
    background: $primary-color;
    border-radius: 8px;
    margin-right: 6px;
    position: relative;
    top: 3px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px -1px $primary-color;
  }
}
</style>
