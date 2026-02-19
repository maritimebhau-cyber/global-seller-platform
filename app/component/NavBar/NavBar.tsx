'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  ChevronRight,
  Bell
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
    <div className="flex items-center justify-center w-8 h-6 rounded overflow-hidden flex-shrink-0">
      <span className={flagClass} style={{ width: '32px', height: '24px' }} />
    </div>
  );
};

// Customer Support Menu Component
const CustomerSupportMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="w-full sm:w-[320px] bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          Find answers to your queries
        </p>
      </div>

      <div className="py-1">
        <Link href="/buying" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <ShoppingCart className="w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem] text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">For Buying</span>
        </Link>

        <Link href="/selling" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <Store className="w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem] text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">For Selling</span>
        </Link>

        <Link href="/feedback" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <MessageCircle className="w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem] text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">Share your Feedback</span>
        </Link>

        <Link href="/complaint" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">Raise a Complaint</span>
        </Link>

        <div className="flex items-start px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-900 font-medium">Email us on</p>
            <p className="text-xs sm:text-sm text-gray-900 truncate">customercare@indiamart.com</p>
          </div>
        </div>

        <div className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">Call us at 096-9696-9696</span>
        </div>

        <Link href="/chat" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <MessageSquare className="w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem] text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">Chat With us</span>
        </Link>

        <Link href="/seller-academy" className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors" onClick={onClose}>
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mr-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-900">Seller Academy</span>
        </Link>
      </div>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Responsive breakpoints
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = windowWidth < 640; // sm breakpoint
  const isTablet = windowWidth >= 640 && windowWidth < 1024; // md/lg breakpoint
  const isDesktop = windowWidth >= 1024; // lg breakpoint
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if we're on the seller page - but branding stays consistent
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
  const signInRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
        setSignInOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const detectLocation = useCallback(() => {
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
  }, []);

  // Enhanced hover handlers for desktop dropdowns
  const handleMouseEnter = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!isMobile && !isTablet) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      setter(true);
    }
  }, [hoverTimeout, isMobile, isTablet]);

  const handleMouseLeave = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!isMobile && !isTablet) {
      const timeout = setTimeout(() => setter(false), 150);
      setHoverTimeout(timeout);
    }
  }, [isMobile, isTablet]);

  const handleSignInClick = () => setSignInOpen(!signInOpen);
  const handleHelpClick = () => setHelpOpen(!helpOpen);
  const handleUserMenuClick = () => setUserMenuOpen(!userMenuOpen);

  const handleOpenSignInDialog = () => {
    setSignInDialogOpen(true);
    setSignInOpen(false);
    if (hoverTimeout) clearTimeout(hoverTimeout);
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
    
    setIsSignedIn(true);
    setUserInfo({
      ...userInfo,
      phone: mobileNumber
    });
    
    handleCloseSignInDialog();
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMobileSearch = () => setMobileSearchOpen(!mobileSearchOpen);

  // CONSISTENT BRAND LOGO COMPONENT - SMALLER WHITE BACKGROUND, BIGGER LOGO
  const BrandLogo = ({ className = "" }: { className?: string }) => (
    <Link href={isSellerPage ? "/dashboard/seller" : "/"} className={`flex items-center gap-2 ${className}`}>
      {/* SMALLER WHITE BACKGROUND with BIGGER LOGO that extends beyond */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        {/* Tiny white background circle */}
        <div className="absolute w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg"></div>
        {/* Bigger logo that pops out */}
        <img
          src={MarineMartlogo.src}
          alt="MarineMart"
          className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 object-contain drop-shadow-lg transform hover:scale-105 transition-transform"
          style={{ 
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            zIndex: 10
          }}
        />
      </div>
      <h1 className="font-bold text-white text-lg sm:text-xl lg:text-2xl tracking-tight whitespace-nowrap hover:opacity-90 transition-opacity drop-shadow-md">
        marinemart
      </h1>
    </Link>
  );

  // Sign In Menu Component (Desktop)
  const SignInMenuComponent = () => {
    if (!signInOpen || isMobile) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-gray-100"
        onMouseEnter={() => handleMouseEnter(setSignInOpen)}
        onMouseLeave={() => handleMouseLeave(setSignInOpen)}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <div className="p-4">
            <button 
              onClick={handleOpenSignInDialog}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              Sign In
            </button>
            <p className="text-xs text-gray-600 mt-3 text-center">
              New to IndiaMART?{' '}
              <Link href="/join" className="text-blue-600 font-medium underline">
                Join Now
              </Link>
            </p>
          </div>

          <nav className="border-t border-gray-200">
            <ul className="list-none p-0 m-0">
              <li>
                <Link href="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Home className="w-4 h-4 mr-3 text-teal-600" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/post-requirement" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <FilePlus className="w-4 h-4 mr-3 text-teal-600" />
                  Post Your Requirement
                </Link>
              </li>
              <li>
                <Link href="/verified-buyer" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <BadgeCheck className="w-4 h-4 mr-3 text-teal-600" />
                  Verified Business Buyer
                </Link>
              </li>
              <li>
                <Link href="/directory" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <FolderOpen className="w-4 h-4 mr-3 text-teal-600" />
                  Products/Services Directory
                </Link>
              </li>
              <li>
                <Link href="/orders" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <ShoppingCart className="w-4 h-4 mr-3 text-teal-600" />
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Settings className="w-4 h-4 mr-3 text-teal-600" />
                  <span>Settings</span>
                  <span className="ml-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-gray-200 px-4 py-3">
            <h3 className="text-gray-900 font-medium text-sm">Ship With IndiaMART</h3>
            <p className="text-xs text-gray-500 mt-1">Easy booking of transport</p>
          </div>

          <div className="border-t border-gray-200">
            <Link href="/download" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
              <Download className="w-4 h-4 mr-3 text-teal-600" />
              Download App
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Buyer User Menu Component (Desktop)
  const BuyerUserMenuComponent = () => {
    if (!userMenuOpen || isMobile) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
        onMouseEnter={() => handleMouseEnter(setUserMenuOpen)}
        onMouseLeave={() => handleMouseLeave(setUserMenuOpen)}
      >
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-1">{userInfo.name}</h3>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs text-gray-600">{userInfo.phone}</span>
            {userInfo.verified && (
              <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <BadgeCheck className="w-3 h-3 fill-green-600 text-white" />
                Verified
              </span>
            )}
          </div>
          <Link href="/dashboard/profile" className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-700 font-medium">
            <UserCircle className="w-3 h-3 mr-1 text-teal-600" />
            View Profile
          </Link>
        </div>

        <div className="py-1">
          <Link href="/" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Home className="w-4 h-4 mr-3 text-teal-600" />
            Home
          </Link>
          <Link href="/post-requirement" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <FileText className="w-4 h-4 mr-3 text-teal-600" />
            Post Your Requirement
          </Link>
          <Link href="/verified-buyer" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <User className="w-4 h-4 mr-3 text-teal-600" />
            Verified Business Buyer
          </Link>
          <Link href="/directory" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Folder className="w-4 h-4 mr-3 text-teal-600" />
            Products/Services Directory
          </Link>
          <Link href="/orders" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <MessageSquare className="w-4 h-4 mr-3 text-teal-600" />
            My Orders
          </Link>
          <Link href="/recent-activity" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <LayoutGrid className="w-4 h-4 mr-3 text-teal-600" />
            Recent Activity
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Settings className="w-4 h-4 mr-3 text-teal-600" />
            <span className="mr-2">Settings</span>
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
          </Link>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <Link href="/business-loans" className="flex flex-col px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Landmark className="w-4 h-4 mr-3 text-teal-600" />
                <span className="text-sm mr-2">Business Loans</span>
                <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
              </div>
              <span className="text-xs text-gray-500 ml-7 mt-0.5">Loans made simple</span>
            </Link>
          </div>

          <div className="border-t border-gray-100">
            <Link href="/ship" className="flex flex-col px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-sm font-medium">Ship With IndiaMART</span>
              </div>
              <span className="text-xs text-gray-500 mt-0.5">Easy booking of transport</span>
            </Link>
          </div>

          <div className="border-t border-gray-100">
            <Link href="/download" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
              <Smartphone className="w-4 h-4 mr-3 text-teal-600" />
              Download App
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 py-3">
          <button onClick={handleSignOut} className="w-full text-center text-sm font-medium text-gray-700 hover:text-gray-900 py-1">
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  // Seller User Menu Component (Desktop)
  const SellerUserMenuComponent = () => {
    if (!userMenuOpen || isMobile) return null;
    
    return (
      <div 
        className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
        onMouseEnter={() => handleMouseEnter(setUserMenuOpen)}
        onMouseLeave={() => handleMouseLeave(setUserMenuOpen)}
      >
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
              {userInfo.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-1 truncate">{userInfo.name}</p>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              <Link href="/dashboard/profile" className="inline-flex items-center text-xs font-medium text-teal-600 hover:underline">
                <UserCircle className="w-3 h-3 mr-1" />
                View Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <nav className="border-t border-gray-200">
            <ul className="list-none p-0 m-0">
              <li>
                <Link href="/dashboard/seller" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Home className="w-4 h-4 mr-3 text-teal-600" />
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/seller/lead-manager" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <FolderOpen className="w-4 h-4 mr-3 text-teal-600" />
                  Lead Manager
                </Link>
              </li>
              <li>
                <Link href="/seller/buy-leads" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Receipt className="w-4 h-4 mr-3 text-teal-600" />
                  Buy Leads
                </Link>
              </li>
              <li>
                <Link href="/seller/products" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Store className="w-4 h-4 mr-3 text-teal-600" />
                  My Products
                </Link>
              </li>
              <li>
                <Link href="/seller/finance" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Landmark className="w-4 h-4 mr-3 text-teal-600" />
                  Easy Finance
                </Link>
              </li>
              <li>
                <Link href="/seller/alerts" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4 mr-3 text-teal-600" />
                  Alerts & Notifications
                </Link>
              </li>
              <li>
                <Link href="/seller/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <Settings className="w-4 h-4 mr-3 text-teal-600" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-200 my-1">
          <button onClick={handleSignOut} className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-sm">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    );
  };

  // Help Menu Component
  const HelpMenuComponent = () => {
    if (!helpOpen) return null;
    
    return (
      <div 
        className={`fixed sm:absolute top-[56px] sm:top-full right-0 sm:right-0 sm:mt-2 z-50 w-full sm:w-auto px-4 sm:px-0`}
        onMouseEnter={() => !isMobile && handleMouseEnter(setHelpOpen)}
        onMouseLeave={() => !isMobile && handleMouseLeave(setHelpOpen)}
      >
        <CustomerSupportMenu onClose={() => setHelpOpen(false)} />
      </div>
    );
  };

  // MOBILE COMPONENTS

  // Mobile Search Overlay
  const MobileSearchOverlay = () => {
    if (!mobileSearchOpen || !isMobile) return null;
    
    return (
      <div className="fixed inset-x-0 top-[56px] bg-indigo-900 p-4 border-t border-white/10 z-40 animate-in slide-in-from-top-2">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex items-center bg-white rounded-lg flex-1 px-3">
              <MapPin className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
              <select 
                className="bg-transparent text-sm text-gray-800 outline-none py-2 min-w-[80px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products/services..."
              className="flex-1 bg-white rounded-lg px-3 py-2.5 text-sm outline-none"
              autoFocus
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
          {!isSellerPage && (
            <button className="w-full bg-white hover:bg-gray-100 text-indigo-900 font-semibold py-2.5 rounded-lg transition-colors text-sm">
              Get Best Price
            </button>
          )}
          {isSellerPage && (
            <button className="w-full bg-white hover:bg-gray-100 text-indigo-900 font-semibold py-2.5 rounded-lg transition-colors text-sm">
              Buy With IndiaMART
            </button>
          )}
        </div>
      </div>
    );
  };

  // Mobile Menu Drawer
  const MobileMenuDrawer = () => {
    if (!mobileMenuOpen || !isMobile) return null;

    const menuItems = isSellerPage ? [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/seller' },
      { icon: FolderOpen, label: 'Lead Manager', href: '/seller/lead-manager' },
      { icon: Receipt, label: 'Buy Leads', href: '/seller/buy-leads' },
      { icon: Store, label: 'Products', href: '/seller/products' },
      { icon: Landmark, label: 'Easy Finance', href: '/seller/finance' },
      { icon: Bell, label: 'Alerts', href: '/seller/alerts', badge: 3 },
      { icon: HelpCircle, label: 'Help', href: '/help' },
    ] : isSignedIn ? [
      { icon: Home, label: 'Home', href: '/' },
      { icon: FileText, label: 'Post Requirement', href: '/post-requirement' },
      { icon: User, label: 'Verified Buyer', href: '/verified-buyer' },
      { icon: Folder, label: 'Directory', href: '/directory' },
      { icon: ShoppingCart, label: 'My Orders', href: '/orders' },
      { icon: LayoutGrid, label: 'Recent Activity', href: '/recent-activity' },
      { icon: Settings, label: 'Settings', href: '/settings', badge: 'NEW' },
      { icon: Globe, label: 'Exporters', href: '/exporters' },
      { icon: Store, label: 'Sell', href: '/component/seller' },
    ] : [
      { icon: Home, label: 'Home', href: '/' },
      { icon: FilePlus, label: 'Post Requirement', href: '/post-requirement' },
      { icon: BadgeCheck, label: 'Verified Buyer', href: '/verified-buyer' },
      { icon: FolderOpen, label: 'Directory', href: '/directory' },
      { icon: Globe, label: 'Exporters', href: '/exporters' },
      { icon: Store, label: 'Sell', href: '/component/seller' },
    ];

    return (
      <div className="fixed inset-0 z-50">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={toggleMobileMenu}
        />
        <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-left">
          <div className="p-4 border-b border-gray-100 bg-indigo-900">
            <div className="flex justify-between items-center mb-4">
              {/* MOBILE MENU LOGO - SMALLER WHITE BG, BIGGER LOGO */}
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 bg-white rounded-md"></div>
                  <img 
                    src={MarineMartlogo.src} 
                    alt="MarineMart" 
                    className="relative h-8 w-8 object-contain drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                  />
                </div>
                <h2 className="font-bold text-lg text-white drop-shadow-md">marinemart</h2>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {isSignedIn && (
              <div className="flex items-center gap-3 pb-2">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                  {userInfo.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{userInfo.name}</p>
                  <p className="text-xs text-white/70 truncate">{isSellerPage ? 'Seller Account' : 'Buyer Account'}</p>
                </div>
                {userInfo.verified && (
                  <BadgeCheck className="w-5 h-5 text-green-400 fill-green-400/20" />
                )}
              </div>
            )}
          </div>

          <div className="overflow-y-auto h-[calc(100%-180px)]">
            <nav className="p-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-between px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mb-1"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    typeof item.badge === 'number' ? (
                      <span className="bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-200 mx-2 my-2"></div>

            {!isSignedIn ? (
              <div className="p-3">
                <button 
                  onClick={() => {
                    toggleMobileMenu();
                    handleOpenSignInDialog();
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  Sign In
                </button>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  New here?{' '}
                  <Link href="/join" className="text-blue-600 font-medium">
                    Join Now
                  </Link>
                </p>
              </div>
            ) : (
              <div className="p-3">
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    handleSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // TABLET COMPONENTS

  // Tablet Navigation - Compact horizontal layout
  const TabletNavigation = () => {
    if (!isTablet) return null;

    return (
      <div className="hidden md:flex lg:hidden items-center gap-1">
        {isSellerPage ? (
          <>
            <Link href="/seller/lead-manager" className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[60px]">
              <FolderOpen className="w-5 h-5 text-white" />
              <span className="text-[10px] text-white mt-0.5">Leads</span>
            </Link>
            <Link href="/seller/products" className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[60px]">
              <Store className="w-5 h-5 text-white" />
              <span className="text-[10px] text-white mt-0.5">Products</span>
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onClick={handleHelpClick}
                className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[60px]"
              >
                <HelpCircle className="w-5 h-5 text-white" />
                <span className="text-[10px] text-white mt-0.5">Help</span>
              </button>
              <HelpMenuComponent />
            </div>
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleUserMenuClick}
                className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[60px]"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                  {userInfo.name.charAt(0)}
                </div>
                <span className="text-[10px] text-white mt-0.5">{userInfo.name}</span>
              </button>
              <SellerUserMenuComponent />
            </div>
          </>
        ) : (
          <>
            <Link href="/exporters" className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px]">
              <Globe className="w-5 h-5 text-white" />
              <span className="text-[10px] text-white mt-0.5">Export</span>
            </Link>
            <Link href="/component/seller" className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px]">
              <Store className="w-5 h-5 text-white" />
              <span className="text-[10px] text-white mt-0.5">Sell</span>
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onClick={handleHelpClick}
                className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px]"
              >
                <HelpCircle className="w-5 h-5 text-white" />
                <span className="text-[10px] text-white mt-0.5">Help</span>
              </button>
              <HelpMenuComponent />
            </div>
            <Link href="/component/messages" className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px] relative">
              <div className="relative">
                <MessageSquare className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] h-3.5 min-w-[14px] flex items-center justify-center rounded-full px-1">
                  3
                </span>
              </div>
              <span className="text-[10px] text-white mt-0.5">Chat</span>
            </Link>
            {isSignedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={handleUserMenuClick}
                  className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px]"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                    {userInfo.name.charAt(0)}
                  </div>
                  <span className="text-[10px] text-white mt-0.5">{userInfo.name}</span>
                </button>
                <BuyerUserMenuComponent />
              </div>
            ) : (
              <div className="relative" ref={signInRef}>
                <button
                  onClick={handleSignInClick}
                  className="flex flex-col items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors min-w-[50px]"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-[10px] text-white mt-0.5">Sign In</span>
                </button>
                <SignInMenuComponent />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Desktop Search Bar
  const DesktopSearchBar = () => (
    <div className="hidden lg:flex items-center bg-white rounded-lg flex-1 max-w-[450px] xl:max-w-[600px] h-[40px] shadow-sm">
      <div className="flex items-center min-w-[120px] xl:min-w-[140px] relative border-r border-gray-200" ref={locationRef}>
        <MapPin className="text-teal-600 w-4 h-4 ml-3 mr-1 flex-shrink-0" />
        <button
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
          className="text-sm font-medium text-gray-800 flex items-center gap-1 px-2 py-1 w-full text-left"
        >
          <span className="truncate">{location}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        </button>
        
        {locationDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 w-56 z-50 overflow-hidden">
            <button
              onClick={detectLocation}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors"
              disabled={isDetecting}
            >
              <Navigation className="w-4 h-4 text-teal-600" />
              <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
            </button>
            <div className="border-t border-gray-100"></div>
            <div className="max-h-[200px] overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setLocation(city);
                    setLocationDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm hover:bg-gray-50 text-left text-gray-700 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center flex-1 px-3">
        <input
          type="text"
          placeholder="Enter product / service to search"
          className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          aria-label="search products"
        />
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-5 h-[32px] rounded-md transition-colors flex items-center justify-center gap-1.5 ml-2">
          <Search className="w-4 h-4" />
          <span className="hidden xl:inline">Search</span>
        </button>
      </div>
    </div>
  );

  // CTA Button Component - INCREASED WIDTH
  const CTAButton = () => {
    if (isSellerPage) {
      return (
        <button className="hidden xl:block bg-white hover:bg-gray-50 text-indigo-900 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm hover:shadow-md min-w-[160px]">
          Buy With IndiaMART
        </button>
      );
    }
    return (
      <button className="hidden xl:block bg-white hover:bg-gray-50 text-indigo-900 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm hover:shadow-md min-w-[140px]">
        Get Best Price
      </button>
    );
  };

  // Desktop Navigation Items
  const DesktopNavigation = () => {
    if (!isDesktop) return null;

    return (
      <div className="hidden lg:flex items-center gap-1">
        {isSellerPage ? (
          <>
            <Link href="/seller/lead-manager" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[80px] group">
              <FolderOpen className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Lead Manager</span>
            </Link>
            <Link href="/seller/buy-leads" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[70px] group">
              <Receipt className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Buy Leads</span>
            </Link>
            <Link href="/seller/products" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[70px] group">
              <Store className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Products</span>
            </Link>
            <Link href="/seller/finance" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[85px] group">
              <Landmark className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Easy Finance</span>
            </Link>
            <Link href="/seller/alerts" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group relative">
              <div className="relative">
                <MessageCircle className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 font-bold">
                  3
                </span>
              </div>
              <span className="text-xs text-white mt-1 font-medium">Alerts</span>
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onMouseEnter={() => handleMouseEnter(setHelpOpen)}
                onMouseLeave={() => handleMouseLeave(setHelpOpen)}
                onClick={handleHelpClick}
                className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group"
              >
                <HelpCircle className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white mt-1 font-medium">Help</span>
              </button>
              <HelpMenuComponent />
            </div>
            <div className="relative" ref={userMenuRef}>
              <button
                onMouseEnter={() => handleMouseEnter(setUserMenuOpen)}
                onMouseLeave={() => handleMouseLeave(setUserMenuOpen)}
                onClick={handleUserMenuClick}
                className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[70px] group"
              >
                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-semibold group-hover:scale-105 transition-transform">
                  {userInfo.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 justify-center mt-1">
                  <span className="text-xs text-white font-medium">Hi {userInfo.name}</span>
                  <ChevronDown className="w-3 h-3 text-white" />
                </div>
              </button>
              <SellerUserMenuComponent />
            </div>
          </>
        ) : (
          <>
            <Link href="/exporters" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group">
              <Globe className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Exporters</span>
            </Link>
            <Link href="/component/seller" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group">
              <Store className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
              <span className="text-xs text-white mt-1 font-medium">Sell</span>
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onMouseEnter={() => handleMouseEnter(setHelpOpen)}
                onMouseLeave={() => handleMouseLeave(setHelpOpen)}
                onClick={handleHelpClick}
                className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group"
              >
                <HelpCircle className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white mt-1 font-medium">Help</span>
              </button>
              <HelpMenuComponent />
            </div>
            <Link href="/component/messages" className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group relative">
              <div className="relative">
                <MessageSquare className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 font-bold">
                  3
                </span>
              </div>
              <span className="text-xs text-white mt-1 font-medium">Messages</span>
            </Link>
            {isSignedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onMouseEnter={() => handleMouseEnter(setUserMenuOpen)}
                  onMouseLeave={() => handleMouseLeave(setUserMenuOpen)}
                  onClick={handleUserMenuClick}
                  className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-semibold group-hover:scale-105 transition-transform">
                    {userInfo.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 justify-center mt-1">
                    <span className="text-xs text-white font-medium">{userInfo.name}</span>
                    <ChevronDown className="w-3 h-3 text-white" />
                  </div>
                </button>
                <BuyerUserMenuComponent />
              </div>
            ) : (
              <div className="relative" ref={signInRef}>
                <button
                  onMouseEnter={() => handleMouseEnter(setSignInOpen)}
                  onMouseLeave={() => handleMouseLeave(setSignInOpen)}
                  onClick={handleSignInClick}
                  className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors min-w-[60px] group"
                >
                  <User className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
                  <span className="text-xs text-white mt-1 font-medium">Sign In</span>
                </button>
                <SignInMenuComponent />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // MAIN RENDER

  return (
    <>
      <header className="sticky top-0 z-40 bg-indigo-900 shadow-lg">
        <div className="flex justify-between items-center h-14 px-3 sm:px-4 lg:px-6 gap-2 sm:gap-3">
          
          {/* MOBILE HEADER - SMALLER WHITE BG, BIGGER LOGO */}
          {isMobile && (
            <>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors -ml-1"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
                {/* SMALLER WHITE BACKGROUND, BIGGER LOGO */}
                <BrandLogo />
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMobileSearch}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
                
                {isSignedIn ? (
                  <button
                    onClick={handleUserMenuClick}
                    className="p-1.5 rounded-full bg-teal-500 text-white font-semibold text-sm w-8 h-8 flex items-center justify-center"
                  >
                    {userInfo.name.charAt(0)}
                  </button>
                ) : (
                  <button
                    onClick={handleOpenSignInDialog}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </>
          )}

          {/* TABLET HEADER - SMALLER WHITE BG, BIGGER LOGO */}
          {isTablet && (
            <>
              <div className="flex items-center gap-3 flex-1">
                {/* SMALLER WHITE BACKGROUND, BIGGER LOGO */}
                <BrandLogo />
                
                {/* Compact Search for Tablet */}
                <div className="flex-1 max-w-md">
                  <div className="flex items-center bg-white rounded-lg h-9 shadow-sm overflow-hidden">
                    <div className="flex items-center px-2 border-r border-gray-200">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 mr-1" />
                      <select 
                        className="bg-transparent text-xs text-gray-800 outline-none py-1 w-20"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        {cities.slice(0, 5).map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent px-3"
                    />
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 h-full transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <TabletNavigation />
            </>
          )}

          {/* DESKTOP HEADER - SMALLER WHITE BG, BIGGER LOGO + wider CTA button */}
          {isDesktop && (
            <>
              <div className="flex items-center gap-4 flex-1">
                {/* SMALLER WHITE BACKGROUND, BIGGER LOGO */}
                <BrandLogo />

                <DesktopSearchBar />

                {/* INCREASED WIDTH CTA BUTTON */}
                <CTAButton />
              </div>

              <DesktopNavigation />
            </>
          )}
        </div>
      </header>

      {/* Mobile Overlays */}
      <MobileSearchOverlay />
      <MobileMenuDrawer />

      {/* Sign In Dialog */}
      {signInDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-[420px] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-indigo-900 p-6 text-center relative">
              <button
                onClick={handleCloseSignInDialog}
                className="absolute right-4 top-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-white text-xl font-bold">Welcome Back</h2>
              <p className="text-white/70 text-sm mt-1">Sign in to continue</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmitMobileNumber} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex items-stretch gap-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="h-[52px] border border-gray-300 rounded-xl flex items-center gap-2 px-3 hover:border-gray-400 focus:border-indigo-900 focus:outline-none transition-colors bg-white min-w-[130px]"
                      >
                        <FlagIcon countryCode={selectedCountry.code} />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-sm">{selectedCountry.dial_code}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {countryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 max-h-[320px] overflow-y-auto z-50">
                          {loadingCountries ? (
                            <div className="flex items-center justify-center py-8">
                              <div className="w-6 h-6 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <div className="py-2">
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => handleCountryChange(country.code)}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                                >
                                  <FlagIcon countryCode={country.code} />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-gray-900">{country.name}</p>
                                    <p className="text-xs text-gray-500">{country.dial_code}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      onKeyDown={handleKeyDown}
                      className="flex-1 h-[52px] border border-gray-300 rounded-xl px-4 text-base focus:border-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-900/10 transition-all"
                      autoFocus
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={mobileNumber.length < 10}
                  className={`w-full h-[52px] rounded-xl font-semibold text-base transition-all ${
                    mobileNumber.length >= 10
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mobile User Menu Bottom Sheet */}
      {userMenuOpen && isMobile && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setUserMenuOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-semibold">
                  {userInfo.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userInfo.name}</h3>
                  <p className="text-sm text-gray-500">{userInfo.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setUserMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-2">
              <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <UserCircle className="w-5 h-5 text-teal-600" />
                <span className="font-medium">View Profile</span>
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}