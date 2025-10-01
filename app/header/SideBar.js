// // components/Sidebar.jsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Home, MessageSquare, Users, User } from "lucide-react";
// import { CgMenuRound } from "react-icons/cg";
// import { AiOutlineHome } from "react-icons/ai";
// import { IoCompassOutline } from "react-icons/io5";
// import { AiFillMessage } from "react-icons/ai";
// import { CiCirclePlus } from "react-icons/ci";

// const menuItems = [
//   { name: "Home", icon: <AiOutlineHome className="w-6 h-6" />, link: "/" },
//   { name: "Community", icon: <IoCompassOutline className="w-6 h-6" />, link: "/community" },
//   { name: "Messages", icon: <AiFillMessage className="w-6 h-6" />, link: "/messages" },

//   { name: "Profile", icon: <CiCirclePlus className="w-6 h-6" />, link: "/profile" },
// ];

// export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
//   return (
//     <aside
//       className={`transition-all duration-300 border-r border-gray-700 bg-[#10151B] text-white flex flex-col justify-between
//         ${isSidebarOpen ? "w-56" : "w-16"}`}
//       aria-expanded={isSidebarOpen}
//     >
//       {/* top menu */}
//       <div className="mt-1.5 ">
//         {menuItems.splice(0, 3).map((item, idx) => (
//           <Link
//             key={idx}
//             href={item.link}
//             className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:text-blue-400 transition ${
//               !isSidebarOpen && "justify-center"
//             }`}
//           >
//             {item.icon}
//             {isSidebarOpen && <span className="truncate">{item.name}</span>}
//           </Link>
//         ))}

// <button onClick={hadlemore} className="">
//           <CiCirclePlus />
//       </button>
//        {menuItems.splice(3, 5).map((item, idx) => (
//           <Link
//             key={idx}
//             href={item.link}
//             className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:text-blue-400 transition ${
//               !isSidebarOpen && "justify-center"
//             }`}
//           >
//             {item.icon}
//             {isSidebarOpen && <span className="truncate">{item.name}</span>}
//           </Link>
//         ))}

//       </div>
      
//       {/* bottom: profile + toggle */}
//       <div className={`p-3 flex items-center gap-2 mb-20 ${isSidebarOpen ? "justify-start" : "justify-center"}`}>
//         <Image src="/profile.jpg" alt="User" width={36} height={36} className="w-[36px] h-[36px]  rounded-full object-cover" />
//         {isSidebarOpen && <span className="text-sm">Your Name</span>}
       
//       </div>
//     </aside>
//   );
// }

// components/Sidebar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHome, AiFillMessage } from "react-icons/ai";
import { IoCompassOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";

const menuItems = [
  { name: "Home", icon: <AiOutlineHome className="w-7 h-8" />, link: "/" },
  { name: "Community", icon: <IoCompassOutline className="w-7 h-8" />, link: "/community" },
  { name: "Messages", icon: <LuMessageCircleMore className="w-7 h-8" />, link: "/messages" },
  { name: "Profile", icon: <CiCirclePlus className="w-7 h-8" />, link: "/profile" },
  { name: "Settings", icon: <CiCirclePlus className="w-7 h-8" />, link: "/settings" },
  { name: "Help", icon: <CiCirclePlus className="w-7 h-8" />, link: "/help" },
];

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <aside
      className={`transition-all sticky top-10  duration-300 border-r h-screen border-gray-400 bg-[#10151B] text-white flex flex-col justify-between
        ${isSidebarOpen ? "w-56" : "w-16"}`}
      aria-expanded={isSidebarOpen}
    >
      {/* top menu */}
      <div className="mt-4">
        {/* first 3 items always visible */}
        {menuItems.slice(0, 3).map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`flex items-center gap-3  px-4 py-2 my-2 text-sm text-gray-300 transition hover:cursor-pointer ${
              !isSidebarOpen && "justify-center "
            }`}
          >
            {item.icon}
            {isSidebarOpen && <span className="truncate hidden sm:block">{item.name}</span>}
          </Link>
        ))}

        <button
          onClick={() => setShowMore((prev) => !prev)}
          className={`flex items-center gap-3 px-4 py-2.5 text-sm  text-gray-300  hover:cursor-pointer transition w-full ${
            !isSidebarOpen && "justify-center"
          }`}
        >
          <CiCirclePlus className="w-7 h-8" />
          {isSidebarOpen && <span className="hidden sm:block text-[16px]">Create spread</span>}
        </button>
        {/* toggle more items */}
        {/* <button
          onClick={() => setShowMore((prev) => !prev)}
          className={`flex items-center gap-3 px-4 py-2.5 text-sm  text-gray-300  hover:cursor-pointer transition w-full ${
            !isSidebarOpen && "justify-center"
          }`}
        >
          <CiCirclePlus className="w-6 h-6" />
          {isSidebarOpen && <span>{showMore ? "Less" : "More"}</span>}
        </button> */}

        {/* more items (only when showMore true) */}
        {/* {showMore &&
          menuItems.slice(3).map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm  transition ${
                !isSidebarOpen && "justify-center"
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="truncate">{item.name}</span>}
            </Link>
          ))} */}
      </div>

      {/* bottom: profile */}
      <div
        className={`p-3 flex items-center  gap-2 mb-16 ${
          isSidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        <Image
          src="/profile.jpg"
          alt="User"
          width={36}
          height={36}
          className="w-[36px] h-[36px] rounded-full object-cover"
        />
        {isSidebarOpen && <span className="hidden sm:block text-sm">Your Name</span>}
      </div>
    </aside>
  );
}
