<template>
  <HideFromUser>
    <div class="flex justify-center items-center mt-10 flex-col">
      <div class="w-full max-w-sm bg-white shadow-md rounded p-8">
        <h2 class="text-2xl text-gray-800 font-bold text-center mb-6">Login</h2>

        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email" required
            class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

          <input v-model="password" type="password" placeholder="Password" required
            class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

          <button type="submit" class="w-full bg-purple-500 text-white py-2 rounded-sm">
            Login
          </button>

          <p v-if="authStore.loginError" class="text-red-500 mt-4 text-center">
            {{ authStore.loginError }}
          </p>
        </form>
      </div>
      <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

      <div class="w-full max-w-sm bg-white shadow-md rounded p-8">
        <button @click="handleGoogleLogin" class="w-full bg-purple-500 text-white py-2 rounded-sm">
          Login with Google
        </button>
        <p v-if="authStore.loginError" class="text-red-500 mt-4 text-center">
          {{ authStore.loginError }}
        </p>
      </div>
    </div>
  </HideFromUser>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
}

const handleGoogleLogin = async () => {
  await authStore.loginWithGoogle()
}

definePageMeta({
  title: 'Bingeables2',
  description: 'Bingeable podcast episodes.',
  middleware: ['guest']
})
</script>