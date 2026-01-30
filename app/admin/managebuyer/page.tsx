'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, MoreVertical, Mail, MapPin, User, AlertTriangle, Ban, FileText, X, Trash2, Plus } from 'lucide-react';

interface Buyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiries: number;
  lastActive: string;
  location: string;
  spamScore: number;
  status: 'Active' | 'Flagged' | 'Blocked';
  notes?: string[];
}

const buyersData: Buyer[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    enquiries: 24,
    lastActive: '2 hours ago',
    location: 'Mumbai, Maharashtra',
    spamScore: 10,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Amit Patel',
    email: 'amit.patel@company.in',
    phone: '+91 87654 32109',
    enquiries: 15,
    lastActive: '1 day ago',
    location: 'Ahmedabad, Gujarat',
    spamScore: 5,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Suspicious User',
    email: 'spam@tempmail.com',
    phone: '+91 76543 21098',
    enquiries: 85,
    lastActive: '30 minutes ago',
    location: 'Unknown',
    spamScore: 85,
    status: 'Flagged',
  },
  {
    id: '4',
    name: 'Blocked User Account',
    email: 'blocked@example.com',
    phone: '+91 65432 10987',
    enquiries: 12,
    lastActive: '2 weeks ago',
    location: 'Delhi, NCR',
    spamScore: 95,
    status: 'Blocked',
  },
];

