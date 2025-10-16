import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { initI18n } from "./i18n/config";
import "./index.css";
import { createStore } from "./stores/store";
import { StoreContext } from "./stores/StoreContext";

function main() {
  initI18n();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <StoreContext.Provider value={createStore()}>
        <Suspense fallback={<h1>Loading translations...</h1>}>
          <App />
        </Suspense>
      </StoreContext.Provider>
    </StrictMode>
  );
}

main();
