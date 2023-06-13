<template>
  <div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="isLoading">Loading...</div>
    <form @submit.prevent="handleLogin">
      <h1>Login View</h1>
      <div>
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Email">
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../../stores/auth'
  import { storeToRefs } from 'pinia';

  const email = ref('')
  const password = ref('')

  const authStore = useAuthStore()

  const { error, isLoading } = storeToRefs(authStore)

  async function handleLogin() {
    await authStore.signin(email.value, password.value);
    email.value = '';
    password.value = '';
  }

  window.user = email.value || password.value
</script>
