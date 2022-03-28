import React, { useEffect } from "react";
import { Banner } from "../components/banner/banner.js";
import "./styles.css";

const CLIENT_ID = "4fd8a28ac739475bbf9bc994a1e67dd3";
const SPOTIFY_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/form";
const SCOPES = [
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify",
];
const SCOPES_URL = SCOPES.join("%20");

const getToken = (hash) => {
  const stringAfterHash = hash.substring(1);
  const paramasURL = stringAfterHash.split("&");
  const paramsSplit = paramasURL.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  return paramsSplit;
};

const Auth = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expiration, token_type } = getToken(
        window.location.hash
      );
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expiration", expiration);
      localStorage.setItem("token_type", token_type);
    }
  });

  const clientLogin = () => {
    window.location = `${SPOTIFY_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <Banner></Banner>
      <div class="button-container">
        <button class="login-button" onClick={clientLogin}>
          Login With Spotify
        </button>
      </div>
    </div>
  );
};

export default Auth;
