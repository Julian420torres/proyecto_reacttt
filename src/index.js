import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
