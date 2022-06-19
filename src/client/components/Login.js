import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/globalContext";
import UserForm from "./forms/UserForm";
const apiUrl = "http://localhost:4000";

const Login = () => {
  const navigate = useNavigate();
  const { movieList, setMovieList } = useContext(Context);

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
      alert("You are successfully logged in");
      navigate("/movies");
    } else {
      alert(data.error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
    </>
  );
};

export default Login;
