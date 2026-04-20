import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhEt6P3-VxreB7gV0Pz1RiBDh5qpuEP3A",
  authDomain: "replimate-22254.firebaseapp.com",
  projectId: "replimate-22254",
  storageBucket: "replimate-22254.firebasestorage.app",
  messagingSenderId: "802343706003",
  appId: "1:802343706003:web:1f90268f7013fbb89f1c66",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
