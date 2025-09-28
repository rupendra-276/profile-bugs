"use client";
import ProfileHeader from "../profile/Profileheader";
import DesignerProfile from "../profile/DesignerProfile";
import PeopleYouMayKnow from "../profile/PeopleYouMayKnow";
import { users } from "../constents/constents";

export default function UserProfilePage({ params }) {
  const { username } = params;
  
  const user = users.find((u) => u.id === username);
console.log(user);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070C11] text-white p-6">
        <h2 className="text-xl">User not found</h2>
        <p className="text-gray-400">No profile exists for <strong>{username}</strong>.</p>
      </div>
    );
  }
console.log(username);
  return (
    <div className="bg-[#070C11] min-h-screen text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <section className="md:basis-2/3">
          {/* ProfileHeader is a client component — it's okay to render it here */}
          <ProfileHeader user={user} onUpdateUser={() => {}} />
          <DesignerProfile user={user} />
        </section>

        <aside className="md:basis-1/3 space-y-4">
          <PeopleYouMayKnow users={users} currentUserId={user.id} limit={4} />
        </aside>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setUsers, setCurrentUser } from "../store/userSlice";
// import ProfileHeader from "../profile/Profileheader";
// import DesignerProfile from "../profile/DesignerProfile";
// import PeopleYouMayKnow from "../profile/PeopleYouMayKnow";
// import { users as initialUsers } from "../constents/constents";

// export default function UserProfileClient({ username }) {
//   const dispatch = useDispatch();
//   const { users, currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(setUsers(initialUsers));
//     const foundUser = initialUsers.find((u) => u.id === username);
//     if (foundUser) {
//       dispatch(setCurrentUser(foundUser));
//     }
//   }, [username, dispatch]);

//   if (!currentUser) {
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
//         <section className="md:basis-2/3">
//           <ProfileHeader />
//           <DesignerProfile />
//         </section>

//         <aside className="md:basis-1/3 space-y-4">
//           <PeopleYouMayKnow
//             users={users}
//             currentUserId={currentUser.id}
//             limit={4}
//           />
//         </aside>
//       </div>
//     </div>
//   );
// }
