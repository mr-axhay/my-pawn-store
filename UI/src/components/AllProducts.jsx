import { useNavigate } from "react-router-dom";
import { __productapiurl } from "../API_URL";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

function AllProducts() {
  const navigate = useNavigate();

  const viewProduct = (id) => {
    //navigate to add categ
    navigate(`/viewProduct/${id}`);
  };
  const [Product, setProduct] = useState([]);
  
  useEffect(() => {
    axios
      .get(__productapiurl + "fetch")
      .then((response) => {
        //console.log(response.data.info);
        setProduct(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="Product-wrapper">
        <div className="Product-header">
          <h1>All Products</h1>

        </div>

        <div className="Product-grid">
          {Product.length ? (
            Product.map((cat) => (
              <div
                className="Product-card"
                key={cat._id}
                onClick={() => viewProduct(cat._id)}
              >
               
                <div className="image">
                  <img
                    src={`../../public/assets/uploads/caticons/${cat.caticonnm}`}
                    alt={cat.catnm}
                    className="Product-avatar"
                  />
                </div>
                <h3>{cat.catnm}</h3>
              </div>
            ))
          ) : (
            <h1>No Product Data found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
