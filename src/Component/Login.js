import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

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

        if (response.success) {
          alert("Login successful!");
        } else {
          setValidationMessage("Invalid username or password.");
        }
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
        <br />
        {validationMessage && (
          <p style={{ color: "red" }}>{validationMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
