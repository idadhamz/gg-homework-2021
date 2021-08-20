import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getUserProfile } from "../../services/apiSpotify";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./index";

const server = setupServer(
  rest.get("https://api.spotify.com/v1/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        display_name: "Dadi Ilham S",
        images: [
          {
            url: "https://i.scdn.co/image/ab6775700000ee85e1a7024a9121d89f3ab29f38",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("render components Navbar properly", () => {
  it("render profile user in Navbar correctly", async () => {
    const tokenValue = "contoh token";
    const data = await getUserProfile(tokenValue);
    const name = data.display_name;
    const image = data.images[0].url;

    expect(name).toBe("Dadi Ilham S");
    expect(image).toBeDefined();
  });

  it("render element in component if login false correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar isLoggedInValue={false} />
        </Router>
      </Provider>
    );

    const logoImg = screen.getByTestId("logoImg");
    const LoginSpotify = screen.getByText("Login On Spotify");

    expect(logoImg).toHaveAttribute("src", "spotify.png");
    expect(LoginSpotify).toBeInTheDocument();
  });

  it("render element in component if login true correctly", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar isLoggedInValue={true} />
        </Router>
      </Provider>
    );

    const logoImg = screen.getByTestId("logoImg");
    const createPlaylists = screen.getByText("Create Playlists");
    const LogoutSpotify = screen.getByText("Logout Spotify");

    expect(logoImg).toHaveAttribute("src", "spotify.png");
    expect(createPlaylists).toBeInTheDocument();
    expect(LogoutSpotify).toBeInTheDocument();
  });
});
