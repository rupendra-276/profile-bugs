
// // components/ProfileTopSection.jsx old wala
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { RiCameraAiLine, RiEditBoxLine } from "react-icons/ri";
// import Button from '../components/Button';
// import { Buttonborder } from "../components/Button";
// import ContactInfoModal from './ContactInfoModal'
// import Modal from "../components/Modal";

// export default function ProfileTopSection({ user, onUpdateUser }) {


//   const [cover, setCover] = useState(user?.cover || user?.cover || "");
//   const [avatar, setAvatar] = useState(user?.avatar || user?.avatar || "");
//   const coverInputRef = useRef(null);
//   const avatarInputRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     setCover(user?.cover || user?.cover || "");
//     setAvatar(user?.avatar || user?.avatar || "");
//   }, [user]);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     if (type === "cover") {
//       setCover(url);
//       onUpdateUser?.({ cover: url });
//     } else if (type === "avatar") {
//       setAvatar(url);
//       onUpdateUser?.({ avatar: url });
//     }
//   };
//     const handleSaveContactInfo = (updatedInfo) => {
//     // user state update karwa dete hain
//     onUpdateUser?.(updatedInfo);
//     setIsModalOpen(false); // modal close
//   };

//   return (
//     <div className="relative">
//       {/* Cover */}
//       <div className="relative overflow-hidden w-full h-32 md:h-[176px] rounded-[30px] border border-gray-400 bg-[#10151B] group">
//         {cover ? (
//           <img
//             src={cover}
//             alt="Cover"
//             className="h-full w-full object-cover rounded-[30px]"
//           />
//         ) : (
//           <div className="h-full w-full bg-[#10151B] rounded-[30px]" />
//         )}

//         {/* Cover Button */}
//         <div
//           className={`absolute ${
//             !cover
//               ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//               : ""
//           }`}
//           onClick={() => coverInputRef.current.click()}
//         >
//           <div className="bg-[#10151Baa] p-2 rounded-full cursor-pointer hover:scale-105 transition">
//             {!cover && (
//               <RiCameraAiLine className="text-white text-xl" />

//             ) }
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             ref={coverInputRef}
//             onChange={(e) => handleFileChange(e, "cover")}
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* Avatar */}
//       <div className="absolute z-30 -bottom-12 left-8 md:left-14 w-24 h-24 md:w-[112px] md:h-[112px] rounded-[30px] border-2 border-gray-400 bg-[#10151B] group overflow-hidden">
//         {avatar ? (
//           <img
//             src={avatar}
//             alt="Avatar"
//             className="w-full h-full object-cover rounded-[30px]"
//           />
//         ) : (
//           <div className="w-full h-full bg-[#10151B] rounded-[30px]" />
//         )}

//         {/* Avatar Button */}
//         {!avatar && (
//   <div
//     className="absolute inset-0 flex justify-center items-center transition"
//     onClick={() => avatarInputRef.current.click()}
//   >
//     <div className="bg-[#10151B] p-2 rounded-full cursor-pointer">
//       <RiCameraAiLine className="text-white text-xl" />
//     </div>
//     <input
//       type="file"
//       accept="image/*"
//       ref={avatarInputRef}
//       onChange={(e) => handleFileChange(e, "avatar")}
//       className="hidden"
//     />
//   </div>
// )}


//       </div>
//       {/* enhench button */}
    
  

//      <div className="text-end mt-5 absolute right-0">
//         <Buttonborder
//           onClick={() => setIsModalOpen(true)}
//           name="Enhance Profile"
//         />
//       </div>

//       {/* Contact Info Modal */}
//       <ContactInfoModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         user={user}
//         onSave={handleSaveContactInfo}
//       />
//     </div>
    
//   );
// }






