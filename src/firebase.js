// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaBms4L11rF6u6sqDzN9uCEjxIpGBgw8k",
  authDomain: "netadmin-hub.firebaseapp.com",
  projectId: "netadmin-hub",
  storageBucket: "netadmin-hub.firebasestorage.app",
  messagingSenderId: "891630123005",
  appId: "1:891630123005:web:131f3c33ab35eda3588b94",
  measurementId: "G-T1S3PEEE3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);