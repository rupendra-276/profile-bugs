

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { RiCameraAiLine } from "react-icons/ri";
// import { Plus } from "lucide-react";

// import Button from "../components/Button";
// import Modal from "../components/Modal";
// import ImageEditorModal from "./ImageEditorModal";

// export default function ContactInfoModal({ isOpen, onClose, user, onSave }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     headline: "",
//     location: "",
//     email: "",
//     phoneNumbers: [],
//     socialLinks: { github: "", website: "" },
//     cover: "",
//     avatar: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     phoneNumbers: [],
//     website: "",
//     cover: "",
//     avatar: "",
//   });

//   const coverInputRef = useRef(null);
//   const avatarInputRef = useRef(null);

//   // editor state
//   const [editorOpen, setEditorOpen] = useState(false);
//   const [editorMode, setEditorMode] = useState("cover"); // "cover" | "avatar"
//   const [editorImage, setEditorImage] = useState(null);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user?.name || "",
//         headline: user?.headline || "",
//         location: user?.location || "",
//         email: user?.email || "",
//         phoneNumbers: user?.phone || [],
//         socialLinks: {
//           github: user?.socialLinks?.github || "",
//           website: user?.socialLinks?.website || "",
//         },
//         cover: user?.cover || "",
//         avatar: user?.avatar || "",
//       });
//       // init phone errors array
//       setErrors((prev) => ({ ...prev, phoneNumbers: (user?.phone || []).map(() => "") }));
//     }
//   }, [user]);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     if (key === "name" && value.trim()) setErrors((p) => ({ ...p, name: "" }));
//     if (key === "location") {} // no validation
//   };

//   const handlePhoneChange = (index, value) => {
//     const updated = [...formData.phoneNumbers];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, phoneNumbers: updated }));

//     // validate phone live
//     const phoneErrs = [...(errors.phoneNumbers || [])];
//     phoneErrs[index] = validatePhone(value) ? "" : "Invalid phone number";
//     setErrors((prev) => ({ ...prev, phoneNumbers: phoneErrs }));
//   };

//   const addPhoneNumber = () => {
//     if (formData.phoneNumbers.length >= 2) return;
//     setFormData((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }));
//     setErrors((prev) => ({ ...prev, phoneNumbers: [...(prev.phoneNumbers || []), ""] }));
//   };

//   const handleSocialChange = (platform, value) =>
//     setFormData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: value } }));

//   // When user selects an image -> read as dataURL and open editor
//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // basic validation: image type + size (5MB)
//     if (!file.type.startsWith("image/")) {
//       setErrors((prev) => ({ ...prev, [type]: "Please upload a valid image file." }));
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setErrors((prev) => ({ ...prev, [type]: "File too large (max 5MB)." }));
//       return;
//     }
//     setErrors((prev) => ({ ...prev, [type]: "" }));

//     const reader = new FileReader();
//     reader.onload = () => {
//       setEditorMode(type);
//       setEditorImage(reader.result);
//       setEditorOpen(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Save from editor -> result { blob, url }
//   const handleEditorSave = (result) => {
//     if (!result || !result.url) {
//       setEditorOpen(false);
//       setEditorImage(null);
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [editorMode]: result.url }));
//     setEditorOpen(false);
//     setEditorImage(null);
//     // clear any previous errors for that image
//     setErrors((prev) => ({ ...prev, [editorMode]: "" }));
//   };

//   const handleEditorCancel = () => {
//     setEditorOpen(false);
//     setEditorImage(null);
//   };

//   const validateAll = () => {
//     const newErrors = { name: "", phoneNumbers: [], website: "", cover: "", avatar: "" };
//     // name
//     if (!formData.name || !formData.name.trim()) newErrors.name = "Name is required.";
//     else if (formData.name.trim().length < 2) newErrors.name = "Name is too short.";

//     // phones
//     newErrors.phoneNumbers = (formData.phoneNumbers || []).map((p) =>
//       p ? (validatePhone(p) ? "" : "Invalid phone number") : ""
//     );

