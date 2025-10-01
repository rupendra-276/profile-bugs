
// // components/ProfileHeader.jsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { MdLocationOn, MdEmail } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
// import Link from "next/link";
// import ProfileTopSection from "./ProfileTopSection";
// import { MdVerifiedUser } from "react-icons/md";
// import Button, { Buttonborder } from '../components/Button';
// import { NavLinkButton } from "../button/Button";
// export default function ProfileHeader({ user, onUpdateUser }) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followers, setFollowers] = useState(user.followers || 0);
//   const [connections, setConnections] = useState(user.connections || 0);

//   // keep local display in sync when `user` changes
//   useEffect(() => {
//     setFollowers(user.followers || 0);
//     setConnections(user.connections || 0);
//   }, [user]);

//   const handleFollow = () => {
//     const next = !isFollowing;
//     setIsFollowing(next);
//     const newCount = next ? followers + 1 : Math.max(0, followers - 1);
//     setFollowers(newCount);
//     // persist up to parent
//     onUpdateUser?.({ followers: newCount });
//   };

//   return (
//     <div className="mt-5 overflow-hidden">
//       {/* Top (cover + avatar) */}
//       <div className="mb-14">
//         {/* pass user + updater */}
//         <ProfileTopSection user={user} onUpdateUser={onUpdateUser} />
//       </div>

//       {/* Info area */}
//       <div className="mt-8 flex flex-col md:flex-row gap-10">
//         <div className="mt-2 w-full md:w-[70%]">
//           <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-1 items-center">
//             {user.name} <MdVerifiedUser className="text-blue-700" /> {user.verified && <MdVerified className="text-blue-700" />}
//           </h2>

//           <p className="sm:text-[14px] my-2 text-[#f7f4f4]">
//             {user.headline}
//           </p>

//           <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
//             {user.location && (
//               <div className="flex items-center gap-1">
//                 <MdLocationOn size={16} />
//                 <p>{user.location}</p>
//               </div>
//             )}

//             {user.email && (
//               <div className="flex items-center gap-1">
//                 <MdEmail size={16} />
//                 <p>{user.email}</p>
//               </div>
//             )}

//             {user.joined && (
//               <div className="flex items-center gap-1">
//                 <FaRegCalendarAlt size={16} />
//                 <p>Joined {user.joined}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-10">
//               <Link href="/follower" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{followers} Followers</span>
//               </Link>
//               <Link href="/following" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Following</span>
//               </Link>
//               <Link href="/connection" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Collabs</span>
//               </Link>
//             </div>

            
//           </div>
//         </div>

//         {/* Experience / College (right column) */}
//         <div className="gap-6 mt-1 w-full md:w-[30%]">
//           {[
//             ...(user.experience || []),
//             ...(user.college ? (Array.isArray(user.college) ? user.college : [user.college]) : []),
//           ]
//             .slice(0, 2)
//             .map((item, idx) => (
//               <div key={idx} className="flex items-center gap-2 my-4">
//                 <div className="border-3 md:ms-16 m-1 border-gray-400 rounded-[10px] overflow-hidden">
//                   <img src={item.logo} alt={`${item.company || item.name} logo`} className="w-[40px] h-[40px] object-contain" />
//                 </div>
//                 <div className="font-medium text-white text-[14px]">{item.company || item.name}</div>
//               </div>
//             ))}
//         </div>

        
//       </div>

//       {/* view as actino */}
//       <div className="flex gap-2  justify-start my-4 ">
//           <Buttonborder name="View As" />
//           <Buttonborder name="Action" />

//       </div>
  
//     </div>
//   );
// }








// // app/profile/ProfileHeader.jsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { MdLocationOn, MdEmail, MdVerified, MdVerifiedUser } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import Link from "next/link";
// import ProfileTopSection from "./ProfileTopSection";
// import Button, { Buttonborder } from "../components/Button";

// export default function ProfileHeader({ user, onUpdateUser }) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followers, setFollowers] = useState(user.followers || 0);
//   const [connections, setConnections] = useState(user.connections || 0);

//   useEffect(() => {
//     setFollowers(user.followers || 0);
//     setConnections(user.connections || 0);
//   }, [user]);

//   const handleFollow = () => {
//     const next = !isFollowing;
//     setIsFollowing(next);
//     const newCount = next ? followers + 1 : Math.max(0, followers - 1);
//     setFollowers(newCount);
//     onUpdateUser?.({ followers: newCount });
//   };

//   const rightColumnItems = [
//     ...(user.experience || []),
//     ...(user.college ? (Array.isArray(user.college) ? user.college : [user.college]) : []),
//   ].slice(0, 2);

//   return (
//     <div className="mt-5 overflow-hidden">
//       <div className="mb-14">
//         <ProfileTopSection user={user} onUpdateUser={onUpdateUser} />
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row gap-10">
//         <div className="mt-2 w-full md:w-[70%]">
//           <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
//             {user.name}
//             <MdVerifiedUser className="text-blue-700" />
//             {user.verified && <MdVerified className="text-blue-700" />}
//           </h2>

//           {user.headline && <p className="sm:text-[14px] my-2 text-[#f7f4f4]">{user.headline}</p>}

