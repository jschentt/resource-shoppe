<template>
  <div class="cumputed">
    计算结果：<span>{{ one }}</span
    ><span>x</span><span>{{ two }}</span
    ><span>=</span>
    <el-input style="width: 60px" v-model="result" type="number" />
  </div>
</template>

<script setup lang="ts">
import NP from 'number-precision'
import { defineEmits, defineExpose } from 'vue'
import { genRandom } from '@/libs'

const result = ref()

const emits = defineEmits(['update:modelValue'])

const one = genRandom()
const two = genRandom()

const getResult = () => {
  return NP.times(one, two)
}

defineExpose({
  getResult
})

watch(
  () => result.value,
  (val) => {
    emits('update:modelValue', val)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.cumputed {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  margin: 30px 0 20px 0;
  width: 100%;
  padding: 8px;

  span {
    margin-right: 5px;
    font: 14px/1.5 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo,
      'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3', Roboto, Arial,
      sans-serif;
    color: #2a333c;
  }
}
</style>
