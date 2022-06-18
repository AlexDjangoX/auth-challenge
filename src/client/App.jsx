import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "../Login";
import CreateMovie from "../CreateMovie";
import Register from "../Register";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/movie`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, [movieList]);

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
      navigate("/movies");
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
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/movies"
          element={
            <CreateMovie
              handleCreateMovie={handleCreateMovie}
              movies={movies}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
