"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  badgeType?: "offer" | "new" | "count";
};

// Icons - 18px with darker colors
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M12 2L2 9l10 13 10-13-10-7z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <circle cx="12" cy="9" r="5"/>
    <path d="M4 20c0-4 4-7 8-7s8 3 8 7v1H4v-1z"/>
  </svg>
);

const LeadManagerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

const BuyLeadsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
    <polyline points="3 17 9 11 13 15 21 7"/>
    <circle cx="3" cy="17" r="2.5" fill="#333" stroke="none"/>
    <circle cx="21" cy="7" r="2.5" fill="#333" stroke="none"/>
  </svg>
);

const ProductsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <circle cx="9" cy="20" r="2"/>
    <circle cx="16" cy="20" r="2"/>
    <path d="M3 4h2l2 13h11l3-9H6"/>
  </svg>
);

const PhotosDocsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
  </svg>
);

const BuyerToolsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

const TallyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
    <rect x="3" y="10" width="5" height="11"/>
    <rect x="10" y="6" width="5" height="15"/>
    <rect x="17" y="14" width="5" height="7"/>
  </svg>
);

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <DashboardIcon />, href: "/sellerdashboard/gstverifyform" },
  {
    label: "Paid Services",
    icon: <DiamondIcon />,
    href: "/sellerdashboard/paidservices",
    badge: "Offer",
    badgeType: "offer",
  },
  { label: "Profile", icon: <ProfileIcon />, href: "/sellerdashboard/profile" },
  { 
    label: "Lead Manager", 
    icon: <LeadManagerIcon />, 
    href: "/sellerdashboard/leadmanager",
    badge: "7",
    badgeType: "count",
  },
  { 
    label: "BuyLeads", 
    icon: <BuyLeadsIcon />, 
    href: "/dashboard/buy-leads",
    badge: "0",
    badgeType: "count",
  },
  { label: "Products", icon: <ProductsIcon />, href: "/dashboard/products" },
  { label: "Photos & Docs", icon: <PhotosDocsIcon />, href: "/dashboard/photos-docs" },
  {
    label: "Buyer Tools",
    icon: <BuyerToolsIcon />,
    href: "/dashboard/buyer-tools",
    badge: "New",
    badgeType: "new",
  },
  { label: "Settings", icon: <SettingsIcon />, href: "/dashboard/settings" },
 
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 h-screen border-r border-gray-200 bg-white">
      <ul className="flex flex-col">
        {menuItems.map((item) => {
          const isPaidServices = item.label === "Paid Services";
          const isProfile = item.label === "Profile";
          const isActive = pathname === item.href || isPaidServices || isProfile;

          return (
            <li key={item.label} className="w-full">
              <Link
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-2 border-b border-gray-200
                  ${isActive ? "bg-indigo-50" : "hover:bg-gray-50"}`}
              >
                <div className="relative flex items-center justify-center">
                  <span className={isProfile ? "text-indigo-600" : ""}>
                    {item.icon}
                  </span>

                  {/* Offer Badge */}
                  {item.badgeType === "offer" && (
                    <span className="absolute -right-7 -top-1 bg-orange-500 text-white text-[7px] px-1 py-0.5 rounded font-medium">
                      {item.badge}
                    </span>
                  )}

                  {/* New Badge */}
                  {item.badgeType === "new" && (
                    <span className="absolute -right-7 -top-1 bg-orange-500 text-white text-[7px] px-1 py-0.5 rounded font-medium">
                      {item.badge}
                    </span>
                  )}

                  {/* Count Badges */}
                  {item.badgeType === "count" && (
                    <span className="absolute -right-6 -top-1 bg-gray-400 text-white text-[8px] w-4 h-3 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] mt-1 ${isActive ? "text-indigo-600 font-medium" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}