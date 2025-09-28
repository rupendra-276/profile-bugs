



"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaRegThumbsUp,
  FaRegComment,
  FaShare,
  FaRetweet,
} from "react-icons/fa";
import { BiDislike, BiSmile } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Avatar = ({ name, avatar, username }) => {
  if (avatar) {
    return (
      <Link href={`/profile/${username}`} onClick={(e) => e.stopPropagation()}>
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90"
        />
      </Link>
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={`/profile/${username}`} onClick={(e) => e.stopPropagation()}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90">
        {initials}
      </div>
    </Link>
  );
};

export default function PostCard({
  post,
  mode = "feed", // feed or activity
  onLike,
  onDislike,
  onSave,
  onRepost,
  onAddComment,
  onPollVote,
  onShare,
}) {
  const router = useRouter();
  const isActivity = mode === "activity";

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Poll state management
  const [pollVotes, setPollVotes] = useState(
    post.poll?.votes ?? Array(post.poll?.options?.length || 0).fill(0)
  );
  const [pollSelected, setPollSelected] = useState(post.pollSelection ?? null);
  const [pollVoted, setPollVoted] = useState(post.pollVoted ?? false);

  const likes = post.likes ?? 0;
  const dislikes = post.dislikes ?? 0;
  const commentsCount = post.comments ? post.comments.length : 0;
  const reposts = post.reposts ?? 0;

  const content =
    (post.content || "").length > 300 && !showFullContent
      ? post.content.slice(0, 300) + "..."
      : post.content;

  // ===================== Handlers ===================== //

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment?.(post.id, commentText);
    setCommentText("");
    setShowEmojiPicker(false);
    toast.success("Comment added");
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url);
    toast.info("Link copied to clipboard");
    setMenuOpen(false);
  };

  const handleSaveFromMenu = (e) => {
    e.stopPropagation();
    onSave?.(post.id);
    toast.success(post.saved ? "Removed from saved" : "Saved post");
    setMenuOpen(false);
  };

  const onRepostClick = (e) => {
    e.stopPropagation();
    if (isActivity) router.push(`/post/${post.id}`);
    else {
      onRepost?.(post.id);
      toast.success("Reposted");
    }
  };

  const onShareClick = (e) => {
    e.stopPropagation();
    if (isActivity) router.push(`/post/${post.id}`);
    else {
      const url = `${window.location.origin}/post/${post.id}`;
      if (navigator.share) {
        navigator.share({ title: "Post", url }).catch(() => {
          navigator.clipboard.writeText(url);
          toast.info("Link copied");
        });
      } else {
        navigator.clipboard.writeText(url);
        toast.info("Link copied");
      }
      onShare?.(post.id);
    }
  };

  const onLikeClick = (e) => {
    e.stopPropagation();
    onLike?.(post.id);
  };
  const onDislikeClick = (e) => {
    e.stopPropagation();
    onDislike?.(post.id);
  };

  const onPollOptionClick = (e, idx) => {
    e.stopPropagation();
    if (isActivity) {
      router.push(`/post/${post.id}`);
    } else {
      if (!pollVoted) {
        const updatedVotes = [...pollVotes];
        updatedVotes[idx] = (updatedVotes[idx] || 0) + 1;
        setPollVotes(updatedVotes);
        setPollSelected(idx);
        setPollVoted(true);
        onPollVote?.(post.id, idx); // notify parent if needed
      }
    }
  };

  const onCommentBtn = (e) => {
    e.stopPropagation();
    if (isActivity) router.push(`/post/${post.id}`);
    else setShowCommentBox((s) => !s);
  };

  const onCardClick = () => {
    if (isActivity) router.push(`/post/${post.id}`);
  };

  // ===================== Render ===================== //
  return (
    <div
      className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer relative"
      onClick={onCardClick}
    >
      {/* Header */}
      <div className="flex justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Avatar
            name={post.user.name}
            avatar={post.user.avatar}
            username={post.user.username}
          />
          <div>
            <Link
              href={`/profile/${post.user.username}`}
              onClick={(e) => e.stopPropagation()}
              className="text-white font-semibold hover:underline"
            >
              {post.user.name}
            </Link>
            <p className="text-gray-400 text-sm">
              @{post.user.username} · {post.user.time}
            </p>
          </div>
        </div>

        {/* 3-dots menu */}
        <div className="relative">
          <BsThreeDotsVertical
            className="text-gray-500 hover:text-gray-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((s) => !s);
            }}
          />
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-44 bg-[#1e293b] border border-gray-700 rounded-lg shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {!isActivity && (
                <button
                  onClick={handleSaveFromMenu}
                  className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#334155]"
                >
                  {post.saved ? "Unsave" : "Save"}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#334155]"
              >
                Copy link
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.warning("Reported");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#334155]"
              >
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-200 mb-3">
        {content}
        {(post.content || "").length > 300 && !showFullContent && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullContent(true);
            }}
            className="ml-2 text-blue-400 hover:underline"
          >
            more
          </button>
        )}
      </p>

      {/* Image */}
      {post.type === "image" && post.image && (
        <div className="rounded-lg overflow-hidden mb-3" onClick={(e) => e.stopPropagation()}>
          <img src={post.image} alt="post" className="w-full object-cover" />
        </div>
      )}

      {/* Poll */}
{/* {post.poll && (
  <div className="mb-3 space-y-2">
    {(() => {
      const totalVotes = post.poll.votes.reduce((a, b) => a + b, 0);

      return post.poll.options.map((opt, idx) => {
        const pct = totalVotes ? Math.round((post.poll.votes[idx] / totalVotes) * 100) : 0;
        const selected = post.pollSelection === idx;

        return (
          <button
            key={idx}
            onClick={() => onPollVote(post.id, idx)}
            disabled={post.pollVoted && !selected}
            className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm transition-colors
             ${selected ? "bg-blue-600 text-white" : "bg-[#071029] text-gray-300 hover:bg-[#1a2035]"}`}
          >
            <span>{opt}</span>
            <span>{pct}%</span>
          </button>
        );
      });
    })()}
  </div>
)} */}

