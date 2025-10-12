import { createContext, useContext } from "react";
import type { Store } from "./store";

export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreContext.Provider");
  }
  return context;
}
