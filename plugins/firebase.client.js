import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {

  const firebaseConfig = {
    apiKey: "AIzaSyDKJVfGO5c-Sbg1uSfpBsrSTi-1Yw5muQY",
    authDomain: "binge3-50151.firebaseapp.com",
    projectId: "binge3-50151",
    storageBucket: "binge3-50151.appspot.com",
    messagingSenderId: "406765233025",
    appId: "1:406765233025:web:ca4e478c9be54669087e80",
    measurementId: "G-0LY9QY6VKB"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app) 

  return {
    provide: {
      db,
      auth
    }
  }

})

// const {$db, $auth} = useNuxtApp()