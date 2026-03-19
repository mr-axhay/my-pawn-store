import './AddProduct.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { __productapiurl } from '../API_URL';
import { ToastContainer, toast } from 'react-toastify';


function AddProduct() {

  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [catnm, setcatnm] = useState("");
  const [File, setFile] = useState(null);
  const { id } = useParams();
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
    id && formdata.append('_id', id);
     const url = id 
    ? __productapiurl + "update" 
    : __productapiurl + "save";
    const type = id 
    ? "patch"
    : "post";
    axios[type](url, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      if(id){
      toast("Product updated successfully");
      }
      else{
      toast("Product added successfully");
      }
      setcatnm("");
      setFile(null);
      navigate('/product');
    }).catch((error) => {
      //console.log(error);
      setOutput(id? "Failed to update product": "Failed to add product");
    })
  }
  useEffect(() => {
    if (id) {
      axios.get(__productapiurl + "fetch",
        { params: { _id: id } }
      )
        .then(
          (response) => {
            const pDetail = (response.data.info[0]);
            setcatnm(pDetail.catnm);
          }
        )
    }
  })



  return (
    <>
      <div id="tooplate_content">

        <div className="content_box content_box_last">

          <h1>{id?'Update':'Add'} Product</h1>
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
            <button className="add" type="button" onClick={handleSubmit} >{id ? 'Update' : 'Add'} Product</button>
          </form>
          <ToastContainer />
        </div>

        <div className="cleaner"></div>

      </div>
    </>
  );
}

export default AddProduct;
