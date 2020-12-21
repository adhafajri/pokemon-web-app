import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
test("Navbar", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
});
