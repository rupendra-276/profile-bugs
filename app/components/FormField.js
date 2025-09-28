import React from "react";

export default function FormField({ label, icon, children }) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="form-label flex items-center gap-2 text-gray-300 font-medium">
          {icon && <span className="text-blue-600">{icon}</span>}
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

// import React, { useState } from "react";

// export default function FormField({
//   label,
//   icon,
//   value,
//   onChange,
//   placeholder = "",
//   maxLength = 50,   // ✅ default 50
//   type = "text",
//   showCount = true, // ✅ default true
// }) {
//   const [count, setCount] = useState(value?.length || 0);

//   const handleInputChange = (e) => {
//     let newValue = e.target.value;

//     if (newValue.length > maxLength) {
//       newValue = newValue.slice(0, maxLength); // hard stop
//     }

//     setCount(newValue.length);
//     onChange(newValue);
//   };

//   return (
//     <div className="space-y-1 w-full">
 

//       <div className="relative">
//         <input
//           type={type}
//           value={value}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           maxLength={maxLength}
//           className="w-full border border-gray-500 rounded-lg px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* ✅ Counter सिर्फ़ तभी दिखेगा जब showCount true हो */}
//         {showCount && (
//           <span className="absolute right-2 bottom-1 text-xs text-gray-400">
//             {count}/{maxLength}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }