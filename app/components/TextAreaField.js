// import React from "react";
// import FormField from "./FormField";

// export default function TextAreaField({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   error,
//   rows=4,

// }) {
//   return (
//     <FormField label={label}>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full px-3 py-2 mt-3 text-[#fff] border  border-gray-200/50 rounded-xl resize-none 
//           ${error ? "border-red-500" : "borderblack"} 
//           focus:border focus:border-blue-300 focus:outline`}
//         rows={rows}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </FormField>
//   );
// }

import React, { useState } from "react";
import FormField from "./FormField";

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  maxLength = 2000,   // default limit
  showCount = true,   // toggle show/hide count + restriction
}) {
  const [count, setCount] = useState(value?.length || 0);

  const handleChange = (e) => {
    let newValue = e.target.value;

    // ✅ Restrict only if showCount is true
    if (showCount && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    setCount(newValue.length);
    onChange(newValue);
  };

  return (
    <FormField label={label}>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        // ✅ Only apply maxlength when showCount is true
        {...(showCount ? { maxLength } : {})}
        className={`w-full px-3 py-2 mt-3 text-[#fff] border border-gray-200/50 rounded-xl resize-none 
          ${error ? "border-red-500" : "border-black"} 
          focus:border focus:border-blue-300 focus:outline`}
      />

      <div className="flex justify-between items-center">
        <div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div>
     {showCount && (
          <span className="text-[10px] text-gray-400">
            {count}/{maxLength}
          </span>
        )}
        </div>
   
      </div>
    </FormField>
  );
}
