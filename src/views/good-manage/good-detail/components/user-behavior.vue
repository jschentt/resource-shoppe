<template>
  <el-card class="mt-[10px]">
    <div class="text-center text-gray-500 mt-[10px] mb-[30px]">喜欢就支持一下吧</div>
    <div class="bottom-promotion">
      <div v-for="{ name, key, active, count } in list" :key="key" @click="switchBehavior(key)">
        <el-dropdown>
          <div :class="['column', key, active ? 'active' : '']">
            <span class="icon">
              <el-icon :size="16">
                <pointer v-if="key === 'like'" />
                <share v-if="key === 'share'" />
                <star v-if="key === 'favorite'" />
              </el-icon>
            </span>
            <span class="name mt-[8px]">
              {{ name }}
              <span class="ml-[5px]" v-show="key !== 'share'">{{ count }}</span>
            </span>
          </div>
          <template #dropdown v-if="key === 'share'">
            <el-dropdown-menu>
              <template v-if="sharePoster">
                <el-dropdown-item @click="dialogVisible = true" style="height: 45px"
                  >海报分享</el-dropdown-item
                >
                <el-divider
              /></template>
              <el-dropdown-item @click="copyLink" style="height: 45px">复制链接</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <poster-modal v-model="dialogVisible" :data="data"></poster-modal>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Pointer, Star, Share } from '@element-plus/icons-vue'
import PosterModal from './poster-modal.vue'
import {
  favoriteGood,
  likeGood,
  shareGood,
  unFavoriteGood,
  unlikeGood,
  fetchGoodBehaviourTotal,
  fetchUserHasBehaviourGood
} from '@/api/behaviour'
import { copy, isWeixn, message, modal } from '@/libs'
import useGlobalConfig from '@/hooks/useGlobalConfig'

const router = useRouter()

const dialogVisible = ref<boolean>(false)

const { isLogin } = useGlobalConfig()

const sharePoster = !isWeixn() && localStorage.getItem('source') !== 'app'

const props = defineProps({
  goodId: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const list = reactive([
  {
    name: '点赞',
    key: 'like',
    active: false,
    count: 0
  },
  {
    name: '分享',
    key: 'share',
    active: false,
    count: 0
  },
  {
    name: '收藏',
    key: 'favorite',
    active: false,
    count: 0
  }
])

// 获取点赞/收藏/分享总数
const fetchGoodCount = async () => {
  const params = {
    goodId: props.goodId
  }
  fetchGoodBehaviourTotal(params).then((res) => {
    list[0].count = res?.like
    list[1].count = res?.share
    list[2].count = res?.favorite
  })
}

// 用户是否点赞/收藏/分享
const fetchHasBehavior = async () => {
  const params = {
    goodId: props.goodId
  }
  fetchUserHasBehaviourGood(params).then((res) => {
    list[0].active = res?.hasLike
    list[1].active = res?.hasShare
    list[2].active = res?.hasFavorite
  })
}

// 复制链接
const copyLink = () => {
  copy(window.location.href)
  message.success('复制成功')
}

onMounted(() => {
  if (isLogin.value) {
    fetchHasBehavior()
  }
})

const switchBehavior = (key) => {
  if (!isLogin.value && key !== 'share') {
    modal.warning(
      '您还没有登录哦~',
      '',
      () => {
        router.push('/login')
      },
      {
        confirmButtonText: '登录',
        cancelButtonText: '取消'
      }
    )
    return
  }

  if (key !== 'share') {
    list.forEach((item) => {
      if (item.key === key) {
        item.active = !item.active
      }
    })
  }

  const config = {
    like: {
      add: likeGood,
      cancel: unlikeGood
    },
    share: {
      add: shareGood,
      cancel: 'none'
    },
    favorite: {
      add: favoriteGood,
      cancel: unFavoriteGood
    }
  }

  const selectItem = list.find((it) => it.key === key)
  const params = {
    goodId: props.goodId
  }

  if (selectItem.active) {
    // 添加点赞/收藏/分享
    config[key].add(params).then(() => {
      message.success(`${selectItem.name}成功`)
      fetchGoodCount()
    })
  } else {
    // 取消点赞/收藏
    if (config[key].cancel === 'none') {
      return
    }
    config[key].cancel(params).then(() => {
      message.info(`取消${selectItem.name}`)
      fetchGoodCount()
    })
  }
}

watch(
  () => props.goodId,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      fetchGoodCount()
    }
  },
  { immediate: true }
)
</script>

<style>
.el-popper__arrow::before {
  display: none;
}
.el-divider--horizontal {
  width: 80%;
  margin: 0;
  margin-left: 10%;
}
</style>

<style lang="scss" scoped>
.bottom-promotion {
  display: flex;
  justify-content: center;
  align-items: center;

  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
    width: 80px;
    outline: none;
    cursor: pointer;
  }

  .active {
    .icon,
    .name {
      color: $primary-color;
    }
  }
}
</style>
