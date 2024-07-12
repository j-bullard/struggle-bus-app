import App from "@/components/App/App";
import Header from "@/components/Header/Header";
import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Fragment>
    <Router>
      <Header />
      <App />
      {/* <Footer /> */}
    </Router>
  </Fragment>,
);
