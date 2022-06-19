import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./client/App";

import { BrowserRouter as Router } from "react-router-dom";
import GlobalProvider from "./client/context/globalContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
