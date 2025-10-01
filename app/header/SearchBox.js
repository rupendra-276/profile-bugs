"use client";
import { useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
// Dummy suggestion data

import { InputWithCount } from "../components/FormInput";

const suggestions = [
  { id: 1, name: "Jaya Singh", subtitle: "Software Developer • Brillo", image: "/amazon.png" },
  { id: 2, name: "Jayant Yadav", subtitle: "ML Engineer • Google", image: "/amazon.png" },
  { id: 3, name: "Jaya Kumari", subtitle: "Digital Marketing Lead • Microsoft", image: "/amazon.png" },
  { id: 4, name: "Jobs at OpenAI", subtitle: "AI Research Roles", image: "/amazon.png" },
  { id: 5, name: "Rahul Verma", subtitle: "Frontend Developer • Amazon", image: "/amazon.png" },
  { id: 6, name: "Anjali Mehta", subtitle: "UI/UX Designer • Facebook", image: "/amazon.png" },
  { id: 7, name: "Siddharth Rathi", subtitle: "Data Scientist • LinkedIn", image: "/amazon.png" },
  { id: 8, name: "Internship at Tesla", subtitle: "AI Intern Roles", image: "/amazon.png" },
  { id: 9, name: "Priya Sharma", subtitle: "Product Manager • Flipkart", image: "/amazon.png" },
  { id: 10, name: "Career at Netflix", subtitle: "Tech Roles", image: "/amazon.png" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

const handleChange = (value) => {
  setQuery(value);

  if (value.trim().length > 0) {
    const res = suggestions.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(res);
  } else {
    setFiltered([]);
  }
};
  return (
    <div className="relative flex gap-5 items-center">
      {/* Search Box */}
      <div className="relative w-[280px] sm:w-[320px]">
       <InputWithCount
        value={query}
        onChange={handleChange}   // अब value आएगा, event नहीं
        showCount={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        placeholder="Search"
        className="!w-full px-3 ps-10 bg-[#07061c] text-gray-200 !py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border"
      />
        <IoSearchOutline className="absolute top-3 left-3 text-gray-300 text-xl" />

        {/* Suggestions Dropdown */}
        {isFocused && filtered.length > 0 && (
          <div className="absolute mt-2 w-full bg-[#10151B] border border-gray-700 rounded-lg shadow-lg max-h-72 custom-scroll overflow-y-auto z-50">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`profile/${item.id}`}
                className="flex items-center gap-3 w-full px-4 py-1.5 hover:bg-gray-800 text-left"
              >
                <Image
                  src={item.image || "/default-user.png"}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="rounded-full w-[32px] h-[32px] object-cover"
                />
                <div className="flex flex-col">
                  <h6 className="text-white   font-semibold">{item.name}</h6>
                  <span className="text-gray-300 text-xs">{item.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
