// app/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Edit2, 
  CheckCircle2,
  Info,
  User,
  Download,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Star,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Check,
  Shield,
  Zap,
  TrendingUp as TrendingIcon
} from 'lucide-react';

interface BusinessDetails {
  gstin: string;
  pan: string;
  udyamNumber: string;
  aadhaarNumber: string;
  iec: string;
  tan: string;
}

interface BankDetails {
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
  branchName: string;
  bankName: string;
}

interface ProfileData {
  name: string;
  designation: string;
  company: string;
  mobile: string;
  email: string;
  isVerified: boolean;
  logo: string | null;
}

interface ContactForm {
  division: string;
  address: string;
  mobileNumber: string;
  tollFreeNumber: string;
  faxNumber: string;
  faxStdCode: string;
  faxNo: string;
  contactPersonName: string;
  country: string;
  landlineStdCode: string;
  landlineNo: string;
  email: string;
}

interface AdditionalBusinessDetails {
  ceoName: string;
  numberOfEmployees: string;
}

interface TrustProfileData {
  gstin: string;
  udyamNumber: string;
  aadhaarNumber: string;
}

const tabs = [
  { id: 'primary', label: 'Primary Details' },
  { id: 'additional', label: 'Additional Details' },
  { id: 'trust', label: 'Trust Profile', badge: 'new' },
  { id: 'website', label: 'Website Pages' },
  { id: 'catalog', label: 'Share Catalog' },
  { id: 'performance', label: 'Performance Reports' },
  { id: 'social', label: 'Social', badge: 'new' },
];

