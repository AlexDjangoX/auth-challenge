import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
const apiUrl = "http://localhost:4000";

const Login = ({ setMovieList, movieList }) => {
  const navigate = useNavigate();

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
