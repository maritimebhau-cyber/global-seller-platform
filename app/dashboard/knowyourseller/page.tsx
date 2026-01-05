'use client';

import React, { useState } from 'react';
import { Search, Shield, CheckCircle, Crown } from 'lucide-react';


const KnowYourSeller = () => {
  const [mobile, setMobile] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      alert(`Searching for seller with mobile: ${mobile}`);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Business Information & Seller Transparency',
      description: "Confirm the seller's business details, such as company name and location, for greater transparency.",
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: 'GST & TrustSEAL Verification',
      description: "Check if the seller's GST details are validated, and for TrustSEAL sellers, this shows their commitment to quality.",
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Crown,
      title: 'Contact & Activity Details',
      description: "See the seller's responsiveness and how long they've been active on IndiaMART.",
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Know Your Seller
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build Trust Before You Transact
          </p>
          <p className="text-gray-500 mt-2">
            Enter a seller's mobile number to verify your connection. IndiaMART identifies the seller based on your past matchmaking.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                onKeyPress={handleKeyPress}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Seller
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🔒 Your search is secure and confidential</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default KnowYourSeller;