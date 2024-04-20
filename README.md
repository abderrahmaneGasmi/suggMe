# SuggMe
suggMe is an application that will suggest you the best movies based on you watch history , it uses React and typescript for frontend user interface and python flask for the recommendation system , it contains more than 8000 movies and it will suggest you the best movies based on your watch history 

# Recommendation System
it uses two recommendation system , 
## Score Recommendation: 
it works by sorting the movies by the similartiy of the selected movies using different keys shuch as :genres, keywords, etc
## Filter Recommendation: 
it works by filtering the movies and keeps only movies that has the similartiy of the selected movies using different keys shuch as :genres, keywords ,etc
# Screenshots
<div style="display:flex">
        <img width="47%" height="300px" style="margin-right:10px;" src="https://github.com/abderrahmaneGasmi/suggMe/assets/119729705/ee035dc8-6c8f-4718-9729-bfa7d1422f8c"/>
       <img width="47%" height="300px" src="https://github.com/abderrahmaneGasmi/suggMe/assets/119729705/f95678e3-2ced-4c8d-aeee-b23c7f1bcda9"/>
         <img width="98%" height="550px" src="https://github.com/abderrahmaneGasmi/suggMe/assets/119729705/6ff9d063-acec-496b-8a79-d8262184864a"/>
</div>

# Run Locally

## Frontend

The application uses <a href='https://www.nodejs.org/'>Node.js <a/> and <a href ='https://github.com/npm/npm'>npm </a> so you will have to download and install them as part of the steps below.

Clone this repository :
```
git clone [https://github.com/abderrahmaneGasmi/suggMe]
```
```
cd suggMe
```

Install Node.js and npm
Go to the project folder in a terminal and run:
Install packages :
```
npm i
```

### Start Front-End
When installation is complete, run command :
```
npm run dev
```
Go to http://localhost:5173

## Backend

The application uses <a href='https://www.python.org/downloads/'>Python <a/> so you will have to download it .

and for the application to run it requires some python packages  
<ul >
  <li >
    flask
  </li>
  <li>
    pandas
  </li>
  <li>
    sklearn
  </li>
</ul>
so make sure to download them using pip module
<br/>
open new terminal and change directory to /suggMe/backend

```
cd suggMe
```
### Start Back-end

start the flask app by typing 

```
python3 recomandation.py
```
or 
```
python recomandation.py
```

