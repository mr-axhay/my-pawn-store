import './AddProduct.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { __productapiurl } from '../API_URL';
import { ToastContainer, toast } from 'react-toastify';


function AddProduct() {

  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [catnm, setcatnm] = useState("");
  const [File, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!catnm || !File) {
      setOutput("All fields are required");
      return;
    }
    const formdata = new FormData();
    formdata.append('catnm', catnm);
    formdata.append('caticon', File);
    axios.post( __productapiurl + "save", formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      //console.log(response.data);
      toast("Product added successfully");
      setcatnm("");
      setFile(null);
      navigate('/Product');
    }).catch((error) => {
      //console.log(error);
      setOutput("Failed to add product");
    })
  }

  return (
    <>
      <div id="tooplate_content">

        <div className="content_box content_box_last">

          <h1>Add Product</h1>
          <font color="blue" >{output}</font>
          <form>
            <label>Product Name:</label>
            <input type="text"
              placeholder="📦 Enter product name"
              onChange={e => setcatnm(e.target.value)} value={catnm} required />
            <br /><br />
            <label>Product Icon:</label>
            <input type="file" onChange={handleChange} required />
            <br /><br />
            <button className="add" type="button" onClick={handleSubmit} >Add Product</button>
          </form>
          <ToastContainer />
        </div>

        <div className="cleaner"></div>

      </div>
    </>
  );
}

export default AddProduct;