export default function BuyerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [buyers, setBuyers] = useState<Buyer[]>(buyersData);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Active' | 'Flagged' | 'Blocked'>('all');
  const [noteModal, setNoteModal] = useState<{ isOpen: boolean; buyerId: string | null }>({ isOpen: false, buyerId: null });
  const [noteText, setNoteText] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; buyerId: string | null; buyerName?: string }>({ 
    isOpen: false, 
    buyerId: null,
    buyerName: ''
  });
  const [addBuyerModal, setAddBuyerModal] = useState(false);
  const [newBuyer, setNewBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active' as 'Active' | 'Flagged' | 'Blocked',
  });

  const handleStatusChange = (buyerId: string, newStatus: 'Active' | 'Flagged' | 'Blocked') => {
    setBuyers(prevBuyers =>
      prevBuyers.map(buyer =>
        buyer.id === buyerId ? { ...buyer, status: newStatus } : buyer
      )
    );
    setOpenDropdown(null);
  };

  const openNoteModal = (buyerId: string) => {
    setNoteModal({ isOpen: true, buyerId });
    setOpenDropdown(null);
    setNoteText('');
  };

  const handleAddNote = () => {
    if (noteText.trim() && noteModal.buyerId) {
      setBuyers(prevBuyers =>
        prevBuyers.map(buyer =>
          buyer.id === noteModal.buyerId
            ? { ...buyer, notes: [...(buyer.notes || []), noteText.trim()] }
            : buyer
        )
      );
      setNoteModal({ isOpen: false, buyerId: null });
      setNoteText('');
    }
  };

  const handleDeleteNote = (buyerId: string, noteIndex: number) => {
    setBuyers(prevBuyers =>
      prevBuyers.map(buyer =>
        buyer.id === buyerId
          ? { ...buyer, notes: buyer.notes?.filter((_, index) => index !== noteIndex) }
          : buyer
      )
    );
  };

  const openDeleteModal = (buyerId: string, buyerName: string) => {
    setDeleteModal({ isOpen: true, buyerId, buyerName });
    setOpenDropdown(null);
  };

  const handleDeleteBuyer = () => {
    if (deleteModal.buyerId) {
      setBuyers(prevBuyers => prevBuyers.filter(buyer => buyer.id !== deleteModal.buyerId));
      setDeleteModal({ isOpen: false, buyerId: null, buyerName: '' });
    }
  };

  const handleAddBuyer = () => {
    if (newBuyer.name && newBuyer.email && newBuyer.phone) {
      const newId = (buyers.length + 1).toString();
      const newBuyerData: Buyer = {
        id: newId,
        name: newBuyer.name,
        email: newBuyer.email,
        phone: newBuyer.phone,
        enquiries: 0,
        lastActive: 'Just now',
        location: newBuyer.location || 'Not specified',
        spamScore: 0,
        status: newBuyer.status,
      };
      
      setBuyers(prev => [...prev, newBuyerData]);
      setAddBuyerModal(false);
      setNewBuyer({
        name: '',
        email: '',
        phone: '',
        location: '',
        status: 'Active',
      });
    }
  };

  const stats = {
    total: buyers.length,
    active: buyers.filter(b => b.status === 'Active').length,
    flagged: buyers.filter(b => b.status === 'Flagged').length,
    blocked: buyers.filter(b => b.status === 'Blocked').length,
  };

  const filteredBuyers = buyers.filter(buyer => {
    const matchesFilter = activeFilter === 'all' || buyer.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.phone.includes(searchQuery) ||
      buyer.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Buyer['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Flagged':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Blocked':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getStatusIcon = (status: Buyer['status']) => {
    switch (status) {
      case 'Active':
        return <User className="w-3.5 h-3.5" />;
      case 'Flagged':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'Blocked':
        return <Ban className="w-3.5 h-3.5" />;
    }
  };

  const getSpamScoreColor = (score: number) => {
    if (score >= 80) return 'text-rose-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              Buyer Management
            </h1>
            <p className="text-gray-500 text-base">
              Manage users who send product enquiries to sellers
            </p>
          </div>
          <button
            onClick={() => setAddBuyerModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Buyer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-left bg-white rounded-xl p-5 border transition-all ${
              activeFilter === 'all' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-gray-500 text-sm font-normal mb-2">Total Buyers</div>
            <div className="text-4xl font-semibold text-gray-900">{stats.total}</div>
          </button>
          
          <button
            onClick={() => setActiveFilter('Active')}
            className={`text-left bg-white rounded-xl p-5 border transition-all ${
              activeFilter === 'Active' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-gray-500 text-sm font-normal mb-2">Active</div>
            <div className="text-4xl font-semibold text-emerald-600">{stats.active}</div>
          </button>
          
          <button
            onClick={() => setActiveFilter('Flagged')}
            className={`text-left bg-white rounded-xl p-5 border transition-all ${
              activeFilter === 'Flagged' ? 'border-amber-500 ring-2 ring-amber-100' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-gray-500 text-sm font-normal mb-2">Flagged</div>
            <div className="text-4xl font-semibold text-orange-600">{stats.flagged}</div>
          </button>
          
          <button
            onClick={() => setActiveFilter('Blocked')}
            className={`text-left bg-white rounded-xl p-5 border transition-all ${
              activeFilter === 'Blocked' ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-gray-500 text-sm font-normal mb-2">Blocked</div>
            <div className="text-4xl font-semibold text-red-600">{stats.blocked}</div>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-white">
            <div className={`flex items-center gap-4 ${activeFilter !== 'all' ? 'mb-4' : ''}`}>
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all hover:border-gray-300">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filters</span>
              </button>
            </div>
            {activeFilter !== 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Showing:</span>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium border ${
                  activeFilter === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  activeFilter === 'Flagged' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {activeFilter}
                </span>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Buyer Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Enquiries
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Last Active
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Location
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Spam Score
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBuyers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <User className="w-12 h-12 mb-3" />
                        <p className="text-lg font-medium">No buyers found</p>
                        <p className="text-sm">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBuyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{buyer.name}</span>
                            {buyer.notes && buyer.notes.length > 0 && (
                              <div className="relative group">
                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full cursor-pointer">
                                  {buyer.notes.length}
                                </span>
                                <div className="absolute left-0 top-7 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
                                  <div className="font-semibold mb-2">Internal Notes:</div>
                                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                    {buyer.notes.map((note, index) => (
                                      <div key={index} className="text-gray-200 border-l-2 border-indigo-400 pl-2 py-1 flex items-start justify-between gap-2 group/note">
                                        <span className="flex-1">{note}</span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteNote(buyer.id, index);
                                          }}
                                          className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover/note:opacity-100 flex-shrink-0"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">{buyer.email}</div>
                          <div className="text-sm text-gray-400 mt-0.5">{buyer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{buyer.enquiries}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600 text-sm">{buyer.lastActive}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {buyer.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-semibold text-base ${getSpamScoreColor(buyer.spamScore)}`}>
                        {buyer.spamScore}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(buyer.status)}`}>
                        {getStatusIcon(buyer.status)}
                        {buyer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-indigo-600 hover:text-indigo-700 transition-colors p-1">
                          <Eye className="w-5 h-5" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === buyer.id ? null : buyer.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100 border border-gray-300"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          
                          {openDropdown === buyer.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setOpenDropdown(null)}
                              />
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                                {buyer.status === 'Blocked' ? (
                                  <>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Active')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <User className="w-4 h-4 text-emerald-600" />
                                      <span className="text-sm">Unblock Buyer</span>
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Flagged')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                                      <span className="text-sm">Flag for Review</span>
                                    </button>
                                  </>
                                ) : buyer.status === 'Flagged' ? (
                                  <>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Active')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <User className="w-4 h-4 text-emerald-600" />
                                      <span className="text-sm">Remove Flag</span>
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Blocked')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <Ban className="w-4 h-4 text-rose-600" />
                                      <span className="text-sm">Block Buyer</span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Blocked')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <Ban className="w-4 h-4 text-rose-600" />
                                      <span className="text-sm">Block Buyer</span>
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(buyer.id, 'Flagged')}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                                      <span className="text-sm">Flag for Review</span>
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={() => openNoteModal(buyer.id)}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                >
                                  <FileText className="w-4 h-4 text-indigo-600" />
                                  <span className="text-sm">Add Internal Note</span>
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button 
                                  onClick={() => openDeleteModal(buyer.id, buyer.name)}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-rose-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm">Delete Buyer</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Internal Note Modal */}
        {noteModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Add Internal Note</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add a private note about {buyers.find(b => b.id === noteModal.buyerId)?.name}
                </p>
              </div>
              
              <div className="p-6">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter your note here..."
                  className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
                />
                
                {noteModal.buyerId && buyers.find(b => b.id === noteModal.buyerId)?.notes && buyers.find(b => b.id === noteModal.buyerId)!.notes!.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Previous Notes:</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {buyers.find(b => b.id === noteModal.buyerId)?.notes?.map((note, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 flex items-start justify-between gap-2 group">
                          <span className="flex-1">{note}</span>
                          <button
                            onClick={() => handleDeleteNote(noteModal.buyerId!, index)}
                            className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={() => setNoteModal({ isOpen: false, buyerId: null })}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Buyer Modal */}
        {addBuyerModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                  <Plus className="w-6 h-6 text-emerald-600" />
                  Add New Buyer
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new buyer account
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newBuyer.name}
                      onChange={(e) => setNewBuyer({...newBuyer, name: e.target.value})}
                      placeholder="Enter buyer's full name"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newBuyer.email}
                      onChange={(e) => setNewBuyer({...newBuyer, email: e.target.value})}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newBuyer.phone}
                      onChange={(e) => setNewBuyer({...newBuyer, phone: e.target.value})}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newBuyer.location}
                      onChange={(e) => setNewBuyer({...newBuyer, location: e.target.value})}
                      placeholder="Enter location"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Status
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setNewBuyer({...newBuyer, status: 'Active'})}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          newBuyer.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        Active
                      </button>
                      <button
                        onClick={() => setNewBuyer({...newBuyer, status: 'Flagged'})}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          newBuyer.status === 'Flagged' 
                            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Flagged
                      </button>
                      <button
                        onClick={() => setNewBuyer({...newBuyer, status: 'Blocked'})}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          newBuyer.status === 'Blocked' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <Ban className="w-4 h-4" />
                        Blocked
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setAddBuyerModal(false);
                    setNewBuyer({
                      name: '',
                      email: '',
                      phone: '',
                      location: '',
                      status: 'Active',
                    });
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBuyer}
                  disabled={!newBuyer.name || !newBuyer.email || !newBuyer.phone}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Buyer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                  <Trash2 className="w-6 h-6 text-rose-600" />
                  Delete Permanently
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
                    <Trash2 className="w-8 h-8 text-rose-600" />
                  </div>
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this buyer?
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold text-gray-900">{deleteModal.buyerName}</span> will be permanently removed from the system.
                  </p>
                </div>
                
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-rose-800">Warning</p>
                      <p className="text-sm text-rose-700 mt-1">
                        This action will permanently delete all data associated with this buyer including enquiries, notes, and activity history.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, buyerId: null, buyerName: '' })}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBuyer}
                  className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Yes, Delete Buyer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}