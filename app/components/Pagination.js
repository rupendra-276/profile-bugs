// "use client";
// import React from "react";

// export default function Pagination({ page, perPage, total, onPageChange }) {
//   const start = (page - 1) * perPage + 1;
//   const end = Math.min(start + perPage - 1, total);

//   return (
//     <div className="flex flex-col items-center gap-2 mt-5">
//       <p className="text-sm text-gray-500">
//         Showing {start}-{end} of {total}
//       </p>
//       <div className="flex gap-3">
//         {page > 1 && (
//           <button
//             onClick={() => onPageChange(page - 1)}
//             className="px-3 py-1 border rounded hover:bg-gray-100"
//           >
//             Prev
//           </button>
//         )}
//         {end < total && (
//           <button
//             onClick={() => onPageChange(page + 1)}
//             className="px-3 py-1 border rounded hover:bg-gray-100"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
export default function Pagination({ page, total, perPage=50, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null; // agar ek hi page hai to pagination ki zaroorat nahi

  return (
    <div className="flex gap-2 justify-center mt-6">
      {/* Prev button */}
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded text-sm text-white hover:bg-gray-800"
        >
          Prev
        </button>
      )}

      {/* Page numbers (optional, SEO-friendly + user friendly) */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded text-sm ${
            num === page
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next button */}
      {page < totalPages && (
        <button
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded text-sm text-white hover:bg-gray-800"
        >
          Next
        </button>
      )}
    </div>
  );
}
