import "./AddProduct.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { __categoryapiurl, __productapiurl } from "../API_URL";
import { ToastContainer, toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [catnm, setcatnm] = useState("");
  const [File, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");


  const { id } = useParams();
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const email = localStorage.getItem("email");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!catnm || !File) {
      setOutput("All fields are required");
      return;
    }
    const formdata = new FormData();
    formdata.append("catnm", catnm);
    formdata.append("caticon", File);
    formdata.append("catId", selectedCategory);
    formdata.append("userId", email);
    formdata.append("price", price);
    formdata.append("description", description);
    id && formdata.append("_id", id);
    const url = id ? __productapiurl + "update" : __productapiurl + "save";
    const type = id ? "patch" : "post";
    axios[type](url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        if (id) {
          toast("Product updated successfully");
        } else {
          toast("Product added successfully");
        }
        setcatnm("");
        setFile(null);
        navigate("/myProducts");
      })
      .catch(() => {
        //console.log(error);
        setOutput(id ? "Failed to update product" : "Failed to add product");
      });
  };
  useEffect(() => {
    if (id) {
      //Edit product
      axios
        .get(__productapiurl + "fetch", { params: { _id: id } })
        .then((response) => {
          const pDetail = response.data.info[0];
          setcatnm(pDetail.catnm);
        });
    }

    //Category list get
    axios
      .get(__categoryapiurl + "fetch")
      .then((response) => {
        setCategoryList(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div id="tooplate_content">
        <div className="content_box content_box_last">
          <h1>{id ? "Update" : "Add"} Product</h1>
          <font color="blue">{output}</font>
          <form>
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="📦 Enter product name"
              onChange={(e) => setcatnm(e.target.value)}
              value={catnm}
              required
            />
            <br />
            <div>
            <label>Product Category:</label>
              <select
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="input-style"
              >
                <option value="">Select Category</option>

                {categoryList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.catnm}
                  </option>
                ))}
              </select>
              {/* <p className="error">{errors.city}</p> */}
            </div>
            <br />
            <label>Product Icon:</label>
            <input type="file" onChange={handleChange} required />
            <br />
            <label>Price:</label>
            <input
              type="text"
              placeholder=" Enter product price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
            <br />
            <label>Description:</label>
            <input
              type="text"
              placeholder=" Enter product description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
            <br />
            <button className="add" type="button" onClick={handleSubmit}>
              {id ? "Update" : "Add"} Product
            </button>
          </form>
          <ToastContainer />
        </div>

        <div className="cleaner"></div>
      </div>
    </>
  );
}

export default AddProduct;
