
// // components/HeaderNotification.jsx
// "use client";
// import { useSelector } from "react-redux";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import Link from "next/link";
// import { useState } from "react";

// export default function HeaderNotification() {
//   const { notifications, users } = useSelector((s) => s.users);
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const [open, setOpen] = useState(false);

//   // ✅ Show only latest 3
//   const latest = notifications.slice(0, 3);

//   // ✅ Helper to get user info
//   const getUserInfo = (userId) => {
//     const u = users.find((x) => x.id === userId);
//     return u || { name: "Unknown", avatar: "/default-avatar.png" };
//   };

//   return (
//     <div className="relative">
//       {/* Bell icon */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="text-xl relative focus:outline-none"
//       >
//         <IoMdNotificationsOutline className="text-gray-300 w-8 h-6" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute mt-3 w-80 bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700 z-50">
//           <div className="p-3 border-b border-gray-700 font-semibold">
//             Notifications
//           </div>

//           <div className="max-h-64 overflow-y-auto custom-scroll">
//             {latest.length === 0 ? (
//               <p className="text-gray-400 text-sm p-4">No notifications yet.</p>
//             ) : (
//               latest.map((n) => {
//                 const sender = getUserInfo(n.from);
//                 return (
//                   <Link
//                     key={n.id}
//                     href={n.link || "#"}
//                     className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800"
//                   >
//                     <img
//                       src={sender.avatar}
//                       alt={sender.name}
//                       className="w-8 h-8 rounded-full border"
//                     />
//                     <div>
//                       <p className="text-sm">
//                         <span className="font-semibold">{sender.name}</span>{" "}
//                         {n.message ||
//                           (n.type === "follow"
//                             ? "started following you."
//                             : n.type === "collab-request"
//                             ? "sent you a collab request."
//                             : "notification.")}
//                       </p>
//                       <span className="text-xs text-gray-400">
//                         {n.time || "Just now"}
//                       </span>
//                     </div>
//                   </Link>
//                 );
//               })
//             )}
//           </div>

//           {/* Footer */}
//           <div className="p-2 border-t border-gray-700 text-center">
//             <Link
//               href="/notifications"
//               onClick={()=>setOpen(false)}
//               className="text-blue-400 text-sm font-medium hover:underline"
//             >
//               View all notifications
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // components/HeaderNotification.jsx
// "use client";
// import { useSelector } from "react-redux";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import Link from "next/link";
// import Dropdown from "../components/Dropdown";

// export default function HeaderNotification({ max = 2 }) {
//   const { notifications, users } = useSelector((s) => s.users);
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const latest = notifications.slice(0, max);

//   const getUserInfo = (userId) => {
//     const u = users.find((x) => x.id === userId);
//     return u || { name: "Unknown", avatar: "/default-avatar.png" };
//   };

//   return (
//     <Dropdown
//       button={
//         <div className="relative text-xl text-gray-300">
//           <IoMdNotificationsOutline className="w-8 h-6" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
//               {unreadCount}
//             </span>
//           )}
//         </div>
//       }
//       className="w-80  bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700"
//     >
//       {/* Header */}
//       <div className="p-3 border-b border-gray-700 font-semibold">
//         Notifications
//       </div>

//       {/* Notifications list */}
//       <div className="max-h-64 overflow-y-auto custom-scroll">
//         {latest.length === 0 ? (
//           <p className="text-gray-400 text-sm p-4">No notifications yet.</p>
//         ) : (
//           latest.map((n) => {
//             const sender = getUserInfo(n.from);
//             return (
//               <Link
//                 key={n.id}
//                 href={n.link || "#"}
//                 className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800"
//               >
//                 <img
//                   src={sender.avatar}
//                   alt={sender.name}
//                   className="w-8 h-8 rounded-full border"
//                 />
//                 <div>
//                   <p className="text-sm">
//                     <span className="font-semibold">{sender.name}</span>{" "}
//                     {n.message ||
//                       (n.type === "follow"
//                         ? "started following you."
//                         : n.type === "collab-request"
//                         ? "sent you a collab request."
//                         : "notification.")}
//                   </p>
//                   <span className="text-xs text-gray-400">
//                     {n.time || "Just now"}
//                   </span>
//                 </div>
//               </Link>
//             );
//           })
//         )}
//       </div>

//       {/* Footer */}
//       {
//         notifications.length > max && (
//      <div className="p-2 border-t border-gray-700 text-center">
//         <Link
//           href="/notifications"
//           className="text-blue-400 text-sm font-medium hover:underline"
//         >
//           View all notifications
//         </Link>
//       </div>
//         )
//       }
    
//     </Dropdown>
//   );
// }

"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import Dropdown from "../components/Dropdown";

export default function HeaderNotification({ max = 2 }) {
  const { notifications, users } = useSelector((s) => s.users);

  // ✅ useMemo to avoid re-calculating every render
  const { unreadCount, latest } = useMemo(() => {
    const unread = notifications.reduce((c, n) => (!n.read ? c + 1 : c), 0);
    return {
      unreadCount: unread,
      latest: notifications.slice(0, max),
    };
  }, [notifications, max]);

  const getUserInfo = (userId) => {
    const u = users.find((x) => x.id === userId);
    return u || { name: "Unknown", avatar: "/default-avatar.png" };
  };

  return (
    <Dropdown
      button={
        <div className="relative text-xl text-gray-300">
          <IoMdNotificationsOutline className="w-8 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      }
      className="w-80 bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700"
    >
      {({ close }) => (
        <>
          {/* Header */}
          <div className="p-3 border-b border-gray-700 font-semibold">
            Notifications
          </div>

          {/* Notifications list */}
          <div className="max-h-64 overflow-y-auto custom-scroll">
            {latest.length === 0 ? (
              <p className="text-gray-400 text-sm p-4">No notifications yet.</p>
            ) : (
              latest.map((n) => {
                const sender = getUserInfo(n.from);
                return (
                  <Link
                    key={n.id}
                   href={n.link || `/in/${n.to}`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800"
                    onClick={close} // ✅ dropdown closes on click
                  >
                    <img
                      src={sender.avatar}
                      alt={sender.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{sender.name}</span>{" "}
                        {n.message ||
                          (n.type === "follow"
                            ? "started following you."
                            : n.type === "collab-request"
                            ? "sent you a collab request."
                            : "notification.")}
                      </p>
                      <span className="text-xs text-gray-400">
                        {n.time || "Just now"}
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > max && (
            <div className="p-2 border-t border-gray-700 text-center">
              <Link
                href="/notifications"
                className="text-blue-400 text-sm font-medium hover:underline"
                onClick={close} // ✅ close on "View all"
              >
                View all notifications
              </Link>
            </div>
          )}
        </>
      )}
    </Dropdown>
  );
}
