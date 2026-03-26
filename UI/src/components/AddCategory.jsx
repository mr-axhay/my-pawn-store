import "./AddCategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { __categoryapiurl } from "../API_URL";
import { ToastContainer, toast } from "react-toastify";

function AddCategory() {
  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [catnm, setcatnm] = useState("");
  const [image, setImage] = useState("");
  const [File, setFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    id && axios
      .get(__categoryapiurl + "fetch", { params: { _id: id } })
      .then((res) => {
        setcatnm(res.data.info[0].catnm);
        setImage(res.data.info[0].caticonnm);
      });
  }, []);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

 const handleSubmit = (event) => {
  event.preventDefault();

  if (!catnm || !File) {
    setOutput("All fields are required");
    return;
  }

  const formdata = new FormData();
  formdata.append("catnm", catnm);
  formdata.append("caticon", File);

  if (id) {
    // UPDATE CASE
    formdata.append(
      "condition_obj",
      JSON.stringify({ _id: id })
    );

    formdata.append(
      "content_obj",
      JSON.stringify({ catnm: catnm }) // only fields to update
    );
  }

  const apiCall = id
    ? axios.patch(__categoryapiurl + "update", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    : axios.post(__categoryapiurl + "save", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

  apiCall
    .then(() => {
      toast(id ? "Category updated successfully" : "Category saved successfully");
      setcatnm("");
      setFile(null);
      navigate("/categories");
    })
    .catch(() => {
      setOutput("Operation failed");
    });
};

  return (
    <>
      <div id="tooplate_content">
        <div className="content_box content_box_last">
          <h2>{id ? "Edit" : "Add"} Category</h2>
          <div className="output-msg">{output}</div>
          <form>
            <label>Category Name:</label>
            <input
              type="text"
              onChange={(e) => setcatnm(e.target.value)}
              value={catnm}
              required
            />
            <br />
            <br />
            <label>Category Icon:</label>
            <input type="file" onChange={handleChange} required />
            {/* Show image only when you edit and no new file is choosen */}
            {id && !File && <img src={image} alt={catnm} />}
            <br />
            <br />
            <button type="button" onClick={handleSubmit}>
              {id ? "Update" : "Add"} Category
            </button>
          </form>
          <ToastContainer />
        </div>

        <div className="cleaner"></div>
      </div>
    </>
  );
}

export default AddCategory;
