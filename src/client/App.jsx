import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/movie`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, [movieList]);

  const handleRegister = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/user/register`, opts);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/user/login`, opts);

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("jsonWebToken", data.data);
      setMovieList(movieList + 1);
    } else {
      alert(data.error);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem("jsonWebToken");
    console.log("token... : ", token);
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
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

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
    </div>
  );
}

export default App;
