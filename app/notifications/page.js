// // // pages/notifications.jsx
// // "use client";

// // import { useSelector, useDispatch } from "react-redux";
// // import { acceptCollab, rejectCollab, markNotificationsRead } from "../store/userSlice";
// // import { useEffect } from "react";

// // export default function NotificationsPage() {
// //   const dispatch = useDispatch();
// //   const { notifications, currentUser } = useSelector((s) => s.users);

// //   // Mark all notifications as read when page loads
// //   useEffect(() => {
// //     dispatch(markNotificationsRead());
// //   }, [dispatch]);

// //   if (!currentUser) return <p className="p-5 text-gray-500">No user logged in.</p>;

// //   return (
// //     <div className="p-5 max-w-3xl mx-auto">
// //       <h1 className="text-2xl font-semibold mb-5">Notifications</h1>

// //       {notifications.length === 0 && (
// //         <p className="text-gray-400">You have no notifications.</p>
// //       )}

// //       <div className="space-y-4">
// //         {notifications.map((n) => (
// //           <div
// //             key={n.id}
// //             className={`p-3 rounded border ${
// //               !n.read ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
// //             }`}
// //           >
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <p className="text-sm">
// //                   <span className="font-semibold">{getUserDisplayName(n.from)}</span> {n.message}
// //                 </p>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   {new Date(n.createdAt).toLocaleString()}
// //                 </p>
// //               </div>

// //               {/* Collab actions */}
// //               {n.type === "collab-request" && n.status === "pending" && n.to === currentUser.id && (
// //                 <div className="flex gap-2">
// //                   <button
// //                     className="px-3 py-1 bg-green-500 text-white rounded"
// //                     onClick={() =>
// //                       dispatch(acceptCollab({ notificationId: n.id, currentUserId: currentUser.id }))
// //                     }
// //                   >
// //                     Accept
// //                   </button>
// //                   <button
// //                     className="px-3 py-1 bg-red-500 text-white rounded"
// //                     onClick={() =>
// //                       dispatch(rejectCollab({ notificationId: n.id, currentUserId: currentUser.id }))
// //                     }
// //                   >
// //                     Reject
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // Helper to get username display
// // function getUserDisplayName(userId) {
// //   const users = JSON.parse(localStorage.getItem("socialAppState"))?.users || [];
// //   const u = users.find((u) => u.id === userId);
// //   return u ? u.name : "Unknown";
// // }

// // function getUserDisplayName(userId) {
// //   const users = JSON.parse(localStorage.getItem("socialAppState"))?.users || [];
// //   const u = users.find((u) => u.id === userId);
// //   return u ? u.name : "Unknown";
// // }


// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { acceptCollab, rejectCollab, markNotificationsRead, clearAllNotifications } from "../store/userSlice";
// import { useEffect } from "react";

// export default function NotificationsPage() {
//   const dispatch = useDispatch();
//   const { notifications, currentUser } = useSelector((s) => s.users);

//   useEffect(() => {
//     dispatch(markNotificationsRead());
//   }, [dispatch]);

//   if (!currentUser) return <p className="p-5 text-gray-500">No user logged in.</p>;

//   return (
//     <div className="p-8 bg-[#070C11] md:p-16 h-screen">
//       <div className="flex justify-between items-center mb-2">
//         <h1 className="text-2xl font-semibold">Notifications</h1>
//         {notifications.length > 0 && (
//           <button
//             className="text-sm text-blue-400 hover:underline hover:cursor-pointer"
//             onClick={() => dispatch(clearAllNotifications())}
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {notifications.length === 0 && <p className="text-gray-400">You have no notifications.</p>}

//       <div className="space-y-4">
//         {notifications.map((n) => (
//           <div
//             key={n.id}
//             className={`p-3 rounded border ${!n.read ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm">
//                   <span className="font-semibold">{getUserDisplayName(n.from)}</span> {n.message}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {n.type === "collab-request" && n.status === "pending" && n.to === currentUser.id && (
//                 <div className="flex gap-2">
//                   <button
//                     className="px-3 py-1 bg-green-500 text-white rounded"
//                     onClick={() => dispatch(acceptCollab({ notificationId: n.id, currentUserId: currentUser.id }))}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-red-500 text-white rounded"
//                     onClick={() => dispatch(rejectCollab({ notificationId: n.id, currentUserId: currentUser.id }))}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function getUserDisplayName(userId) {
//   const users = JSON.parse(localStorage.getItem("socialAppState"))?.users || [];
//   const u = users.find((u) => u.id === userId);
//   return u ? u.name : "Unknown";
// }


// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   acceptCollab,
//   rejectCollab,
//   markNotificationsRead,
//   clearAllNotifications,
// } from "../store/userSlice";
// import { useEffect, useState } from "react";

// export default function NotificationsPage() {
//   const dispatch = useDispatch();
//   const { notifications, currentUser, users } = useSelector((s) => s.users);

//   const [usersMap, setUsersMap] = useState({}); // { userId: {name, avatar} }

//   useEffect(() => {
//     dispatch(markNotificationsRead());
//   }, [dispatch]);

