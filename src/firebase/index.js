import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsLXBXOcevH5p2_TzPzbuz03NNRGFVqIk",
  authDomain: "weatherapp-c799e.firebaseapp.com",
  projectId: "weatherapp-c799e",
  storageBucket: "weatherapp-c799e.appspot.com",
  messagingSenderId: "581163093210",
  appId: "1:581163093210:web:e63e644c2c8a5a12e5e9e3",
  measurementId: "G-4EPPRSKJYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}
