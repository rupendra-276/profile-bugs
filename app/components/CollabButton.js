
"use client";
import { useSelector, useDispatch } from "react-redux";
import { sendCollabRequest } from "../store/userSlice";

export default function CollabButton({ targetId, collabclass="" }) {
  const dispatch = useDispatch();
  const { currentUser, collabs } = useSelector((s) => s.users);
  if (!currentUser) return null;

  const isConnected = currentUser.connections.includes(targetId);

  const collab = collabs.find(
    (c) =>
      ((c.from === currentUser.id && c.to === targetId) || (c.from === targetId && c.to === currentUser.id)) &&
      (c.status === "pending" || c.status === "accepted")
  );

  let label = "Collab";
  let disabled = false;

  if (isConnected || (collab && collab.status === "accepted")) {
    label = "Connected";
    disabled = true;
  } else if (collab && collab.status === "pending") {
    if (collab.from === currentUser.id) {
      label = "Pending";
      disabled = true;
    } else {
      label = "Respond";
      disabled = false;
    }
  }

  const handleClick = () => {
    if (label === "Respond") return (window.location.href = "/notifications");
    dispatch(sendCollabRequest({ targetId, currentUserId: currentUser.id }));
  };

  return (
    <button
      className={`text-[12px] flex justify-center items-center gap-1 px-3 py-2.5 rounded-full bg-[#0013E3] font-semibold text-white hover:cursor-pointer ${collabclass}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
