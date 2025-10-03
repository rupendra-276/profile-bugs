// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { FiSettings, FiLogOut } from "react-icons/fi";
// import { FaKey, FaQuestionCircle } from "react-icons/fa";
// import Dropdown from "../components/Dropdown";
// import { TruncateText} from '../helper/truncateText'
// import { FIELD_LIMITS } from "../constents/constents";
// export default function ProfileMenu({ user, isSidebarOpen, onLogout }) {
//           const avatarSrc = user?.avatar || "/profile.jpg";
//   return (
//     <Dropdown
//       button={
//         <div
//           className={`sm:p-3 flex items-center gap-2 cursor-pointer transition ${
//             isSidebarOpen ? "justify-start" : "justify-center"
//           }`}
//         >
//           <img
          
//             src={avatarSrc}
//             alt={user?.name || "User"}
//             className="w-[20px] h-[20px] sm:w-[36px] sm:h-[36px] rounded-full object-cover z-50"
//           />
//           {isSidebarOpen && (
//             <span className="hidden sm:block text-sm truncate ">
//               {TruncateText(user?.name || "Guest", FIELD_LIMITS.name)}
//             </span>
//           )}
//         </div>
//       }
//    className="absolute left-14 bottom-0  w-64 bg-[#070C11] text-white rounded-lg  border border-gray-700 overflow-hidden"
      
// //       className="w-64 bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden"
//     >
//       <div >
//         {/* User Info */}
//         <div className="p-4 border-b border-gray-700">
//           <div className="flex gap-3">
//                     <img src={avatarSrc} className="w-[40px] h-[40px] rounded-full object-cover" />
//                     <div>
//           <p className="font-medium truncate">{TruncateText(user?.name || "Guest User", FIELD_LIMITS.name)}</p>
//           <p className="text-sm text-gray-400 truncate"> {TruncateText(user?.email || "No email", 20 ||FIELD_LIMITS.email)}</p>
//                     </div>
//           </div>

           
       
//         </div>

//         {/* Menu Items */}
//         <div className="flex flex-col text-sm ">
//           <Link
//             href="/settings"
//             className="flex items-center gap-3 border-b border-gray-700 px-4 py-3 hover:bg-gray-800 transition"
//           >
//             <FiSettings className="w-4 h-4" /> Settings
//           </Link>

//           <Link
//             href="/help"
//             className="flex items-center gap-3 px-4 border-b border-gray-700 py-3 hover:bg-gray-800 transition"
//           >
//             <FaQuestionCircle className="w-4 h-4" /> Help & Support
//           </Link>

//           <Link
//             href="/change-password"
//             className="flex items-center border-b border-gray-700 gap-3 px-4 py-3 hover:bg-gray-800 transition"
//           >
//             <FaKey className="w-4 h-4" /> Change Password
//           </Link>

//           <button
//             onClick={onLogout}
//             className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition"
//           >
//             <FiLogOut className="w-4 h-4" /> Logout
//           </button>
//         </div>
//       </div>
//     </Dropdown>
//   );
// }


// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { FiSettings, FiLogOut } from "react-icons/fi";
// import { FaKey, FaQuestionCircle } from "react-icons/fa";
// import Dropdown from "../components/Dropdown";
// import { TruncateText} from '../helper/truncateText'
// import { FIELD_LIMITS } from "../constents/constents";
// export default function ProfileMenu({ user, isSidebarOpen, onLogout }) {
//           const avatarSrc = user?.avatar || "/profile.jpg";
//   return (
//     <Dropdown
//       button={
//         <div
//           className={`sm:p-3 flex items-center gap-2 cursor-pointer transition ${
//             isSidebarOpen ? "justify-start" : "justify-center"
//           }`}
//         >
//           <img
          
//             src={avatarSrc}
//             alt={user?.name || "User"}
//             className="w-[20px] h-[20px] sm:w-[36px] sm:h-[36px] rounded-full object-cover z-50"
//           />
//           {isSidebarOpen && (
//             <span className="hidden sm:block text-sm truncate ">
//               {TruncateText(user?.name || "Guest", FIELD_LIMITS.name)}
//             </span>
//           )}
//         </div>
//       }
//    className="absolute left-14 bottom-0  w-64 bg-[#070C11] text-white rounded-lg  border border-gray-700 overflow-hidden"
      
