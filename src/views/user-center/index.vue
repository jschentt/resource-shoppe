<template>
  <div v-if="isLogin">
    <el-card>
      <div class="bottom-promotion">
        <div
          :class="['column', key, active ? 'active' : '']"
          v-for="{ name, key, active, count } in list"
          :key="key"
          @click="switchBehavior(key)"
        >
          <span class="icon"
            ><el-icon :size="16"
              ><pointer v-if="key === 'like'" /><user v-if="key === 'user'" /><star
                v-if="key === 'favorite'" /></el-icon></span
          ><span class="name"
            >{{ name }}<span class="ml-[5px]" v-if="key !== 'user'">{{ count }}</span></span
          >
        </div>
      </div>
    </el-card>
    <el-card class="mt-[10px]">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="component" :active-name="type" />
      </transition>
    </el-card>
  </div>
  <template v-else>
    <no-permission />
  </template>
</template>

<script setup lang="ts">
import { Pointer, Star, User } from '@element-plus/icons-vue'
import useGlobalConfig from '@/hooks/useGlobalConfig'
import { fetchUserBehaviourGoodTotal } from '@/api/behaviour'
import Userinfo from './components/userinfo.vue'
import BehaviourList from './components/behaviour-list.vue'
import { NoPermission } from '@/components/no-permission'
import { modal } from '@/libs'

const component = ref(Userinfo)
const { isLogin } = useGlobalConfig()
const router = useRouter()

const type = ref('')

const list = reactive([
  {
    name: '资料',
    key: 'user',
    active: false,
    count: 0
  },
  {
    name: '收藏',
    key: 'favorite',
    active: false,
    count: 0
  },
  {
    name: '点赞',
    key: 'like',
    active: false,
    count: 0
  }
])

const getCount = async () => {
  fetchUserBehaviourGoodTotal().then((res) => {
    list[1].count = res?.favorite ?? 0
    list[2].count = res?.like ?? 0
  })
}

const switchBehavior = (key) => {
  if (!isLogin.value) {
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

  list.forEach((item) => {
    item.active = item.key === key
  })

  component.value = key === 'user' ? Userinfo : BehaviourList
  type.value = key
}

onMounted(() => {
  if (isLogin.value) {
    list[0].active = true
    type.value = list[0].key
    getCount()
  }
})
</script>

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
