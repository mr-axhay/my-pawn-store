import { useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../src/API_URL";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TurnstileCaptcha from "./TurnstileCaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }
    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    const userDetails = { email, password, captchaToken };

    axios
      .post(__userapiurl + "login", userDetails)
      .then((response) => {
        const users = response.data.info;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", users.name);
        localStorage.setItem("email", users.email);
        localStorage.setItem("mobile", users.mobile);
        localStorage.setItem("address", users.address);
        localStorage.setItem("city", users.city);
        localStorage.setItem("gender", users.gender);
        localStorage.setItem("info", users.info);
        localStorage.setItem("role", users.role);

        toast.success("Login successful!");

        if (users.role === "admin") navigate("/admin");
        else if (users.role === "subadmin") navigate("/subadmin");
        else navigate("/userHome");
      })
      .catch(() => {
        toast.error("Invalid user or verify your account");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* LEFT SIDE - IMAGE */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src="/img/login.webp"
            alt="login visual"
            className="h-full w-full object-cover"
          />
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0"></div>
        </div>

        {/* RIGHT SIDE - GLASS LOGIN FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white/5 backdrop-blur-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full max-w-sm space-y-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-semibold text-center text-white">
              Welcome Back
            </h2>

            {/* EMAIL */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <TurnstileCaptcha onVerify={setCaptchaToken} />
            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-400 hover:underline cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-600/80 hover:bg-blue-600 transition backdrop-blur-md shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
