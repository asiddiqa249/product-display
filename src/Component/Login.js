import React, { useContext, useState } from "react";
import { Details } from "./NavigationStack/Navigation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const routeHome = useNavigate();
  const logDetails = useContext(Details);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const home = () => {
    routeHome("/home");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setValidationMessage("Please enter both username and password.");
      return;
    }

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("Login successful!");
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ username, password })
        );
        logDetails.AfterRoute();
        home();
        logDetails.userDetails({ username, password });
      })
      .catch((error) => {
        console.error(error);
        setValidationMessage("Error during login. Please try again later.");
      });
  };

  return (
    <div className="form-page">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <br />
        <label>Username :</label>
        <br />
        <input
          className="inp"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <label>Password :</label>
        <br />
        <input
          className="inp"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <center>
          <button
            type="submit"
            style={{
              width: "200px",
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "white",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </center>
        <br />
        {validationMessage && (
          <p style={{ color: "red" }}>{validationMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
