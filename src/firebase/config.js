import  { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBn6OzyihOe5KxGNGXC1MceNj-63NuTHI8",
    authDomain: "dojosite-8a231.firebaseapp.com",
    projectId: "dojosite-8a231",
    storageBucket: "dojosite-8a231.appspot.com",
    messagingSenderId: "1089119357216",
    appId: "1:1089119357216:web:bc02168159fb55938baf45"
  };

  // init firebase
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()
  const auth = getAuth()

  // timestamp
  const timestamp = serverTimestamp()

  export { db, auth, timestamp }