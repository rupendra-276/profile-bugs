// "use client";
// import React, { useEffect, useState, useMemo } from "react";

// /**
//  * ResumeBuilder
//  * Props:
//  * - currentUser: object | null  (optional)
//  * - onSave: function(data)      (optional) called when user finishes
//  */
// export default function ResumeBuilder({ currentUser = null, onSave }) {
//   const STEPS = ["Welcome", "Upload / Auto-fill", "Experience", "Skills", "Review"];
//   const STORAGE_KEY = "resume_builder_draft_v1";

//   // main form state
//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [draft, setDraft] = useState({
//     // fill from currentUser if present
//     name: currentUser?.name || "",
//     headline: currentUser?.headline || "",
//     // do not expose private fields in UI by default (email/phone hidden)
//     emailHidden: true,
//     phoneHidden: true,
//     experienceText: currentUser?.about || "",
//     resumeFile: null, // File object
//     experienceLevel: currentUser?.experienceLevel || "", // "student"|"graduate"|...
//     skills: currentUser?.skills ? [...currentUser.skills] : [],
//     pressingIssues: currentUser?.pressingIssues ? [...currentUser.pressingIssues] : [],
//     createdAt: currentUser?.createdAt || new Date().toISOString(),
//   });

//   // hydrate from localStorage on mount (merged with currentUser)
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem(STORAGE_KEY);
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         setDraft((prev) => ({ ...prev, ...parsed }));
//       } else if (currentUser) {
//         // If no draft but currentUser exists, ensure data reflects that
//         setDraft((prev) => ({
//           ...prev,
//           name: currentUser.name || prev.name,
//           headline: currentUser.headline || prev.headline,
//           experienceText: currentUser.about || prev.experienceText,
//           experienceLevel: currentUser.experienceLevel || prev.experienceLevel,
//           skills: currentUser.skills || prev.skills,
//           pressingIssues: currentUser.pressingIssues || prev.pressingIssues,
//         }));
//       }
//     } catch (e) {
//       console.warn("ResumeBuilder: failed to read localStorage", e);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // autosave to localStorage
//   useEffect(() => {
//     try {
//       // do not store File object in localStorage; store file name only
//       const toStore = { ...draft, resumeFile: draft.resumeFile ? { name: draft.resumeFile.name } : null };
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
//     } catch (e) {
//       console.warn("ResumeBuilder: autosave failed", e);
//     }
//   }, [draft]);

//   // helpers for navigation
//   const canNext = useMemo(() => {
//     // minimal validation per step
//     if (step === 0) return true;
//     if (step === 1) return true; // upload optional
//     if (step === 2) return !!draft.experienceLevel; // must pick experience level
//     if (step === 3) return draft.skills.length > 0; // at least one skill
//     return true;
//   }, [step, draft]);

//   // file upload (no parsing here — placeholder for PDF parse)
//   const onFileChange = (e) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     // Only allow PDF or docx
//     if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
//       alert("Please upload a PDF or Word document.");
//       return;
//     }
//     setDraft((prev) => ({ ...prev, resumeFile: f }));
//     // Placeholder: you can send the file to server for parsing here
//   };

//   // skills tag input
//   const addSkill = (value) => {
//     const v = value?.trim();
//     if (!v) return;
//     if (draft.skills.includes(v)) return;
//     setDraft((prev) => ({ ...prev, skills: [...prev.skills, v] }));
//   };
//   const removeSkill = (skill) => setDraft((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }));

//   // pressing issues options (match your screenshot)
//   const PRESSING = [
//     "Getting more interviews",
//     "Networking strategies",
//     "Changing my career",
//     "Finding the right job",
//     "Showcasing my skills",
//     "Nailing job interviews",
//     "Negotiating salary",
//     "Writing an application",
//   ];

//   const togglePressing = (item) => {
//     setDraft((prev) => {
//       const exists = prev.pressingIssues.includes(item);
//       return {
//         ...prev,
//         pressingIssues: exists ? prev.pressingIssues.filter((p) => p !== item) : [...prev.pressingIssues, item],
//       };
//     });
//   };

//   // experience cards
//   const EXPERIENCE_LEVELS = [
//     { id: "student", label: "Student", subtitle: "Just starting out" },
//     { id: "graduate", label: "Graduate", subtitle: "Some experience" },
//     { id: "intermediate", label: "Intermediate", subtitle: "1-5 years" },
//     { id: "senior", label: "Senior", subtitle: "5+ years" },
//     { id: "freelancer", label: "Freelancer", subtitle: "Any experience" },
//   ];

