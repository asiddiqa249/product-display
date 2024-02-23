import { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Prelogin from "../PreLogin/PreLogin";
import PostLogin from "../PostLogin/PostLogin";

export const Details = createContext();

export const Dark = createContext();

export default function NavigationStak() {
  const [login, setLogin] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const Signin = () => {
    setLogin(true);
  };
  const Signout = () => {
    setLogin(false);
  };
  const darkMode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <Details.Provider value={{ login, Signin, Signout }}>
      <BrowserRouter>{login ? <PostLogin /> : <Prelogin />}</BrowserRouter>
    </Details.Provider>
  );
}
