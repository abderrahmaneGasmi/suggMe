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
selected_moviesws = selected_moviesdataf.to_dict('records')
def removeduplicateitemsinlist(listsw):
    return list(set(listsw))
def removewhitesspacesinlist(listsw):
    return [x.strip() for x in listsw]
# Sample movie DataFrame (replace with your actual DataFrame)
def getrecomandadbasedonfiltering(selected_movies):


    

    # Aggregate selected movie attributes
    # 'original language'  'genres' ' production company ' 'keywords'  'vote_average' 'vote_cont' 
    selected_original_languages = removeduplicateitemsinlist([movie['original_language'] for movie in selected_movies])
    selected_genres = removeduplicateitemsinlist(removewhitesspacesinlist([genre for movie in selected_movies for genre in movie['genres']]))
    selected_production_companies = removewhitesspacesinlist([movie['production_companies'] for movie in selected_movies])
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
        &
        (filtered_movies_df.loc[:, selected_production_companies].sum(axis=1) > 0) 

        
        ]

    filtered_movies_df = filtered_movies_df[~filtered_movies_df['title'].isin([movie['title'] for movie in selected_movies])]
    filtered_movies_df = filtered_movies_df.sort_values(by='vote_average', ascending=False)
    

    return filtered_movies_df[['title' , 'genres','vote_average','poster_path']]

def getmoviesfromtitles(titles):
    return movies_df[movies_df['title'].isin(titles)].to_dict('records')
def similairitemscountintwolist(list1,list2):
    return len(set(list1) & set(list2)) 

def gestrecomandadbasedonscore(selected_movies):
    # 'original language'  'genres' ' production company ' 'keywords'  'vote_average' 'vote_cont' 
    selected_original_languages = removeduplicateitemsinlist([movie['original_language'] for movie in selected_movies])
    selected_genres =removeduplicateitemsinlist( removewhitesspacesinlist([genre for movie in selected_movies for genre in movie['genres']]))
    selected_production_companies =  removewhitesspacesinlist([movie['production_companies'] for movie in selected_movies])
    selected_keywords = [movie['keywords'].split(',') for movie in selected_movies ]
    flattened_keywords = [keyword for sublist in selected_keywords for keyword in sublist]
    unique_keywords = removeduplicateitemsinlist(flattened_keywords)
    trimmed_keywords = removewhitesspacesinlist(unique_keywords)
    selected_production_countries = [movie['production_countries'].split(',') for movie in selected_movies]
    flattened_production_countries = [country for sublist in selected_production_countries for country in sublist]
    unique_production_countries = removeduplicateitemsinlist(flattened_production_countries)
    trimmed_production_countries = removewhitesspacesinlist(unique_production_countries)
    spoken_languages = [movie['spoken_languages'].split(',') for movie in selected_movies ]
    flattened_spoken_languages = [keyword for sublist in spoken_languages for keyword in sublist]
    unique_spoken_languages = removeduplicateitemsinlist(flattened_spoken_languages)
    trimmed_spoken_languages = removewhitesspacesinlist(unique_spoken_languages)


    keyword_weight = 3
    genre_weight = 5
    spoken_languages_weight = 4
    moviesmin = movies_df[['title' , 'genres','vote_average','poster_path']]
    for index, row in movies_df.iterrows():
        score = similairitemscountintwolist(row['genres'],selected_genres) * genre_weight
        score += similairitemscountintwolist(
            removeduplicateitemsinlist(
                removewhitesspacesinlist(
                    row['keywords'].split(',')
                )
            ),trimmed_keywords
        )* keyword_weight
        score += similairitemscountintwolist(
            removeduplicateitemsinlist(
                removewhitesspacesinlist(
                    row['spoken_languages'].split(',')
                )
            ),trimmed_spoken_languages
        )* spoken_languages_weight
        if(row['original_language'] in selected_original_languages):
            score+=1
        if(row['production_companies'] in selected_production_companies):
            score +=4


    
    # Add to the score based on the number of selected genres
    # score += len(set(selected_genres).intersection(row['genres'])) * genre_weight
    
    # Assign the calculated score to the 'score' column
        moviesmin.loc[index, 'score'] = score

        
    return moviesmin.sort_values(by=['score', 'vote_average'], ascending=False).drop(columns=['score'])

recomandmovies = gestrecomandadbasedonscore(selected_moviesws)
recomandmovies2 = getrecomandadbasedonfiltering(selected_moviesws)
print(recomandmovies.head())
print(recomandmovies2.head())
# app = Flask(__name__)

# CORS(app)
# # Define routes and functions
# @app.route('/')
# def hello():
#     return 'Hello, World!'

# @app.route('/movies', methods=[ 'POST'])
# def get_movies():
#     movies = request.json
#     # convert movies to dictionary
#     # movies = [movie.to_dict() for movie in movies]
#     moviesdemanded = getmoviesfromtitles(
#         [movie['title'] for movie in movies]
#     )
#     predictions = getrecomandadbasedonfiltering(moviesdemanded)
#     # return 10 items from the predictions
#     return jsonify(predictions[:10].to_dict('records'))



# if __name__ == '__main__':
#     app.run(debug=True)