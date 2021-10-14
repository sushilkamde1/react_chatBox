import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuToYs13tNJKyyccR7m-b7_BppLAawI04",
  authDomain: "react-chat-99742.firebaseapp.com",
  projectId: "react-chat-99742",
  storageBucket: "react-chat-99742.appspot.com",
  messagingSenderId: "458418696744",
  appId: "1:458418696744:web:747df451918950fe16bb1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
