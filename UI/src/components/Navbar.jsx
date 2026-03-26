import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // or "react-icons/hi2" if you're on v2
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const navItems = ["About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- ADD

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null); // <-- keep as-is
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handlePayment = () => {
    navigate("/pay");
    setIsMenuOpen(false); // close drawer after nav
  };

  const isAuthed = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";
  

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play?.();
    } else {
      audioElementRef.current?.pause?.();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    // GSAP still animates navContainerRef, unchanged
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Optional: lock body scroll while drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* KEEP YOUR EXISTING CONTAINER + REF */}
      <div
        ref={navContainerRef}
        className="main-container inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Left: logo + quick buttons */}
            <div className="flex items-center gap-3 md:gap-7">
              <img
                src="/img/psLogo.jpg"
                alt="logo"
                className="w-10 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  closeMenu();
                }}
              />

              <Button
                id="charity-button"
                title="Charity"
                onClick={handlePayment}
                containerClass="bg-blue-50 flex items-center justify-center gap-1"
              />
            </div>

            {/* Right: desktop nav + audio + burger */}
            <div className="flex h-full items-center nav-menu">
              {/* Desktop menu */}
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

                {!isAuthed ? (
                  <>
                    <NavLink to="/products" className="nav-hover-btn">
                      Products
                    </NavLink>
                    <NavLink to="/login" className="nav-hover-btn">
                      Login
                    </NavLink>
                    <NavLink to="/register" className="nav-hover-btn">
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    {isAdmin ? (
                      <>
                        <NavLink to="/manageUsers" className="nav-hover-btn">
                          Manage users
                        </NavLink>
                        <NavLink to="/categories" className="nav-hover-btn">
                          Manage Categories
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to="/products" className="nav-hover-btn">
                          Products
                        </NavLink>
                        <NavLink to="/orders" className="nav-hover-btn">
                          Orders
                        </NavLink>
                        <NavLink to="/myProducts" className="nav-hover-btn">
                          My Products
                        </NavLink>

                      </>
                    )}
                    <NavLink to="/logout" className="nav-hover-btn">
                      Logout
                    </NavLink>
                  </>
                )}
              </div>

              {/* Audio indicator */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5 audio-btn"
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
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>

              {/* Burger (mobile only) */}
              <button
                className="ml-3 inline-flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* ===================== */}
      {/* SIBLINGS OF navContainerRef */}
      {/* ===================== */}

      {/* Overlay (fixed, very high z-index) */}
      <div
        className={clsx(
          "fixed inset-0 z-[9998] bg-black/40 transition-opacity md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Right-side Drawer (fixed) */}
      <aside
        className={clsx(
          "fixed top-0 right-0 z-[9999] h-screen w-4/5 max-w-sm bg-black shadow-2xl md:hidden",
          "transform transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="logo"
              className="w-8 cursor-pointer"
              onClick={() => {
                navigate("/");
                closeMenu();
              }}
            />
            <span className="font-semibold text-white">Menu</span>
          </div>
          <button
            className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <HiX size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex h-[calc(100vh-56px)] flex-col overflow-y-auto px-4 py-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn w-full text-left py-2"
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="my-3 h-px bg-gray-200" />

          {!isAuthed ? (
            <>
              <NavLink
                to="/login"
                className="nav-hover-btn py-2"
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="nav-hover-btn py-2"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <NavLink to="/products" className="nav-hover-btn">
                    Products
                  </NavLink>
                  <NavLink
                    to="/manageUsers"
                    className="nav-hover-btn py-2"
                    onClick={closeMenu}
                  >
                    Manage users
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className="nav-hover-btn py-2"
                    onClick={closeMenu}
                  >
                    Manage Categories
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/products" className="nav-hover-btn">
                    Products
                  </NavLink>
                  <NavLink
                    to="/myProducts"
                    className="nav-hover-btn py-2"
                    onClick={closeMenu}
                  >
                    My Products
                  </NavLink>
                </>
              )}
              <NavLink
                to="/logout"
                className="nav-hover-btn py-2"
                onClick={closeMenu}
              >
                Logout
              </NavLink>
            </>
          )}

          <div className="mt-auto flex gap-2">
            <Button
              id="drawer-charity"
              title="Charity"
              onClick={() => {
                navigate("/pay");
                closeMenu();
              }}
              containerClass="bg-blue-50 flex items-center justify-center gap-1 w-full"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
