// "use client";
// import React, { useState, useEffect } from "react";
// import InputWithCount from "../components/InputWithCount";
// import TextAreaField from "../components/TextAreaField";
// import SelectField from "../components/FormSelect";
// import FormAchievements from "../components/FormAchievements";
// import CheckboxField from "../components/CheckboxField";
// import MonthYearSelect from "../components/MonthYearSelect";
// import Button from "../components/Button";
// import { InputWithCount } from "../components/InputWithCount";

// const MAX_SKILLS = 10;
// const MAX_ACHIEVEMENTS = 3;
// const MAX_LENGTHS = {
//   jobTitle: 100,
//   company: 100,
//   location: 100,
//   description: 1000,
//   skill: 50,
//   achievement: 200,
// };

// const dummyJobTitles = ["Software Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Scientist"];
// const dummyCompanies = ["Google", "Microsoft", "Amazon", "AmbiSpine Technologies", "Infosys"];
// const dummyLocations = ["London, United Kingdom", "New York, USA", "Bangalore, India", "Remote", "San Francisco, USA"];

// export default function ExperienceForm({ initialData, onSave, onCancel }) {
//   const [formData, setFormData] = useState(initialFormState());
//   const [errors, setErrors] = useState({});
//   const [suggestions, setSuggestions] = useState({ jobTitle: [], company: [], location: [] });

//   function initialFormState() {
//     return (
//       initialData || {
//         jobTitle: "",
//         company: "",
//         employmentType: "",
//         location: "",
//         startDate: { month: "", year: "" },
//         endDate: { month: "", year: "" },
//         currentlyWorking: false,
//         description: "",
//         skills: [],
//         keyAchievements: [],
//       }
//     );
//   }

//   useEffect(() => {
//     if (initialData) setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

//     // Suggestion handling
//     if (["jobTitle", "company", "location"].includes(name)) {
//       const dataset =
//         name === "jobTitle" ? dummyJobTitles : name === "company" ? dummyCompanies : dummyLocations;
//       const filtered = dataset.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
//       setSuggestions((prev) => ({ ...prev, [name]: filtered }));
//     }
//   };

//   const handleDateChange = (field, { type, value }) => {
//     setFormData((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));
//   };

//   const handleSkillsChange = (newSkills) => {
//     setFormData((prev) => ({ ...prev, skills: newSkills.slice(0, MAX_SKILLS) }));
//   };

//   const handleAchievementsChange = (newAchievements) => {
//     setFormData((prev) => ({ ...prev, keyAchievements: newAchievements.slice(0, MAX_ACHIEVEMENTS) }));
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required.";
//     else if (formData.jobTitle.length > MAX_LENGTHS.jobTitle)
//       newErrors.jobTitle = `Max ${MAX_LENGTHS.jobTitle} chars.`;

//     if (!formData.company) newErrors.company = "Company is required.";
//     else if (formData.company.length > MAX_LENGTHS.company)
//       newErrors.company = `Max ${MAX_LENGTHS.company} chars.`;

//     if (!formData.employmentType) newErrors.employmentType = "Select employment type.";

//     if (!formData.startDate.month || !formData.startDate.year) newErrors.startDate = "Start date is required.";

//     if (!formData.description) newErrors.description = "Description is required.";
//     else if (formData.description.length > MAX_LENGTHS.description)
//       newErrors.description = `Max ${MAX_LENGTHS.description} chars.`;

//     if (!formData.currentlyWorking && (!formData.endDate.month || !formData.endDate.year))
//       newErrors.endDate = "End date required if not currently working.";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     onSave(formData);
//     setFormData(initialFormState());
//     setErrors({});
//   };

//   return (

