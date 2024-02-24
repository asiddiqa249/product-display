import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

const HomePage = () => {
  const [data, setdata] = useState([]);
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setdata(res.data.products);
      console.log(res.data.products);
    });
  }, []);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (
      storedUserDetails &&
      JSON.stringify(userDetails) !== storedUserDetails
    ) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, [userDetails]);
  return (
    <>
      {userDetails && (
        <div>
          <p>Welcome, {userDetails.username}!</p>
        </div>
      )}
      {data.map((val) => (
        <div className="main" key={val.id}>
          <div className="product">
            <h1>Title: {val.title}</h1>
            <img src={`${val.images[1]}`} alt=".." width={200} />
            <h4>Price : ${val.price}</h4>
            <button></button>
          </div>
        </div>
      ))}
    </>
  );
};
export default HomePage;
