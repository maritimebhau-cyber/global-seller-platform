"use client";


import React, { useState } from 'react';

const RequirementsDashboard: React.FC = () => {
  const [view, setView] = useState<'chat' | 'product'>('chat');

  const handlePostRequirement = () => {
    console.log('Post new requirement clicked');
    // Add your logic here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${view === 'chat' ? 'text-gray-900' : 'text-gray-500'}`}>
              Chat View
            </span>
            <button
              onClick={() => setView(view === 'chat' ? 'product' : 'chat')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                view === 'product' ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  view === 'product' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${view === 'product' ? 'text-gray-900' : 'text-gray-500'}`}>
              Product View
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-gray-400 text-sm">No chats, contacts or messages found</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden bg-[#f0ede5]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                {/* Shopping cart */}
                <circle cx="25" cy="90" r="3" fill="#d4c4b0" />
                <circle cx="40" cy="90" r="3" fill="#d4c4b0" />
                <path d="M15 75 L20 75 L25 85 L45 85 M20 75 L22 80 M23 80 L25 85" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Price tag */}
                <path d="M55 20 L70 20 L75 25 L65 35 L55 25 Z" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                <circle cx="65" cy="24" r="1.5" fill="#d4c4b0" />
                
                {/* Package box */}
                <rect x="90" y="15" width="25" height="20" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                <path d="M90 25 L115 25 M102.5 15 L102.5 35" stroke="#d4c4b0" strokeWidth="1.5" />
                
                {/* Star rating */}
                <path d="M130 30 L133 38 L141 38 L135 43 L137 51 L130 46 L123 51 L125 43 L119 38 L127 38 Z" stroke="#d4c4b0" strokeWidth="1.2" fill="none" />
                
                {/* Location pin */}
                <path d="M35 55 Q35 45 42.5 45 Q50 45 50 55 Q50 65 42.5 70 Q35 65 35 55 Z" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                <circle cx="42.5" cy="53" r="3" fill="#d4c4b0" />
                
                {/* Megaphone */}
                <path d="M80 60 L90 55 L90 70 L80 65 Z M80 62.5 L72 62.5 Q70 62.5 70 64.5 Q70 66.5 72 66.5 L75 66.5" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                
                {/* Trending up arrow */}
                <path d="M110 75 L120 65 L130 70 L140 60 M135 60 L140 60 L140 65" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Gift */}
                <rect x="20" y="115" width="20" height="18" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                <path d="M18 115 L42 115 M30 115 L30 108 Q30 105 27 105 Q24 105 24 108" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M30 115 L30 108 Q30 105 33 105 Q36 105 36 108" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                
                {/* Wallet */}
                <rect x="65" y="110" width="25" height="20" rx="2" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                <path d="M90 118 L93 118 Q95 118 95 120 Q95 122 93 122 L90 122" stroke="#d4c4b0" strokeWidth="1.5" fill="none" />
                
                {/* Diamond */}
                <path d="M110 110 L120 110 L125 118 L115 130 L105 118 Z" stroke="#d4c4b0" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <path d="M110 110 L115 118 L120 110 M105 118 L125 118" stroke="#d4c4b0" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">Welcome,</h1>
            <p className="text-xl text-gray-600 mb-8">
              There is no active requirement with us.
            </p>
            <button
              onClick={handlePostRequirement}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-colors"
            >
              Post a New Requirement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsDashboard;