'use client';
import React, { useState } from 'react';
import { Search, MapPin, Phone, ChevronLeft, MoreVertical, Star, Check, Paperclip, Mic } from 'lucide-react';

interface ChatItem {
  id: string;
  companyName: string;
  location: string;
  message: string;
  unreadCount: number;
  date: string;
  avatarUrl: string;
  type: 'message' | 'call';
  rating?: number;
  reviews?: number;
  gst?: boolean;
  trustseal?: boolean;
  memberSince?: string;
  responseRate?: string;
  phone?: string;
}

const CHAT_DATA: ChatItem[] = [
  {
    id: '1',
    companyName: 'Azential Solutions',
    location: 'New Delhi, Delhi',
    message: 'Voice call',
    unreadCount: 0,
    date: '23/2/26',
    avatarUrl: 'https://placehold.co/48/e8f4f8/0ea5e9?text=A',
    type: 'call',
    rating: 4.0,
    reviews: 17,
    gst: true,
    trustseal: true,
    memberSince: '10 months',
    responseRate: '84%',
    phone: '08044922952'
  },
  {
    id: '2',
    companyName: 'Friday Solution',
    location: 'Jaipur, Rajasthan',
    message: 'Voice call',
    unreadCount: 0,
    date: '21/2/26',
    avatarUrl: 'https://placehold.co/48/1e3a5f/ffffff?text=F',
    type: 'call'
  },
  {
    id: '3',
    companyName: 'Computer World',
    location: 'Vaniyambadi, Tamil Nadu',
    message: 'Hi Ritik, Computer World, Vaniyambadi has received your Enq',
    unreadCount: 2,
    date: '21/2/26',
    avatarUrl: 'https://placehold.co/48/000000/00ff00?text=C',
    type: 'message'
  },
  {
    id: '4',
    companyName: 'Agencenter India Private Limited',
    location: 'New Delhi, Delhi',
    message: 'Can you please share a suitable time to talk?',
    unreadCount: 0,
    date: '20/2/26',
    avatarUrl: 'https://placehold.co/48/c9a227/000000?text=A',
    type: 'message'
  },
  {
    id: '5',
    companyName: 'Ratan Ecom Solutions',
    location: 'Lucknow, Uttar Pradesh',
    message: 'Please find my catalog link: https://www.indiamart.com/ratan',
    unreadCount: 2,
    date: '19/2/26',
    avatarUrl: 'https://placehold.co/48/d1d5db/6b7280?text=R',
    type: 'message'
  },
  {
    id: '6',
    companyName: 'Filfora Store',
    location: 'Bhopal, Madhya Pradesh',
    message: 'Hi Ritik, Filfora Store, Bhopal has received your Enquiry.',
    unreadCount: 2,
    date: '19/2/26',
    avatarUrl: 'https://placehold.co/48/15803d/ffffff?text=F',
    type: 'message'
  }
];

