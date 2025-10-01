

// "use client";
// import React, { useRef, useState, useCallback } from "react";
// import ExperienceForm from "./ExperienceForm";
// import ExperienceList from "./ExperienceList";
// import ProfileAbout from "./ProfileAbout";
// import EducationForm from "./EducationForm";
// import EducationList from "./EducationList";
// import CertificationForm from "./CertificationForm";
// import CertificationList from "./CertificationList";
// import { Buttonborder } from "../components/Button";
// import { HiOutlineDocumentChartBar } from "react-icons/hi2";
// import Modal from "../components/Modal";
// import ProfileActivity from './ProfileActivity';

// const DesignerProfile = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [openModal, setOpenModal] = useState(false);
//   const [about, setAbout] = useState("");

//   // lifted states
//   const [experiences, setExperiences] = useState([]);
//   const [educations, setEducations] = useState([]);
//   const [certifications, setCertifications] = useState([]);

//   // modal-specific state
//   const [editIndex, setEditIndex] = useState(null);
//   const [currentData, setCurrentData] = useState(null);
//   const [modalActiveTab, setModalActiveTab] = useState("overview");

//   const formRef = useRef(null);
//   const listRef = useRef(null);

//   const tabs = [
//     { id: "overview", label: "Overview" },
//     { id: "education", label: "Education" },
//     { id: "experience", label: "Experience" },
//     { id: "certification", label: "Certification" },
//   ];

//   const openModalForTab = useCallback((tabId, data = null, idx = null) => {
//     setModalActiveTab(tabId);
//     setCurrentData(data);
//     setEditIndex(idx);
//     setOpenModal(true);
//   }, []);

//   const closeModal = useCallback(() => {
//     setOpenModal(false);
//     setEditIndex(null);
//     setCurrentData(null);
//   }, []);

//   const handleSave = useCallback((list, setList, data) => {
//     setList(prev => {
//       if (editIndex !== null && editIndex >= 0 && editIndex < prev.length) {
//         const copy = [...prev];
//         copy[editIndex] = data;
//         return copy;
//       }
//       return [...prev, data];
//     });
//     closeModal();
//   }, [editIndex, closeModal]);

//   const handleDelete = useCallback((list, setList, idx, type = "item") => {
//     if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
//     setList(prev => prev.filter((_, i) => i !== idx));
//     if (editIndex === idx) setEditIndex(null);
//   }, [editIndex]);

//   // wrapper functions
//   const handleSaveEducation = data => handleSave(educations, setEducations, data);
//   const handleSaveExperience = data => {
//     handleSave(experiences, setExperiences, data);
//     setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
//   };
//   const handleSaveCertification = data => handleSave(certifications, setCertifications, data);

//   const handleDeleteEducation = idx => handleDelete(educations, setEducations, idx, "education");
//   const handleDeleteExperience = idx => handleDelete(experiences, setExperiences, idx, "experience");
//   const handleDeleteCertification = idx => handleDelete(certifications, setCertifications, idx, "certification");

//   return (
//     <div className="border-gray-100 rounded-sm mt-6">
//       {/* Top Tabs */}
//       <div className="flex justify-between items-center border-b border-gray-400 pb-5">
//         <div className="flex space-x-2">
//           {tabs.map(tab => (
//             <Buttonborder
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               classNameborder={`bg-transparent px-1.5 py-1 capitalize hover:cursor-pointer ${
//                 activeTab === tab.id ? "text-white font-semibold border rounded-3xl px-2" : "text-gray-400"
//               }`}
//               name={tab.label}
//             />
//           ))}
//         </div>
//         <Buttonborder
//           onClick={() => openModalForTab(activeTab)}
//           icon={HiOutlineDocumentChartBar}
//           name={activeTab === "overview" && !about ? "Add" : "Edit"}
//         />
//       </div>

//       {/* Single Modal */}
//       {openModal && (
//         <Modal
//           show={openModal}
//           onClose={closeModal}
//           widthClass="max-w-3xl"
//           onSubmit={() => formRef.current?.submit?.()}
//           submitLabel="Save"
//         >
//           <div className="flex relative justify-between gap-2 mb-3">
//             {tabs.map(tab => (
//               <Buttonborder
//                 key={tab.id}
//                 onClick={() => setModalActiveTab(tab.id)}
//                 classNameborder={`!bg-transparent !rounded-none !text-[14px] px-3 py-2 capitalize hover:cursor-pointer hover:!bg-[#333A44] ${
//                   modalActiveTab === tab.id ? "border-b-3 pb-2 border-blue-600 font-semibold" : "text-gray-400"
//                 }`}
//                 name={tab.label}
//               />
//             ))}
//           </div>

