'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Building2, 
  Copy,
  Star, 
  EyeOff, 
  Trash2, 
  Smartphone, 
  MessageCircle, 
  MapPin,
  Filter,
  ChevronDown,
  X,
  Search,
  TrendingUp,
  Wallet,
  HelpCircle,
  Info,
  Check,
  ChevronRight,
  ExternalLink,
  Download,
  Heart,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Calendar,
  Package,
  IndianRupee,
  Tag,
  Menu,
  ArrowLeft,
  Bell,
  User,
  ChevronUp,
  MoreHorizontal,
  FileText,
  History,
  Bookmark,
  ShoppingCart,
  Zap
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
  imageUrl: string;
  year: string;
  quantity?: string;
  buyerName?: string;
  companyName?: string;
  mobileVerified?: boolean;
  gstVerified?: boolean;
  description?: string;
  relevanceScore?: number;
  date?: Date;
}

interface ViewedProduct {
  id: string;
  imageUrl: string;
  title: string;
  publisher: string;
  language: string;
  category: string;
  price: string;
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
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showOrderValueDropdown, setShowOrderValueDropdown] = useState(false);
  const [showLeadTypeDropdown, setShowLeadTypeDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMoreLeadsModal, setShowMoreLeadsModal] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    location: ['Gujarat'],
    categories: [],
    orderValue: [],
    leadType: []
  });

  const recentDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const orderValueDropdownRef = useRef<HTMLDivElement>(null);
  const leadTypeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (recentDropdownRef.current && !recentDropdownRef.current.contains(event.target as Node)) {
        setShowRecentDropdown(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (orderValueDropdownRef.current && !orderValueDropdownRef.current.contains(event.target as Node)) {
        setShowOrderValueDropdown(false);
      }
      if (leadTypeDropdownRef.current && !leadTypeDropdownRef.current.contains(event.target as Node)) {
        setShowLeadTypeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Network speed detection
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

  // Base leads data
  const baseLeads: Lead[] = [
    {
      id: '1',
      title: 'Gpsc Paper Set (14000+ Questions)',
      timeAgo: '9 hrs ago',
      location: 'Ahmedabad',
      state: 'Gujarat',
      category: 'Study Guides',
      subcategory: 'Model Question Papers',
      memberSince: '4+ years',
      buys: ['Leather Keychain', 'Photocopying Services', 'Warehouse Iron Rack'],
      requirements: 4,
      calls: 2,
      replies: 5,
      year: '2024',
      quantity: '14000+ Questions',
      buyerName: 'GPSC Aspirant',
      companyName: 'Individual Buyer',
      mobileVerified: true,
      gstVerified: false,
      description: 'Looking for complete GPSC study material with previous year question papers.',
      relevanceScore: 95,
      date: new Date(Date.now() - 9 * 60 * 60 * 1000),
      imageUrl: ''
    },
    {
      id: '2',
      title: 'Industrial CNC Machine Required',
      timeAgo: '2 hrs ago',
      location: 'Mumbai',
      state: 'Maharashtra',
      category: 'Industrial Machinery',
      subcategory: 'CNC Machines',
      memberSince: '2+ years',
      buys: ['Cutting Tools', 'Machine Parts', 'Lubricants'],
      requirements: 8,
      calls: 5,
      replies: 12,
      year: '2024',
      quantity: '2 Units',
      buyerName: 'Rajesh Kumar',
      companyName: 'Kumar Manufacturing',
      mobileVerified: true,
      gstVerified: true,
      description: 'Urgent requirement for high precision CNC machines.',
      relevanceScore: 88,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      imageUrl: ''
    },
    {
      id: '3',
      title: 'Organic Fertilizer Bulk Order',
      timeAgo: '5 hrs ago',
      location: 'Pune',
      state: 'Maharashtra',
      category: 'Agriculture',
      subcategory: 'Fertilizers',
      memberSince: '1+ years',
      buys: ['Seeds', 'Pesticides', 'Farming Tools'],
      requirements: 15,
      calls: 8,
      replies: 20,
      year: '2024',
      quantity: '500 Kg',
      buyerName: 'Suresh Patil',
      companyName: 'Patil Agro Farms',
      mobileVerified: true,
      gstVerified: true,
      description: 'Need organic fertilizer in bulk for 50 acre farm.',
      relevanceScore: 82,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      imageUrl: ''
    },
    {
      id: '4',
      title: 'School Furniture Bulk Purchase',
      timeAgo: '1 day ago',
      location: 'Delhi',
      state: 'Delhi',
      category: 'Furniture',
      subcategory: 'School Furniture',
      memberSince: '3+ years',
      buys: ['Chairs', 'Tables', 'Blackboards'],
      requirements: 25,
      calls: 10,
      replies: 18,
      year: '2024',
      quantity: '200 Units',
      buyerName: 'Delhi Public School',
      companyName: 'DPS Society',
      mobileVerified: true,
      gstVerified: true,
      description: 'Looking for durable school furniture for new campus.',
      relevanceScore: 75,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      imageUrl: ''
    },
    {
      id: '5',
      title: 'Medical Equipment Supply',
      timeAgo: '30 mins ago',
      location: 'Bangalore',
      state: 'Karnataka',
      category: 'Medical Equipment',
      subcategory: 'Diagnostic Tools',
      memberSince: '5+ years',
      buys: ['Stethoscopes', 'BP Monitors', 'Thermometers'],
      requirements: 12,
      calls: 3,
      replies: 8,
      year: '2024',
      quantity: '50 Units',
      buyerName: 'City Hospital',
      companyName: 'Bangalore Medical Trust',
      mobileVerified: true,
      gstVerified: true,
      description: 'Urgent requirement for diagnostic equipment.',
      relevanceScore: 91,
      date: new Date(Date.now() - 30 * 60 * 1000),
      imageUrl: ''
    }
  ];

  // Filter and sort leads based on active tab
  const getFilteredLeads = (): Lead[] => {
    let filtered = [...baseLeads];

    switch (activeTab) {
      case 'Relevant':
        // Sort by relevance score (highest first)
        filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        break;
      
      case 'Recent':
        // Sort by date (newest or oldest based on dropdown)
        filtered.sort((a, b) => {
          const dateA = a.date?.getTime() || 0;
          const dateB = b.date?.getTime() || 0;
          return recentSortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
        break;
      
      case 'Catalog Views':
        // Filter leads with catalog views (simulated)
        filtered = filtered.filter(lead => lead.requirements > 5);
        break;
      
      case 'Shortlisted':
        // Would show shortlisted leads (simulated)
        filtered = filtered.slice(0, 2);
        break;
      
      case 'Latest Tenders':
        // Show only high-value leads
        filtered = filtered.filter(lead => (lead.requirements || 0) > 10);
        break;
      
      case 'Past Transactions':
        // Show older leads
        filtered = filtered.filter(lead => {
          const hoursAgo = lead.timeAgo.includes('day') ? 24 : parseInt(lead.timeAgo);
          return hoursAgo > 12;
        });
        break;
      
      case 'More Leads':
        // Show all leads with "More" badge
        filtered = filtered.map(lead => ({...lead, isMore: true}));
        break;
      
      case 'Export':
        // Export view - all leads
        break;
      
      default:
        break;
    }

    return filtered;
  };

  const leads = getFilteredLeads();

  const viewedProducts: ViewedProduct[] = [
    {
      id: '1',
      imageUrl: 'https://placehold.co/100x120/2563eb/ffffff?text=Rapid',
      title: 'Rapid Access Guide',
      publisher: 'Arihant Publishers',
      language: 'English',
      category: 'PERIODON...',
      price: '₹ 5,999 / Piece'
    },
    {
      id: '2',
      imageUrl: 'https://placehold.co/100x120/ea580c/ffffff?text=Pedia',
      title: 'PEDIATRICIAN PROMETRIC MCQ',
      publisher: 'Medical Books Co',
      language: 'English',
      category: 'Medical',
      price: '₹ 11,990 / Piece'
    },
    {
      id: '3',
      imageUrl: 'https://placehold.co/100x120/0891b2/ffffff?text=Perio',
      title: 'PERIODONTICS PROMETRIC',
      publisher: 'Dental Prep',
      language: 'English',
      category: 'Dentistry',
      price: '₹ 5,650 / Piece'
    },
    {
      id: '4',
      imageUrl: 'https://placehold.co/100x120/7c3aed/ffffff?text=GPSC',
      title: 'GPSC Complete Study',
      publisher: 'Liberty Publications',
      language: 'Gujarati',
      category: 'Civil Services',
      price: '₹ 3,499 / Piece'
    }
  ];

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
    recommended: ['Recommended', 'India', 'Sihiora', 'All Locations'],
    states: ['Madhya Pradesh', 'Nearby States', 'Foreign'],
    suggested: ['Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu']
  };

  const categoryOptions = [
    'Model Question Papers',
    'Study Guides',
    'Reference Books',
    'Competitive Exam Books',
    'Medical Books',
    'Engineering Books'
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
      // Toggle dropdown for Recent tab
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

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans text-[13px]">
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
                  <Zap size={20} className="text-[#00a699]" />
                  <span className="font-bold text-[#00a699]">Premium Leads</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Get access to high-intent buyer leads</p>
                <button className="w-full bg-[#00a699] text-white py-2 rounded font-bold text-sm">View Premium Leads</button>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={20} className="text-blue-600" />
                  <span className="font-bold text-blue-600">International Leads</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Explore export opportunities</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm">View International</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} className="text-gray-700" />
          </button>
          <span className="text-lg font-bold text-[#00a699]">IndiaMART</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="text-lg font-bold text-[#00a699]">Menu</span>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabClick(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-bold flex items-center justify-between ${
                    activeTab === tab.id ? 'bg-[#00a699] text-white' : 'text-gray-700 hover:bg-gray-50'
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

      {/* Desktop Top Navigation Tabs */}
      <div className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center px-4 overflow-x-auto scrollbar-hide relative">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative" ref={tab.id === 'Recent' ? recentDropdownRef : null}>
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-3 text-[13px] font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === tab.id && tab.id !== 'Recent'
                    ? 'border-[#00a699] text-[#00a699]'
                    : activeTab === 'Recent' && tab.id === 'Recent'
                    ? 'border-[#00a699] text-[#00a699]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {tab.hasDropdown && (
                  <span className="text-[10px] ml-0.5">{tab.icon}</span>
                )}
              </button>
              
              {/* Recent Dropdown */}
              {tab.id === 'Recent' && showRecentDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
                  <button
                    onClick={() => handleRecentSort('desc')}
                    className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 flex items-center gap-2 ${
                      recentSortOrder === 'desc' ? 'text-[#00a699] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span>↓</span> Newest First
                  </button>
                  <button
                    onClick={() => handleRecentSort('asc')}
                    className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 flex items-center gap-2 ${
                      recentSortOrder === 'asc' ? 'text-[#00a699] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span>↑</span> Oldest First
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center px-2 py-2 gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === tab.id
                  ? 'bg-[#00a699] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab.label}
              {tab.hasDropdown && <span className="text-[10px]">{tab.icon}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Recent Sort Dropdown */}
      {showRecentDropdown && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex gap-2">
            <button
              onClick={() => handleRecentSort('desc')}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold border ${
                recentSortOrder === 'desc' ? 'bg-[#00a699] text-white border-[#00a699]' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              ↓ Newest First
            </button>
            <button
              onClick={() => handleRecentSort('asc')}
              className={`flex-1 py-2 rounded-lg text-[12px] font-bold border ${
                recentSortOrder === 'asc' ? 'bg-[#00a699] text-white border-[#00a699]' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              ↑ Oldest First
            </button>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        {/* Desktop Filters */}
        <div className="hidden lg:flex gap-4 mb-4 items-start">
          {/* Location Filter */}
          <div className="relative w-56" ref={locationDropdownRef}>
            <div 
              className="flex items-center gap-1 text-[12px] font-bold text-gray-700 mb-2 cursor-pointer select-none"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              Location
              <Info size={12} className="text-gray-400 ml-0.5" />
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="locationType" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" defaultChecked />
                <span>Recommended</span>
                <ExternalLink size={10} className="text-gray-400" />
              </label>
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="locationType" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" />
                <span>Madhya Pradesh</span>
              </label>
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="locationType" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" />
                <span>India</span>
              </label>
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="locationType" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" />
                <span>Nearby States</span>
                <ChevronDown size={12} className="text-[#00a699] ml-1" />
              </label>
            </div>
            
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                <div className="space-y-2 mb-4">
                  {locationOptions.recommended.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <input type="radio" name="locationDropdown" className="w-4 h-4 border-gray-300 text-[#00a699]" defaultChecked={opt === 'Recommended'} />
                      <span className={opt === 'Recommended' ? 'text-[#00a699]' : ''}>{opt}</span>
                      {opt === 'Recommended' && <ExternalLink size={10} className="text-gray-400" />}
                    </label>
                  ))}
                </div>
                <div className="relative mb-4">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Type Country/State/City" className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a699]" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-700 mb-3 uppercase">Suggested States</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {locationOptions.suggested.map((state) => (
                      <label key={state} className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                        <div 
                          className={`w-4 h-4 border rounded flex items-center justify-center ${filters.location.includes(state) ? 'bg-[#00a699] border-[#00a699]' : 'border-gray-300'}`}
                          onClick={() => toggleLocation(state)}
                        >
                          {filters.location.includes(state) && <Check size={10} className="text-white" />}
                        </div>
                        <span className={filters.location.includes(state) ? 'text-[#00a699] font-medium' : 'text-gray-700'}>{state}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Categories Filter */}
          <div className="relative w-56" ref={categoryDropdownRef}>
            <div 
              className="flex items-center gap-1 text-[12px] font-bold text-gray-700 mb-2 cursor-pointer"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              Categories/Products
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-[#00a699]" />
                <span className="truncate">Model Question Papers</span>
              </label>
            </div>
            <div className="flex justify-end mt-1">
              <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} className="text-[#00a699] hover:bg-teal-50 p-1 rounded">
                <ChevronDown size={16} />
              </button>
            </div>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                <div className="relative mb-3">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search categories..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00a699]" />
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categoryOptions.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <div 
                        className={`w-4 h-4 border rounded flex items-center justify-center ${filters.categories.includes(cat) ? 'bg-[#00a699] border-[#00a699]' : 'border-gray-300'}`}
                        onClick={() => toggleCategory(cat)}
                      >
                        {filters.categories.includes(cat) && <Check size={10} className="text-white" />}
                      </div>
                      <span className={filters.categories.includes(cat) ? 'text-[#00a699] font-medium' : 'text-gray-700'}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Value Filter */}
          <div className="relative w-44" ref={orderValueDropdownRef}>
            <div 
              className="flex items-center gap-1 text-[12px] font-bold text-gray-700 mb-2 cursor-pointer"
              onClick={() => setShowOrderValueDropdown(!showOrderValueDropdown)}
            >
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${showOrderValueDropdown ? 'rotate-180' : ''}`} />
              Order Value (₹)
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="orderValue" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" />
                <span>Above 10,000</span>
              </label>
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="radio" name="orderValue" className="w-3.5 h-3.5 border-gray-300 text-[#00a699]" />
                <span>Above 50,000</span>
              </label>
            </div>
            <div className="flex justify-end mt-1">
              <button onClick={() => setShowOrderValueDropdown(!showOrderValueDropdown)} className="text-[#00a699] hover:bg-teal-50 p-1 rounded">
                <ChevronDown size={16} />
              </button>
            </div>
            {showOrderValueDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-3">
                {orderValueOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                    <input type="radio" name="orderValueDropdown" className="w-4 h-4 border-gray-300 text-[#00a699]" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Lead Type Filter */}
          <div className="relative w-40" ref={leadTypeDropdownRef}>
            <div 
              className="flex items-center gap-1 text-[12px] font-bold text-gray-700 mb-2 cursor-pointer"
              onClick={() => setShowLeadTypeDropdown(!showLeadTypeDropdown)}
            >
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${showLeadTypeDropdown ? 'rotate-180' : ''}`} />
              Lead Type
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-[#00a699]" />
                <span>Bulk (₹20k+)</span>
              </label>
              <label className="flex items-center gap-2 text-[12px] cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 rounded text-[#00a699]" />
                <span>GST</span>
              </label>
            </div>
            {showLeadTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-3">
                {leadTypeOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                    <div 
                      className={`w-4 h-4 border rounded flex items-center justify-center ${filters.leadType.includes(opt.value) ? 'bg-[#00a699] border-[#00a699]' : 'border-gray-300'}`}
                      onClick={() => toggleLeadType(opt.value)}
                    >
                      {filters.leadType.includes(opt.value) && <Check size={10} className="text-white" />}
                    </div>
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex-1 flex flex-col items-end justify-start gap-3">
            <button className="flex items-center gap-2 px-4 py-1.5 border border-[#00a699] rounded text-[12px] font-bold text-[#00a699] hover:bg-teal-50 bg-white">
              <Filter size={14} />
              More Filters
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-600">Sort by:</span>
              <div className="flex rounded-full border border-gray-300 overflow-hidden bg-white">
                <button
                  onClick={() => setSortBy('Relevant')}
                  className={`px-4 py-1.5 text-[11px] font-bold transition-colors ${sortBy === 'Relevant' ? 'bg-[#2d2d8a] text-white' : 'bg-white text-gray-700'}`}
                >
                  Relevant
                </button>
                <button
                  onClick={() => setSortBy('Recent')}
                  className={`px-4 py-1.5 text-[11px] font-bold transition-colors ${sortBy === 'Recent' ? 'bg-[#2d2d8a] text-white' : 'bg-white text-gray-700'}`}
                >
                  Recent
                </button>
              </div>
            </div>
            <div className="relative">
              <input type="text" placeholder="Search by Keyword" className="pl-3 pr-9 py-1.5 border border-gray-300 rounded text-[12px] w-44 focus:outline-none focus:ring-2 focus:ring-[#00a699]" />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#00a699]" />
              <span className="font-bold text-gray-700">Filters</span>
              {(filters.location.length + filters.categories.length) > 0 && (
                <span className="bg-[#00a699] text-white text-[10px] px-2 py-0.5 rounded-full">
                  {filters.location.length + filters.categories.length}
                </span>
              )}
            </div>
            <ChevronDown size={18} className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
            <div>
              <h4 className="text-[13px] font-bold text-gray-700 mb-2">Location</h4>
              <div className="flex flex-wrap gap-2">
                {locationOptions.suggested.map((state) => (
                  <button
                    key={state}
                    onClick={() => toggleLocation(state)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border ${filters.location.includes(state) ? 'bg-[#00a699] text-white border-[#00a699]' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-[#00a699] text-white py-2 rounded-lg font-bold"
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* Active Filters */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200 flex-wrap">
          <button onClick={clearAllFilters} className="text-[12px] font-bold text-[#00a699] hover:text-[#008f84]">
            Clear Filters
          </button>
          {filters.location.map(loc => (
            <span key={loc} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[12px] rounded border">
              {loc}
              <button onClick={() => removeFilter('location', loc)}><X size={12} /></button>
            </span>
          ))}
          <button className="px-3 py-1 border border-[#00a699] text-[#00a699] text-[12px] font-bold rounded hover:bg-teal-50">
            Save Filter
          </button>
        </div>
      </div>

      {/* Active Tab Indicator */}
      <div className="bg-[#f1f3f6] px-4 py-2">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-[12px] text-gray-600">
          <span className="font-semibold">Showing:</span>
          <span className="font-bold text-[#00a699]">{activeTab}</span>
          {activeTab === 'Recent' && (
            <span className="text-gray-500">({recentSortOrder === 'desc' ? 'Newest First' : 'Oldest First'})</span>
          )}
          <span className="text-gray-400">|</span>
          <span>{leads.length} leads found</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-[1400px] mx-auto pb-24 lg:pb-4">
        {leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 hover:shadow-md transition-shadow">
              {/* Header Actions */}
              <div className="hidden sm:flex items-center justify-end gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-700">
                  <Copy size={14} />
                  <span>View Similar</span>
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-700">
                  <Star size={14} />
                  <span>Shortlist</span>
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-700">
                  <EyeOff size={14} />
                  <span>Hide</span>
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-red-600">
                  <Trash2 size={14} />
                  <span>Not Relevant</span>
                </button>
              </div>

              {/* Mobile Header */}
              <div className="sm:hidden flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500">{lead.timeAgo}</span>
                  {lead.gstVerified && <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">GST</span>}
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-gray-200 rounded"><Star size={16} className="text-gray-400" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded"><MoreHorizontal size={16} className="text-gray-400" /></button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Left Column */}
                  <div className="flex-1 min-w-0">
                    <div className="hidden sm:flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[12px] font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{lead.year}</span>
                      {lead.gstVerified && (
                        <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border flex items-center gap-1">
                          <Check size={10} /> GST Verified
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-2 leading-tight">{lead.title}</h2>
                    
                    <div className="hidden sm:flex items-center gap-4 mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-600">
                        <Clock size={14} className="text-pink-500" />
                        <span>{lead.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-bold">
                        <span className="text-lg">🇮🇳</span>
                        <span className="text-[#00a699]">{lead.location}, {lead.state}</span>
                      </div>
                    </div>

                    <div className="sm:hidden flex items-center gap-2 mb-2 text-[12px]">
                      <span className="text-lg">🇮🇳</span>
                      <span className="font-semibold text-[#00a699]">{lead.location}, {lead.state}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600 mb-4 flex-wrap">
                      <Building2 size={14} className="text-gray-400" />
                      <span className="text-gray-500">{lead.category}</span>
                      <ChevronRight size={12} className="text-gray-400" />
                      <span className="text-[#00a699]">{lead.subcategory}</span>
                    </div>

                    {/* Buyer also viewed */}
                    <div className="bg-[#f8f9fa] rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[12px] font-bold text-gray-800">Buyer also viewed:</span>
                        <Info size={12} className="text-gray-400" />
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                        {viewedProducts.map((product) => (
                          <div key={product.id} className="flex gap-2 min-w-[260px] bg-white p-2 rounded border hover:shadow-md transition-shadow cursor-pointer flex-shrink-0">
                            <img src={product.imageUrl} alt={product.title} className="w-16 h-20 object-cover rounded border flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-gray-800 leading-tight mb-1 line-clamp-2">{product.title}</p>
                              {product.publisher && <p className="text-[10px] text-gray-500">{product.publisher}</p>}
                              <p className="text-[11px] font-bold text-gray-900 mt-1">{product.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-80 flex-shrink-0 lg:border-l lg:border-gray-100 lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-[12px] font-bold text-gray-800 w-28">Buyer Details</span>
                        <span className="text-[12px] text-gray-500">- Member since {lead.memberSince} -</span>
                      </div>

                      <div className="flex items-start">
                        <span className="text-[12px] font-bold text-gray-800 w-28">Buys</span>
                        <span className="text-[12px] text-gray-700 flex-1 line-clamp-2">: {lead.buys.join(', ')}</span>
                      </div>

                      <div className="flex items-start">
                        <span className="text-[12px] font-bold text-gray-800 w-28">Engagement</span>
                        <div className="flex items-center gap-2 text-[12px] flex-wrap">
                          <span className="text-gray-600">Req: <span className="font-bold text-gray-900">{lead.requirements}</span></span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600">Calls: <span className="font-bold text-gray-900">{lead.calls}</span></span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600">Replies: <span className="font-bold text-gray-900">{lead.replies}</span></span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center">
                        <span className="text-[12px] font-bold text-gray-800 w-28">Available</span>
                        <span className="text-gray-500 mr-2">:</span>
                        <div className="flex gap-2">
                          <button className="p-2 rounded bg-teal-50 text-[#00a699] hover:bg-[#00a699] hover:text-white border border-teal-200 transition-all">
                            <Smartphone size={16} />
                          </button>
                          <button className="p-2 rounded bg-teal-50 text-[#00a699] hover:bg-[#00a699] hover:text-white border border-teal-200 transition-all">
                            <MessageCircle size={16} />
                          </button>
                          <button className="p-2 rounded bg-teal-50 text-[#00a699] hover:bg-[#00a699] hover:text-white border border-teal-200 transition-all">
                            <MapPin size={16} />
                          </button>
                        </div>
                      </div>

                      <button className="hidden sm:block w-full bg-[#00a699] hover:bg-[#008f84] text-white text-[14px] font-bold py-3 rounded transition-colors shadow-sm">
                        Contact Buyer Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom */}
                <div className="sm:hidden mt-4 pt-3 border-t">
                  <button className="w-full bg-[#00a699] text-white py-3 rounded font-bold text-[14px]">
                    Contact Buyer Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Buttons - Desktop */}
      <div className="hidden lg:flex fixed right-4 bottom-4 flex-col gap-2">
        <button className="flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border hover:shadow-xl w-14">
          <TrendingUp size={18} className="text-[#00a699]" />
          <span className="text-[9px] font-bold text-[#00a699] text-center leading-tight">Past<br/>Leads</span>
        </button>
        <button className="flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border hover:shadow-xl w-14">
          <Wallet size={18} className="text-[#00a699]" />
          <span className="text-[9px] font-bold text-[#00a699]">Balance</span>
        </button>
        <button className="flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border hover:shadow-xl w-14">
          <HelpCircle size={18} className="text-[#00a699]" />
          <span className="text-[9px] font-bold text-[#00a699]">Help</span>
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-[#00a699]">
            <TrendingUp size={20} />
            <span className="text-[9px] font-bold">Past</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Wallet size={20} />
            <span className="text-[9px] font-bold">Balance</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <MessageCircle size={20} />
            <span className="text-[9px] font-bold">Chat</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <HelpCircle size={20} />
            <span className="text-[9px] font-bold">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyLeadsPage;