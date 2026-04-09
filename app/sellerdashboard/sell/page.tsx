'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import {
  ArrowRight,
  TrendingUp,
  IndianRupee,
  Package,
  Users,
  Building2,
  Boxes,
  UserPlus,
  Building,
  PlusCircle,
  MousePointer2,
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  LayoutGrid,
  HelpCircle,
  TrendingUp as TrendingUpIcon,
  MessageSquare,
  PhoneIncoming,
} from 'lucide-react';
import Image from 'next/image';
import Select from 'react-select';
import { IN, US, GB, CA, AU, DE, FR, IT, ES, NL, SG, AE, SA, CN, JP, KR, BR, MX, RU, ZA } from 'country-flag-icons/react/3x2';

type Brand = {
  name: string;
  logo: string;
  bgColor: string;
};

type Category = {
  name: string;
  image: string;
};

type CountryOption = {
  value: string;
  label: string;
  flag: React.ReactNode;
  code: string;
  dialCode: string;
};

export default function SellOnIndiaMART() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mapError, setMapError] = useState(false);
  const [failedBrandLogos, setFailedBrandLogos] = useState<Record<string, boolean>>({});
  const [failedCategoryImages, setFailedCategoryImages] = useState<Record<string, boolean>>({});
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [mounted, setMounted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sellScrollRef = useRef<HTMLDivElement>(null);
  const brandsScrollRef = useRef<HTMLDivElement>(null);

  // Fix for Next.js - ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const countries: CountryOption[] = useMemo(
    () => [
      { value: 'IN', label: 'India', flag: <IN className="h-5 w-5" />, code: 'IN', dialCode: '+91' },
      { value: 'US', label: 'United States', flag: <US className="h-5 w-5" />, code: 'US', dialCode: '+1' },
      { value: 'GB', label: 'United Kingdom', flag: <GB className="h-5 w-5" />, code: 'GB', dialCode: '+44' },
      { value: 'CA', label: 'Canada', flag: <CA className="h-5 w-5" />, code: 'CA', dialCode: '+1' },
      { value: 'AU', label: 'Australia', flag: <AU className="h-5 w-5" />, code: 'AU', dialCode: '+61' },
      { value: 'DE', label: 'Germany', flag: <DE className="h-5 w-5" />, code: 'DE', dialCode: '+49' },
      { value: 'FR', label: 'France', flag: <FR className="h-5 w-5" />, code: 'FR', dialCode: '+33' },
      { value: 'IT', label: 'Italy', flag: <IT className="h-5 w-5" />, code: 'IT', dialCode: '+39' },
      { value: 'ES', label: 'Spain', flag: <ES className="h-5 w-5" />, code: 'ES', dialCode: '+34' },
      { value: 'NL', label: 'Netherlands', flag: <NL className="h-5 w-5" />, code: 'NL', dialCode: '+31' },
      { value: 'SG', label: 'Singapore', flag: <SG className="h-5 w-5" />, code: 'SG', dialCode: '+65' },
      { value: 'AE', label: 'UAE', flag: <AE className="h-5 w-5" />, code: 'AE', dialCode: '+971' },
      { value: 'SA', label: 'Saudi Arabia', flag: <SA className="h-5 w-5" />, code: 'SA', dialCode: '+966' },
      { value: 'CN', label: 'China', flag: <CN className="h-5 w-5" />, code: 'CN', dialCode: '+86' },
      { value: 'JP', label: 'Japan', flag: <JP className="h-5 w-5" />, code: 'JP', dialCode: '+81' },
      { value: 'KR', label: 'South Korea', flag: <KR className="h-5 w-5" />, code: 'KR', dialCode: '+82' },
      { value: 'BR', label: 'Brazil', flag: <BR className="h-5 w-5" />, code: 'BR', dialCode: '+55' },
      { value: 'MX', label: 'Mexico', flag: <MX className="h-5 w-5" />, code: 'MX', dialCode: '+52' },
      { value: 'RU', label: 'Russia', flag: <RU className="h-5 w-5" />, code: 'RU', dialCode: '+7' },
      { value: 'ZA', label: 'South Africa', flag: <ZA className="h-5 w-5" />, code: 'ZA', dialCode: '+27' },
    ],
    []
  );

  // Set default country to India
  useMemo(() => {
    if (!selectedCountry) {
      setSelectedCountry(countries[0]);
    }
  }, [countries, selectedCountry]);

  const navItems = useMemo(
    () => [
      'Sell on IndiaMART',
      'How to Register',
      'Success Stories',
      'What can you sell',
      'IndiaMART Advantage',
    ],
    []
  );

  const statistics = useMemo(
    () => [
      {
        icon: <Users className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        value: '21.9 crore+',
        label: 'Buyers',
      },
      {
        icon: <Building2 className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        value: '86 lakh+',
        label: 'Suppliers',
      },
      {
        icon: <Boxes className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        value: '12.4 crore+',
        label: 'Products & Services',
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: <TrendingUp className="h-16 w-16 text-blue-600" strokeWidth={1.2} />,
        title: 'Grow your Business',
        description: 'Sell to buyers anytime, anywhere',
      },
      {
        icon: <IndianRupee className="h-16 w-16 text-blue-600" strokeWidth={1.2} />,
        title: 'Zero Cost',
        description: 'No commission or transaction fee',
      },
      {
        icon: <Package className="h-16 w-16 text-blue-600" strokeWidth={1.2} />,
        title: 'Manage Business Easily',
        description: 'Lead management system & other features',
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        icon: <UserPlus className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        title: 'Create Account',
        description: 'Add your name and phone number to get started',
      },
      {
        icon: <Building className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        title: 'Add Business',
        description: 'Add name, address & e-mail of your company',
      },
      {
        icon: <PlusCircle className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
        title: 'Add Products',
        description: 'Add products/services you want to sell',
      },
    ],
    []
  );

  const successStories = useMemo(
    () => [
      {
        id: 1,
        quote:
          '"I remember my father once asked, why are we spending so much on IndiaMART, but when he saw the ROI, his trust in online presence & this investment increased 10 folds"',
        name: 'Mr. Varun Malu',
        role: 'Owner',
        company: 'Moorti Mahal',
      },
      {
        id: 2,
        quote:
          '"Indiamart is the best known B2B marketplace and has been the main source of lead generation for A&D."',
        name: 'Mr Khushal Sachania',
        role: 'Marketing Manager of A&D Instruments',
        company: 'A&D Instruments India Pvt. Ltd',
      },
      {
        id: 3,
        quote: '"We have now developed a massive chain of buyers via IndiaMART."',
        name: 'Mr. Ali Imran Naqvi',
        role: 'Co-owner',
        company: 'New Arts Structures Private Limited',
      },
    ],
    []
  );

  const trustedBrands: Brand[] = useMemo(
    () => [
      {
        name: 'Dell',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1200px-Dell_Logo.svg.png',
        bgColor: '#007DB8',
      },
      {
        name: 'StanleyBlack&Decker',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Stanley_Black_%26_Decker_logo.svg/1200px-Stanley_Black_%26_Decker_logo.svg.png',
        bgColor: '#FFD700',
      },
      {
        name: 'GE',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/1200px-General_Electric_logo.svg.png',
        bgColor: '#FFFFFF',
      },
      {
        name: 'TAFE',
        logo: 'https://www.tafecorp.com/images/tafe-logo.png',
        bgColor: '#FFFFFF',
      },
      {
        name: 'HILTI',
        logo: 'https://upload.wikimedia.org/wikipedia/compat/wikipedia/commons/thumb/6/6e/Hilti_logo.svg/1200px-Hilti_logo.svg.png',
        bgColor: '#DC2626',
      },
      {
        name: 'Bosch',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/1200px-Bosch-logo.svg.png',
        bgColor: '#FFFFFF',
      },
      {
        name: 'Siemens',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/1200px-Siemens-logo.svg.png',
        bgColor: '#009999',
      },
      {
        name: '3M',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/3M_logo.svg/1200px-3M_logo.svg.png',
        bgColor: '#FFFFFF',
      },
    ],
    []
  );

  const sellCategories: Category[] = useMemo(
    () => [
      {
        name: 'Fashion Accessories & Gear',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
      },
      {
        name: 'Herbal & Ayurvedic Product',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
      },
      {
        name: 'Security Systems & Services',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
      },
      {
        name: 'Sports Goods, Toys & Games',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
      },
      {
        name: 'Telecom Equipment & Goods',
        image: 'https://images.unsplash.com/photo-1451187983305-f615310e7daa?w=400&h=400&fit=crop',
      },
      {
        name: 'Leather Products',
        image: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=400&h=400&fit=crop',
      },
      {
        name: 'Electronics Components',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      },
      {
        name: 'Electrical Equipment',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop',
      },
    ],
    []
  );

  const improveBusinessFeatures = useMemo(
    () => [
      {
        icon: <LayoutGrid className="h-10 w-10 text-cyan-600" strokeWidth={1.5} />,
        title: 'Higher Visibility',
        description:
          'Get higher listing on IndiaMART, appear on top of search results and improve the chances of acquiring more customers.',
      },
      {
        icon: <HelpCircle className="h-10 w-10 text-cyan-600" strokeWidth={1.5} />,
        title: 'More Business Enquiries',
        description:
          'Direct enquiries for your products/services sent to you by buyers looking for them.',
      },
      {
        icon: <TrendingUpIcon className="h-10 w-10 text-cyan-600" strokeWidth={1.5} />,
        title: 'Additional Leads',
        description:
          'Choose from a list of verified orders for products/services you want to sell.',
      },
    ],
    []
  );

  const productivityTools = useMemo(
    () => [
      {
        icon: <MessageSquare className="h-10 w-10 text-cyan-600" strokeWidth={1.5} />,
        title: 'Lead Manager (Desktop & App)',
        description:
          'A CRM solution to organise, manage and track all your leads and enquiries at one place.',
      },
      {
        icon: <PhoneIncoming className="h-10 w-10 text-cyan-600" strokeWidth={1.5} />,
        title: 'Preferred Number Service',
        description:
          'A cloud telephony service that lets you connect your 8 phone numbers, which ring simultaneously for each buyer call to ensure no call is missed.',
      },
    ],
    []
  );

  const validatePhone = (value: string, countryCode: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    
    const minLengths: Record<string, number> = {
      'IN': 10,
      'US': 10,
      'GB': 10,
      'CA': 10,
      'AU': 9,
      'DE': 10,
      'FR': 9,
      'IT': 10,
      'ES': 9,
      'NL': 9,
      'SG': 8,
      'AE': 9,
      'SA': 9,
      'CN': 11,
      'JP': 10,
      'KR': 10,
      'BR': 11,
      'MX': 10,
      'RU': 10,
      'ZA': 9,
    };
    
    const minLength = minLengths[countryCode] || 8;
    return digitsOnly.length >= minLength;
  };

  const handleLogin = () => {
    if (!selectedCountry) {
      setError('Please select a country');
      return;
    }
    
    if (!validatePhone(phone, selectedCountry.code)) {
      setError(`Please enter a valid phone number for ${selectedCountry.label}`);
      return;
    }

    setError('');
    console.log('Login with:', selectedCountry.dialCode, phone);
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    setPhone(digitsOnly);

    if (error) {
      setError('');
    }
  };

  const handleCountryChange = (option: CountryOption | null) => {
    setSelectedCountry(option);
    setPhone('');
    if (error) {
      setError('');
    }
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    setCurrentSlide((prev) => Math.min(successStories.length - 1, prev + 1));
  };

  const goToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({ left: index * 400, behavior: 'smooth' });
    setCurrentSlide(index);
  };

  const scrollSellLeft = () => {
    if (!sellScrollRef.current) return;
    sellScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollSellRight = () => {
    if (!sellScrollRef.current) return;
    sellScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollBrandsLeft = () => {
    if (!brandsScrollRef.current) return;
    brandsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollBrandsRight = () => {
    if (!brandsScrollRef.current) return;
    brandsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleBrandImageError = (brandName: string) => {
    setFailedBrandLogos((prev) => ({ ...prev, [brandName]: true }));
  };

  const handleCategoryImageError = (categoryName: string) => {
    setFailedCategoryImages((prev) => ({ ...prev, [categoryName]: true }));
  };

  // Custom styles for react-select - FIXED with menuPortalTarget
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: '46px',
      height: '46px',
      borderRadius: '0.5rem 0 0 0.5rem',
      border: '1px solid #d1d5db',
      borderRight: 'none',
      backgroundColor: '#f9fafb',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '0 8px',
    }),
    singleValue: (base: any) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: 0,
    }),
    option: (base: any, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#eff6ff' : 'white',
      color: '#111827',
      cursor: 'pointer',
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: '0 8px',
      color: '#6b7280',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  // Custom option renderer - handles both menu and value contexts
  const formatOptionLabel = (option: CountryOption, { context }: { context: 'menu' | 'value' }) => {
    if (context === 'value') {
      // Compact display for selected value
      return (
        <div className="flex items-center gap-2">
          {option.flag}
          <span className="text-sm font-medium text-gray-700">{option.dialCode}</span>
        </div>
      );
    }
    // Detailed display for dropdown menu
    return (
      <div className="flex items-center gap-2">
        {option.flag}
        <span className="text-sm font-medium">{option.dialCode}</span>
        <span className="text-xs text-gray-500 ml-1">({option.label})</span>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/images/backgroundimage.jpg')",
      }}
    >
      <nav className="fixed top-14 z-40 w-full border-b border-gray-200/50 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center">
            <div className="scrollbar-hide flex items-center space-x-6 overflow-x-auto">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    index === 0 ? 'text-blue-900' : 'text-blue-900 hover:text-blue-700'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-24" />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 rounded-2xl bg-white/70 p-8 shadow-sm backdrop-blur-sm">
              <div>
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  Sell for free on India's largest
                  <br />
                  online B2B marketplace
                </h1>
              </div>

              <div>
                <p className="mb-4 text-xl font-medium text-gray-700">Free Registration/Sign In</p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex-1">
                    <div className="flex h-[46px] w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                      {/* Country Dropdown with Flag - FIXED with menuPortalTarget */}
                      <div className="flex-shrink-0">
                        {mounted && (
                          <Select<CountryOption>
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            options={countries}
                            formatOptionLabel={formatOptionLabel}
                            styles={customSelectStyles}
                            isSearchable={false}
                            className="w-[140px]"
                            classNamePrefix="country-select"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            maxMenuHeight={200}
                          />
                        )}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={`Enter phone number`}
                        className="h-full w-full px-4 text-base outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogin}
                    className="flex h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-l-lg rounded-r-lg bg-teal-500 px-8 py-3 font-medium text-white transition-colors hover:bg-teal-600 sm:rounded-l-none"
                  >
                    Login
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {error && <p className="mt-2 text-sm font-medium text-orange-500">{error}</p>}
              </div>

              <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.title} className="group text-center">
                    <div className="mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {statistics.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <h3 className="mb-2 text-2xl font-bold text-blue-600">{stat.value}</h3>
                <p className="font-medium text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-white/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-colors hover:bg-white/90"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-blue-600">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-white drop-shadow-md">
            Get a free listing in 3 simple steps
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-lg border border-white/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50/80">
                    {step.icon}
                  </div>
                </div>
                <div className="mb-2 text-sm font-semibold text-blue-600">Step {index + 1}</div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="relative">
                <MousePointer2 className="-rotate-12 text-blue-600" strokeWidth={2} size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Start selling for free. It only takes 5 minutes.
              </h2>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 whitespace-nowrap rounded bg-teal-500 px-8 py-3 font-medium text-white transition-colors hover:bg-teal-600"
            >
              Register
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white drop-shadow-md">
            Seller Success Stories
          </h2>

          <div className="relative">
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 md:flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 md:flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              ref={scrollContainerRef}
              className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="min-w-[300px] flex-shrink-0 rounded-lg border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm md:w-[calc(33.333%-1rem)] md:min-w-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="group relative mb-4 aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <span className="text-xs font-bold text-red-600">IM</span>
                      </div>
                      <div className="text-xs text-white">
                        <div className="font-semibold">Customer Story | IndiaMART |</div>
                        <div className="text-gray-300">Marinemart Ltd</div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-red-600 shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded bg-black/70 px-3 py-1.5">
                      <span className="text-xs text-white">Watch on</span>
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3 fill-red-500 text-red-500" />
                        <span className="text-xs font-medium text-white">YouTube</span>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-gray-700">{story.quote}</p>

                  <div>
                    <p className="font-bold text-gray-900">{story.name}</p>
                    <p className="text-sm text-gray-600">{story.role}</p>
                    <p className="text-sm text-gray-600">{story.company}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {successStories.map((story, index) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to story ${index + 1}`}
                  className={
                    currentSlide === index
                      ? 'h-2 w-2 rounded-full bg-white shadow-md transition-colors'
                      : 'h-2 w-2 rounded-full bg-white/50 transition-colors'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-md">
            Business happening on IndiaMART
          </h2>

          <p className="mx-auto mb-12 max-w-4xl text-center text-base font-medium text-white drop-shadow-md">
            Lakhs of businesses ranging from <span className="font-bold">SMEs</span> to large
            enterprises are using the power of our platform to grow and make an impact:
          </p>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-16">
              <div className="flex items-start gap-4 rounded-lg border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                    <span className="text-3xl">🏗️</span>
                  </div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 transform">
                    <MapPin className="h-6 w-6 fill-red-500 text-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-blue-600">1000 Tonnes of Steel</h3>
                  <p className="text-sm leading-snug text-gray-700">
                    sold by Kamal in <span className="font-bold text-gray-900">Mandi, Punjab</span>{' '}
                    for making Indian Highways stronger.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex-1 text-right">
                  <h3 className="mb-1 text-lg font-bold text-blue-600">4500 Solar Panels</h3>
                  <p className="text-sm leading-snug text-gray-700">
                    sold by Shaurya from{' '}
                    <span className="font-bold text-gray-900">Alwar, Rajasthan</span> sold to light
                    up Ladakh.
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg bg-yellow-50">
                    <span className="text-3xl">☀️</span>
                  </div>
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 transform">
                    <MapPin className="h-6 w-6 fill-red-500 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/50 bg-blue-50/80 shadow-lg backdrop-blur-sm">
                {!mapError ? (
                  <Image
                    src="/images/map.png"
                    alt="Business happening across the world on IndiaMART"
                    width={600}
                    height={400}
                    className="block h-auto w-full"
                    onError={() => setMapError(true)}
                  />
                ) : (
                  <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 bg-white/50 p-8 text-center">
                    <MapPin className="h-10 w-10 text-blue-300" />
                    <p className="text-sm font-medium text-gray-500">Map unavailable</p>
                    <p className="max-w-xs text-xs text-gray-400">
                      Add{' '}
                      <code className="rounded bg-gray-100 px-1 py-0.5 text-gray-600">
                        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                      </code>{' '}
                      to your{' '}
                      <code className="rounded bg-gray-100 px-1 py-0.5 text-gray-600">
                        .env.local
                      </code>{' '}
                      to display the Google map.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-16">
              <div className="flex items-start gap-4 rounded-lg border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-blue-600">
                    1 Lakh pharmacy instruments
                  </h3>
                  <p className="text-sm leading-snug text-gray-700">
                    sold by H.L. Scientific Industries in{' '}
                    <span className="font-bold text-gray-900">Ambala, Haryana</span> for making
                    Mumbai healthier.
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg bg-blue-50">
                    <span className="text-3xl">🔬</span>
                  </div>
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 transform">
                    <MapPin className="h-6 w-6 fill-red-500 text-red-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg bg-cyan-50">
                    <span className="text-3xl">💧</span>
                  </div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 transform">
                    <MapPin className="h-6 w-6 fill-red-500 text-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-blue-600">2500 litres of water</h3>
                  <p className="text-sm leading-snug text-gray-700">
                    from <span className="font-bold text-gray-900">Kanpur, Uttar Pradesh</span> was
                    sent for the mountain regiment's annual get together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Trusted by Global Brands
          </h2>

          <div className="relative">
            <button
              type="button"
              onClick={scrollBrandsLeft}
              className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transition-colors hover:bg-indigo-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={scrollBrandsRight}
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transition-colors hover:bg-indigo-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div
              ref={brandsScrollRef}
              className="scrollbar-hide flex items-center justify-center gap-6 overflow-x-auto scroll-smooth px-12 py-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {trustedBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex flex-shrink-0 items-center justify-center"
                  style={{ scrollSnapAlign: 'center', width: '180px', height: '80px' }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    {failedBrandLogos[brand.name] ? (
                      <span className="text-center text-lg font-bold text-gray-700">
                        {brand.name}
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain"
                        onError={() => handleBrandImageError(brand.name)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            What can you sell on IndiaMART?
          </h2>

          <div className="relative">
            <button
              type="button"
              onClick={scrollSellLeft}
              className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transition-colors hover:bg-indigo-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={scrollSellRight}
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md transition-colors hover:bg-indigo-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div
              ref={sellScrollRef}
              className="scrollbar-hide flex items-start justify-center gap-8 overflow-x-auto scroll-smooth px-12 py-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {sellCategories.map((category) => (
                <div
                  key={category.name}
                  className="flex flex-shrink-0 flex-col items-center text-center"
                  style={{ scrollSnapAlign: 'center', width: '160px' }}
                >
                  <div className="mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg transition-shadow hover:shadow-xl">
                    {failedCategoryImages[category.name] ? (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 px-2 text-center text-xs font-medium text-gray-500">
                        Category
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                        onError={() => handleCategoryImageError(category.name)}
                      />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold leading-tight text-gray-900">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            IndiaMART Advantage Program
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700">
            While you get lots of benefits as a free seller, get even more. Be part of IndiaMART
            Advantage Program through our paid services.
          </p>

          <div className="mb-12">
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-cyan-600" />
              <h3 className="text-lg font-medium text-cyan-600">Improve your business</h3>
              <div className="h-px w-12 bg-cyan-600" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {improveBusinessFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-white/50 bg-white/60 p-6 text-center shadow-md backdrop-blur-sm"
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h4 className="mb-3 text-lg font-semibold text-cyan-600">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-cyan-600" />
              <h3 className="text-lg font-medium text-cyan-600">Productivity Tools</h3>
              <div className="h-px w-12 bg-cyan-600" />
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {productivityTools.map((tool) => (
                <div
                  key={tool.title}
                  className="rounded-lg border border-white/50 bg-white/60 p-6 text-center shadow-md backdrop-blur-sm"
                >
                  <div className="mb-4 flex justify-center">{tool.icon}</div>
                  <h4 className="mb-3 text-lg font-semibold text-cyan-600">{tool.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-700">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 text-center">
            <button
              type="button"
              className="rounded bg-teal-500 px-8 py-3 font-medium text-white transition-colors hover:bg-teal-600"
            >
              I am interested
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            For more details please contact our customer care at{' '}
            <span className="font-semibold">+91-9696969696</span>
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Sell on IndiaMART</h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              IndiaMART is India's largest e-commerce marketplace, catering to more than{' '}
              <span className="font-semibold">21.9 Crore+ Buyers</span> and{' '}
              <span className="font-semibold">86 Lakh+ Suppliers</span>. Whether you are a retailer
              or a manufacturer, IndiaMART is the leading destination for growing business online
              and is trusted by more than <span className="font-semibold">124 million users</span>{' '}
              across our desktop and mobile platforms.
            </p>

            <p>
              Selling on IndiaMART <span className="text-blue-600">#IndiamartAurKya</span>. Register
              by entering your contact details, and simply add products in your catalog.
            </p>

            <p>
              What's more? Our Seller portal offers a one stop solution for all your needs. Be
              it handling buyer enquiries or converting leads, we have something for everything.{' '}
              <span className="cursor-pointer text-blue-600 hover:underline">
                Sign up for free here
              </span>{' '}
              and transform your way of doing business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}