import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'

const navItems = [ "Services", "Products", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };
  const goToLogin = () => {
    navigate("/login");
  };

  const handlePayment = () => {
    navigate('/pay');
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}/* fixed */
      className="main-container inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" 
            onClick={()=>navigate('/')}/>

            <Button
              id="product-button"
              title="AI-Companion"
              rightIcon={<TiLocationArrow />}
              onClick={(()=>navigate('/chat'))}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
             <Button
              id="product-button"
              title="Charity"
              onClick={handlePayment}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
              {/* <Button
                id="product-button"
                title="Login"
                rightIcon={<TiLocationArrow />}
                onClick={goToLogin}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              /> */}
              {!(localStorage.getItem("token")) ? (
                <>
                  <NavLink to="/login" className="nav-hover-btn">Login</NavLink>
                  <NavLink to="/register" className="nav-hover-btn">Register</NavLink>
                </>
              ) :
              <>
               { (localStorage.getItem("role")=="admin")?
                (
                  <>
                  <NavLink to="/manageUsers" className="nav-hover-btn">Manage users</NavLink>
                  <NavLink to="/categories" className="nav-hover-btn">Manage Categories</NavLink>
                  </>
                ):
                (
                  <NavLink to="/product" className="nav-hover-btn">Product</NavLink>
                )
              }
                <NavLink to="/logout" className="nav-hover-btn">Logout</NavLink>
                </>
                }

            </div>
            {/* <Button
              id="product-button"
              title="Register"
              rightIcon={<TiLocationArrow />}
              onClick={goToRegister}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            /> */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
