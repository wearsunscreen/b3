import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    initialAuthValueReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp()

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user
          this.initialAuthValueReady = true
          console.log('user state change:', this.user)
        })
      } else {
        console.error('Firebase Auth is not initialized');
      }
    },

    // signup
    async signup(email, password) {
      const { $auth } = useNuxtApp()

      this.signupError = null

      try {
        const cred = await createUserWithEmailAndPassword($auth, email, password)
      } catch (error) {
        this.signupError = error.message
      }
    },

    // logout
    async logout() {
      const { $auth } = useNuxtApp()

      await signOut($auth)
    },

    // login
    async login(email, password) {
      const { $auth } = useNuxtApp()

      this.loginError = null

      try {
        const cred = await signInWithEmailAndPassword($auth, email, password)
      } catch (error) {
        this.loginError = error.message
      }
    },

    async loginWithGoogle() {
      const { $auth } = useNuxtApp()
      const provider = new GoogleAuthProvider()
      this.loginError = null

      signInWithPopup($auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          this.user = result.user;
        }).catch((error) => {
          this.loginError = error.message
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  },
})