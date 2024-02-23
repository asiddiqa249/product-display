import React, { useContext, useEffect, useState } from "react";
import { Details } from "./NavigationStack/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  const signout = useContext(Details);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  };

  const handleFilter = (category) => {
    if (category === "All") {
      handleClick();
    } else {
      axios
        .get(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => {
          setData(res.data);

          setFilteredData(res.data);
        });
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = data.filter((val) =>
      val.category.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };
  const handle = () => {
    signout.Signout();
  };

  const handleCart = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const updatedStorage = cart != null ? cart : [];
    updatedStorage.push(index);
    localStorage.setItem("cart", JSON.stringify(updatedStorage));
  };

  const handleViewCart = () => {
    navigate("/AddToCart");
  };

  return (
    <>
      <navbar className="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
          <button onClick={handleClick} className="button2">
            Show All
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <button
                  className="button1"
                  onClick={() => handleFilter("men's clothing")}
                >
                  Mens
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="button3"
                  onClick={() => handleFilter("women's clothing")}
                >
                  Women's
                </button>
                <button
                  className="button4"
                  onClick={() => handleFilter("electronics")}
                >
                  Electronics
                </button>
              </li>

              <li class="nav-item">
                <button
                  className="button5"
                  onClick={() => handleFilter("jewelery")}
                >
                  Jewelry
                </button>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input
                type="search"
                className="input"
                value={search}
                onChange={handleSearch}
              />
            </form>
            <li style={{ listStyleType: "none" }}>
              <button className="buttonLogout" onClick={handle}>
                logout
              </button>
            </li>
          </div>
        </nav>
      </navbar>

      <div className="grid">
        {filteredData.map((val, index) => (
          <React.Fragment key={val.id}>
            <div className="Fl">
              <div className="main2">
                <img
                  src={val.image}
                  width={200}
                  height={200}
                  className="PI"
                  alt=".."
                />
              </div>
              <div className="main">
                <h5 style={{ marginTop: "20%" }}>{val.title}</h5>
                <h6>🏷️RS ₹{val.price}</h6>
                <h6>⭐ {val.rating.rate}</h6>
                <h6>Products available {val.rating.count}</h6>
                <div className="button">
                  <button className="BT">
                    <Link to={`/Product/${val.id}`} className="b">
                      view details
                    </Link>
                  </button>
                  <button
                    className="BT"
                    onClick={() => {
                      handleCart(val);
                    }}
                  >
                    addtocarrt
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
