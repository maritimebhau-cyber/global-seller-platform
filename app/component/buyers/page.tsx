// app/page.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  Search, Bell, User, Home, Package, Briefcase, 
  ChevronDown, LayoutGrid, Activity, CheckCircle, Inbox, 
  TrendingUp, Plus, Settings, LogOut, 
  Star, MapPin, Building2, Edit3, Camera, X, Send,
  Filter
} from 'lucide-react';
import { 
  CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, XAxis
} from 'recharts';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface Deal {
  id: string;
  product: string;
  offer: string;
  target: string;
  status: string;
  progress: number;
  supplier: string;
}

interface Offer {
  id: string;
  product: string;
  supplier: string;
  supplierDetails: string;
  offerAmount: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  supplier: string;
  location: string;
  rating: number;
  category: string;
}

interface Message {
  sender: 'buyer' | 'supplier';
  text: string;
  time: string;
}

interface Stats {
  active: number;
  completed: number;
  savings: number;
  messages: number;
}

type PageType = 'home' | 'search' | 'dealhub' | 'profile';
type DealFilter = 'All' | 'Active' | 'Completed' | 'Inbound';

// ==========================================
// MOCK DATA
// ==========================================

const INITIAL_DEALS: Deal[] = [
  { 
    id: '1', 
    product: 'Industrial Pumps (5 HP)', 
    offer: '₹12,000', 
    target: '₹10,800', 
    status: 'Counter-Offer Sent', 
    progress: 60,
    supplier: 'Pumpits, Inc.' 
  },
  { 
    id: '2', 
    product: 'LED Panel Lights (20W)', 
    offer: '₹450/unit', 
    target: '₹390/unit', 
    status: 'Awaiting Seller Response', 
    progress: 30,
    supplier: 'BrightLight Co.' 
  },
  { 
    id: '3', 
    product: 'Safety Helmets (1000 pcs)', 
    offer: '₹180/unit', 
    target: '₹150/unit', 
    status: 'Agreement Reached!', 
    progress: 100,
    supplier: 'Helmets, Ltd.' 
  },
];

const INITIAL_OFFERS: Offer[] = [
  { 
    id: '1', 
    product: 'Steel Pipes (Grade A)', 
    supplier: 'SteelWorth', 
    supplierDetails: 'Ahmedabad, GJ', 
    offerAmount: '₹450/meter',
    date: '2 hours ago'
  },
  { 
    id: '2', 
    product: 'CNC Machine Parts', 
    supplier: 'PrecisionTools', 
    supplierDetails: 'Pune, MH', 
    offerAmount: '₹12,500/set',
    date: '5 hours ago'
  },
  { 
    id: '3', 
    product: 'Safety Gloves (Nitrile)', 
    supplier: 'SafeHands', 
    supplierDetails: 'Delhi, DL', 
    offerAmount: '₹120/pair',
    date: '1 day ago'
  },
];

const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'High Grade Steel Pipes', 
    price: '₹450/meter', 
    supplier: 'SteelWorth', 
    location: 'Mumbai, MH', 
    rating: 4.8,
    category: 'Raw Materials'
  },
  { 
    id: '2', 
    name: 'Industrial Safety Gloves', 
    price: '₹120/pair', 
    supplier: 'SafeHands', 
    location: 'Delhi, DL', 
    rating: 4.5,
    category: 'Safety'
  },
  { 
    id: '3', 
    name: 'CNC Machine Parts', 
    price: '₹12,500/set', 
    supplier: 'PrecisionTools', 
    location: 'Pune, MH', 
    rating: 4.9,
    category: 'Machinery'
  },
  { 
    id: '4', 
    name: 'Heavy Duty Conveyor Belts', 
    price: '₹3,200/meter', 
    supplier: 'BeltMaster', 
    location: 'Ahmedabad, GJ', 
    rating: 4.6,
    category: 'Machinery'
  },
  { 
    id: '5', 
    name: 'Industrial Pumps (10 HP)', 
    price: '₹22,000', 
    supplier: 'HydroFlow', 
    location: 'Chennai, TN', 
    rating: 4.7,
    category: 'Machinery'
  },
  { 
    id: '6', 
    name: 'LED High Bay Lights', 
    price: '₹850/unit', 
    supplier: 'LuminaTech', 
    location: 'Bangalore, KA', 
    rating: 4.4,
    category: 'Electrical'
  },
];