// // app/profile/ProfileTopSection.jsx new wala
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { RiCameraAiLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../store/userSlice";
// import { Buttonborder } from "../components/Button";
// import ContactInfoModal from "./ContactInfoModal";

// export default function ProfileTopSection({ user }) {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((s) => s.users.currentUser);
//   const isOwner = currentUser?.id === user?.id;

//   const [cover, setCover] = useState(user?.cover || user?.cover || "");
//   const [avatar, setAvatar] = useState(user?.avatar || user?.avatar || "");
//   const coverInputRef = useRef(null);
//   const avatarInputRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     setCover(user?.cover || user?.cover || "");
//     setAvatar(user?.avatar || user?.avatar || "");
//   }, [user]);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);

//     if (type === "cover") {
//       setCover(url);
//       // update currentUser (merge)
//       if (isOwner) dispatch(updateUser({ cover: url, cover: url }));
//     } else {
//       setAvatar(url);
//       if (isOwner) dispatch(updateUser({ avatar: url, avatar: url }));
//     }
//   };

//   const handleSaveContactInfo = (updatedInfo) => {
//     if (isOwner) dispatch(updateUser(updatedInfo));
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="relative">
//       {/* Cover */}
//       <div className="relative overflow-hidden w-full h-32 md:h-[176px] rounded-[12px] border border-gray-400 bg-[#10151B] group">
//         {cover ? (
//           <img src={cover} alt="Cover" className="h-full w-full object-cover rounded-[12px]" />
//         ) : (
//           <div className="h-full w-full bg-[#10151B] rounded-[12px]" />
//         )}

//         {/* only owner can click to upload */}
//         {isOwner && (
//           <div
//             className={`absolute ${!cover ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "top-2 right-2"}`}
//             onClick={() => coverInputRef.current?.click()}
//           >
//             <div className="bg-[#00000066] p-2 rounded-full cursor-pointer hover:scale-105 transition">
//               <RiCameraAiLine className="text-white text-xl" />
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               ref={coverInputRef}
//               onChange={(e) => handleFileChange(e, "cover")}
//               className="hidden"
//             />
//           </div>
//         )}
//       </div>

//       {/* Avatar */}
//       <div className="absolute z-30 -bottom-12 left-4 md:left-8 w-20 h-20 md:w-24 md:h-24 rounded-[12px] border-2 border-gray-400 bg-[#10151B] group overflow-hidden">
//         <img
//           src={avatar || "/default-avatar.png"}
//           alt="Avatar"
//           className="w-full h-full object-cover rounded-[12px]"
//         />

//         {isOwner && (
//           <>
//             <div
//               className="absolute inset-0 flex justify-center items-center transition cursor-pointer"
//               onClick={() => avatarInputRef.current?.click()}
//             >
//               <div className="bg-[#00000066] p-2 rounded-full">
//                 <RiCameraAiLine className="text-white text-xl" />
//               </div>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               ref={avatarInputRef}
//               onChange={(e) => handleFileChange(e, "avatar")}
//               className="hidden"
//             />
//           </>
//         )}
//       </div>

//       {/* Enhance Button */}
//       {isOwner && (
//         <div className="text-end mt-5 absolute right-0">
//           <Buttonborder onClick={() => setIsModalOpen(true)} name="Enhance Profile" />
//         </div>
//       )}

//       {/* Contact Info Modal */}
//       {/* pass user only if needed; modal will fallback to currentUser if user not provided */}
//       <ContactInfoModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         user={user}
//         onSave={handleSaveContactInfo}
//       />
//     </div>
//   );
// }



// app/profile/ProfileTopSection.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import { Buttonborder } from "../components/Button";
import ContactInfoModal from "./ContactInfoModal";

export default function ProfileTopSection({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users.currentUser);
  const isOwner = currentUser?.id === user?.id;

  const [cover, setCover] = useState( user?.cover || "");
  const [avatar, setAvatar] = useState( user?.avatar || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    setCover(user?.cover || user?.cover || "");
    setAvatar(user?.avatar || user?.avatar || "");
  }, [user]);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
 if (type === "cover") {
  setCover(url);
  if (isOwner) dispatch(updateUser({ cover: url }));
} else {
  setAvatar(url);
  if (isOwner) dispatch(updateUser({ avatar: url }));
}
  };

  const handleSaveContactInfo = (updatedInfo) => {
    if (isOwner) dispatch(updateUser(updatedInfo));
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Cover */}
      <div className="relative overflow-hidden w-full h-32 md:h-[176px] rounded-[30px] border border-gray-400 bg-[#10151B] group">
        {cover ? (
          <img src={cover} alt="Cover" className="h-full w-full object-cover rounded-[30px]" />
        ) : (
          <div className="h-full w-full bg-[#10151B] rounded-[30px]" />
        )}

        {isOwner && (
          <div
            className={`absolute ${
              !cover
                && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                
            }`}
            onClick={() => coverInputRef.current?.click()}
          >
            <div className="bg-[#10151Baa] p-2 rounded-full cursor-pointer hover:scale-105 transition">
              <RiCameraAiLine className="text-white text-xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, "cover")}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="absolute z-30 -bottom-12 left-8 md:left-14 w-24 h-24 md:w-[112px] md:h-[112px] rounded-[30px] border-2 border-gray-400 bg-[#10151B] overflow-hidden">
        <img
          src={avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-full h-full object-cover rounded-[30px]"
        />
        {isOwner &&(
          <>
           {
            !avatar &&   (
              <div>
 <div
              className="absolute inset-0 flex justify-center items-center cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <div className="bg-transparent p-2 rounded-full hover:scale-105 transition">
                <RiCameraAiLine className="text-white text-xl" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={(e) => handleFileChange(e, "avatar")}
              className="hidden"
            />
              </div>
           
           )
           } 
           

          </>
        )}
      </div>

      {/* Enhance Button */}
      {isOwner && (
        <div className="text-end mt-5 absolute right-0">
          <Buttonborder onClick={() => setIsModalOpen(true)} name="Enhance Profile" />
        </div>
      )}

      {/* Contact Info Modal */}
      <ContactInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSaveContactInfo}
      />
    </div>
  );
}
