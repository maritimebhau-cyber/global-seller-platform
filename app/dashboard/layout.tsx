import Sidebar from "./component/SideBar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "16px" }}>
        {children}
      </main>
    </div>
  );
}
