import { App } from "@/App";
import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Fragment>
    <Router>
      <App />
    </Router>
  </Fragment>,
);
