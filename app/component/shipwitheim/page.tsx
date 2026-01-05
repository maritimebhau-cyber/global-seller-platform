'use client';
import React, { useState } from 'react';
import { Truck, Package, ArrowLeftRight } from 'lucide-react';

const TransportationBooking: React.FC = () => {
  const [pickupPostcode, setPickupPostcode] = useState('');
  const [dropPostcode, setDropPostcode] = useState('');
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
      desc: '20 Kgs to 2500 Kg'
    },
    { 
      id: 'courier', 
      label: 'Courier', 
      icon: '📦',
      desc: 'Less than 20 Kg'
    }
  ];

  const weightOptions = [
    { id: 'upto5', label: 'Upto 5 Kg' },
    { id: '5to10', label: '5 to 10 Kg' },
    { id: '11to20', label: '11 to 20 Kg' },
    { id: 'morethan20', label: 'More than 20 Kg' }
  ];

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

  const clearPickup = () => setPickupPostcode('');
  const clearDrop = () => setDropPostcode('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Background */}
      <div 
        className="relative bg-cover bg-center pb-32 pt-8"
        style={{
          backgroundImage: 'linear-gradient(rgba(70, 80, 150, 0.85), rgba(70, 80, 150, 0.85)), url("data:image/svg+xml,%3Csvg width="1200" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="1200" height="400" fill="%23667"%3E%3C/rect%3E%3C/svg%3E")',
          minHeight: '280px'
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-white text-3xl font-bold text-center mb-8">Book Transportation Service</h1>
          
          {/* Service Type Cards */}
          <div className="flex justify-center gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                className="bg-white rounded-lg p-4 w-28 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <div className="font-semibold text-gray-800 text-sm mb-1">{service.label}</div>
                <div className="text-xs text-gray-600 text-center">{service.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Card - Overlapping */}
      <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Enter Your Shipment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pickup Pincode */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Pickup Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter pickup pincode"
                  value={pickupPostcode}
                  onChange={(e) => setPickupPostcode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8"
                />
                {pickupPostcode && (
                  <button
                    onClick={clearPickup}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Swap Icon */}
            <div className="hidden md:flex items-end justify-center pb-2">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Drop Pincode */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Drop Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter drop pincode"
                  value={dropPostcode}
                  onChange={(e) => setDropPostcode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8"
                />
                {dropPostcode && (
                  <button
                    onClick={clearDrop}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Material Weight Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Material Weight <span className="text-red-500">*</span>
              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs border border-gray-400 rounded-full text-gray-500">i</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {weightOptions.map((option) => (
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
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8 mb-6">
            <div className="w-2 h-2 rounded-full bg-teal-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-16 py-3 rounded-md transition-colors shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">FAQ's</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold text-purple-900 mb-2 text-base">{faq.q}</h3>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Areas Section */}
      <div className="bg-indigo-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Popular Areas We Serve</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
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