<script setup lang="ts">
import { ipcRenderer } from 'electron'
import type { MenuOption } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { getPlayerInfoRes } from '../typing'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: '每日商店',
          },
        },
        { default: () => '每日商店' },
      ),
    key: '每日商店',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/login?login_out=1',
        },
        { default: () => '登出' },
      ),
    key: '登出',
  },
]

const activeKey = ref('每日商店')
const playerInfo = ref<getPlayerInfoRes>()
const router = useRouter()
router.push('/daily-shop')

ipcRenderer.on('playerInfo', (_, data: getPlayerInfoRes) => {
  playerInfo.value = data
})
</script>
<template>
  <div class="info" v-show="playerInfo">
    <div class="game-name">{{ playerInfo?.gameName }}</div>
    <div class="level">等级{{ playerInfo?.level }}</div>
    <div class="time">下次首胜时间：{{ playerInfo?.nextTimeFirstWinAvailable }}</div>
  </div>
  <n-menu :value="activeKey" mode="horizontal" :options="menuOptions" />
  <router-view></router-view>
</template>

<style scoped lang="scss">
.info {
  display: flex;
}
.n-menu {
  font-size: 24px;
}

.info {
  padding: 10px 16px;
  font-size: 24px;
}
.level,
.time {
  margin-left: 10px;
}
</style>
