

// // app/profile/[username]/page.jsx
// "use client";
// import React, { use } from "react";
// import { useSelector } from "react-redux";
// import ProfileHeader from "../profile/Profileheader";
// import DesignerProfile from "../profile/DesignerProfile";
// import PeopleYouMayKnow from "../profile/PeopleYouMayKnow";
// import { users } from "../constents/constents";
// import ProfileAnalytics from "../profile/ProfileAnalytics";  



// export default function UserProfilePage({ params }) {
//    const { username } = params; // fixed
//   const user = users.find((u) => u.username === username);
//   const currentUser = useSelector((state) => state.users?.currentUser);
//   const isOwner = currentUser?.id === user?.id;

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#070C11] text-white p-6">
//         <h2 className="text-xl">User not found</h2>
//         <p className="text-gray-400">
//           No profile exists for <strong>{username}</strong>.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#070C11] min-h-screen text-white p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         <section className="md:basis-2/3 space-y-6">
//           <ProfileHeader user={user} />
//           <DesignerProfile user={user} />
//         </section>

//         <aside className="md:basis-1/3 space-y-4">
//           {isOwner && <ProfileAnalytics />}
//           <PeopleYouMayKnow users={users} currentUserId={user.id} limit={4} />
//         </aside>
//       </div>
//     </div>
//   );
// }


"use client";
import React, {use} from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../profile/Profileheader";
import DesignerProfile from "../profile/DesignerProfile";
import PeopleYouMayKnow from "../profile/PeopleYouMayKnow";
import ProfileAnalytics from "../profile/ProfileAnalytics";
import { users } from "../constents/constents";
import JoinCommunities from '../profile/JoinCommunities';

export default function UserProfilePage({ params }) {
  const { username } = use(params);
  const user = users.find((u) => u.username === username);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const isOwner = currentUser?.id === user?.id;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070C11] text-white p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold">User not found</h2>
        <p className="text-gray-400 mt-2">
          No profile exists for <strong>{username}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#070C11] min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="flex flex-1 px-10 flex-col md:flex-row transition-all gap-14 duration-300">
        
        {/* Left / Main Section */}
        <section className="w-full lg:w-2/3 space-y-6">
          <ProfileHeader user={user} />
          <DesignerProfile user={user} />
        </section>

        {/* Right / Sidebar */}
        <aside className="w-full lg:max-w-[280px] flex flex-col gap-4">
          {isOwner && <ProfileAnalytics />}
          <PeopleYouMayKnow users={users} currentUserId={user.id} limit={4} />
          <JoinCommunities />
        </aside>

      </div>
    </div>
  );
}
