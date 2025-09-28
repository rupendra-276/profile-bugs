// "use client";
// import React, { useState } from "react";
// import Button from "../components/Button";
// import InputWithCount from "../components/InputWithCount";
// import TextAreaField from "../components/TextAreaField";
// import SelectField from "../components/FormSelect";
// import MonthYearSelect from "../components/MonthYearSelect";
// import FormAchievements from "../components/FormAchievements";
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import { FaExternalLinkAlt, FaGithub, FaBook } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";

// export default function ProjectSection() {
//   const [formOpen, setFormOpen] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [editIndex, setEditIndex] = useState(null);
//   const [customCategory, setCustomCategory] = useState("");
//   const [showAll, setShowAll] = useState(false);

//   // ✅ Dummy Projects
//   const [projects, setProjects] = useState([
//     {
//       title: "Portfolio Website",
//       category: "Web App",
//       description:
//         "A personal portfolio website to showcase projects and achievements. Built with React, Tailwind CSS, and deployed on Vercel.",
//       technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Vercel"],
//       startDate: { month: "Jan", year: "2024" },
//       endDate: { month: "Feb", year: "2024" },
//       teamSize: "1",
//       role: "Frontend Developer",
//       liveDemo: "https://myportfolio.com",
//       sourceCode: "https://github.com/username/portfolio",
//       documentation: "",
//       image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
//       achievements: ["Designed responsive UI", "Optimized performance"],
//     },
//     {
//       title: "Movie Recommendation System",
//       category: "Data Science",
//       description:
//         "A ML-based movie recommendation engine using collaborative filtering.",
//       technologies: ["Python", "Pandas", "Scikit-learn"],
//       startDate: { month: "Mar", year: "2023" },
//       endDate: { month: "Jun", year: "2023" },
//       teamSize: "3",
//       role: "Data Scientist",
//       liveDemo: "",
//       sourceCode: "https://github.com/username/movierec",
//       documentation: "",
//       image: "",
//       achievements: ["Handled large datasets", "Improved accuracy by 15%"],
//     },
//   ]);

//   // ✅ Initial Form State
//   function initialFormState() {
//     return {
//       title: "",
//       category: "",
//       description: "",
//       technologies: [],
//       startDate: "",
//       endDate: "",
//       teamSize: "",
//       role: "",
//       liveDemo: "",
//       sourceCode: "",
//       documentation: "",
//       image: "",
//       achievements: [],
//     };
//   }
//   const [project, setProject] = useState(initialFormState());

//   // ✅ Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleTechnologiesChange = (newTech) => {
//     setProject((prev) => ({ ...prev, technologies: newTech }));
//   };

//   const handleAchievementsChange = (newAch) => {
//     setProject((prev) => ({ ...prev, achievements: newAch }));
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!project.title) newErrors.title = "Project Title is required.";
//     if (!project.category) newErrors.category = "Category is required.";
//     if (!project.description) newErrors.description = "Description is required.";
//     if (!project.startDate) newErrors.startDate = "Start date is required.";
//     if (!project.role) newErrors.role = "Your role is required.";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     if (editIndex !== null) {
//       const updated = [...projects];
//       updated[editIndex] = project;
//       setProjects(updated);
//       setEditIndex(null);
//     } else {
//       setProjects((prev) => [...prev, project]);
//     }

//     setProject(initialFormState());
//     setErrors({});
//     setFormOpen(false);
//     setCustomCategory("");
//   };

//   const handleEdit = (index) => {
//     setProject(projects[index]);
//     setEditIndex(index);
//     setFormOpen(true);
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       const filtered = projects.filter((_, i) => i !== index);
//       setProjects(filtered);
//     }
//   };

//   return (
//     <div className="p-5 rounded-lg bg-[#040711] shadow-md">
//       {/* Heading */}

//         <div className="flex justify-between items-center mb-3">
//               <h3 className="text-2xl font-medium text-white">Projects</h3>
//               <button
             
