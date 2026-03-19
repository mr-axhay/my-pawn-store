import { useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../src/API_URL";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    city: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Min 6 characters required";

    if (!form.mobile) err.mobile = "Mobile is required";
    else if (!/^[6-9]\d{9}$/.test(form.mobile))
      err.mobile = "Invalid mobile number";

    if (!form.address) err.address = "Address required";

    if (!form.city) err.city = "Select city";

    if (!form.gender) err.gender = "Select gender";

    if (!form.role) err.role = "Select role";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }

    axios
      .post(__userapiurl + "save", form)
      .then(() => {
        toast.success("Registration successful!");

        setForm({
          name: "",
          email: "",
          password: "",
          mobile: "",
          address: "",
          city: "",
          gender: "",
          role: "",
        });

        navigate("/login");
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src="/img/about.webp"
            alt="register"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white/5 backdrop-blur-xl">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 glass-box text-white"
          >
            <h2 className="text-2xl font-semibold text-center">
              Create Account
            </h2>

            {/* NAME */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="input-style text-field mb-0"
              />
              <p className="error">{errors.name}</p>
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="input-style"
              />
              <p className="error">{errors.email}</p>
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input-style"
              />
              <p className="error">{errors.password}</p>
            </div>

            {/* MOBILE */}
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={form.mobile}
                onChange={handleChange}
                className="input-style text-field mb-0"
              />
              <p className="error">{errors.mobile}</p>
            </div>

            {/* ADDRESS */}
            <div>
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="input-style resize-none h-20"
              />
              <p className="error">{errors.address}</p>
            </div>

            {/* CITY */}
            <div>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input-style"
              >
                <option value="">Select City</option>
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Ujjain</option>
              </select>
              <p className="error">{errors.city}</p>
            </div>

            {/* GENDER */}
            <div>
              <label className="label">Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                  />
                  &nbsp; Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                  />
                  &nbsp;  Female
                </label>
              </div>
              <p className="error">{errors.gender}</p>
            </div>

            {/* ROLE */}
            <div>
              <label className="label">Select Role</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === "user"}
                    onChange={handleChange}
                  />
                  &nbsp;   User
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="subadmin"
                    checked={form.role === "subadmin"}
                    onChange={handleChange}
                  />
                  &nbsp;    Member
                </label>
              </div>
              <p className="error">{errors.role}</p>
            </div>

            {/* BUTTON */}
            <button className="btn-primary">Register</button>

          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;