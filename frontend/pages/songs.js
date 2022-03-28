import React from "react";
import { Cards } from "../components/card/card.js";
import { Header } from "../components/header/header.js";

import "./styles.css";

const Songs = () => {
  return (
    <div>
      <Header></Header>
      <div className="cards">
        <Cards></Cards>
      </div>
    </div>
  );
};

export default Songs;