// //       className="w-64 bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden"
//     >
//       <div >
//         {/* User Info */}
//         <div className="p-4 border-b border-gray-700">
//           <div className="flex gap-3">
//                     <img src={avatarSrc} className="w-[40px] h-[40px] rounded-full object-cover" />
//                     <div>
//           <p className="font-medium truncate">{TruncateText(user?.name || "Guest User", FIELD_LIMITS.name)}</p>
//           <p className="text-sm text-gray-400 truncate"> {TruncateText(user?.email || "No email", 20 ||FIELD_LIMITS.email)}</p>
//                     </div>
//           </div>

           
       
//         </div>

//         {/* Menu Items */}
//         <div className="flex flex-col text-sm ">
//           <Link
//             href="/settings"
//             className="flex items-center gap-3 border-b border-gray-700 px-4 py-3 hover:bg-gray-800 transition"
//           >
//             <FiSettings className="w-4 h-4" /> Settings
//           </Link>

//           <Link
//             href="/help"
//             className="flex items-center gap-3 px-4 border-b border-gray-700 py-3 hover:bg-gray-800 transition"
//           >
//             <FaQuestionCircle className="w-4 h-4" /> Help & Support
//           </Link>

//           <Link
//             href="/change-password"
//             className="flex items-center border-b border-gray-700 gap-3 px-4 py-3 hover:bg-gray-800 transition"
//           >
//             <FaKey className="w-4 h-4" /> Change Password
//           </Link>

//           <button
//             onClick={onLogout}
//             className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition"
//           >
//             <FiLogOut className="w-4 h-4" /> Logout
//           </button>
//         </div>
//       </div>
//     </Dropdown>
//   );
// }




"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import { TruncateText } from "../helper/truncateText";
import { FIELD_LIMITS } from "../constents/constents";
import { FaAngleUp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

export default function ProfileMenu({ user, isSidebarOpen, onLogout }) {
  const [open, setOpen] = useState(false);
  const avatarSrc = user?.avatar || "/profile.jpg";

  const menuItems = [
    { href: "/settings", label: "Settings", icon: <FiSettings className="w-4 h-4" /> },
    { href: "/help", label: "Help & Support", icon: <FaQuestionCircle className="w-4 h-4" /> },
    { href: "/change-password", label: "Change Password", icon: <FaKey className="w-4 h-4" /> },
  ];

  return (
    <div className={`text-white rounded-2xl  !bg-[#10151B] ${isSidebarOpen ? "": "max-w-[50px]"} `}>
      {/* Profile Header */}
      <div
        onClick={() => setOpen(!open)}
        className={`p-2 sm:p-3 flex items-center gap-2  !bg-[#10151B] cursor-pointer transition
          ${isSidebarOpen ? "justify-between" : " justify-start"}
        `}
      >
         <div className="flex gap-3 ms-3 bg-[#10151B] ">
         <img
            src={avatarSrc}
            alt={user?.name || "User"}
            className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] rounded-full object-cover"
          />
          {/* Show name+email if sidebar open OR profile clicked */}
          {(isSidebarOpen || open) && (
            <div className="flex flex-col">
              <p className="font-medium truncate ">
                {TruncateText(user?.name || "Guest User", 12 || FIELD_LIMITS.name )}
              </p>
              <p className="text-sm text-gray-400 truncate ">
                {TruncateText(user?.email || "No email", 15 || FIELD_LIMITS.email)}
              </p>
            </div>
          )}
          </div>

        {open && (
          <div className="">
            <IoIosArrowDown />
          </div>
        )}
  

      
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={`flex flex-col text-sm border-t border-gray-700 bg-[#10151B] 
            ${isSidebarOpen 
              ? " w-full md:min-w-[250px] "   // sidebar open → slightly bigger, aligned properly
              : "w-full md:min-w-[250px]" // sidebar closed → profile icon right
            }
          `}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 border-b border-gray-700 px-4 py-3 hover:bg-gray-800 transition"
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition"
          >
            <FiLogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
