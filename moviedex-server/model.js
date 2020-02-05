let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */

let Schema = mongoose.Schema({
    film_Id : {type : String},
    film_title : {type : String},
    year : {type : Number},
    rating : {type : Number}
});

let Movies = mongoose.model('movie', Schema);

let moviesMethods = {
    getMovies : function(){
        return Movies.find()
            .then( movies => {
                return movies;
            })
            .catch( error => {
                throw Error( error );
            });
        },
    postMovies : function(newMovie){
        return Movies.insertMany(newMovie)
            .then( movies => {
                return movies;
            })
            .catch( error => {
                throw Error( error );
            });
        } 
}

module.exports = {
    moviesMethods
};