//   // finish handler
//   const handleFinish = async () => {
//     setLoading(true);
//     try {
//       // Build final object (do not include private raw fields if user asked to hide)
//       const output = {
//         name: draft.name,
//         headline: draft.headline,
//         experienceText: draft.experienceText,
//         experienceLevel: draft.experienceLevel,
//         skills: draft.skills,
//         pressingIssues: draft.pressingIssues,
//         resumeFileName: draft.resumeFile?.name || null,
//         updatedAt: new Date().toISOString(),
//       };

//       // optional: call onSave prop to persist to backend / redux
//       if (typeof onSave === "function") {
//         await onSave(output);
//       }

//       // download JSON as fallback
//       const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `resume_${(draft.name || "profile").replace(/\s+/g, "_").toLowerCase()}.json`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       URL.revokeObjectURL(url);

//       // clear local draft after success
//       localStorage.removeItem(STORAGE_KEY);
//       setStep(0);
//       alert("Saved and downloaded! You can continue editing anytime.");
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Save failed. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UI subcomponents inline for clarity
//   const StepHeader = ({ title, subtitle }) => (
//     <div className="mb-4">
//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-2xl font-bold text-white">{title}</h2>
//           {subtitle && <p className="text-gray-300 mt-1">{subtitle}</p>}
//         </div>
//         <div className="text-sm text-gray-400">Step {step + 1} of {STEPS.length}</div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-[#2d3942] rounded-xl shadow-lg p-6">
//         {/* Progress tabs */}
//         <div className="mb-6">
//           <div className="flex gap-2 items-center">
//             {STEPS.map((s, i) => (
//               <div key={s} className={`flex-1 text-center py-2 rounded ${i === step ? "bg-[#16a085] text-white font-semibold" : "text-gray-300 bg-[#34414a]"}`}>
//                 {s}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-[#37454d] p-6 rounded-lg">
//           {step === 0 && (
//             <>
//               <StepHeader title={`Welcome ${draft.name ? draft.name.split(" ")[0] : "User"}!`} subtitle="Let's turn your experience into a résumé that opens doors!" />
//               <div className="text-center">
//                 <img src="/resume-illustration.svg" alt="resume" className="mx-auto mb-6 max-h-40" />
//                 <button
//                   className="px-6 py-2 rounded-full bg-[#16a085] text-white font-medium"
//                   onClick={() => setStep(1)}
//                 >
//                   Start my résumé
//                 </button>
//               </div>
//             </>
//           )}

//           {step === 1 && (
//             <>
//               <StepHeader title="Upload / Auto-fill" subtitle="Optional — upload an existing résumé to pre-fill fields." />
//               <div className="space-y-4">
//                 <div className="p-4 rounded bg-[#2b3840] border border-gray-600">
//                   <label className="block mb-2 text-sm text-gray-200">Upload résumé (PDF or Word)</label>
//                   <input type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="text-sm text-gray-100" />
//                   {draft.resumeFile && (
//                     <p className="text-sm text-gray-300 mt-2">Uploaded: <strong>{draft.resumeFile.name}</strong></p>
//                   )}
//                   <p className="text-xs text-gray-400 mt-2">Tip: uploading enables fast auto-fill. We do not publish your file publicly.</p>
//                 </div>

