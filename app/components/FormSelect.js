import React from "react";
import FormField from "./FormField";

export default function SelectField({ label, options = [], error, ...props }) {
  return (
    <FormField label={label}>
      <select
        className={`w-full px-3 text-gray-300 bg-[#333A44] custom-scroll rounded-xl py-3    focus:outline
          ${error ? "border-red-500" : " "} 
          `}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} className="bg-[#10151B] text-gray-200 "  value={opt.value} >
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </FormField>
  );
}
