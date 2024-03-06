import React from "react";
import { Provider } from "mobx-react";
import Routers from "./router";
import { stores, StoresContext } from "./stores";

function App() {
  return (
    <Provider {...stores}>
      <StoresContext.Provider value={stores}>
        <Routers />
      </StoresContext.Provider>
    </Provider>
  );
}

export default App;
