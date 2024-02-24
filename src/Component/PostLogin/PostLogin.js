import { Route, Routes } from "react-router-dom";
import Product from "../Product/Product";
import HomePage from "../Home/Home";

export default function PostLogin() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/Product/:id" Component={Product} />
      </Routes>
    </>
  );
}
