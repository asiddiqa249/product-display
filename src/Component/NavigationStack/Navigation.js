import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Home/Home";
import Product from "../Product/Product";
import Signup from "../SignUp";
import Login from "../Login";

export const Details = createContext();

export default function NavigationStak() {
  const [login, setLogin] = useState(false);

  const AfterRoute = () => {
    setLogin(true);
  };
  const BeforeRoute = () => {
    setLogin(false);
  };
  console.log(login);

  const userDetails = (details) => {
    console.log(details);
  };
  return (
    <Details.Provider value={{ login, AfterRoute, BeforeRoute, userDetails }}>
      <BrowserRouter>
        <Routes>
          {login ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/Product/:id" element={<Product />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
            </>
          )}
          <Route path="*" element={<h1>Route not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Details.Provider>
  );
}
