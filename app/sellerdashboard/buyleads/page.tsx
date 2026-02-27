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
  Check
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
  imageUrl: string;
}

interface FilterState {
  location: string[];
  categories: string[];
  orderValue: string[];
  leadType: string[];
}

const BuyLeadsPage: React.FC = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [activeTab, setActiveTab] = useState('Relevant');
  const [sortBy, setSortBy] = useState<'Relevant' | 'Recent'>('Relevant');
  
  const [filters, setFilters] = useState<FilterState>({
    location: ['Gujarat'],
    categories: [],
    orderValue: [],
    leadType: []
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
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
      const startTime = performance.now();
      try {
        await fetch('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        const duration = performance.now() - startTime;
        setIsSlowNetwork(duration > 1000);
      } catch {
        setIsSlowNetwork(true);
      }
    };
    checkNetworkSpeed();
    const interval = setInterval(checkNetworkSpeed, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = ['Relevant', 'Recent↓', 'Catalog Views', 'Export', 'More Leads', 'Shortlisted', 'Latest Tenders', 'Past Transactions'];

  const leads: Lead[] = [
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
      imageUrl: 'https://placehold.co/120x120/1e40af/ffffff?text=GPSC'
    }
  ];

  const locationOptions = {
    recommended: ['Recommended', 'India'],
    states: ['Madhya Pradesh', 'Nearby States']
  };

  const toggleLocation = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(loc) 
        ? prev.location.filter(l => l !== loc)
        : [...prev.location, loc]
    }));
  };

  const removeFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(v => v !== value)
    }));
  };

  const FilterDropdown: React.FC<{
    title: string;
    dropdownKey: string;
    children: React.ReactNode;
    hasSelected?: boolean;
  }> = ({ title, dropdownKey, children, hasSelected }) => {
    const isOpen = openDropdown === dropdownKey;
    
    return (
      <div className="relative" ref={isOpen ? dropdownRef : null}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
          className={`flex items-center gap-1 text-[13px] font-normal text-gray-700 hover:text-gray-900 ${hasSelected ? 'text-teal-600' : ''}`}
        >
          <span className="text-gray-400 text-[10px]">▼</span>
          {title}
          {title.includes('Location') && <Info size={12} className="text-gray-400 ml-0.5" />}
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Slow Network Banner */}
      {isSlowNetwork && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-b-lg shadow-sm flex items-center gap-2 text-[13px] font-normal pointer-events-auto">
            <span>Slow network connection detected.</span>
            <button onClick={() => setIsSlowNetwork(false)} className="hover:bg-amber-200 rounded p-0.5">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.replace('↓', ''))}
              className={`px-8 py-3 text-[14px] font-normal border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.replace('↓', '')
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-4 gap-8 mb-4">
          {/* Location Filter */}
          <FilterDropdown 
            title="Location" 
            dropdownKey="location"
            hasSelected={filters.location.length > 0}
          >
            <div className="p-4">
              <div className="space-y-2 mb-4">
                {locationOptions.recommended.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[13px] font-normal cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="radio" 
                      name="locationType" 
                      className="text-teal-600 w-4 h-4 accent-teal-500" 
                      defaultChecked={opt === 'Recommended'}
                    />
                    <span className={opt === 'Recommended' ? 'text-teal-500' : ''}>{opt}</span>
                    {opt === 'Recommended' && <span className="text-gray-400 text-[10px]">↗</span>}
                  </label>
                ))}
              </div>

              <div className="relative mb-4">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type Country/State/City"
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <h4 className="text-[13px] font-normal text-gray-700 mb-3">Suggested States</h4>
                <div className="grid grid-cols-2 gap-2">
                  {locationOptions.states.map((state) => (
                    <label 
                      key={state} 
                      className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <div 
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          filters.location.includes(state) 
                            ? 'bg-teal-500 border-teal-500' 
                            : 'border-gray-300'
                        }`}
                        onClick={() => toggleLocation(state)}
                      >
                        {filters.location.includes(state) && <Check size={10} className="text-white" />}
                      </div>
                      <span className={filters.location.includes(state) ? 'text-teal-600' : 'text-gray-700'}>
                        {state}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FilterDropdown>

          {/* Categories Filter */}
          <FilterDropdown 
            title="Categories/Products" 
            dropdownKey="categories"
          >
            <div className="p-4 space-y-2">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" className="rounded text-teal-600 w-4 h-4 accent-teal-500" />
                <span>Model Question Pap...</span>
              </label>
            </div>
          </FilterDropdown>

          {/* Order Value Filter */}
          <FilterDropdown 
            title="Order Value (₹)" 
            dropdownKey="orderValue"
          >
            <div className="p-4 space-y-2">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="radio" name="orderValue" className="text-teal-600 w-4 h-4 accent-teal-500" />
                <span>Above 10,000</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="radio" name="orderValue" className="text-teal-600 w-4 h-4 accent-teal-500" />
                <span>Above 50,000</span>
              </label>
            </div>
          </FilterDropdown>

          {/* Lead Type Filter */}
          <FilterDropdown 
            title="Lead Type" 
            dropdownKey="leadType"
          >
            <div className="p-4 space-y-2">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" className="rounded text-teal-600 w-4 h-4 accent-teal-500" />
                <span>Bulk (₹20k+)</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" className="rounded text-teal-600 w-4 h-4 accent-teal-500" />
                <span>GST</span>
              </label>
            </div>
          </FilterDropdown>
        </div>

        {/* More Filters & Sort */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-normal text-gray-700">Previously Used filters :</span>
            <button className="flex items-center gap-1 text-[13px] font-normal text-gray-700 hover:text-gray-900">
              Select <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-teal-500 rounded text-[13px] font-normal text-teal-600 hover:bg-teal-50 bg-white">
              <Filter size={14} className="text-teal-500" />
              More Filters
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-normal text-gray-600">● Sort by:</span>
              <div className="flex rounded-full border border-gray-300 overflow-hidden bg-white">
                <button
                  onClick={() => setSortBy('Relevant')}
                  className={`px-4 py-1.5 text-[11px] font-normal ${
                    sortBy === 'Relevant' 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Relevant
                </button>
                <button
                  onClick={() => setSortBy('Recent')}
                  className={`px-4 py-1.5 text-[11px] font-normal ${
                    sortBy === 'Recent' 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Keyword"
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded text-[13px] w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={() => setFilters({ location: [], categories: [], orderValue: [], leadType: [] })}
            className="text-[13px] font-normal text-teal-600 hover:text-teal-700"
          >
            Clear Filters
          </button>
          
          {filters.location.map(loc => (
            <span key={loc} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-[13px] rounded">
              {loc}
              <button onClick={() => removeFilter('location', loc)} className="hover:text-gray-900 ml-1">
                <X size={12} />
              </button>
            </span>
          ))}
          
          <button className="px-3 py-1 border border-teal-500 text-teal-600 text-[13px] rounded hover:bg-teal-50">
            Save Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Lead Header Actions */}
            <div className="flex items-center justify-end gap-6 px-6 py-3 border-b border-gray-100">
              <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700">
                <Copy size={14} />
                View Similar
              </button>
              <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700">
                <Star size={14} />
                Shortlist
              </button>
              <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700">
                <EyeOff size={14} />
                Hide
              </button>
              <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-red-600">
                <Trash2 size={14} />
                Not Relevant
              </button>
            </div>

            {/* Lead Content */}
            <div className="p-6">
              <div className="flex gap-8">
                {/* Left Column */}
                <div className="flex-1">
                  <h2 className="text-[18px] font-bold text-gray-900 mb-3">{lead.title}</h2>
                  
                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                      <Clock size={14} className="text-pink-500" />
                      <span>{lead.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                      <span>🇮🇳</span>
                      <span className="text-teal-600">{lead.location}, {lead.state}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-gray-600 mb-6">
                    <Building2 size={14} />
                    <span className="text-gray-500">{lead.category}</span>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-teal-600">{lead.subcategory}</span>
                  </div>

                  {/* Buyer Also Viewed */}
                  <div className="bg-gray-50 rounded-lg p-4 max-w-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px] text-gray-800">Buyer also viewed:</span>
                      <Info size={12} className="text-gray-400" />
                    </div>
                    <div className="flex gap-3">
                      <img 
                        src={lead.imageUrl} 
                        alt={lead.title}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                      <div className="flex-1 flex items-center">
                        <p className="text-[13px] text-gray-700 leading-tight">{lead.title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Buyer Details */}
                <div className="w-80 space-y-3">
                  <div className="flex items-start">
                    <span className="text-[13px] text-gray-800 w-28">Buyer Details</span>
                    <span className="text-[13px] text-gray-500">- Member since {lead.memberSince} -</span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-[13px] text-gray-800 w-28">Buys</span>
                    <span className="text-[13px] text-gray-700 flex-1">
                      : {lead.buys.join(',')}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-[13px] text-gray-800 w-28">Engagement</span>
                    <div className="flex items-center gap-2 text-[13px]">
                      <span className="text-gray-600">: Requirements: <span className="text-gray-900">{lead.requirements}</span></span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">Calls: <span className="text-gray-900">{lead.calls}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-[13px] text-gray-800 w-28">Available</span>
                    <span className="text-gray-500 mr-2">:</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200">
                        <Smartphone size={14} />
                      </button>
                      <button className="p-1.5 rounded bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200">
                        <MessageCircle size={14} />
                      </button>
                      <button className="p-1.5 rounded bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200">
                        <MapPin size={14} />
                      </button>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white text-[13px] py-2.5 rounded transition-colors">
                    Contact Buyer Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-2">
        <button className="flex flex-col items-center gap-0.5 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow w-12">
          <TrendingUp size={16} className="text-teal-600" />
          <span className="text-[9px] text-teal-600 text-center leading-tight">Past<br/>Leads</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow w-12">
          <Wallet size={16} className="text-teal-600" />
          <span className="text-[9px] text-teal-600">Balance</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow w-12">
          <HelpCircle size={16} className="text-teal-600" />
          <span className="text-[9px] text-teal-600">Help</span>
        </button>
      </div>
    </div>
  );
};

export default BuyLeadsPage;