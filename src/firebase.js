// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8PvMe-DJ4LTmAsA0B7zG8AHtJfuyBQZ8",
  authDomain: "dbbase-38bbd.firebaseapp.com",
  projectId: "dbbase-38bbd",
  storageBucket: "dbbase-38bbd.firebasestorage.app",
  messagingSenderId: "1084375887932",
  appId: "1:1084375887932:web:de384df905e25e8615d339"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
export default getFirestore(app)