import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Date from "./pages/form";
import Songs from "./pages/songs";
import Playlist from "./pages/playlist";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth />}></Route>
        <Route exact path="/form" element={<Date />}></Route>
        <Route exact path="/songs" element={<Songs />}></Route>
        <Route exact path="/playlist" element={<Playlist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
