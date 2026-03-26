import {  useNavigate } from "react-router-dom";
import { __categoryapiurl } from "../API_URL";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();
  

  // const editCategory = (id,event) => {
  //   event.stopPropagation();
  //   //navigate to add categ
  //   navigate(`/editCategory/${id}`);
  // };

  const addCategory = () => {
    //navigate to add categ
    navigate("/addCategory");
  };

  const goToSubCategory = (id) => {
    //navigate to add categ
    navigate(`/subCategories/${id}`);
  };

  const goToAddSubCategory = (event, name) => {
    //navigate to add categ
    event.stopPropagation();
    navigate(`/addSubCategory/${name}`);
  };

  const removeCategory = (id, event) => {
    event.stopPropagation();
    axios
      .delete(__categoryapiurl + "delete", {
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(
        __categoryapiurl + "fetch" /* {
          params: { "role": "user" }
        } */,
      )
      .then((response) => {
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
          <h2>Categories</h2>

          <Button
            id="category-button"
            title="Add Category"
            onClick={addCategory}
            containerClass="add-category-btn"
          />
        </div>
        { categories.length ?  
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              className="category-card"
              key={cat._id}
              onClick={() => goToSubCategory(cat._id)}
            >
             {/*  <i className="bi bi-pencil-fill"
              onClick={(event)=> editCategory(cat._id,event)}></i> */}
              <i
                className="bi bi-x-octagon-fill"
                onClick={($event) => removeCategory(cat._id, $event)}
              ></i>
              <div className="image">
                <img src={cat.caticonnm} alt={cat.catnm} />
              </div>
              <h3>{cat.catnm}</h3>
              <Button
                title="Add Sub-Category"
                onClick={(event) => goToAddSubCategory(event, cat.catnm)}
              ></Button>
            </div>
          ))}
        </div>
        :
        <h2>No Categories Found</h2>
}
      </div>
    </>
  );
}

export default Categories;