//        <form onSubmit={handleSubmit} className="flex flex-col">
//       <div className="px-6 py-4 space-y-3">
//         {/* Job Title */}
//         <InputWithCount label="Job Title *" name="jobTitle" value={formData.jobTitle} onChange={handleChange} error={errors.jobTitle} placeholder="Max 100 characters" />
//         {suggestions.jobTitle.length > 0 && (
//           <ul className="border rounded bg-white text-black shadow">
//             {suggestions.jobTitle.map((s, i) => (
//               <li key={i} className="p-1 cursor-pointer hover:bg-gray-200" onClick={() => setFormData((p) => ({ ...p, jobTitle: s }))}>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Company */}
//         <InputWithCount label="Company *" name="company" value={formData.company} onChange={handleChange} error={errors.company} placeholder="Max 100 characters" />
//         {suggestions.company.length > 0 && (
//           <ul className="border rounded bg-white text-black shadow">
//             {suggestions.company.map((s, i) => (
//               <li key={i} className="p-1 cursor-pointer hover:bg-gray-200" onClick={() => setFormData((p) => ({ ...p, company: s }))}>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Employment Type */}
//         <SelectField
//           label="Employment Type *"
//           name="employmentType"
//           value={formData.employmentType}
//           onChange={handleChange}
//           error={errors.employmentType}
//           options={[
//             { value: "", label: "Please Select" },
//             { value: "Full-time", label: "Full-Time" },
//             { value: "Part-time", label: "Part-Time" },
//             { value: "Internship", label: "Internship" },
//             { value: "Contract", label: "Contract" },
//             { value: "Freelance", label: "Freelance" },
//           ]}
//         />

//         {/* Location */}
//         <InputWithCount label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country or Remote" error={errors.location} />
//         {suggestions.location.length > 0 && (
//           <ul className="border rounded bg-white text-black shadow">
//             {suggestions.location.map((s, i) => (
//               <li key={i} className="p-1 cursor-pointer hover:bg-gray-200" onClick={() => setFormData((p) => ({ ...p, location: s }))}>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Dates */}
//         <MonthYearSelect label="Start Date *" value={formData.startDate} onChange={(val) => handleDateChange("startDate", val)} />
//         {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
//         <CheckboxField label="Currently Working Here" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
//         {!formData.currentlyWorking && (
//           <>
//             <MonthYearSelect label="End Date *" value={formData.endDate} onChange={(val) => handleDateChange("endDate", val)} />
//             {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
//           </>
//         )}

//         {/* Description */}
//         <TextAreaField label="Job Description *" name="description" value={formData.description} onChange={handleChange} placeholder="Description & Achievements..." error={errors.description} />

//         {/* Skills */}
//         <div className="mt-2">
//           <FormAchievements label="Skills" values={formData.skills} onChange={handleSkillsChange} buttonshow={false} />
//           {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
//           <p className="text-gray-400 text-xs mt-1">Max {MAX_SKILLS} skills, each {MAX_LENGTHS.skill} chars.</p>
//         </div>

//         {/* Achievements */}
//         <div className="mt-4">
//           <FormAchievements label="Key Achievements" values={formData.keyAchievements} onChange={handleAchievementsChange} buttonshow={false} />
//           {errors.keyAchievements && <p className="text-red-500 text-sm mt-1">{errors.keyAchievements}</p>}
//           <p className="text-gray-400 text-xs mt-1">Max {MAX_ACHIEVEMENTS} achievements, each {MAX_LENGTHS.achievement} chars.</p>
//         </div>
//       </div>

//       {/* Actions */}
//       {/* <div className="flex justify-end gap-3 px-6 py-3 border-t">
//         <Button type="button" onClick={onCancel} buttonclass="border border-gray-400 text-gray-700">
//           Cancel
//         </Button>
//         <Button type="submit" buttonclass="bg-blue-600 text-white">
//           Save
//         </Button>
//       </div> */}
//     </form>
    
        
  
//   );
// }



// "use client";
// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
// import { InputWithCount } from "../components/FormInput";
// import TextAreaField from "../components/TextAreaField";
// import SelectField from "../components/FormSelect";
// import FormAchievements from "../components/FormAchievements";
// import CheckboxField from "../components/CheckboxField";
// import MonthYearSelect from "../components/MonthYearSelect";
// import { MapPin } from "lucide-react";

// /**
//  * ExperienceForm
//  * - forwardRef so parent Modal can call formRef.current.submit()
//  * - props: initialData (object|null), onSave(data), onCancel()
//  */
// const MAX_SKILLS = 10;
// const MAX_ACHIEVEMENTS = 3;
// const MAX_LENGTHS = {
//   jobTitle: 100,
//   company: 100,
//   location: 100,
//   description: 1000,
//   skill: 50,
//   achievement: 200,
// };