//                 <div className="p-4 rounded bg-[#2b3840] border border-gray-600">
//                   <label className="block mb-2 text-sm text-gray-200">Short summary (editable)</label>
//                   <textarea
//                     rows={4}
//                     value={draft.experienceText}
//                     onChange={(e) => setDraft((p) => ({ ...p, experienceText: e.target.value }))}
//                     className="w-full p-2 rounded bg-[#10151B] text-white border border-gray-700"
//                     placeholder="Brief summary about your background..."
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <StepHeader title="What is your experience level?" subtitle="This helps us tailor the résumé to your needs." />
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {EXPERIENCE_LEVELS.map((lvl) => {
//                   const active = draft.experienceLevel === lvl.id;
//                   return (
//                     <button
//                       key={lvl.id}
//                       onClick={() => setDraft((p) => ({ ...p, experienceLevel: lvl.id }))}
//                       className={`flex flex-col items-start gap-2 p-4 rounded-lg border ${active ? "border-[#16a085] bg-[#1f2b2f]" : "border-gray-600 bg-[#243036]"} hover:scale-[1.01] transition`}
//                     >
//                       <div className="text-lg font-semibold text-white">{lvl.label}</div>
//                       <div className="text-xs text-gray-300">{lvl.subtitle}</div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <StepHeader title="Skills & Highlights" subtitle="Add your top skills (press Enter to add)." />
//               <div className="space-y-4">
//                 <div className="p-4 rounded bg-[#2b3840] border border-gray-600">
//                   <label className="block mb-2 text-sm text-gray-200">Add skills</label>
//                   <SkillInput skills={draft.skills} onAdd={(s) => addSkill(s)} onRemove={removeSkill} />
//                   <p className="text-xs text-gray-400 mt-2">Examples: React, TypeScript, System Design</p>
//                 </div>

//                 <div className="p-4 rounded bg-[#2b3840] border border-gray-600">
//                   <label className="block mb-2 text-sm text-gray-200">What are your most pressing issues?</label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {PRESSING.map((p) => (
//                       <PressingItem key={p} label={p} checked={draft.pressingIssues.includes(p)} onToggle={() => togglePressing(p)} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {step === 4 && (
//             <>
//               <StepHeader title="Review & Finish" subtitle="Check your résumé before saving or downloading." />
//               <div className="p-4 rounded bg-[#2b3840] border border-gray-600 space-y-3">
//                 <div>
//                   <div className="text-sm text-gray-400">Name</div>
//                   <div className="text-white font-medium">{draft.name || "—"}</div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Headline</div>
//                   <div className="text-white">{draft.headline || "—"}</div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Summary</div>
//                   <div className="text-white whitespace-pre-wrap">{draft.experienceText || "—"}</div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Experience level</div>
//                   <div className="text-white">{(EXPERIENCE_LEVELS.find(x => x.id === draft.experienceLevel)?.label) || "—"}</div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Skills</div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {draft.skills.length ? draft.skills.map(s => <span key={s} className="px-2 py-1 bg-[#16a085] rounded text-xs text-white">{s}</span>) : <span className="text-gray-400">—</span>}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Pressing issues</div>
//                   <div className="mt-2">
//                     {draft.pressingIssues.length ? draft.pressingIssues.map(p => <div key={p} className="text-white text-sm">• {p}</div>) : <div className="text-gray-400">—</div>}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-gray-400">Uploaded file</div>
//                   <div className="text-white">{draft.resumeFile?.name || "Not uploaded"}</div>
//                 </div>

//                 <div className="flex items-center justify-between gap-4 mt-4">
//                   <div>
//                     <button className="text-sm text-gray-300 underline" onClick={() => { setStep(0); }}>
//                       Edit from start
//                     </button>
//                   </div>
//                   <div className="flex gap-3">
//                     <button
//                       className="px-4 py-2 rounded bg-gray-600 text-white"
//                       onClick={() => {
//                         // quick download of what user sees
//                         const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement("a");
//                         a.href = url;
//                         a.download = `draft_${(draft.name || "profile").replace(/\s+/g, "_")}.json`;
//                         a.click();
//                         URL.revokeObjectURL(url);
//                       }}
//                     >
//                       Download Draft
//                     </button>

//                     <button
//                       className="px-4 py-2 rounded bg-[#16a085] text-white font-medium"
//                       onClick={handleFinish}
//                       disabled={loading}
//                     >
//                       {loading ? "Saving..." : "Save & Download JSON"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Navigation */}
//         <div className="flex items-center justify-between mt-6">
//           <div>
//             {step > 0 && (
//               <button className="px-4 py-2 rounded bg-gray-700 text-white mr-2" onClick={() => setStep((s) => Math.max(0, s - 1))}>
//                 Back
//               </button>
//             )}
//             <button
//               className="px-4 py-2 rounded bg-gray-600 text-white"
//               onClick={() => {
//                 // skip optional steps gracefully
//                 setStep((s) => Math.min(STEPS.length - 1, s + 1));
//               }}
//               disabled={!canNext}
//             >
//               {step === STEPS.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>

//           <div className="text-sm text-gray-400">
//             Progress: {Math.round(((step + (canNext ? 1 : 0)) / STEPS.length) * 100)}%
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* --------------------------------------
//    Small inline components used above
//    -------------------------------------- */

// function SkillInput({ skills = [], onAdd, onRemove }) {
//   const [v, setV] = useState("");
//   return (
//     <div>
//       <div className="flex gap-2 items-center flex-wrap">
//         {skills.map((s) => (
//           <span key={s} className="flex items-center gap-2 bg-[#1f2b2f] px-2 py-1 rounded text-xs text-white">
//             {s}
//             <button onClick={() => onRemove(s)} className="ml-1 text-red-300">×</button>
//           </span>
//         ))}

//         <input
//           value={v}
//           onChange={(e) => setV(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               onAdd(v);
//               setV("");
//             }
//           }}
//           placeholder="Type skill and press Enter"
//           className="bg-[#10151B] px-2 py-1 rounded text-white border border-gray-700"
//         />
//       </div>
//     </div>
//   );
// }

// function PressingItem({ label, checked, onToggle }) {
//   return (
//     <button
//       onClick={onToggle}
//       className={`flex items-center gap-3 p-3 rounded-lg border ${checked ? "bg-[#134b45] border-[#16a085] text-white" : "bg-[#213038] border-gray-600 text-gray-200"}`}
//     >
//       <div className={`w-5 h-5 rounded-sm border ${checked ? "bg-[#16a085] border-[#16a085]" : "border-gray-400"}`} />
//       <div className="text-sm text-left">{label}</div>
//     </button>
//   );
// }

"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FaUserGraduate, FaBriefcase, FaUserTie, FaLaptopCode, FaUserClock } from "react-icons/fa"; // icons for experience

export default function ResumeBuilder({ currentUser = null, onSave }) {
  const STEPS = ["Welcome", "Upload Résumé", "Experience", "Your Challenges", "Feedback", "Finish"];
  const STORAGE_KEY = "resume_builder_draft_v2";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [draft, setDraft] = useState({
    name: currentUser?.name || "",
    headline: currentUser?.headline || "",
    experienceText: currentUser?.about || "",
    resumeFile: null,
    experienceLevel: currentUser?.experienceLevel || "",
    pressingIssues: currentUser?.pressingIssues || [],
    hearAbout: "",
    hearOther: "",
    createdAt: new Date().toISOString(),
  });

  // hydrate
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDraft((prev) => ({ ...prev, ...JSON.parse(stored) }));
    } catch (e) {
      console.warn("hydrate failed", e);
    }
  }, []);

  // autosave
  useEffect(() => {
    try {
      const toStore = { ...draft, resumeFile: draft.resumeFile ? { name: draft.resumeFile.name } : null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (e) {}
  }, [draft]);

  // navigation validation
  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return true;
    if (step === 2) return !!draft.experienceLevel;
    if (step === 3) return draft.pressingIssues.length > 0;
    if (step === 4) return !!draft.hearAbout;
    return true;
  }, [step, draft]);

  // handlers
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
      alert("Only PDF/Word files allowed.");
      return;
    }
    setDraft((p) => ({ ...p, resumeFile: f }));
  };

  const togglePressing = (item) => {
    setDraft((p) => ({
      ...p,
      pressingIssues: p.pressingIssues.includes(item)
        ? p.pressingIssues.filter((x) => x !== item)
        : [...p.pressingIssues, item],
    }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const output = { ...draft, updatedAt: new Date().toISOString() };
      if (typeof onSave === "function") await onSave(output);
      localStorage.removeItem(STORAGE_KEY);
      setStep(step + 1); // go to Thank You
    } catch (e) {
      alert("Save failed.");
    } finally {
      setLoading(false);
    }
  };

  // data
  const EXPERIENCE_LEVELS = [
    { id: "student", label: "Student", icon: <FaUserGraduate />, subtitle: "Just starting" },
    { id: "graduate", label: "Graduate", icon: <FaUserClock />, subtitle: "Some experience" },
    { id: "intermediate", label: "Intermediate", icon: <FaLaptopCode />, subtitle: "1-5 years" },
    { id: "senior", label: "Senior", icon: <FaUserTie />, subtitle: "5+ years" },
    { id: "freelancer", label: "Freelancer", icon: <FaBriefcase />, subtitle: "Independent work" },
  ];

  const PRESSING = [
    "Getting more interviews",
    "Networking strategies",
    "Changing my career",
    "Finding the right job",
    "Negotiating salary",
       "Getting more interviews",
    "Networking strategies",
    "Changing my career",
    "Finding the right job",
    "Negotiating salary",
  ];

  const HEAR_OPTIONS = ["LinkedIn", "Friends", "College", "Events", "Other"];

  // UI
  const StepHeader = ({ title, subtitle }) => (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-gray-300 mt-2">{subtitle}</p>}
    </div>
  );

  return (
    <div className=" bg-[#1f2b2f] ">
      <div className=" p-6 rounded-2xl shadow-lg p-8">
        {/* Progress */}
        {/* <div className="flex items-center mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex-1 text-center py-2 rounded-lg mx-1 ${i === step ? "bg-[#16a085] text-white font-semibold" : "bg-[#2c3a40] text-gray-400"}`}>
              {s}
            </div>
          ))}
        </div> */}

        {/* Content */}
        <div>
          {step === 0 && (
            <>
              <StepHeader title={`Welcome ${draft.name || "User"}!`} subtitle="Let's craft a modern résumé together 🚀" />
              <img src="/Happy Girl.png" className="mx-auto w-40 h-40 mb-6" alt="resume" />

            </>
          )}

          {step === 1 && (
            <>
              <StepHeader title="Upload Résumé" subtitle="Upload an existing file (optional)" />
              <div className="p-6 bg-[#2c3a40] rounded-lg border border-gray-600 text-center">
                <input type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="block mx-auto text-sm text-gray-200" />
                {draft.resumeFile && <p className="text-sm text-green-400 mt-2">Uploaded: {draft.resumeFile.name}</p>}
                <textarea
                  rows={4}
                  value={draft.experienceText}
                  onChange={(e) => setDraft((p) => ({ ...p, experienceText: e.target.value }))}
                  placeholder="Write a short professional summary..."
                  className="w-full mt-4 p-3 rounded bg-[#1a252c] text-white border border-gray-600"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <StepHeader title="Experience Level" subtitle="Pick the level that best describes you" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setDraft((p) => ({ ...p, experienceLevel: lvl.id }))}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition ${draft.experienceLevel === lvl.id ? "bg-[#134b45] border-[#16a085]" : "bg-[#2c3a40] border-gray-600"}`}
                  >
                    <span className="text-xl">{lvl.icon}</span>
                    <div>
                      <div className="text-white font-semibold">{lvl.label}</div>
                      <div className="text-gray-400 text-xs">{lvl.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <StepHeader title="Your Challenges" subtitle="What are your biggest career challenges?" />
              <div className="space-y-3 grid grid-cols-1 gap-10 md:grid-cols-2">
                {PRESSING.map((p) => (
                  <label key={p} className="flex items-center gap-3 p-3 rounded-lg bg-[#2c3a40] hover:bg-[#34454f] cursor-pointer">
                    <input type="checkbox" checked={draft.pressingIssues.includes(p)} onChange={() => togglePressing(p)} className="w-5 h-5 rounded-full accent-[#16a085]" />
                    <span className="text-white">{p}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <StepHeader title="Feedback" subtitle="Tell us how you heard about this platform" />
              <select
                value={draft.hearAbout}
                onChange={(e) => setDraft((p) => ({ ...p, hearAbout: e.target.value }))}
                className="w-full p-3 rounded bg-[#2c3a40] text-white border border-gray-600"
              >
                <option value="">Select...</option>
                {HEAR_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {draft.hearAbout === "Other" && (
                <input
                  type="text"
                  value={draft.hearOther}
                  onChange={(e) => setDraft((p) => ({ ...p, hearOther: e.target.value }))}
                  placeholder="Please specify"
                  className="w-full mt-4 p-3 rounded bg-[#2c3a40] text-white border border-gray-600"
                />
              )}
            </>
          )}

          {step === 5 && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-white mb-4">🎉 Thank You!</h2>
              <p className="text-gray-300 mb-6">Your résumé info has been saved successfully.</p>
              <button
                className="px-6 py-3 rounded-lg bg-[#16a085] text-white font-medium"
                onClick={() => setStep(0)}
              >
                Build Again
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
      {step < 5 && (
  <div className="flex justify-between mt-8">
    {/* Back button tabhi dikhaye jab step > 0 ho */}
    {step > 0 && (
      <button
        onClick={() => setStep((s) => Math.max(0, s - 1))}
        className="px-4 py-2 rounded bg-gray-700 text-white"
      >
        Back
      </button>
    )}

    {step === 4 ? (
      <button
        onClick={handleFinish}
        className="px-6 py-2 rounded bg-[#16a085] text-white font-semibold"
        disabled={!canNext || loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    ) : (
          <div className="flex justify-end">
      <button
        onClick={() => setStep((s) => s + 1)}
        className="px-6 py-2 rounded bg-[#16a085] text-white font-semibold disabled:opacity-40"
        disabled={!canNext}
      >
        Next
      </button>
          </div>

    )}
  </div>
)}

      </div>
    </div>
  );
}
