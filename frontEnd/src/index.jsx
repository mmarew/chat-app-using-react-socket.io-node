import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for createRoot

import App from "./App";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
