
// // app/profile/ProfileHeader.jsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { MdLocationOn, MdEmail, MdVerifiedUser } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import Link from "next/link";
// import ProfileTopSection from "./ProfileTopSection";
// import { Buttonborder } from "../components/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { TruncateText } from "../helper/truncateText";
// import { FIELD_LIMITS } from "../constents/constents";

// export default function ProfileHeader({ user }) {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((s) => s.users.currentUser);

//   // If the viewer is the owner, use currentUser (Redux) as source-of-truth.
//   const isOwner = currentUser?.id === user?.id;
//   const displayUser = isOwner ? currentUser : user;

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followers, setFollowers] = useState(displayUser?.followersCount || 0);
//   const [connections, setConnections] = useState(displayUser?.connections || 0);

//   useEffect(() => {
//     if (displayUser) {
//       setFollowers(displayUser.followers || 0);
//       setConnections(displayUser.connections || 0);
//     }
//   }, [displayUser]);

// //   useEffect(() => {
// //   if (!currentUser?.followingList || !user?.id) return;
// //   setIsFollowing(currentUser.followingList.includes(user.id));
// // }, [currentUser, user]);

// useEffect(() => {
//   // quick, defensive check and set boolean
//   setIsFollowing(Boolean(currentUser?.following?.includes(user?.id)));
// }, [currentUser?.following, user?.id]);

//   // follow/unfollow actions are unchanged — keep dispatching to store as before
//   const handleFollowToggle = () => {
//     if (!currentUser) return alert("Please login (currentUser missing)");
//     if (isFollowing) {
//       dispatch({ type: "users/unfollowUser", payload: { targetId: user.id, currentUserId: currentUser.id }});
//       setIsFollowing(false);
//       setFollowers((f) => Math.max(0, f - 1));
//     } else {
//       dispatch({ type: "users/followUser", payload: { targetId: user.id, currentUserId: currentUser.id }});
//       setIsFollowing(true);
//       setFollowers((f) => f + 1);
//     }
//   };

//   if (!displayUser) {
//     return <div className="p-4 text-gray-400">Loading profile...</div>;
//   }

//   const rightColumnItems = [
//     ...(displayUser.experience || []),
//     ...(displayUser.college ? (Array.isArray(displayUser.college) ? displayUser.college : [displayUser.college]) : []),
//   ].slice(0, 2);

//   return (
//     <div className="mt-5 overflow-hidden">
//       <div className="mb-14">
//         {/* pass displayUser so owner sees live currentUser */}
//         <ProfileTopSection user={displayUser} />
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row gap-10">
//         <div className="mt-2 w-full md:w-[70%]">
//           <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
//             {TruncateText(displayUser.name, FIELD_LIMITS.name)}
//             {displayUser.verified && <MdVerifiedUser className="text-blue-500" />}
//           </h2>

//           {displayUser.headline && <p className="sm:text-[14px] my-2 text-[#f7f4f4] break-words">{displayUser.headline}</p>}

//           <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
//             {displayUser.location && (
//               <div className="flex items-center gap-1">
//                 <MdLocationOn size={16} />
           
//                 <p> {TruncateText(displayUser.location, FIELD_LIMITS.location)}</p>
//               </div>
//             )}
//             {displayUser.email && (
//               <div className="flex items-center gap-1">
//                 <MdEmail size={16} />
//                 <p>{displayUser.email}</p>
//               </div>
//             )}
//             {displayUser.joined && (
//               <div className="flex items-center gap-1">
//                 <FaRegCalendarAlt size={16} />
//                 <p>Joined {displayUser.joined}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-10">
//               <Link href="/follower" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">
//                   {followers} Followers
//                 </span>
//               </Link>
//               <Link href="/following" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">
//                   {connections} Following
//                 </span>
//               </Link>
//               <Link href="/connection" className="flex flex-col items-center">
//                 <span className="text-[14px] font-semibold text-blue-500">
//                   {connections} Collabs
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="gap-6 mt-1 w-full md:w-[30%]">
//           {rightColumnItems.map((item, idx) => (
//             <div key={idx} className="flex items-center gap-2 my-4">
//               <div className="border-3 md:ms-16 m-1 border-gray-400 rounded-[10px] overflow-hidden">
//                 <img
//                   src={item.logo}
//                   alt={`${item.company || item.name} logo`}
//                   className="w-[40px] h-[40px] object-contain"
//                 />
//               </div>
//               <div className="font-medium text-white text-[14px]">
//                 {item.company || item.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2 justify-start my-4">
//         {isOwner && (
//           <>
//             <Buttonborder name="View As" />
//             <Buttonborder name="Action" />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// app/profile/ProfileHeader.jsx
"use client";
import React, { useEffect, useState } from "react";
import { MdLocationOn, MdEmail, MdVerifiedUser } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import ProfileTopSection from "./ProfileTopSection";
import { Buttonborder } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { TruncateText } from "../helper/truncateText";
import { FIELD_LIMITS } from "../constents/constents";

