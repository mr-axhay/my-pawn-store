import { useState } from "react";
import axios from "axios";
import { __forgetpasswordurl } from "../../src/API_URL";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validate = () => {
        if (!email) {
            setError("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = () => {
        if (!validate()) {
            toast.error("Please fix the error"); 
            return;
        }

        axios.post(__forgetpasswordurl, { email })
            .then(() => {
                toast.success("Reset link sent to your email!");
                setEmail(""); 
            })
            .catch(() => {
                toast.error("Email not found");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">

                {/* LEFT IMAGE */}
                <div className="w-1/2 hidden md:block relative">
                    <img
                        src="/img/think.avif"
                        alt="forgot visual"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0"></div>
                </div>

                {/* RIGHT FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white/5 backdrop-blur-xl">
                    <div className="w-full max-w-sm space-y-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg">

                        <h2 className="text-3xl font-semibold text-center text-white">
                            Forgot Password
                        </h2>

                        <p className="text-sm text-gray-300 text-center">
                            Enter your email to receive a reset link
                        </p>

                        {/* EMAIL */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-1">{error}</p>
                            )}
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleSubmit}
                            className="w-full py-2 rounded-md bg-blue-600/80 hover:bg-blue-600 transition backdrop-blur-md shadow-md"
                        >
                            Send Reset Link
                        </button>

                        {/* BACK */}
                        <div className="text-center">
                            <span
                                onClick={() => navigate("/login")}
                                className="text-sm text-blue-400 hover:underline cursor-pointer"
                            >
                                Back to Login
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;