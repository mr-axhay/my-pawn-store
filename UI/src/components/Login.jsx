import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../src/API_URL';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} />
    </div>
);

const Login = () => {


    const navigate = useNavigate();
    const [output, setOutput] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        const userDetails = { "email": email, "password": password };
        axios.post(__userapiurl + "login", userDetails).then((response) => {
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

            if (users.role === "admin")
                navigate("/admin");
            else if (users.role === "subadmin")
                navigate("/subadmin");
            else
                navigate("/user");

        }).catch(() => {
            setOutput("Invalid user or please verify your account....");
            setEmail("");
            setPassword("");
        });
    };


    return (/* my-20px-10 */
        <div id="login" className=" min-h-96 w-screen  ">
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

                <div className="w-full max-w-md mx-auto mt-20 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-xl text-white">
                    <form
                        className="form-box"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-style"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-style"
                            />
                        </div>
                        <Button onClick={handleSubmit} title="Login" containerClass="mt-10 cursor-pointer" />
                    </form>

                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
