import "./EditProfile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { __userapiurl } from "../API_URL";

function EditProfile() {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  const [address, setAdd] = useState();
  const [gender, setgender] = useState();
  const [output, setOutput] = useState();

  useEffect(() => {
    const fetchDetail = async () => {
      let res = await axios.get(
        __userapiurl + "fetch?email=" + localStorage.getItem("email"),
      );
      setName(res.data.info[0].name);
      setEmail(res.data.info[0].email);
      setAdd(res.data.info[0].address);
      setCity(res.data.info[0].city);
      setMobile(res.data.info[0].mobile);
      setgender(res.data.info[0].gender);
    };
    fetchDetail();
  }, []);

  const HandleSubmit = () => {
    axios
      .patch(__userapiurl + "update?email=" + email, {
        condition_obj: { email: email }, // 🔥 match user
        content_obj: {
          name: name,
          mobile: mobile,
          address: address,
          city: city,
          gender: gender,
        },
      })
      .then((res) => {
        setOutput("User updated successfully");
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/*Content Area  */}
      <section className="container py-5">
        <div className="col-lg-12 m-auto">
          <div className="profile-wrapper">
            <div className="profile-card">
              {/* Header */}
              <div className="profile-header">
                <h2>Edit Profile</h2>
                {/*       <i
                  className="fa fa-pencil"
                  onClick={() => setEditMode(true)}
                ></i> */}
                {!editMode && (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                )}
              </div>

              <p className="success-msg">{output}</p>

              <div className="profile-form">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  disabled={!editMode}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input type="email" value={email} disabled />

                <label>Address</label>
                <textarea
                  value={address}
                  disabled={!editMode}
                  onChange={(e) => setAdd(e.target.value)}
                />

                <label>Mobile</label>
                <input
                  type="text"
                  value={mobile}
                  disabled={!editMode}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <label>City</label>
                <select
                  value={city}
                  disabled={!editMode}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>Select City</option>
                  <option>Indore</option>
                  <option>Bhopal</option>
                  <option>Ujjain</option>
                </select>

                <label>Gender</label>
                <div className="gender-box">
                  <label>
                    <input
                      type="radio"
                      value="male"
                      disabled={!editMode}
                      checked={gender === "male"}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="female"
                      disabled={!editMode}
                      checked={gender === "female"}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    Female
                  </label>
                </div>

                {editMode && (
                  <button className="profile-btn" onClick={HandleSubmit}>
                    Update Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*content Area*/}
    </>
  );
}

export default EditProfile;
