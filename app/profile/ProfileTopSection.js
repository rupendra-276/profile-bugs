

"use client";
import React, { useRef, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserById } from "../store/userSlice";
import { Buttonborder } from "../components/Button";
import ContactInfoModal from "./ContactInfoModal";

export default function ProfileTopSection({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users.currentUser);

  const isOwner = currentUser?.id === user?.id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    if (isOwner) {
      dispatch(updateUser({ [type]: url }));
    }
  };

  return (
    <div className="relative">
      {/* Cover */}
      <div className="relative overflow-hidden w-full h-32 md:h-[176px] rounded-[30px] border border-gray-400 bg-[#10151B] group">
        {currentUser?.cover ? (
          <img
            src={currentUser.cover}
            alt="Cover"
            className="h-full w-full object-cover rounded-[30px]"
          />
        ) : (
          <div className="h-full w-full bg-[#10151B] rounded-[30px]" />
        )}

        {isOwner && (
          <div
            className={`absolute ${
              !currentUser?.cover &&
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
            onClick={() => coverInputRef.current?.click()}
          >
            <div className="bg-[#10151Baa] p-2 rounded-full cursor-pointer hover:scale-105 transition">
              <RiCameraAiLine className="text-white text-xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, "cover")}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="absolute z-30 -bottom-12 left-8 md:left-14 w-24 h-24 md:w-[112px] md:h-[112px] rounded-[30px] border-2 border-gray-400 bg-[#10151B] overflow-hidden">
        <img
          src={currentUser?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-full h-full object-cover rounded-[30px]"
        />
        {isOwner && !currentUser?.avatar && (
          <div
            className="absolute inset-0 flex justify-center items-center cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <div className="bg-transparent p-2 rounded-full hover:scale-105 transition">
              <RiCameraAiLine className="text-white text-xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={(e) => handleFileChange(e, "avatar")}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Enhance Button */}
      {isOwner && (
        <div className="text-end mt-5 absolute right-0">
          <Buttonborder
            onClick={() => setIsModalOpen(true)}
            name="Enhance Profile"
          />
        </div>
      )}

      {/* Contact Info Modal */}
      <ContactInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={currentUser}
        onSave={(updatedInfo) => {
          dispatch(updateUser({ ...updatedInfo }));
          setIsModalOpen(false);
        }}


      />
    </div>
  );
}
