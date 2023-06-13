<template>
  <div>
    <h1>Home</h1>
    <div>
      <span>{{ user.email }}</span>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/auth'
  
  const authStore = useAuthStore()
  const { user, logout } = storeToRefs(authStore)

  function handleLogout() {
    logout()
  }
</script>