//           <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
//             {user.location && (
//               <div className="flex items-center gap-1">
//                 <MdLocationOn size={16} />
//                 <p>{user.location}</p>
//               </div>
//             )}
//             {user.email && (
//               <div className="flex items-center gap-1">
//                 <MdEmail size={16} />
//                 <p>{user.email}</p>
//               </div>
//             )}
//             {user.joined && (
//               <div className="flex items-center gap-1">
//                 <FaRegCalendarAlt size={16} />
//                 <p>Joined {user.joined}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-10">
//               <Link href="/follower" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{followers} Followers</span>
//               </Link>
//               <Link href="/following" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Following</span>
//               </Link>
//               <Link href="/connection" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Collabs</span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="gap-6 mt-1 w-full md:w-[30%]">
//           {rightColumnItems.map((item, idx) => (
//             <div key={idx} className="flex items-center gap-2 my-4">
//               <div className="border-3 md:ms-16 m-1 border-gray-400 rounded-[10px] overflow-hidden">
//                 <img src={item.logo} alt={`${item.company || item.name} logo`} className="w-[40px] h-[40px] object-contain" />
//               </div>
//               <div className="font-medium text-white text-[14px]">{item.company || item.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2 justify-start my-4">
//         <Buttonborder name="View As" />
//         <Buttonborder name="Action" />
//         <button onClick={handleFollow} className="px-4 py-1 bg-blue-600 text-white rounded-lg">
//           {isFollowing ? "Unfollow" : "Follow"}
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useEffect, useState } from "react";
// import { MdLocationOn, MdEmail, MdVerified, MdVerifiedUser } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from "../store/userSlice";
// import ProfileTopSection from "./ProfileTopSection";
// import { Buttonborder } from "../components/Button";

// export default function ProfileHeader() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.users.currentUser);
//   // console.log("Current User in ProfileHeader:", user);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followers, setFollowers] = useState(user?.followers || 0);
//   const [connections, setConnections] = useState(user?.connections || 0);

//   useEffect(() => {
//     setFollowers(user?.followers || 0);
//     setConnections(user?.connections || 0);
//   }, [user]);

//   const handleFollow = () => {
//     const next = !isFollowing;
//     setIsFollowing(next);
//     const newCount = next ? followers + 1 : Math.max(0, followers - 1);
//     setFollowers(newCount);
//     dispatch(updateUser({ followers: newCount }));
//   };

//   if (!user) return null;

//   return (
//     <div className="mt-5 overflow-hidden">
//       <div className="mb-14">
//         <ProfileTopSection />
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row gap-10">
//         <div className="mt-2 w-full md:w-[70%]">
//           <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
//             {user.name}
//             <MdVerifiedUser className="text-blue-700" />
//             {user.verified && <MdVerified className="text-blue-700" />}
//           </h2>

//           {user.headline && <p className="sm:text-[14px] my-2 text-[#f7f4f4]">{user.headline}</p>}

//           <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
//             {user.location && (
//               <div className="flex items-center gap-1">
//                 <MdLocationOn size={16} />
//                 <p>{user.location}</p>
//               </div>
//             )}
//             {user.email && (
//               <div className="flex items-center gap-1">
//                 <MdEmail size={16} />
//                 <p>{user.email}</p>
//               </div>
//             )}
//             {user.joined && (
//               <div className="flex items-center gap-1">
//                 <FaRegCalendarAlt size={16} />
//                 <p>Joined {user.joined}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-10">
//               <Link href="/follower" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{followers} Followers</span>
//               </Link>
//               <Link href="/following" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Following</span>
//               </Link>
//               <Link href="/connection" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Collabs</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-2 justify-start my-4">
//         <Buttonborder name="View As" />
//         <Buttonborder name="Action" />
//         {/* <button onClick={handleFollow} className="px-4 py-1 bg-blue-600 text-white rounded-lg">
//           {isFollowing ? "Unfollow" : "Follow"}
//         </button> */}
//       </div>
//     </div>
//   );
// }


// // components/ProfileHeader.jsx
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { followUser, unfollowUser, updateUser } from "../store/userSlice";
// import ProfileTopSection from "./ProfileTopSection";
// import { Buttonborder } from "../components/Button";

// export default function ProfileHeader({ profileUser: propProfileUser = null, isOwn = false }) {
//   const dispatch = useDispatch();
//   const storeCurrentUser = useSelector((state) => state.users?.currentUser || null);

//   // prefer propProfileUser (passed from route); otherwise fallback to store currentUser
//   const user = propProfileUser || storeCurrentUser;
// console.log("ProfileHeader user:", user);

//   // guard: if still no user, return null (prevents reading .name of undefined)
//   if (!user) return null;
//   const [followers, setFollowers] = useState(user?.followers || 0);
//   const [connections, setConnections] = useState(user?.connections || 0);
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     setFollowers(user?.followers || 0);
//     setConnections(user?.connections || 0);
//     if (storeCurrentUser && storeCurrentUser.following) {
//       setIsFollowing(Boolean(storeCurrentUser.following.includes(user.id)));
//     } else {
//       setIsFollowing(false);
//     }
//   }, [user, storeCurrentUser]);

