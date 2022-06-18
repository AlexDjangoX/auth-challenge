import React from "react";

import UserForm from "../src/client/components/UserForm";

const Login = ({ handleLogin }) => {
  return (
    <>
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
    </>
  );
};

export default Login;