//     // website (if provided)
//     if (formData.socialLinks?.website) {
//       try {
//         const u = new URL(formData.socialLinks.website);
//         if (!["http:", "https:"].includes(u.protocol)) newErrors.website = "Use http or https.";
//       } catch (e) {
//         newErrors.website = "Invalid website URL.";
//       }
//     }

//     // images present? (optional requirement)
//     // if you want to require cover or avatar, uncomment:
//     // if (!formData.cover) newErrors.cover = "Cover is required.";

//     setErrors(newErrors);

//     // return true if no errors
//     const hasErr =
//       newErrors.name ||
//       newErrors.website ||
//       newErrors.cover ||
//       newErrors.avatar ||
//       newErrors.phoneNumbers.some(Boolean);
//     return !hasErr;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateAll()) return;

//     // build payload
//     const payload = {
//       ...formData,
//       phone: formData.phoneNumbers,
//     };
//     onSave(payload);
//     onClose();
//   };

//   // helper phone validation
//   function validatePhone(value) {
//     if (!value) return true; // allow empty
//     // allow digits, spaces, +, -, (, )
//     const digits = value.replace(/\D/g, "");
//     if (digits.length < 7 || digits.length > 15) return false;
//     const ok = /^[+0-9()[\]\s-]+$/.test(value);
//     return ok;
//   }

//   if (!isOpen) return null;

//   return (
//     <Modal show={isOpen} onClose={onClose} title="Enhance Profile" widthClass="max-w-2xl">
//       <form onSubmit={handleSubmit} className="p-2 space-y-6">
//         {/* Cover + Avatar */}
//        <div className="relative w-full">
//   {/* Cover Image */}
//   <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden border border-gray-400 bg-[#070C11]">
//     {formData.cover ? (
//       <img
//         src={formData.cover}
//         alt="Cover"
//         className="w-full h-full object-cover"
//       />
//     ) : (
//       <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
//     )}

//     {/* Camera Icon only if NO cover */}
//     {!formData.cover && (
//       <div className="absolute inset-0 flex justify-center items-center">
//         <button
//           type="button"
//           onClick={() => coverInputRef.current.click()}
//           className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
//         >
//           <RiCameraAiLine className="text-gray-200 text-2xl" />
//         </button>
//       </div>
//     )}

//     <input
//       type="file"
//       accept="image/*"
//       ref={coverInputRef}
//       onChange={(e) => handleFileChange(e, "cover")}
//       className="hidden"
//     />
//   </div>

//   {/* Avatar Image */}
//   <div className="absolute -bottom-12 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-400 bg-[#070C11]">
//     {formData.avatar ? (
//       <img
//         src={formData.avatar}
//         alt="Avatar"
//         className="w-full h-full object-cover"
//       />
//     ) : (
//       <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
//     )}

//     {/* Camera Icon only if NO avatar */}
//     {!formData.avatar && (
//       <div className="absolute inset-0 flex justify-center items-center">
//         <button
//           type="button"
//           onClick={() => avatarInputRef.current.click()}
//           className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
//         >
//           <RiCameraAiLine className="text-gray-200 text-2xl" />
//         </button>
//       </div>
//     )}

//     <input
//       type="file"
//       accept="image/*"
//       ref={avatarInputRef}
//       onChange={(e) => handleFileChange(e, "avatar")}
//       className="hidden"
//     />
//   </div>
// </div>


//         {/* form fields */}
//         <div className="mt-16 space-y-4">
//           <div>
//             <InputWithCount placeholder="Full Name" value={formData.name} onChange={(val) => handleChange("name", val)} maxLength={50} />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           <InputWithCount placeholder="Headline" value={formData.headline} onChange={(val) => handleChange("headline", val)} maxLength={200} />

//           <InputWithCount type="email" placeholder="Email" value={formData.email} onChange={() => {}} maxLength={100} showCount={false} disabled className="bg-gray-600/40 cursor-not-allowed" />

