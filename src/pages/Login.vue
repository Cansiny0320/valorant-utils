<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { useRouter, RouteLocationNormalized } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const query = router.currentRoute.value.query

const message = useMessage()
const storeUsername = localStorage.getItem('username')
const storePassword = localStorage.getItem('password')
const username = ref(storeUsername)
const password = ref(storePassword)
const loading = ref(false)
const handleClick = () => {
  if (!username.value || !password.value) {
    return
  }
  ipcRenderer.invoke('login', username.value, password.value)
  message.info('正在登录...')
  loading.value = true
}

ipcRenderer.on('login-success', (_event, _username, _password) => {
  localStorage.setItem('username', _username)
  localStorage.setItem('password', _password)
  loading.value = false
  message.success('登录成功')
  router.push('/home')
})

ipcRenderer.on('login-fail', () => {
  loading.value = false
  message.error('登录失败')
})

if (storeUsername && storePassword && query.login_out !== '1') {
  message.info('正在登录...')
  ipcRenderer.invoke('login', storeUsername, storePassword)
  loading.value = true
}
</script>
<template>
  <div class="container">
    <div class="login">
      <div class="icon-container">
        <img src="../assets/images/icon.png" alt="icon" class="icon" />
        <div class="right">
          <div class="title">VALORANT</div>
          <div class="sub-title">工具箱</div>
        </div>
      </div>
      <div class="login-text">登录</div>
      <!-- <div class="region">地区：亚太</div> -->
      <div class="input">
        <n-input v-model:value="username" type="text" placeholder="用户名" class="input" />
      </div>
      <div class="input">
        <n-input v-model:value="password" type="text" placeholder="密码" class="input" />
      </div>
      <n-button
        @click="handleClick"
        :disabled="!(username && password)"
        :loading="loading"
        size="large"
        type="primary"
        class="submit"
        >确定</n-button
      >
    </div>
    <img class="wallpaper" src="../assets/images/wallpaper.jpg" />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 835px;
  display: flex;
}

.login {
  width: 400px;
  flex-shrink: 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
}

.icon-container {
  color: #0f1923;
  display: flex;
  align-items: center;
  .icon {
    width: 50px;
    height: 50px;
  }
  .right {
    padding-left: 5px;
  }
  .title,
  .sub-title {
    font-size: 16px;
    font-weight: bold;
  }
}
.wallpaper {
  flex: 1;
  object-fit: cover;
}

.login-text {
  font-size: 24px;
  margin: 75px 0 25px;
}
.input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 300px;
}
.submit {
  width: 150px;
}
</style>
