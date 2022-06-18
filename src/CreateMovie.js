import React from "react";
import MovieForm from "../src/client/components/MovieForm";

const CreateMovie = ({ handleCreateMovie, movies }) => {
  return (
    <>
      {" "}
      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />
      <h1>Movie list</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CreateMovie;
