from flask import Flask, jsonify, request
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer    
import logging
from flask_cors import CORS
logging.basicConfig(level=logging.DEBUG)
jsonfile = 'moviescleaned.json'
movies_df = pd.read_json(jsonfile)
selected_moviesdataf = movies_df.sample(5)

# make selected_movies as dictionary 
selected_movies = selected_moviesdataf.to_dict('records')
def removeduplicateitemsinlist(listsw):
    return list(set(listsw))
def removewhitesspacesinlist(listsw):
    return [x.strip() for x in listsw]
# Sample movie DataFrame (replace with your actual DataFrame)
def getrecomandadbasedonfiltering():




    # Aggregate selected movie attributes
    # 'original language'  'genres' ' production company ' 'keywords'  'vote_average' 'vote_cont' 
    selected_original_languages = removeduplicateitemsinlist([movie['original_language'] for movie in selected_movies])
    selected_genres = removewhitesspacesinlist([genre for movie in selected_movies for genre in movie['genres']])
    selected_production_companies = removewhitesspacesinlist([movie['production_companies'] for movie in selected_movies])
    selected_keywords = [keyword for movie in selected_movies for keyword in movie['keywords']]
    # Convert genres to binary representation using one-hot encoding
    mlb = MultiLabelBinarizer()
    genres_encoded = mlb.fit_transform(movies_df['genres'])
    genres_df = pd.DataFrame(genres_encoded, columns=mlb.classes_)

    languages_encoded = mlb.fit_transform([[language] for language in movies_df['original_language']])
    languages_df = pd.DataFrame(languages_encoded, columns=mlb.classes_)



    production_companies_encoded = mlb.fit_transform([[company] for company in movies_df['production_companies']])
    production_companies_df = pd.DataFrame(production_companies_encoded, columns=mlb.classes_)

    # Combine encoded genres and production companies with the original DataFrame
    movies_df_encoded = pd.concat([movies_df, genres_df,languages_df,production_companies_df], axis=1)
    # print(movies_df_encoded)
    # Filter movies based on aggregated selected attributes
    filtered_movies_df = movies_df_encoded.copy()
    filtered_movies_df = filtered_movies_df[
        (filtered_movies_df.loc[:, selected_genres].sum(axis=1) > 0) &
        (filtered_movies_df.loc[:, selected_original_languages].sum(axis=1) > 0) 
        &(filtered_movies_df.loc[:, selected_production_companies].sum(axis=1) > 0) 

        
        ]
    selected_features = ['vote_average', 'vote_count']  # Example features used for similarity calculation
    selected_movies_features = filtered_movies_df[selected_features]
    all_movies_features = movies_df_encoded[selected_features]

    similarity_scores = cosine_similarity(selected_movies_features, all_movies_features)

    top_recommendations_indices = similarity_scores.argsort()[0][::-1]  # Indices of most similar movies
    top_recommendations_titles = movies_df.iloc[top_recommendations_indices]['title']
    print("Selected movies:", selected_moviesdataf['title'])
    print( "recomandad with no score average", filtered_movies_df)
    print("Top recommended movies with score average:", top_recommendations_titles)



app = Flask(__name__)

CORS(app)
# Define routes and functions
@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/movies', methods=[ 'POST'])
def get_movies():
    # logging.debug('Received POST request with headers: %s', request.headers)
    print(request.json)
    return jsonify(selected_movies)


if __name__ == '__main__':
    app.run(debug=True)