//               onClick={() => {
//               setProject(initialFormState());
//               setEditIndex(null);
//               setFormOpen(true);
//             }}
//                 className="border border-white rounded-2xl text-white px-3 text-sm py-1 flex items-center gap-1"
//               >
//               <IoMdAdd className="w-6 h-6" /> Add
//               </button>
//             </div>

    

//       {/* No projects */}
//       {!formOpen && projects.length === 0 && (
//         <p className="text-gray-200 italic">
//           Add your projects to showcase your work and achievements.
//         </p>
//       )}

// {/* ✅ Projects List */}
// {!formOpen && projects.length > 0 && (
//   <div className="mt-6">
//     {/* Project Grid */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {projects.slice(0, 3).map((proj, idx) => {
//         const techToShow = proj.technologies?.slice(0, 3) || [];
//         const techRemaining = proj.technologies?.length - 3;

//         return (
//           <div
//             key={idx}
//             className="p-4 rounded-xl border border-gray-300 shadow-md bg-white hover:shadow-lg transition"
//           >
//             {/* 🔹 Header Row: Title + Category + Date + Actions */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <h4 className="font-semibold text-lg text-gray-800">
//                   {proj.title}{" "}
//                   <span className="text-gray-500 text-sm">
//                     ({proj.category})
//                   </span>
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   {proj.startDate.month} {proj.startDate.year} –{" "}
//                   {proj.endDate
//                     ? `${proj.endDate.month} ${proj.endDate.year}`
//                     : "Ongoing"}
//                 </p>
//               </div>

//               {/* Edit/Delete buttons */}
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   onClick={() => handleEdit(idx)}
//                   buttonclass="!bg-transparent !text-black text-lg border border-blue-300"
//                 >
//                   <CiEdit />
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => handleDelete(idx)}
//                   buttonclass="!bg-transparent !text-red-700 border border-red-300"
//                 >
//                   <MdDelete />
//                 </Button>
//               </div>
//             </div>

//             {/* 🔹 Project Image */}
//             {proj.image && (
//               <div className="mt-3 text-center">
//                 <img
//                   src={proj.image}
//                   alt={proj.title}
//                   className="w-full h-40 object-cover rounded-lg border"
//                 />
//               </div>
//             )}

//             {/* 🔹 Description */}
//             <p className="mt-3 text-sm text-gray-700">{proj.description}</p>

//             {/* 🔹 Technologies */}
//             {proj.technologies?.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2 text-sm">
//                 {techToShow.map((tech, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-0.5 border text-sm border-gray-400 rounded-full"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//                 {techRemaining > 0 && (
//                   <span className="px-2 py-0.5 text-sm border border-gray-400 rounded-full  text-gray-600 cursor-pointer hover:underline">
//                     +{techRemaining} more
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* 🔹 Achievements */}
//             {proj.achievements?.length > 0 && (
//               <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
//                 {proj.achievements.map((ach, i) => (
//                   <li key={i}>{ach}</li>
//                 ))}
//               </ul>
//             )}

//             {/* 🔹 Links */}
//             <div className="mt-3 flex flex-wrap gap-4 text-sm text-blue-600">
//               {proj.liveDemo && (
//                 <a
//                   href={proj.liveDemo}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-1 hover:underline"
//                 >
//                   <FaExternalLinkAlt /> Live Demo
//                 </a>
//               )}
//               {proj.sourceCode && (
//                 <a
//                   href={proj.sourceCode}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-1 hover:underline"
//                 >
//                   <FaGithub /> Source
//                 </a>
//               )}
//               {proj.documentation && (
//                 <a
//                   href={proj.documentation}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-1 hover:underline"
//                 >
//                   <FaBook /> Docs
//                 </a>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* ✅ Show "+ more" if > 3 projects */}
//     {projects.length > 3 && (
//       <div className="mt-4 text-center">
//         <button
//           onClick={() => setShowAll((prev) => !prev)}
//           className="text-blue-600 font-medium hover:underline"
//         >
//           {showAll ? "Show Less" : `+${projects.length - 3} more`}
//         </button>
//       </div>
//     )}

