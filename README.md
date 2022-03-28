# Daily Sounds 
This app includes a back-end API written in Python, and the front-end written in JS using React. The application allows for the discovery and creation of new Spotify playlists using the Spotify Web API. 


# Running Locally

## Setting Up Python
First, install Python 3.6+ and virtualenv. Then, use the following commands to set up the required Python environment:
```
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
```

## Running the Frontend
Create a new React app in the root directory using the following command. 
```
npx create-react-app my-react-app
```
To run the frontend use
```
cd my-react-app
npm start
```

## Connecting the Back-end 
To connect the frontend to the back-end, you must either use the `package.json` file included in the repo or make the following adjustments to the default 'package.json' created.

Add the following line as a main value.
```"proxy": "http://127.0.0.1:5000/"```

Add the following line in ```"scripts"```: 
```"start-flask-api": "cd api && venv/bin/flask run"```

You may run the back-end as follows:
```
npm start-flask-api
```

## Demo
![app-gif](daily_sounds_demo.gif)

