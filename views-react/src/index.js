import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import Root from "./containers/Root";
// import "./utils/front";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

const _root = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  _root
);
registerServiceWorker();
