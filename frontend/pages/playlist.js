import React from "react";

const Playlist = () => {
  const toDate = () => {
    window.history.go(-2);
  };

  const toHome = () => {
    window.history.go(-3);
  };

  return (
    <div>
      <form
        className="form"
        role="form"
        method="POST"
        action="/api_playlist"
        role="form"
      >
        <div class="submit-container">
          <button class="submit-button" type="submit" id="submit-button">
            View Playlist
          </button>
        </div>
        <div class="submit-container">
          <button
            class="submit-button"
            type="button"
            id="submit-button"
            onClick={toDate}
          >
            Make Another Playlist
          </button>
        </div>
        <div class="submit-container">
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

export default Playlist;
