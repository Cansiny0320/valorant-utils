<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

interface Offers {
  price: number
  name: string
  icon: string
}

const message = useMessage()
const offers = ref<Offers[]>([])

message.info('正在获取商店信息...')
ipcRenderer.invoke('getDailyShop')

ipcRenderer.on('getDailyShop-success', (_event, _info) => {
  message.success('获取商店信息成功')
  offers.value = _info
})
ipcRenderer.on('getDailyShop-fail', (_event, number) => {
  message.error(`获取商店信息失败,失败数${number}`)
  message.info('自动重新获取商店信息...')
  ipcRenderer.invoke('getDailyShop')
})
</script>
<template>
  <div class="container">
    <n-grid :x-gap="12" :y-gap="8" :cols="2" :collapsed-rows="2" collapsed>
      <n-gi v-for="item of offers" :key="item.name">
        <div class="item">
          <img :src="item.icon" class="image" />
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="price">{{ item.price }}vp</div>
          </div>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 12px 16px;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image {
  width: 512px;
  height: 240px;
}
.info {
  display: flex;
  font-size: 24px;
  .price {
    margin-left: 5px;
  }
}
</style>