// const JOB_TITLES = ["Software Engineer","Frontend Developer","Backend Developer","UI/UX Designer","Data Scientist"];
// const COMPANIES = ["Google","Microsoft","Amazon","AmbiSpine Technologies","Infosys"];
// const LOCATIONS = ["London, United Kingdom","New York, USA","Bangalore, India","Remote","San Francisco, USA"];

// const ExperienceForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
//   const empty = {
//     jobTitle: "",
//     company: "",
//     employmentType: "",
//     location: "",
//     startDate: { month: "", year: "" },
//     endDate: { month: "", year: "" },
//     description: "",
//     currentlyWorking: false,
//     skills: [],
//     keyAchievements: [],
//   };

//   const [formData, setFormData] = useState(initialData || empty);
//   const [errors, setErrors] = useState({});
//   const [suggestions, setSuggestions] = useState({ jobTitle: [], company: [], location: [] });

//   // sync when initialData changes
//   useEffect(() => {
//     setFormData(initialData || empty);
//     setErrors({});
//   }, [initialData]);

//   // expose submit/reset methods
//   useImperativeHandle(ref, () => ({
//     submit: () => handleSubmit(),
//     reset: () => setFormData(initialData || empty),
//   }));

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));

//     // suggestions
//     if (name === "jobTitle" || name === "company" || name === "location") {
//       const dataset = name === "jobTitle" ? JOB_TITLES : name === "company" ? COMPANIES : LOCATIONS;
//       const filtered = value ? dataset.filter(it => it.toLowerCase().includes(value.toLowerCase())) : [];
//       setSuggestions(prev => ({ ...prev, [name]: filtered }));
//     }
//   };

//   const handleDateChange = (field, { type, value }) => {
//     setFormData(p => ({ ...p, [field]: { ...p[field], [type]: value } }));
//   };

//   const handleSkillsChange = (newSkills) => {
//     setFormData(p => ({ ...p, skills: newSkills.slice(0, MAX_SKILLS) }));
//   };

//   const handleAchievementsChange = (newAchievements) => {
//     setFormData(p => ({ ...p, keyAchievements: newAchievements.slice(0, MAX_ACHIEVEMENTS) }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!formData.jobTitle?.trim()) e.jobTitle = "Job title है ज़रूरी।";
//     else if (formData.jobTitle.length > MAX_LENGTHS.jobTitle) e.jobTitle = `Max ${MAX_LENGTHS.jobTitle} chars.`;

//     if (!formData.company?.trim()) e.company = "Company नाम चाहिए।";
//     else if (formData.company.length > MAX_LENGTHS.company) e.company = `Max ${MAX_LENGTHS.company} chars.`;

//     if (!formData.employmentType) e.employmentType = "Employment type चुनें।";

//     if (!formData.startDate.month || !formData.startDate.year) e.startDate = "Start date चुनें।";

//     if (!formData.currentlyWorking && (!formData.endDate.month || !formData.endDate.year)) e.endDate = "End date चुनें या 'Currently working' tick करें।";

//     if (!formData.description?.trim()) e.description = "Job description चाहिए।";
//     else if (formData.description.length > MAX_LENGTHS.description) e.description = `Max ${MAX_LENGTHS.description} chars.`;

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

//   // helper for selecting suggestion
//   const applySuggestion = (field, value) => {
//     setFormData(p => ({ ...p, [field]: value }));
//     setSuggestions(s => ({ ...s, [field]: [] }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative">
//       <div className="px-4 py-3 space-y-3">
//         {/* Job Title */}
//         <div className="relative">
//           <InputWithCount
//             label="Job Title *"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             placeholder="Frontend Developer"
//             maxLength={MAX_LENGTHS.jobTitle}
//             error={errors.jobTitle}
//           />
//           {suggestions.jobTitle.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.jobTitle.map((s,i) => (
//                 <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                      onClick={() => applySuggestion("jobTitle", s)}>
//                   <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold">{s[0]}</div>
//                   <div className="text-sm text-gray-800">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Company */}
//         <div className="relative">
//           <InputWithCount
//             label="Company *"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             placeholder="Ex. Google"
//             maxLength={MAX_LENGTHS.company}
//             error={errors.company}
//           />
//           {suggestions.company.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.company.map((s,i) => (
//                 <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
//                      onClick={() => applySuggestion("company", s)}>
//                   <img
//                     src={`https://logo.clearbit.com/${s.toLowerCase().replace(/\s+/g,"")}.com`}
//                     alt={s}
//                     onError={(ev)=> ev.target.style.display="none"}
//                     className="w-7 h-7 rounded-full object-cover border"
//                   />
//                   <div className="text-sm text-gray-800">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Employment Type */}
//         <SelectField
//           label="Employment Type *"
//           name="employmentType"
//           value={formData.employmentType}
//           onChange={handleChange}
//           error={errors.employmentType}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Full-time", label: "Full-time" },
//             { value: "Part-time", label: "Part-time" },
//             { value: "Internship", label: "Internship" },
//             { value: "Contract", label: "Contract" },
//             { value: "Freelance", label: "Freelance" },
//           ]}
//         />

