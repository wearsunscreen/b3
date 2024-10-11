import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {

  const firebaseConfig = {
    apiKey: "AIzaSyCllRBRUnGltQKqMqd6n6ht0kO2KLj-_4g",
    authDomain: "bingeables2.firebaseapp.com",
    projectId: "bingeables2",
    storageBucket: "bingeables2.appspot.com",
    messagingSenderId: "894440570921",
    appId: "1:894440570921:web:0d82f440dc076fcbea1c38",
    measurementId: "G-S8CM6JDFWB"
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