//           <div>
//             {modalActiveTab === "overview" && (
//               <ProfileAbout about={about} setAbout={setAbout} onClose={closeModal} />
//             )}

//             {modalActiveTab === "education" && (
//               <EducationForm ref={formRef} initialData={currentData} onSave={handleSaveEducation} onCancel={closeModal} />
//             )}

//             {modalActiveTab === "experience" && (
//               <ExperienceForm ref={formRef} initialData={currentData} onSave={handleSaveExperience} onCancel={closeModal} />
//             )}

//             {modalActiveTab === "certification" && (
//               <CertificationForm ref={formRef} initialData={currentData} onSave={handleSaveCertification} onCancel={closeModal} />
//             )}
//           </div>
//         </Modal>
//       )}

//       {/* Outside content */}
//       {activeTab === "overview" && (
//         <div className="space-y-6">
//           {/* About Section */}
//           <div className="mb-4">
//             {about ? (
//               <p className="text-white whitespace-pre-wrap break-all">{about}</p>
//             ) : (
//               <p className="text-gray-200">Add an overview...</p>
//             )}
//           </div>

//           {/* Posts / Activity Section */}
//           <ProfileActivity />
//         </div>
//       )}

//       {activeTab === "education" && (
//         <EducationList
//           educations={educations}
//           onAdd={() => openModalForTab("education")}
//           onEdit={(idx) => openModalForTab("education", educations[idx], idx)}
//           onDelete={handleDeleteEducation}
//         />
//       )}

//       {activeTab === "experience" && (
//         <div ref={listRef}>
//           <ExperienceList
//             experiences={experiences}
//             onAdd={() => openModalForTab("experience")}
//             onEdit={(idx) => openModalForTab("experience", experiences[idx], idx)}
//             onDelete={handleDeleteExperience}
//           />
//         </div>
//       )}

//       {activeTab === "certification" && (
//         <CertificationList
//           certifications={certifications}
//           onAdd={() => openModalForTab("certification")}
//           onEdit={(idx) => openModalForTab("certification", certifications[idx], idx)}
//           onDelete={handleDeleteCertification}
//         />
//       )}
//     </div>
//   );
// };

// export default DesignerProfile;



// app/profile/DesignerProfile.jsx
"use client";
import React, { useRef, useState, useCallback } from "react";
import ExperienceForm from "./ExperienceForm";
import ExperienceList from "./ExperienceList";
import ProfileAbout from "./ProfileAbout";
import EducationForm from "./EducationForm";
import EducationList from "./EducationList";
import CertificationForm from "./CertificationForm";
import CertificationList from "./CertificationList";
import { Buttonborder } from "../components/Button";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import Modal from "../components/Modal";
import ProfileActivity from "./ProfileActivity";
import { useSelector } from "react-redux";

/**
 * @param {object} props
 * @param {object} props.user - Profile user (the one whose profile is being viewed)
 */