//         {/* Location */}
//         <div className="relative">
//           <InputWithCount
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="City, Country or Remote"
//             maxLength={MAX_LENGTHS.location}
//             error={errors.location}
//           />
//           {suggestions.location.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.location.map((s,i) => (
//                 <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                      onClick={() => applySuggestion("location", s)}>
//                   <MapPin className="w-4 h-4 text-blue-600" />
//                   <div className="text-sm text-gray-800">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Dates */}
//         <MonthYearSelect label="Start Date *" value={formData.startDate} onChange={(val)=>handleDateChange("startDate", val)} />
//         {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

//         <div className="mt-2">
//           <CheckboxField label="Currently working here" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
//         </div>

//         {!formData.currentlyWorking && (
//           <>
//             <MonthYearSelect label="End Date *" value={formData.endDate} onChange={(val)=>handleDateChange("endDate", val)} />
//             {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
//           </>
//         )}

//         {/* Description */}

//         <TextAreaField
//   label="Job Description *"
//   name="description"
//   value={formData.description || ""}
//   onChange={(newValue) =>
//     setFormData((p) => ({ ...p, description: newValue }))
//   }
//   placeholder="What you did, tech, impact..."
//   error={errors.description}
//   maxLength={MAX_LENGTHS.description}
// />

//         {/* Skills */}
//         <div>
//           <FormAchievements label="Skills" values={formData.skills} onChange={handleSkillsChange} buttonshow={false} maxItemLength={MAX_LENGTHS.skill} />
//           <p className="text-xs text-gray-400 mt-1">Max {MAX_SKILLS} skills</p>
//         </div>

//         {/* Achievements */}
//         <div>
//           <FormAchievements label="Key Achievements" values={formData.keyAchievements} onChange={handleAchievementsChange} buttonshow={false} maxItemLength={MAX_LENGTHS.achievement} />
//           <p className="text-xs text-gray-400 mt-1">Max {MAX_ACHIEVEMENTS} achievements</p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="px-4 py-3 border-t flex justify-end gap-2">
//         <button type="button" onClick={() => { onCancel?.(); }} className="px-3 py-1 rounded bg-[#333A44] text-white">Cancel</button>
//         <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
//       </div>
//     </form>
//   );
// });

// export default ExperienceForm;


// "use client";
// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
// import { InputWithCount } from "../components/FormInput";
// import TextAreaField from "../components/TextAreaField";
// import SelectField from "../components/FormSelect";
// import FormAchievements from "../components/FormAchievements";
// import CheckboxField from "../components/CheckboxField";
// import MonthYearSelect from "../components/MonthYearSelect";
// import { MapPin } from "lucide-react";
// import MediaUpload from "../components/MediaUpload";

// const MAX_SKILLS = 8;
// const MAX_ACHIEVEMENTS = 4;
// const MAX_LENGTHS = {
//   jobTitle: 100,
//   company: 100,
//   location: 100,
//   description: 300,
//   skill: 50,
//   achievement: 200,
// };

// const JOB_TITLES = ["Software Engineer","Frontend Developer","Backend Developer","UI/UX Designer","Data Scientist"];
// const COMPANIES = ["Google","Microsoft","Amazon","AmbiSpine Technologies","Infosys"];
// const LOCATIONS = ["London, United Kingdom","New York, USA","Bangalore, India","Remote","San Francisco, USA"];

// const ExperienceForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
//   const empty = {
//     jobTitle: "",
//     company: "",
//     employmentType: "",
//     location: "",
//     startDate: { month: "", year: "" },
//     endDate: { month: "", year: "" },
//     description: "",
//     currentlyWorking: false,
//     skills: [],
//     keyAchievements: [],
//     media: null
//   };