// Convert the uploaded image to base64 data URL
const WHATSAPP_BACKGROUND = '/mnt/user-data/uploads/1772109286244_image.png';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedChat = CHAT_DATA.find(c => c.id === selectedChatId);
  
  const filteredChats = activeTab === 'Unread' 
    ? CHAT_DATA.filter(c => c.unreadCount > 0) 
    : CHAT_DATA;

  return (
    <div className="flex h-screen w-full bg-white font-sans antialiased overflow-hidden">
      {/* Left Sidebar */}
      <div className={`w-[360px] flex flex-col border-r border-gray-200 bg-white ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Messages</h1>
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border-0 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 flex gap-2 mb-2">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeTab === 'All' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('Unread')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeTab === 'Unread' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Unread
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChatId === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              {/* Avatar */}
              <div className="shrink-0">
                <img 
                  src={chat.avatarUrl} 
                  alt={chat.companyName}
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">{chat.companyName}</h3>
                  <span className="text-xs text-gray-500 shrink-0">{chat.date}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{chat.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 min-w-0">
                    {chat.type === 'call' && (
                      <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                    )}
                    <span className={`truncate ${chat.type === 'call' ? 'text-gray-500' : 'text-gray-600'}`}>
                      {chat.message}
                    </span>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <span className="shrink-0 w-5 h-5 bg-[#00a699] text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className={`flex-1 relative flex flex-col ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Mobile Header */}
        {selectedChatId && (
          <div className="md:hidden flex items-center p-3 bg-white border-b border-gray-200">
            <button onClick={() => setSelectedChatId(null)} className="mr-2 p-1">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <span className="font-semibold text-gray-900">Back</span>
          </div>
        )}

        {!selectedChatId ? (
          /* Welcome Screen with Background Pattern */
          <div className="flex-1 relative flex flex-col items-center justify-center bg-[#f5f2ed]">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${WHATSAPP_BACKGROUND})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '400px auto',
                opacity: '0.15'
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, <span className="text-[#00a699]">Ritik</span>
              </h2>
              <p className="text-base text-gray-600 mb-12">
                Connect With Suppliers Seamlessly On IndiaMART
              </p>

              <div className="relative w-80 h-80">
                {/* Central illustration circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-xl">
                  {/* Person sitting with laptop */}
                  <div className="relative w-48 h-48">
                    {/* Chair/Bean bag */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-24 bg-[#7dd3c0] rounded-[60%] opacity-90"></div>
                    
                    {/* Person body */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-32 bg-[#00a699] rounded-t-[50px]">
                      {/* Laptop */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-14 bg-[#2c3e50] rounded-lg transform -rotate-12 shadow-lg">
                        <div className="absolute inset-1 bg-[#34495e] rounded"></div>
                      </div>
                    </div>
                    
                    {/* Head */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#fdbf60] rounded-full">
                      {/* Hair */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-10 bg-[#2c3e50] rounded-t-full"></div>
                    </div>
                    
                    {/* Arms */}
                    <div className="absolute top-16 left-6 w-6 h-16 bg-[#00a699] rounded-full transform rotate-45"></div>
                    <div className="absolute top-16 right-6 w-6 h-16 bg-[#00a699] rounded-full transform -rotate-45"></div>
                    
                    {/* Legs */}
                    <div className="absolute bottom-4 left-8 w-7 h-12 bg-[#1e3a5f] rounded-b-lg"></div>
                    <div className="absolute bottom-4 right-8 w-7 h-12 bg-[#1e3a5f] rounded-b-lg"></div>
                    
                    {/* Shoes */}
                    <div className="absolute bottom-3 left-7 w-9 h-5 bg-white rounded-full shadow"></div>
                    <div className="absolute bottom-3 right-7 w-9 h-5 bg-white rounded-full shadow"></div>
                  </div>
                </div>

                {/* Surrounding profile avatars */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full p-1 shadow-lg border-2 border-gray-100">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fed7aa] to-[#f9a826] flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute top-16 right-10 w-11 h-11 bg-white rounded-full p-1 shadow-lg border-2 border-gray-100">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffd93d] to-[#f4a261] flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-20 right-6 w-12 h-12 bg-white rounded-full p-1 shadow-lg border-2 border-gray-100">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#264653] to-[#1e3a5f] flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 left-4 w-11 h-11 bg-white rounded-full p-1 shadow-lg border-2 border-gray-100">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e76f51] to-[#d62828] flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedChat ? (
          /* Chat View with WhatsApp-style Background */
          <div className="flex-1 flex flex-col relative">
            {/* WhatsApp Doodle Background with Beige Color */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: `url(${WHATSAPP_BACKGROUND})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '350px auto',
                backgroundColor: '#ece5dd',
                opacity: '0.3'
              }}
            />

            {/* Detailed Header */}
            <div className="bg-white border-b border-gray-200 relative">
              {/* Network Warning Banner */}
              <div className="bg-[#fff4e6] border-b border-[#ffd8a8] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>⚠️</span>
                  <span>Slow network connection detected.</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="text-lg">×</span>
                </button>
              </div>
              
              {/* Main Header */}
              <div className="px-4 py-3 flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <img src={selectedChat.avatarUrl} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedChat.location}</span>
                      {selectedChat.rating && (
                        <>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-3.5 h-3.5 text-gray-300" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{selectedChat.rating}</span>
                          <span className="text-sm text-gray-500">({selectedChat.reviews})</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {selectedChat.gst && (
                        <div className="flex items-center gap-1 text-green-700">
                          <Check className="w-3 h-3" />
                          <span className="font-medium">GST</span>
                        </div>
                      )}
                      {selectedChat.trustseal && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <span>🛡️</span>
                          <span className="font-medium">TrustSEAL</span>
                        </div>
                      )}
                      {selectedChat.memberSince && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <span>👤</span>
                          <span>{selectedChat.memberSince}</span>
                        </div>
                      )}
                      {selectedChat.responseRate && (
                        <div className="flex items-center gap-1 text-green-700">
                          <span>📞</span>
                          <span className="font-medium">{selectedChat.responseRate} Response Rate</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-900">{selectedChat.phone || '08044922952'}</span>
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span>last seen today at 05:47 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto relative">
              <div className="p-4 space-y-4">
                {/* View Details Panel */}
                <div className="absolute top-4 right-4 bg-[#d9fdd3] rounded-lg shadow-md p-3 w-64 z-10 border-l-4 border-[#00a699]">
                  <button className="text-xs text-[#00a699] font-medium flex items-center gap-1 mb-2 hover:text-[#008c82]">
                    View Details <ChevronLeft className="w-3 h-3 rotate-180" />
                  </button>
                  <div className="space-y-1.5 text-xs">
                    <div className="font-semibold text-gray-900 mb-2">Create Seller Account</div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform:</span>
                      <span className="font-medium text-gray-900">Amazon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium text-gray-900">End-to-End Mgmt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Probable Requirement Type:</span>
                      <span className="font-medium text-gray-900">Business Use</span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 mt-3">20 Feb</div>
                </div>

                {/* Date Separator */}
                <div className="flex justify-center">
                  <span className="text-[11px] text-gray-600 bg-white/90 px-3 py-1 rounded-md shadow-sm">20 Feb</span>
                </div>

                {/* Received Message */}
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg rounded-tl-sm shadow-sm max-w-[70%] text-[13px] leading-relaxed text-gray-800">
                    <p className="mb-2">Hi Ritik,</p>
                    <p className="mb-2">Azential Solutions, New Delhi has received your Enquiry. We can deliver Create Seller Account.</p>
                    <p className="mb-2">Please find my catalog :</p>
                    <a href="#" className="text-[#0b93f6] hover:underline break-all">https://www.azentialsolutions.com/</a>
                    <p className="mt-2">Share more details or call us at 08044922952</p>
                    <div className="text-right text-[10px] text-gray-500 mt-1">20 Feb</div>
                  </div>
                </div>

                {/* Voice Call Button */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg shadow-sm p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <div className="w-10 h-10 bg-[#00a699] rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Voice call</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-[10px] text-gray-500">23 Feb</span>
                </div>

                {/* Date Separator */}
                <div className="flex justify-center mt-4">
                  <span className="text-[11px] text-gray-600 bg-white/90 px-3 py-1 rounded-md shadow-sm">23 Feb</span>
                </div>

                {/* Feedback Card */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center max-w-sm">
                    <p className="text-sm text-gray-700 mb-1">Your Feedback Matters. Please rate</p>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Azential Solutions</p>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 text-gray-300" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-[#f0f0f0] px-4 py-3 z-10 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Message" 
                    className="flex-1 bg-transparent border-0 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  />
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <button className="w-12 h-12 bg-[#00a699] rounded-full flex items-center justify-center shadow-md hover:bg-[#008c82]">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}