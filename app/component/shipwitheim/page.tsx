'use client';
import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import BackgroundImage from '../../../public/images/backgroundimage.jpg';

const TransportationBooking: React.FC = () => {
  const [selectedService, setSelectedService] = useState('full-truck');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');

  const services = [
    { 
      id: 'full-truck', 
      label: 'Full Truck', 
      icon: '🚚',
      desc: 'More than 2.5 Tons'
    },
    { 
      id: 'part-truck', 
      label: 'Part Truck', 
      icon: '🚐',
      desc: '30 Kg to 2500 Kg'
    },
    { 
      id: 'courier', 
      label: 'Courier', 
      icon: '📦',
      desc: 'Less than 30 Kg'
    }
  ];

  const getWeightOptions = () => {
    if (selectedService === 'courier') {
      return [
        { id: 'upto5', label: 'Upto 5 Kg' },
        { id: '5to10', label: '5 to 10 Kg' },
        { id: '11to20', label: '11 to 20 Kg' },
        { id: 'morethan20', label: 'More than 20 Kg' }
      ];
    } else {
      return [
        { id: 'morethan18', label: 'More than 18 Ton' },
        { id: '9to18', label: '9 to 18 Ton' },
        { id: '3to9', label: '3 to 9 Ton' },
        { id: 'upto3', label: 'Upto 3 Ton' }
      ];
    }
  };

  const pickupPopularCities = ['Delhi', 'Mumbai', 'Pune', 'Kolkata'];
  const dropPopularCities = ['Mumbai', 'Delhi', 'Ahmedabad', 'Pune'];

  const faqs = [
    {
      q: 'What is Ship with IndiaMART?',
      a: 'Ship With IndiaMART is a web-based online platform brought to you by India\'s leading B2B Matchmakers, IndiaMART. This platform helps connect people with transportation needs with some of the leading Indian logistics Service Providers.'
    },
    {
      q: 'How can I book a Courier service on Ship with IndiaMART?',
      a: 'Step 1: Select "Courier" Service\n\nStep 2: Fill out Pickup, Drop Pincodes and weight of the shipment and click on Find Transporters.\n\nStep 3: A curated list of Transport Service providers will be shown. Connect with your preferred service provider on Chat / Call and further discuss the transport of your shipment in detail'
    },
    {
      q: 'What are the most popular different types of Courier services?',
      a: 'Following are most popular types of Courier Services\n\n• Standard Shipping\n• Overnight Courier\n• International Courier\n• Rush/On-Demand Courier\n• Same Day Courier'
    },
    {
      q: 'What are the weight and size limits for courier shipments?',
      a: 'The weight and size limits for courier shipments typically depend on the service provider and the type of courier service selected. However, general guidelines are:\n\n• Weight Limit: Most courier service handle parcels ranging from a few grams (for documents) to 30 kg.\n\n• Size Limit: The parcel\'s dimensions must usually fit within 3 meters in combined length, width, and height, but larger sizes may be accepted with additional charges.\n\nFor shipments exceeding these limits, options like freight services may be more suitable.'
    },
    {
      q: 'Is there a service charge to use this platform?',
      a: 'No. The platform is free to use and IndiaMART currently does not charge any amount to post a requirement or to view providers. Any payment, if any, is settled between the Service Users and the Service Providers.'
    },
    {
      q: 'Does Ship with IndiaMART provide insurance for the goods that are being transported?',
      a: 'Ship With IndiaMART is an online marketplace. It connects people with transportation services to the transportation service providers. It does not provide insurance of goods or services. The insurance of goods under transit is subject to the terms of service between the service providers to choose from and we recommend you to connect with multiple service providers and then choose the most suitable one.'
    }
  ];

  const locations = [
    ['Courier Service in Delhi', 'Courier Service in Bangalore'],
    ['Courier Service in Hyderabad', 'Courier Service in Pune'],
    ['Courier Service in Mumbai', 'Courier Service in Surat'],
    ['Courier Service in Kolkata', 'Courier Service in Jaipur'],
    ['Courier Service in Chennai', 'Courier Service in Ahmedabad'],
    ['Courier Service in Lucknow', 'Courier Service in Thane'],
    ['Courier Service in Ghaziabad', 'Courier Service in Nagpur'],
    ['Courier Service in Indore', 'Courier Service in Ghaziabad']
  ];

  const handleSubmit = () => {
    alert('Finding services...');
  };

  const clearPickup = () => setPickupCity('');
  const clearDrop = () => setDropCity('');

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedWeight('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div 
        className="relative pb-12 md:pb-16 pt-4 md:pt-6"
        style={{
          backgroundImage: `linear-gradient(rgba(50, 60, 100, 0.6), rgba(50, 60, 100, 0.6)), url(${BackgroundImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-white text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Book Transportation Service</h1>
          
          {/* Service Type Cards */}
          <div className="flex justify-center gap-2 md:gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                className="bg-white rounded-md p-2 md:p-3 w-28 md:w-44 flex flex-col items-center hover:shadow-lg transition-all relative"
              >
                <div className="text-2xl md:text-3xl mb-0.5 md:mb-1">{service.icon}</div>
                <div className="font-semibold text-gray-800 text-xs md:text-sm mb-0.5">{service.label}</div>
                <div className="text-[10px] md:text-xs text-gray-600 text-center leading-tight">{service.desc}</div>
                
                {selectedService === service.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-b-md"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-5 text-gray-800">Enter Your Shipment Details</h2>
          
          {/* Responsive Layout */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            {/* Pickup City */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Pickup City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sihora"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm"
                />
                {pickupCity && (
                  <button
                    onClick={clearPickup}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-blue-600 font-medium">Popular:</span>
                {pickupPopularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setPickupCity(city)}
                    className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex md:items-start justify-center md:pt-8 order-3 md:order-2">
              <div className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white flex-shrink-0 rotate-90 md:rotate-0">
                <ArrowLeftRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Drop City */}
            <div className="flex-1 order-2 md:order-3">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Drop City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter drop city"
                  value={dropCity}
                  onChange={(e) => setDropCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm"
                />
                {dropCity && (
                  <button
                    onClick={clearDrop}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-blue-600 font-medium">Popular:</span>
                {dropPopularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setDropCity(city)}
                    className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Weight */}
            <div className="flex-1 order-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Material Weight <span className="text-red-500">*</span>
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs border border-gray-400 rounded-full text-gray-500 cursor-help">ⓘ</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {getWeightOptions().map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="weight"
                      value={option.id}
                      checked={selectedWeight === option.id}
                      onChange={(e) => setSelectedWeight(e.target.value)}
                      className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6 mb-5">
            <div className="w-2 h-2 rounded-full bg-teal-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-12 md:px-16 py-2.5 rounded-md transition-colors shadow-md text-sm w-full md:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800">FAQ's</h2>
        
        <div className="space-y-4 md:space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 md:pb-5 last:border-0">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{faq.q}</h3>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Areas Section */}
      <div className="bg-indigo-900 text-white py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 md:mb-8">Popular Areas We Serve</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 md:gap-x-12">
            {locations.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <a
                  href="#"
                  className="text-sm hover:text-teal-300 transition-colors underline"
                >
                  {row[0]}
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-teal-300 transition-colors underline"
                >
                  {row[1]}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationBooking;