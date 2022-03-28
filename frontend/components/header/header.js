import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  let navigate = useNavigate();

  const toDate = () => {
    window.history.back();
  };

  const toHome = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <div>
      <div>
        <h1 class="songs-header">We Found The Following Songs</h1>
      </div>
      <form role="form" method="POST" action="/api_songs" role="form">
        <div class="submit-container">
          <button class="submit-button" type="submit" id="submit-button">
            Make Spotify Playlist
          </button>
          <button
            class="submit-button"
            type="button"
            id="submit-button"
            onClick={toDate}
          >
            Pick Another Date
          </button>
          <button
            class="submit-button"
            type="button"
            id="submit-button"
            onClick={toHome}
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
};
