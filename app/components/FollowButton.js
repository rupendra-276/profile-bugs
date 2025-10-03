"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../store/userSlice";

export default function FollowButton({ targetId, followclassName  }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);
  const currentUser = useSelector((s) => s.users.currentUser);

  useEffect(() => {
  setHydrated(true);
}, []);

const isFollowing = hydrated && currentUser?.following?.includes(targetId);

  return (
    <button

      onClick={() =>
        isFollowing
          ? dispatch(unfollowUser({ targetId, currentUserId: currentUser.id }))
          : dispatch(followUser({ targetId, currentUserId: currentUser.id }))
      }
      className={`text-[12px] flex justify-center items-center gap-1 px-3 py-2.5 rounded-full bg-[#0013E3] font-semibold text-white hover:cursor-pointer ${followclassName}`}
    >
      {isFollowing ? "Unfollow" : "+ Follow"}
    </button>
  );
}
