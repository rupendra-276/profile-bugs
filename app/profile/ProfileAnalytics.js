"use client";
import React, { useEffect, useRef, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";
import { RiGroupLine } from "react-icons/ri";
import Chart from "chart.js/auto";

export default function ProfileAnalytics() {
  const chartRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  // Example data (from backend normally)
  const profile = {
    name: "Rupendra",
    emailVerified: false,
    phone: "9876543210",
    location: "Delhi",
    education: "B.Tech",
    experience: "2 years",
    resume: "",
    avatar: "https://dummy.com/photo.png",
    skills: ["React", "Next.js"],
    bio: ""
  };

  // ---- Profile Completion Logic ----
  function calculateCompletion(profile) {
    const requiredFields = [
      "name",
      "emailVerified",
      "phone",
      "location",
      "education",
      "experience",
      "resume",
      "avatar",
      "skills",
      "bio",
    ];

    let completed = 0;
    const missing = [];

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      const value = profile[field];

      if (Array.isArray(value) && value.length > 0) completed++;
      else if (typeof value === "boolean" && value) completed++;
      else if (typeof value === "string" && value.trim() !== "") completed++;
      else missing.push(field);
    }

    return {
      percent: Math.round((completed / requiredFields.length) * 100),
      missing,
    };
  }

  const { percent: completion, missing } = calculateCompletion(profile);

  // ---- Chart Render ----
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // destroy old chart
      if (chartRef.current._chart) {
        chartRef.current._chart.destroy();
      }

      chartRef.current._chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Completed", "Remaining"],
          datasets: [
            {
              data: [completion, 100 - completion],
              backgroundColor: [
                completion < 60 ? "#EF4444" : "#22C55E",
                "#E0E0E0",
              ],
              borderWidth: 0,
              hoverOffset: 6,
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}%`,
              },
            },
          },
          cutout: "75%",
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [completion]);

  return (
    <div className="my-5 p-5 bg-[#10151B] w-max-[274px] border rounded-[30px]   border-gray-400 pr-2 ">
      <h2 className="text-white font-semibold text-xl font-[inter]">Profile Analytics</h2>

      {/* Profile Completion */}
      <div className="flex items-center justify-between gap-3 text-white my-4">
        <div>
          <p className="font-semibold text-[15px] font-[inter]">Profile Complete</p>
        <p className="text-[12px]">Profile completion percentage completion percentage  </p>
        
        </div>
        
        <div className="relative w-20 h-20">
          <canvas ref={chartRef} className="pointer-events-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{completion}%</span>
          </div>
        </div>
      </div>


      {/* Example Extra Stats */}
      <div className="flex items-center justify-between gap-3 text-white my-4">
        <div className="flex items-center gap-2">
          <Eye className="w-8 h-8 bg-blue-200/50 p-1 rounded-sm" />
          <div>
            <p className="font-semibold text-[15px]">Profile Views</p>
            <p className="text-[11px]">This Week</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">0</p>
          <p className="text-green-600 text-sm flex">
            <TrendingUp className="w-6 h-6 p-1 text-green-600 rounded-sm" /> + 0%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-white my-2">
        <div className="flex items-center gap-2">
          <RiGroupLine className="w-8 h-8 bg-blue-200/50 p-1 rounded-sm" />
          <div>
            <p className="font-semibold text-[15px]">Search Appearances</p>
            <p className="text-[11px]">This Week</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">0</p>
          <p className="text-green-600 text-sm flex">
            <TrendingUp className="w-6 h-6 p-1 text-green-600 rounded-sm" /> + 0%
          </p>
        </div>
      </div>
    </div>
  );
}
