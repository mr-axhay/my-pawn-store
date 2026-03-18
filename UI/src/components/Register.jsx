import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../src/API_URL';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Register = () => {

  const [output, setOutput] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();

  const handleSubmit = () => {
    const userDetails = { name, "email": email, "password": password, "mobile": mobile, "address": address, "city": city, "gender": gender, role };
    axios.post(__userapiurl + "save", userDetails).then(() => {
      setOutput("User register successfully....");
      setName("");
      setPassword("");
      setEmail("");
      setMobile("");
      setAddress("");
      setCity("");
      setGender("");
      setRole("");
      toast("User register successfully...");
    }).catch(() => {
      setOutput("User registration failed....");
    });

  };


  return (
    <div id="register" className="min-h-96 w-screen">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">

          <div className="form-container w-full max-w-lg">
            <form className="form-box bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl space-y-5">

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">Name</label>
                <input
                  type="text"
                  value={name || ""}
                  onChange={e => setName(e.target.value)}
                  className="input-style mb-0"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">Email</label>
                <input
                  type="email"
                  value={email || ""}
                  onChange={e => setEmail(e.target.value)}
                  className="input-style"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">Password</label>
                <input
                  type="password"
                  value={password || ""}
                  onChange={e => setPassword(e.target.value)}
                  className="input-style"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">Mobile</label>
                <input
                  type="text"
                  value={mobile || ""}
                  onChange={e => setMobile(e.target.value)}
                  className="input-style mb-0"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">Address</label>
                <textarea
                  value={address || ""}
                  onChange={e => setAddress(e.target.value)}
                  className="input-style resize-none h-20"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm">City</label>
                <select
                  value={city || ""}
                  onChange={e => setCity(e.target.value)}
                  className="input-style"
                >
                  <option value="">Select City</option>
                  <option>Indore</option>
                  <option>Bhopal</option>
                  <option>Ujjain</option>
                </select>
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-2 text-sm">Gender</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={e => setGender(e.target.value)}
                    />
                    Male
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={e => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="flex flex-col text-left">
                <label className="mb-2 text-sm">Select Role</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={e => setRole(e.target.value)}
                    />
                    User
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="subadmin"
                      checked={role === "subadmin"}
                      onChange={e => setRole(e.target.value)}
                    />
                    Member
                  </label>
                </div>
              </div>

            </form>
          <Button onClick={handleSubmit} title="Submit" containerClass="mb-4 cursor-pointer" />

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
