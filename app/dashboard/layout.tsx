import Footer from "../component/Footer/Footer";
import Sidebar from "./component/SideBar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* FIXED SIDEBAR */}
      <aside
        style={{
          
          position: "fixed",
          // top: 0,
          // left: 0,
          // height: "100vh",
        }}
      >
        <Sidebar />
      </aside>

      {/* RIGHT PANEL (SCROLLS) */}
      <div
        style={{
          marginLeft: "250px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {/* CONTENT */}
        <main style={{ padding: "16px", flexGrow: 1 }}>
          {children}
        </main>

        {/* FOOTER (ALWAYS FULLY VISIBLE) */}
        <Footer />
      </div>

    </div>
  );
}
