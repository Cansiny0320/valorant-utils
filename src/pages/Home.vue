<script setup lang="ts">
import { divide } from 'lodash'
import type { MenuOption } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

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
const router = useRouter()
router.push('/daily-shop')
</script>
<template>
  <n-menu :value="activeKey" mode="horizontal" :options="menuOptions" />
  <router-view></router-view>
</template>

<style scoped>
.n-menu {
  font-size: 24px;
}
</style>
