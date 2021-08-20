/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Components
import TrackSearch from "./index";

describe("render components Track Search properly", () => {
  it("render search input", () => {
    render(<TrackSearch />);

    const input = screen.getByRole("input");
    expect(input).toBeInTheDocument();
  });

  it("get input value correctly", () => {
    render(<TrackSearch />);

    const input = screen.getByRole("input");
    userEvent.type(input, "JKT 48");
    expect(input).toHaveValue("JKT 48");
  });

  it("render button submit", () => {
    render(<TrackSearch />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