//           <InputWithCount placeholder="Location" value={formData.location} onChange={(val) => handleChange("location", val)} maxLength={120} />

//           <div>
//             <label className="block text-sm font-medium mb-1 text-white">Phone Numbers</label>
//             {formData.phoneNumbers.map((phone, idx) => (
//               <div key={idx} className="mb-2">
//                 <InputWithCount type="tel" placeholder={`Phone ${idx + 1}`} value={phone} onChange={(val) => handlePhoneChange(idx, val)} maxLength={15} />
//                 {errors.phoneNumbers && errors.phoneNumbers[idx] && <p className="text-red-500 text-sm mt-1">{errors.phoneNumbers[idx]}</p>}
//               </div>
//             ))}
//             {formData.phoneNumbers.length < 2 && (
//               <button type="button" onClick={addPhoneNumber} className="mt-2 flex items-center text-blue-500 text-sm hover:underline">
//                 <Plus size={16} className="mr-1" /> Add Phone Number
//               </button>
//             )}
//           </div>

//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-white">Social Links</label>
//             <InputWithCount placeholder="GitHub (https://github.com/username)" value={formData.socialLinks.github} onChange={(val) => handleSocialChange("github", val)} maxLength={120} />
//             <div>
//               <InputWithCount placeholder="Website (https://yourwebsite.com)" value={formData.socialLinks.website} onChange={(val) => handleSocialChange("website", val)} maxLength={120} />
//               {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-4">
//           <Button type="button" onClick={onClose} buttonclass="bg-gray-300 text-black">Cancel</Button>
//           <Button type="submit" buttonclass="!bg-blue-600 text-white">Save</Button>
//         </div>
//       </form>

//       {/* Image Editor Modal */}
//       <ImageEditorModal
//         show={editorOpen}
//         onClose={handleEditorCancel}
//         image={editorImage}
//         onSave={handleEditorSave}
//         mode={editorMode === "avatar" ? "avatar" : "cover"}
//       />
//     </Modal>
//   );
// }


// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { RiCameraAiLine } from "react-icons/ri";
// import { Plus } from "lucide-react";
// import { InputWithCount } from "../components/FormInput";
// import Button from "../components/Button";
// import Modal from "../components/Modal";
// import ImageEditorModal from "./ImageEditorModal";
// import { RxCross1 } from "react-icons/rx";

// export default function ContactInfoModal({ isOpen, onClose, user, onSave }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     headline: "",
//     location: "",
//     email: "",
//     phoneNumbers: [],
//     socialLinks: { github: "", website: "" },
//     cover: "",
//     avatar: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     location: "",
//     phoneNumbers: [],
//     website: "",
//     cover: "",
//     avatar: "",
//   });

//   const coverInputRef = useRef(null);
//   const avatarInputRef = useRef(null);

//   // editor state
//   const [editorOpen, setEditorOpen] = useState(false);
//   const [editorMode, setEditorMode] = useState("cover"); // "cover" | "avatar"
//   const [editorImage, setEditorImage] = useState(null);

//   // load existing user data if editing
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user?.name || "",
//         headline: user?.headline || "",
//         location: user?.location || "",
//         email: user?.email || "",
//         phoneNumbers: user?.phone || [],
//         socialLinks: {
//           github: user?.socialLinks?.github || "",
//           website: user?.socialLinks?.website || "",
//         },
//         cover: user?.cover || "",
//         avatar: user?.avatar || "",
//       });
//       // init phone errors array
//       setErrors((prev) => ({
//         ...prev,
//         phoneNumbers: (user?.phone || []).map(() => ""),
//       }));
//     }
//   }, [user]);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     if (key === "name" && value.trim())
//       setErrors((p) => ({ ...p, name: "" }));
//     if (key === "location" && value.trim())
//       setErrors((p) => ({ ...p, location: "" }));
//   };

