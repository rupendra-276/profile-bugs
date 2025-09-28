


// // components/Modal.jsx (small enhancements)
// "use client";
// import { createPortal } from "react-dom";
// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import Button from "../components/Button";

// export default function Modal({ show, onClose, title = "Modal", children, widthClass = "max-w-lg", onSubmit, submitLabel = "Save", cancelLabel = "Cancel" }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     if (!mounted) return;
//     if (show) {
//       document.body.style.overflow = "hidden";
//       const onKey = (e) => { if (e.key === "Escape") onClose(); };
//       window.addEventListener("keydown", onKey);
//       return () => {
//         window.removeEventListener("keydown", onKey);
//         document.body.style.overflow = "unset";
//       };
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [show, mounted, onClose]);

//   if (!mounted || !show) return null;

//   return createPortal(
//     <>
//       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className={`bg-[#10151B] rounded-lg w-full ${widthClass} shadow-lg`} onClick={(e) => e.stopPropagation()}>
//           <div className="flex justify-between items-center border-b border-gray-300 px-6 py-3">
//             {
//               title &&  <h3 className="text-lg font-medium text-white">{title}</h3>

//             }
//             <button type="button" onClick={onClose} className="p-2 text-white hover:text-gray-300"><X className="w-5 h-5" /></button>
//           </div>
//           <div className="px-6 py-4 max-h-[70vh] overflow-y-auto custom-scroll">{children}</div>
//           <div className="flex justify-end gap-3 px-6 py-3 border-t border-gray-300">
//             {onSubmit && <Button type="button" buttonclass="text-white bg-blue-600" onClick={onSubmit}>{submitLabel}</Button>}
//             <Button type="button" buttonclass="bg-gray-300 text-black" onClick={onClose}>{cancelLabel}</Button>
//           </div>
//         </div>
//       </div>
//     </>,
//     document.body
//   );
// }


// components/Modal.jsx
"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Modal({ show, onClose, title, children, widthClass = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (show) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show, mounted, onClose]);

  if (!mounted || !show) return null;

  return createPortal(
    <>
      <div className="fixed inset-0  bg-black/60 backdrop-blur-sm z-40 " onClick={onClose} />
     <div className="fixed inset-0 top-10  flex my-3 items-center justify-center z-50">
        <div className={`bg-[#10151B] border border-gray-400 rounded-[30px] w-full m-3 max-w-[550px] ${widthClass} `} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-gray-300 px-6 py-3">
          <div>
          {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
          <div className="px-6 py-4 max-h-[75vh] overflow-y-auto custom-scroll">
            {children}
          </div>
          
        </div>
      </div>
    </>,
    document.body
  );
}
