import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAaBms4L11rF6u6sqDzN9uCEjxIpGBgw8k",
  authDomain: "netadmin-hub.firebaseapp.com",
  projectId: "netadmin-hub",
  storageBucket: "netadmin-hub.firebasestorage.app",
  messagingSenderId: "891630123005",
  appId: "1:891630123005:web:131f3c33ab35eda3588b94",
  measurementId: "G-T1S3PEEE3K"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
