<script setup lang="ts">
import { toggleDevTools } from './utils/toogleDevTools'

toggleDevTools()
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<style scoped lang="scss"></style>