export default function ProfileHeader({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users.currentUser);

  const isOwner = currentUser?.id === user?.id;
  const displayUser = isOwner ? currentUser : user;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(displayUser?.followersCount || 0);
  const [following, setFollowing] = useState(displayUser?.followingCount || 0);
  const [collabs, setCollabs] = useState(displayUser?.collabsCount || 0);

  useEffect(() => {
    if (displayUser) {
      setFollowers(displayUser.followersCount || 0);
      setFollowing(displayUser.followingCount || 0);
      setCollabs(displayUser.collabsCount || 0);
    }
  }, [displayUser]);

  useEffect(() => {
    setIsFollowing(Boolean(currentUser?.following?.includes(user?.id)));
  }, [currentUser?.following, user?.id]);

   const rightColumnItems = [
    ...(displayUser.experience || []),
    ...(displayUser.college
      ? Array.isArray(displayUser.college)
        ? displayUser.college
        : [displayUser.college]
      : []),
  ]
    .slice(0, 2)
    .map((item) => ({
      ...item,
      logo: item.logo || "/placeholder.png", // fallback logo to avoid undefined
      company: item.company || item.name || "", // safe company/name display
    }));


  if (!displayUser) {
    return <div className="p-4 text-gray-400">Loading profile...</div>;
  }


  return (
    <div className="mt-5 overflow-hidden">
      <div className="mb-14">
        <ProfileTopSection user={displayUser} />
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-10">
        <div className="mt-2 w-full md:w-[70%]">
          <h2 className="text-[20px] sm:text-2xl font-semibold my-1 text-[#f9f9f9] flex gap-2 items-center">
            {TruncateText(displayUser.name, FIELD_LIMITS.name)}
            {displayUser.verified && <MdVerifiedUser className="text-blue-500" />}
          </h2>

          {displayUser.headline && (
            <p className="sm:text-[14px] my-2 text-[#f7f4f4] break-words">
              {displayUser.headline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-[#ebe1e1] text-xs font-medium my-2">
            {displayUser.location && (
              <div className="flex items-center gap-1">
                <MdLocationOn size={16} />
                <p>{TruncateText(displayUser.location, FIELD_LIMITS.location)}</p>
              </div>
            )}
            {displayUser.email && (
              <div className="flex items-center gap-1">
                <MdEmail size={16} />
                <p>{displayUser.email}</p>
              </div>
            )}
            {displayUser.joined && (
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt size={16} />
                <p>Joined {displayUser.joined}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-10">
              <Link href="/network-manager/followers" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {followers} Followers
                </span>
              </Link>
              <Link href="/network-manager/following" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {following} Following
                </span>
              </Link>
              <Link href="/collabs" className="flex flex-col items-center">
                <span className="text-[14px] font-semibold text-blue-500">
                  {collabs} Collabs
                </span>
              </Link>
            </div>
          </div>

          {/* {!isOwner && (
            <button
              onClick={handleFollowToggle}
              className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                isFollowing ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )} */}
        </div>

        {/* <div className="gap-6 mt-1 w-full md:w-[30%]">
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
        </div> */}

        <div className="gap-6 mt-1 w-full md:w-[30%]">
          {rightColumnItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 my-4">
              <div className="border-3 md:ms-16 m-1 border-gray-400 rounded-[10px] overflow-hidden">
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  className="w-[40px] h-[40px] object-contain"
                />
              </div>
              <div className="font-medium text-white text-[14px]">{item.company}</div>
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
        )}
      </div>
    </div>
  );
}
