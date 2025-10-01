
"use client";
import { useState } from "react";
import Sidebar from "./header/SideBar";
import Header from "./header/Header";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux"; // agar redux use kar rahe ho

export default function MainLayout({ children }) {
  // user ko redux se le sakte ho, abhi demo ke liye hardcoded
  const user = useSelector((state) => state.auth.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 mt-10">
        {/* Sidebar sirf jab user exist kare */}
        {user ? (
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
        ) : null}

        {/* agar user null hai to sidebar skip hoga aur main full width lega */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
