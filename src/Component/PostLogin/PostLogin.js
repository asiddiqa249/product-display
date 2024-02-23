import { Route, Routes } from "react-router-dom";
import Product from "../Product/Product";
import Homepage from "../Home/Home";

export default function PostLogin() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/Product/:id" Component={Product} />
      </Routes>
    </>
  );
}
