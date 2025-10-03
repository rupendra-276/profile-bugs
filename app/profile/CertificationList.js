

// "use client";
// import Image from "next/image";
// import React from "react";
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import EmptyState from "../components/EmptyState";

// export default function CertificationList({  onAdd, onEdit, onDelete, profileUser }) {

//     const dispatch = useDispatch();
//   const currentUser = useSelector((s) => s.users?.currentUser);
//   const isOwner = currentUser?.id === profileUser?.id;
//   const certifications = currentUser?.certifications || [];
 

//   if (!certifications?.length) {
//     return (
//       <EmptyState
//         image="/Happy Girl.png" 
//         alt="certificate" 
//         message="No certifications added yet." 
//       />
//     );
//   }

//   return (
//     <div className="mt-5 ">
//       {certifications.map((c, idx) => (
//         <div key={idx} className="flex justify-between items-start gap-4">
//           <div className="text-white flex-1">
//             <h4 className="font-semibold">{c.name}</h4>
//             <p className="text-gray-300 text-sm">
//               {c.provider} • {c.issueDate.month} {c.issueDate.year}
//               {c.expiryDate?.year ? ` • Expires ${c.expiryDate.month} ${c.expiryDate.year}` : ""}
//             </p>
//             {c.certificateId && <p className="text-gray-300 text-xs mt-1">ID: {c.certificateId}</p>}
//             {c.credentialUrl && (
//               <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-sm underline">
//                 View credential
//               </a>
//             )}
// {c.media && (
//   <div className="mt-2">
//     <a
//       href={
//         typeof c.media === "string"
//           ? c.media
//           : c.media instanceof File || c.media instanceof Blob
//           ? URL.createObjectURL(c.media)
//           : "#" // fallback for invalid type
//       }
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img
//         src={
//           typeof c.media === "string"
//             ? c.media
//             : c.media instanceof File || c.media instanceof Blob
//             ? URL.createObjectURL(c.media)
//             : "/placeholder.png" // fallback image
//         }
//         alt="Certificate"
//         className="w-40 h-24 object-cover rounded-md hover:shadow-lg transition"
//       />
//     </a>
//   </div>
// )}
//           </div>

//           {/* Actions only for owner */}
//           {currentUser && (
//             <div className="flex gap-2 items-start">
//               <button onClick={() => onEdit(idx)} className="p-1 border rounded-lg border-blue-300 text-white">
//                 <CiEdit />
//               </button>
//               <button onClick={() => onDelete(idx)} className="p-1 border rounded-lg border-red-300 text-red-400">
//                 <MdDelete />
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EmptyState from "../components/EmptyState";

export default function CertificationList({ certifications, onAdd, onEdit, onDelete, profileUser }) {
  if (!certifications?.length) {
    return <EmptyState image="/Happy Girl.png" alt="certificate" message="No certifications added yet." />;
  }

  return (
    <div className="mt-5">
      {certifications.map((c, idx) => (
        <div key={c.id || idx} className="flex justify-between items-start gap-4">
          <div className="text-white flex-1">
            <h4 className="font-semibold">{c.name}</h4>
            <p className="text-gray-300 text-sm">
              {c.provider} • {c.issueDate.month} {c.issueDate.year}
              {c.expiryDate?.year ? ` • Expires ${c.expiryDate.month} ${c.expiryDate.year}` : ""}
            </p>
            {c.certificateId && <p className="text-gray-300 text-xs mt-1">ID: {c.certificateId}</p>}
            {c.credentialUrl && (
              <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-sm underline">
                View credential
              </a>
            )}
            {c.media && (
              <div className="mt-2">
                <a
                  href={typeof c.media === "string" ? c.media : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={typeof c.media === "string" ? c.media : "/placeholder.png"}
                    alt="Certificate"
                    className="w-40 h-24 object-cover rounded-md hover:shadow-lg transition"
                  />
                </a>
              </div>
            )}
          </div>

          {profileUser && (
            <div className="flex gap-2 items-start">
              <button onClick={() => onEdit(idx)} className="p-1 border rounded-lg border-blue-300 text-white">
                <CiEdit />
              </button>
              <button onClick={() => onDelete(idx)} className="p-1 border rounded-lg border-red-300 text-red-400">
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