//   const [formData, setFormData] = useState(initialData || empty);
//   const [errors, setErrors] = useState({});
//   const [suggestions, setSuggestions] = useState({ jobTitle: [], company: [], location: [] });
//   const [isFocused, setIsFocused] = useState(false);
//   useEffect(() => {
//     setFormData(initialData || empty);
//     setErrors({});
//   }, [initialData]);

//   useImperativeHandle(ref, () => ({
//     submit: () => handleSubmit(),
//     reset: () => setFormData(initialData || empty),
//   }));

//   const handleChange = (input) => {
//     if (typeof input === "string") return; // safety

//     const { name, value, type, checked } = input.target;
//     const finalValue = type === "checkbox" ? checked : value;

//     setFormData((p) => ({ ...p, [name]: finalValue }));

//     if (["jobTitle", "company", "location"].includes(name)) {
//       const dataset = name === "jobTitle" ? JOB_TITLES : name === "company" ? COMPANIES : LOCATIONS;
//       const filtered = finalValue
//         ? dataset.filter((it) => it.toLowerCase().includes(finalValue.toLowerCase()))
//         : [];
//       setSuggestions((prev) => ({ ...prev, [name]: filtered }));
//     }
//   };

//   const handleValueChange = (field, value) => {
//     setFormData((p) => ({ ...p, [field]: value }));

//     if (["jobTitle", "company", "location"].includes(field)) {
//       const dataset = field === "jobTitle" ? JOB_TITLES : field === "company" ? COMPANIES : LOCATIONS;
//       const filtered = value
//         ? dataset.filter((it) => it.toLowerCase().includes(value.toLowerCase()))
//         : [];
//       setSuggestions((prev) => ({ ...prev, [field]: filtered }));
//     }
//   };

//   const handleDateChange = (field, { type, value }) => {
//     setFormData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
//   };

//   const handleSkillsChange = (newSkills) => {
//     setFormData((p) => ({ ...p, skills: newSkills.slice(0, MAX_SKILLS) }));
//   };

//   const handleAchievementsChange = (newAchievements) => {
//     setFormData((p) => ({ ...p, keyAchievements: newAchievements.slice(0, MAX_ACHIEVEMENTS) }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!formData.jobTitle?.trim()) e.jobTitle = "Job title is required";
//     else if (formData.jobTitle.length > MAX_LENGTHS.jobTitle) e.jobTitle = `Max ${MAX_LENGTHS.jobTitle} chars.`;

//     if (!formData.company?.trim()) e.company = "Company नाम चाहिए।";
//     else if (formData.company.length > MAX_LENGTHS.company) e.company = `Max ${MAX_LENGTHS.company} chars.`;

//     if (!formData.employmentType) e.employmentType = "Employment type is required.";

//     if (!formData.startDate.month || !formData.startDate.year) e.startDate = "Start date is required.";

//     if (!formData.currentlyWorking && (!formData.endDate.month || !formData.endDate.year))
//       e.endDate = "choose End date or 'Currently working' to check";

//     if (!formData.description?.trim()) e.description = "Job description is required.";
//     else if (formData.description.length > MAX_LENGTHS.description) e.description = `Max ${MAX_LENGTHS.description} chars.`;

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

