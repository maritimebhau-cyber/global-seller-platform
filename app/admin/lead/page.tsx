'use client';
// pages/leads/index.tsx
import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { 
  Phone, 
  Mail, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileDown,
  Search,
  Filter,
  ChevronDown,
  X,
  Download,
  Eye,
  Edit3,
  MoreHorizontal,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface Lead {
  id: string;
  buyer: string;
  phone: string;
  email: string;
  product: string;
  category: string;
  requirement: string;
  dateTime: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Lost';
  notes?: string;
}

const initialLeads: Lead[] = [
  {
    id: '1',
    buyer: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    product: 'Industrial Safety Helmet',
    category: 'Safety Equipment',
    requirement: 'Need bulk order of 500 safety helmets for construction project. Please share best price.',
    dateTime: '20 Jan, 09:30 am',
    status: 'New',
    notes: ''
  },
  {
    id: '2',
    buyer: 'Priya Sharma',
    phone: '+91 87654 32109',
    email: 'priya.s@business.com',
    product: 'Fire Extinguisher',
    category: 'Fire Safety',
    requirement: 'Looking for ABC type fire extinguishers, 5kg capacity. Need 100 units.',
    dateTime: '20 Jan, 08:15 am',
    status: 'Contacted',
    notes: 'Called at 10am, requested quotation'
  },
  {
    id: '3',
    buyer: 'Amit Patel',
    phone: '+91 76543 21098',
    email: 'amit.patel@factory.in',
    product: 'Safety Goggles',
    category: 'Safety Equipment',
    requirement: 'Required for factory workers. Need anti-fog coating. Quantity: 200 pairs.',
    dateTime: '19 Jan, 04:45 pm',
    status: 'In Progress',
    notes: 'Sent samples, waiting for approval'
  },
  {
    id: '4',
    buyer: 'Sneha Reddy',
    phone: '+91 65432 10987',
    email: 'sneha.reddy@corp.in',
    product: 'Reflective Safety Jacket',
    category: 'Safety Equipment',
    requirement: 'Need high-visibility jackets for night shift workers. Size: L and XL preferred.',
    dateTime: '19 Jan, 02:20 pm',
    status: 'Closed',
    notes: 'Order confirmed, payment received'
  },
  {
    id: '5',
    buyer: 'Vikram Singh',
    phone: '+91 54321 09876',
    email: 'vikram.s@industry.com',
    product: 'Industrial Gloves',
    category: 'Safety Equipment',
    requirement: 'Heavy duty gloves for welding work. Heat resistant required.',
    dateTime: '19 Jan, 11:00 am',
    status: 'Lost',
    notes: 'Went with competitor due to price'
  },
];

const statusOptions: Lead['status'][] = ['New', 'Contacted', 'In Progress', 'Closed', 'Lost'];

const getStatusBadgeClass = (status: Lead['status']) => {
  const classes = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-purple-100 text-purple-700 border-purple-200',
    'In Progress': 'bg-orange-100 text-orange-700 border-orange-200',
    'Closed': 'bg-green-100 text-green-700 border-green-200',
    'Lost': 'bg-red-100 text-red-700 border-red-200',
  };
  return classes[status];
};

