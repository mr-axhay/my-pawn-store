import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../API_URL';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const {email} = useParams();
    const decodedEmail = decodeURIComponent(email);
    console.log(decodedEmail)
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        // Password required
        if (!newPassword) {
            newErrors.newPassword = "Password is required";
        }
        // Min length
        else if (newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }
        // Confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        }
        // Match check
        else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            toast.error("Please fix the errors");
            return;
        }

        const userDetails = { decodedEmail, password :newPassword};

        axios.post(__userapiurl + "resetPassword", userDetails)
            .then((response) => {
                const users = response.data.info;

                toast.success("Password Reset Successfully !");

                navigate("/login");
            })
            .catch(() => {
                toast.error("Invalid user or verify your account");
                // setEmail("");
                // setPassword("");
            });
    };

    return (


        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">

                {/* LEFT SIDE - IMAGE */}
                <div className="w-1/2 hidden md:block relative">
                    <img
                        src="/img/about.webp"
                        alt="login visual"
                        className="h-full w-full object-cover"
                    />
                    {/* Optional overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/30"></div>
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
                            Reset Password
                        </h2>

                        {/* PASSWORD */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">New Password</label>
                            <input
                                type="password"
                                value={newPassword || ""}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>


                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-md bg-blue-600/80 hover:bg-blue-600 transition backdrop-blur-md shadow-md"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ResetPassword;
