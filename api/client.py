
import time as tm
import numpy as np
import random
import json
import requests
import pandas as pd
from artists import get_top_artists

top_artists = get_top_artists()

class SpotifyClient():
    def __init__(self, data, token):
        self.token = token
        self.data = data
        self.headers = {'Authorization': "Bearer " + self.token}
        
    def get_random_song_from_album(self, album_id):
        url = f"https://api.spotify.com/v1/albums/{album_id}"
        response = requests.get(url, headers=self.headers).json()
        
        try:
            num_tracks = response["tracks"]['total']
        except:
            num_tracks = response["total_tracks"]


        tracks = response["tracks"]["items"]
        random_number = random.randint(0, num_tracks-1)

        try:
            track_uri = tracks[random_number]["uri"]
            track_name = tracks[random_number]["name"]
        except:
            track_uri = tracks[0]["uri"]
            track_name = tracks[0]["name"]

        return {"id": album_id, "song_title": track_name, "song_uri": track_uri, "album_popularity": response["popularity"]}
    
    def f(self, x):
        response = self.get_random_song_from_album(x["id"])
        return response

    def array_for(self, x):
        return np.array([self.f(xi) for xi in x])
    
    def hipster_popularity(self, row):
        if(row["album_popularity"] <= 10):
            row["album_popularity"] = 100 - row["album_popularity"]
        return row["album_popularity"]
    
    def filter_songs(self, data, date, year_threshold = 1960, include_hipster = False, limit_songs = 24):
        year_threshold = str(year_threshold) + "-" + str(date)

        #get songs only after threshold year
        data = data[data["release_date"] > year_threshold]

        #sort by popularity
        data = data.sort_values(by="album_popularity", ascending = False)

        #if include_hipster is set to True, songs that are considered "hipster" (popularity < 10)
        #are included in the filtering
        if(not include_hipster):
            data = data[:limit_songs]
        else:
            data["album_popularity"] = data.apply(lambda row: self.hipster_popularity(row), axis = 1)
            data = data[:limit_songs]

        return data
    
    def find_songs(self, date, year_threshold = 1960, include_hipster = False, limit_songs = 24):
        
        candidates = self.data[self.data["date"] == date]
        songs_from_top_artists = candidates[candidates['artist'].isin(top_artists)]

        if(songs_from_top_artists.shape[0] < 24):
            difference = candidates[~candidates.apply(tuple,1).isin(songs_from_top_artists.apply(tuple,1))]
            count_difference = 24 - songs_from_top_artists.shape[0] 
            
            if(count_difference < difference.shape[0]):
                remaining = difference.sample(n=count_difference, random_state=1)
            else:
                remaining = difference.sample(round(difference.shape[0]*0.1))
                
            data = pd.concat([songs_from_top_artists, remaining])
        else:
            data = songs_from_top_artists.sample(n=24, random_state=1)
            
        if(data.shape[0] > 100):
            data = data.sample(n=30)

        to_dictionary = data.to_dict('records')
        song_data = self.array_for(to_dictionary)

        new_frame = pd.DataFrame(list(song_data))
        data = pd.merge(data, new_frame, on = "id") 

        data = self.filter_songs(data, date, year_threshold, include_hipster, limit_songs)

        return data
    
    def get_user_id(self):
        response = requests.get("https://api.spotify.com/v1/me", headers=self.headers)
        return response.json()["id"]
    
    
    def create_playlist(self, songs, day, month):
        user_id = self.get_user_id()

        payload = json.dumps({
          "name": month + " " + day + " Playlist",
          "description": "Collection of songs from albums that released on " + month + " " + day,
          "public": False
        })

        playlist_url = f"https://api.spotify.com/v1/users/{user_id}/playlists"    
        playlist_response = requests.post(playlist_url, data=payload, headers=self.headers)

        playlist_id = playlist_response.json()["id"]
        songs = json.dumps({"uris": list(songs["song_uri"])})
        songs_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"

        songs_response = requests.post(songs_url, data=songs, headers=self.headers)
        return playlist_response

def get_month(month):
    table = {"January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06",
    "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12"}
    
    return table[month]

def build_date_input(day, month):
    month = get_month(month)
    return(month + "-" + day)

def url_to_token(url):
    left = 14
    right = url.find("&token_type=")
    return url[left:right]
