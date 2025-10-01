
// "use client";
// import React, { useState } from "react";
// import ProfileHeader from "./Profileheader";
// import DesignerProfile from "./DesignerProfile";
// import ProfileAnalytics from "./ProfileAnalytics";
// import PeopleYouMayKnow from "./PeopleYouMayKnow";
// import JoinCommunities from "./JoinCommunities";

// import { users as initialUsers } from '../constents/constents';

// export default function ProfilePage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const toggleSidebar = () => setIsSidebarOpen((s) => !s);
//  const [user, setUser] = useState(initialUsers[0]);


//   // updater that merges partial updates
//   const updateUser = (patch) => {
//     setUser((prev) => ({ ...prev, ...patch }));
//   };

//   return (
 
// <div className=" bg-[#070C11] flex min-h-screen overflow-y-auto custom-scroll flex-col">
//   {/* Main body */}
//   <div className="flex flex-1 px-10 flex-col md:flex-row transition-all duration-300">
    
//     {/* Left / Profile Section */}
//     <section
//       className={`rounded-lg transition-all duration-300 flex flex-col px-4 md:px-6
//         ${isSidebarOpen ? "md:basis-2/3" : "md:basis-3/4"} w-full`}
//     >
//       <ProfileHeader user={user} onUpdateUser={updateUser} />
//       <DesignerProfile />
//     </section>

//     {/* Right Sidebar */}
//     <aside
//       className={`rounded-lg transition-all duration-300 px-4 md:px-6
//         ${isSidebarOpen ? "md:basis-1/3" : "md:basis-1/4"} w-full md:w-auto mt-6 md:mt-0`}
//     >
//       <div className="space-y-3">
//         <ProfileAnalytics />
//         <PeopleYouMayKnow />
//         <PeopleYouMayKnow users={initialUsers} currentUserId={user.id} />
//       </div>
//     </aside>
//   </div>
// </div>


//   );
// }


// // app/profile/page.jsx
// "use client";
// import React, { useState } from "react";
// // import ProfileHeader from "./ProfileHeader";
// import DesignerProfile from "./DesignerProfile";
// import ProfileAnalytics from "./ProfileAnalytics";
// import PeopleYouMayKnow from "./PeopleYouMayKnow";
// import JoinCommunities from "./JoinCommunities";
// import ProfileHeader from './Profileheader'
// import { users as initialUsers } from "../constents/constents";

// export default function ProfilePage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const toggleSidebar = () => setIsSidebarOpen((s) => !s);
//   const [user, setUser] = useState(initialUsers[0]);

//   // updater that merges partial updates
//   const updateUser = (patch) => {
//     setUser((prev) => ({ ...prev, ...patch }));
//   };

//   return (
//     <div className="bg-[#070C11] flex min-h-screen overflow-y-auto custom-scroll flex-col">
//       <div className="flex flex-1 px-10 flex-col md:flex-row transition-all duration-300">
//         {/* Left / Profile Section */}
//         <section
//           className={`rounded-lg transition-all duration-300 flex flex-col px-4 md:px-6
//             ${isSidebarOpen ? "md:basis-2/3" : "md:basis-3/4"} w-full`}
//         >
//           <ProfileHeader user={user} onUpdateUser={updateUser} />
//           <DesignerProfile />
//         </section>

//         {/* Right Sidebar */}
//         <aside
//           className={`rounded-lg transition-all duration-300 px-4 md:px-6
//             ${isSidebarOpen ? "md:basis-1/3" : "md:basis-1/4"} w-full md:w-auto mt-6 md:mt-0`}
//         >
//           <div className="space-y-3">
//             <ProfileAnalytics />
//             {/* pass full users list so component can build links */}
//             <PeopleYouMayKnow users={initialUsers} currentUserId={user.id} />
//             <JoinCommunities />
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import DesignerProfile from "./DesignerProfile";
import ProfileAnalytics from "./ProfileAnalytics";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import JoinCommunities from "./JoinCommunities";
import ProfileHeader from "./Profileheader"; // ✅ corrected import case
import { users as initialUsers } from "../constents/constents";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(initialUsers[0]);

  // updater that merges partial updates
  const updateUser = (patch) => {
    setUser((prev) => ({ ...prev, ...patch }));
  };

  return (
    <div className="bg-[#070C11] flex min-h-screen overflow-y-auto custom-scroll flex-col">
      <div className="flex flex-1 px-10 flex-col md:flex-row transition-all duration-300">
        
        {/* Left / Profile Section */}
        <section
          className={`rounded-lg transition-all duration-300 flex flex-col px-4 md:px-6
            ${isSidebarOpen ? "md:basis-2/3" : "md:basis-3/4"} w-full`}
        >
          {/* ✅ pass profileUser instead of user */}
          <ProfileHeader profileUser={user} onUpdateUser={updateUser} />
          <DesignerProfile />
        </section>

        {/* Right Sidebar */}
        <aside
          className={`rounded-lg transition-all duration-300 px-4 md:px-6
            ${isSidebarOpen ? "md:basis-1/3" : "md:basis-1/4"} w-full md:w-auto mt-6 md:mt-0`}
        >
          <div className="space-y-3">
            <ProfileAnalytics />
            <PeopleYouMayKnow users={initialUsers} currentUserId={user.id} />
            <JoinCommunities />
          </div>
        </aside>
      </div>
    </div>
  );
}
