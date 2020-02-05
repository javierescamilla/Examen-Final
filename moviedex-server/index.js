let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let uuid = require( 'uuid' );

let {moviesMethods} = require('./model.js');


let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */

app.get('/movies', (req, res) => {
	moviesMethods.getMovies()
		.then(movies => {
			res.status(201).json(movies)
		})
		.catch(err => {
			res.statusMessage = "Somethign whent wrong withe the database"
			return res.status(500).json({
				error : "Something went wrong with the database",
				status : 500
			});
		});
})

app.post('/movies', jsonParser, (req, res) => {
	let fitlTitle = req.body.film_title;
	let year = req.body.year;
	let rating = req.body.rating;

	let moviesPost = {
		film_id : uuid(),
		film_title : fitlTitle,
		year : year,
		rating : rating
	}

    moviesMethods.postMovies(moviesPost)
       .then(moviesResponse => {
		console.log(moviesResponse)
           res.status(201).json(moviesResponse);
       })
       .catch(err => {
           res.statusMessage = "Something went wrong with the data base";
           return res.status(500).json({
               "error" : "Something went wrong with the data base",
               "status" : 500
           });
       });
});


let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}