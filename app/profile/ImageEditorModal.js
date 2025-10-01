// "use client";
// import React from "react";
// import { X } from "lucide-react";
// import ImageEditor from "./ImageEditor";

// export default function ImageEditorModal({
//   isOpen,
//   onClose,
//   initialImage,
//   mode = "cover",            // "cover" | "avatar" | custom
//   onSave,
//   aspectPresets,
//   outputSizeMap
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-6 bg-black/50">
//       <div className="bg-white w-full max-w-5xl rounded-lg  shadow-lg">
        
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="font-semibold">
//             {mode === "avatar" ? "Edit Profile Photo" : "Edit Cover"}
//           </h3>
//           <button
//             className="px-3 py-1 hover:cursor-pointer"
//             onClick={onClose}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 !overflow-y-auto">
//           <ImageEditor
//             initialImage={initialImage}
//             mode={mode}
//             onCancel={onClose}
//             onSave={onSave}
//             aspectPresets={aspectPresets}
//             outputSizeMap={outputSizeMap}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";

// export default function ImageEditorModal({ show, onClose, children }) {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
//         {children}
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 bg-gray-300 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// components/ImageEditorModal.jsx
"use client";
import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import ImageEditor from "./ImageEditor";

const steps = ["Crop", "Filters", "Adjust"];

export default function ImageEditorModal({ show, onClose, image, onSave, mode = "auto" }) {
  const [step, setStep] = useState(0);
  const editorRef = useRef(null);

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    // final save
    if (editorRef.current?.exportImage) {
      const result = await editorRef.current.exportImage();
      if (result) {
        onSave(result); // { blob, url }
      }
    }
    setStep(0);
    onClose();
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else {
      setStep(0);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <Modal show={show} onClose={() => { setStep(0); onClose(); }} title={`Edit Image :  ${steps[step]}`} widthClass="">
      <div className="flex flex-col gap-3 py-4">
        <div className="flex justify-center gap-6">
          {steps.map((s, idx) => (
            <button
              key={s}
              onClick={() => setStep(idx)}
              type="button"
              className={`pb-2 px-3  border-b-2 hover:cursor-pointer ${idx === step ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className=" ">
          <ImageEditor ref={editorRef} initialImage={image} mode={mode} activeStep={step} />
        </div>

        <div className="flex bg-[#10151B] sticky bottom-0 z-50 justify-end gap-3">
          <Button type="button" onClick={handleBack} buttonclass="bg-gray-600 text-white">
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          <Button type="button" onClick={handleNext} buttonclass="bg-blue-600 text-white">
            {step === steps.length - 1 ? "Save" : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
