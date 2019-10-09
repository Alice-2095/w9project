//router needs access to both models and to Mongoose library
//Router will export an obj where each function is a member of that obj
const mongoose = require('mongoose');
const Actor = require('../models/actor');//..-->go to parent folder; .--> go to folder
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) { //callback, invoked when request arrives
        Actor.find().populate("movies").exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) { //save it in 'Actor' collection
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')   //replace each ID in array 'movies' with its doc
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id); //add movieId to the subdoc which is 'movies' in actor's doc
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                   // res.json({msg:'Movie addedd to actor'});
                });
            })
        });
    },

    addMovie2: function (req, res) {
        Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id); //add movieId to the subdoc which is 'movies' in actor's doc
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                   // res.json({msg:'Movie addedd to actor'});
                });
            })
        });
    },

    deleteActorAndMovie: function (req, res) {
        Actor.deleteOne({ _id: req.params.actorid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.deleteMany({ actors:req.params.actorid  }, function (err, movie) {
                if (err) return res.status(400).json(err);
                    res.json(actor);
              
            });
        });
    },

    updateMovieList:function(req,res){
      Actor.findByIdAndUpdate(req.params.actorid,{$pull:{"movies":req.params.movieid}},{safe: true, upsert: true},
        function(err,actor){
            if (err) return res.status(400).json(err);
            else{ res.json(actor);}
           });
        
    },
    
    updateAges: function(req,res){
        let upd = { $inc: { bYear: -4 } };
        Actor.updateMany({bYear:{$lt:1969}},upd,{safe: true, upsert: true},
        function(err,actor){
            if (err) return res.status(400).json(err);
            else{ res.json(actor);}

        });
    }
      
    
}