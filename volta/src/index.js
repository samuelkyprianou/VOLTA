import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import App from "./App";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "semantic-ui-css/semantic.min.css";
import 'react-awesome-slider/src/core/styles.scss';
import 'react-input-range/lib/css/index.css'
require("dotenv").config();



const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
      <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);


