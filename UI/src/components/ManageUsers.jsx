import './ManageUsers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __userapiurl } from '../API_URL';

function ManageUsers() {
  const [users, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get(__userapiurl + "fetch", {
      params: { "role": "user" }
    }).then((response) => {
      //console.log(response.data.info);
      setUserDetails(response.data.info);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const manageUserStatus = (_id, s) => {
    if (s == "active") {
      const data = { "condition_obj": { "_id": _id }, "content_obj": { "status": 1 } };
      axios.patch(__userapiurl + "update", data).then((response) => {
        alert("User profile activated successfully....");
        // navigate("/manageUsers");
        setUserDetails(response.data.info);

      });
    }
    else if (s == "inactive") {
      const data = { "condition_obj": { "_id": _id }, "content_obj": { "status": 0 } };
      axios.patch(__userapiurl + "update", data).then((response) => {
        alert("User profile deactivated successfully....");
        // navigate("/manageUsers");
        setUserDetails(response.data.info);

      });
    }
    else {
      const data = { "data": { "_id": _id } };
      axios.delete(__userapiurl + "delete", data).then((response) => {
        alert("User profile deleted successfully....");
        // navigate("/manageUsers");
        setUserDetails(response.data.info);

      });
    }
  };

  return (
    <div className='manage-user'>
      <h2 className='heading'>View & Manage User Details</h2>

      <div className="user-card-container">
        {users.map((row) => (
          <div className="user-card" key={row._id}>

            <div className="user-card-header">
              <h3>{row.name.toUpperCase()}</h3>
              <span className={row.status ? "status-active" : "status-inactive"}>
                {row.status ? "Active" : "In-Active"}
              </span>
            </div>

            <div className="user-card-body">
              <p><strong>ID:</strong> {row._id}</p>
              <p><strong>Email:</strong> {row.email}</p>
              <p><strong>Mobile:</strong> {row.mobile}</p>
              <p><strong>Address:</strong> {row.address}</p>
              <p><strong>City:</strong> {row.city}</p>
              <p><strong>Gender:</strong> {row.gender}</p>
              <p><strong>Added on:</strong> {row.info}</p>
            </div>

            <div className="user-card-actions">
              {row.status ? (
                <button
                  className="btn-warning"
                  onClick={() => manageUserStatus(row._id, "inactive")}
                >
                  Change Status
                </button>
              ) : (
                <button
                  className="btn-success"
                  onClick={() => manageUserStatus(row._id, "active")}
                >
                  Change Status
                </button>
              )}

              <button
                className="btn-danger"
                onClick={() => manageUserStatus(row._id, "delete")}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;