import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./App";

test("render all components in app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  screen.debug();
});
