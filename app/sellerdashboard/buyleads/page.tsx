"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Building2, 
  Copy,
  Star, 
  EyeOff, 
  Trash2, 
  Smartphone, 
  MapPin,
  Filter,
  ChevronDown,
  X,
  Search,
  Wallet,
  HelpCircle,
  Check,
  ChevronRight,
  Download,
  Mail,
  Briefcase,
  Package,
  IndianRupee,
  Menu,
  User,
  MoreHorizontal,
  FileText,
  History,
  Crown,
  MapPinned,
  BadgeCheck,
  MessageCircle,
  TrendingUp,
  Phone,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';

// Types
interface Lead {
  id: string;
  title: string;
  timeAgo: string;
  location: string;
  state: string;
  category: string;
  subcategory: string;
  memberSince: string;
  buys: string[];
  requirements: number;
  calls: number;
  replies: number;
  year: string;
  quantity?: string;
  buyerName?: string;
  companyName?: string;
  mobileVerified?: boolean;
  gstVerified?: boolean;
  description?: string;
  relevanceScore?: number;
  date?: Date;
  orderValue?: string;
  isPremium?: boolean;
}

interface FilterState {
  location: string[];
  categories: string[];
  orderValue: string[];
  leadType: string[];
}

type TabType = 'Relevant' | 'Recent' | 'Catalog Views' | 'Export' | 'More Leads' | 'Shortlisted' | 'Latest Tenders' | 'Past Transactions';