//     {/* ✅ Extra Projects if showAll */}
//     {showAll && (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         {projects.slice(3).map((proj, idx) => (
//           <div
//             key={idx}
//             className="p-4 rounded-xl border border-gray-300 shadow-md bg-white hover:shadow-lg transition"
//           >
//             <h4 className="font-semibold text-lg text-gray-800">
//               {proj.title} ({proj.category})
//             </h4>
//             <p className="text-sm text-gray-600">
//               {proj.startDate.month} {proj.startDate.year} –{" "}
//               {proj.endDate
//                 ? `${proj.endDate.month} ${proj.endDate.year}`
//                 : "Ongoing"}
//             </p>
//             <p className="mt-2 text-gray-700">{proj.description}</p>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// )}

//       {/* Project Form */}
//       {formOpen && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputWithCount
//             label="Project Title *"
//             name="title"
//             value={project.title}
//             onChange={handleChange}
//             error={errors.title}
//           />

//           {/* Category with Other */}
//           <SelectField
//             label="Category *"
//             name="category"
//             value={project.category}
//             onChange={(e) => {
//               const { value } = e.target;
//               setProject((prev) => ({ ...prev, category: value }));
//               if (value !== "Other") setCustomCategory("");
//             }}
//             error={errors.category}
//             options={[
//               { value: "", label: "Please Select" },
//               { value: "Web App", label: "Web App" },
//               { value: "Mobile App", label: "Mobile App" },
//               { value: "Data Science", label: "Data Science" },
//               { value: "AI/ML", label: "AI/ML" },
//               { value: "Desktop App", label: "Desktop Application" },
//               { value: "GameDev", label: "Game Development" },
//               { value: "Cloud", label: "Cloud / DevOps Project" },
//               { value: "IoT", label: "IoT / Hardware Project" },
//               { value: "OpenSource", label: "Open Source Contribution" },
//               { value: "Research", label: "Research / Academic Project" },
//               { value: "Other", label: "Other" },
//             ]}
//           />
//           {project.category === "Other" && (
//             <InputWithCount
//               label="Custom Category"
//               name="customCategory"
//               value={customCategory}
//               onChange={(e) => {
//                 setCustomCategory(e.target.value);
//                 setProject((prev) => ({ ...prev, category: e.target.value }));
//               }}
//               placeholder="Enter your custom category"
//             />
//           )}

//           <TextAreaField
//             label="Description *"
//             name="description"
//             value={project.description}
//             onChange={handleChange}
//             error={errors.description}
//           />

//           <FormAchievements
//             label="Technologies Used"
//             values={project.technologies}
//             onChange={handleTechnologiesChange}
//           />

//           <MonthYearSelect
//             label="Start Date *"
//             value={project.startDate}
//             onChange={(val) =>
//               setProject((prev) => ({ ...prev, startDate: val }))
//             }
//           />
//           {errors.startDate && (
//             <p className="text-red-500 text-sm">{errors.startDate}</p>
//           )}

//           <MonthYearSelect
//             label="End Date"
//             value={project.endDate}
//             onChange={(val) =>
//               setProject((prev) => ({ ...prev, endDate: val }))
//             }
//           />

//           <InputWithCount
//             label="Team Size"
//             name="teamSize"
//             value={project.teamSize}
//             onChange={handleChange}
//           />

//           <InputWithCount
//             label="Your Role *"
//             name="role"
//             value={project.role}
//             onChange={handleChange}
//             error={errors.role}
//           />

//           <InputWithCount
//             label="Live Demo URL"
//             name="liveDemo"
//             value={project.liveDemo}
//             onChange={handleChange}
//           />
//           <InputWithCount
//             label="Source Code URL"
//             name="sourceCode"
//             value={project.sourceCode}
//             onChange={handleChange}
//           />
//           <InputWithCount
//             label="Documentation URL"
//             name="documentation"
//             value={project.documentation}
//             onChange={handleChange}
//           />

