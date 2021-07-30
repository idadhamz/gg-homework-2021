import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

// Components
import Navbar from "./components/Navbar";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
