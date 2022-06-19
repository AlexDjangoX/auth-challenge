import React from "react";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
const apiUrl = "http://localhost:4000";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/user/register`, opts);
    const data = await res.json();
    alert("You have registered successfully");
    navigate("/login");

    if (data.error) {
      alert(data.error);
    }
  };
  return (
    <>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
    </>
  );
};

export default Register;
