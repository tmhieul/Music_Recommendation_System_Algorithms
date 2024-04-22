import os
import pandas as pd
import random
import string
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

class SpotifyAPI:
    def __init__(self, client_id, client_secret):
        self.client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
        self.sp = spotipy.Spotify(client_credentials_manager=self.client_credentials_manager)

    def get_all_songs(self, genre, limit_per_request=50, total_limit=1000):
        song_data = []
        offset = 0
        total_fetched = 0
        while total_fetched < total_limit:
            limit = min(limit_per_request, total_limit - total_fetched)
            track_results = self.sp.search(q=f'genre:"{genre}"', type='track', limit=limit, offset=offset)
            if not track_results['tracks']['items']:
                break
            for track in track_results['tracks']['items']:
                song_data.append(track)
                total_fetched += 1
            offset += limit_per_request
        return song_data

    def get_cover_image(self, song_id):
        track_info = self.sp.track(song_id)
        if 'album' in track_info and 'images' in track_info['album'] and track_info['album']['images']:
            return track_info['album']['images'][0]['url']
        else:
            return None

class DataGenerator:
    def __init__(self, spotify_api, genre):
        self.spotify_api = spotify_api
        self.genre = genre

    def generate_songs_dataframe(self):
        songs = self.spotify_api.get_all_songs(self.genre)
        songs_df = pd.DataFrame(songs)
        songs_df['cover_url'] = songs_df['id'].apply(self.spotify_api.get_cover_image)
        return songs_df

    def generate_user_ratings(self, num_users, song_ids):
        user_ids = [''.join(random.choices(string.ascii_uppercase + string.digits, k=6)) for _ in range(num_users)]
        user_ratings = []
        for user_id in user_ids:
            for _ in range(random.randint(30, 50)):
                song_id = random.choice(song_ids)
                preference = random.choice([0, 1])
                user_ratings.append([song_id, user_id, preference])
        user_ratings_df = pd.DataFrame(user_ratings, columns=['song_id', 'user_id', 'preference'])
        return user_ratings_df


load_dotenv()

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

spotify_api = SpotifyAPI(client_id, client_secret)
data_generator = DataGenerator(spotify_api, 'pop')

# Generate songs dataframe and save it to CSV
songs_df = data_generator.generate_songs_dataframe()
songs_df.to_csv('./data/pop_songs.csv', index=False)

# Generate user ratings dataframe and save it to CSV
song_ids = songs_df['id'].tolist()
user_ratings_df = data_generator.generate_user_ratings(100, song_ids)
user_ratings_df.to_csv('./data/user_ratings.csv', index=False)
