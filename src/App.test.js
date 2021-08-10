/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";

// Components
import TrackItem from "./components/playlist-item/index";

// Data
import dataExample from "./data/index";

// eslint-disable-next-line no-undef
test("all tracks element are rendered", () => {
  render(<TrackItem />);

  const ImageTrack = screen.getByRole("img");
  const titleText = screen.getByText(dataExample[0].album.name);
  const artistsText = screen.getByText(dataExample[0].album.artists[0].name);

  expect(ImageTrack).toHaveAttribute("src", dataExample[0].album.images[0].url);
  expect(ImageTrack).toHaveAttribute("alt", dataExample[0].album.name);
  expect(titleText).toBeInTheDocument();
  expect(artistsText).toBeInTheDocument();
  // screen.debug();
});

test("output uri after click must same with data", () => {
  render(
    <TrackItem
      data={dataExample[0].album}
      isSelected={true}
      handleSelect={(uri) => {
        console.log(uri);
      }}
    />
  );

  const ButtonTrack = screen.getByRole("button");
  fireEvent.click(ButtonTrack);
});