const CHART_DATA = [
  { name: 'Jan', price: 4000, offer: 2400 },
  { name: 'Feb', price: 3000, offer: 1398 },
  { name: 'Mar', price: 2000, offer: 9800 },
  { name: 'Apr', price: 2780, offer: 3908 },
  { name: 'May', price: 1890, offer: 4800 },
  { name: 'Jun', price: 2390, offer: 3800 },
  { name: 'Jul', price: 3490, offer: 4300 },
];

// ==========================================
// CONSTANTS & CONFIG
// ==========================================

const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
} as const;

const SIZES = {
  icon: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  container: {
    max: 'max-w-7xl',
    content: 'max-w-4xl',
  },
} as const;

// ==========================================
// SUB-COMPONENTS
// ==========================================

interface HeaderProps {
  currentPage: PageType;
  setPage: (page: PageType) => void;
  notificationCount: number;
}

const Header = ({ currentPage, setPage, notificationCount }: HeaderProps) => (
  <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo - Left */}
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => setPage('home')}
      >
        <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
          M
        </div>
        <div className="flex items-center gap-3">
          <span className="text-red-700 font-bold text-2xl">IndiaMART</span>
          <span className="text-slate-300">|</span>
          <span className="text-orange-600 font-bold text-xl">DealHub</span>
        </div>
      </div>
      
      {/* Search - Center */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for DealHub Negotiations" 
            className="w-full pl-4 pr-12 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all"
          />
          <button className="absolute right-0 top-0 bottom-0 px-4 bg-blue-800 text-white rounded-r-lg hover:bg-blue-900 transition-colors">
            <Search size={SIZES.icon.md} />
          </button>
        </div>
      </div>

      {/* Actions - Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
          <Bell size={SIZES.icon.md} className="text-slate-600" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold border-2 border-white">
              {notificationCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setPage('profile')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            currentPage === 'profile' 
              ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-800' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <User size={SIZES.icon.md} />
        </button>
      </div>
    </div>
  </header>
);

interface NavigationProps {
  currentPage: PageType;
  setPage: (page: PageType) => void;
}

const Navigation = ({ currentPage, setPage }: NavigationProps) => {
  const navItems: { id: PageType; label: string; icon: LucideIcon }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search Products', icon: Search },
    { id: 'dealhub', label: 'DealHub Negotiations', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-[73px] left-0 right-0 bg-blue-900 text-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-white text-blue-900 rounded-t-lg mt-1' 
                  : 'hover:bg-blue-800 text-blue-50'
              }`}
            >
              <Icon size={SIZES.icon.sm} /> 
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

interface HomePageProps {
  setPage: (page: PageType) => void;
  stats: Stats;
}

const HomePage = ({ setPage, stats }: HomePageProps) => (
  <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-fade-in">
    {/* Hero Banner */}
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Welcome back, Buyer!</h1>
        <p className="text-blue-100 mb-6 text-lg">
          You have {stats.active} active negotiations and {stats.messages} new supplier messages waiting for your response.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setPage('dealhub')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            View Negotiations
          </button>
          <button 
            onClick={() => setPage('search')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-lg font-medium transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    </div>

    {/* Stats Grid - Symmetric 3 columns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { 
          icon: Briefcase, 
          label: 'Active Deals', 
          value: stats.active,
          color: 'blue',
          progress: 75
        },
        { 
          icon: CheckCircle, 
          label: 'Completed This Month', 
          value: stats.completed,
          color: 'green',
          progress: 50
        },
        { 
          icon: TrendingUp, 
          label: 'Total Savings', 
          value: `₹${stats.savings.toLocaleString()}`,
          color: 'orange',
          progress: 80
        },
      ].map((stat, idx) => (
        <div 
          key={idx}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-700 rounded-xl group-hover:bg-${stat.color}-100 transition-colors`}>
              <stat.icon size={SIZES.icon.lg} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`bg-${stat.color}-500 h-full rounded-full transition-all duration-1000`} 
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-lg">Recent Activity</h3>
        <button className="text-blue-700 text-sm font-medium hover:underline">View All</button>
      </div>
      <div className="divide-y divide-slate-100">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Package size={SIZES.icon.md} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">New quote received for Industrial Pumps</p>
              <p className="text-sm text-slate-500">{i * 2} hours ago • Supplier {String.fromCharCode(64 + i)}</p>
            </div>
            <button className="text-sm border border-slate-300 px-4 py-1.5 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface SearchPageProps {
  onStartNegotiation: (product: Product) => void;
}

const SearchPage = ({ onStartNegotiation }: SearchPageProps) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  
  const filteredProducts = PRODUCTS.filter(p => 
    (p.name.toLowerCase().includes(query.toLowerCase()) || 
     p.supplier.toLowerCase().includes(query.toLowerCase())) &&
    (category === 'All' || p.category === category)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 animate-slide-up">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={SIZES.icon.md} />
          <input 
            type="text" 
            placeholder="Search products, suppliers..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 w-full md:w-auto"
        >
          <option value="All">All Categories</option>
          <option value="Machinery">Machinery</option>
          <option value="Raw Materials">Raw Materials</option>
          <option value="Safety">Safety</option>
          <option value="Electrical">Electrical</option>
        </select>
      </div>

      {/* Products Grid - Symmetric */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
          >
            <div className="h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 opacity-50" />
              <Package size={48} className="text-slate-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-yellow-500 fill-yellow-500" /> 
                <span>{product.rating}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Building2 size={14} /> {product.supplier}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {product.location}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-900">{product.price}</span>
                <button 
                  onClick={() => onStartNegotiation(product)}
                  className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// DEAL HUB PAGE WITH SYMMETRIC FILTERS
// ==========================================

interface DealHubPageProps {
  deals: Deal[];
  offers: Offer[];
  onViewDeal: (deal: Deal) => void;
  onCreateNew: () => void;
}

const DealHubPage = ({ deals, offers, onViewDeal, onCreateNew }: DealHubPageProps) => {
  const [activeFilter, setActiveFilter] = useState<DealFilter>('All');

  const filteredDeals = useMemo(() => {
    switch (activeFilter) {
      case 'Active':
        return deals.filter(d => d.progress < 100 && d.status !== 'Agreement Reached!');
      case 'Completed':
        return deals.filter(d => d.progress === 100 || d.status === 'Agreement Reached!');
      case 'Inbound':
        return deals.filter(d => 
          d.status === 'Awaiting Seller Response' || 
          d.status === 'Quote Requested' ||
          d.status === 'Counter-Offer Sent'
        );
      case 'All':
      default:
        return deals;
    }
  }, [deals, activeFilter]);

  const counts = useMemo(() => ({
    All: deals.length,
    Active: deals.filter(d => d.progress < 100 && d.status !== 'Agreement Reached!').length,
    Completed: deals.filter(d => d.progress === 100 || d.status === 'Agreement Reached!').length,
    Inbound: deals.filter(d => 
      d.status === 'Awaiting Seller Response' || 
      d.status === 'Quote Requested' ||
      d.status === 'Counter-Offer Sent'
    ).length,
  }), [deals]);

  const filterItems: { id: DealFilter; label: string; icon: LucideIcon }[] = [
    { id: 'All', label: 'All Negotiations', icon: LayoutGrid },
    { id: 'Active', label: 'Active Deals', icon: Activity },
    { id: 'Completed', label: 'Completed Deals', icon: CheckCircle },
    { id: 'Inbound', label: 'Inbound Offers', icon: Inbox },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar - Symmetric width */}
        <aside className="col-span-12 md:col-span-3 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Quick Filters</h3>
            <button className="w-full border border-slate-300 rounded-lg px-4 py-2.5 flex items-center justify-between bg-white hover:border-blue-400 transition-colors text-sm">
              <span className="flex items-center gap-2">
                <Filter size={14} /> All filters
              </span>
              <ChevronDown size={16} />
            </button>
          </div>

          <ul className="space-y-1">
            {filterItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeFilter === item.id;
              const count = counts[item.id];
              
              return (
                <li 
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-900 font-medium border-l-4 border-blue-900' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={SIZES.icon.md} /> 
                  <span className="flex-1">{item.label}</span>
                  {count > 0 && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      isActive 
                        ? 'bg-blue-200 text-blue-800' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content - Symmetric grid */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {activeFilter === 'All' && 'All Negotiations'}
                {activeFilter === 'Active' && 'Active Deals'}
                {activeFilter === 'Completed' && 'Completed Deals'}
                {activeFilter === 'Inbound' && 'Inbound Offers'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button 
              onClick={onCreateNew}
              className="bg-blue-900 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={SIZES.icon.md} /> 
              <span>Create New</span>
            </button>
          </div>

          {/* Deals Grid - Symmetric cards */}
          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <div 
                  key={deal.id} 
                  onClick={() => onViewDeal(deal)}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                >
                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        deal.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`} 
                      style={{ width: `${deal.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 mt-2">
                    <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {deal.product}
                    </h3>
                    <ChevronDown size={16} className="text-slate-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Current Offer:</span>
                      <span className="font-semibold text-slate-800">{deal.offer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Your Target:</span>
                      <span className="font-medium text-slate-700">{deal.target}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      deal.progress === 100 
                        ? 'bg-green-100 text-green-700' 
                        : deal.status === 'Awaiting Seller Response'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {deal.status}
                    </span>
                    <span className="text-xs text-slate-400 truncate max-w-[120px]">
                      {deal.supplier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
              <Package size={64} className="mx-auto mb-4 text-slate-200" />
              <h3 className="text-lg font-medium text-slate-700 mb-1">No {activeFilter.toLowerCase()} deals found</h3>
              <p className="text-sm text-slate-500 mb-4">Get started by creating a new negotiation</p>
              <button 
                onClick={onCreateNew}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Create New Deal
              </button>
            </div>
          )}

          {/* Offers Table */}
          {(activeFilter === 'All' || activeFilter === 'Inbound') && offers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Offers</h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-left font-semibold text-slate-700 w-1/3">Product</th>
                      <th className="p-4 text-left font-semibold text-slate-700 w-1/3">Supplier</th>
                      <th className="p-4 text-right font-semibold text-slate-700 w-1/6">Amount</th>
                      <th className="p-4 text-center font-semibold text-slate-700 w-1/6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {offers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-slate-800">{offer.product}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{offer.date}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-slate-700">{offer.supplier}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{offer.supplierDetails}</p>
                        </td>
                        <td className="p-4 text-right font-bold text-slate-800">{offer.offerAmount}</td>
                        <td className="p-4 text-center">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PROFILE PAGE - SYMMETRIC LAYOUT
// ==========================================

const ProfilePage = () => (
  <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
    {/* Profile Header */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-800" />
      <div className="px-8 pb-8">
        <div className="relative flex justify-between items-end -mt-12 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg">
              <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                <User size={40} />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-900 text-white p-2 rounded-full border-2 border-white hover:bg-blue-800 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium mb-2 transition-colors">
            <Edit3 size={16} /> 
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Apex Manufacturing Pvt. Ltd.</h1>
          <p className="text-slate-500 flex items-center gap-2 mt-2">
            <MapPin size={16} /> 
            <span>Mumbai, Maharashtra, India • Buyer Account</span>
          </p>
        </div>
      </div>
    </div>

    {/* Profile Content - Symmetric Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Building2 size={20} className="text-blue-800" /> 
            <span>Company Details</span>
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {[
              { label: 'GST Number', value: '27AAPFU0939F1ZV' },
              { label: 'Business Type', value: 'Manufacturer & Trader' },
              { label: 'Year Established', value: '2015' },
              { label: 'Number of Employees', value: '50 - 100' },
            ].map((item, idx) => (
              <div key={idx}>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</label>
                <p className="text-slate-800 font-medium mt-1.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">Account Settings</h3>
          <ul className="space-y-1">
            {[
              { icon: User, label: 'Personal Info', color: 'text-slate-700' },
              { icon: Bell, label: 'Notifications', color: 'text-slate-700' },
              { icon: Settings, label: 'Security', color: 'text-slate-700' },
              { icon: LogOut, label: 'Log Out', color: 'text-red-600', divider: true },
            ].map((item, idx) => (
              <li 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${item.color} ${item.divider ? 'mt-4 border-t border-slate-100 pt-4' : ''}`}
              >
                <item.icon size={18} /> 
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// MODALS - SYMMETRIC DESIGN
// ==========================================

interface NegotiationModalProps {
  deal: Deal;
  onClose: () => void;
  onUpdate: (deal: Deal) => void;
}

const NegotiationModal = ({ deal, onClose, onUpdate }: NegotiationModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'supplier', text: `Hi, regarding the ${deal.product}. We can offer ${deal.offer}.`, time: '10:00 AM' },
    { sender: 'buyer', text: `That is a bit high. Our target is ${deal.target}.`, time: '10:30 AM' }
  ]);
  const [input, setInput] = useState('');
  const [offerPrice, setOfferPrice] = useState(deal.offer);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'buyer', text: input, time: 'Just now' }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'supplier', 
        text: 'Let me check with my manager and get back to you.', 
        time: 'Just now' 
      }]);
    }, 1500);
  }, [input]);

  const handleAccept = useCallback(() => {
    onUpdate({ ...deal, status: 'Agreement Reached!', progress: 100 });
    onClose();
  }, [deal, onUpdate, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-bold text-lg text-slate-800">Negotiation: {deal.product}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Supplier: {deal.supplier}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                msg.sender === 'buyer' 
                  ? 'bg-blue-900 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
              }`}>
                <p>{msg.text}</p>
                <div className={`text-[10px] mt-2 ${msg.sender === 'buyer' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-slate-200 bg-white space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1.5 block">Current Offer</label>
              <input 
                type="text" 
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-800 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleAccept}
                className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Accept Deal
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="flex-1 border border-slate-300 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-blue-800"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-900 text-white p-2.5 rounded-full hover:bg-blue-800 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuoteModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmit: (deal: Deal) => void;
}

const QuoteModal = ({ product, onClose, onSubmit }: QuoteModalProps) => {
  const [productName, setProductName] = useState(product?.name || '');
  const [supplier, setSupplier] = useState(product?.supplier || '');
  const [quantity, setQuantity] = useState(1);
  const [targetPrice, setTargetPrice] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit({
      id: Date.now().toString(),
      product: productName || 'New Product',
      offer: 'Pending',
      target: `₹${targetPrice}/unit`,
      status: 'Quote Requested',
      progress: 10,
      supplier: supplier || 'TBD'
    });
    onClose();
  }, [productName, supplier, targetPrice, onSubmit, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl">{product ? 'Request Quote' : 'Create New Deal'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Product Details</p>
          <p className="font-semibold text-slate-800">{product ? product.name : 'New Product'}</p>
          {product && <p className="text-sm text-slate-500 mt-1">{product.supplier}</p>}
        </div>
        
        {/* Form */}
        <div className="space-y-5">
          {!product && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-800 outline-none transition-all"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Supplier</label>
                <input 
                  type="text" 
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-800 outline-none transition-all"
                  placeholder="Enter supplier name"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity Required</label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-800 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Price (per unit)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
              <input 
                type="number" 
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full border border-slate-300 rounded-lg pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-blue-800 outline-none transition-all"
                placeholder="Enter your budget"
              />
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-lg mt-2"
          >
            {product ? 'Send Request' : 'Create Deal'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [currentPage, setPage] = useState<PageType>('home');
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [stats, setStats] = useState<Stats>({ 
    active: 12, 
    completed: 8, 
    savings: 45200, 
    messages: 5 
  });

  const handleViewDeal = useCallback((deal: Deal) => {
    setSelectedDeal(deal);
  }, []);

  const handleUpdateDeal = useCallback((updatedDeal: Deal) => {
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
    setStats(prev => ({
      ...prev, 
      active: prev.active - 1, 
      completed: prev.completed + 1
    }));
  }, []);

  const handleStartNegotiation = useCallback((product: Product) => {
    setQuoteProduct(product);
  }, []);

  const handleCreateNew = useCallback(() => {
    setIsCreatingNew(true);
  }, []);

  const handleSubmitQuote = useCallback((newDeal: Deal) => {
    setDeals(prev => [newDeal, ...prev]);
    setStats(prev => ({ ...prev, active: prev.active + 1 }));
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setPage} stats={stats} />;
      case 'search':
        return <SearchPage onStartNegotiation={handleStartNegotiation} />;
      case 'dealhub':
        return (
          <DealHubPage 
            deals={deals} 
            offers={offers} 
            onViewDeal={handleViewDeal}
            onCreateNew={handleCreateNew}
          />
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage setPage={setPage} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-[129px]">
      <Header 
        currentPage={currentPage} 
        setPage={setPage} 
        notificationCount={stats.messages} 
      />
      <Navigation 
        currentPage={currentPage} 
        setPage={setPage} 
      />

      <main className="w-full pb-12">
        {renderContent()}
      </main>

      {selectedDeal && (
        <NegotiationModal 
          deal={selectedDeal} 
          onClose={() => setSelectedDeal(null)} 
          onUpdate={handleUpdateDeal}
        />
      )}

      {(quoteProduct || isCreatingNew) && (
        <QuoteModal 
          product={quoteProduct}
          onClose={() => {
            setQuoteProduct(null);
            setIsCreatingNew(false);
          }}
          onSubmit={handleSubmitQuote}
        />
      )}
    </div>
  );
}