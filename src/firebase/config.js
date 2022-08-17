// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyASKxn8nJusZZ3vjK55FtoVlL8rCFXnGG0",
  authDomain: "comision41070-lachauffer.firebaseapp.com",
  projectId: "comision41070-lachauffer",
  storageBucket: "comision41070-lachauffer.appspot.com",
  messagingSenderId: "561321959743",
  appId: "1:561321959743:web:c302e9754dedbb9b68b38a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirebaseApiKey = () => {
    return app;
}