//   // phone input handling
//   const handlePhoneChange = (index, value) => {
//     const updated = [...formData.phoneNumbers];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, phoneNumbers: updated }));

//     // validate phone live
//     const phoneErrs = [...(errors.phoneNumbers || [])];
//     phoneErrs[index] = validatePhone(value)
//       ? ""
//       : "Invalid phone number (must be 10 digits or valid international format)";
//     setErrors((prev) => ({ ...prev, phoneNumbers: phoneErrs }));
//   };

//   // add max 2 phones
//   const addPhoneNumber = () => {
//     if (formData.phoneNumbers.length >= 2) return;
//     setFormData((prev) => ({
//       ...prev,
//       phoneNumbers: [...prev.phoneNumbers, ""],
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       phoneNumbers: [...(prev.phoneNumbers || []), ""],
//     }));
//   };

//   const handleSocialChange = (platform, value) =>
//     setFormData((prev) => ({
//       ...prev,
//       socialLinks: { ...prev.socialLinks, [platform]: value },
//     }));

//   // file upload → editor
//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // validation: type + size
//     if (!file.type.startsWith("image/")) {
//       setErrors((prev) => ({
//         ...prev,
//         [type]: "Please upload a valid image file.",
//       }));
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setErrors((prev) => ({
//         ...prev,
//         [type]: "File too large (max 5MB).",
//       }));
//       return;
//     }
//     setErrors((prev) => ({ ...prev, [type]: "" }));

//     const reader = new FileReader();
//     reader.onload = () => {
//       setEditorMode(type);
//       setEditorImage(reader.result);
//       setEditorOpen(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleEditorSave = (result) => {
//     if (!result || !result.url) {
//       setEditorOpen(false);
//       setEditorImage(null);
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [editorMode]: result.url }));
//     setEditorOpen(false);
//     setEditorImage(null);
//     setErrors((prev) => ({ ...prev, [editorMode]: "" }));
//   };

//   const handleEditorCancel = () => {
//     setEditorOpen(false);
//     setEditorImage(null);
//   };

//   // validate whole form
//   const validateAll = () => {
//     const newErrors = {
//       name: "",
//       location: "",
//       phoneNumbers: [],
//       website: "",
//       cover: "",
//       avatar: "",
//     };

//     // name required
//     if (!formData.name || !formData.name.trim())
//       newErrors.name = "Name is required.";
//     else if (formData.name.trim().length < 2)
//       newErrors.name = "Name is too short.";

//     // location required
//     if (!formData.location || !formData.location.trim()) {
//       newErrors.location = "Location is required.";
//     }

//     // phone validation
//     newErrors.phoneNumbers = (formData.phoneNumbers || []).map((p) =>
//       p
//         ? validatePhone(p)
//           ? ""
//           : "Invalid phone number (must be 10 digits or valid international format)"
//         : ""
//     );

//     // website validation
//     if (formData.socialLinks?.website) {
//       const site = formData.socialLinks.website.trim();
//       const urlPattern =
//         /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
//       if (!urlPattern.test(site)) {
//         newErrors.website =
//           "Enter a valid website (must start with http/https).";
//       }
//     }

//     setErrors(newErrors);

//     const hasErr =
//       newErrors.name ||
//       newErrors.location ||
//       newErrors.website ||
//       newErrors.cover ||
//       newErrors.avatar ||
//       newErrors.phoneNumbers.some(Boolean);
//     return !hasErr;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateAll()) return;

//     const payload = {
//       ...formData,
//       phone: formData.phoneNumbers,
//     };
//     onSave(payload);
//     onClose();
//   };

//   // ✅ Final phone validation
//  function validatePhone(value) {
//   if (!value) return false; // empty phone not allowed

//   // remove all non-digit characters
//   const digits = value.replace(/\D/g, "");

//   // check min 10 digits, max 15 digits
//   if (digits.length < 10 || digits.length > 15) return false;