{post.poll && (
  <div className="mb-3 space-y-2">
    {(() => {
      const totalVotes = post.poll.votes.reduce((a, b) => a + b, 0);

      return post.poll.options.map((opt, idx) => {
        const pct = totalVotes ? Math.round((post.poll.votes[idx] / totalVotes) * 100) : 0;
        const selected = post.pollSelection === idx;

        return (
          <button
            key={idx}
            onClick={() => onPollVote(post.id, idx)}
            className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm transition-colors
              ${selected ? "bg-blue-600 text-white" : "bg-[#071029] text-gray-300 hover:bg-[#1a2035]"}
            `}
          >
            <span>{opt}</span>
            <span>{pct}%</span>
          </button>
        );
      });
    })()}
  </div>
)}

      {/* Actions */}
      <div className="flex justify-between gap-3 mb-2">
        <button
          onClick={onLikeClick}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-white transition ${
            post.liked ? "bg-[#06203b] text-blue-300" : "hover:bg-[#071029]"
          }`}
        >
          <FaRegThumbsUp />
          <span className="text-sm">{likes}</span>
        </button>
        <button
          onClick={onDislikeClick}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-white transition ${
            post.disliked ? "bg-[#2b0505] text-red-400" : "hover:bg-[#071029]"
          }`}
        >
          <BiDislike />
          <span className="text-sm">{dislikes}</span>
        </button>
        <button
          onClick={onCommentBtn}
          className="flex items-center gap-2 px-3 py-1 rounded-full text-white hover:bg-[#071029]"
        >
          <FaRegComment />
          <span className="text-sm">{commentsCount}</span>
        </button>
        <button
          onClick={onRepostClick}
          className={`flex items-center gap-2 px-3 py-1 rounded-full hover:cursor-pointer transition ${
            post.reposted ? "bg-[#332b11] text-gray-200" : "hover:bg-[#071029] text-white"
          }`}
        >
          <FaRetweet />
          <span className="text-sm">{reposts}</span>
        </button>
        <button
          onClick={onShareClick}
          className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#071029] text-white"
        >
          <FaShare />
        </button>
      </div>

      {/* Comment box */}
      {!isActivity && showCommentBox && (
        <div className="mt-3 relative" onClick={(e) => e.stopPropagation()}>
          <input
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            className="w-full px-3 py-2 rounded-lg bg-[#0b1324] text-white text-sm outline-none pr-10"
          />
          <button
            onClick={() => setShowEmojiPicker((s) => !s)}
            className="absolute right-2 hover:cursor-pointer top-2 text-gray-400 hover:text-white"
          >
            <BiSmile size={20} />
          </button>
          {showEmojiPicker && (
            <div className="absolute right-0 mt-2 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData) =>
                  setCommentText((prev) => prev + emojiData.emoji)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

