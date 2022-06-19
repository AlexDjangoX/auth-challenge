import React from "react";
import { useNavigate } from "react-router-dom";
import MovieForm from "./MovieForm";
const apiUrl = "http://localhost:4000";

const CreateMovie = ({ movies, setMovieList, movieList }) => {
  const navigate = useNavigate();

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem("jsonWebToken");

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const res = await fetch(`${apiUrl}/movie`, opts);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
    }

    if (data) {
      setMovieList(movieList + 1);
    }
  };
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
