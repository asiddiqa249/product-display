import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

const HomePage = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setData(res.data.products);
      setFilteredData(res.data.products);
    });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="top">
        <button
          type="button"
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
          className="logOut"
        >
          Logout
        </button>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="mainDiv">
        {filteredData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((val) => (
            <div className="parentDiv" key={val.id}>
              <div className="display">
                <h2> {val.title}</h2>
                <img src={`${val.images[1]}`} alt=".." />
                <h4>Price : ${val.price}</h4>
                <button style={{ padding: "5px" }}>
                  <Link to={`/product/${val.id}`} className="link">
                    ShowMore
                  </Link>
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredData.length / itemsPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default HomePage;