const websitePages = [
  { id: 'home', label: 'HOME PAGE', icon: 'home' },
  { id: 'about', label: 'ABOUT US', icon: 'users' },
  { id: 'awards', label: 'AWARDS & MEMBERSHIPS', icon: 'award' },
  { id: 'quality', label: 'QUALITY & COMPLIANCE', icon: 'shield' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE & FACILITIES', icon: 'building' },
  { id: 'testimonials', label: 'TESTIMONIALS', icon: 'testimonial' },
  { id: 'news', label: 'NEWS', icon: 'news' },
  { id: 'jobs', label: 'JOBS', icon: 'jobs' },
  { id: 'custom', label: 'CUSTOM PROFILE', icon: 'custom' },
];

const performanceSubTabs = [
  { id: 'all', label: 'All Enquiries' },
  { id: 'buyleads', label: 'BuyLeads' },
  { id: 'calls', label: 'Calls' },
  { id: 'leadmanager', label: 'Lead Manager' },
  { id: 'reviews', label: 'My Reviews' },
  { id: 'filter', label: 'Advance Filter' },
  { id: 'insights', label: 'Price Insights' },
  { id: 'views', label: 'Catalog Views' },
];

const weeklyData = [
  { week: '18-24 Jan', value: 0 },
  { week: '25-31 Jan', value: 0 },
  { week: '01-07 Feb', value: 0 },
  { week: '08-14 Feb', value: 0 },
  { week: '15-21 Feb', value: 0 },
  { week: '22-24 Feb', value: 0 },
];

const buyLeadsData = [
  { period: '18-24 Jan', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
  { period: '25-31 Jan', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
  { period: '01-07 Feb', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
  { period: '08-14 Feb', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
  { period: '15-21 Feb', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
  { period: '22-24 Feb', consumed: 0, zero4: '0%', four24: '0%', oneday: '0%' },
];

const leadManagerData = [
  { period: '18-24 Jan', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
  { period: '25-31 Jan', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
  { period: '01-07 Feb', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
  { period: '08-14 Feb', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
  { period: '15-21 Feb', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
  { period: '22-24 Feb', totalReplies: 0, uniqueReplies: 0, callbacks: 0 },
];

const catalogViewsData = [
  { period: '18-24 Jan', shortPeriod: '18-24\nJan', consumed: 0 },
  { period: '25-31 Jan', shortPeriod: '25-31\nJan', consumed: 0 },
  { period: '01-07 Feb', shortPeriod: '01-07\nFeb', consumed: 0 },
  { period: '08-14 Feb', shortPeriod: '08-14\nFeb', consumed: 0 },
  { period: '15-21 Feb', shortPeriod: '15-21\nFeb', consumed: 0 },
  { period: '22-25 Feb', shortPeriod: '22-25\nFeb', consumed: 0 },
];

const priceInsightsData = [
  { period: '18-24 Jan', views: 0, enquiries: 0 },
  { period: '25-31 Jan', views: 0, enquiries: 0 },
  { period: '01-07 Feb', views: 0, enquiries: 0 },
  { period: '08-14 Feb', views: 0, enquiries: 0 },
  { period: '15-21 Feb', views: 0, enquiries: 0 },
  { period: '22-24 Feb', views: 0, enquiries: 0 },
];

const monthlyTimelineData = [
  { month: "AUG '25", enquiries: 0, buyleads: 0 },
  { month: "SEP '25", enquiries: 0, buyleads: 0 },
  { month: "OCT '25", enquiries: 0, buyleads: 0 },
  { month: "NOV '25", enquiries: 0, buyleads: 0 },
  { month: "DEC '25", enquiries: 0, buyleads: 0 },
  { month: "JAN '26", enquiries: 0, buyleads: 0 },
];

const connectedSellers = [
  { name: 'SLTL Group', image: 'https://via.placeholder.com/150x100/333/fff?text=SLTL' },
  { name: 'Asian Adores', image: 'https://via.placeholder.com/150x100/933/fff?text=Asian' },
  { name: 'Moini Fabrics', image: 'https://via.placeholder.com/150x100/393/fff?text=Moini' },
  { name: 'Deep Hydraulic', image: 'https://via.placeholder.com/150x100/339/fff?text=Deep' },
];

export default function BusinessProfile() {
  const [activeTab, setActiveTab] = useState('primary');
  const [activePerformanceTab, setActivePerformanceTab] = useState('all');
  const [performanceView, setPerformanceView] = useState<'monthly' | 'weekly'>('weekly');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'categories' | 'locations'>('categories');
  const [reviewSort, setReviewSort] = useState('recent');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const [profile, setProfile] = useState<ProfileData>({
    name: 'RITIK JAIN',
    designation: '',
    company: 'Web Tech',
    mobile: '8518900153',
    email: 'jainritik829@gmail.com',
    isVerified: true,
    logo: null,
  });

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    gstin: '',
    pan: 'BZSPJ0848K',
    udyamNumber: '',
    aadhaarNumber: '',
    iec: '',
    tan: '',
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: '',
    ifsc: '',
    accountHolderName: '',
    branchName: '',
    bankName: '',
  });

  const [additionalBusiness, setAdditionalBusiness] = useState<AdditionalBusinessDetails>({
    ceoName: '',
    numberOfEmployees: '',
  });

  const [contactForm, setContactForm] = useState<ContactForm>({
    division: '',
    address: '',
    mobileNumber: '',
    tollFreeNumber: '',
    faxNumber: '',
    faxStdCode: '',
    faxNo: '',
    contactPersonName: '',
    country: 'India',
    landlineStdCode: '',
    landlineNo: '',
    email: '',
  });

  const [trustProfile, setTrustProfile] = useState<TrustProfileData>({
    gstin: '',
    udyamNumber: '',
    aadhaarNumber: '',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalBusinessChange = (field: keyof AdditionalBusinessDetails, value: string) => {
    setAdditionalBusiness(prev => ({ ...prev, [field]: value }));
  };

  const handleTrustProfileChange = (field: keyof TrustProfileData, value: string) => {
    setTrustProfile(prev => ({ ...prev, [field]: value }));
  };

  // Mask sensitive data
  const maskMobile = (mobile: string) => {
    return mobile.slice(0, 2) + '*****' + mobile.slice(-3);
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return name.slice(0, 1) + '****' + name.slice(-1) + '@' + domain;
  };

  const renderIcon = (iconType: string) => {
    const iconClass = "w-16 h-16 text-white";
    switch (iconType) {
      case 'home':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'users':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'award':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'building':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'testimonial':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        );
      case 'news':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'jobs':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'custom':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs - BOLD and LARGER FONT */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative py-3 text-base font-bold whitespace-nowrap transition-colors
                  ${activeTab === tab.id 
                    ? 'text-blue-900 border-b-2 border-blue-900' 
                    : 'text-gray-700 hover:text-gray-900'
                  }
                `}
              >
                <span className="flex items-center gap-1">
                  {tab.label}
                  {tab.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase tracking-tight leading-none">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        
        {/* PRIMARY DETAILS TAB */}
        {activeTab === 'primary' && (
          <div className="flex gap-6">
            
            {/* Left Sidebar - Profile Card */}
            <div className="w-[300px] flex-shrink-0">
              <div className="bg-sky-50 rounded-lg border border-gray-300 p-4 relative">
                {/* Edit Button Top Right */}
                <button className="absolute top-3 right-3 text-cyan-600 text-xs flex items-center gap-0.5 hover:text-cyan-700 font-normal bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                  Edit
                  <Edit2 className="w-3 h-3" />
                </button>

                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <h2 className="text-base font-bold text-blue-900 tracking-tight">{profile.name}</h2>
                      {profile.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500" />
                      )}
                    </div>
                    
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline mb-1 font-normal">
                      <Plus className="w-3 h-3" />
                      Add Designation
                    </button>
                    
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-cyan-600 underline cursor-pointer text-xs">{profile.company}</span>
                      <Edit2 className="w-3 h-3 text-green-500" />
                      <button className="text-green-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Company Logo Upload */}
                  <div className="relative">
                    <div className="w-[70px] h-[70px] bg-gray-200 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors overflow-hidden">
                      {profile.logo ? (
                        <img src={profile.logo} alt="Company Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                          <div className="bg-white rounded p-1 shadow-sm border border-gray-200">
                            <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-[11px] text-gray-600 text-center mt-1 leading-tight">Company Logo</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mt-4">
                  <button className="flex items-center gap-2 text-blue-600 text-xs hover:underline w-full font-normal">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                    <MapPin className="w-3 h-3" />
                    Add Address
                  </button>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{profile.mobile}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500 flex-shrink-0" />
                    <span className="text-gray-400">|</span>
                    <button className="text-blue-600 hover:underline">
                      + Add Alternate Mobile
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{profile.email}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500 flex-shrink-0" />
                    <span className="text-gray-400">|</span>
                    <button className="text-blue-600 hover:underline">
                      + Add Alternate Email
                    </button>
                  </div>

                  <button className="flex items-center gap-2 text-blue-600 text-xs hover:underline w-full font-normal">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3 text-white rotate-45" />
                    </div>
                    Add Landline Number
                  </button>
                </div>

                {/* Social Links */}
                <div className="mt-4">
                  <p className="text-xs text-gray-700 mb-2">We are on:</p>
                  <div className="flex gap-1.5">
                    <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-300">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2"/>
                        <ellipse cx="12" cy="12" rx="4" ry="8" stroke="#666" strokeWidth="1.5"/>
                        <path d="M2 12h20" stroke="#666" strokeWidth="1.5"/>
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-300">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Trust Profile Link */}
                <div className="mt-4 pt-3 border-t border-cyan-200">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    View / Build your <span className="text-green-600 font-semibold">Trust Profile</span>?{' '}
                    <button className="text-blue-600 hover:underline">Click here</button>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Business & Bank Details */}
            <div className="flex-1 pt-1">
              
              {/* Business Details Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-bold text-indigo-900">Business Details</h3>
                  <button className="text-cyan-600 text-xs flex items-center gap-0.5 hover:text-cyan-700 font-normal">
                    Edit
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  {/* GSTIN */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">GSTIN</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* PAN */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">PAN</span>
                    </div>
                    <p className="text-sm text-gray-900 font-normal">{businessDetails.pan}</p>
                  </div>

                  {/* Udyam Number */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">Udyam Number</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* Aadhaar Number */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">Aadhaar Number</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* Import Export Code */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">Import Export Code (IEC)</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* TAN */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-500">TAN</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Bank Details Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-bold text-indigo-900">Bank Details</h3>
                  <button className="text-cyan-600 text-xs flex items-center gap-0.5 hover:text-cyan-700 font-normal">
                    Edit
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  {/* Account Number */}
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Account Number</span>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* IFSC */}
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">IFSC</span>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* Account Holder Name */}
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Account Holder Name</span>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* Branch Name */}
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Branch Name (As Per IFSC Code)</span>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {/* Bank Name */}
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500 block mb-1">Bank Name (As Per IFSC Code)</span>
                    <button className="text-blue-600 text-xs flex items-center gap-0.5 hover:underline font-normal">
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Divider */}
              <div className="border-t border-gray-200 mt-8"></div>

            </div>
          </div>
        )}

        {/* ADDITIONAL DETAILS TAB */}
        {activeTab === 'additional' && (
          <div>
            {/* Additional Business Details Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-indigo-900 mb-4">Additional Business Details</h2>
              
              <div className="flex gap-8 items-start">
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* CEO Name */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">CEO Name</label>
                    <input
                      type="text"
                      value={additionalBusiness.ceoName}
                      onChange={(e) => handleAdditionalBusinessChange('ceoName', e.target.value)}
                      className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Number of Employees</label>
                    <select
                      value={additionalBusiness.numberOfEmployees}
                      onChange={(e) => handleAdditionalBusinessChange('numberOfEmployees', e.target.value)}
                      className="w-full h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400 bg-white"
                    >
                      <option value="">---Choose One---</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center mb-1">
                    <div className="bg-gray-300 rounded-full p-3">
                      <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Profile Photo</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* Additional Contact Information Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">Additional Contact Information</h2>
              
              <div className="border border-gray-400 rounded bg-white p-4">
                <h3 className="text-base font-bold text-indigo-900 mb-4">Add New Contact</h3>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {/* Left Column */}
                  <div className="space-y-3">
                    {/* Division */}
                    <div className="flex items-center">
                      <label className="w-28 text-sm text-gray-600 flex-shrink-0">
                        Division<span className="text-red-500">*</span>
                      </label>
                      <select
                        value={contactForm.division}
                        onChange={(e) => handleContactChange('division', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400 bg-white"
                      >
                        <option value="">Select Division</option>
                        <option value="sales">Sales</option>
                        <option value="support">Support</option>
                        <option value="marketing">Marketing</option>
                      </select>
                    </div>

                    {/* Address */}
                    <div className="flex items-center">
                      <label className="w-28 text-sm text-gray-600 flex-shrink-0">Address</label>
                      <input
                        type="text"
                        value={contactForm.address}
                        onChange={(e) => handleContactChange('address', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center">
                      <label className="w-28 text-sm text-gray-600 flex-shrink-0">Mobile Number</label>
                      <div className="flex-1 flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">+91</span>
                        <input
                          type="text"
                          value={contactForm.mobileNumber}
                          onChange={(e) => handleContactChange('mobileNumber', e.target.value)}
                          className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded-r focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    {/* Toll Free Number */}
                    <div className="flex items-center">
                      <label className="w-28 text-sm text-gray-600 flex-shrink-0">Toll Free Number</label>
                      <input
                        type="text"
                        value={contactForm.tollFreeNumber}
                        onChange={(e) => handleContactChange('tollFreeNumber', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    {/* Fax Number */}
                    <div className="flex items-center">
                      <label className="w-28 text-sm text-gray-600 flex-shrink-0">Fax Number</label>
                      <div className="flex-1 flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">+91</span>
                        <input
                          type="text"
                          placeholder="STD Code"
                          value={contactForm.faxStdCode}
                          onChange={(e) => handleContactChange('faxStdCode', e.target.value)}
                          className="w-20 h-9 px-3 text-sm border border-gray-300 border-r-0 text-gray-400 focus:outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          placeholder="Fax No."
                          value={contactForm.faxNo}
                          onChange={(e) => handleContactChange('faxNo', e.target.value)}
                          className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded-r focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3 bg-[#f6fffe]">
                    {/* Contact Person Name */}
                    <div className="flex items-center">
                      <label className="w-32 text-sm text-gray-600 flex-shrink-0">Contact Person Name</label>
                      <input
                        type="text"
                        value={contactForm.contactPersonName}
                        onChange={(e) => handleContactChange('contactPersonName', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex items-center">
                      <label className="w-32 text-sm text-gray-600 flex-shrink-0">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={contactForm.country}
                        onChange={(e) => handleContactChange('country', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    {/* Landline Number */}
                    <div className="flex items-center">
                      <label className="w-32 text-sm text-gray-600 flex-shrink-0">Landline Number</label>
                      <div className="flex-1 flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">+91</span>
                        <input
                          type="text"
                          placeholder="STD Code"
                          value={contactForm.landlineStdCode}
                          onChange={(e) => handleContactChange('landlineStdCode', e.target.value)}
                          className="w-20 h-9 px-3 text-sm border border-gray-300 border-r-0 text-gray-400 focus:outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          placeholder="Landline No."
                          value={contactForm.landlineNo}
                          onChange={(e) => handleContactChange('landlineNo', e.target.value)}
                          className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded-r focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex items-center">
                      <label className="w-32 text-sm text-gray-600 flex-shrink-0">E-mail</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 bg-gray-300 text-gray-600 text-sm font-bold rounded hover:bg-gray-400 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* Business Card Section */}
            <div>
              <h2 className="text-lg font-bold text-indigo-900 mb-4">Business Card</h2>
              
              <div className="flex justify-between gap-8">
                {/* Front View */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 text-center mb-2">Front View</p>
                  <div className="border border-gray-400 rounded-lg h-48 flex items-center justify-center bg-white">
                    <button className="flex items-center gap-1 text-blue-600 text-sm font-bold hover:underline">
                      <Plus className="w-4 h-4" />
                      Add Photo
                    </button>
                  </div>
                </div>

                {/* Back View */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 text-center mb-2">Back View</p>
                  <div className="border border-gray-400 rounded-lg h-48 flex items-center justify-center bg-white">
                    <button className="flex items-center gap-1 text-blue-600 text-sm font-bold hover:underline">
                      <Plus className="w-4 h-4" />
                      Add Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Divider */}
            <div className="border-t border-gray-300 mt-6"></div>

          </div>
        )}

        {/* TRUST PROFILE TAB */}
        {activeTab === 'trust' && (
          <div className="flex justify-center">
            <div className="w-[500px] bg-white rounded-lg border border-cyan-400 p-6">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b border-cyan-400">
                <h2 className="text-lg font-bold text-indigo-900 mb-1">Build Your Trust Profile !</h2>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>10 Years</span>
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">Contact Person</label>
                <p className="text-base font-bold text-gray-900">Ritik Jain</p>
              </div>

              {/* Business Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">Business Name</label>
                <p className="text-base font-bold text-gray-900">Web Tech</p>
              </div>

              {/* Mobile */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Mobile</label>
                  <p className="text-base font-bold text-gray-900">{maskMobile(profile.mobile)}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="w-5 h-5 fill-green-500 text-white" />
                  <span className="font-bold">Verified</span>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <p className="text-base font-bold text-gray-900">{maskEmail(profile.email)}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="w-5 h-5 fill-green-500 text-white" />
                  <span className="font-bold">Verified</span>
                </div>
              </div>

              {/* GSTIN */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">GSTIN</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Your GST Number"
                    value={trustProfile.gstin}
                    onChange={(e) => handleTrustProfileChange('gstin', e.target.value)}
                    className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
                  />
                  <button className="px-4 py-2 bg-gray-400 text-white text-sm font-bold rounded hover:bg-gray-500 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              {/* PAN */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">PAN</label>
                <p className="text-base font-bold text-gray-900">BZSPJ0848K</p>
              </div>

              {/* Udyam Number */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">Udyam Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Your Udyam Number"
                    value={trustProfile.udyamNumber}
                    onChange={(e) => handleTrustProfileChange('udyamNumber', e.target.value)}
                    className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
                  />
                  <button className="px-4 py-2 bg-gray-400 text-white text-sm font-bold rounded hover:bg-gray-500 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              {/* Aadhaar Number */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">Aadhaar Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Your Aadhaar Number"
                    value={trustProfile.aadhaarNumber}
                    onChange={(e) => handleTrustProfileChange('aadhaarNumber', e.target.value)}
                    className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:border-cyan-400"
                  />
                  <button className="px-4 py-2 bg-gray-400 text-white text-sm font-bold rounded hover:bg-gray-500 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              {/* Bank Details */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Bank Details</span>
                <button className="px-4 py-2 bg-cyan-500 text-white text-sm font-bold rounded hover:bg-cyan-600 transition-colors">
                  + Add
                </button>
              </div>

            </div>
          </div>
        )}

        {/* WEBSITE PAGES TAB */}
        {activeTab === 'website' && (
          <div className="bg-white p-8 rounded-lg">
            {/* Row 1 - 4 cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {websitePages.slice(0, 4).map((page) => (
                <button
                  key={page.id}
                  className="group flex items-stretch bg-white rounded-lg border border-gray-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-200 overflow-hidden h-40"
                >
                  {/* Icon Section - Teal Background */}
                  <div className="w-40 bg-[#1dbab8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#17a5a3] transition-colors">
                    {renderIcon(page.icon)}
                  </div>
                  
                  {/* Label Section */}
                  <div className="flex-1 flex items-center justify-center px-4">
                    <span className="text-lg font-bold text-indigo-900 text-center leading-tight">
                      {page.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Row 2 - 4 cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {websitePages.slice(4, 8).map((page) => (
                <button
                  key={page.id}
                  className="group flex items-stretch bg-white rounded-lg border border-gray-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-200 overflow-hidden h-40"
                >
                  {/* Icon Section - Teal Background */}
                  <div className="w-40 bg-[#1dbab8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#17a5a3] transition-colors">
                    {renderIcon(page.icon)}
                  </div>
                  
                  {/* Label Section */}
                  <div className="flex-1 flex items-center justify-center px-4">
                    <span className="text-lg font-bold text-indigo-900 text-center leading-tight">
                      {page.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Row 3 - 1 centered card */}
            <div className="flex justify-center">
              {websitePages.slice(8, 9).map((page) => (
                <button
                  key={page.id}
                  className="group flex items-stretch bg-white rounded-lg border border-gray-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-200 overflow-hidden h-40 w-[calc(25%-18px)]"
                >
                  {/* Icon Section - Teal Background */}
                  <div className="w-40 bg-[#1dbab8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#17a5a3] transition-colors">
                    {renderIcon(page.icon)}
                  </div>
                  
                  {/* Label Section */}
                  <div className="flex-1 flex items-center justify-center px-4">
                    <span className="text-lg font-bold text-indigo-900 text-center leading-tight">
                      {page.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SHARE CATALOG TAB */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-lg p-6">
            <div className="flex gap-8">
              {/* Left Content */}
              <div className="flex-1">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Share Catalog on Social Media</h2>
                <p className="text-gray-500 mb-6">Multiply the reach of your business and let more people know about it</p>

                {/* URL Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Your Current catalog URL is :{' '}
                    <a href="https://www.indiamart.com/uptech-jabalpur/   " className="text-blue-600 hover:underline font-bold">
                      https://www.indiamart.com/uptech-jabalpur/   
                    </a>
                  </p>
                </div>

                {/* Social Share Section */}
                <div className="mb-4">
                  <p className="text-gray-700 font-bold mb-1">Want more visibility to attract buyers?</p>
                  <p className="text-gray-500 mb-4">Share your catalog URL on social media</p>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3">
                  {/* Facebook */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded hover:bg-[#365899] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-bold">Facebook</span>
                  </button>

                  {/* X (Twitter) */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="font-bold">X (Twitter)</span>
                  </button>

                  {/* LinkedIn */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded hover:bg-[#006396] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-bold">LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="w-80 flex-shrink-0">
                <div className="relative">
                  {/* Storefront Illustration */}
                  <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Clouds */}
                    <ellipse cx="80" cy="50" rx="30" ry="15" fill="#e0f2fe" />
                    <ellipse cx="110" cy="45" rx="25" ry="12" fill="#e0f2fe" />
                    <ellipse cx="320" cy="40" rx="35" ry="18" fill="#e0f2fe" />
                    <ellipse cx="360" cy="50" rx="25" ry="12" fill="#e0f2fe" />
                    
                    {/* Store Building */}
                    <rect x="100" y="80" width="200" height="180" fill="#fef3c7" stroke="#d4a574" strokeWidth="2"/>
                    
                    {/* Roof/Awning */}
                    <rect x="90" y="70" width="220" height="25" fill="#1f2937" rx="2"/>
                    <text x="200" y="87" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" letterSpacing="2">ABC COMPANY</text>
                    
                    {/* Windows */}
                    <rect x="115" y="110" width="50" height="70" fill="#bfdbfe" stroke="#6b7280" strokeWidth="2"/>
                    <rect x="175" y="110" width="50" height="70" fill="#bfdbfe" stroke="#6b7280" strokeWidth="2"/>
                    <rect x="235" y="110" width="50" height="70" fill="#bfdbfe" stroke="#6b7280" strokeWidth="2"/>
                    
                    {/* Door */}
                    <rect x="175" y="190" width="50" height="70" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
                    <circle cx="215" cy="225" r="3" fill="#6b7280"/>
                    
                    {/* People */}
                    {/* Person 1 - Pink shirt */}
                    <circle cx="140" cy="240" r="12" fill="#fca5a5"/>
                    <rect x="128" y="252" width="24" height="35" fill="#f472b6" rx="5"/>
                    <rect x="125" y="287" width="10" height="15" fill="#374151"/>
                    <rect x="145" y="287" width="10" height="15" fill="#374151"/>
                    
                    {/* Person 2 - Blue shirt pointing */}
                    <circle cx="200" cy="230" r="12" fill="#fdba74"/>
                    <rect x="188" y="242" width="24" height="35" fill="#22d3ee" rx="5"/>
                    <rect x="185" y="277" width="10" height="15" fill="#374151"/>
                    <rect x="205" y="277" width="10" height="15" fill="#374151"/>
                    {/* Arm pointing */}
                    <line x1="210" y1="255" x2="240" y2="240" stroke="#fdba74" strokeWidth="6" strokeLinecap="round"/>
                    
                    {/* Person 3 - Green shirt */}
                    <circle cx="260" cy="245" r="12" fill="#86efac"/>
                    <rect x="248" y="257" width="24" height="35" fill="#4ade80" rx="5"/>
                    <rect x="245" y="292" width="10" height="15" fill="#374151"/>
                    <rect x="265" y="292" width="10" height="15" fill="#374151"/>
                    
                    {/* Person 4 - Gray shirt walking */}
                    <circle cx="310" cy="235" r="12" fill="#d1d5db"/>
                    <rect x="298" y="247" width="24" height="35" fill="#9ca3af" rx="5"/>
                    <rect x="295" y="282" width="10" height="15" fill="#374151"/>
                    <rect x="315" y="282" width="10" height="15" fill="#374151"/>
                    
                    {/* Person 5 - Brown pants */}
                    <circle cx="360" cy="250" r="12" fill="#fdba74"/>
                    <rect x="348" y="262" width="24" height="35" fill="#fcd34d" rx="5"/>
                    <rect x="345" y="297" width="10" height="15" fill="#92400e"/>
                    <rect x="365" y="297" width="10" height="15" fill="#92400e"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERFORMANCE REPORTS TAB */}
        {activeTab === 'performance' && (
          <div className="bg-white">
            {/* Secondary Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between px-4">
                <nav className="flex space-x-6">
                  {performanceSubTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePerformanceTab(tab.id)}
                      className={`
                        relative py-3 text-sm font-bold whitespace-nowrap transition-colors
                        ${activePerformanceTab === tab.id 
                          ? 'text-cyan-600 border-b-2 border-cyan-600' 
                          : 'text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                
                {/* Date Selector */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-50">
                    FEB'26
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {/* View Toggle - Only show for tabs that need it */}
              {(activePerformanceTab === 'all' || activePerformanceTab === 'buyleads' || activePerformanceTab === 'leadmanager' || activePerformanceTab === 'views' || activePerformanceTab === 'insights') && (
                <div className="flex justify-end mb-6">
                  <div className="inline-flex border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setPerformanceView('monthly')}
                      className={`px-4 py-2 text-sm font-bold transition-colors ${
                        performanceView === 'monthly'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setPerformanceView('weekly')}
                      className={`px-4 py-2 text-sm font-bold transition-colors ${
                        performanceView === 'weekly'
                          ? 'bg-cyan-50 text-cyan-600 border-l border-gray-300'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border-l border-gray-300'
                      }`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>
              )}

              {/* ALL ENQUIRIES VIEW */}
              {activePerformanceTab === 'all' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {weeklyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <span className="text-base font-bold text-gray-900">{data.value}</span>
                          <div className="w-px h-32 bg-gray-100"></div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-600">{data.week.split(' ')[0]}</div>
                            <div className="text-sm text-gray-500">{data.week.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph shows Enquiries via Calls, Emails & Leads Consumed</p>
                  </div>

                  {/* Respond Button */}
                  <button className="w-full py-3 bg-blue-600 text-white text-base font-bold rounded hover:bg-blue-700 transition-colors mb-8">
                    Respond to Enquiries ›
                  </button>

                  {/* Top Categories/Locations Tabs */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-center gap-8 mb-4">
                      <button
                        onClick={() => setActiveCategoryTab('categories')}
                        className={`text-base font-bold pb-2 border-b-2 transition-colors ${
                          activeCategoryTab === 'categories'
                            ? 'text-cyan-600 border-cyan-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900'
                        }`}
                      >
                        Top Categories
                      </button>
                      <button
                        onClick={() => setActiveCategoryTab('locations')}
                        className={`text-base font-bold pb-2 border-b-2 transition-colors ${
                          activeCategoryTab === 'locations'
                            ? 'text-cyan-600 border-cyan-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900'
                        }`}
                      >
                        Top Locations
                      </button>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-200 rounded overflow-hidden max-w-3xl mx-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200">
                              {activeCategoryTab === 'categories' ? 'Category' : 'Location'}
                            </th>
                            <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200">
                              Leads Consumed
                            </th>
                            <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200">
                              Enquiries
                            </th>
                            <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200">
                              Calls
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-base font-bold text-gray-500">
                              No Record Found
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">* Based on last 6 months.</p>
                  </div>
                </>
              )}

              {/* BUYLEADS VIEW */}
              {activePerformanceTab === 'buyleads' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {weeklyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <span className="text-base font-bold text-gray-900">{data.value} D</span>
                          <div className="w-px h-32 bg-gray-100"></div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-600">{data.week.split(' ')[0]}</div>
                            <div className="text-sm text-gray-500">{data.week.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph represents unique days when BuyLeads were consumed</p>
                  </div>

                  {/* Consume BuyLeads Button */}
                  <button className="w-full py-3 bg-blue-600 text-white text-base font-bold rounded hover:bg-blue-700 transition-colors mb-8">
                    Consume BuyLeads ›
                  </button>

                  {/* BuyLeads Detailed Table */}
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200 w-48"></th>
                          {buyLeadsData.map((data, index) => (
                            <th key={index} className="text-center text-sm font-bold text-gray-700 py-2 px-2 border-b border-gray-200">
                              {data.period}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* BuyLeads Consumed Row */}
                        <tr className="bg-white">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            BuyLeads Consumed
                          </td>
                          {buyLeadsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.consumed}
                            </td>
                          ))}
                        </tr>
                        
                        {/* Consumption Within Section */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200" colSpan={7}>
                            Consumption Within
                          </td>
                        </tr>
                        
                        {/* 0-4 hrs Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm text-gray-600 py-2 px-4 pl-8 border-b border-gray-200">
                            0-4 hrs
                          </td>
                          {buyLeadsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-2 px-2 border-b border-gray-200">
                              {data.zero4}
                            </td>
                          ))}
                        </tr>
                        
                        {/* 4-24 hrs Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm text-gray-600 py-2 px-4 pl-8 border-b border-gray-200">
                            4-24 hrs
                          </td>
                          {buyLeadsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-2 px-2 border-b border-gray-200">
                              {data.four24}
                            </td>
                          ))}
                        </tr>
                        
                        {/* >1 day Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm text-gray-600 py-2 px-4 pl-8 border-b border-gray-200">
                            &gt;1 day
                          </td>
                          {buyLeadsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-2 px-2 border-b border-gray-200">
                              {data.oneday}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* CALLS VIEW */}
              {activePerformanceTab === 'calls' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {weeklyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <span className="text-base font-bold text-gray-900">{data.value}</span>
                          <div className="w-px h-32 bg-gray-100"></div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-600">{data.week.split(' ')[0]}</div>
                            <div className="text-sm text-gray-500">{data.week.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph represents Answered Calls (Green) & Missed Calls (Red)</p>
                  </div>

                  {/* View Missed Calls Button */}
                  <button className="w-full py-3 bg-blue-600 text-white text-base font-bold rounded hover:bg-blue-700 transition-colors">
                    View Missed Calls ›
                  </button>
                </>
              )}

              {/* LEAD MANAGER VIEW */}
              {activePerformanceTab === 'leadmanager' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {weeklyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <span className="text-base font-bold text-gray-900">{data.value} D</span>
                          <div className="w-px h-32 bg-gray-100"></div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-600">{data.week.split(' ')[0]}</div>
                            <div className="text-sm text-gray-500">{data.week.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph represents unique days when replies sent through Lead Manager</p>
                  </div>

                  {/* Connect with Buyers Button */}
                  <button className="w-full py-3 bg-blue-600 text-white text-base font-bold rounded hover:bg-blue-700 transition-colors mb-8">
                    Connect with your Buyers ›
                  </button>

                  {/* Lead Manager Table */}
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left text-sm font-bold text-gray-700 py-2 px-4 border-b border-gray-200 w-48"></th>
                          {leadManagerData.map((data, index) => (
                            <th key={index} className="text-center text-sm font-bold text-gray-700 py-2 px-2 border-b border-gray-200">
                              {data.period}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Total Replies Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            Total Replies
                          </td>
                          {leadManagerData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.totalReplies}
                            </td>
                          ))}
                        </tr>
                        
                        {/* Unique Replies Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            Unique Replies
                          </td>
                          {leadManagerData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.uniqueReplies}
                            </td>
                          ))}
                        </tr>
                        
                        {/* Callbacks Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            Callbacks
                          </td>
                          {leadManagerData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.callbacks}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* MY REVIEWS VIEW */}
              {activePerformanceTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews Summary Section */}
                  <div className="grid grid-cols-3 gap-8">
                    {/* Overall Rating */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-6xl font-bold text-gray-900">0</span>
                        <span className="text-xl text-gray-500">/5</span>
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-6 h-6 text-gray-300 fill-gray-300" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mb-1 font-bold">Reviewed by 0 Users</p>
                      <p className="text-sm text-gray-500 font-bold">Asked for Reviews (90D): 0</p>
                      
                      {/* Sort Dropdown */}
                      <div className="mt-4">
                        <div className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded text-sm font-bold text-gray-600 bg-white">
                          <span className="text-gray-400">Sort by</span>
                          <span>Most Recent</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Supplier Ratings */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1">
                        Supplier Ratings
                        <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                      </h3>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-600 w-3">{rating}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gray-200 w-0"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-400 w-8">NA</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* User Satisfaction */}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1">
                        User Satisfaction
                        <ThumbsUp className="w-5 h-5 text-green-500" />
                        <ThumbsDown className="w-5 h-5 text-red-500" />
                      </h3>
                      <div className="space-y-3">
                        {['Response', 'Quality', 'Delivery', 'Behaviour'].map((item) => (
                          <div key={item} className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-600 w-16">{item}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gray-200 w-0"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-400 w-8">NA</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Reviews List Placeholder */}
                  <div className="min-h-[200px] flex items-center justify-center">
                    <p className="text-base font-bold text-gray-400">No reviews yet</p>
                  </div>
                </div>
              )}

              {/* ADVANCE FILTER VIEW */}
              {activePerformanceTab === 'filter' && (
                <div className="space-y-6">
                  {/* Filter Dropdowns */}
                  <div className="flex gap-4">
                    {/* Location Dropdown */}
                    <div className="relative">
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="appearance-none w-64 h-11 px-4 pr-10 text-sm font-bold text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="">Location</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="chennai">Chennai</option>
                        <option value="kolkata">Kolkata</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="appearance-none w-64 h-11 px-4 pr-10 text-sm font-bold text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="">Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="machinery">Machinery</option>
                        <option value="textiles">Textiles</option>
                        <option value="chemicals">Chemicals</option>
                        <option value="food">Food & Beverages</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Timeline Graph */}
                  <div className="mt-8">
                    {/* Graph Container */}
                    <div className="relative h-80 border-b border-gray-200">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="border-t border-gray-100 w-full"></div>
                        ))}
                      </div>
                      
                      {/* X-axis Labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 pb-2">
                        {monthlyTimelineData.map((data, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm font-bold text-gray-500">{data.month}</div>
                          </div>
                        ))}
                      </div>

                      {/* Empty State Message */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-base font-bold text-gray-400">No data available for selected filters</p>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-end gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                        <span className="text-sm font-bold text-gray-600">Enquiries & Calls Received</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
                        <span className="text-sm font-bold text-gray-600">Buyleads Consumed</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRICE INSIGHTS VIEW */}
              {activePerformanceTab === 'insights' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {priceInsightsData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-bold text-indigo-600">{data.views}</span>
                              <div className="w-8 h-24 bg-indigo-100 mt-1 relative">
                                <div className="absolute bottom-0 w-full bg-indigo-500" style={{height: '0%'}}></div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-bold text-cyan-600">{data.enquiries}</span>
                              <div className="w-8 h-24 bg-cyan-100 mt-1 relative">
                                <div className="absolute bottom-0 w-full bg-cyan-500" style={{height: '0%'}}></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-sm font-bold text-gray-600">{data.period.split(' ')[0]}</div>
                            <div className="text-sm text-gray-500">{data.period.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph represents Price Trend Views vs Enquiries Generated</p>
                  </div>

                  {/* Price Insights Table */}
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200 w-48"></th>
                          {priceInsightsData.map((data, index) => (
                            <th key={index} className="text-center text-sm font-bold text-gray-700 py-3 px-2 border-b border-gray-200">
                              {data.period}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Views Row */}
                        <tr className="bg-white">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-indigo-500" />
                              Price Trend Views
                            </div>
                          </td>
                          {priceInsightsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.views}
                            </td>
                          ))}
                        </tr>
                        
                        {/* Enquiries Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-cyan-500" />
                              Enquiries Generated
                            </div>
                          </td>
                          {priceInsightsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-b border-gray-200">
                              {data.enquiries}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-end gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                      <span className="text-sm font-bold text-gray-600">Price Trend Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                      <span className="text-sm font-bold text-gray-600">Enquiries Generated</span>
                    </div>
                  </div>
                </>
              )}

              {/* CATALOG VIEWS VIEW */}
              {activePerformanceTab === 'views' && (
                <>
                  {/* Graph Area */}
                  <div className="mb-8">
                    <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-gray-200">
                      {catalogViewsData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <span className="text-base font-bold text-gray-900">{data.consumed} D</span>
                          <div className="w-px h-32 bg-gray-100"></div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-600 whitespace-pre-line leading-tight">
                              {data.shortPeriod}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">Graph represents unique days when Catalog Views were consumed</p>
                  </div>

                  {/* Catalog Views Table */}
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left text-sm font-bold text-gray-700 py-3 px-4 border-b border-gray-200 w-48 bg-white">
                            
                          </th>
                          {catalogViewsData.map((data, index) => (
                            <th key={index} className="text-center text-sm font-bold text-gray-700 py-3 px-2 border-b border-gray-200 bg-white">
                              {data.period}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Catalog Views Consumed Row */}
                        <tr className="bg-cyan-50">
                          <td className="text-sm font-bold text-gray-700 py-3 px-4 border-t-2 border-cyan-500">
                            Catalog Views Consumed
                          </td>
                          {catalogViewsData.map((data, index) => (
                            <td key={index} className="text-center text-sm font-bold text-gray-600 py-3 px-2 border-t-2 border-cyan-500 bg-cyan-50">
                              {data.consumed}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* Other tabs placeholder */}
              {!['all', 'buyleads', 'calls', 'leadmanager', 'reviews', 'filter', 'views', 'insights'].includes(activePerformanceTab) && (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500 text-base font-bold">
                    {performanceSubTabs.find(t => t.id === activePerformanceTab)?.label} content coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOCIAL TAB - Complete updated version */}
        {activeTab === 'social' && (
          <div className="bg-white pb-24">
            {/* Teal Header with IndiaMART Logo */}
            <div className="bg-[#00a699] py-6 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#00a699] font-bold text-2xl">M</span>
                </div>
                <span className="text-white text-2xl font-bold tracking-wide">indiamart</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto py-12 px-4">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                Select your social media account
              </h2>

              {/* Social Media Options */}
              <div className="max-w-2xl mx-auto space-y-4 mb-16">
                {/* Instagram */}
                <button className="w-full flex items-center justify-between p-4 border-2 border-purple-400 rounded-lg hover:bg-purple-50 transition-colors group bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">Instagram</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                </button>

                {/* YouTube */}
                <button className="w-full flex items-center justify-between p-4 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-colors group bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">YouTube</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </button>

                {/* Facebook */}
                <button className="w-full flex items-center justify-between p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors group bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">Facebook</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </button>
              </div>

              {/* Trust Badges Grid */}
              <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 mb-16">
                {/* Trusted by sellers */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="pt-2">
                    <p className="text-base font-semibold text-gray-800">Trusted by 35,000+ sellers</p>
                  </div>
                </div>

                {/* Youtube and Meta Verified */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="pt-2">
                    <p className="text-base font-semibold text-gray-800">Youtube and Meta Verified</p>
                  </div>
                </div>

                {/* Hassle Free Integration */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="pt-2">
                    <p className="text-base font-semibold text-gray-800">Hassle Free Integration</p>
                  </div>
                </div>

                {/* Increase buyer engagement */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <TrendingIcon className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="pt-2">
                    <p className="text-base font-semibold text-gray-800">Increase buyer engagement</p>
                  </div>
                </div>
              </div>

              {/* Learn How to Login Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Learn How to Login</h3>
                
                <div className="flex gap-8 items-start">
                  {/* Left Side - Mobile Screenshots */}
                  <div className="w-1/3 flex flex-col gap-4">
                    {/* Screenshot 1 */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-[200px]">
                      <div className="bg-[#00a699] px-3 py-2 flex items-center justify-between">
                        <span className="text-white text-xs font-bold">indiamart</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-600 mb-2">Select your social media account</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 border border-purple-300 rounded text-xs">
                            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
                            <span>Instagram</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 border border-red-300 rounded text-xs">
                            <div className="w-4 h-4 bg-red-600 rounded"></div>
                            <span>YouTube</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot 2 */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-[200px]">
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Shield className="w-3 h-3 text-green-600" />
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-500 space-y-1">
                          <p>Trusted by 35,000+...</p>
                          <p>Youtube and Meta...</p>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot 3 */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-[200px]">
                      <div className="bg-[#00a699] px-3 py-2">
                        <span className="text-white text-xs font-bold">indiamart</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-800 font-semibold mb-1">Join IndiaMART Now</p>
                        <p className="text-[10px] text-gray-500">Connect your account...</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Steps */}
                  <div className="flex-1 space-y-6 pt-4">
                    {/* Step 1 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Step 1</h4>
                      <p className="text-gray-600">Select the social media platform you want to connect</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Step 2</h4>
                      <p className="text-gray-600">Login to your social media account</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Step 3</h4>
                      <p className="text-gray-600">Authenticate IndiaMART to access your account</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Successfully Connected Sellers */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Successfully Connected Sellers</h3>
                
                <div className="grid grid-cols-4 gap-4">
                  {connectedSellers.map((seller, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={seller.image} 
                          alt={seller.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-semibold text-sm text-center">{seller.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-500 space-y-2">
                <div className="flex justify-center gap-4">
                  <button className="hover:text-gray-700 hover:underline">Privacy Policy</button>
                  <span>|</span>
                  <button className="hover:text-gray-700 hover:underline">Terms of Use</button>
                  <span>|</span>
                  <button className="hover:text-gray-700 hover:underline">FAQs</button>
                </div>
                <p>© 2025 IndiaMART. All rights reserved.</p>
              </div>
            </div>

            {/* Bottom Sticky Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#00a699] py-4 px-6">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h3 className="text-white text-xl font-bold">Join IndiaMART Videos Now!</h3>
                <div className="flex gap-3">
                  {/* Connect Instagram */}
                  <button className="flex items-center gap-2 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="url(#ig-gradient)">
                      <defs>
                        <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#833AB4" />
                          <stop offset="50%" stopColor="#E1306C" />
                          <stop offset="100%" stopColor="#F77737" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Connect Instagram</span>
                  </button>

                  {/* Connect YouTube */}
                  <button className="flex items-center gap-2 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Connect YouTube</span>
                  </button>

                  {/* Connect Facebook */}
                  <button className="flex items-center gap-2 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Connect Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}