//   // allow only digits, +, -, (, ), spaces
//   const pattern = /^[+0-9()\-\s]+$/;
//   return pattern.test(value);
// }

//   if (!isOpen) return null;

//   return (
//     <Modal
//       show={isOpen}
//       onClose={onClose}
//       title="Enhance Profile"
//       widthClass="max-w-2xl"
//     >
//       <form onSubmit={handleSubmit} className="p-2 space-y-6">
//         {/* Cover + Avatar */}
//         <div className="relative w-full">
//           {/* Cover */}
//           <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden border border-gray-400 bg-[#070C11]">
//             {formData.cover ? (
//               <img
//                 src={formData.cover}
//                 alt="Cover"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
//             )}

//             {formData.cover ? (
//               <div className="absolute inset-0 flex justify-center items-center">
//                 <button
//                   type="button"
//                   onClick={() => coverInputRef.current.click()}
//                   className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
//                 >
//                   <RiCameraAiLine className="text-gray-200 text-2xl" />
//                 </button>
//               </div>
//             ): (
//               <div className="absolute inset-0 flex justify-center items-center">
//                 <button
//                   type="button"
//                   onClick={() => coverInputRef.current.click()}
//                   className=" rounded-full p-2  transition"
//                 >
//                   <RiCameraAiLine className="text-gray-200 text-2xl" />
//                 </button>
//                  <button
//                   type="button"
//                   onClick={() => coverInputRef.current.click()}
//                   className=" rounded-full p-2 hover:bg-black/70 transition"
//                 >
//                   <RxCross1 className="text-gray-200 text-2xl" />
//                 </button>
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               ref={coverInputRef}
//               onChange={(e) => handleFileChange(e, "cover")}
//               className="hidden"
//             />
//           </div>
//           {errors.cover && (
//             <p className="text-red-500 text-sm mt-1">{errors.cover}</p>
//           )}

//           {/* Avatar */}
//           <div className="absolute -bottom-12 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-400 bg-[#070C11]">
//             {formData.avatar ? (
//               <img
//                 src={formData.avatar}
//                 alt="Avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
//             )}

//             {formData.avatar && (
//               <div className="absolute inset-0 flex justify-center items-center">
//                 <button
//                   type="button"
//                   onClick={() => avatarInputRef.current.click()}
//                   className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
//                 >
//                   <RiCameraAiLine className="text-gray-200 text-2xl" />
//                 </button>
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               ref={avatarInputRef}
//               onChange={(e) => handleFileChange(e, "avatar")}
//               className="hidden"
//             />
//           </div>
//           {errors.avatar && (
//             <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
//           )}
//         </div>

//         {/* Form Fields */}
//         <div className="mt-16 space-y-4">
//           <InputWithCount
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={(val) => handleChange("name", val)}
//             maxLength={50}
//             error={errors.name}
//           />

//           <InputWithCount
//             placeholder="Headline"
//             value={formData.headline}
//             onChange={(val) => handleChange("headline", val)}
//             maxLength={200}
//           />

//           <InputWithCount
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={() => {}}
//             maxLength={100}
//             disabled
//             className="bg-gray-600/40 cursor-not-allowed"
//           />

//           <InputWithCount
//             placeholder="Location"
//             value={formData.location}
//             onChange={(val) => handleChange("location", val)}
//             maxLength={120}
//             error={errors.location}
//           />

//           {/* Phone Numbers */}
//           <div>
//             <label className="block text-sm font-medium mb-1 text-white">
//               Phone Numbers
//             </label>
//             {formData.phoneNumbers.map((phone, idx) => (
//               <div key={idx} className="mb-2">
//                 <InputWithCount
//                   type="tel"
//                   placeholder={`Phone ${idx + 1}`}
//                   value={phone}
//                   onChange={(val) => {
//                     const clean = val.replace(/[^0-9+\-\s()]/g, "");
//                     handlePhoneChange(idx, clean);
//                   }}
//                   maxLength={20}
//                   error={errors.phoneNumbers && errors.phoneNumbers[idx]}
//                 />
//               </div>
//             ))}
//             {formData.phoneNumbers.length < 2 && (
//               <button
//                 type="button"
//                 onClick={addPhoneNumber}
//                 className="mt-2 flex items-center text-blue-500 text-sm hover:underline"
//               >
//                 <Plus size={16} className="mr-1" /> Add Phone Number
//               </button>
//             )}
//           </div>

