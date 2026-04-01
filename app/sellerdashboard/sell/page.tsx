'use client';

import { useState, useRef } from 'react';
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
  PhoneIncoming
} from 'lucide-react';
import map from '../../../public/images/map.png';

export default function SellOnIndiaMART() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mapError, setMapError] = useState(false);
  const [sellSlide, setSellSlide] = useState(0);
  const [brandsSlide, setBrandsSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sellScrollRef = useRef<HTMLDivElement>(null);
  const brandsScrollRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setError('Please enter a valid 10 digit mobile number');
      return;
    }
    setError('');
    console.log('Login with:', mobileNumber);
  };

  const navItems = [
    'Sell on IndiaMART',
    'How to Register',
    'Success Stories',
    'What can you sell',
    'IndiaMART Advantage',
  ];

  const statistics = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      value: '21.9 crore+',
      label: 'Buyers',
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      value: '86 lakh+',
      label: 'Suppliers',
    },
    {
      icon: <Boxes className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      value: '12.4 crore+',
      label: 'Products & Services',
    },
  ];

  const features = [
    {
      icon: <TrendingUp className="w-16 h-16 text-blue-600" strokeWidth={1.2} />,
      title: 'Grow your Business',
      description: 'Sell to buyers anytime, anywhere',
    },
    {
      icon: <IndianRupee className="w-16 h-16 text-blue-600" strokeWidth={1.2} />,
      title: 'Zero Cost',
      description: 'No commission or transaction fee',
    },
    {
      icon: <Package className="w-16 h-16 text-blue-600" strokeWidth={1.2} />,
      title: 'Manage Business Easily',
      description: 'Lead management system & other features',
    },
  ];

  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: 'Create Account',
      description: 'Add your name and phone number to get started',
    },
    {
      icon: <Building className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: 'Add Business',
      description: 'Add name, address & e-mail of your company',
    },
    {
      icon: <PlusCircle className="w-12 h-12 text-blue-600" strokeWidth={1.5} />,
      title: 'Add Products',
      description: 'Add products/services you want to sell',
    },
  ];

  const successStories = [
    {
      id: 1,
      quote: '"I remember my father once asked, why are we spending so much on IndiaMART, but when he saw the ROI, his trust in online presence & this investment increased 10 folds"',
      name: 'Mr. Varun Malu',
      role: 'Owner',
      company: 'Moorti Mahal',
    },
    {
      id: 2,
      quote: '"Indiamart is the best known B2B marketplace and has been the main source of lead generation for A&D."',
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
  ];

  const trustedBrands = [
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Hilti_logo.svg/1200px-Hilti_logo.svg.png',
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
  ];

  const sellCategories = [
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
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
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
  ];

  const improveBusinessFeatures = [
    {
      icon: <LayoutGrid className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />,
      title: 'Higher Visibility',
      description: 'Get higher listing on IndiaMART, appear on top of search results and improve the chances of acquiring more customers.',
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />,
      title: 'More Business Enquiries',
      description: 'Direct enquiries for your products/services sent to you by buyers looking for them.',
    },
    {
      icon: <TrendingUpIcon className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />,
      title: 'Additional Leads',
      description: 'Choose from a list of verified orders for products/services you want to sell.',
    },
  ];

  const productivityTools = [
    {
      icon: <MessageSquare className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />,
      title: 'Lead Manager (Desktop & App)',
      description: 'A CRM solution to organise, manage and track all your leads and enquiries at one place.',
    },
    {
      icon: <PhoneIncoming className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />,
      title: 'Preferred Number Service',
      description: 'A cloud telephony service that lets you connect your 8 phone numbers, which ring simultaneously for each buyer call to ensure no call is missed.',
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setCurrentSlide(Math.min(successStories.length - 1, currentSlide + 1));
    }
  };

  const goToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: index * 400, behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  const scrollSellLeft = () => {
    if (sellScrollRef.current) {
      sellScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setSellSlide(Math.max(0, sellSlide - 1));
    }
  };

  const scrollSellRight = () => {
    if (sellScrollRef.current) {
      sellScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setSellSlide(Math.min(sellCategories.length - 5, sellSlide + 1));
    }
  };

  const scrollBrandsLeft = () => {
    if (brandsScrollRef.current) {
      brandsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setBrandsSlide(Math.max(0, brandsSlide - 1));
    }
  };

  const scrollBrandsRight = () => {
    if (brandsScrollRef.current) {
      brandsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setBrandsSlide(Math.min(trustedBrands.length - 5, brandsSlide + 1));
    }
  };

  const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const markers = [
    'size:mid|color:red|label:I|20.5937,78.9629',
    'size:small|color:red|28.6139,77.2090',
    'size:small|color:red|19.0760,72.8777',
    'size:small|color:red|12.9716,77.5946',
    'size:small|color:red|22.5726,88.3639',
    'size:small|color:red|37.0902,-95.7129',
    'size:small|color:red|51.5074,-0.1278',
    'size:small|color:red|48.8566,2.3522',
    'size:small|color:red|25.2048,55.2708',
    'size:small|color:red|1.3521,103.8198',
    'size:small|color:red|35.6762,139.6503',
    'size:small|color:red|-25.2744,133.7751',
    'size:small|color:red|-14.2350,-51.9253',
    'size:small|color:red|-30.5595,22.9375',
    'size:small|color:red|23.6850,90.3563',
  ];

  const markerParams = markers.map((m) => `markers=${encodeURIComponent(m)}`).join('&');

  const mapStyles = [
    'feature:water|element:geometry|color:0xdbeafe',
    'feature:landscape|element:geometry|color:0xe8edf2',
    'feature:road|visibility:off',
    'feature:poi|visibility:off',
    'feature:transit|visibility:off',
    'feature:administrative|element:geometry.stroke|color:0xb0bec5|weight:0.8',
    'feature:administrative.country|element:geometry.stroke|color:0x94a3b8|weight:1',
  ].map((s) => `style=${encodeURIComponent(s)}`).join('&');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-sm font-medium whitespace-nowrap transition-colors ${
                    index === 0
                      ? 'text-blue-900'
                      : 'text-blue-900 hover:text-blue-700'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex items-end justify-center lg:justify-start">
              <div className="relative w-full max-w-lg">
                <div 
                  className="bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-lg flex items-end justify-center relative overflow-hidden"
                  style={{ minHeight: '450px' }}
                >
                  <img 
                    src="/sellers-hero.png" 
                    alt="Professional sellers"
                    className="absolute bottom-0 left-0 w-full h-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-gray-400">
                      <p className="text-sm bg-white/80 px-4 py-2 rounded-full">
                        Add your sellers image here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Sell for free on India&apos;s largest
                  <br />
                  online B2B marketplace
                </h1>
              </div>

              <div>
                <p className="text-xl text-gray-700 font-medium mb-4">
                  Free Registration/Sign In
                </p>

                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center border border-r-0 border-gray-300 rounded-l-lg px-3 py-3 bg-white sm:w-auto w-full">
                    <span className="text-lg mr-2">🇮🇳</span>
                    <span className="text-gray-700 font-medium">+91</span>
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Enter 10 digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setMobileNumber(val);
                      if (error) setError('');
                    }}
                    className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:border-l-0 border-t-0 sm:border-t"
                  />
                  
                  <button
                    onClick={handleLogin}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-r-lg font-medium flex items-center justify-center gap-2 transition-colors sm:rounded-l-none rounded-l-lg sm:mt-0 mt-2 sm:w-auto w-full"
                  >
                    Login
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {error && (
                  <p className="text-orange-500 text-sm mt-2 font-medium">
                    {error}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-700 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-8 text-center hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-blue-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Simple Steps Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Get a free listing in 3 simple steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-semibold mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <MousePointer2 className="w-12 h-12 text-blue-600 transform -rotate-12" strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Start selling for free. It only takes 5 minutes.
              </h2>
            </div>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
              Register
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Seller Success Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Seller Success Stories
          </h2>
          
          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-10 hidden md:flex shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-10 hidden md:flex shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {successStories.map((story) => (
                <div 
                  key={story.id} 
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] min-w-[300px] md:min-w-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-xs">IM</span>
                      </div>
                      <div className="text-white text-xs">
                        <div className="font-semibold">Customer Story | IndiaMART |</div>
                        <div className="text-gray-300">IndiaMART InterMESH Ltd</div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 rounded px-3 py-1.5 flex items-center gap-2">
                      <span className="text-white text-xs">Watch on</span>
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3 text-red-500 fill-red-500" />
                        <span className="text-white text-xs font-medium">YouTube</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {story.quote}
                  </p>

                  <div>
                    <p className="font-bold text-gray-900">{story.name}</p>
                    <p className="text-gray-600 text-sm">{story.role}</p>
                    <p className="text-gray-600 text-sm">{story.company}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {successStories.map((_, index) => {
                const isActive = currentSlide === index;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={isActive ? 'w-2 h-2 rounded-full bg-gray-800 transition-colors' : 'w-2 h-2 rounded-full bg-gray-300 transition-colors'}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Business Happening Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Business happening on IndiaMART
          </h2>
          
          <p className="text-center text-gray-900 mb-12 max-w-4xl mx-auto text-base">
            Lakhs of businesses ranging from <span className="font-bold">SMEs</span> to large enterprises are using the power of our platform to grow and make an impact:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left Column */}
            <div className="flex flex-col gap-16">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">🏗️</span>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-600 mb-1">1000 Tonnes of Steel</h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    sold by Kamal in <span className="font-bold text-gray-900">Mandi, Punjab</span> for making Indian Highways stronger.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-bold text-blue-600 mb-1">4500 Solar Panels</h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    sold by Shaurya from <span className="font-bold text-gray-900">Alwar, Rajasthan</span> sold to light up Ladakh.
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-20 bg-yellow-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">☀️</span>
                  </div>
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                    <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Center — Google Static Map */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-md bg-blue-50">
                {!mapError ? (
                  <img
                    src={map.src}
                    alt="Business happening across the world on IndiaMART"
                    className="w-full h-auto block"
                    style={{ minHeight: '200px' }}
                    onError={() => setMapError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 p-8 text-center" style={{ minHeight: '260px' }}>
                    <MapPin className="w-10 h-10 text-blue-300" />
                    <p className="text-sm text-gray-500 font-medium">
                      Map unavailable
                    </p>
                    <p className="text-xs text-gray-400 max-w-xs">
                      Add <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">.env.local</code> to display the Google map.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-16">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-600 mb-1">1 Lakh pharmacy instruments</h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    sold by H.L. Scientific Industries in <span className="font-bold text-gray-900">Ambala, Haryana</span> for making Mumbai healthier.
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-20 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">🔬</span>
                  </div>
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                    <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-20 bg-cyan-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">💧</span>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-600 mb-1">2500 litres of water</h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    from <span className="font-bold text-gray-900">Kanpur, Uttar Pradesh</span> was sent for the mountain regiment&apos;s annual get together.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted by Global Brands Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Trusted by Global Brands
          </h2>
          
          <div className="relative">
            <button 
              onClick={scrollBrandsLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors z-10 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button 
              onClick={scrollBrandsRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors z-10 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div 
              ref={brandsScrollRef}
              className="flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12 py-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {trustedBrands.map((brand, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ scrollSnapAlign: 'center', width: '180px', height: '80px' }}
                >
                  <div 
                    className="w-full h-full rounded-lg flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-lg font-bold text-gray-700">${brand.name}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What can you sell on IndiaMART Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What can you sell on IndiaMART?
          </h2>
          
          <div className="relative">
            <button 
              onClick={scrollSellLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors z-10 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button 
              onClick={scrollSellRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors z-10 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div 
              ref={sellScrollRef}
              className="flex items-start justify-center gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-12 py-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {sellCategories.map((category, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 flex flex-col items-center text-center"
                  style={{ scrollSnapAlign: 'center', width: '160px' }}
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg hover:shadow-xl transition-shadow border-4 border-white">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400?text=Category';
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IndiaMART Advantage Program Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            IndiaMART Advantage Program
          </h2>
          
          <p className="text-center text-gray-700 text-sm mb-10 max-w-3xl mx-auto">
            While you get lots of benefits as a free seller, get even more. Be part of IndiaMART Advantage Program through our paid services.
          </p>

          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-cyan-600"></div>
              <h3 className="text-lg font-medium text-cyan-600">Improve your business</h3>
              <div className="h-px w-12 bg-cyan-600"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {improveBusinessFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-cyan-600 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-cyan-600"></div>
              <h3 className="text-lg font-medium text-cyan-600">Productivity Tools</h3>
              <div className="h-px w-12 bg-cyan-600"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {productivityTools.map((tool, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {tool.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-cyan-600 mb-3">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded font-medium transition-colors">
              I am interested
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            For more details please contact our customer care at <span className="font-semibold">+91-9696969696</span>
          </p>
        </div>
      </section>

      {/* Sell on IndiaMART Footer Section - NEW */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sell on IndiaMART
          </h2>
          
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              IndiaMART is India&apos;s largest e-commerce marketplace, catering to more than <span className="font-semibold">21.9 Crore+ Buyers</span> and <span className="font-semibold">86 Lakh+ Suppliers</span>. Whether you are a retailer or a manufacturer, IndiaMART is the leading destination for growing business online and is trusted by more than <span className="font-semibold">124 million users</span> across our desktop and mobile platforms.
            </p>
            
            <p>
              Selling on IndiaMART <span className="text-blue-600">#IndiamartAurKya</span>. Register by entering your contact details, and simply add products in your catalog.
            </p>
            
            <p>
              Whats more? Our Seller portal offers a one stop solution for all your needs. Be it handling buyer enquiries or converting leads, we have something for everything. <span className="text-blue-600 cursor-pointer hover:underline">Sign up for free here</span> and transform your way of doing business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}