// app/people/page.jsx
import Link from "next/link";
import { users } from "../constents/constents";

export default function PeoplePage() {
  return (
    <div className="bg-[#070C11] min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6">All People</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <Link
            key={u.id}
            href={`/${u.username}`}
            className="p-4 bg-[#10151B] rounded-lg border border-gray-700 hover:bg-[#1a2035] transition"
          >
            <div className="flex items-center gap-4">
              <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm text-gray-400">@{u.username}</div>
                <div className="text-xs text-gray-500 mt-2">{u.headline || ""}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
