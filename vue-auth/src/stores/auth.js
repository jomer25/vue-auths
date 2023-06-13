import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  async function signin(email,password) {
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
        user.value = data
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
        user.value = data
      } else {
        error.value = data.error
      }
    } catch(error) {
      console.error(error.message);
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    localStorage.removeItem('user')
    user.value = null
  }

  return { error, isLoading, signin, signup, logout }
})
