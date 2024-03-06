// ./src/stores/index.ts
import { createContext, useContext } from "react";
import { STORE_ROUTER, RouterStore, history } from "./router";

function createStores() {
  return {
    [STORE_ROUTER]: new RouterStore(),
  };
}

export const stores = createStores();

export const StoresContext = createContext(stores);

const useStores = () => useContext(StoresContext);

export function useRouterStore() {
  const { routerStore } = useStores();
  return routerStore;
}

export { history };

export const generalError = { success: false, error: "general_error" };
