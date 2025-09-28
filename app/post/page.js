

// components/PostsFeed.jsx
"use client";
import React, { useState } from "react";
import PostCard from "./PostCard";
import RepostCard from "./Repost";
import { users } from "../constents/constents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostsFeed() {
  const [posts, setPosts] = useState(users[0].posts);

  // Like toggling; handles existing dislike as well
  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = !p.liked;
        const currLikes = p.likes ?? 0;
        const currDislikes = p.dislikes ?? 0;
        let newLikes = currLikes + (liked ? 1 : -1);
        let newDislikes = currDislikes;
        let disliked = p.disliked ?? false;
        // If user had disliked and now likes, remove dislike
        if (liked && disliked) {
          newDislikes = Math.max(0, newDislikes - 1);
          disliked = false;
        }
        return { ...p, liked, likes: newLikes, disliked, dislikes: newDislikes };
      })
    );
  };

  const handleDislike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const disliked = !p.disliked;
        const currDislikes = p.dislikes ?? 0;
        const currLikes = p.likes ?? 0;
        let newDislikes = currDislikes + (disliked ? 1 : -1);
        let newLikes = currLikes;
        let liked = p.liked ?? false;
        // If user had liked and now dislikes, remove like
        if (disliked && liked) {
          newLikes = Math.max(0, newLikes - 1);
          liked = false;
        }
        return { ...p, disliked, dislikes: newDislikes, liked, likes: newLikes };
      })
    );
  };

  const handleSave = (postId) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p)));
  };

  // Repost: adds a 'repost' entry at top, increments original reposts count
  const handleRepost = (postId) => {
    setPosts((prev) => {
      const original = prev.find((p) => p.id === postId);
      if (!original) return prev;
      const updated = prev.map((p) =>
        p.id === postId ? { ...p, reposts: (p.reposts || 0) + 1, reposted: true } : p
      );
      const newRepost = {
        id: Date.now(),
        type: "repost",
        user: { name: "You", username: "me", avatar: "" },
        originalId: postId,
      };
      toast.success("Reposted");
      return [newRepost, ...updated];
    });
  };

  
  const handleShare = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator.share({ title: "Post", url }).catch(() => {
        navigator.clipboard.writeText(url);
        toast.info("Link copied");
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Link copied");
    }
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = { id: Date.now(), user: { name: "You", username: "me", avatar: "" }, content: text };
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p)));
    toast.success("Comment added");
  };




// const handlePollVote = (postId, optionIndex) => {
//   setPosts(prev =>
//     prev.map(p => {
//       if (p.id !== postId) return p;

//       let newVotes = [...p.poll.votes];

//       // Agar pehle se vote kiya tha aur option alag hai → pehle wale ko -1 karo
//       if (p.pollVoted && p.pollSelection !== null && p.pollSelection !== optionIndex) {
//         newVotes[p.pollSelection] -= 1;
//       }

//       // Naya vote +1
//       newVotes[optionIndex] += 1;

//       return {
//         ...p,
//         poll: { ...p.poll, votes: newVotes },
//         pollVoted: true,
//         pollSelection: optionIndex,
//       };
//     })
//   );
// };

const handlePollVote = (postId, optionIndex) => {
  setPosts(prev =>
    prev.map(p => {
      if (p.id !== postId) return p;

      let newVotes = [...p.poll.votes];

      // Agar pehle vote kiya tha aur option alag hai → pehle wale se -1 karo
      if (p.pollSelection !== null && p.pollSelection !== optionIndex) {
        newVotes[p.pollSelection] -= 1;
      }

      // Naye wale option ko +1 karo
      if (p.pollSelection !== optionIndex) {
        newVotes[optionIndex] += 1;
      }

      return {
        ...p,
        poll: { ...p.poll, votes: newVotes },
        pollVoted: true,
        pollSelection: optionIndex,
      };
    })
  );
};

  return (
    <>  
      <div className="flex flex-col px-10 lg:px-16 mt-6 md:flex-row gap-8 lg:gap-16">
        {/* left side */}
       <div className="space-y-4 mt-3">
        {posts.map((post) => {
          if (post.type === "repost") {
            const original = posts.find((x) => x.id === post.originalId);
            // if original missing => skip
            return (
              <RepostCard
                key={post.id}
                post={post}
                originalPost={original}
                onLike={handleLike}
                onDislike={handleDislike}
                onSave={handleSave}
                onRepost={handleRepost}
                onAddComment={handleAddComment}
                onPollVote={handlePollVote}
                onShare={handleShare}
              />
            );
          }
          return (
            <PostCard
              key={post.id}
              post={post}
              mode="feed"
              onLike={handleLike}
              onDislike={handleDislike}
              onSave={handleSave}
              onRepost={handleRepost}
              onAddComment={handleAddComment}
              onPollVote={handlePollVote}
              onShare={handleShare}
            />
          );
        })}
      </div>
{/* right side */}
   <div className="hidden md:block md:w-1/3 lg:w-1/4">
          <div className="bg-[#0f172a] p-4 rounded-lg shadow-md text-gray-300">
            <h3 className="text-lg font-semibold text-white mb-4">Right Section</h3>
            <p>Suggested profiles, ads, or analytics can go here.</p>
          </div>
        </div>
      </div>
     
    </>
  );
}