//           {/* Social Links */}
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-white">
//               Social Links
//             </label>
//             <InputWithCount
//               placeholder="GitHub (https://github.com/username)"
//               value={formData.socialLinks.github}
//               onChange={(val) => handleSocialChange("github", val)}
//               maxLength={120}
//             />
//             <div>
//               <InputWithCount
//                 placeholder="Website (https://yourwebsite.com)"
//                 value={formData.socialLinks.website}
//                 onChange={(val) => handleSocialChange("website", val)}
//                 maxLength={120}
//                 error={errors.website}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             onClick={onClose}
//             buttonclass="bg-gray-300 text-black"
//           >
//             Cancel
//           </Button>
//           <Button type="submit" buttonclass="!bg-blue-600 text-white">
//             Save
//           </Button>
//         </div>
//       </form>

//       {/* Image Editor Modal */}
//       <ImageEditorModal
//         show={editorOpen}
//         onClose={handleEditorCancel}
//         image={editorImage}
//         onSave={handleEditorSave}
//         mode={editorMode === "avatar" ? "avatar" : "cover"}
//       />
//     </Modal>
//   );
// }


"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { Plus } from "lucide-react";
import { InputWithCount } from "../components/FormInput";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ImageEditorModal from "./ImageEditorModal";
import { RxCross1 } from "react-icons/rx";

