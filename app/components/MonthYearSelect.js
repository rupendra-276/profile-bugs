
// "use client";
// import React, { useEffect } from "react";
// import SelectField from "./FormSelect";

// // ✅ Static months list
// const months = [
//   { value: "1", label: "January" },
//   { value: "2", label: "February" },
//   { value: "3", label: "March" },
//   { value: "4", label: "April" },
//   { value: "5", label: "May" },
//   { value: "6", label: "June" },
//   { value: "7", label: "July" },
//   { value: "8", label: "August" },
//   { value: "9", label: "September" },
//   { value: "10", label: "October" },
//   { value: "11", label: "November" },
//   { value: "12", label: "December" },
// ];

// export default function MonthYearSelect({
//   label = "Date",
//   startYear = 1970,
//   endYear = new Date().getFullYear() + 10,
//   value = {},                // 👈 Prevent crash if empty
//   onChange = () => {},       // 👈 Prevent crash if handler missing
// }) {
//   // ✅ Default fixed values
//   const defaultMonth = "1"; // January
//   const defaultYear = startYear.toString();

//   // ✅ Generate years list
//   const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
//     const year = (startYear + i).toString();
//     return { value: year, label: year };
//   });

//   // ✅ Apply defaults only once (no overwrite if already selected)
//   useEffect(() => {
//     if (!value.month) {
//       onChange({ type: "month", value: defaultMonth });
//     }
//     if (!value.year) {
//       onChange({ type: "year", value: defaultYear });
//     }
//   }, [value.month, value.year, defaultMonth, defaultYear, onChange]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {/* Month Dropdown */}
//       <SelectField
//         label={`${label} Month`}
//         options={months}
//         value={value.month || defaultMonth}
//         onChange={(e) => onChange({ type: "month", value: e.target.value })}
//       />

//       {/* Year Dropdown */}
//       <SelectField
//         label={`${label} Year`}
//         options={years}
//         value={value.year || defaultYear}
//         onChange={(e) => onChange({ type: "year", value: e.target.value })}
//       />
//     </div>
//   );
// }



// "use client";
// import React from "react";
// import SelectField from "./FormSelect";

// // ✅ Months list with placeholder
// const months = [
//   { value: "", label: "-- Select Month --" },
//   { value: "1", label: "January" },
//   { value: "2", label: "February" },
//   { value: "3", label: "March" },
//   { value: "4", label: "April" },
//   { value: "5", label: "May" },
//   { value: "6", label: "June" },
//   { value: "7", label: "July" },
//   { value: "8", label: "August" },
//   { value: "9", label: "September" },
//   { value: "10", label: "October" },
//   { value: "11", label: "November" },
//   { value: "12", label: "December" },
// ];

// export default function MonthYearSelect({
//   label = "Date",
//   startYear = 1970,
//   endYear = new Date().getFullYear() + 10,
//   value = {},
//   onChange = () => {},
// }) {
//   // ✅ Years with placeholder
//   const years = [
//     { value: "", label: "-- Select Year --" },
//     ...Array.from({ length: endYear - startYear + 1 }, (_, i) => {
//       const year = (startYear + i).toString();
//       return { value: year, label: year };
//     }),
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {/* Month Dropdown */}
//       <SelectField
//         label={`${label} Month`}
//         options={months}
//         value={value.month || ""}
//         onChange={(e) => onChange({ type: "month", value: e.target.value })}
//       />

//       {/* Year Dropdown */}
//       <SelectField
//         label={`${label} Year`}
//         options={years}
//         value={value.year || ""}
//         onChange={(e) => onChange({ type: "year", value: e.target.value })}
//       />
//     </div>
//   );
// }



"use client";
import React from "react";
import SelectField from "./FormSelect";

// Months list with placeholder
const months = [
  { value: "", label: "-- Select Month --" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function MonthYearSelect({
  label = "Date",
  startYear = 1970,
  endYear = new Date().getFullYear() + 10,
  value = {},
  onChange = () => {},
}) {
  const years = [
    { value: "", label: "-- Select Year --" },
    ...Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      const year = (startYear + i).toString();
      return { value: year, label: year };
    }),
  ];

  return (
    <div className="flex flex-col gap-1">
      {/* ✅ Professional single label */}
      <label className="form-label flex items-center gap-2 text-gray-300 font-medium">{label}</label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          options={months}
          value={value.month || ""}
          onChange={(e) => onChange({ type: "month", value: e.target.value })}
        />
        <SelectField
          options={years}
          value={value.year || ""}
          onChange={(e) => onChange({ type: "year", value: e.target.value })}
        />
      </div>
    </div>
  );
}