//           <InputWithCount
//             label="Project Image (URL)"
//             name="image"
//             value={project.image}
//             onChange={handleChange}
//           />

//           <FormAchievements
//             label="Key Achievements"
//             values={project.achievements}
//             onChange={handleAchievementsChange}
//           />

//           <div className="flex justify-end gap-3">
//             <Button type="submit"  buttonclass="text-white" >
//               {editIndex !== null ? "Update Project" : "Save Project"}
//             </Button>
//             <Button
//               type="button"
//               onClick={() => {
//                 setFormOpen(false);
//                 setProject(initialFormState());
//                 setEditIndex(null);
//                 setCustomCategory("");
//               }}
//               buttonclass="bg-gray-300 text-black"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
    
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import InputWithCount from "../components/InputWithCount";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/FormSelect";
import MonthYearSelect from "../components/MonthYearSelect";
import FormAchievements from "../components/FormAchievements";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt, FaGithub, FaBook, FaCode } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AnimatedWrapper } from '../animation/animation'
import { X } from "lucide-react";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=2000";

function emptyDate() {
  return { month: "", year: "" };
}
function initialFormState() {
  return {
    id: null,
    title: "",
    category: "",
    description: "",
    technologies: [],
    startDate: emptyDate(),
    endDate: emptyDate(),
    teamSize: "",
    role: "",
    liveDemo: "",
    sourceCode: "",
    documentation: "",
    image: "",
    achievements: [],
    status: "", // optional: in-progress / completed / planned
  };
}

