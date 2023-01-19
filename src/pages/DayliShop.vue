<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

interface Offers {
  price: number
  name: string
  icon: string
}

const levelIcon = {
  875: 'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png',
  1275: 'https://media.valorant-api.com/contenttiers/0cebb8be-46d7-c12a-d306-e9907bfc5a25/displayicon.png',
  1775: 'https://media.valorant-api.com/contenttiers/60bca009-4182-7998-dee7-b8a2558dc369/displayicon.png',
  2475: 'https://media.valorant-api.com/contenttiers/411e4a55-4e59-7757-41f0-86a53f101bb5/displayicon.png',
}

const defalutIcon =
  'https://media.valorant-api.com/contenttiers/e046854e-406c-37f4-6607-19a9ba8426fc/displayicon.png'

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
    <n-grid :x-gap="12" :y-gap="48" :cols="2" :collapsed-rows="2" collapsed>
      <n-gi v-for="item of offers" :key="item.name">
        <div class="item">
          <img :src="item.icon" class="image" />
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="price">{{ item.price }}vp</div>
            <img :src="levelIcon[item.price] ?? defalutIcon" alt="icon" class="icon" />
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
  object-fit: contain;
}
.info {
  display: flex;
  font-size: 24px;
  margin-top: 10px;
  .price {
    margin-left: 5px;
  }
  .name,
  .price {
    line-height: 50px;
  }
}
.icon {
  width: 50px;
  height: 50px;
  margin-left: 5px;
}
</style>
