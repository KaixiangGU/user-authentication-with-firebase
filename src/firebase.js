// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAReSKc6Gd5Ik11kBaDu6Q_5rA_Aszl7V4",
  authDomain: "authentication-dev-ff373.firebaseapp.com",
  projectId: "authentication-dev-ff373",
  storageBucket: "authentication-dev-ff373.appspot.com",
  messagingSenderId: "667655862183",
  appId: "1:667655862183:web:b77aac967f59a74bc06882",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(auth);
export default app;
