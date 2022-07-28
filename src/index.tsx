import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter /* HashRouter  uncomment when need gh-pages deploy && commented BrowserRouter */ } from "react-router-dom";
import { store } from "./redux/store";
import App from "./components/App/App";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
