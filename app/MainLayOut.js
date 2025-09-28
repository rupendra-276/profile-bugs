

// ================= Main Layout (Header + Sidebar + Main+Right as one) =================
"use client";
import { useState } from "react";
import Header from './header/Header';
import Sidebar from './header/SideBar';

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col fiex ">
      {/* Fixed Header */}
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content area */}
      <div className="flex flex-1 pt-[55px]">
        {/* Sidebar */}
        <div className="h-screen ">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        </div>

        {/* ✅ Main + Right Panel considered as one column */}
        <div className="flex-1 flex flex-col gap-4 ">
          {/* Main Content */}
          <div className="bg-[#10151B] rounded-lg ">{children}</div>

       
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}


