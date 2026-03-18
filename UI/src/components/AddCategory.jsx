import './AddCategory.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { __categoryapiurl } from '../API_URL';
import { ToastContainer, toast } from 'react-toastify';


function AddCategory() {

  const navigate = useNavigate();
  const [ output , setOutput ] = useState("");  
  const [ catnm , setcatnm ] = useState("");  
  const [ File , setFile ] = useState(null);
  
 const handleChange=(event)=>{
  setFile(event.target.files[0]);
 }

 const handleSubmit =(event)=>{
  event.preventDefault();
  if(!catnm || !File)
  {
    setOutput("All fields are required");
    return;
  }
  const formdata = new FormData();
  formdata.append('catnm',catnm);
  formdata.append('caticon',File);
  axios.post(__categoryapiurl + "save",formdata,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }).then((response)=>{
    //console.log(response.data);
    toast("Category added successfully");
    setcatnm("");
    setFile(null);   
    navigate('/categories');
  }).catch((error)=>{
    //console.log(error);
    setOutput("Category not added successfully");
  })
}

  return (
<>    
<div id="tooplate_content">
    
<div className="content_box content_box_last">

<h2>Add Category</h2>
<div className="output-msg">{output}</div>
  <form>
  <label>Category Name:</label>
  <input type="text" onChange={e=>setcatnm(e.target.value)} value={catnm} required/>
  <br/><br/>
  <label>Category Icon:</label>
  <input type="file" onChange={handleChange}  required/>
  <br/><br/>
  <button type="button" onClick={handleSubmit} >Add Category</button>
</form>
 <ToastContainer />
</div>
	
    <div className="cleaner"></div>
   
</div>
</>
  );
}

export default AddCategory;
