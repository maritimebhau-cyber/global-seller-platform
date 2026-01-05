'use client';
import React, { useState } from 'react';
import { 
  Phone, 
  Building2, 
  Bell, 
  HelpCircle, 
  Store, 
  Ticket,
  MapPin,
  Edit,
  Calendar,
  Star,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  CheckCircle,
  Pencil
} from 'lucide-react';

type FormType = 'contact' | 'company' | null;

const ProfileDashboard: React.FC = () => {
  const [profileScore, setProfileScore] = useState(5);
  const [completedFields, setCompletedFields] = useState(['Name', 'Alternative Mobile']);
  const [remainingFields, setRemainingFields] = useState(16);
  const [milestones, setMilestones] = useState({ completed: 1, total: 5, percentage: 20 });
  const [nextStep, setNextStep] = useState({
    title: 'Company Name',
    unlock: 'Business Profile',
    step: 2
  });
  const [location, setLocation] = useState('Please add location');
  const [membershipType, setMembershipType] = useState('Member');
  const [ratingPeriod, setRatingPeriod] = useState('This Month');
  const [contactProgress, setContactProgress] = useState(8);
  const [companyProgress, setCompanyProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [designation, setDesignation] = useState('Enter Designation');
  const [tempDesignation, setTempDesignation] = useState(designation);
  const [tempLocation, setTempLocation] = useState(location);
  const [openForm, setOpenForm] = useState<FormType>(null);
  
  const [contactInfo, setContactInfo] = useState({
    primaryMobile: '8989469347',
    alternativeMobile: '',
    primaryEmail: '',
    alternativeEmail: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
    houseNo: '',
    areaStreet: '',
    locality: '',
    landmark: ''
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    companyWebsite: '',
    gstin: '',
    pan: '',
    facebook: 'https://',
    instagram: 'https://',
    googleBusiness: 'https://'
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setTempDesignation(designation);
    setTempLocation(location);
  };

  const handleSave = () => {
    setDesignation(tempDesignation);
    setLocation(tempLocation);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDesignation(designation);
    setTempLocation(location);
    setIsEditing(false);
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleContactFormSave = () => {
    setOpenForm(null);
    // Calculate new progress based on filled fields
    const filledFields = Object.values(contactInfo).filter(val => val !== '').length;
    const totalFields = Object.keys(contactInfo).length;
    const newProgress = Math.round((filledFields / totalFields) * 100);
    setContactProgress(newProgress);
  };

  const handleContactFormCancel = () => {
    setOpenForm(null);
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyFormSave = () => {
    setOpenForm(null);
    // Calculate new progress based on filled fields
    const filledFields = Object.values(companyInfo).filter(val => val !== '' && val !== 'https://').length;
    const totalFields = Object.keys(companyInfo).length;
    const newProgress = Math.round((filledFields / totalFields) * 100);
    setCompanyProgress(newProgress);
  };

  const handleCompanyFormCancel = () => {
    setOpenForm(null);
  };

  const handleCardClick = (formType: FormType) => {
    setOpenForm(openForm === formType ? null : formType);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Score Card */}
          <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#e5e5e5" strokeWidth="12" fill="none" />
                  <circle cx="56" cy="56" r="48" stroke="#f97316" strokeWidth="12" fill="none"
                    strokeDasharray={`${2 * Math.PI * 48 * (profileScore / 100)} ${2 * Math.PI * 48}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-800">{profileScore}%</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0 pt-2">
                <h2 className="text-xl font-bold text-black mb-2">Profile Score</h2>
                <p className="text-gray-600 text-sm mb-6">Complete your profile to get more visibility</p>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {completedFields.map((field, idx) => (
                      <span key={idx} className="text-black">{field}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-800 font-semibold text-sm">+{remainingFields} more fields</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unlock Verified Badge Card */}
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-orange-900">Unlock Verified Badge</h2>
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>{milestones.completed}/{milestones.total} milestones • {milestones.percentage}% complete</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-blue-300 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-8 mt-2">
              <div className="h-2 bg-gray-300 rounded-full">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-300 relative"
                  style={{ width: `${milestones.percentage}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-amber-400 rounded-full border-4 border-white"
                style={{ left: `${Math.min(milestones.percentage + 25, 100)}%` }}></div>
            </div>

            {/* Next Step */}
            <div className="bg-white rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-black text-sm">Next: {nextStep.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Unlock: {nextStep.unlock}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                <span className="text-xs font-semibold text-blue-500">Step {nextStep.step}/5</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap">
                  Complete Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          {!isEditing ? (
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div>
                  <button onClick={handleEditClick}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mb-3 bg-blue-50 px-4 py-2 rounded-md text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{membershipType}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Rating</span>
                </div>
                <div className="text-black font-bold text-sm">{ratingPeriod}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <button onClick={handleSave}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={handleCancel}
                      className="w-10 h-10 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md flex items-center justify-center transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <input type="text" value={tempDesignation} onChange={(e) => setTempDesignation(e.target.value)}
                    placeholder="Enter Designation"
                    className="w-full px-0 py-1 text-sm text-gray-900 border-b border-gray-300 outline-none focus:border-blue-600 bg-transparent" />
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <input type="text" value={tempLocation} onChange={(e) => setTempLocation(e.target.value)}
                      placeholder="Please add location"
                      className="flex-1 px-0 py-1 text-sm text-gray-600 border-b border-gray-300 outline-none focus:border-blue-600 bg-transparent min-w-[200px]" />
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{membershipType}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Rating</span>
                </div>
                <div className="text-black font-bold text-sm">{ratingPeriod}</div>
              </div>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div onClick={() => handleCardClick('contact')}
            className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Contact Information</h3>
                  <p className="text-xs text-gray-600">Edit phone, email & address</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
            <div className="relative pt-1">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full transition-all"
                  style={{ width: `${contactProgress}%` }}></div>
              </div>
              <div className="flex items-center gap-1 absolute right-0 -top-5">
                <span className="text-xs font-medium text-black">{contactProgress}%</span>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div onClick={() => handleCardClick('company')}
            className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Company Details</h3>
                  <p className="text-xs text-gray-600">Edit company & tax info</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
            <div className="relative pt-1">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-300 rounded-full transition-all"
                  style={{ width: `${companyProgress}%` }}></div>
              </div>
              <div className="flex items-center gap-1 absolute right-0 -top-5">
                <span className="text-xs font-medium text-black">{companyProgress}%</span>
              </div>
            </div>
          </div>

          {/* Communication Settings */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bell className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Communication Settings</h3>
                  <p className="text-xs text-gray-600">Manage notifications</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Help */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Help</h3>
                  <p className="text-xs text-gray-600">Get support & assistance</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Sell on IndiaMART */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Store className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Sell on IndiaMART</h3>
                  <p className="text-xs text-gray-600">Start selling your products</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Raise request to update */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Ticket className="w-6 h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-black mb-2 text-base">Raise request to update</h3>
                  <p className="text-xs text-gray-600">Create a ticket to update Profile Details</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Contact Information Form - Opens Below */}
        {openForm === 'contact' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Contact Information</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Mobile
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={contactInfo.primaryMobile}
                      onChange={(e) => handleContactInfoChange('primaryMobile', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:border-blue-600 pr-20"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Pencil className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Mobile
                  </label>
                  <input
                    type="text"
                    placeholder="Enter alternative mobile"
                    value={contactInfo.alternativeMobile}
                    onChange={(e) => handleContactInfoChange('alternativeMobile', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter primary email"
                    value={contactInfo.primaryEmail}
                    onChange={(e) => handleContactInfoChange('primaryEmail', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter alternative email"
                    value={contactInfo.alternativeEmail}
                    onChange={(e) => handleContactInfoChange('alternativeEmail', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    value={contactInfo.pinCode}
                    onChange={(e) => handleContactInfoChange('pinCode', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={contactInfo.city}
                    onChange={(e) => handleContactInfoChange('city', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Enter state"
                    value={contactInfo.state}
                    onChange={(e) => handleContactInfoChange('state', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={contactInfo.country}
                    onChange={(e) => handleContactInfoChange('country', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    House No./Block
                  </label>
                  <input
                    type="text"
                    placeholder="Enter house no./block"
                    value={contactInfo.houseNo}
                    onChange={(e) => handleContactInfoChange('houseNo', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area/Street
                  </label>
                  <input
                    type="text"
                    placeholder="Enter area/street"
                    value={contactInfo.areaStreet}
                    onChange={(e) => handleContactInfoChange('areaStreet', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locality
                  </label>
                  <input
                    type="text"
                    placeholder="Enter locality"
                    value={contactInfo.locality}
                    onChange={(e) => handleContactInfoChange('locality', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="Enter landmark"
                    value={contactInfo.landmark}
                    onChange={(e) => handleContactInfoChange('landmark', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleContactFormCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleContactFormSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Company Details Form - Opens Below */}
        {openForm === 'company' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Company Details</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={companyInfo.companyName}
                    onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="text"
                    placeholder="Enter website URL"
                    value={companyInfo.companyWebsite}
                    onChange={(e) => handleCompanyInfoChange('companyWebsite', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    placeholder="Enter GSTIN"
                    value={companyInfo.gstin}
                    onChange={(e) => handleCompanyInfoChange('gstin', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PAN"
                    value={companyInfo.pan}
                    onChange={(e) => handleCompanyInfoChange('pan', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={companyInfo.facebook}
                    onChange={(e) => handleCompanyInfoChange('facebook', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={companyInfo.instagram}
                    onChange={(e) => handleCompanyInfoChange('instagram', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Business
                  </label>
                  <input
                    type="text"
                    value={companyInfo.googleBusiness}
                    onChange={(e) => handleCompanyInfoChange('googleBusiness', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCompanyFormCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompanyFormSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;