<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

interface Info {
  dailyOffers: any[]
}

const info = ref<Info | null>()
ipcRenderer.invoke('getInfo')
ipcRenderer.on('getInfo', (_event, _info) => {
  info.value = _info
})
</script>
<template>
  <div class="container" v-for="item of info?.dailyOffers ?? []" :key="item.name">
    <img :src="item.icon" class="icon" />
    <div class="info">
      <div class="name">{{ item.name }}</div>
      <div class="price">{{ item.price }}vp</div>
    </div>
  </div>
</template>

<style scoped></style>
