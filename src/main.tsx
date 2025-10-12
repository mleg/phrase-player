import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppLayout } from "./AppLayout";
import "./index.css";
import { createStore } from "./stores/store";
import { StoreContext } from "./stores/StoreContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={createStore()}>
      <AppLayout />
    </StoreContext.Provider>
  </StrictMode>
);
