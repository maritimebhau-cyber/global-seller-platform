
'use client';
import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';

export default function TicketManagementSystem() {
  const [location, setLocation] = useState('Indore');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4">
            {/* Location Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors min-w-[200px]">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{location}</span>
                <ChevronDown className="w-4 h-4 text-gray-600 ml-auto" />
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter product / service"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Advance Search Button */}
              <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                <Sparkles className="w-5 h-5" />
                Advance Search
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Recent Searches:</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Tickets Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Active Tickets <span className="text-gray-500">(0)</span>
            </h2>
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
              Raise New Ticket
            </button>
          </div>

          {/* Note Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-800">Note:</span>
              <span className="text-amber-700"> New tickets may take up to 24 hours to appear here after creation.</span>
            </div>
          </div>

          {/* Active Tickets Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <p className="text-center text-gray-500 text-lg">No Active Tickets Found</p>
          </div>
        </div>

        {/* Closed Tickets Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Closed Tickets <span className="text-gray-500">(0)</span>
          </h2>

          {/* Closed Tickets Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <p className="text-center text-gray-500 text-lg">No Closed Tickets Found</p>
          </div>
        </div>
      </div>
    </div>
  );
}