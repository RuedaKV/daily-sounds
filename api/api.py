from flask import Flask, request, redirect
import json
import pandas as pd

from client import SpotifyClient, build_date_input, url_to_token, get_month


app = Flask(__name__)

data = []
songs = None
token = None
songs_response = None
month = None
day = None

songs_data = pd.read_csv("composite_data.csv")
songs_data = songs_data.drop(columns = "Unnamed: 0")

@app.route('/api', methods=['GET', 'POST'])
def api():
  if(request.method == "POST"):
    global data
    global token
    global songs
    global month
    global day

    month = request.form['month']
    day = request.form['day']
    url = request.form["token"]

    token = url_to_token(url)
    date_input = build_date_input(day, month)
    client = SpotifyClient(songs_data, token)

    try:
      songs = client.find_songs(date_input)
      data = json.dumps(songs.to_dict("records"), indent=4)
      return(redirect("http://localhost:3000/songs"))
    except:
      return(redirect("http://localhost:3000"))

  if(request.method == 'GET'):
    return data
    
@app.route('/api_songs', methods=['POST', 'GET'])
def make_playlist():
  global songs_response

  client = SpotifyClient(songs, token)
  songs_response = client.create_playlist(songs, day, month)
  return(redirect("http://localhost:3000/playlist"))

@app.route('/api_playlist', methods=['POST', 'GET'])
def view_playlist():
  playlist_url = songs_response.json()["external_urls"]["spotify"]
  return(redirect(playlist_url))