//   const applySuggestion = (field, value) => {
//     setFormData((p) => ({ ...p, [field]: value }));
//     setSuggestions((s) => ({ ...s, [field]: [] }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative">
//       <div className="px-4 py-3 space-y-3">
//         {/* Job Title */}
//         <div className="relative">
//           <InputWithCount
//             label="Job Title *"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={(val) => handleValueChange("jobTitle", val)}
//             placeholder="Frontend Developer"
//             maxLength={MAX_LENGTHS.jobTitle}
//             error={errors.jobTitle}
//                    onFocus={() => setIsFocused(true)}
//             onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            
//           />
//           { isFocused && suggestions.jobTitle.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.jobTitle.map((s, i) => (
//                 <div
//                   key={i}
//                   className="p-2 text-gray-100 cursor-pointer flex items-center gap-2"
//                   onClick={() => applySuggestion("jobTitle", s)}
//                 >
//                   <div className="w-7 h-7 rounded-full bg-[#041424] text-gray-100 flex items-center justify-center text-xs font-semibold">
//                     {s[0]}
//                   </div>
//                   <div className="text-sm text-gray-100">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Company */}
//         <div className="relative">
//           <InputWithCount
//             label="Company *"
//             name="company"
//             value={formData.company}
//             onChange={(val) => handleValueChange("company", val)}
//             placeholder="Ex. Google"
//             maxLength={MAX_LENGTHS.company}
//             error={errors.company}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setTimeout(() => setIsFocused(false), 100)}
//           />
//           {suggestions.company.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.company.map((s, i) => (
//                 <div
//                   key={i}
//                   className="p-2  cursor-pointer flex items-center gap-3"
//                   onClick={() => applySuggestion("company", s)}
//                 >
//                   <img
//                     src={`https://logo.clearbit.com/${s.toLowerCase().replace(/\s+/g, "")}.com`}
//                     alt={s}
//                     onError={(ev) => (ev.target.style.display = "none")}
//                     className="w-7 h-7 rounded-full object-cover border"
//                   />
//                   <div className="text-sm text-gray-100">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Employment Type */}
//         <SelectField
//           label="Employment Type *"
//           name="employmentType"
//           value={formData.employmentType}
//           onChange={handleChange}
//           error={errors.employmentType}
//           options={[
//             { value: "", label: "Select" },
//             { value: "Full-time", label: "Full-time" },
//             { value: "Part-time", label: "Part-time" },
//             { value: "Internship", label: "Internship" },
//             { value: "Contract", label: "Contract" },
//             { value: "Freelance", label: "Freelance" },
//           ]}
//         />

//         {/* Location */}
//         <div className="relative">
//           <InputWithCount
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={(val) => handleValueChange("location", val)}
//             placeholder="City, Country or Remote"
//             maxLength={MAX_LENGTHS.location}
//             error={errors.location}
//           />
//           {suggestions.location.length > 0 && (
//             <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
//               {suggestions.location.map((s, i) => (
//                 <div
//                   key={i}
//                   className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                   onClick={() => applySuggestion("location", s)}
//                 >
//                   <MapPin className="w-4 h-4 text-blue-600" />
//                   <div className="text-sm text-gray-800">{s}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Dates */}
//         <MonthYearSelect
//           label="Start Date *"
//           value={formData.startDate}
//           onChange={(val) => handleDateChange("startDate", val)}
//         />
//         {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

//         <div className="mt-2">
//           <CheckboxField
//             label="Currently working here"
//             name="currentlyWorking"
//             checked={formData.currentlyWorking}
//             onChange={handleChange}
//           />
//         </div>

//         {!formData.currentlyWorking && (
//           <>
//             <MonthYearSelect
//               label="End Date *"
//               value={formData.endDate}
//               onChange={(val) => handleDateChange("endDate", val)}
//             />
//             {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
//           </>
//         )}

//         {/* Description */}
//         <TextAreaField
//           label="Job Description *"
//           name="description"
//           value={formData.description || ""}
//           onChange={(newValue) => setFormData((p) => ({ ...p, description: newValue }))}
//           placeholder="What you did, tech, impact..."
//           error={errors.description}
//           maxLength={MAX_LENGTHS.description}
//         />

//         {/* Skills */}
//         <div>
//           <FormAchievements
//             label="Skills"
//             values={formData.skills}
//             onChange={handleSkillsChange}
//             buttonshow={false}
//             maxItemLength={MAX_LENGTHS.skill}
//           />
//           <p className="text-xs text-gray-400 mt-1">Max {MAX_SKILLS} skills</p>
//         </div>

//         {/* Achievements */}
//         <div>
//           <FormAchievements
//             label="Key Achievements"
//             values={formData.keyAchievements}
//             onChange={handleAchievementsChange}
//             buttonshow={false}
//             maxItemLength={MAX_LENGTHS.achievement}
//           />
//           <p className="text-xs text-gray-400 mt-1">Max {MAX_ACHIEVEMENTS} achievements</p>
//         </div>
//       </div>

