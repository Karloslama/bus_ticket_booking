import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App as AntdApp } from "antd";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AntdApp>
        {" "}
        <App />
      </AntdApp>{" "}
    </Provider>
  </StrictMode>
);
