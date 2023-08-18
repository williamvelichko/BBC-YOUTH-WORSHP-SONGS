import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";

import "./styles/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import songsReducer from "./components/store/storeReducer"; // Import your Redux store

const store = createStore(songsReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
