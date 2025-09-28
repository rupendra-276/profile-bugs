
// "use client";
// import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// import { InputWithCount } from "../components/FormInput"; // adjust path if your InputWithCount default export differs
// import SelectField from "../components/FormSelect";
// import MonthYearSelect from "../components/MonthYearSelect";

// /**
//  * props:
//  *  - initialData (object|null)
//  *  - onSave(data)  // parent will insert/update in list
//  *  - onCancel()
//  *
//  * Exposes: ref.current.submit() and ref.current.reset()
//  */
// const CertificationForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
//   const empty = {
//     name: "",
//     provider: "",
//     certificateId: "",
//     issueDate: { month: "", year: "" },
//     expiryDate: { month: "", year: "" },
//     credentialUrl: "",
//     media: null,
//   };

//   const [formData, setFormData] = useState(initialData || empty);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setFormData(initialData || empty);
//     setErrors({});
//   }, [initialData]);

//   useImperativeHandle(ref, () => ({
//     submit: () => handleSubmit(),
//     reset: () => setFormData(initialData || empty),
//   }));

//   // generic handler supports both (field, value) and event
//   const handleChange = (a, b) => {
//     if (typeof a === "string") {
//       // handleChange(field, value)
//       const field = a;
//       const value = b;
//       setFormData((p) => ({ ...p, [field]: value }));
//       setErrors((e) => ({ ...e, [field]: undefined }));
//     } else if (a && a.target) {
//       // event-like
//       const { name, value } = a.target;
//       setFormData((p) => ({ ...p, [name]: value }));
//       setErrors((e) => ({ ...e, [name]: undefined }));
//     }
//   };

//   const handleDateChange = (field, { type, value }) => {
//     setFormData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
//     setErrors((e) => ({ ...e, [field]: undefined }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!formData.name?.trim()) e.name = "Certification name is required.";
//     if (!formData.provider?.trim()) e.provider = "Provider is required.";
//     if (!formData.issueDate.month || !formData.issueDate.year) e.issueDate = "Issue date is required.";
//     // optional: if expiry provided ensure valid relation
//     const sYear = parseInt(formData.issueDate.year || "0", 10);
//     const eYear = parseInt(formData.expiryDate.year || "0", 10);
//     if (formData.expiryDate.year && eYear < sYear) e.expiryDate = "Expiry cannot be before issue date.";
//     return e;
//   };

//   const handleSubmit = (ev) => {
//     ev?.preventDefault?.();
//     const e = validate();
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }
//     onSave(formData);
//     setFormData(empty);
//     setErrors({});
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative">
//       <div className="px-4 py-3 space-y-3">
//         <InputWithCount
//           label="Certification / Course Name *"
//           value={formData.name}
//           onChange={(val) => handleChange("name", val)}
//           maxLength={150}
//           placeholder="e.g., Google Cloud Professional Architect"
//           error={errors.name}
//         />

//         {/* <SelectField
//           label="Provider *"
//           name="provider"
//           value={formData.provider}
//           onChange={handleChange}
//           error={errors.provider}
        
//           options={[
//             { value: "", label: "Select Provider" },
//             { value: "Google", label: "Google" },
//             { value: "Microsoft", label: "Microsoft" },
//             { value: "AWS", label: "AWS" },
//             { value: "Coursera", label: "Coursera" },
//             { value: "Udemy", label: "Udemy" },
//             { value: "Other", label: "Other" },
//           ]}
//         /> */}

//         <InputWithCount
//           label="Certificate ID"
//           value={formData.certificateId}
//           onChange={(val) => handleChange("certificateId", val)}
//           maxLength={60}
//           placeholder="Optional"
//         />

       
//             <MonthYearSelect label="Issue Date *" value={formData.issueDate} onChange={(val) => handleDateChange("issueDate", val)} />
//             {errors.issueDate && <p className="text-red-500 text-sm">{errors.issueDate}</p>}
         
         
//             <MonthYearSelect label="Expiry Date" value={formData.expiryDate} onChange={(val) => handleDateChange("expiryDate", val)} />
//             {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
        

//         <InputWithCount
//           label="Credential URL"
//           value={formData.credentialUrl}
//           onChange={(val) => handleChange("credentialUrl", val)}
//           maxLength={220}
//           placeholder="https://..."
//         />
//       </div>
//        <MediaUpload
//           label="Upload Media (Optional)"
//           accept="image/*"
//           maxSizeMB={2}
//           initialFile={formData.media} // ✅ Existing file shown in edit mode
//           onFileSelect={(file) => setFormData((p) => ({ ...p, media: file }))} // ✅ update correct field
//         />
//       <div className="sticky bg-[#10151B] right-0 -bottom-5 py-2">
//   <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
//         <button type="button" onClick={() => onCancel?.()} className="px-4 py-2 rounded-full bg-[#333A44] text-white">
//           Cancel
//         </button>
//         <button type="submit" className="px-4 py-2 rounded-full bg-blue-600 text-white">
//           Save
//         </button>
//       </div>
//       </div>
    
