'use client';

import React from "react";
import SidebarAdmin from "./adminsidebar/sidebaradmin";
// import Footer from "../component/Footer/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", }}>
      <div style={{ position: "sticky",   }}>
      {/* Sidebar */}
      <SidebarAdmin />
</div>
      {/* Right Content Area */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        
        {/* Main Content */}
        <main style={{ flex: 1, padding: "16px" }}>
          {children}
        </main>

        {/* Footer */}
  
      </div>

    </div>
  );
}
