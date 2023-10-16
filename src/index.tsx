import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";

import "./styles/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import songsReducer from "./components/store/storeReducer"; // Import your Redux store
import thunkMiddleware from "redux-thunk";

const store = createStore(songsReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