//   const handleFollowToggle = () => {
//     if (!storeCurrentUser) {
//       alert("Please login to follow users.");
//       return;
//     }
//     if (isFollowing) {
//       dispatch(unfollowUser({ targetId: user.id, currentUserId: storeCurrentUser.id }));
//       setFollowers((f) => Math.max(0, f - 1));
//     } else {
//       dispatch(followUser({ targetId: user.id, currentUserId: storeCurrentUser.id }));
//       setFollowers((f) => f + 1);
//     }
//     setIsFollowing((v) => !v);
//   };

//   return (
//     <div className="mt-5 overflow-hidden">
//       <div className="mb-14">
//         <ProfileTopSection user={user} />
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row gap-10">
//         <div className="mt-2 w-full md:w-[70%]">
//           <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
//             {user?.name}
//             {/* verified icon */}
//             {user?.verified && <span className="text-blue-700">✔</span>}
//           </h2>

//           {user?.headline && <p className="sm:text-[14px] my-2 text-[#f7f4f4]">{user.headline}</p>}

//           <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
//             {user?.location && (
//               <div className="flex items-center gap-1">
//                 <span>📍</span>
//                 <p>{user.location}</p>
//               </div>
//             )}
//             {user?.email && (
//               <div className="flex items-center gap-1">
//                 <span>✉️</span>
//                 <p>{user.email}</p>
//               </div>
//             )}
//             {user?.joined && (
//               <div className="flex items-center gap-1">
//                 <span>📅</span>
//                 <p>Joined {user.joined}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-10">
//               <Link href="/follower" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{followers} Followers</span>
//               </Link>
//               <Link href="/following" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Following</span>
//               </Link>
//               <Link href="/connection" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">{connections} Collabs</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-2 justify-start my-4">
//         <Buttonborder name="View As" />
//         {isOwn ? (
//           <Buttonborder name="Edit Profile" />
//         ) : (
//           <button onClick={handleFollowToggle} className="px-4 py-1 bg-blue-600 text-white rounded-lg">
//             {isFollowing ? "Unfollow" : "Follow"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { MdLocationOn, MdEmail, MdVerifiedUser } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import ProfileTopSection from "./ProfileTopSection";
import { Buttonborder } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../store/userSlice";

export default function ProfileHeader({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users.currentUser);
  const isOwner = currentUser?.id === user?.id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(user?.followers || 0);
  const [connections, setConnections] = useState(user?.connections || 0);

  useEffect(() => {
    if (user) {
      setFollowers(user.followers || 0);
      setConnections(user.connections || 0);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && user) {
      setIsFollowing((currentUser.following || []).includes(user.id));
    }
  }, [currentUser, user]);

  const handleFollowToggle = () => {
    if (!currentUser) return alert("Please login (currentUser missing)");
    if (isFollowing) {
      dispatch(unfollowUser({ targetId: user.id, currentUserId: currentUser.id }));
      setIsFollowing(false);
      setFollowers((f) => Math.max(0, f - 1));
    } else {
      dispatch(followUser({ targetId: user.id, currentUserId: currentUser.id }));
      setIsFollowing(true);
      setFollowers((f) => f + 1);
    }
  };

  if (!user) {
    return <div className="p-4 text-gray-400">Loading profile...</div>;
  }

  const rightColumnItems = [
    ...(user.experience || []),
    ...(user.college ? (Array.isArray(user.college) ? user.college : [user.college]) : []),
  ].slice(0, 2);

  return (
    <div className="mt-5 overflow-hidden">
      <div className="mb-14">
        <ProfileTopSection user={user} />
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-10">
        <div className="mt-2 w-full md:w-[70%]">
          <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
            {user.name}
            {user.verified && <MdVerifiedUser className="text-blue-500" />}
          </h2>

          {user.headline && <p className="sm:text-[14px] my-2 text-[#f7f4f4]">{user.headline}</p>}

          <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
            {user.location && (
              <div className="flex items-center gap-1">
                <MdLocationOn size={16} />
                <p>{user.location}</p>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-1">
                <MdEmail size={16} />
                <p>{user.email}</p>
              </div>
            )}
            {user.joined && (
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt size={16} />
                <p>Joined {user.joined}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-10">
              <Link href="/follower" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {followers} Followers
                </span>
              </Link>
              <Link href="/following" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {connections} Following
                </span>
              </Link>
              <Link href="/connection" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {connections} Collabs
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="gap-6 mt-1 w-full md:w-[30%]">
          {rightColumnItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 my-4">
              <div className="border-3 md:ms-16 m-1 border-gray-400 rounded-[10px] overflow-hidden">
                <img
                  src={item.logo}
                  alt={`${item.company || item.name} logo`}
                  className="w-[40px] h-[40px] object-contain"
                />
              </div>
              <div className="font-medium text-white text-[14px]">
                {item.company || item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-start my-4">
        {isOwner && (
          <>
            <Buttonborder name="View As" />
            <Buttonborder name="Action" />
          </>
        ) }
      </div>
    </div>
  );
}
