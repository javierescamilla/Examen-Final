import React from 'react';
import './App.css';

class App extends React.Component {
    constructor( props ){
      super ( props )
      this.state = {
        movies : [],
        apiURL : "http://localhost:8080/movies"
      }
    }
    
    addNewMovie = (movie) => {
      console.log(movie)
      let newMovie = [...this.state.items, movie];
      this.setState({
        movies : newList
      })
    }

    // Fetch GET
    fetch('/movies')
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

    let params = {
      // POST
    };
    // Fetch POST
    fetch('/movies', params)
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
  
    render(){
      return (
          <div>
            <h1>Lista de peliculas:</h1>
            <NewMovie addNewMovie={this.addNewMovie}/>
            <form></form>
            <div>
              {this.state.movies.map ((movie) =>{
                return (<Movie name = {movie.movie}/>)
              })}
            </div>
          </div>
      )
    }
  }
  
  

export default App;