const BuyLeadsPage: React.FC = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('Relevant');
  const [sortBy, setSortBy] = useState<'Relevant' | 'Recent'>('Relevant');
  const [recentSortOrder, setRecentSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState<string | false>(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMoreLeadsModal, setShowMoreLeadsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    location: ['Gujarat'],
    categories: [],
    orderValue: [],
    leadType: []
  });

  const recentDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (recentDropdownRef.current && !recentDropdownRef.current.contains(event.target as Node)) {
        setShowRecentDropdown(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkNetworkSpeed = async () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const updateNetworkStatus = () => {
          const effectiveType = connection?.effectiveType;
          const saveData = connection?.saveData;
          setIsSlowNetwork(
            effectiveType === '2g' || 
            effectiveType === 'slow-2g' || 
            saveData === true ||
            connection?.downlink < 0.5
          );
        };
        updateNetworkStatus();
        connection?.addEventListener('change', updateNetworkStatus);
        return () => connection?.removeEventListener('change', updateNetworkStatus);
      }
    };
    checkNetworkSpeed();
  }, []);

  const baseLeads: Lead[] = [
    {
      id: '1',
      title: 'Havells Electrical Wire 1.5 Sq Mm',
      timeAgo: '6 hrs ago',
      location: 'Delhi',
      state: 'Delhi',
      category: 'Electric House Wire',
      subcategory: 'Havells House Wire',
      memberSince: '2+ years',
      buys: ['Electric Cables', 'Switch Boards', 'LED Lights'],
      requirements: 5,
      calls: 2,
      replies: 8,
      year: '2024',
      quantity: '90 Meter',
      buyerName: 'Rahul Sharma',
      companyName: 'Sharma Electricals',
      mobileVerified: true,
      gstVerified: true,
      description: 'I want to buy Havells Electrical Wire 1.5 Sq Mm. Kindly send me price and other details.',
      relevanceScore: 95,
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      orderValue: 'Rs. 3,000 to 10,000',
      isPremium: false
    },
    {
      id: '2',
      title: 'Bosch GWS600 Angle Grinder',
      timeAgo: '17 min ago',
      location: 'Chennai',
      state: 'Tamil Nadu',
      category: 'Angle Grinder',
      subcategory: 'Bosch Angle Grinder',
      memberSince: '3+ years',
      buys: ['Power Tools', 'Drill Machines', 'Cutting Discs'],
      requirements: 8,
      calls: 5,
      replies: 12,
      year: '2024',
      quantity: '4 Units',
      buyerName: 'Kumar Manufacturing',
      companyName: 'Kumar Industries',
      mobileVerified: true,
      gstVerified: true,
      description: 'I am interested in Bosch GWS600 Angle Grinder. Please send quotations.',
      relevanceScore: 88,
      date: new Date(Date.now() - 17 * 60 * 1000),
      orderValue: 'Rs. 10,000 to 50,000',
      isPremium: true
    },
    {
      id: '3',
      title: 'Designer Cotton Punjabi Salwar Suit',
      timeAgo: '25 min ago',
      location: 'Mumbai',
      state: 'Maharashtra',
      category: 'Ladies Suits',
      subcategory: 'Cotton Salwar Suit',
      memberSince: '1+ years',
      buys: ['Fabrics', 'Dress Materials', 'Traditional Wear'],
      requirements: 15,
      calls: 8,
      replies: 20,
      year: '2024',
      quantity: '1 Unit(s)',
      buyerName: 'Priya Fashion House',
      companyName: 'Priya Textiles',
      mobileVerified: true,
      gstVerified: false,
      description: 'Looking for designer cotton Punjabi salwar suits for retail sale.',
      relevanceScore: 82,
      date: new Date(Date.now() - 25 * 60 * 1000),
      orderValue: 'Rs. 1,000 to 5,000',
      isPremium: false
    },
    {
      id: '4',
      title: 'Wallpaper for Home Decoration',
      timeAgo: '3 days ago',
      location: 'Allahabad',
      state: 'Uttar Pradesh',
      category: 'Wallpaper',
      subcategory: 'Home Wallpaper',
      memberSince: '3+ years',
      buys: ['Interior Items', 'Wall Decor', 'Home Furnishing'],
      requirements: 2,
      calls: 1,
      replies: 5,
      year: '2024',
      quantity: '5 Roll',
      buyerName: 'Amit Verma',
      companyName: 'Verma Interiors',
      mobileVerified: true,
      gstVerified: true,
      description: 'I want to buy Wallpaper. Kindly share the product details via WhatsApp/SMS/Email.',
      relevanceScore: 75,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      orderValue: 'Rs. 2,500 - 9,000',
      isPremium: false
    },
    {
      id: '5',
      title: 'Samsung Galaxy A50 Mobile Phone',
      timeAgo: '1 day ago',
      location: 'Bangalore',
      state: 'Karnataka',
      category: 'Mobile Phones',
      subcategory: 'Samsung Mobiles',
      memberSince: '4+ years',
      buys: ['Mobile Accessories', 'Phone Cases', 'Screen Guards'],
      requirements: 12,
      calls: 3,
      replies: 8,
      year: '2024',
      quantity: '10 Units',
      buyerName: 'Tech World',
      companyName: 'Tech World Pvt Ltd',
      mobileVerified: true,
      gstVerified: true,
      description: 'Want to buy Samsung Galaxy A50 4GB RAM, 64GB Storage. Bulk order.',
      relevanceScore: 91,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      orderValue: 'Above Rs. 1,00,000',
      isPremium: true
    }
  ];

  const getFilteredLeads = (): Lead[] => {
    let filtered = [...baseLeads];

    if (searchQuery.trim()) {
      filtered = filtered.filter(lead => 
        lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeTab) {
      case 'Relevant':
        filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        break;
      case 'Recent':
        filtered.sort((a, b) => {
          const dateA = a.date?.getTime() || 0;
          const dateB = b.date?.getTime() || 0;
          return recentSortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
        break;
      case 'Catalog Views':
        filtered = filtered.filter(lead => lead.requirements > 5);
        break;
      case 'Shortlisted':
        filtered = filtered.slice(0, 2);
        break;
      case 'Latest Tenders':
        filtered = filtered.filter(lead => (lead.requirements || 0) > 10);
        break;
      case 'Past Transactions':
        filtered = filtered.filter(lead => {
          const hoursAgo = lead.timeAgo.includes('day') ? 24 : parseInt(lead.timeAgo);
          return hoursAgo > 12;
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const leads = getFilteredLeads();

  const tabs = [
    { id: 'Relevant' as TabType, label: 'Relevant', hasDropdown: false, icon: null },
    { id: 'Recent' as TabType, label: 'Recent', hasDropdown: true, icon: recentSortOrder === 'desc' ? '↓' : '↑' },
    { id: 'Catalog Views' as TabType, label: 'Catalog Views', hasDropdown: false, icon: null },
    { id: 'Export' as TabType, label: 'Export', hasDropdown: false, icon: null },
    { id: 'More Leads' as TabType, label: 'More Leads', hasDropdown: false, icon: null },
    { id: 'Shortlisted' as TabType, label: 'Shortlisted', hasDropdown: false, icon: null },
    { id: 'Latest Tenders' as TabType, label: 'Latest Tenders', hasDropdown: false, icon: null },
    { id: 'Past Transactions' as TabType, label: 'Past Transactions', hasDropdown: false, icon: null }
  ];

  const locationOptions = {
    recommended: ['Recommended', 'India', 'Nearby States', 'Foreign'],
    states: ['Madhya Pradesh', 'Gujarat', 'Maharashtra', 'Uttar Pradesh', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Kerala', 'West Bengal']
  };

  const categoryOptions = [
    'Electric House Wire',
    'Angle Grinder',
    'Ladies Suits',
    'Wallpaper',
    'Mobile Phones',
    'Industrial Machinery',
    'Medical Equipment',
    'Furniture'
  ];

  const orderValueOptions = [
    { label: 'Any', value: 'any' },
    { label: 'Above ₹10,000', value: '10000' },
    { label: 'Above ₹50,000', value: '50000' },
    { label: 'Above ₹1,00,000', value: '100000' },
    { label: 'Above ₹5,00,000', value: '500000' }
  ];

  const leadTypeOptions = [
    { label: 'Bulk (₹20k+)', value: 'bulk' },
    { label: 'GST Verified', value: 'gst' },
    { label: 'Mobile Verified', value: 'mobile' },
    { label: 'Premium', value: 'premium' }
  ];

  const handleTabClick = (tabId: TabType) => {
    if (tabId === 'Recent') {
      setShowRecentDropdown(!showRecentDropdown);
    } else if (tabId === 'Export') {
      setShowExportModal(true);
      setActiveTab(tabId);
    } else if (tabId === 'More Leads') {
      setShowMoreLeadsModal(true);
      setActiveTab(tabId);
    } else {
      setActiveTab(tabId);
      setShowRecentDropdown(false);
    }
  };

  const handleRecentSort = (order: 'desc' | 'asc') => {
    setRecentSortOrder(order);
    setShowRecentDropdown(false);
    setActiveTab('Recent');
  };

  const toggleLocation = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(loc) 
        ? prev.location.filter(l => l !== loc)
        : [...prev.location, loc]
    }));
  };

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const toggleOrderValue = (val: string) => {
    setFilters(prev => ({
      ...prev,
      orderValue: prev.orderValue.includes(val)
        ? prev.orderValue.filter(v => v !== val)
        : [...prev.orderValue, val]
    }));
  };

  const toggleLeadType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      leadType: prev.leadType.includes(type)
        ? prev.leadType.filter(t => t !== type)
        : [...prev.leadType, type]
    }));
  };

  const removeFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(v => v !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      location: [],
      categories: [],
      orderValue: [],
      leadType: []
    });
  };

  const activeFilterCount = filters.location.length + filters.categories.length + filters.orderValue.length + filters.leadType.length;

  return (
    <div className="min-h-screen bg-[#f1f3f6]" style={{ fontFamily: "'Mulish', 'Open Sans', sans-serif" }}>
      {/* Google Fonts - Mulish */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Slow Network Banner */}
      {isSlowNetwork && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-b-lg shadow-sm flex items-center gap-2 text-[13px] font-semibold pointer-events-auto">
            <span>Slow network connection detected.</span>
            <button onClick={() => setIsSlowNetwork(false)} className="hover:bg-amber-200 rounded p-0.5">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Export Leads</h3>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Export your leads to Excel or CSV format</p>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={20} className="text-green-600" />
                <div className="text-left">
                  <div className="font-bold text-gray-900">Export as Excel</div>
                  <div className="text-xs text-gray-500">.xlsx format</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText size={20} className="text-blue-600" />
                <div className="text-left">
                  <div className="font-bold text-gray-900">Export as CSV</div>
                  <div className="text-xs text-gray-500">.csv format</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More Leads Modal */}
      {showMoreLeadsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">More Leads</h3>
              <button onClick={() => setShowMoreLeadsModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={20} className="text-[#00a699]" />
                  <span className="font-bold text-[#00a699]">Premium Leads</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Get access to high-intent buyer leads</p>
                <button className="w-full bg-[#00a699] text-white py-2 rounded font-bold text-sm">View Premium Leads</button>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} className="text-blue-600" />
                  <span className="font-bold text-blue-600">International Leads</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Explore export opportunities</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm">View International</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden bg-[#2e3192] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu size={22} />
          </button>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">Buy Leads</span>
            <span className="text-[10px] opacity-80">Seller Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <User size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-[#2e3192] p-4 flex items-center justify-between">
              <span className="text-lg font-bold text-white">Menu</span>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-white/10 rounded text-white">
                <X size={22} />
              </button>
            </div>
            <div className="p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabClick(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-semibold flex items-center justify-between transition-colors ${
                    activeTab === tab.id ? 'bg-[#00a699] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                  {tab.hasDropdown && <ChevronDown size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation Bar - NOT FIXED, scrolls normally below website navbar */}
      <div className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Row: Logo, Tabs, Search, User */}
          <div className="flex items-center px-4 h-16 gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-[#2e3192] rounded-lg flex items-center justify-center">
                <LayoutGrid size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#2e3192] leading-tight">Buy Leads</span>
                <span className="text-[10px] text-gray-500">Seller Dashboard</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide" ref={recentDropdownRef}>
              {tabs.map((tab) => (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1 ${
                      activeTab === tab.id
                        ? 'bg-[#2e3192] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#2e3192]'
                    }`}
                  >
                    {tab.label}
                    {tab.hasDropdown && <ChevronDown size={14} className={`transition-transform ${showRecentDropdown ? 'rotate-180' : ''}`} />}
                  </button>
                  
                  {tab.id === 'Recent' && showRecentDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
                      <button
                        onClick={() => handleRecentSort('desc')}
                        className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                          recentSortOrder === 'desc' ? 'text-[#2e3192] font-semibold bg-blue-50' : 'text-gray-700'
                        }`}
                      >
                        <span>↓</span> Newest First
                      </button>
                      <button
                        onClick={() => handleRecentSort('asc')}
                        className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                          recentSortOrder === 'asc' ? 'text-[#2e3192] font-semibold bg-blue-50' : 'text-gray-700'
                        }`}
                      >
                        <span>↑</span> Oldest First
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <input 
                type="text" 
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-[14px] w-64 focus:outline-none focus:ring-2 focus:ring-[#2e3192] focus:border-transparent" 
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* User & Help */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                <HelpCircle size={22} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                <Wallet size={22} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-[#2e3192] text-white rounded-lg text-[13px] font-semibold hover:bg-[#252770] transition-colors">
                <User size={18} />
                <span>Account</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Filters */}
          <div className="flex items-center px-4 py-3 border-t border-gray-100 gap-6" ref={filterDropdownRef}>
            {/* Location Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(showFilterDropdown === 'location' ? false : 'location')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                  filters.location.length > 0 
                    ? 'bg-blue-50 border-blue-200 text-[#2e3192]' 
                    : 'border-gray-300 text-gray-700 hover:border-[#2e3192]'
                }`}
              >
                <MapPinned size={16} />
                Location
                {filters.location.length > 0 && (
                  <span className="ml-1 w-5 h-5 bg-[#2e3192] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {filters.location.length}
                  </span>
                )}
                <ChevronDown size={14} className={`transition-transform ${showFilterDropdown === 'location' ? 'rotate-180' : ''}`} />
              </button>

              {showFilterDropdown === 'location' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4">
                  <div className="space-y-2 mb-4">
                    {locationOptions.recommended.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-[14px] cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <input type="radio" name="locationDropdown" className="w-4 h-4 border-gray-300 text-[#2e3192] focus:ring-[#2e3192]" defaultChecked={opt === 'Recommended'} />
                        <span className={opt === 'Recommended' ? 'text-[#2e3192] font-semibold' : 'text-gray-700'}>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Type Country/State/City" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2e3192] focus:border-transparent" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Suggested States</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {locationOptions.states.map((state) => (
                        <label key={state} className="flex items-center gap-2 text-[14px] cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                          <div 
                            className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${filters.location.includes(state) ? 'bg-[#2e3192] border-[#2e3192]' : 'border-gray-300'}`}
                            onClick={() => toggleLocation(state)}
                          >
                            {filters.location.includes(state) && <Check size={12} className="text-white" />}
                          </div>
                          <span className={filters.location.includes(state) ? 'text-[#2e3192] font-semibold' : 'text-gray-700'}>{state}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(showFilterDropdown === 'category' ? false : 'category')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                  filters.categories.length > 0 
                    ? 'bg-blue-50 border-blue-200 text-[#2e3192]' 
                    : 'border-gray-300 text-gray-700 hover:border-[#2e3192]'
                }`}
              >
                <Package size={16} />
                Categories
                {filters.categories.length > 0 && (
                  <span className="ml-1 w-5 h-5 bg-[#2e3192] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {filters.categories.length}
                  </span>
                )}
                <ChevronDown size={14} className={`transition-transform ${showFilterDropdown === 'category' ? 'rotate-180' : ''}`} />
              </button>

              {showFilterDropdown === 'category' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4">
                  <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search categories..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2e3192] focus:border-transparent" />
                  </div>
                  <div className="space-y-1 max-h-56 overflow-y-auto scrollbar-thin">
                    {categoryOptions.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 text-[14px] cursor-pointer hover:bg-blue-50 p-2.5 rounded-lg transition-colors">
                        <div 
                          className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? 'bg-[#2e3192] border-[#2e3192]' : 'border-gray-300'}`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {filters.categories.includes(cat) && <Check size={12} className="text-white" />}
                        </div>
                        <span className={filters.categories.includes(cat) ? 'text-[#2e3192] font-semibold' : 'text-gray-700'}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Value Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(showFilterDropdown === 'orderValue' ? false : 'orderValue')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                  filters.orderValue.length > 0 
                    ? 'bg-blue-50 border-blue-200 text-[#2e3192]' 
                    : 'border-gray-300 text-gray-700 hover:border-[#2e3192]'
                }`}
              >
                <IndianRupee size={16} />
                Order Value
                {filters.orderValue.length > 0 && (
                  <span className="ml-1 w-5 h-5 bg-[#2e3192] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {filters.orderValue.length}
                  </span>
                )}
                <ChevronDown size={14} className={`transition-transform ${showFilterDropdown === 'orderValue' ? 'rotate-180' : ''}`} />
              </button>

              {showFilterDropdown === 'orderValue' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3">
                  {orderValueOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-[14px] cursor-pointer hover:bg-blue-50 p-2.5 rounded-lg transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 border-gray-300 rounded text-[#2e3192] focus:ring-[#2e3192]"
                        checked={filters.orderValue.includes(opt.value)}
                        onChange={() => toggleOrderValue(opt.value)}
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Lead Type Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(showFilterDropdown === 'leadType' ? false : 'leadType')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                  filters.leadType.length > 0 
                    ? 'bg-blue-50 border-blue-200 text-[#2e3192]' 
                    : 'border-gray-300 text-gray-700 hover:border-[#2e3192]'
                }`}
              >
                <SlidersHorizontal size={16} />
                Lead Type
                {filters.leadType.length > 0 && (
                  <span className="ml-1 w-5 h-5 bg-[#2e3192] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {filters.leadType.length}
                  </span>
                )}
                <ChevronDown size={14} className={`transition-transform ${showFilterDropdown === 'leadType' ? 'rotate-180' : ''}`} />
              </button>

              {showFilterDropdown === 'leadType' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3">
                  {leadTypeOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-[14px] cursor-pointer hover:bg-blue-50 p-2.5 rounded-lg transition-colors">
                      <div 
                        className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${filters.leadType.includes(opt.value) ? 'bg-[#2e3192] border-[#2e3192]' : 'border-gray-300'}`}
                        onClick={() => toggleLeadType(opt.value)}
                      >
                        {filters.leadType.includes(opt.value) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[12px] font-semibold text-gray-500">Sort by:</span>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setSortBy('Relevant')}
                  className={`px-4 py-1.5 text-[13px] font-semibold transition-all ${sortBy === 'Relevant' ? 'bg-[#2e3192] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Relevant
                </button>
                <button
                  onClick={() => setSortBy('Recent')}
                  className={`px-4 py-1.5 text-[13px] font-semibold transition-all ${sortBy === 'Recent' ? 'bg-[#2e3192] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Recent
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button 
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-t border-blue-100 flex-wrap">
              <span className="text-[12px] font-semibold text-gray-600">Active:</span>
              {filters.location.map(loc => (
                <span key={loc} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-[#2e3192] text-[12px] rounded-md border border-blue-200 font-medium shadow-sm">
                  {loc}
                  <button onClick={() => removeFilter('location', loc)} className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {filters.categories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-[#2e3192] text-[12px] rounded-md border border-blue-200 font-medium shadow-sm">
                  {cat}
                  <button onClick={() => removeFilter('categories', cat)} className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {filters.orderValue.map(val => (
                <span key={val} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-[#2e3192] text-[12px] rounded-md border border-blue-200 font-medium shadow-sm">
                  ₹{val}
                  <button onClick={() => removeFilter('orderValue', val)} className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {filters.leadType.map(type => (
                <span key={type} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-[#2e3192] text-[12px] rounded-md border border-blue-200 font-medium shadow-sm">
                  {type}
                  <button onClick={() => removeFilter('leadType', type)} className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center px-2 py-2 gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                activeTab === tab.id ? 'bg-[#2e3192] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              {tab.hasDropdown && <span className="text-[10px]">{tab.icon}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[13px] font-semibold text-gray-700 whitespace-nowrap">
            <Filter size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[13px] font-semibold text-gray-700 whitespace-nowrap">
            <MapPin size={16} />
            Location
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[13px] font-semibold text-gray-700 whitespace-nowrap">
            <Package size={16} />
            Category
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[13px] font-semibold text-gray-700 whitespace-nowrap">
            <IndianRupee size={16} />
            Budget
          </button>
        </div>
      </div>

      {/* Active Tab Indicator */}
      <div className="bg-[#f1f3f6] px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-[14px] text-gray-600">
          <span className="font-semibold">Showing:</span>
          <span className="font-bold text-[#2e3192]">{activeTab}</span>
          {activeTab === 'Recent' && (
            <span className="text-gray-500">({recentSortOrder === 'desc' ? 'Newest First' : 'Oldest First'})</span>
          )}
          <span className="text-gray-400">|</span>
          <span className="font-medium">{leads.length} leads found</span>
        </div>
      </div>

      {/* Main Content - Lead Cards */}
      <div className="p-4 max-w-[1400px] mx-auto pb-24 lg:pb-6">
        {leads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-300 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-5 hover:shadow-lg transition-all duration-300">
              {/* Header Actions */}
              <div className="hidden sm:flex items-center justify-end gap-1 px-4 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-[#2e3192] hover:bg-blue-50 rounded-lg transition-all">
                  <Copy size={14} />
                  <span>View Similar</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                  <Star size={14} />
                  <span>Shortlist</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                  <EyeOff size={14} />
                  <span>Hide</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={14} />
                  <span>Not Relevant</span>
                </button>
              </div>

              {/* Mobile Header */}
              <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-gray-500">{lead.timeAgo}</span>
                  {lead.gstVerified && (
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md flex items-center gap-1">
                      <BadgeCheck size={12} /> GST
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-amber-50 rounded-lg transition-colors">
                    <Star size={18} className="text-gray-400 hover:text-amber-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex flex-col lg:flex-row gap-5">
                  {/* Left Column */}
                  <div className="flex-1 min-w-0">
                    <div className="hidden sm:flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-[13px] font-bold text-white bg-[#2e3192] px-3 py-1 rounded-md">{lead.year}</span>
                      {lead.gstVerified && (
                        <span className="text-[12px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200 flex items-center gap-1">
                          <BadgeCheck size={14} /> GST Verified
                        </span>
                      )}
                      {lead.isPremium && (
                        <span className="text-[12px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                          <Crown size={14} /> Premium
                        </span>
                      )}
                      {lead.mobileVerified && (
                        <span className="text-[12px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1">
                          <Phone size={14} /> Mobile Verified
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-3 leading-tight hover:text-[#2e3192] cursor-pointer transition-colors">{lead.title}</h2>
                    
                    <div className="hidden sm:flex items-center gap-4 mb-4 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-600">
                        <Clock size={16} className="text-pink-500" />
                        <span>{lead.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[14px] font-semibold">
                        <span className="text-xl">🇮🇳</span>
                        <span className="text-[#2e3192]">{lead.location}, {lead.state}</span>
                      </div>
                    </div>

                    <div className="sm:hidden flex items-center gap-2 mb-3 text-[14px]">
                      <span className="text-xl">🇮🇳</span>
                      <span className="font-semibold text-[#2e3192]">{lead.location}, {lead.state}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-600 mb-5 flex-wrap">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-500">{lead.category}</span>
                      <ChevronRight size={14} className="text-gray-400" />
                      <span className="text-[#2e3192]">{lead.subcategory}</span>
                    </div>

                    {/* Lead Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-5 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-[12px] text-gray-500 block mb-1 font-medium">Quantity Required</span>
                        <span className="text-[15px] font-bold text-gray-900">{lead.quantity}</span>
                      </div>
                      <div>
                        <span className="text-[12px] text-gray-500 block mb-1 font-medium">Probable Order Value</span>
                        <span className="text-[15px] font-bold text-gray-900">{lead.orderValue}</span>
                      </div>
                    </div>

                    <p className="text-[14px] text-gray-600 mb-5 line-clamp-2 leading-relaxed">{lead.description}</p>

                    {/* Buyer also viewed */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={16} className="text-[#2e3192]" />
                        <span className="text-[14px] font-bold text-gray-800">Buyer also viewed:</span>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                        {[
                          { id: '1', img: 'https://placehold.co/70x70/e5e7eb/666?text=Prod1', name: 'Similar Product 1' },
                          { id: '2', img: 'https://placehold.co/70x70/e5e7eb/666?text=Prod2', name: 'Similar Product 2' },
                          { id: '3', img: 'https://placehold.co/70x70/e5e7eb/666?text=Prod3', name: 'Similar Product 3' },
                        ].map((product) => (
                          <div key={product.id} className="flex flex-col items-center min-w-[80px] cursor-pointer hover:opacity-80 transition-opacity">
                            <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded-lg border shadow-sm mb-1.5" />
                            <span className="text-[11px] text-gray-600 text-center truncate w-full font-medium">{product.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-80 flex-shrink-0 lg:border-l lg:border-gray-200 lg:pl-6 pt-5 lg:pt-0 border-t lg:border-t-0">
                    <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-5 mb-4 border border-gray-100">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2e3192] rounded-lg flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        Buyer Details
                      </h3>
                      
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-gray-500 font-medium">Products of Interest:</span>
                          <span className="font-semibold text-gray-900 text-right max-w-[140px]">{lead.buys.slice(0, 2).join(', ')}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-gray-500 font-medium">Member since:</span>
                          <span className="font-semibold text-gray-900">{lead.memberSince}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-gray-500 font-medium">Requirements:</span>
                          <span className="font-semibold text-[#2e3192]">{lead.requirements}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-gray-500 font-medium">Calls:</span>
                          <span className="font-semibold text-gray-900">{lead.calls}</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-[11px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Contact Info Available</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192] transition-all group shadow-sm hover:shadow-md">
                            <Smartphone size={20} className="text-gray-400 group-hover:text-[#2e3192] mb-1.5 transition-colors" />
                            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#2e3192]">Mobile</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192] transition-all group shadow-sm hover:shadow-md">
                            <Mail size={20} className="text-gray-400 group-hover:text-[#2e3192] mb-1.5 transition-colors" />
                            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#2e3192]">Email</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192] transition-all group shadow-sm hover:shadow-md">
                            <Briefcase size={20} className="text-gray-400 group-hover:text-[#2e3192] mb-1.5 transition-colors" />
                            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#2e3192]">Business</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192] transition-all group shadow-sm hover:shadow-md">
                            <MapPin size={20} className="text-gray-400 group-hover:text-[#2e3192] mb-1.5 transition-colors" />
                            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#2e3192]">Address</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button className="hidden sm:block w-full bg-[#00a699] hover:bg-[#008f84] text-white text-[15px] font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Contact Buyer Now
                    </button>
                  </div>
                </div>

                {/* Mobile Bottom */}
                <div className="sm:hidden mt-5 pt-4 border-t">
                  <button className="w-full bg-[#00a699] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-md">
                    Contact Buyer Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Buttons - Desktop */}
      <div className="hidden lg:flex fixed right-5 bottom-5 flex-col gap-3">
        <button className="flex flex-col items-center p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl w-16 transition-all hover:scale-105 hover:border-[#2e3192]">
          <History size={22} className="text-[#2e3192]" />
          <span className="text-[10px] font-bold text-[#2e3192] text-center leading-tight mt-1">Past<br/>Leads</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl w-16 transition-all hover:scale-105 hover:border-[#2e3192]">
          <Wallet size={22} className="text-[#2e3192]" />
          <span className="text-[10px] font-bold text-[#2e3192] text-center mt-1">Balance</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl w-16 transition-all hover:scale-105 hover:border-[#2e3192]">
          <HelpCircle size={22} className="text-[#2e3192]" />
          <span className="text-[10px] font-bold text-[#2e3192] text-center mt-1">Help</span>
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-[#2e3192]">
            <History size={24} />
            <span className="text-[10px] font-bold mt-1">Past</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2e3192] transition-colors">
            <Wallet size={24} />
            <span className="text-[10px] font-bold mt-1">Balance</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2e3192] transition-colors">
            <MessageCircle size={24} />
            <span className="text-[10px] font-bold mt-1">Chat</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-[#2e3192] transition-colors">
            <HelpCircle size={24} />
            <span className="text-[10px] font-bold mt-1">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyLeadsPage;