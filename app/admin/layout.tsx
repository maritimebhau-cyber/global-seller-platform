'use client';

import React from "react";
import SidebarAdmin from "./adminsidebar/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin />
      <main style={{ flex: 1, padding: "16px" }}>
        {children}
      </main>
      
    </div>
  );
}
