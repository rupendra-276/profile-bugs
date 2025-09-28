


// components/post/RepostCard.jsx
"use client";
import React from "react";
import Link from "next/link";
import { FaShare } from "react-icons/fa";
import PostCard from "./PostCard";

export default function RepostCard({ post, originalPost, ...handlers }) {
  // originalPost expected to be the actual post object (found by parent)
  return (
    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 shadow-md mb-4">
      <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
        <FaShare className="text-blue-400" />
        <Link href={`/profile/${post.user.username}`} className="hover:underline">
          {post.user.name}
        </Link>{" "}
        reposted
      </div>

      <div className="ml-2">
        <PostCard post={originalPost} {...handlers} />
      </div>
    </div>
  );
}
