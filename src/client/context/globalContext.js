import React, { useEffect, createContext, useState } from "react";

const apiUrl = "http://localhost:4000";

export const Context = createContext({});

const GlobalProvider = (props) => {
  const [token, setToken] = useState("");

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
    <Context.Provider
      value={{ token, setToken, movies, setMovies, movieList, setMovieList }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
