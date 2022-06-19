import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import CreateMovie from "./components/CreateMovie";
import Register from "./components/Register";

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

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={<Login setMovieList={setMovieList} movieList={movieList} />}
        />
        <Route
          path="/movies"
          element={
            <CreateMovie
              setMovieList={setMovieList}
              movieList={movieList}
              movies={movies}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
