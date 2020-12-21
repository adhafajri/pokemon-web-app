import React from "react";
import { render } from "@testing-library/react";
import Action from "./Action";
import { BrowserRouter as Router } from "react-router-dom";

test("Action", () => {
  render(
    <Router>
      <Action />
    </Router>
  );
});
