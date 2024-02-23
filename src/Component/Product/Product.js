import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";

export default function Product() {
  const id = useParams();
  console.log(id);
  const [data, setData] = useState({});
  console.log(id.id);
  useEffect(() => {
    handleClick();
  }, []);
  const handleClick = () => {
    axios.get(`https://dummyjson.com/auth/products${id.id}`).then((res) => {
      setData(res.data);
    });
  };
  console.log(data);
  console.log();
  return (
    <>
      {/* <Navbar/> */}
      <div className="SM">
        <div className="child1">
          <img
            src={data.image}
            width={200}
            height={200}
            className="IMG"
            alt=".."
          />
        </div>
        <div className="child2">
          <h4>{data.title}</h4>

          <p>{data.description}</p>
          <h6>🏷️RS ₹{data.price}</h6>
          <h6>⭐ {data.rating?.rate}</h6>
          <h6>Products available {data.rating?.count}</h6>

          <button className="b1">add to cart</button>
          <button className="b2">buynow</button>
        </div>
      </div>
    </>
  );
}
