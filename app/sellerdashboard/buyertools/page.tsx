"use client";

import React, { useState } from "react";
import { ExternalLink, MessageSquare } from "lucide-react";

interface Order {
  id: string;
  title: string;
  suppliers: number;
  date: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  company: string;
  image: string;
}

const orders: Order[] = [
  { id: "1", title: "Create Seller Account", suppliers: 5, date: "28 February" },
  { id: "2", title: "Create Seller Account", suppliers: 6, date: "19 February" },
  { id: "3", title: "Create Seller Account", suppliers: 7, date: "12 February" },
  { id: "4", title: "Create Seller Account", suppliers: 1, date: "09 February" },
];

const categories: Category[] = [
  { id: "1", name: "Thyristors", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop" },
  { id: "2", name: "Account Management Service", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop" },
  { id: "3", name: "Account Management Consultancy", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop" },
];

const productsOfInterest: Product[] = [
  { id: "1", name: "Create Seller Account", company: "Bullzeye Services", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop" },
];

export default function MarineKmartDashboard() {
  const [activeTab, setActiveTab] = useState("Post Buy Requirement");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { name: "Post Buy Requirement", active: true },
    { name: "Services For Business Growth", active: false },
    { name: "My Orders", active: false },
    { name: "Products Of Interest", active: false },
    { name: "Recommended Categories", active: false },
    { name: "Past Searches", active: false },
    { name: "Ship With IM", active: false },
    { name: "Loans", active: false, badge: "NEW" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting requirement:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      {/* Navigation Bar */}
      <nav className="bg-[#f5f5f5] border-b border-gray-300">
        <div className="flex items-center h-10 px-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex items-center px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors h-full ${activeTab === tab.name ? "text-[#2e3192] bg-white border-t-2 border-[#2e3192]" : "text-black hover:bg-gray-200"}`}
            >
              {tab.name}
              {tab.badge && (
                <span className="ml-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">NEW</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section with Marine/Ship Background */}
      <div 
        className="relative bg-cover bg-center mt-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            
            {/* Left Side - Post Requirement Form - INCREASED WIDTH */}
            <div className="flex-1 w-full lg:w-[650px] max-w-[650px]">
              <div className="bg-[#f0f0f0] rounded shadow-lg p-6 w-full">
                <h1 className="text-2xl font-bold text-[#2e3192] text-center mb-5">
                  Tell us what you Need
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Product / Service name"
                    className="w-full px-4 py-3 border border-gray-400 rounded text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#00a699]"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-[#00a699] hover:bg-[#008f84] text-white font-bold py-3 px-4 rounded text-sm uppercase tracking-wide"
                  >
                    Submit Requirement
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-gray-300">
                  <p className="text-center text-gray-700 text-sm font-medium mb-4">
                    You may be looking to buy
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setSearchQuery("Account Management")}
                      className="px-5 py-2 bg-white border border-gray-400 rounded-full text-sm text-gray-600 hover:border-[#00a699] hover:text-[#00a699] transition-colors flex items-center gap-2"
                    >
                      Account Management
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - My Orders Card */}
            <div className="w-full lg:w-[320px]">
              <div className="bg-white rounded shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <h2 className="text-base font-bold text-black">My Orders</h2>
                  <button className="text-xs text-gray-600 hover:text-[#00a699]">
                    View All...
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xs font-medium text-black">
                            {order.title}
                          </h3>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {order.suppliers} Suppliers
                          </p>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {order.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Recommended Categories */}
          <div className="w-full lg:w-[45%]">
            <h2 className="text-base font-bold text-black mb-3">Recommended Categories</h2>
            
            <div className="space-y-3">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                >
                  <div className="w-24 h-20 bg-gray-100 flex-shrink-0">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-center relative">
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <h3 className="text-sm font-medium text-black pr-6">
                      {category.name}
                    </h3>
                    <p className="text-xs text-black font-medium mt-1">Get Quotes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product of Interest */}
          <div className="w-full lg:w-[55%]">
            <h2 className="text-base font-bold text-black mb-3">Product of Interest</h2>
            
            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden w-[280px]">
              <div className="h-36 bg-gray-100">
                <img 
                  src={productsOfInterest[0].image} 
                  alt={productsOfInterest[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium text-black">
                  {productsOfInterest[0].name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  By: {productsOfInterest[0].company}
                </p>
                <button className="mt-3 text-[#00a699] text-xs font-semibold flex items-center justify-center gap-1 mx-auto hover:underline">
                  <MessageSquare className="w-3 h-3" />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}