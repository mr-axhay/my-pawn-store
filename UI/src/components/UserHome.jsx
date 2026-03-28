// import { useState } from "react";
// import "./UserHome.css";
// export default function UserHome() {
//   const [activeTab , setActiveTab] = useState("details");

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Top Tabs */}
//       <div className="flex border-b border-gray-300 bg-gradientt rounded-t-xl px-4">
//         <TabButton
//           label="Details"
//           value="details"
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />

//         <TabButton
//           label="Change Password"
//           value="changePassword"
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />

//         <TabButton
//           label="Edit Profile"
//           value="editProfile"
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//         />
//       </div>

//       {/* Content Area */}
//       <div className="bg-gradientt p-6 rounded-b-xl shadow-md">
//         {activeTab === "details" && <UserDetails />}
//         {activeTab === "changePassword" && <ChangePass />}
//         {activeTab === "editProfile" && <EditProfile />}
//       </div>
//     </div>
//   );
// }

// /* 🔹 Tab Button */
// function TabButton({ label, value, activeTab, setActiveTab }) {
//   const isActive = activeTab === value;

//   return (
//     <button
//       onClick={() => setActiveTab(value)}
//       className={`tab-button relative px-6 py-4 text-sm font-semibold transition-all duration-300
//         ${isActive ? "text-purple-600" : "text-gray-500 hover:text-gray-700"}
//       `}
//     >
//       {label}

//       {/* Underline Indicator */}
//       {isActive && (
//         <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600"></span>
//       )}
//     </button>
//   );
// }

// /* 🔹 Details */
// function UserDetails() {
//   const email = localStorage.getItem("email");
//   const name = localStorage.getItem("name");
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">User Details</h2>
//       <p className="mb-2">Name: {name}</p>
//       <p>Email: {email}</p>
//     </div>
//   );
// }

// /* 🔹 Change Password */
// function ChangePassword() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Change Password</h2>

//       <input
//         type="password"
//         placeholder="Old Password"
//         className="border p-2 w-full mb-3 rounded"
//       />

//       <input
//         type="password"
//         placeholder="New Password"
//         className="border p-2 w-full mb-3 rounded"
//       />

//       <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
//         Update Password
//       </button>
//     </div>
//   );
// }

// /* 🔹 Edit Profile */
// function EditProfile() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         className="border p-2 w-full mb-3 rounded"
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="border p-2 w-full mb-3 rounded"
//       />

//       <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//         Save Changes
//       </button>
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <img
        src={src}
        alt="card visual"
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
          >
            <p className="relative z-20">Click Here</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserHome = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      {/* <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Welcome To Admin Panel
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Step into a dynamic marketplace where a diverse range of items—from timeless
          valuables to everyday essentials—come together in a seamless pawn shop experience,
          connecting your needs with opportunity in one place.
        </p>
      </div> */}

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_incoming&w=740&q=80"
            title={
              <>
                 Welcome <b> To Admin </b> Panel
              </>
            }
            // description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2fjXAnhJL0kvh3p-Qpcz4ZxaMTqukNEEAVA&s"
            title={
              <>
                Manage <b>Users </b>
              </>
            }
            // description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="img/logo.png"
            title={
              <>
                Add<b> Categories</b>
              </>
            }
            // description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/settings.mp"
            title={
              <>
                Add <b>Sub Categories</b>
              </>
            }
            // description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/settings.mp"
            title={
              <>
                <b>Settings</b>
              </>
            }
            // description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>
        {/* <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              S<b>o</b>on will <b>be </b>on Mo<b>bile</b>Apps.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt> */}

        {/* <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt> */}
        
      {/* <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/featur.mp4"
          title={
            <>
              Welcome <b>To </b>Admin Panel
            </>
          }
          // description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          // isComingSoon
        />
      </BentoTilt> */}

      </div>
    </div>
  </section>
);

export default UserHome;
