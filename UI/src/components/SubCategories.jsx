import { useNavigate, useParams } from "react-router-dom";
import { __subcategoryapiurl } from "../API_URL";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SubCategories.css";

function SubCategories() {
  const navigate = useNavigate();
  const { name } = useParams();
  const addSubCategory = () => {
    //navigate to add sub category
    navigate(`/addSubCategory/${name}`);
  };
  const [categories, setCategories] = useState([]);
  const removeSubCategory = (id, event) => {
    event.stopPropagation();
    axios
      .delete(__subcategoryapiurl + "delete", {
        data: {
          condition_obj: JSON.stringify({ _id: id }),
        },
      })
      .then((response) => {
        setCategories(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(__subcategoryapiurl + "fetch", {
        params: { catnm: name },
      })
      .then((response) => {
        //console.log(response.data.info);
        setCategories(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="categories-wrapper">
        <div className="categories-header">
          <h2>{name}</h2>

          <Button
            id="category-button"
            title="Add Sub-category"
            onClick={addSubCategory}
            containerClass="add-category-btn"
          />
        </div>

        <div className="category-grid">
          {categories.length ? (
            categories.map((cat) => (
              <div className="category-card" key={cat._id}>
                {/* <Button title='edit'></Button> */}
                {/* <i className="bi bi-pencil-fill"></i> */}
                <i
                  className="bi bi-x-octagon-fill"
                  onClick={($event) => removeSubCategory(cat._id, $event)}
                ></i>
                <div className="image">
                  <img src={cat.subcaticonnm} alt={cat.subcatnm} />
                </div>
                <h3>{cat.subcatnm}</h3>
                <h4>{cat.catnm}</h4>
              </div>
            ))
          ) : (
            <h1>No Sub-Category Data found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default SubCategories;
