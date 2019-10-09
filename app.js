//RESTful API: an application programming interface that uses HTTP 
//request to do CURD operation

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose'); //to connect db
const actors = require('./routers/actor'); //references to routers
const movies = require('./routers/movie');

//week10 new
const path=require('path');

const app = express();

//week10 new
app.use('/',express.static(path.join(__dirname,"dist/w9app")));


app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', { useUnifiedTopology: true,useNewUrlParser: true } ,function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});


//extra  task
app.put('/actors/increaseAge4', actors.updateAges);

//Configuring Endpoints
//Actor RESTFul endpoionts 

//7. Contain details of movies instead IDs
app.get('/actors', actors.getAll);

app.post('/actors', actors.createOne); //post: create resource in DB
app.get('/actors/:id', actors.getOne);
app.put('/actors/update/:id', actors.updateOne); //put: to update resource or create
app.post('/actors/addMovie1/:actorid', actors.addMovie); //need unique endpoint

app.post('/actors/addMovie/:actorid/:movieid', actors.addMovie2); //need unique endpoint


//3. Remove a movie from the list of movies of an actor
app.put('/actors/:actorid/:movieid', actors.updateMovieList);

//2. Delete actor by id and delete movie with actor_id in movie
app.delete('/actor/:actorid', actors.deleteActorAndMovie)





//Movie RESTFul  endpoints

//8. Contain details of all actors instead of IDs
app.get('/movies', movies.getAll);


app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);

//w10 Task 4
app.put('/movies/addActor/:id', movies.updateOne);


//4. Remove an actor from the list of actors in a movie
app.put('/movies/:movieid/:actorid', movies.updateActorList);

//5. Add an existing actor to the list of actors in a movie
app.post('/movies/actorToMovie/:movieid/:actorid',movies.addOneWithActor);

//[1. Delete movie by id]
app.delete('/movies/:id', movies.deleteOne);
//app.delete('/movies/:id/:id', movies.deleteMovieOfActor);

//new 7/10
app.delete('/movies/aYear/:aYear', movies.deleteMovies);

//[6. Retrieve (GET) all the movies produced
//between year1 and year2, where year1>year2]
app.get('/movies/year/:year1/:year2', movies.getSpecificMovies);