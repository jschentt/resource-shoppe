<template>
  <el-dialog
    class="poster-modal"
    v-model="dialogVisible"
    title="Tips"
    width="312px"
    draggable
    @close="emits('update:modelValue', false)"
    :destroy-on-close="true"
    :append-to-body="true"
  >
    <div class="container">
      <div class="cover">
        <img :src="data?.pictures?.[0]" :alt="data?.name" referrerpolicy="no-referrer" />
      </div>
      <div class="content">
        <div class="title">
          <h2>{{ data?.name }}</h2>
        </div>
        <div class="qrcode-box">
          <span>扫描二维码阅读全文</span>
          <div class="qrcode">
            <qrcode-vue :value="qrcodeValue" :size="100" level="H" />
          </div>
        </div>
      </div>
    </div>
    <div :class="['poster-operator', isH5 ? 'mobile' : '']">
      <span @click="creatImg">
        <el-icon size="18" color="#fff"><Download /></el-icon>
      </span>
      <span @click="emits('update:modelValue', false)">
        <el-icon size="18" color="#fff"><Close /></el-icon>
      </span>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import { Close, Download } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
import { isMobile, isWeixn, message } from '@/libs'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const qrcodeValue = window.location.href

const dialogVisible = ref(false)

const isH5 = isMobile()

// 导出图片
const exportPicture = (link, name = '未命名文件') => {
  const file = document.createElement('a')
  file.style.display = 'none'
  file.href = link
  file.download = decodeURI(name)
  document.body.appendChild(file)
  file.click()
  document.body.removeChild(file)
}

// 生成图片
const creatImg = () => {
  if (isWeixn()) {
    message.error('请在外部浏览器打开')
    return
  }

  const setup = {
    useCORS: true // 使用跨域
  }
  const $dom = document.querySelector('.poster-modal .el-dialog__body') as HTMLElement
  html2canvas($dom, setup).then((canvas) => {
    const link = canvas.toDataURL('image/png')
    exportPicture(link, props?.data?.name)
  })
}
</script>

<style lang="scss">
.poster-modal {
  border-radius: 2px;
}

.poster-modal .el-dialog__header {
  display: none;
}

.poster-modal .el-dialog__body {
  padding: 0;

  .container {
    width: 100%;

    .content {
      padding: 15px;
    }

    img {
      width: 100%;
      max-height: 480px;
      object-fit: cover;
    }

    .title {
      display: flex;
      margin: 5px 0;

      &::before {
        display: block;
        content: '';
        width: 4px;
        height: 16px;
        background: $primary-color;
        border-radius: 8px;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }

      h2 {
        font-size: 15px;
      }
    }

    .qrcode-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 120px;
      border: 1px solid #ccc;
      border-radius: 5px;

      span {
        margin-right: 10px;
      }

      .qrcode {
        width: 100px;
        height: 100px;
      }
    }
  }

  &:hover {
    .poster-operator {
      opacity: 1;
    }
  }

  .poster-operator {
    position: absolute;
    bottom: -56px;
    left: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    opacity: 0;
    transition: all 0.5s;

    &.mobile {
      opacity: 1;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      cursor: pointer;

      &:first-child {
        margin-right: 20px;
        background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
      }

      &:last-child {
        background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
      }
    }
  }
}
</style>