export default function ProjectSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Job Portal Platform",
      category: "Web App",
      description:
        "A comprehensive job portal connecting job seekers with recruiters, featuring community features, skill assessments, and interview scheduling.",
      technologies: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
      startDate: { month: "Mar", year: "2024" },
      endDate: null,
      teamSize: "4",
      role: "Lead Frontend Developer",
      liveDemo: "",
      sourceCode: "",
      documentation: "",
      image: DEFAULT_IMAGE,
      achievements: ["Built reusable components", "Integrated auth & roles"],
      status: "in-progress",
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Web App",
      description:
        "Personal portfolio to showcase projects and achievements, built with React and Tailwind and deployed on Vercel.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
      startDate: { month: "Jan", year: "2024" },
      endDate: { month: "Feb", year: "2024" },
      teamSize: "1",
      role: "Frontend Developer",
      liveDemo: "https://myportfolio.com",
      sourceCode: "https://github.com/username/portfolio",
      documentation: "",
      image: "",
      achievements: ["Responsive UI", "Performance optimizations"],
      status: "completed",
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [project, setProject] = useState(initialFormState());
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((p) => ({ ...p, [name]: value }));
  };
  const handleTechnologiesChange = (newTech) =>
    setProject((p) => ({ ...p, technologies: newTech }));
  const handleAchievementsChange = (newAch) =>
    setProject((p) => ({ ...p, achievements: newAch }));

  const validateForm = () => {
    const newErrors = {};
    if (!project.title?.trim()) newErrors.title = "Project Title is required.";
    if (!project.category?.trim()) newErrors.category = "Category is required.";
    if (!project.description?.trim()) newErrors.description = "Description is required.";
    if (!project.startDate?.month || !project.startDate?.year)
      newErrors.startDate = "Start month & year required.";
    if (!project.role?.trim()) newErrors.role = "Role is required.";
    return newErrors;
  };

  const handleOpenAdd = () => {
    setProject(initialFormState());
    setEditIndex(null);
    setCustomCategory("");
    setErrors({});
    setFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const prepared = { ...project };
    if (editIndex !== null) {
      setProjects((prev) => {
        const p = [...prev];
        p[editIndex] = { ...prepared };
        return p;
      });
      setEditIndex(null);
    } else {
      prepared.id = Date.now();
      setProjects((prev) => [...prev, prepared]);
    }

    setProject(initialFormState());
    setFormOpen(false);
    setErrors({});
    setCustomCategory("");
  };

  const handleEdit = (index) => {
    const copy = JSON.parse(JSON.stringify(projects[index]));
    copy.startDate = copy.startDate || emptyDate();
    copy.endDate = copy.endDate || emptyDate();
    setProject(copy);
    setEditIndex(index);
    setFormOpen(true);
    setErrors({});
  };

  const handleDelete = (index) => {
    const p = projects[index];
    if (window.confirm(`Delete project "${p.title}"?`)) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
      if (editIndex === index) {
        setFormOpen(false);
        setEditIndex(null);
      }
    }
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) setFormOpen(false);
  };

  // small helper for badge color
  const statusClasses = (s) =>
    s === "in-progress"
      ? "bg-yellow-100 text-yellow-800"
      : s === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  return (
    <div className="p-6 rounded-lg bg-[#040711] shadow-md text-white">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-medium">Projects</h3>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 border border-white px-3 py-1 rounded-2xl text-white text-sm"
        >
          <IoMdAdd className="w-5 h-5" />
          Add
        </button>
      </div>

      {/* list */}
      <div className="">
        {(showAll ? projects : projects.slice(0, 3)).map((proj, idx) => {
          const techToShow = proj.technologies?.slice(0, 3) || [];
          const techRemaining = (proj.technologies?.length || 0) - techToShow.length;
          return (
            <div  key={proj.id ?? idx}  className="">
                  <div className="flex gap-4 p-4">
                {/* thumbnail */}
                <div className="">
                  {proj.image ? (
                    <div className="w-52">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    " "
                  )}
                </div>

                {/* content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{proj.title}</h4>
                      <h6 className="text-gray-100 text-xs font-semibold"> Frontend Developer Custon  <span> Team: {proj.teamSize || "—"}</span></h6>
                      <div className="text-sm text-gray-300 mt-2">
                        {proj.category} • {proj.startDate?.month} {proj.startDate?.year}
                        {proj.endDate && proj.endDate.month && proj.endDate.year ? ` – ${proj.endDate.month} ${proj.endDate.year}` : " • Ongoing"}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(idx)} className="p-1 rounded border border-blue-200 hover:cursor-pointer" aria-label="edit">
                        <CiEdit />
                      </button>
                      <button onClick={() => handleDelete(idx)} className="p-1 rounded border border-red-200 text-red-600 hover:cursor-pointer" aria-label="delete">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white line-clamp-3">{proj.description}</p>

                  {/* tech chips */}
                  {techToShow.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {techToShow.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 border border-gray-300 text-sm rounded-full">{t}</span>
                      ))}
                      {techRemaining > 0 && <span className="px-2 py-0.5 text-sm border border-gray-300 rounded-full">+{techRemaining} more</span>}
                    </div>
                  )}

                  {/* links */}
                  <div className="mt-3 flex gap-3 items-center text-sm">
                    {proj.sourceCode && (
                      <a href={proj.sourceCode} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline ">
                        <FaGithub /> Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline ">
                        <FaExternalLinkAlt /> Demo
                      </a>
                    )}
                    {proj.documentation && (
                      <a href={proj.documentation} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-blue-600">
                        <FaBook /> Docs
                      </a>
                    )}

                    {/* small spacer then achievements collapse text */}
                  </div>
                </div>
              </div>
                          <div key={proj.id ?? idx} className="relative  text-white rounded-xl">
              {/* status badge */}
              {proj.status && (
                <div className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${statusClasses(proj.status)}`}>
                  {proj.status}
                </div>
              )}

             
            </div>
            </div>

          );
        })}
      </div>

      {projects.length > 2 && (
        <div className="mt-4 text-center">
          <button onClick={() => setShowAll((s) => !s)} className="text-blue-500 hover:underline font-medium">
            {showAll ? "Show Less" : `+${projects.length - 3} more`}
          </button>
        </div>
      )}

      {/* modal with simple fade animation */}
      {formOpen && (
      
         <AnimatedWrapper className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                  <div className="bg-[#040711] m-4 rounded-lg w-full max-w-2xl shadow-lg  flex flex-col">
                     <div className="relative border-b border-gray-200/50 py-3 px-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white">
                          {editIndex !== null ? "Edit Education" : "Add Education"}
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setFormOpen(false);
                            setEducation(initialFormState());
                            setEditIndex(null);
                            setErrors({});
                          }}
                          className="p-2 text-white hover:text-gray-200 hover:cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                    <form onSubmit={handleSubmit} >
                      <div className="px-6 py-4 overflow-y-auto custom-scroll space-y-3 max-h-[65vh]">
<InputWithCount label="Project Title *" name="title" value={project.title} onChange={handleChange} error={errors.title} />

              <SelectField
                label="Category *"
                name="category"
                value={project.category}
                onChange={(e) => {
                  const v = e.target.value;
                  setProject((p) => ({ ...p, category: v }));
                  if (v !== "Other") setCustomCategory("");
                }}
                error={errors.category}
                options={[
                  { value: "", label: "Please Select" },
                  { value: "Web App", label: "Web App" },
                  { value: "Mobile App", label: "Mobile App" },
                  { value: "Data Science", label: "Data Science" },
                  { value: "AI/ML", label: "AI/ML" },
                  { value: "Desktop App", label: "Desktop Application" },
                  { value: "GameDev", label: "Game Development" },
                  { value: "Cloud", label: "Cloud / DevOps Project" },
                  { value: "IoT", label: "IoT / Hardware Project" },
                  { value: "OpenSource", label: "Open Source Contribution" },
                  { value: "Research", label: "Research / Academic Project" },
                  { value: "Other", label: "Other" },
                ]}
              />

              {project.category === "Other" && (
                <InputWithCount label="Custom Category" name="customCategory" value={customCategory} onChange={(e) => {
                  setCustomCategory(e.target.value);
                  setProject((p) => ({ ...p, category: e.target.value }));
                }} placeholder="Enter custom category" />
              )}

              <TextAreaField label="Description *" name="description" value={project.description} onChange={handleChange} error={errors.description} />

              <FormAchievements label="Technologies Used" values={project.technologies} onChange={handleTechnologiesChange} />

                  <div>
                    
                  <MonthYearSelect label="Start Date *" value={project.startDate} onChange={(val) => setProject((p) => ({ ...p, startDate: val }))} />

                  </div>

                  <MonthYearSelect label="End Date" value={project.endDate} onChange={(val) => setProject((p) => ({ ...p, endDate: val }))} />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputWithCount label="Team Size" name="teamSize" value={project.teamSize} onChange={handleChange} />
                <InputWithCount label="Your Role *" name="role" value={project.role} onChange={handleChange} error={errors.role} />
              </div>

              <InputWithCount label="Live Demo URL" name="liveDemo" value={project.liveDemo} onChange={handleChange} />
              <InputWithCount label="Source Code URL" name="sourceCode" value={project.sourceCode} onChange={handleChange} />
              <InputWithCount label="Documentation URL" name="documentation" value={project.documentation} onChange={handleChange} />
              <InputWithCount label="Project Image (URL)" name="image" value={project.image} onChange={handleChange} />
              <InputWithCount label="Status (optional)" name="status" value={project.status} onChange={handleChange} />

              <FormAchievements label="Key Achievements" values={project.achievements} onChange={handleAchievementsChange} 
              buttonshow={false} />

              <div className="flex justify-end gap-3 mt-4">
                <Button type="submit" buttonclass="bg-blue-600 text-white">{editIndex !== null ? "Update Project" : "Save Project"}</Button>
              </div>
                      </div>
              
            </form>
                  </div>
         </AnimatedWrapper>
      
      )}
    </div>
  );
}
