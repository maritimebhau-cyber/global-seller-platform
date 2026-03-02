'use client';

import React, { useState, useEffect } from 'react';
import { X, Camera, Upload, WifiOff, Plus, Search, ChevronDown, Edit3, HelpCircle, Play, FileText } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  hasExistingPhoto: boolean;
}

const products: Product[] = [
  { id: '1', name: 'xcusa', hasExistingPhoto: false },
  { id: '2', name: 'Made Easy Book...', hasExistingPhoto: false },
  { id: '3', name: 'software', hasExistingPhoto: true },
  { id: '4', name: 'Preliminary Civil ...', hasExistingPhoto: true },
  { id: '5', name: '18 Yrs Question...', hasExistingPhoto: true },
];

const tabs = [
  { id: 'active', label: 'Active', count: 4, active: true },
  { id: 'inactive', label: 'Inactive', count: 1, active: false },
];

const filters = [
  { label: 'All Products', count: 4, active: true },
  { label: 'No Category', count: 4, active: false, color: 'text-red-500' },
  { label: 'Low Score', count: 4, active: false },
  { label: 'No Specifications', count: 4, active: false },
  { label: 'No Descriptions', count: 3, active: false },
];

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSlowNetwork, setShowSlowNetwork] = useState(false);

  useEffect(() => {
    const checkNetworkSpeed = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const slow = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
        setIsVisible(slow);
        setShowSlowNetwork(slow);
      }
    };

    checkNetworkSpeed();
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', checkNetworkSpeed);
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', checkNetworkSpeed);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slow Network Banner */}
      {isVisible && (
        <div className="w-full bg-[#FFFBF0] border border-[#E5D5B0] rounded-lg p-4 relative m-4 max-w-[calc(100%-2rem)]">
          {showSlowNetwork && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF3CD] border border-[#FFEAA7] text-[#856404] px-4 py-2 rounded shadow-sm flex items-center gap-2 text-sm">
              <WifiOff size={16} />
              Slow network connection detected.
              <button 
                onClick={() => setShowSlowNetwork(false)}
                className="ml-2 hover:text-[#5a3f02]"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Add More Photos for following <span className="font-bold">5 products</span> to get more{' '}
              <span className="font-bold">Enquiries!</span>
            </h3>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center flex-shrink-0">
                <div className="grid grid-cols-2 gap-1 w-20 h-20 mb-2">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="w-9 h-9 border border-gray-200 bg-gray-50 flex items-center justify-center"
                    >
                      {index === 0 && product.hasExistingPhoto ? (
                        <div className="w-full h-full bg-purple-400" />
                      ) : (
                        <Camera size={16} className="text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-[#2AA9A9] hover:underline cursor-pointer truncate max-w-[80px] text-center">
                  {product.name}
                </span>
              </div>
            ))}

            <button className="ml-4 bg-[#2AA9A9] hover:bg-[#248F8F] text-white text-sm font-medium px-6 py-2.5 rounded-sm flex items-center gap-2">
              <Upload size={16} />
              Add Photo Now
            </button>
          </div>
        </div>
      )}

      {/* Main Product Management Interface */}
      <div className="bg-white border-b border-gray-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`pb-2 border-b-2 text-sm font-medium ${
                  tab.active 
                    ? 'border-[#2AA9A9] text-[#2AA9A9]' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#2AA9A9] hover:bg-[#248F8F] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium">
              <Plus size={16} />
              Add Product
            </button>
            <button className="border border-[#2AA9A9] text-[#2AA9A9] px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-[#2AA9A9]/5">
              <Plus size={16} />
              Quick Add
            </button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Group, Category or Specification"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-80 text-sm focus:outline-none focus:border-[#2AA9A9]"
              />
            </div>
            <button className="text-[#2AA9A9] text-sm font-medium flex items-center gap-1">
              More Options
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Filter by :</span>
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`${filter.active ? 'text-gray-800 border-b border-gray-800' : filter.color || 'text-gray-500'} hover:text-gray-800`}
              >
                {filter.label}({filter.count})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <button className="flex items-center gap-1 hover:text-gray-800">
              Recent Modified
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg flex">
          {/* Left Side - Image & Actions */}
          <div className="flex">
            {/* Camera Icons Column */}
            <div className="flex flex-col border-r border-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="w-12 h-12 flex items-center justify-center border-b border-gray-200 hover:bg-gray-50 text-gray-400">
                  <Camera size={18} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-64 h-80 bg-black flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-[#00D4FF] text-4xl font-bold mb-2">W</div>
                <div className="text-white text-lg font-semibold">WebTech</div>
                <div className="text-gray-400 text-xs">IT SOLUTIONS</div>
              </div>
              <button className="absolute bottom-2 right-2 text-white/70 hover:text-white">
                <Edit3 size={16} />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 flex">
              <button className="w-32 h-16 bg-gray-100 border-r border-t border-gray-200 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-200">
                <Play size={20} />
                <span className="text-xs mt-1">Add Video</span>
              </button>
              <button className="w-32 h-16 bg-gray-100 border-t border-gray-200 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-200">
                <FileText size={20} />
                <span className="text-xs mt-1">Add PDF</span>
              </button>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">Made Easy Book Of Electrical And Electro...</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-800">₹ 222</span>
                  <span className="text-gray-500 line-through">233m</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Score:</span>
                <span className="text-sm font-semibold text-red-500">25/100</span>
                <HelpCircle size={14} className="text-gray-400" />
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-gradient-to-r from-red-400 to-green-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Category</span>
                <button className="text-[#2AA9A9] text-sm flex items-center gap-1 hover:underline">
                  <Plus size={14} />
                  Add category to get buy leads from relevant customers
                </button>
              </div>

              <div>
                <span className="text-gray-600 font-medium block mb-2">Description</span>
                <button className="text-gray-500 hover:text-[#2AA9A9] text-sm">
                  Click here to Add description...
                </button>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <span className="text-gray-600 font-medium">Group</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">New Items</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Specifications */}
          <div className="w-80 border-l border-gray-200 p-6 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Specification/Additional Details</h3>
            <p className="text-sm text-gray-500">Please map category to add specification.</p>
          </div>
        </div>
      </div>

      {/* Help Videos Floating Button */}
      <button className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#2AA9A9] text-white px-3 py-6 rounded-l-lg writing-mode-vertical flex items-center gap-2 hover:bg-[#248F8F] shadow-lg" style={{ writingMode: 'vertical-rl' }}>
        <Play size={16} className="transform rotate-90" />
        <span className="text-sm font-medium">Help Videos</span>
      </button>
    </div>
  );
}