const getStatusIcon = (status: Lead['status']) => {
  switch (status) {
    case 'New': return Clock;
    case 'Contacted': return Phone;
    case 'In Progress': return TrendingUp;
    case 'Closed': return CheckCircle2;
    case 'Lost': return XCircle;
  }
};

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'All'>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'buyer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    let result = leads.filter(lead => {
      const matchesSearch = 
        lead.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      } else if (sortBy === 'buyer') {
        comparison = a.buyer.localeCompare(b.buyer);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [leads, searchQuery, statusFilter, sortBy, sortOrder]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const inProgress = leads.filter(l => l.status === 'In Progress').length;
    const closed = leads.filter(l => l.status === 'Closed').length;
    const lost = leads.filter(l => l.status === 'Lost').length;
    const contacted = leads.filter(l => l.status === 'Contacted').length;

    return [
      { 
        label: 'Total Leads', 
        value: total.toString(), 
        subtext: '+0 today', 
        icon: Phone, 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-50',
        onClick: () => setStatusFilter('All')
      },
      { 
        label: 'New', 
        value: newLeads.toString(), 
        subtext: 'Pending action', 
        icon: Clock, 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-50',
        onClick: () => setStatusFilter('New')
      },
      { 
        label: 'In Progress', 
        value: inProgress.toString(), 
        subtext: 'Active follow-ups', 
        icon: TrendingUp, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50',
        onClick: () => setStatusFilter('In Progress')
      },
      { 
        label: 'Closed', 
        value: closed.toString(), 
        subtext: 'Successfully closed', 
        icon: CheckCircle2, 
        color: 'text-green-600', 
        bgColor: 'bg-green-50',
        onClick: () => setStatusFilter('Closed')
      },
      { 
        label: 'Lost', 
        value: lost.toString(), 
        subtext: 'Not converted', 
        icon: XCircle, 
        color: 'text-red-600', 
        bgColor: 'bg-red-50',
        onClick: () => setStatusFilter('Lost')
      },
    ];
  }, [leads]);

  // Update lead status
  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  // Update lead notes
  const updateLeadNotes = (leadId: string, notes: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, notes } : lead
    ));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Buyer', 'Phone', 'Email', 'Product', 'Category', 'Requirement', 'Date Time', 'Status', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        `"${lead.buyer}"`,
        lead.phone,
        lead.email,
        `"${lead.product}"`,
        `"${lead.category}"`,
        `"${lead.requirement}"`,
        lead.dateTime,
        lead.status,
        `"${lead.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Open detail modal
  const openDetailModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (lead: Lead) => {
    setEditingLead({ ...lead });
    setIsEditModalOpen(true);
  };

  // Save edited lead
  const saveEditedLead = () => {
    if (editingLead) {
      setLeads(prev => prev.map(lead => 
        lead.id === editingLead.id ? editingLead : lead
      ));
      setIsEditModalOpen(false);
      setEditingLead(null);
    }
  };

  // Quick status update from dropdown
  const StatusDropdown = ({ lead }: { lead: Lead }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(lead.status)} hover:opacity-80 transition-opacity`}
        >
          {lead.status}
          <ChevronDown className="w-3 h-3" />
        </button>
        
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute z-20 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    updateLeadStatus(lead.id, status);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                    lead.status === status ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    status === 'New' ? 'bg-blue-500' :
                    status === 'Contacted' ? 'bg-purple-500' :
                    status === 'In Progress' ? 'bg-orange-500' :
                    status === 'Closed' ? 'bg-green-500' :
                    'bg-red-500'
                  }`} />
                  {status}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Leads Dashboard</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Leads Dashboard</h1>
              <p className="text-gray-500 mt-1">Overview of all leads and enquiries</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  setSortBy('date');
                  setSortOrder('desc');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Filters
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((stat) => (
              <button
                key={stat.label}
                onClick={stat.onClick}
                className={`bg-white rounded-lg border border-gray-200 p-4 text-left hover:shadow-md transition-all ${
                  statusFilter !== 'All' && stat.label !== 'Total Leads' && statusFilter === stat.label ? 'ring-2 ring-blue-500 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by buyer, product, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'All')}
                    className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[140px]"
                  >
                    <option value="All">All Status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field as 'date' | 'status' | 'buyer');
                      setSortOrder(order as 'asc' | 'desc');
                    }}
                    className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[160px]"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="buyer-asc">Buyer A-Z</option>
                    <option value="buyer-desc">Buyer Z-A</option>
                    <option value="status-asc">Status A-Z</option>
                    <option value="status-desc">Status Z-A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
            {(searchQuery || statusFilter !== 'All') && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="hover:bg-blue-100 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {statusFilter !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('All')} className="hover:bg-purple-100 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <span className="text-sm text-gray-400 ml-auto">
                  Showing {filteredLeads.length} of {leads.length} leads
                </span>
              </div>
            )}
          </div>

          {/* Recent Leads Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
                <p className="text-sm text-gray-500">Latest enquiries received</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Buyer
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Contact
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Product/Category
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Requirement
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Date & Time
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-8 h-8 text-gray-300" />
                          <p>No leads found matching your criteria</p>
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setStatusFilter('All');
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Clear filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{lead.buyer}</div>
                          {lead.notes && (
                            <div className="text-xs text-gray-400 mt-1 truncate max-w-[150px]">
                              Note: {lead.notes}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3 text-emerald-500" />
                              <a href={`tel:${lead.phone}`} className="hover:text-emerald-600 transition-colors">
                                {lead.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">
                                {lead.email}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{lead.product}</div>
                          <div className="text-xs text-gray-500">{lead.category}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate" title={lead.requirement}>
                            {lead.requirement}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-600">{lead.dateTime}</div>
                        </td>
                        <td className="px-4 py-4">
                          <StatusDropdown lead={lead} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDetailModal(lead)}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(lead)}
                              className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Edit Lead"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Lead Details</h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedLead.buyer}</h4>
                  <p className="text-gray-500 mt-1">{selectedLead.email}</p>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <a href={`tel:${selectedLead.phone}`} className="text-lg font-medium text-gray-900 hover:text-emerald-600">
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Received</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{selectedLead.dateTime}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h5 className="font-medium text-gray-900 mb-2">Product Interest</h5>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-medium text-blue-900">{selectedLead.product}</p>
                  <p className="text-sm text-blue-700 mt-1">{selectedLead.category}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h5 className="font-medium text-gray-900 mb-2">Requirements</h5>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                  {selectedLead.requirement}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                <textarea
                  value={selectedLead.notes || ''}
                  onChange={(e) => {
                    updateLeadNotes(selectedLead.id, e.target.value);
                    setSelectedLead({ ...selectedLead, notes: e.target.value });
                  }}
                  placeholder="Add notes about this lead..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    const nextStatus = statusOptions[(statusOptions.indexOf(selectedLead.status) + 1) % statusOptions.length];
                    updateLeadStatus(selectedLead.id, nextStatus);
                    setSelectedLead({ ...selectedLead, status: nextStatus });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  Update Status
                </button>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium text-center transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Lead</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
                  <input
                    type="text"
                    value={editingLead.buyer}
                    onChange={(e) => setEditingLead({ ...editingLead, buyer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingLead.email}
                  onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <input
                    type="text"
                    value={editingLead.product}
                    onChange={(e) => setEditingLead({ ...editingLead, product: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingLead.category}
                    onChange={(e) => setEditingLead({ ...editingLead, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as Lead['status'] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  value={editingLead.requirement}
                  onChange={(e) => setEditingLead({ ...editingLead, requirement: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingLead.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedLead}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}