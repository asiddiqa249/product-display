import { Route, Routes } from "react-router-dom";
import Signup from "../SignUp";
import Login from "../Login";

export default function Prelogin() {
  return (
    <Routes>
      <Route path="/" Component={Signup} />
      <Route path="*" Component={Error} />
      <Route path="Login" Component={Login} />
    </Routes>
  );
}
