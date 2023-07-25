import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID_KEY,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_KEY,
  messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID_KEY,
  appId: process.env.REACT_APP_APP_ID_KEY,
  measurementId: process.env.REACT_APP_MESURMENT_ID_KEY,
};

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.info = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
