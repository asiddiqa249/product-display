import React, { useState } from "react";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const passwordRegex =
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);

  const handleSignup = (event) => {
    event.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    let isUsernameExists = false;
    for (const user of existingUsers) {
      if (user.username === username) {
        isUsernameExists = true;
        break;
      }
    }

    if (isUsernameExists) {
      setValidationMessage(
        "Username already exists. Choose a different username."
      );
      return;
    }

    if (!passwordRegex) {
      setValidationMessage(
        "Invalid password. Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setValidationMessage(
        "Passwords do not match. Please enter the same password in both fields."
      );
      return;
    }

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((response) => {
        console.log(response);

        if (response.success) {
          const user = {
            username: username,
            password: password,
          };
          const updatedUsers = [...existingUsers, user];
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setValidationMessage("User registered successfully!");
          navigate("/login");
        } else {
          setValidationMessage("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setValidationMessage("Registration failed. Please try again.");
      });
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSignup} className="form">
        <center>
          <h2>REGISTRATION</h2>
          <h3>FOR D3V</h3>
        </center>
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
        <label>Confirm Password :</label>
        <br />
        <input
          className="inp"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <button
          type="submit"
          style={{
            width: "49%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "white",
            fontSize: "16px",
            marginRight: "4px",
          }}
        >
          Sign Up
        </button>
        <button
          id="login"
          style={{
            width: "49%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "white",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          <Link to={"/Login"} className="loginLink">
            Log In
          </Link>
        </button>
        <br />
        {validationMessage && (
          <p style={{ color: "red" }}>{validationMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
