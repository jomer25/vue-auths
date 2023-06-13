import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  async function login(email,password) {
    try {
      isLoading.value = true
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
  
      if(response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
      } else {
        error.value = data.error
      }
    } catch(error) {
      console.error(error.message);
    } finally {
      isLoading.value = false
    }
  }

  async function signup(email,password) {
    try {
      isLoading.value = true
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
  
      if(response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
      } else {
        error.value = data.error
      }
    } catch(error) {
      console.error(error.message);
    } finally {
      isLoading.value = false
    }
  }

  return { error, isLoading, login, signup }
})
