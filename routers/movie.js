var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find().populate("actors").exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            else{           
                res.json({msg:'Movie deleted'});}
        });
    },
    //new 7/10
    deleteMovies: function (req, res) {
        Movie.deleteMany({year:{$lt:req.params.aYear} }, function (err) {
            if (err) return res.status(400).json(err);
            else{           
                res.json({msg:'Movie deleted'});}
        });
    },

    updateActorList:function(req,res){
        Movie.findByIdAndUpdate(req.params.movieid,{$pull:{"actors":req.params.actorid}},{safe: true, upsert: true},
          function(err,movie){
              if (err) return res.status(400).json(err);
              else{ res.json(movie);}
             });
          
      },   

    addOneWithActor:function(req,res){
        Movie.findOne({_id:req.params.movieid},function(err,movie){
            Actor.findOne({_id:req.params.actorid},function(err,actor){
                movie.actors.push(actor._id);
                movie.save(function(err){
                    res.json(movie);
                });
            });
        });
    },

    getSpecificMovies:function(req,res){
        Movie.find({$and:[{year:{$gte: req.params.year1}}, {year:{$lte: req.params.year2}}]}).exec(function(err,movie){
            if (err) return res.status(400).json(err);
            else{
                console.log("Movie reterieved")
                res.json(movie);}
        })
    }
}