import React from "react";
import "./card.css";
import { useState, useEffect } from "react";

const Card = ({ artist, song, url, date }) => {
  return (
    <div class="card">
      <img class="card_img" src={url}></img>
      <div class="card-body">
        <h1 class="card_song">{song}</h1>
        <h2 class="card_artist">{artist}</h2>
        <h2 class="card_date">{date}</h2>
      </div>
    </div>
  );
};

export const Cards = () => {
  const [initialData, setInitialData] = useState([{}]);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setInitialData(data));
  }, []);

  return (
    <div class="card-wrapper">
      {initialData.map((data, key) => {
        return (
          <div key={key}>
            <Card
              artist={data.artist}
              song={data.song_title}
              url={data.url}
              date={data.release_date}
            ></Card>
          </div>
        );
      })}
    </div>
  );
};
