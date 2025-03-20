
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQxdZ97EtnQEDivTZB-3499O5UUm4ZymU",
  authDomain: "my-apps-3c6a7.firebaseapp.com",
  projectId: "my-apps-3c6a7",
  storageBucket: "my-apps-3c6a7.appspot.com",
  messagingSenderId: "6901384135",
  appId: "1:6901384135:web:e1452fff469a455a70cfe2",
  measurementId: "G-3T781SB47S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const  fireDB = getFirestore(app);

export {auth, fireDB}