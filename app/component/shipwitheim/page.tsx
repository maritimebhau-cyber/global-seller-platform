'use client';

import React, { useState, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import BackgroundImage from '../../../public/images/backgroundimage.jpg';

interface Service {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

interface WeightOption {
  id: string;
  label: string;
}

interface FAQ {
  q: string;
  a: string;
}

const TransportationBooking: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('full-truck');
  const [pickupCity, setPickupCity] = useState<string>('');
  const [dropCity, setDropCity] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const services: Service[] = [
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

  const getWeightOptions = useCallback((): WeightOption[] => {
    if (selectedService === 'courier') {
      return [
        { id: 'upto5', label: 'Upto 5 Kg' },
        { id: '5to10', label: '5 to 10 Kg' },
        { id: '11to20', label: '11 to 20 Kg' },
        { id: 'morethan20', label: 'More than 20 Kg' }
      ];
    }
    return [
      { id: 'morethan18', label: 'More than 18 Ton' },
      { id: '9to18', label: '9 to 18 Ton' },
      { id: '3to9', label: '3 to 9 Ton' },
      { id: 'upto3', label: 'Upto 3 Ton' }
    ];
  }, [selectedService]);

  const pickupPopularCities: string[] = ['Delhi', 'Mumbai', 'Pune', 'Kolkata'];
  const dropPopularCities: string[] = ['Mumbai', 'Delhi', 'Ahmedabad', 'Pune'];

  const faqs: FAQ[] = [
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

  const locations: string[][] = [
    ['Courier Service in Delhi', 'Courier Service in Bangalore'],
    ['Courier Service in Hyderabad', 'Courier Service in Pune'],
    ['Courier Service in Mumbai', 'Courier Service in Surat'],
    ['Courier Service in Kolkata', 'Courier Service in Jaipur'],
    ['Courier Service in Chennai', 'Courier Service in Ahmedabad'],
    ['Courier Service in Lucknow', 'Courier Service in Thane'],
    ['Courier Service in Ghaziabad', 'Courier Service in Nagpur'],
    ['Courier Service in Indore', 'Courier Service in Ghaziabad']
  ];

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!pickupCity.trim() || !dropCity.trim() || !selectedWeight) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Finding services...');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [pickupCity, dropCity, selectedWeight]);

  const clearPickup = useCallback((): void => setPickupCity(''), []);
  const clearDrop = useCallback((): void => setDropCity(''), []);

  const handleServiceChange = useCallback((serviceId: string): void => {
    setSelectedService(serviceId);
    setSelectedWeight('');
  }, []);

  const handleSwapCities = useCallback((): void => {
    setPickupCity(dropCity);
    setDropCity(pickupCity);
  }, [pickupCity, dropCity]);

  const toggleFaq = (index: number): void => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section - Full image visible, half screen coverage */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundImage}
            alt="Transportation background"
            fill
            className="object-contain md:object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(50,60,100,0.6)] to-[rgba(50,60,100,0.6)]" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center items-center">
          {/* Heading */}
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Book Transportation Service
          </h1>
          
          {/* Service Type Cards */}
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceChange(service.id)}
                className={`bg-white rounded-lg p-3 md:p-4 w-32 md:w-48 flex flex-col items-center hover:shadow-xl transition-all relative ${
                  selectedService === service.id ? 'ring-2 ring-teal-600 shadow-xl' : ''
                }`}
                aria-pressed={selectedService === service.id}
                aria-label={`Select ${service.label} service`}
              >
                <span className="text-3xl md:text-4xl mb-1 md:mb-2" role="img" aria-label={service.label}>
                  {service.icon}
                </span>
                <span className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                  {service.label}
                </span>
                <span className="text-xs md:text-sm text-gray-600 text-center leading-tight">
                  {service.desc}
                </span>
                
                {selectedService === service.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-teal-600 rounded-b-lg" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-5 text-gray-800">
            Enter Your Shipment Details
          </h2>
          
          {/* Responsive Layout */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            {/* Pickup City */}
            <div className="flex-1">
              <label htmlFor="pickup-city" className="block text-sm font-medium mb-2 text-gray-700">
                Pickup City <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="relative">
                <input
                  id="pickup-city"
                  type="text"
                  placeholder="Enter pickup city"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm"
                  aria-required="true"
                />
                {pickupCity && (
                  <button
                    type="button"
                    onClick={clearPickup}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
                    aria-label="Clear pickup city"
                    title="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-blue-600 font-medium">Popular:</span>
                {pickupPopularCities.map((city) => (
                  <button
                    key={`pickup-${city}`}
                    type="button"
                    onClick={() => setPickupCity(city)}
                    className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex md:items-start justify-center md:pt-8 order-3 md:order-2">
              <button
                type="button"
                onClick={handleSwapCities}
                className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white flex-shrink-0 rotate-90 md:rotate-0 hover:border-teal-500 hover:text-teal-600 transition-colors"
                aria-label="Swap pickup and drop cities"
                title="Swap cities"
              >
                <ArrowLeftRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Drop City */}
            <div className="flex-1 order-2 md:order-3">
              <label htmlFor="drop-city" className="block text-sm font-medium mb-2 text-gray-700">
                Drop City <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="relative">
                <input
                  id="drop-city"
                  type="text"
                  placeholder="Enter drop city"
                  value={dropCity}
                  onChange={(e) => setDropCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm"
                  aria-required="true"
                />
                {dropCity && (
                  <button
                    type="button"
                    onClick={clearDrop}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
                    aria-label="Clear drop city"
                    title="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-blue-600 font-medium">Popular:</span>
                {dropPopularCities.map((city) => (
                  <button
                    key={`drop-${city}`}
                    type="button"
                    onClick={() => setDropCity(city)}
                    className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Weight */}
            <div className="flex-1 order-4">
              <fieldset>
                <legend className="block text-sm font-medium mb-2 text-gray-700">
                  Material Weight <span className="text-red-500" aria-label="required">*</span>
                  <span 
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs border border-gray-400 rounded-full text-gray-500 cursor-help"
                    title="Select the approximate weight of your shipment"
                    aria-label="Weight information"
                  >
                    ⓘ
                  </span>
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {getWeightOptions().map((option) => (
                    <label
                      key={option.id}
                      htmlFor={`weight-${option.id}`}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        id={`weight-${option.id}`}
                        type="radio"
                        name="weight"
                        value={option.id}
                        checked={selectedWeight === option.id}
                        onChange={(e) => setSelectedWeight(e.target.value)}
                        className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <span className="text-xs text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6 mb-5" role="progressbar" aria-valuenow={1} aria-valuemax={2} aria-label="Form progress">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-semibold px-12 md:px-16 py-2.5 rounded-md transition-colors shadow-md text-sm w-full md:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800">
          FAQ&apos;s
        </h2>
        
        {/* Single Border Container for All FAQs with padding inside */}
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm p-4 md:p-6">
          {faqs.map((faq, index) => (
            <div
              key={`faq-${index}`}
              className={`${index !== faqs.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full py-3 md:py-4 flex justify-between items-center text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openFaqIndex === index}
              >
                <span className="font-semibold text-gray-800 text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <span 
                  className={`text-teal-600 flex-shrink-0 transition-transform duration-200 ${
                    openFaqIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-3 md:pb-4 text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50 rounded p-3">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Areas Section */}
      <div className="bg-indigo-900 text-white py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 md:mb-8">
            Popular Areas We Serve
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 md:gap-x-12">
            {locations.map((row, rowIndex) => (
              <React.Fragment key={`location-row-${rowIndex}`}>
                <a
                  href="#"
                  className="text-sm hover:text-teal-300 transition-colors underline decoration-transparent hover:decoration-teal-300"
                  onClick={(e) => e.preventDefault()}
                >
                  {row[0]}
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-teal-300 transition-colors underline decoration-transparent hover:decoration-teal-300"
                  onClick={(e) => e.preventDefault()}
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