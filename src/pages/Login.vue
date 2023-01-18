<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')
const storeUsername = localStorage.getItem('username')
const storePassword = localStorage.getItem('password')
const handleClick = () => {
  if (!username.value || !password.value) {
    return
  }

  ipcRenderer.invoke('initAuth', username.value, password.value)
}

ipcRenderer.on('initAuth', (_event, _username, _password) => {
  localStorage.setItem('username', _username)
  localStorage.setItem('password', _password)
  router.push('/home')
})

if (storeUsername && storePassword) {
  ipcRenderer.invoke('initAuth', storeUsername, storePassword)
}
</script>
<template>
  <div>Login</div>
  <n-input v-model:value="username" type="text" placeholder="username" />
  <n-input v-model:value="password" type="text" placeholder="password" />
  <n-button type="primary" @click="handleClick"> login </n-button>
</template>

<style scoped></style>
