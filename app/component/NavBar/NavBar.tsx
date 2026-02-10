'use client';

import React, { useState, useEffect } from "react";
import {
  Search,
  Globe,
  Store,
  HelpCircle,
  MessageSquare,
  User,
  MapPin,
  ChevronDown,
  Navigation,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  FileText,
  BadgeCheck,
  FolderOpen,
  LayoutGrid,
  Smartphone,
  UserCircle,
  Landmark,
  Receipt,
  LayoutDashboard,
  MessageCircle,
  Download,
  ShoppingCart,
  Folder,
  FilePlus,
  AlertCircle,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import 'flag-icons/css/flag-icons.min.css';
import MarineMartlogo from '../../../public/images/marinemart.png';

// Define country data type
interface CountryData {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

// Flag component using flag-icons
const FlagIcon = ({ countryCode }: { countryCode: string }) => {
  const flagClass = `fi fi-${countryCode.toLowerCase()}`;
  
  return (
    <div className="flex items-center justify-center w-8 h-6 rounded overflow-hidden">
      <span className={flagClass} style={{ width: '32px', height: '24px' }} />
    </div>
  );
};

// Customer Support Menu Component
const CustomerSupportMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="max-w-[320px] bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 font-medium">
          Find answers to your queries
        </p>
      </div>

      <div className="py-1">
        <Link href="/buying" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <ShoppingCart className="w-[1.1rem] h-[1.1rem] text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">For Buying</span>
        </Link>

        <Link href="/selling" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <Store className="w-[1.1rem] h-[1.1rem] text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">For Selling</span>
        </Link>

        <Link href="/feedback" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <MessageCircle className="w-[1.1rem] h-[1.1rem] text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">Share your Feedback</span>
        </Link>

        <Link href="/complaint" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <AlertCircle className="w-5 h-5 text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">Raise a Complaint</span>
        </Link>

        <div className="flex items-start px-5 py-3 hover:bg-gray-50 transition-colors">
          <Mail className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900 font-medium">Email us on</p>
            <p className="text-sm text-gray-900">customercare@indiamart.com</p>
          </div>
        </div>

        <div className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <Phone className="w-5 h-5 text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">Call us at 096-9696-9696</span>
        </div>

        <Link href="/chat" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-[1.1rem] h-[1.1rem] text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">Chat With us</span>
        </Link>

        <Link href="/seller-academy" className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
          <GraduationCap className="w-5 h-5 text-teal-600 mr-3" />
          <span className="text-sm text-gray-900">Seller Academy</span>
        </Link>
      </div>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Check if we're on the seller page
  const isSellerPage = pathname?.includes('/component/seller') || pathname === '/seller';

  const [location, setLocation] = useState("Indore");
  const [isDetecting, setIsDetecting] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  
  const cities = [
    "Indore", "Delhi", "Mumbai", "Chennai", "Bangalore", 
    "Hyderabad", "Kolkata", "Pune", "Ahmedabad"
  ];
  
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "Ritik",
    phone: "8518900153",
    verified: true
  });
  
  const [countries, setCountries] = useState<CountryData[]>([
    { code: "IN", name: "India", dial_code: "+91", flag: "in" },
    { code: "US", name: "United States", dial_code: "+1", flag: "us" },
    { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "gb" },
    { code: "AE", name: "United Arab Emirates", dial_code: "+971", flag: "ae" },
    { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "sa" },
    { code: "CA", name: "Canada", dial_code: "+1", flag: "ca" },
    { code: "AU", name: "Australia", dial_code: "+61", flag: "au" },
    { code: "DE", name: "Germany", dial_code: "+49", flag: "de" },
    { code: "FR", name: "France", dial_code: "+33", flag: "fr" },
    { code: "JP", name: "Japan", dial_code: "+81", flag: "jp" },
    { code: "SG", name: "Singapore", dial_code: "+65", flag: "sg" },
    { code: "MY", name: "Malaysia", dial_code: "+60", flag: "my" },
  ]);
  
  const [selectedCountry, setSelectedCountry] = useState<CountryData>({
    code: "IN",
    name: "India",
    dial_code: "+91",
    flag: "in"
  });
  
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Refs for dropdown positioning
  const signInRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const helpRef = React.useRef<HTMLDivElement>(null);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,idd,flag');
        const data = await response.json();
        
        const formattedCountries: CountryData[] = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country: any) => {
            const dialCode = `${country.idd.root}${country.idd.suffixes[0]}`;
            const flagCode = country.cca2.toLowerCase();
            
            return {
              code: country.cca2,
              name: country.name.common,
              dial_code: dialCode,
              flag: flagCode
            };
          })
          .filter((country: CountryData) => 
            country.dial_code && 
            ['IN', 'US', 'GB', 'AE', 'SA', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG', 'MY'].includes(country.code)
          )
          .sort((a: CountryData, b: CountryData) => a.name.localeCompare(b.name));
        
        const indiaIndex = formattedCountries.findIndex((c: CountryData) => c.code === 'IN');
        if (indiaIndex > -1) {
          const [india] = formattedCountries.splice(indiaIndex, 1);
          formattedCountries.unshift(india);
        }
        
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // On seller page, set user as signed in
  useEffect(() => {
    if (isSellerPage) {
      setIsSignedIn(true);
    }
  }, [isSellerPage]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (response.ok) {
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            if (city) {
              setLocation(city);
            } else {
              setLocation("Location detected");
            }
          } else {
            setLocation("Unable to detect");
          }
        } catch (error) {
          console.error("Error detecting location:", error);
          setLocation("Error detecting");
        } finally {
          setIsDetecting(false);
          setLocationDropdownOpen(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location access denied");
        setIsDetecting(false);
        setLocationDropdownOpen(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Enhanced hover handlers for dropdowns
  const handleSignInMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setSignInOpen(true);
  };

  const handleSignInMouseLeave = () => {
    const timeout = setTimeout(() => {
      setSignInOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleSignInClick = () => {
    setSignInOpen(!signInOpen);
  };

  const handleSignInClose = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setSignInOpen(false);
  };

  // Help menu handlers
  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
  };

  const handleHelpClose = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHelpOpen(false);
  };

  const handleHelpMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHelpOpen(true);
  };

  const handleHelpMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHelpOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  // User Menu handlers
  const handleUserMenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setUserMenuOpen(true);
  };

  const handleUserMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setUserMenuOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleUserMenuClose = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setUserMenuOpen(false);
  };

  // Menu mouse enter handlers (to keep menu open when hovering over it)
  const handleMenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setSignInOpen(false);
      setUserMenuOpen(false);
      setHelpOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleOpenSignInDialog = () => {
    setSignInDialogOpen(true);
    setSignInOpen(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleCloseSignInDialog = () => {
    setSignInDialogOpen(false);
    setMobileNumber("");
  };

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    
    let maxLength = 15;
    switch(selectedCountry.code) {
      case 'IN': maxLength = 10; break;
      case 'US': maxLength = 10; break;
      case 'GB': maxLength = 11; break;
      case 'AU': maxLength = 9; break;
      case 'DE': maxLength = 10; break;
      case 'FR': maxLength = 9; break;
      case 'JP': maxLength = 10; break;
      default: maxLength = 15;
    }
    
    setMobileNumber(value.slice(0, maxLength));
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setMobileNumber("");
      setCountryDropdownOpen(false);
    }
  };

  const handleSubmitMobileNumber = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mobile number submitted:", selectedCountry.dial_code + mobileNumber);
    
    // Set user as signed in with phone number
    setIsSignedIn(true);
    setUserInfo({
      ...userInfo,
      phone: mobileNumber
    });
    
    // Close the dialog
    handleCloseSignInDialog();
    
    // Navigate to Buyer page
    router.push("/dashboard/buyer");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (mobileNumber.length >= 5) {
        handleSubmitMobileNumber(e as any);
      }
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserMenuOpen(false);
    setMobileNumber("");
    router.push("/");
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  // Sign In Menu Component
  const SignInMenuComponent = () => {
    if (!signInOpen) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-xl shadow-lg overflow-hidden z-50"
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <div className="max-h-[500px] overflow-y-auto">
          {/* Sign In Button */}
          <div className="p-4">
            <button 
              onClick={handleOpenSignInDialog}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-normal py-2.5 px-4 rounded transition-colors"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-600 mt-3 text-center">
              New to IndiaMART?{' '}
              <Link 
                href="/join" 
                className="text-blue-600 font-medium underline"
              >
                Join Now
              </Link>
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="border-t border-gray-200">
            <ul className="list-none p-0 m-0">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-5 h-5 mr-3 text-teal-600" />
                  Home
                </Link>
              </li>

              <li>
                <Link 
                  href="/post-requirement" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FilePlus className="w-5 h-5 mr-3 text-teal-600" />
                  Post Your Requirement
                </Link>
              </li>

              <li>
                <Link 
                  href="/verified-buyer" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <BadgeCheck className="w-5 h-5 mr-3 text-teal-600" />
                  Verified Business Buyer
                </Link>
              </li>

              <li>
                <Link 
                  href="/directory" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FolderOpen className="w-5 h-5 mr-3 text-teal-600" />
                  Products/Services Directory
                </Link>
              </li>

              <li>
                <Link 
                  href="/orders" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 mr-3 text-teal-600" />
                  My Orders
                </Link>
              </li>

              <li>
                <Link 
                  href="/settings" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 mr-3 text-teal-600" />
                  <span>Settings</span>
                  <span className="ml-2 bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                    NEW
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Ship With IndiaMART */}
          <div className="border-t border-gray-200 px-4 py-3">
            <h3 className="text-gray-900 font-medium text-base">
              Ship With IndiaMART
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Easy booking of transport
            </p>
          </div>

          {/* Download App */}
          <div className="border-t border-gray-200">
            <Link 
              href="/download" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5 mr-3 text-teal-600" />
              Download App
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // UPDATED Buyer User Menu Component - Matches the image exactly
  const BuyerUserMenuComponent = () => {
    if (!userMenuOpen) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{userInfo.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">{userInfo.phone}</span>
            {userInfo.verified && (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <BadgeCheck className="w-4 h-4 fill-green-600 text-white" />
                Verified
              </span>
            )}
          </div>
          <Link 
            href="/dashboard/profile" 
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            onClick={handleUserMenuClose}
          >
            <UserCircle className="w-4 h-4 mr-1 text-teal-600" />
            View Profile
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="py-1">
          <Link 
            href="/" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">Home</span>
          </Link>

          <Link 
            href="/post-requirement" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">Post Your Requirement</span>
          </Link>

          <Link 
            href="/verified-buyer" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">Verified Business Buyer</span>
          </Link>

          <Link 
            href="/directory" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Folder className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">Products/Services Directory</span>
          </Link>

          <Link 
            href="/orders" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">My Orders</span>
          </Link>

          <Link 
            href="/recent-activity" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LayoutGrid className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm">Recent Activity</span>
          </Link>

          <Link 
            href="/settings" 
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
            <span className="text-sm mr-2">Settings</span>
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
          </Link>

          {/* Business Loans Section */}
          <div className="border-t border-gray-100 mt-1 pt-1">
            <Link 
              href="/business-loans" 
              className="flex flex-col px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Landmark className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
                <span className="text-sm mr-2">Business Loans</span>
                <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  NEW
                </span>
              </div>
              <span className="text-xs text-gray-500 ml-8 mt-0.5">Loans made simple</span>
            </Link>
          </div>

          {/* Ship With IndiaMART Section */}
          <div className="border-t border-gray-100">
            <Link 
              href="/ship" 
              className="flex flex-col px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">Ship With IndiaMART</span>
              </div>
              <span className="text-xs text-gray-500 mt-0.5">Easy booking of transport</span>
            </Link>
          </div>

          {/* Download App */}
          <div className="border-t border-gray-100">
            <Link 
              href="/download" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Smartphone className="w-5 h-5 mr-3 text-teal-600 stroke-[1.5]" />
              <span className="text-sm">Download App</span>
            </Link>
          </div>
        </div>

        {/* Sign Out - Centered */}
        <div className="border-t border-gray-100 py-3">
          <button 
            onClick={handleSignOut}
            className="w-full text-center text-sm font-medium text-gray-700 hover:text-gray-900 py-1"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  // User Menu Component (Seller) - Keep existing for seller pages
  const UserMenuComponent = () => {
    if (!userMenuOpen) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden z-50"
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        {/* User Info Header */}
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-semibold">
                {userInfo.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base mb-1">{userInfo.name}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">
                  {userInfo.phone || "+91 ••••• •••••"}
                </span>
                {userInfo.verified && (
                  <span className="flex items-center bg-green-100 px-2 py-0.5 rounded gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-green-700 font-medium">Verified</span>
                  </span>
                )}
              </div>
              <Link 
                href="/dashboard/profile" 
                className="inline-flex items-center text-xs font-medium text-teal-600 hover:underline"
                onClick={handleUserMenuClose}
              >
                <UserCircle className="w-4 h-4 mr-1 text-teal-600" />
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="max-h-[400px] overflow-y-auto">
          <nav className="border-t border-gray-200">
            <ul className="list-none p-0 m-0">
              <li>
                <Link 
                  href="/dashboard/seller" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-5 h-5 mr-3 text-teal-600" />
                  Seller Dashboard
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/lead-manager" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FolderOpen className="w-5 h-5 mr-3 text-teal-600" />
                  Lead Manager
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/buy-leads" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Receipt className="w-5 h-5 mr-3 text-teal-600" />
                  Buy Leads
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/products" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Store className="w-5 h-5 mr-3 text-teal-600" />
                  My Products
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/finance" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Landmark className="w-5 h-5 mr-3 text-teal-600" />
                  Easy Finance
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/alerts" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-3 text-teal-600" />
                  Alerts & Notifications
                </Link>
              </li>

              <li>
                <Link 
                  href="/seller/settings" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 mr-3 text-teal-600" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sign Out Option */}
        <div className="border-t border-gray-200 my-1">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center px-5 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    );
  };

  // Help Menu Component
  const HelpMenuComponent = () => {
    if (!helpOpen) return null;
    
    const menuStyle = isSellerPage 
      ? { right: 0 } 
      : { left: 'calc(100vw - 340px)' };
    
    return (
      <div 
        className="fixed top-[60px] z-50"
        style={menuStyle}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <CustomerSupportMenu onClose={handleHelpClose} />
      </div>
    );
  };

  // SELLER PAGE NAVBAR
  const SellerPageNavbar = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="font-semibold text-white text-base md:text-lg tracking-wide whitespace-nowrap">
            M indiamart<sup className="text-[0.6rem] align-super">®</sup>
          </h1>
        </div>

        {/* Search Bar */}
        {!isMobile && (
          <div className="flex items-center bg-white rounded-md flex-1 max-w-[400px] lg:max-w-[500px] h-[38px]">
            <div className="flex items-center flex-1 px-3">
              <input
                type="text"
                placeholder="Enter product / service to search"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                aria-label="search products"
              />
            </div>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm min-w-[80px] h-[38px] rounded-r-md transition-colors"
            >
              Search
            </button>
          </div>
        )}

        {/* Right side buttons */}
        {!isMobile && (
          <button
            className="bg-white hover:bg-gray-100 text-indigo-900 font-semibold text-xs px-4 py-2 rounded-md transition-colors whitespace-nowrap min-w-[140px] border border-white/20"
          >
            Buy With IndiaMART
          </button>
        )}
      </div>

      {!isMobile && (
        <div className="flex items-center">
          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {/* Lead Manager */}
            <Link
              href="/seller/lead-manager"
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[90px] hover:bg-white/10 transition-colors"
            >
              <FolderOpen className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs leading-none mt-1 text-white">Lead Manager</span>
            </Link>

            {/* Buy Leads */}
            <Link
              href="/seller/buy-leads"
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[70px] hover:bg-white/10 transition-colors"
            >
              <Receipt className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs leading-none mt-1 text-white">Buy Leads</span>
            </Link>

            {/* Products */}
            <Link
              href="/seller/products"
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[70px] hover:bg-white/10 transition-colors"
            >
              <Store className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs leading-none mt-1 text-white">Products</span>
            </Link>

            {/* Easy Finance */}
            <Link
              href="/seller/finance"
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[85px] hover:bg-white/10 transition-colors"
            >
              <Landmark className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs leading-none mt-1 text-white">Easy Finance</span>
            </Link>

            {/* Alerts */}
            <Link
              href="/seller/alerts"
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors relative"
            >
              <div className="relative">
                <MessageCircle className="w-6 h-6 stroke-[1.5] text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] h-4 min-w-[16px] flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              <span className="text-xs leading-none mt-1 text-white">Alerts</span>
            </Link>

            {/* Help */}
            <div className="relative" ref={helpRef}>
              <div
                onClick={handleHelpClick}
                onMouseEnter={handleHelpMouseEnter}
                onMouseLeave={handleHelpMouseLeave}
                className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors"
              >
                <HelpCircle className="w-6 h-6 stroke-[1.5] text-white" />
                <span className="text-xs leading-none mt-1 text-white">Help</span>
              </div>

              <HelpMenuComponent />
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <div
                onClick={handleUserMenuClick}
                onMouseEnter={handleUserMenuMouseEnter}
                onMouseLeave={handleUserMenuMouseLeave}
                className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[70px] hover:bg-white/10 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                  {userInfo.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <span className="text-xs leading-none text-white">Hi {userInfo.name}</span>
                  <ChevronDown className="w-3 h-3 text-white" />
                </div>
              </div>

              <UserMenuComponent />
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Desktop Navbar BEFORE Sign In (for buyer pages) - WITH IMAGE ICONS
  const DesktopNavbarPreSignIn = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center min-w-[140px]">
          <div className="rounded-[40%] flex items-center justify-center mr-2 bg-white">
            <img
              src={MarineMartlogo.src}
              alt="MarineMart Logo"
              className="h-10 w-10"
            />
          </div>
          <Link href="/dashboard/buyer" className="no-underline">
            <h1 className="font-semibold text-white cursor-pointer text-base md:text-lg tracking-wide whitespace-nowrap hover:opacity-85 transition-opacity">
              marinemart
            </h1>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex items-center bg-white rounded-md flex-1 max-w-[500px] lg:max-w-[650px] h-[38px]">
            <div className="flex items-center min-w-[100px] lg:min-w-[130px] relative">
              <MapPin className="text-teal-500 w-[1.1rem] h-[1.1rem] ml-3 mr-1" />
              <div className="relative">
                <button
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="text-sm font-medium text-gray-800 flex items-center gap-1 min-w-[80px] lg:min-w-[90px] px-2 py-1"
                >
                  {location}
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                {locationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-48 z-50">
                    <button
                      onClick={detectLocation}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
                      disabled={isDetecting}
                    >
                      <Navigation className="w-4 h-4 text-teal-600" />
                      <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setLocation(city);
                          setLocationDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-sm hover:bg-gray-50 text-left text-gray-700"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <div className="flex items-center flex-1 pr-2">
              <input
                type="text"
                placeholder="Enter product / service to search"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent pl-2"
                aria-label="search products"
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm min-w-[80px] h-[30px] rounded-md transition-colors flex items-center justify-center gap-1"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        )}

        {!isMobile && (
          <button
            className="bg-white hover:bg-gray-100 text-indigo-900 font-semibold text-xs px-4 py-2 rounded-md transition-colors whitespace-nowrap min-w-[120px] border border-white/20"
          >
            Get Best Price
          </button>
        )}
      </div>

      {!isMobile && (
        <div className="flex items-center gap-2">
          {/* Exporters - Globe Icon */}
          <Link
            href="/exporters"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors"
          >
            <Globe className="w-6 h-6 stroke-[1.5] text-white" />
            <span className="text-xs mt-1 leading-none text-white">Exporters</span>
          </Link>

          {/* Sell - Shop/Store Icon */}
          <Link
            href="/component/seller"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors no-underline"
          >
            <Store className="w-6 h-6 stroke-[1.5] text-white" />
            <span className="text-xs mt-1 leading-none text-white">Sell</span>
          </Link>

          {/* Help - Question Circle Icon */}
          <div className="relative" ref={helpRef}>
            <div
              onClick={handleHelpClick}
              onMouseEnter={handleHelpMouseEnter}
              onMouseLeave={handleHelpMouseLeave}
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs mt-1 leading-none text-white">Help</span>
            </div>

            <HelpMenuComponent />
          </div>

          {/* Messages - Chat/Message Icon */}
          <Link
            href="/component/messages"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors no-underline relative"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] h-4 min-w-[16px] flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            <span className="text-xs mt-1 leading-none text-white">Messages</span>
          </Link>

          {/* Sign In - User Icon */}
          <div className="relative" ref={signInRef}>
            <div
              onClick={handleSignInClick}
              onMouseEnter={handleSignInMouseEnter}
              onMouseLeave={handleSignInMouseLeave}
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors"
            >
              <User className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs mt-1 leading-none text-white">Sign In</span>
            </div>

            <SignInMenuComponent />
          </div>
        </div>
      )}
    </>
  );

  // Desktop Navbar AFTER Sign In - WITH IMAGE ICONS
  const DesktopNavbarPostSignIn = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center min-w-[140px]">
          <div className="rounded-[40%] flex items-center justify-center mr-2 bg-white">
            <img
              src={MarineMartlogo.src}
              alt="MarineMart Logo"
              className="h-10 w-10"
            />
          </div>
          <Link href="/dashboard/buyer" className="no-underline">
            <h1 className="font-semibold text-white cursor-pointer text-base md:text-lg tracking-wide whitespace-nowrap hover:opacity-85 transition-opacity">
              marinemart
            </h1>
          </Link>
        </div>

        {/* Search Section - SAME as Pre-SignIn */}
        {!isMobile && (
          <div className="flex items-center bg-white rounded-md flex-1 max-w-[500px] lg:max-w-[650px] h-[38px]">
            <div className="flex items-center min-w-[100px] lg:min-w-[130px] relative">
              <MapPin className="text-teal-500 w-[1.1rem] h-[1.1rem] ml-3 mr-1" />
              <div className="relative">
                <button
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="text-sm font-medium text-gray-800 flex items-center gap-1 min-w-[80px] lg:min-w-[90px] px-2 py-1"
                >
                  {location}
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                {locationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-48 z-50">
                    <button
                      onClick={detectLocation}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
                      disabled={isDetecting}
                    >
                      <Navigation className="w-4 h-4 text-teal-600" />
                      <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setLocation(city);
                          setLocationDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-sm hover:bg-gray-50 text-left text-gray-700"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <div className="flex items-center flex-1 pr-2">
              <input
                type="text"
                placeholder="Enter product / service to search"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent pl-2"
                aria-label="search products"
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm min-w-[80px] h-[30px] rounded-md transition-colors flex items-center justify-center gap-1"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        )}

        {!isMobile && (
          <button
            className="bg-white hover:bg-gray-100 text-indigo-900 font-semibold text-xs px-4 py-2 rounded-md transition-colors whitespace-nowrap min-w-[120px] border border-white/20"
          >
            Get Best Price
          </button>
        )}
      </div>

      {!isMobile && (
        <div className="flex items-center gap-2">
          {/* Exporters - Globe Icon */}
          <Link
            href="/exporters"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors"
          >
            <Globe className="w-6 h-6 stroke-[1.5] text-white" />
            <span className="text-xs mt-1 leading-none text-white">Exporters</span>
          </Link>

          {/* Sell - Shop/Store Icon */}
          <Link
            href="/component/seller"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors no-underline"
          >
            <Store className="w-6 h-6 stroke-[1.5] text-white" />
            <span className="text-xs mt-1 leading-none text-white">Sell</span>
          </Link>

          {/* Help - Question Circle Icon */}
          <div className="relative" ref={helpRef}>
            <div
              onClick={handleHelpClick}
              onMouseEnter={handleHelpMouseEnter}
              onMouseLeave={handleHelpMouseLeave}
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="text-xs mt-1 leading-none text-white">Help</span>
            </div>

            <HelpMenuComponent />
          </div>

          {/* Messages - Chat/Message Icon */}
          <Link
            href="/component/messages"
            className="flex flex-col items-center px-3 py-1 rounded-md min-w-[60px] hover:bg-white/10 transition-colors no-underline relative"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 stroke-[1.5] text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] h-4 min-w-[16px] flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            <span className="text-xs mt-1 leading-none text-white">Messages</span>
          </Link>

          {/* User Menu - Avatar replaces Sign In */}
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={handleUserMenuClick}
              onMouseEnter={handleUserMenuMouseEnter}
              onMouseLeave={handleUserMenuMouseLeave}
              className="flex flex-col items-center px-3 py-1 rounded-md cursor-pointer min-w-[60px] hover:bg-white/10 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                {userInfo.name.charAt(0)}
              </div>
              <div className="flex items-center gap-1 justify-center mt-1">
                <span className="text-xs leading-none text-white">{userInfo.name}</span>
                <ChevronDown className="w-3 h-3 text-white" />
              </div>
            </div>

            <BuyerUserMenuComponent />
          </div>
        </div>
      )}
    </>
  );

  // Mobile Navbar - Simplified for seller page
  const MobileNavbar = () => (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={handleMobileMenuToggle}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <h1 className="font-semibold text-white text-base tracking-wide">
            M indiamart<sup className="text-[0.5rem] align-super">®</sup>
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleMobileSearchToggle}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
          >
            <Search className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleHelpClick}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
          >
            <HelpCircle className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleUserMenuClick}
            className="p-2 text-white hover:bg-white/10 rounded transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-semibold">
              {userInfo.name.charAt(0)}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Popover */}
      {mobileSearchOpen && (
        <div className="fixed top-[60px] left-0 right-0 bg-indigo-900 p-4 border-t border-white/10 z-40">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products/services"
                className="flex-1 bg-white rounded-md px-3 py-2 text-sm outline-none"
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm min-w-[80px] rounded-md transition-colors flex items-center justify-center gap-1"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>

            <button
              className="w-full bg-white hover:bg-gray-100 text-indigo-900 font-semibold py-2 rounded-md transition-colors"
            >
              Buy With IndiaMART
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleMobileMenuToggle}
          ></div>
          <div className="absolute left-0 top-0 h-full w-[280px] bg-indigo-900 text-white">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Seller Menu</h2>
                <button 
                  onClick={handleMobileMenuToggle}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="px-2 py-3 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                  {userInfo.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{userInfo.name}</p>
                  <p className="text-xs opacity-80">Seller Account</p>
                </div>
              </div>

              <div className="border-t border-white/20 my-4"></div>

              <nav className="space-y-1">
                <Link
                  href="/seller/lead-manager"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-white" />
                  <span>Lead Manager</span>
                </Link>

                <Link
                  href="/seller/buy-leads"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <Receipt className="w-5 h-5 text-white" />
                  <span>Buy Leads</span>
                </Link>

                <Link
                  href="/seller/products"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <Store className="w-5 h-5 text-white" />
                  <span>Products</span>
                </Link>

                <Link
                  href="/seller/finance"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <Landmark className="w-5 h-5 text-white" />
                  <span>Easy Finance</span>
                </Link>

                <Link
                  href="/seller/alerts"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Alerts</span>
                </Link>

                <Link
                  href="/help"
                  className="flex items-center gap-3 px-2 py-3 hover:bg-white/10 rounded transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-white" />
                  <span>Help</span>
                </Link>

                <div className="border-t border-white/20 my-4"></div>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-2 py-3 text-red-400 hover:bg-white/10 rounded transition-colors"
                >
                  <LogOut className="w-5 h-5 text-white" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-indigo-900 shadow-none">
        <div className="flex justify-between items-center min-h-[52px] px-2 sm:px-4 md:px-5 py-1 gap-2 md:gap-4">
          {isMobile ? (
            <MobileNavbar />
          ) : (
            isSellerPage ? <SellerPageNavbar /> : (
              isSignedIn ? <DesktopNavbarPostSignIn /> : <DesktopNavbarPreSignIn />
            )
          )}
        </div>
      </header>

      {/* Sign In Dialog */}
      {signInDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseSignInDialog}
          ></div>
          <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-[450px] shadow-xl">
            <div className="bg-indigo-900 p-6 text-center relative">
              <button
                onClick={handleCloseSignInDialog}
                className="absolute right-3 top-3 text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-white text-xl font-semibold">Sign In</h2>
            </div>

            <div className="p-6">
              <form 
                onSubmit={handleSubmitMobileNumber}
                className="text-center"
              >
                <h3 className="font-semibold mb-4 text-lg">Mobile Number</h3>
                
                <div className="flex items-center mb-6 gap-3">
                  <div className="relative min-w-[150px]">
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      className="w-full h-[50px] border border-gray-300 rounded-md flex items-center gap-3 px-3 hover:border-gray-400 focus:border-indigo-900 focus:outline-none transition-colors bg-white"
                    >
                      <FlagIcon countryCode={selectedCountry.code} />
                      <div className="text-left">
                        <p className="font-semibold text-base">{selectedCountry.dial_code}</p>
                        <p className="text-xs text-gray-500">{selectedCountry.name}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 ml-auto text-gray-600" />
                    </button>
                    
                    {countryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto z-50">
                        {loadingCountries ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountryChange(country.code)}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left"
                            >
                              <FlagIcon countryCode={country.code} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{country.name}</p>
                                <p className="text-xs text-gray-500">{country.dial_code}</p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Enter Your Mobile Number"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 h-[50px] border border-gray-300 rounded-md px-3 text-base focus:border-indigo-900 focus:outline-none transition-colors"
                  />
                </div>
                
                <button
                  type="submit"
                  className={`w-full py-3 rounded-md font-semibold text-base transition-colors ${
                    mobileNumber.length >= 10
                      ? 'bg-teal-500 hover:bg-teal-600 text-white'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={mobileNumber.length < 10}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}