export default function ContactInfoModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    email: "",
    phoneNumbers: [],
    socialLinks: { github: "", website: "" },
    cover: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    location: "",
    phoneNumbers: [],
    website: "",
    github: "",
    cover: "",
    avatar: "",
  });

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState("cover"); // "cover" | "avatar"
  const [editorImage, setEditorImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        headline: user?.headline || "",
        location: user?.location || "",
        email: user?.email || "",
        phoneNumbers: user?.phone || [],
        socialLinks: {
          github: user?.socialLinks?.github || "",
          website: user?.socialLinks?.website || "",
        },
        cover: user?.cover || "",
        avatar: user?.avatar || "",
      });
      setErrors((prev) => ({
        ...prev,
        phoneNumbers: (user?.phone || []).map(() => ""),
      }));
    }
  }, [user]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && value.trim()) setErrors((p) => ({ ...p, name: "" }));
    if (key === "location" && value.trim())
      setErrors((p) => ({ ...p, location: "" }));
    if (key === "cover" && value === "") setErrors((p) => ({ ...p, cover: "" }));
    if (key === "avatar" && value === "") setErrors((p) => ({ ...p, avatar: "" }));
  };

  // Phone handling
  const handlePhoneChange = (index, value) => {
    const updated = [...formData.phoneNumbers];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: updated }));

    const phoneErrs = [...(errors.phoneNumbers || [])];
    phoneErrs[index] = value ? (validatePhone(value) ? "" : "Invalid phone number") : "";
    setErrors((prev) => ({ ...prev, phoneNumbers: phoneErrs }));
  };

  const addPhoneNumber = () => {
    if (formData.phoneNumbers.length >= 2) return;
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
    setErrors((prev) => ({
      ...prev,
      phoneNumbers: [...(prev.phoneNumbers || []), ""],
    }));
  };

  const handleSocialChange = (platform, value) =>
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));

  // file upload → editor
  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [type]: "Please upload a valid image file." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "File too large (max 5MB)." }));
      return;
    }
    setErrors((prev) => ({ ...prev, [type]: "" }));

    const reader = new FileReader();
    reader.onload = () => {
      setEditorMode(type);
      setEditorImage(reader.result);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleEditorSave = (result) => {
    if (!result || !result.url) {
      setEditorOpen(false);
      setEditorImage(null);
      return;
    }
    setFormData((prev) => ({ ...prev, [editorMode]: result.url }));
    setEditorOpen(false);
    setEditorImage(null);
    setErrors((prev) => ({ ...prev, [editorMode]: "" }));
  };

  const handleEditorCancel = () => {
    setEditorOpen(false);
    setEditorImage(null);
  };

  // New: remove cover
  const removeCover = () => {
    setFormData((prev) => ({ ...prev, cover: "" }));
    setErrors((prev) => ({ ...prev, cover: "" }));
  };
const removeAvtar = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
    setErrors((prev) => ({ ...prev, avatar: "" }));
  };

  
  // Validation helpers
  function validatePhone(value) {
    if (!value) return false; // caller should handle empty as "no input"
    // strip common separators but keep leading +
    const trimmed = value.trim();
    // if starts with + => international
    if (trimmed.startsWith("+")) {
      const digits = trimmed.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    } else {
      // allow formats like (123) 456-7890 etc but count digits
      const digits = trimmed.replace(/\D/g, "");
      // Accept exactly 10 digits for local numbers only
      return digits.length === 10;
    }
  }

  function isValidWebsite(url) {
    if (!url) return true;
    const site = url.trim();
    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return urlPattern.test(site);
  }

 function isValidGithub(input) {
  if (!input) return false;
  const s = input.trim();

  // ✅ must start with https://github.com/, http://github.com/, or github.com/
  const urlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/;

  return urlPattern.test(s);
}

  const validateAll = () => {
    const newErrors = {
      name: "",
      location: "",
      phoneNumbers: [],
      website: "",
      github: "",
      cover: "",
      avatar: "",
    };

    if (!formData.name || !formData.name.trim())
      newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name is too short.";

    if (!formData.location || !formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    newErrors.phoneNumbers = (formData.phoneNumbers || []).map((p) =>
      p ? (validatePhone(p) ? "" : "Invalid phone number") : ""
    );

    // website must start with http/https
    if (formData.socialLinks?.website) {
      if (!isValidWebsite(formData.socialLinks.website)) {
        newErrors.website = "Enter a valid website (must start with http/https).";
      }
    }

    // github validation
    if (formData.socialLinks?.github) {
      if (!isValidGithub(formData.socialLinks.github)) {
        newErrors.github = "Enter a valid GitHub username or URL.";
      }
    }

    setErrors(newErrors);

    const hasErr =
      newErrors.name ||
      newErrors.location ||
      newErrors.website ||
      newErrors.github ||
      newErrors.cover ||
      newErrors.avatar ||
      newErrors.phoneNumbers.some(Boolean);

    return !hasErr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      ...formData,
      phone: formData.phoneNumbers,
    };
    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      title="Enhance Profile"
      widthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="p-2  space-y-6">
        {/* Cover + Avatar */} 
        <div className="relative w-full">
          {/* Cover */}
          <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden border border-gray-400 bg-[#070C11]">
            {formData.cover ? (
              <img
                src={formData.cover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
            )}

            {/* When cover exists: show camera + remove. When not exists: show only camera */}
            <div className="absolute inset-0 flex justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => coverInputRef.current.click()}
                className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
                aria-label="Edit cover"
              >
                <RiCameraAiLine className="text-gray-200 text-2xl" />
              </button>

              {formData.cover && (
                <button
                  type="button"
                  onClick={removeCover}
                  className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
                  aria-label="Remove cover"
                >
                  <RxCross1 className="text-gray-200 text-2xl" />
                </button>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, "cover")}
              className="hidden"
            />
          </div>
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">{errors.cover}</p>
          )}

          {/* Avatar */}
          <div className="absolute -bottom-12 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-400 bg-[#070C11]">
  {formData.avatar ? (
    <img
      src={formData.avatar}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400"></div>
  )}

  {/* Avatar action buttons */}
  <div className="absolute inset-0 flex justify-center items-center gap-2">
    {/* Re-upload button */}
    <button
      type="button"
      onClick={() => avatarInputRef.current.click()}
      className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
      aria-label="Edit avatar"
    >
      <RiCameraAiLine className="text-gray-200 text-xl" />
    </button>

    {/* Remove button (only if avatar exists) */}
    {formData.avatar && (
      <button
        type="button"
        onClick={removeAvtar}
        className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
        aria-label="Remove avatar"
      >
        <RxCross1 className="text-gray-200 text-xl" />
      </button>
    )}
  </div>

  <input
    type="file"
    accept="image/*"
    ref={avatarInputRef}
    onChange={(e) => handleFileChange(e, "avatar")}
    className="hidden"
  />
</div>
{errors.avatar && (
  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
)}
        </div>
        

        {/* Form Fields */}
        <div className="mt-16 space-y-4">
          <InputWithCount
            placeholder="Full Name"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
            maxLength={50}
            error={errors.name}
          />

          <InputWithCount
            placeholder="Headline"
            value={formData.headline}
            onChange={(val) => handleChange("headline", val)}
            maxLength={200}
          />

          <InputWithCount
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={() => {}}
            maxLength={100}
            disabled
            className="bg-gray-600/40 cursor-not-allowed"
          />

          <InputWithCount
            placeholder="Location"
            value={formData.location}
            onChange={(val) => handleChange("location", val)}
            maxLength={120}
            error={errors.location}
          />

          {/* Phone Numbers */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Phone Numbers
            </label>
            {formData.phoneNumbers.map((phone, idx) => (
              <div key={idx} className="mb-2">
                <InputWithCount
                  type="tel"
                  placeholder={`Phone ${idx + 1}`}
                  value={phone}
                  onChange={(val) => {
                    // allow + and digits and separators
                    const clean = val.replace(/[^0-9+\-\s()]/g, "");
                    handlePhoneChange(idx, clean);
                  }}
                  maxLength={20}
                  error={errors.phoneNumbers && errors.phoneNumbers[idx]}
                />
              </div>
            ))}
            {formData.phoneNumbers.length < 2 && (
              <button
                type="button"
                onClick={addPhoneNumber}
                className="mt-2 flex items-center text-blue-500 text-sm hover:underline"
              >
                <Plus size={16} className="mr-1" /> Add Phone Number
              </button>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">
              Social Links
            </label>
            <InputWithCount
              placeholder="GitHub (username or https://github.com/username)"
              value={formData.socialLinks.github}
              onChange={(val) => {
                handleSocialChange("github", val);
                if (val && isValidGithub(val)) setErrors((p) => ({ ...p, github: "" }));
              }}
              maxLength={120}
              error={errors.github}
            />
            <div>
              <InputWithCount
                placeholder="Website (https://yourwebsite.com)"
                value={formData.socialLinks.website}
                onChange={(val) => {
                  handleSocialChange("website", val);
                  if (val && isValidWebsite(val)) setErrors((p) => ({ ...p, website: "" }));
                }}
                maxLength={120}
                error={errors.website}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bg-[#10151B] right-0 -bottom-5 py-2">
       <div className="flex   justify-end gap-3 mb-2">
          <Button
            type="button"
            onClick={onClose}
            buttonclass="bg-gray-300 text-black"
          >
            Cancel
          </Button>
          <Button type="submit" buttonclass="!bg-blue-600 text-white">
            Save
          </Button>
        </div>
        </div>
      
      </form>

      {/* Image Editor Modal */}
      <ImageEditorModal
        show={editorOpen}
        onClose={handleEditorCancel}
        image={editorImage}
        onSave={handleEditorSave}
        mode={editorMode === "avatar" ? "avatar" : "cover"}
      />
    </Modal>
  );
}
