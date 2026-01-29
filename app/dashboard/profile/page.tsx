'use client';
import React, { useState } from 'react';
import { Phone, Building2, Bell, HelpCircle, Store, Ticket, MapPin, Edit, Calendar, Star, ChevronRight, ShieldCheck, Check, X, CheckCircle, Pencil, MessageCircle, Headphones } from 'lucide-react';
import Link from 'next/link';

type FormType = 'contact' | 'company' | 'communication' | 'help' | null;

type ContactInfo = {
  primaryMobile: string;
  alternativeMobile: string;
  primaryEmail: string;
  alternativeEmail: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  houseNo: string;
  areaStreet: string;
  locality: string;
  landmark: string;
};

type CompanyInfo = {
  companyName: string;
  companyWebsite: string;
  gstin: string;
  pan: string;
  facebook: string;
  instagram: string;
  googleBusiness: string;
};

type CommunicationChannels = {
  email: boolean;
  sms: boolean;
  app: boolean;
};

type CommunicationSettings = {
  whatsappUpdates: boolean;
  primaryEmail: string;
  primarySMS: string;
  supplierDetails: CommunicationChannels;
  replyMessages: CommunicationChannels;
  feedbackEmails: CommunicationChannels;
  contactDetailsUpdate: CommunicationChannels;
};

type CardItem = {
  icon: any;
  title: string;
  desc: string;
  progress?: number;
  type?: FormType;
  link?: string;
};

