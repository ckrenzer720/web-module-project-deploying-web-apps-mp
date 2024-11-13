import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h1>Welcome to the GRID</h1>
    <App />
  </React.StrictMode>
);