const DesignerProfile = ({ user }) => {
  const currentUser = useSelector((s) => s.users?.currentUser);

  // check owner or viewer
  const isOwner = currentUser?.id === user?.id;

  // active UI state
  const [activeTab, setActiveTab] = useState("overview");
  const [openModal, setOpenModal] = useState(false);
  const [about, setAbout] = useState(user?.about || "");

  // lifted states
  const [experiences, setExperiences] = useState(user?.experiences || []);
  const [educations, setEducations] = useState(user?.educations || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);

  // modal-specific state
  const [editIndex, setEditIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [modalActiveTab, setModalActiveTab] = useState("overview");

  const formRef = useRef(null);
  const listRef = useRef(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "certification", label: "Certification" },
  ];

  const openModalForTab = useCallback(
    (tabId, data = null, idx = null) => {
      if (!isOwner) return; // viewers cannot open modal
      setModalActiveTab(tabId);
      setCurrentData(data);
      setEditIndex(idx);
      setOpenModal(true);
    },
    [isOwner]
  );

  const closeModal = useCallback(() => {
    setOpenModal(false);
    setEditIndex(null);
    setCurrentData(null);
  }, []);

  const handleSave = useCallback(
    (setList, data) => {
      if (!isOwner) return;
      setList((prev) => {
        if (editIndex !== null && editIndex >= 0 && editIndex < prev.length) {
          const copy = [...prev];
          copy[editIndex] = data;
          return copy;
        }
        return [...prev, data];
      });
      closeModal();
    },
    [editIndex, closeModal, isOwner]
  );

  const handleDelete = useCallback(
    (setList, idx, type = "item") => {
      if (!isOwner) return;
      if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
      setList((prev) => prev.filter((_, i) => i !== idx));
      if (editIndex === idx) setEditIndex(null);
    },
    [editIndex, isOwner]
  );

  // wrapper functions
  const handleSaveEducation = (data) => handleSave(setEducations, data);
  const handleSaveExperience = (data) => {
    handleSave(setExperiences, data);
    setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };
  const handleSaveCertification = (data) => handleSave(setCertifications, data);

  const handleDeleteEducation = (idx) => handleDelete(setEducations, idx, "education");
  const handleDeleteExperience = (idx) => handleDelete(setExperiences, idx, "experience");
  const handleDeleteCertification = (idx) => handleDelete(setCertifications, idx, "certification");

  return (
    <div className="border-gray-100 rounded-sm mt-6">
      {/* Top Tabs */}
      <div className="flex justify-between items-center border-b border-gray-400 pb-5">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <Buttonborder
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              classNameborder={`bg-transparent px-1.5 py-1 capitalize hover:cursor-pointer ${
                activeTab === tab.id ? "text-white font-semibold border rounded-3xl px-2" : "text-gray-400"
              }`}
              name={tab.label}
            />
          ))}
        </div>

        {/* Edit/Add button only if profile owner */}
        {isOwner && (
          <Buttonborder
            onClick={() => openModalForTab(activeTab)}
            icon={HiOutlineDocumentChartBar}
            name={activeTab === "overview" && !about ? "Add" : "Edit"}
          />
        )}
      </div>

      {/* Modal (only opens for owner) */}
      {isOwner && openModal && (
        <Modal
          show={openModal}
          onClose={closeModal}
          widthClass="max-w-3xl"
          onSubmit={() => formRef.current?.submit?.()}
          submitLabel="Save"
        >
          <div className="flex relative justify-between gap-2 mb-3">
            {tabs.map((tab) => (
              <Buttonborder
                key={tab.id}
                onClick={() => setModalActiveTab(tab.id)}
                classNameborder={`!bg-transparent !rounded-none !text-[14px] px-3 py-2 capitalize hover:cursor-pointer hover:!bg-[#333A44] ${
                  modalActiveTab === tab.id ? "border-b-3 pb-2 border-blue-600 font-semibold" : "text-gray-400"
                }`}
                name={tab.label}
              />
            ))}
          </div>

          <div>
            {modalActiveTab === "overview" && (
              <ProfileAbout about={about} setAbout={setAbout} onClose={closeModal} />
            )}
            {modalActiveTab === "education" && (
              <EducationForm
                ref={formRef}
                initialData={currentData}
                onSave={handleSaveEducation}
                onCancel={closeModal}
              />
            )}
            {modalActiveTab === "experience" && (
              <ExperienceForm
                ref={formRef}
                initialData={currentData}
                onSave={handleSaveExperience}
                onCancel={closeModal}
              />
            )}
            {modalActiveTab === "certification" && (
              <CertificationForm
                ref={formRef}
                initialData={currentData}
                onSave={handleSaveCertification}
                onCancel={closeModal}
              />
            )}
          </div>
        </Modal>
      )}

      {/* Outside content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="mb-4 py-4 ">
            {about ? (
              <p className="text-white whitespace-pre-wrap break-all">{about}</p>
            ) : (
              <p className="text-gray-200">Add an overview...</p>
            )}
          </div>
          <ProfileActivity />
        </div>
      )}

      {activeTab === "education" && (
        <EducationList
          educations={educations}
          onAdd={isOwner ? () => openModalForTab("education") : undefined}
          onEdit={isOwner ? (idx) => openModalForTab("education", educations[idx], idx) : undefined}
          onDelete={isOwner ? handleDeleteEducation : undefined}
        />
      )}

      {activeTab === "experience" && (
        <div ref={listRef}>
          <ExperienceList
            experiences={experiences}
            onAdd={isOwner ? () => openModalForTab("experience") : undefined}
            onEdit={isOwner ? (idx) => openModalForTab("experience", experiences[idx], idx) : undefined}
            onDelete={isOwner ? handleDeleteExperience : undefined}
          />
        </div>
      )}

      {activeTab === "certification" && (
        <CertificationList
          certifications={certifications}
          onAdd={isOwner ? () => openModalForTab("certification") : undefined}
          onEdit={isOwner ? (idx) => openModalForTab("certification", certifications[idx], idx) : undefined}
          onDelete={isOwner ? handleDeleteCertification : undefined}
        />
      )}
    </div>
  );
};

export default DesignerProfile;
