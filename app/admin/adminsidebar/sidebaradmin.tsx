import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCog,
  ShoppingCart,
  User,
  Package,
  Phone,
  Activity,
  Settings,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react';

type UserRole = 'admin' | 'subadmin';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  href: string;
  allowedRoles: UserRole[]; // Which roles can see this menu item
}

interface UserProfile {
  name: string;
  email: string;
  initials?: string;
  avatar?: string;
  role: UserRole; // Added role field
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  menuItems?: MenuItem[];
  userProfile?: UserProfile;
  onLogout?: () => void;
}

// Default menu items with role-based access control
const defaultMenuItems: MenuItem[] = [
  { 
    icon: <LayoutDashboard size={20} />, 
    label: 'Dashboard', 
    id: 'dashboard', 
    href: '/admin',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
  { 
    icon: <Users size={20} />, 
    label: 'Manage Admins', 
    id: 'admins', 
    href: '/admin/manageadmin',
    allowedRoles: ['admin'] // Only admin can see
  },
  { 
    icon: <UserCog size={20} />, 
    label: 'Manage Sub-Admins', 
    id: 'sub-admins', 
    href: '/admin/managesubadmin',
    allowedRoles: ['admin'] // Only admin can see
  },
  { 
    icon: <ShoppingCart size={20} />, 
    label: 'Manage Buyers', 
    id: 'buyers', 
    href: '/admin/managebuyer',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
  { 
    icon: <User size={20} />, 
    label: 'Manage Sellers', 
    id: 'users', 
    href: '/admin/manageseller',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
  { 
    icon: <Package size={20} />, 
    label: 'Products', 
    id: 'products', 
    href: '/admin/product',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
  { 
    icon: <Phone size={20} />, 
    label: 'Leads', 
    id: 'leads', 
    href: '/admin/lead',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
  { 
    icon: <Settings size={20} />, 
    label: 'System Settings', 
    id: 'settings', 
    href: '/admin/setting',
    allowedRoles: ['admin', 'subadmin'] // Both can see
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose = () => {},
  menuItems = defaultMenuItems,
  userProfile = {
    name: 'Super Admin',
    email: 'admin@company.com',
    initials: 'SA',
    role: 'admin', // Default to admin
  },
  onLogout,
}) => {
  const pathname = usePathname();

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  // Check if current path matches or starts with the menu item href
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.allowedRoles.includes(userProfile.role)
  );

  // Dynamic colors based on role
  const accentColor = userProfile.role === 'admin' ? 'indigo' : 'green';
  const accentClasses = {
    indigo: {
      bg: 'bg-indigo-600',
      light: 'bg-indigo-50',
      text: 'text-indigo-600',
      textLight: 'text-indigo-400',
    },
    green: {
      bg: 'bg-green-600',
      light: 'bg-green-50',
      text: 'text-green-600',
      textLight: 'text-green-400',
    },
  };

  const colors = accentClasses[accentColor];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen bg-white text-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        {/* User Profile Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
              {userProfile.initials || userProfile.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{userProfile.name}</h3>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
              <span className={`text-xs font-medium ${colors.text} capitalize`}>
                {userProfile.role}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden hover:bg-gray-100 p-1 rounded transition-colors text-gray-600"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {filteredMenuItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleMenuClick}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? `${colors.light} ${colors.text}`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? colors.text : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`transition-colors ${
                    isActive ? colors.textLight : 'text-gray-400'
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        {onLogout && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;