const ProfileDashboard = () => {
  const [profileScore] = useState(5);
  const [completedFields] = useState(['Name', 'Alternative Mobile']);
  const [remainingFields] = useState(16);
  const [milestones] = useState({ completed: 1, total: 5, percentage: 20 });
  const [nextStep] = useState({ title: 'Company Name', unlock: 'Business Profile', step: 2 });
  const [location, setLocation] = useState('Please add location');
  const [membershipType] = useState('Member');
  const [ratingPeriod] = useState('This Month');
  const [contactProgress, setContactProgress] = useState(8);
  const [companyProgress, setCompanyProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [designation, setDesignation] = useState('Enter Designation');
  const [tempDesignation, setTempDesignation] = useState(designation);
  const [tempLocation, setTempLocation] = useState(location);
  const [openForm, setOpenForm] = useState<FormType>(null);
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    primaryMobile: '8989469347', alternativeMobile: '', primaryEmail: '', alternativeEmail: '',
    pinCode: '', city: '', state: '', country: 'India', houseNo: '', areaStreet: '', locality: '', landmark: ''
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: '', companyWebsite: '', gstin: '', pan: '',
    facebook: 'https://', instagram: 'https://', googleBusiness: 'https://'
  });

  const [communicationSettings, setCommunicationSettings] = useState<CommunicationSettings>({
    whatsappUpdates: false, primaryEmail: 'sweetritik...', primarySMS: '8518900153',
    supplierDetails: { email: true, sms: true, app: false },
    replyMessages: { email: true, sms: false, app: false },
    feedbackEmails: { email: false, sms: true, app: false },
    contactDetailsUpdate: { email: true, sms: false, app: true }
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
  
  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => 
    setContactInfo(prev => ({ ...prev, [field]: value }));
  
  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => 
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  
  const handleCardClick = (formType: FormType) => 
    setOpenForm(openForm === formType ? null : formType);
  
  const handleContactFormSave = () => {
    setOpenForm(null);
    const filled = Object.values(contactInfo).filter(v => v !== '' && v !== 'India').length;
    const total = Object.keys(contactInfo).length;
    setContactProgress(Math.round((filled / total) * 100));
  };
  
  const handleCompanyFormSave = () => {
    setOpenForm(null);
    const filled = Object.values(companyInfo).filter(v => v !== '' && v !== 'https://').length;
    const total = Object.keys(companyInfo).length;
    setCompanyProgress(Math.round((filled / total) * 100));
  };

  const handleCommunicationToggle = (category: keyof Omit<CommunicationSettings, 'whatsappUpdates' | 'primaryEmail' | 'primarySMS'>, channel: keyof CommunicationChannels) => {
    setCommunicationSettings(prev => ({
      ...prev, 
      [category]: { 
        ...prev[category], 
        [channel]: !prev[category][channel] 
      }
    }));
  };

  const handleWhatsAppToggle = () => 
    setCommunicationSettings(prev => ({ ...prev, whatsappUpdates: !prev.whatsappUpdates }));

  const cardItems: CardItem[] = [
    { icon: Phone, title: 'Contact Information', desc: 'Edit phone, email & address', progress: contactProgress, type: 'contact' },
    { icon: Building2, title: 'Company Details', desc: 'Edit company & tax info', progress: companyProgress, type: 'company' },
    { icon: Bell, title: 'Communication Settings', desc: 'Manage notifications', type: 'communication' },
    { icon: HelpCircle, title: 'Help', desc: 'Get support & assistance', type: 'help' },
    { icon: Store, title: 'Sell on IndiaMART', desc: 'Start selling your products' },
    { icon: Ticket, title: 'Raise request to update', desc: 'Create a ticket to update Profile Details', link: '/dashboard/mytickets' }
  ];

  const contactFormFields = [
    { label: 'Primary Mobile', field: 'primaryMobile' as keyof ContactInfo, verified: true, bg: 'bg-gray-200' },
    { label: 'Alternative Mobile', field: 'alternativeMobile' as keyof ContactInfo, placeholder: 'Enter alternative mobile' },
    { label: 'Primary Email', field: 'primaryEmail' as keyof ContactInfo, placeholder: 'Enter primary email' },
    { label: 'Alternative Email', field: 'alternativeEmail' as keyof ContactInfo, placeholder: 'Enter alternative email', bg: 'bg-gray-200' },
    { label: 'PIN Code', field: 'pinCode' as keyof ContactInfo, placeholder: 'Enter PIN code' },
    { label: 'City', field: 'city' as keyof ContactInfo, placeholder: 'Enter city', bg: 'bg-gray-200' },
    { label: 'State', field: 'state' as keyof ContactInfo, placeholder: 'Enter state', bg: 'bg-gray-200' },
    { label: 'Country', field: 'country' as keyof ContactInfo, bg: 'bg-gray-200' },
    { label: 'House No./Block', field: 'houseNo' as keyof ContactInfo, placeholder: 'Enter house no./block' },
    { label: 'Area/Street', field: 'areaStreet' as keyof ContactInfo, placeholder: 'Enter area/street' },
    { label: 'Locality', field: 'locality' as keyof ContactInfo, placeholder: 'Enter locality' },
    { label: 'Landmark', field: 'landmark' as keyof ContactInfo, placeholder: 'Enter landmark' }
  ];

  const companyFormFields = [
    { label: 'Company Name', field: 'companyName' as keyof CompanyInfo, placeholder: 'Enter company name' },
    { label: 'Company Website', field: 'companyWebsite' as keyof CompanyInfo, placeholder: 'Enter website URL' },
    { label: 'GSTIN', field: 'gstin' as keyof CompanyInfo, placeholder: 'Enter GSTIN' },
    { label: 'PAN', field: 'pan' as keyof CompanyInfo, placeholder: 'Enter PAN' },
    { label: 'Facebook', field: 'facebook' as keyof CompanyInfo },
    { label: 'Instagram', field: 'instagram' as keyof CompanyInfo },
    { label: 'Google Business', field: 'googleBusiness' as keyof CompanyInfo, span: 2 }
  ];

  const communicationRows = [
    { 
      title: 'Supplier details for your requirement', 
      desc: 'If turned off, you will no longer receive supplier contact details.', 
      recommended: true, 
      category: 'supplierDetails' as keyof Omit<CommunicationSettings, 'whatsappUpdates' | 'primaryEmail' | 'primarySMS'>, 
      channels: ['email', 'sms', 'app'] as (keyof CommunicationChannels | null)[]
    },
    { 
      title: 'Reply Messages for any requirement', 
      desc: 'If turned off, you will stop receiving reply messages from buyer/supplier.', 
      recommended: true, 
      category: 'replyMessages' as keyof Omit<CommunicationSettings, 'whatsappUpdates' | 'primaryEmail' | 'primarySMS'>, 
      channels: ['email', null, null] as (keyof CommunicationChannels | null)[]
    },
    { 
      title: 'Feedback E-mails', 
      desc: 'Feedback for your requirement.', 
      category: 'feedbackEmails' as keyof Omit<CommunicationSettings, 'whatsappUpdates' | 'primaryEmail' | 'primarySMS'>, 
      channels: ['email', 'sms', null] as (keyof CommunicationChannels | null)[]
    },
    { 
      title: 'Contact Details Update', 
      desc: 'Get updates whenever you modify your personal details.', 
      category: 'contactDetailsUpdate' as keyof Omit<CommunicationSettings, 'whatsappUpdates' | 'primaryEmail' | 'primarySMS'>, 
      channels: ['email', null, 'app'] as (keyof CommunicationChannels | null)[]
    }
  ];

  const helpSupportItems = [
    {
      title: 'Customer Support',
      description: 'Call us at: 096-9696-9696',
      icon: Headphones,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'FAQs',
      description: 'Find answers to common questions',
      icon: HelpCircle,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200'
    }
  ];

  const CardContent = ({ card, idx }: { card: CardItem; idx: number }) => (
    <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
            <card.icon className="w-6 h-6 text-gray-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-black mb-2 text-base">{card.title}</h3>
            <p className="text-xs text-gray-600">{card.desc}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
      {card.progress !== undefined && (
        <div className="relative pt-1">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${idx === 0 ? 'bg-red-600' : 'bg-gray-300'}`}
              style={{ width: `${card.progress}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1 absolute right-0 -top-5">
            <span className="text-xs font-medium text-black">{card.progress}%</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#e5e5e5" strokeWidth="12" fill="none" />
                  <circle cx="56" cy="56" r="48" stroke="#f97316" strokeWidth="12" fill="none"
                    strokeDasharray={`${2 * Math.PI * 48 * (profileScore / 100)} ${2 * Math.PI * 48}`} strokeLinecap="round" />
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
            <div className="relative mb-8 mt-2">
              <div className="h-2 bg-gray-300 rounded-full">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-300 relative" style={{ width: `${milestones.percentage}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-amber-400 rounded-full border-4 border-white"
                style={{ left: `${Math.min(milestones.percentage + 25, 100)}%` }}></div>
            </div>
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
                  Complete Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          {!isEditing ? (
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div>
                  <button onClick={handleEditClick}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mb-3 bg-blue-50 px-4 py-2 rounded-md text-sm">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" /> <span>{location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Calendar className="w-4 h-4" /> <span>{membershipType}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> <span>Rating</span>
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
                    <button onClick={handleSave} className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={handleCancel} className="w-10 h-10 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md flex items-center justify-center transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={tempDesignation} 
                    onChange={(e) => setTempDesignation(e.target.value)} 
                    placeholder="Enter Designation"
                    className="w-full px-0 py-1 text-sm text-gray-900 border-b border-gray-300 outline-none focus:border-blue-600 bg-transparent" 
                  />
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <input 
                      type="text" 
                      value={tempLocation} 
                      onChange={(e) => setTempLocation(e.target.value)} 
                      placeholder="Please add location"
                      className="flex-1 px-0 py-1 text-sm text-gray-600 border-b border-gray-300 outline-none focus:border-blue-600 bg-transparent min-w-[200px]" 
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Calendar className="w-4 h-4" /> <span>{membershipType}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> <span>Rating</span>
                </div>
                <div className="text-black font-bold text-sm">{ratingPeriod}</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardItems.map((card, idx) => {
            // If card has a link, wrap with Link component
            if (card.link) {
              return (
                <Link 
                  key={idx}
                  href={card.link}
                  className="block no-underline hover:no-underline"
                >
                  <CardContent card={card} idx={idx} />
                </Link>
              );
            }
            
            // If card has a type (opens modal), use onClick
            return (
              <div 
                key={idx}
                onClick={() => card.type && handleCardClick(card.type)}
              >
                <CardContent card={card} idx={idx} />
              </div>
            );
          })}
        </div>

        {openForm === 'contact' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Contact Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactFormFields.map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={contactInfo[item.field]} 
                        placeholder={item.placeholder}
                        onChange={(e) => handleContactInfoChange(item.field, e.target.value)}
                        className={`w-full px-4 py-2 ${item.bg || 'bg-white'} border border-gray-300 rounded-md outline-none focus:border-blue-600 ${item.verified ? 'pr-20' : ''}`} 
                      />
                      {item.verified && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setOpenForm(null)} 
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

        {openForm === 'company' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Company Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companyFormFields.map((item, idx) => (
                  <div key={idx} className={item.span ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                    <input 
                      type="text" 
                      value={companyInfo[item.field]} 
                      placeholder={item.placeholder}
                      onChange={(e) => handleCompanyInfoChange(item.field, e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-600" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setOpenForm(null)} 
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

        {openForm === 'help' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Help & Support</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {helpSupportItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`${item.bgColor} rounded-lg border ${item.borderColor} p-6 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${item.bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border ${item.borderColor}`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-black text-base mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <button className={`w-full py-3 ${item.bgColor} hover:opacity-90 ${item.iconColor} font-medium rounded-lg transition-colors text-sm border ${item.borderColor}`}>
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setOpenForm(null)} 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {openForm === 'communication' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-black">Communication Settings</h2>
            </div>
            <div className="p-6">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={communicationSettings.whatsappUpdates} 
                    onChange={handleWhatsAppToggle}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <span className="text-sm font-medium text-gray-900">Also get updates on WhatsApp 📱</span>
                </label>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm">Manage Your Settings for Important Alerts</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm">
                        <div>Email</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          Primary<br/>{communicationSettings.primaryEmail}
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm">
                        <div>SMS</div>
                        <div className="text-xs font-normal text-gray-600 mt-1">
                          Primary<br/>{communicationSettings.primarySMS}
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-900 text-sm">APP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communicationRows.map((row, idx) => (
                      <tr key={idx} className={idx < 3 ? 'border-b border-gray-200' : ''}>
                        <td className="py-6 px-4">
                          <div>
                            <div className="font-medium text-gray-900 text-sm mb-1">
                              {row.title} {row.recommended && <span className="text-red-600 ml-1">(recommended)</span>}
                            </div>
                            <div className="text-xs text-gray-600">{row.desc}</div>
                          </div>
                        </td>
                        {row.channels.map((channel, cidx) => (
                          <td key={cidx} className="py-6 px-4 text-center">
                            {channel ? (
                              <button 
                                onClick={() => handleCommunicationToggle(row.category, channel)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  communicationSettings[row.category][channel] ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                              >
                                <span 
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    communicationSettings[row.category][channel] ? 'translate-x-6' : 'translate-x-1'
                                  }`} 
                                />
                              </button>
                            ) : <span className="text-gray-400">-</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setOpenForm(null)} 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setOpenForm(null)} 
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