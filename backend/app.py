from flask import Flask, request, jsonify
from content_based import ContentBasedRecommender  # Import the content-based recommender class
from collaborative_filtering import CF, get_song_url, get_user_id, get_song_id  # Adjust this import
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes



# Instantiate the content-based recommender object
content_based_recommender = ContentBasedRecommender('pop_songs.csv')

@app.route('/api/content-base-recommend', methods=['POST'])
def content_based_recommend_songs():
    try:
        data = request.get_json()
        song_id = data.get('song_id')

        # Instantiate the content-based recommender object
        content_based_recommender = ContentBasedRecommender('pop_songs.csv')

        # Get recommendations from the content-based recommender
        recommended_songs = content_based_recommender.get_recommendations(song_id)

        # Converting recommended songs to a list of IDs
        recommended_song_ids = recommended_songs['id'].tolist()

        return jsonify({'recommendations': recommended_song_ids})

    except Exception as e:
        return jsonify({'error': str(e)})



    

@app.route('/api/collaborative-filtering-recommend', methods=['POST'])
def collaborative_filtering_recommend_songs():
    try:
        # Load data and initialize collaborative filtering recommender
        df = pd.read_csv('user_ratings.csv')
        df['user_id_number'] = df['user_id'].astype('category').cat.codes.values
        df['song_id_number'] = df['song_id'].astype('category').cat.codes.values
        Y_data = df[['user_id_number', 'song_id_number', 'rating']].values
        data = request.get_json()
        user_id = data.get('user_id')
        
        # Instantiate the collaborative filtering recommender object
        user_based_cf = CF(Y_data, k=5, uuCF=1)  # User-based collaborative filtering
        user_based_cf.fit()
        
        # Get the user ID number from the provided user ID
        user_id_number = df[df.user_id == user_id].user_id_number.values[0]
        
        # Get recommendations for the user
        recommended_songs = user_based_cf.recommend(user_id_number)
        
        # Convert recommended songs to a list of song IDs
        recommended_song_ids = [get_song_id(song_id_number) for song_id_number in recommended_songs]

        return jsonify({'recommendations': recommended_song_ids})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(port=5000)
