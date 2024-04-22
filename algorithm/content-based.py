import ast
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer


class SongRecommender:
    def __init__(self, csv_file):
        self.songs_df = pd.read_csv(csv_file)
        self.tfidf_matrix = None
        self.cosine_sim = None
        self._prepare_data()

    def _prepare_data(self):
        def get_album_id(album_info):
            album_dict = ast.literal_eval(album_info)
            return album_dict['id'] if album_dict else None

        self.songs_df['album_id'] = self.songs_df['album'].apply(get_album_id)
        self.songs_df['combined_features'] = self.songs_df['artists'].astype(str) + " " + \
                                            self.songs_df['name'] + " " + \
                                            self.songs_df['album_id'] + " " + \
                                            self.songs_df['popularity'].astype(str)

        tfidf_vectorizer = TfidfVectorizer()
        self.tfidf_matrix = tfidf_vectorizer.fit_transform(self.songs_df['combined_features'])
        self.cosine_sim = cosine_similarity(self.tfidf_matrix, self.tfidf_matrix)

    def get_recommendations(self, song_id):
        idx = self.songs_df.index[self.songs_df['id'] == song_id].tolist()[0]

        sim_scores = list(enumerate(self.cosine_sim[idx]))

        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        sim_scores = sim_scores[1:11]

        song_indices = [i[0] for i in sim_scores]

        # Return the top 10 most similar songs
        return self.songs_df.iloc[song_indices][['id']]


song_recommender = SongRecommender('./data/pop_songs.csv')
song_id = '18HFH05MB3xeR8jSPiGVpG'
recommended_songs = song_recommender.get_recommendations(song_id)
print(recommended_songs)
