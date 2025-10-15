import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./i18n/config";
import "./index.css";
import { createStore } from "./stores/store";
import { StoreContext } from "./stores/StoreContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={createStore()}>
      <App />
    </StoreContext.Provider>
  </StrictMode>
);
