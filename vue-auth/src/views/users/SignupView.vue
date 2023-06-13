<template>
  <div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="isLoading">Loading...</div>
    <form @submit.prevent="handleSignup">
      <h1>Signup View</h1>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Password">
      </div>
      <button>Signup</button>
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

  async function handleSignup() {
    await authStore.signup(email.value, password.value);
    email.value = '';
    password.value = '';
  }
</script>