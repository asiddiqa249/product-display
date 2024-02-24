import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const id = useParams();
  console.log(id);
  const [data, setData] = useState({});
  console.log(id.id);
  useEffect(() => {
    handleClick();
  }, []);
  const handleClick = () => {
    axios.get(`https://dummyjson.com/products/${id.id}`).then((res) => {
      setData(res.data);
    });
  };
  console.log(data);
  console.log();
  return (
    <>
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
          <h6>⭐ {data.rating}</h6>
          <h5>{ data.brand}</h5>
        </div>
      </div>
    </>
  );
}
