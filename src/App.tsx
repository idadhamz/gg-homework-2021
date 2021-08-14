import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Pages
import Home from "./pages/home";
import CreatePlaylist from "./pages/create-playlist";
import Playlist from "./pages/playlist";

// Components
import Navbar from "./components/Navbar";

// Redux
import { useAppSelector } from "./hooks";
import { isLoggedIn } from "./redux/slices/authSlice";

const App = () => {
  const isLoggedInValue = useAppSelector(isLoggedIn);
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
              <Route exact path="/create-playlist">
                {isLoggedInValue ? <CreatePlaylist /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/playlist">
                {isLoggedInValue ? <Playlist /> : <Redirect to="/" />}
              </Route>
            </div>
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
