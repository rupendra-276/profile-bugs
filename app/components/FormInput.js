
import { useState, useEffect } from "react";
import FormField from "./FormField";

// export function InputWithCount({
//   type = "text",
//   label,
//   value = "",
//   icon,
//   error,
//   onChange,
//   placeholder = "",
//   maxLength = 50,
//   showCount = true,
//   className = "",
//   ...props
// }) {
//   const [count, setCount] = useState(value?.length || 0);

//   useEffect(() => {
//     setCount(value?.length || 0);
//   }, [value]);

//   const handleInputChange = (e) => {
//     let newValue = e.target.value;

//     if (showCount && newValue.length > maxLength) {
//       // max length enforce only if showCount = true
//       newValue = newValue.slice(0, maxLength);
//     }

//     setCount(newValue.length);
//     onChange(newValue); // parent ko always string bhejo
//   };

//   return (
//     <div className="relative w-full">
//       <FormField label={label} icon={icon}>
//         <input
//           type={type}
//           value={value}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           {...(showCount ? { maxLength } : {})} // agar showCount false h to maxLength attribute remove
//           className={`w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] 
//             focus:outline-none focus:ring-1 focus:ring-gray-300 ${className}`}
//           {...props}
//         />

//         <div className="flex justify-between items-center -mt-2">
//           <div>{error && <p className="text-red-500 text-sm">{error}</p>}</div>

//           {showCount && (
//             <div className="text-end">
//               <span className="text-[10px] text-gray-400">
//                 {count}/{maxLength}
//               </span>
//             </div>
//           )}
//         </div>
//       </FormField>
//     </div>
//   );
// }


export function InputWithCount({
  type = "text",
  label,
  value,
  icon,
  error,
  onChange,
  placeholder = "",
  maxLength = 50,
  showCount = true,
  className = "",
  InputWithCountClass = "", // optional, default ""
  ...props
}) {
  const [count, setCount] = useState(value?.length || 0);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (newValue.length > maxLength) newValue = newValue.slice(0, maxLength);
    setCount(newValue.length);
    onChange(newValue);
  };

  return (
    <div className="relative w-full">
      <FormField label={label} icon={icon}>
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300 ${className} ${InputWithCountClass}`}
          {...props} // ✅ ab InputWithCountClass DOM me nahi jayega
        />
        {showCount && (
          <div className="text-end text-[10px] text-gray-400 -mt-1">{count}/{maxLength}</div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </FormField>
    </div>
  );
}
