/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";

// Components
import TrackItem from "./index";

// Data
import dataExample from "../../data/index";

describe("render components Track Search properly", () => {
  it("all tracks element are rendered", () => {
    render(<TrackItem data={dataExample[0]} />);

    const ImageTrack = screen.getByRole("img");
    const titleText = screen.getByText("A Night At The Opera (2011 Remaster)");
    const artistsText = screen.getByText("Queen");

    expect(ImageTrack).toHaveAttribute(
      "src",
      "https://i.scdn.co/image/ab67616d0000b273e319baafd16e84f0408af2a0"
    );
    expect(ImageTrack).toHaveAttribute(
      "alt",
      "A Night At The Opera (2011 Remaster)"
    );
    expect(titleText).toBeInTheDocument();
    expect(artistsText).toBeInTheDocument();
  });

  it("button text if isSelected true is Deselect", () => {
    render(
      <TrackItem
        data={dataExample[0]}
        handleSelect={(uri) => {
          console.log(uri);
        }}
        isSelected={true}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Deselect");
  });

  it("button text if isSelected false is Select", () => {
    render(
      <TrackItem
        data={dataExample[0]}
        handleSelect={(uri) => {
          console.log(uri);
        }}
        isSelected={false}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Select");
  });

  it("output uri after click must same with data", () => {
    render(
      <TrackItem
        data={dataExample[0]}
        handleSelect={(uri) => {
          console.log(uri);
        }}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
  });
});