//         <MediaUpload
//   label="Media Upload Optional"
//   accept="image/*"
//   maxSizeMB={1}
//   initialFile={formData.expemedia} // ✅ show existing logo when editing
//   onFileSelect={(file) => setFormData((p) => ({ ...p, logo: file }))}
// />
//       {/* Actions */}
//       <div className="sticky bg-[#10151B] right-0 -bottom-5 py-2">
//   <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
//         <button
//           type="button"
//           onClick={() => onCancel?.()}
//           className="px-4 py-2 rounded-full bg-[#333A44] text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 rounded-full bg-blue-600 text-white"
//         >
//           Save
//         </button>
//       </div>
//       </div>
    
//     </form>
//   );
// });

// export default ExperienceForm;




"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { InputWithCount } from "../components/FormInput";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/FormSelect";
import FormAchievements from "../components/FormAchievements";
import CheckboxField from "../components/CheckboxField";
import MonthYearSelect from "../components/MonthYearSelect";
import { MapPin } from "lucide-react";
import MediaUpload from "../components/MediaUpload";

const MAX_SKILLS = 8;
const MAX_ACHIEVEMENTS = 4;
const MAX_LENGTHS = {
  jobTitle: 100,
  company: 100,
  location: 100,
  description: 300,
  skill: 50,
  achievement: 200,
};

const JOB_TITLES = ["Software Engineer","Frontend Developer","Backend Developer","UI/UX Designer","Data Scientist"];
const COMPANIES = ["Google","Microsoft","Amazon","AmbiSpine Technologies","Infosys"];
const LOCATIONS = ["London, United Kingdom","New York, USA","Bangalore, India","Remote","San Francisco, USA"];

const ExperienceForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
  const empty = {
    jobTitle: "",
    company: "",
    employmentType: "",
    location: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    description: "",
    currentlyWorking: false,
    skills: [],
    keyAchievements: [],
    media: null, // ✅ media field define
  };

  const [formData, setFormData] = useState(initialData || empty);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState({ jobTitle: [], company: [], location: [] });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setFormData(initialData || empty);
    setErrors({});
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    reset: () => setFormData(initialData || empty),
  }));

  const handleChange = (input) => {
    const { name, value, type, checked } = input.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData((p) => ({ ...p, [name]: finalValue }));

    if (["jobTitle", "company", "location"].includes(name)) {
      const dataset = name === "jobTitle" ? JOB_TITLES : name === "company" ? COMPANIES : LOCATIONS;
      const filtered = finalValue
        ? dataset.filter((it) => it.toLowerCase().includes(finalValue.toLowerCase()))
        : [];
      setSuggestions((prev) => ({ ...prev, [name]: filtered }));
    }
  };

  const handleValueChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (["jobTitle", "company", "location"].includes(field)) {
      const dataset = field === "jobTitle" ? JOB_TITLES : field === "company" ? COMPANIES : LOCATIONS;
      const filtered = value
        ? dataset.filter((it) => it.toLowerCase().includes(value.toLowerCase()))
        : [];
      setSuggestions((prev) => ({ ...prev, [field]: filtered }));
    }
  };

  const handleDateChange = (field, { type, value }) => {
    setFormData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
  };

  const handleSkillsChange = (newSkills) => {
    setFormData((p) => ({ ...p, skills: newSkills.slice(0, MAX_SKILLS) }));
  };

  const handleAchievementsChange = (newAchievements) => {
    setFormData((p) => ({ ...p, keyAchievements: newAchievements.slice(0, MAX_ACHIEVEMENTS) }));
  };

  const validate = () => {
    const e = {};
    if (!formData.jobTitle?.trim()) e.jobTitle = "Job title is required";
    if (!formData.company?.trim()) e.company = "Company name is required.";
    if (!formData.employmentType) e.employmentType = "Employment type is required.";
    if (!formData.startDate.month || !formData.startDate.year) e.startDate = "Start date is required.";
    if (!formData.currentlyWorking && (!formData.endDate.month || !formData.endDate.year))
      e.endDate = "Choose End date or 'Currently working'.";
    if (!formData.description?.trim()) e.description = "Job description is required.";
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

  const applySuggestion = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setSuggestions((s) => ({ ...s, [field]: [] }));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="px-4 py-3 space-y-3">
        {/* Job Title */}
        <div className="relative">
          <InputWithCount
            label="Job Title *"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={(val) => handleValueChange("jobTitle", val)}
            placeholder="Frontend Developer"
            maxLength={MAX_LENGTHS.jobTitle}
            error={errors.jobTitle}
                   onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            
          />
          { isFocused && suggestions.jobTitle.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.jobTitle.map((s, i) => (
                <div
                  key={i}
                  className="p-2 text-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => applySuggestion("jobTitle", s)}
                >
                  <div className="w-7 h-7 rounded-full bg-[#041424] text-gray-100 flex items-center justify-center text-xs font-semibold">
                    {s[0]}
                  </div>
                  <div className="text-sm text-gray-100">{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Company */}
        <div className="relative">
          <InputWithCount
            label="Company *"
            name="company"
            value={formData.company}
            onChange={(val) => handleValueChange("company", val)}
            placeholder="Ex. Google"
            maxLength={MAX_LENGTHS.company}
            error={errors.company}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />
          {suggestions.company.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.company.map((s, i) => (
                <div
                  key={i}
                  className="p-2  cursor-pointer flex items-center gap-3"
                  onClick={() => applySuggestion("company", s)}
                >
                  <img
                    src={`https://logo.clearbit.com/${s.toLowerCase().replace(/\s+/g, "")}.com`}
                    alt={s}
                    onError={(ev) => (ev.target.style.display = "none")}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <div className="text-sm text-gray-100">{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employment Type */}
        <SelectField
          label="Employment Type *"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          error={errors.employmentType}
          options={[
            { value: "", label: "Select" },
            { value: "Full-time", label: "Full-time" },
            { value: "Part-time", label: "Part-time" },
            { value: "Internship", label: "Internship" },
            { value: "Contract", label: "Contract" },
            { value: "Freelance", label: "Freelance" },
          ]}
        />

        {/* Location */}
        <div className="relative">
          <InputWithCount
            label="Location"
            name="location"
            value={formData.location}
            onChange={(val) => handleValueChange("location", val)}
            placeholder="City, Country or Remote"
            maxLength={MAX_LENGTHS.location}
            error={errors.location}
          />
          {suggestions.location.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.location.map((s, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => applySuggestion("location", s)}
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div className="text-sm text-gray-800">{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dates */}
        <MonthYearSelect
          label="Start Date *"
          value={formData.startDate}
          onChange={(val) => handleDateChange("startDate", val)}
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

        <div className="mt-2">
          <CheckboxField
            label="Currently working here"
            name="currentlyWorking"
            checked={formData.currentlyWorking}
            onChange={handleChange}
          />
        </div>

        {!formData.currentlyWorking && (
          <>
            <MonthYearSelect
              label="End Date *"
              value={formData.endDate}
              onChange={(val) => handleDateChange("endDate", val)}
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          </>
        )}

        {/* Description */}
        <TextAreaField
          label="Job Description *"
          name="description"
          value={formData.description || ""}
          onChange={(newValue) => setFormData((p) => ({ ...p, description: newValue }))}
          placeholder="What you did, tech, impact..."
          error={errors.description}
          maxLength={MAX_LENGTHS.description}
        />

        {/* Skills */}
        <div>
          <FormAchievements
            label="Skills"
            values={formData.skills}
            onChange={handleSkillsChange}
            buttonshow={false}
            maxItemLength={MAX_LENGTHS.skill}
          />
          <p className="text-xs text-gray-400 mt-1">Max {MAX_SKILLS} skills</p>
        </div>

        {/* Achievements */}
        <div>
          <FormAchievements
            label="Key Achievements"
            values={formData.keyAchievements}
            onChange={handleAchievementsChange}
            buttonshow={false}
            maxItemLength={MAX_LENGTHS.achievement}
          />
          <p className="text-xs text-gray-400 mt-1">Max {MAX_ACHIEVEMENTS} achievements</p>
        </div>
      </div>

         <MediaUpload
          label="Upload Certificate / Media (Optional)"
          accept="image/*"
          maxSizeMB={2}
          initialFile={formData.media} // ✅ Existing file shown in edit mode
          onFileSelect={(file) => setFormData((p) => ({ ...p, media: file }))} // ✅ update correct field
        />
      {/* Actions */}
      <div className="sticky bg-[#10151B] right-0 -bottom-5 py-2">
  <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onCancel?.()}
          className="px-4 py-2 rounded-full bg-[#333A44] text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
      </div>
    
    </form>
  );
});

export default ExperienceForm;
