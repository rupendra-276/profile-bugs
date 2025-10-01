

// // components/PeopleYouMayKnow.jsx
// "use client";
// import React, { useState } from "react";
// import Button from "../components/Button";

// function ProfileAvatar({ name, image }) {
//   const [imgError, setImgError] = useState(false);

//   if (!image || imgError) {
//     return (
//       <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-full">
//         {name ? name.charAt(0).toUpperCase() : "?"}
//       </div>
//     );
//   }

//   return (
//     // using native <img> to avoid Next image config complexity for dynamic blobs
//     <img
//       src={image}
//       alt={name}
//       width={60}
//       height={60}
//       className="rounded-full w-[60px] h-[60px] object-cover border"
//       onError={() => setImgError(true)}
//     />
//   );
// }

// export default function PeopleYouMayKnow({ users = [], currentUserId = null }) {
//   // show all users except current user
//   const suggestions = users.filter((u) => u.id !== currentUserId);

//   return (
//     <div className="p-5 bg-[#10151B] border rounded-[30px] border-gray-400 pr-2">
//       <div className="flex justify-between my-2">
//         <h2 className="text-white font-semibold text-lg">Profile Analytics</h2>
//         <a href="/#" className="text-blue-700 font-medium hover:underline">View All</a>
//       </div>

//       <div className="space-y-5">
//         {(suggestions.length ? suggestions : users).slice(0, 3).map((person, idx) => (
//           <div key={person.id ?? idx}>
//             <div className="flex items-center gap-3">
//               <ProfileAvatar name={person.name} image={person.avatar || person.avatar} />
//               <div>
//                 <h4 className="font-semibold text-white">{person.name}</h4>
//                 <p className="text-sm text-gray-100">{person.headline || person.role}</p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <div className="flex -space-x-2">
//                     {/* mutual connections placeholders */}
//                     <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white text-xs flex items-center justify-center text-gray-600">A</div>
//                     <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white text-xs flex items-center justify-center text-gray-600">B</div>
//                     <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white text-xs flex items-center justify-center text-gray-600">C</div>
//                   </div>
//                   <p className="text-xs text-gray-200">3 mutual connections</p>
//                 </div>
//               </div>
//             </div>

//             <Button icon={null} showIcon buttonclass="!w-full !justify-center mt-4 text-white">
//               Connect
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// app/profile/PeopleYouMayKnow.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Buttonborder } from "../components/Button";
import LinkButton from "../button/Button";

function ProfileAvatar({ name, image }) {
  const [imgError, setImgError] = useState(false);

  if (!image || imgError) {
    return (
      <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-full">
        {name ? name.charAt(0).toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      width={60}
      height={60}
      className="rounded-full w-[60px] h-[60px] object-cover border"
      onError={() => setImgError(true)}
    />
  );
}

// export default function PeopleYouMayKnow({ users = [], currentUserId = null, limit = 4 }) {
//   // show all users except current user
//   const suggestions = (users && users.length ? users : []).filter((u) => u.id !== currentUserId);
//   const list = suggestions.slice(0, limit);
//   const [showFullContent, setShowFullContent] = useState(false);  
//   console.log("PeopleYouMayKnow users:", users);
//   return (
//     <div className="p-5 bg-[#10151B] border rounded-[30px] border-gray-400 pr-2">
//       <div className="flex justify-between my-2">
//         <h2 className="text-white font-semibold text-lg">People You May Know</h2>
//         <Link href="/people" className="text-blue-700 font-medium hover:underline">
//           View All
//         </Link>
//       </div>

//       <div className="space-y-5">
//         {list.map((person) => (
//           <div key={person.id} className="border-b border-gray-800 pb-4">
//             <div className="flex items-center gap-3">
//               {/* Avatar + name clickable -> navigates to /:username */}
//               <Link href={`/${person.username}`} className="flex items-center gap-3">
//                 <ProfileAvatar name={person.name} image={person.avatar || person.avatar} />
//                 <div>
//                   <h4 className="font-semibold text-white hover:underline">{person.name}</h4>
//                   <p className="text-sm text-gray-100">{person.headline || ""}</p>
//                 </div>
//               </Link>
//             </div>
          
//             <p className="text-gray-200 mb-3">
//         {(person.about || "").length > 100 && !showFullContent && (
//           <Link
//             className="ml-2 text-blue-400 hover:underline"
//           >
//             more
//           </Link>
//         )}
//       </p>

//             <div className="mt-3 flex  gap-2">
//               <Buttonborder classNameborder="!w-full" name="+ Follow" />              {/* simple connect button (replace with your Button component if you want) */}
//               <Buttonborder classNameborder="!w-full" name="Collab" />              {/* simple connect button (replace with your Button component if you want) */}
            
//             </div>
//           </div>
//         ))}

//         {list.length === 0 && (
//           <p className="text-sm text-gray-400">No suggestions yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }





export default function PeopleYouMayKnow({ users = [], currentUserId = null, limit = 4 }) {

  const suggestions = (users && users.length ? users : []).filter((u) => u.id !== currentUserId);
  const list = suggestions.slice(0, limit);
  const [showFullContent, setShowFullContent] = useState(false);  


  return (
    <div className="p-5 bg-[#10151B] border rounded-[30px] border-gray-400 pr-2">
        <h2 className="text-white font-semibold text-[20px] my-2">People You May Know</h2>
      <div className="space-y-5">
        {list.map((person) => (
          <div key={person.id} className="border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              {/* Avatar + name clickable -> navigates to /:username */}
              <Link href={`/${person.username}`} className="flex items-center gap-3">
                <ProfileAvatar name={person.name} image={person.avatar || person.avatar} />
                <div>
                  <h4 className="font-semibold text-white hover:underline">{person.name}</h4>
                  <p className="text-sm text-gray-100">{person.headline || ""}</p>
                </div>
              </Link>
            </div>
                <p className="text-gray-200 mt-2">
              {person.about && (
                <span>
                  {person.about.length > 50 ? (
                    <span className="leading-[10px]">
                      {person.about.slice(0, 50)}....
                      <Link
                        href={`/${person.username}`}
                        className="ml-2 text-blue-300  hover:underline"
                      >
                        more
                      </Link>
                    </span>
                  ) : (
                    person.about
                  )}
                </span>
              )}
            </p>


            <div className="mt-3 flex  gap-2">
              <div className="w-full md:w-[45%]">
              <Buttonborder classNameborder="w-full" name="+ Follow" />              {/* simple connect button (replace with your Button component if you want) */}
              </div>
              <div className="w-full md:w-[45%]">
              <Buttonborder classNameborder="!w-full" name="Collab" />              {/* simple connect button (replace with your Button component if you want) */}

              </div>
            
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-sm text-gray-400">No suggestions yet.</p>
        )}
      </div>
      <div className="text-center my-3">
        <LinkButton href="poeple" name="View All" />
      </div>
    </div>
  );
}