//     </form>
//   );
// });

// export default CertificationForm;



"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { InputWithCount } from "../components/FormInput"; 
import MonthYearSelect from "../components/MonthYearSelect";
import MediaUpload from "../components/MediaUpload"; // ✅ make sure this exists

/**
 * props:
 *  - initialData (object|null)
 *  - onSave(data)
 *  - onCancel()
 *
 * Exposes: ref.current.submit() and ref.current.reset()
 */

const CertificationForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
  const empty = {
    name: "",
    // provider: "",   // ❌ commented (you can enable later)
    certificateId: "",
    issueDate: { month: "", year: "" },
    expiryDate: { month: "", year: "" },
    credentialUrl: "",
    media: null,
  };

  const [formData, setFormData] = useState(initialData || empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData || empty);
    setErrors({});
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    reset: () => setFormData(initialData || empty),
  }));

  const handleChange = (a, b) => {
    if (typeof a === "string") {
      setFormData((p) => ({ ...p, [a]: b }));
      setErrors((e) => ({ ...e, [a]: undefined }));
    } else if (a?.target) {
      const { name, value } = a.target;
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  };

  const handleDateChange = (field, { type, value }) => {
    setFormData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

 const validate = () => {
  const e = {};

  if (!formData.name?.trim()) e.name = "Certification name is required.";
  // if (!formData.provider?.trim()) e.provider = "Provider is required."; // ❌ commented
  if (!formData.certificateId?.trim()) e.certificateId = "Certificate ID is required."; // ✅ required

  // ✅ Validate Issue Date strictly
  if (
    !formData.issueDate.month ||
    !formData.issueDate.year ||
    formData.issueDate.month === "" ||
    formData.issueDate.year === ""
  ) {
    e.issueDate = "Issue date is required.";
  }

  // ✅ Validate Expiry Date strictly (if provided)
  if (
    formData.expiryDate.month &&
    formData.expiryDate.year &&
    (formData.expiryDate.month === "" || formData.expiryDate.year === "")
  ) {
    e.expiryDate = "Expiry date is invalid.";
  }

  const sYear = parseInt(formData.issueDate.year || "0", 10);
  const eYear = parseInt(formData.expiryDate.year || "0", 10);
  if (formData.expiryDate.year && eYear < sYear)
    e.expiryDate = "Expiry cannot be before issue date.";

  return e;
};

  const handleSubmit = (ev) => {
    ev?.preventDefault?.();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(formData);
    setFormData(empty);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="px-4 py-3 space-y-3">
        <InputWithCount
          label="Certification / Course Name *"
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
          maxLength={150}
          placeholder="e.g., Google Cloud Professional Architect"
          error={errors.name}
        />

        {/* 
        <SelectField
          label="Provider *"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          error={errors.provider}
          options={[
            { value: "", label: "Select Provider" },
            { value: "Google", label: "Google" },
            { value: "Microsoft", label: "Microsoft" },
            { value: "AWS", label: "AWS" },
            { value: "Coursera", label: "Coursera" },
            { value: "Udemy", label: "Udemy" },
            { value: "Other", label: "Other" },
          ]}
        /> 
        */}

        <InputWithCount
          label="Certificate ID *"
          value={formData.certificateId}
          onChange={(val) => handleChange("certificateId", val)}
          maxLength={60}
          placeholder="Required"
          error={errors.certificateId}
        />

       <MonthYearSelect
  label="Issue Date *"
  value={formData.issueDate}
  onChange={(val) => handleDateChange("issueDate", val)}
/>
{errors.issueDate && <p className="text-red-500 text-sm">{errors.issueDate}</p>}

<MonthYearSelect
  label="Expiry Date"
  value={formData.expiryDate}
  onChange={(val) => handleDateChange("expiryDate", val)}
/>
{errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}

        <InputWithCount
          label="Credential URL"
          value={formData.credentialUrl}
          onChange={(val) => handleChange("credentialUrl", val)}
          maxLength={220}
          placeholder="https://..."
        />

        {/* ✅ Media Upload enabled */}
        <MediaUpload
          label="Upload Certificate (Optional)"
          accept="image/*"
          maxSizeMB={2}
          initialFile={formData.media}
          onFileSelect={(file) => setFormData((p) => ({ ...p, media: file }))}
        />
      </div>

      <div className="sticky bg-[#10151B] right-0 -bottom-5 py-2">
        <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="px-4 py-2 rounded-full bg-[#333A44] text-white"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-full bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>
    </form>
  );
});

export default CertificationForm;
