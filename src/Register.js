import React from "react";
import UserForm from "../src/client/components/UserForm";
const apiUrl = "http://localhost:4000";

const Register = () => {
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
  return (
    <>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
    </>
  );
};

export default Register;
