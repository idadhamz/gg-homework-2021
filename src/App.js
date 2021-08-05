import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Pages
import Home from "./pages/home";
import Playlist from "./pages/playlist";
import CreatePlaylist from "./pages/create-playlist";

// Components
import Navbar from "./components/Navbar";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);

  return (
    <Router>
      <ChakraProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <div className="Main">
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/playlist">
                {isLoggedIn ? <Playlist /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/create-playlist">
                {isLoggedIn ? <CreatePlaylist /> : <Redirect to="/" />}
              </Route>
            </div>
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