//   // Build a map for easy name/avatar lookup
//   useEffect(() => {
//     const map = {};
//     users.forEach((u) => {
//       map[u.id] = { name: u.name, avatar: u.avatar || "/default-avatar.png" };
//     });
//     setUsersMap(map);
//   }, [users]);

//   if (!currentUser)
//     return <p className="p-5 text-gray-400">No user logged in.</p>;

//   return (
//     <div className="p-8 md:p-16 min-h-screen bg-[#0B111B] text-white">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Notifications</h1>
//         {notifications.length > 0 && (
//           <button
//             className="text-sm text-blue-400 hover:underline hover:cursor-pointer"
//             onClick={() => dispatch(clearAllNotifications())}
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {notifications.length === 0 && (
//         <p className="text-gray-400">You have no notifications.</p>
//       )}

//       {/* Notification list */}
//       <div className="space-y-3">
//         {notifications.map((n) => {
//           const user = usersMap[n.to] || {
//             name: "Unknown",
//             avatar: "/default-avatar.png",
//           };

//           return (
//             <div
//               key={n.id}
//               className={`p-3 rounded-lg border ${
//                 !n.read
//                   ? "bg-blue-950 border-blue-700"
//                   : "bg-[#0F172A] border-gray-700"
//               } flex justify-between items-start gap-4`}
//             >
//               {/* Left: Avatar + message */}
//               <div className="flex gap-3">
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full border border-gray-600"
//                 />
//                 <div>
//                   <p className="text-sm">
//                     <span className="font-semibold">{user.name}</span> {n.message}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(n.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Right: Collab buttons */}
//               {n.type === "collab-request" &&
//                 n.status === "pending" &&
//                 n.to === currentUser.id && (
//                   <div className="flex gap-2">
//                     <button
//                       className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                       onClick={() =>
//                         dispatch(
//                           acceptCollab({
//                             notificationId: n.id,
//                             currentUserId: currentUser.id,
//                           })
//                         )
//                       }
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                       onClick={() =>
//                         dispatch(
//                           rejectCollab({
//                             notificationId: n.id,
//                             currentUserId: currentUser.id,
//                           })
//                         )
//                       }
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  acceptCollab,
  rejectCollab,
  markNotificationsRead,
  clearAllNotifications,
} from "../store/userSlice";
import Link from "next/link";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { notifications, currentUser, users, collabs } = useSelector((s) => s.users);
  const [activeTab, setActiveTab] = useState("all"); // "all", "collabs", "jobs"

  useEffect(() => {
    dispatch(markNotificationsRead());
  }, [dispatch]);

  if (!currentUser) return <p className="p-5 text-gray-500">No user logged in.</p>;

  // O(1) lookup maps
  const usersMap = useMemo(() => {
    const map = {};
    users.forEach((u) => (map[u.id] = u));
    return map;
  }, [users]);

  const collabsMap = useMemo(() => {
    const map = {};
    collabs.forEach((c) => (map[c.id] = c));
    return map;
  }, [collabs]);

  // Filtered notifications based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "collabs":
        return notifications.filter((n) => n.type === "collab-request" || n.type === "collab-accepted" || n.type === "collab-rejected");
      case "jobs":
        return notifications.filter((n) => n.type === "job" || n.type === "job-applied" || n.type === "job-status");
      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  return (
    <div className="p-8 bg-[#070C11] md:p-16 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        {notifications.length > 0 && (
          <button
            className="text-sm text-blue-400 hover:underline"
            onClick={() => dispatch(clearAllNotifications())}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["all", "collabs", "jobs"].map((tab) => (
          <button
            key={tab}
            
           className={`text-[12px] flex justify-center items-center gap-1 px-3 py-2.5 rounded-full ${activeTab === tab ? "bg-[#0013E3] text-white" : "bg-gray-700 text-gray-300"} bg-[#0013E3] font-semibold hover:cursor-pointer `}

            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {filteredNotifications.length === 0 ? (
        <p className="text-gray-400">No notifications in this section.</p>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((n) => {
            const sender = usersMap[n.to] || { name: "Unknown", avatar: "/default-avatar.png" };
            const collab = collabsMap[n.id];

            return (
              <div
                key={n.id}
                className={`p-3 rounded border ${!n.read ? "bg-blue-950 border-blue-700" : "bg-[#0F172A] border-gray-700"}`}
              >
                <div className="flex justify-between items-start">
                 <Link className="flex gap-3" href={n.link || `/in/${n.to}`}>
    <img src={sender.avatar} alt={sender.name} className="w-10 h-10 rounded-full border" />
                    <div>
                      <p className="text-sm text-white">
                        <span className="font-semibold">{sender.name}</span> {n.message}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </Link>
          

                  {/* collab buttons */}
                  {n.type === "collab-request" && collab && collab.status === "pending" && n.to === currentUser.id && (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() => dispatch(acceptCollab({ notificationId: collab.id, currentUserId: currentUser.id }))}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => dispatch(rejectCollab({ notificationId: collab.id, currentUserId: currentUser.id }))}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
