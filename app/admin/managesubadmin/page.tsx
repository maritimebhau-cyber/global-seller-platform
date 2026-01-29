'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Eye, UserX, X, Check, Plus } from 'lucide-react';

interface SubAdminFormData {
  fullName: string;
  mobileNumber: string;
  emailId: string;
  role: string;
  designation: string;
  status: 'Active' | 'Inactive';
}

interface SubAdmin {
  id: string;
  name: string;
  initial: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastActive: string;
  role: string;
  department: string;
}

export default function ManageSubAdmins() {
  // Manage Sub-Admins State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showAddSubAdminModal, setShowAddSubAdminModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [disableSuccess, setDisableSuccess] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<SubAdmin | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    department: '',
    status: 'active' as 'active' | 'inactive',
  });

  // Add Sub-Admin Form State
  const [addFormData, setAddFormData] = useState<SubAdminFormData>({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    role: 'Sub-Admin',
    designation: '',
    status: 'Active',
  });

  const [addFormErrors, setAddFormErrors] = useState<Partial<Record<keyof SubAdminFormData, string>>>({});

  // Sub-Admins Data
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([
    {
      id: '1',
      name: 'John Smith',
      initial: 'J',
      email: 'john.smith@example.com',
      phone: '+91 9876543210',
      status: 'active',
      createdAt: '2024-01-15',
      lastActive: '2 hours ago',
      role: 'Manager',
      department: 'Operations',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      initial: 'S',
      email: 'sarah.wilson@example.com',
      phone: '+91 9876543211',
      status: 'active',
      createdAt: '2024-02-20',
      lastActive: '1 day ago',
      role: 'Supervisor',
      department: 'Sales',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      initial: 'M',
      email: 'mike.johnson@example.com',
      phone: '+91 9876543212',
      status: 'inactive',
      createdAt: '2023-12-10',
      lastActive: '1 week ago',
      role: 'Coordinator',
      department: 'Support',
    },
    {
      id: '4',
      name: 'Emily Davis',
      initial: 'E',
      email: 'emily.davis@example.com',
      phone: '+91 9876543213',
      status: 'active',
      createdAt: '2024-03-05',
      lastActive: '5 minutes ago',
      role: 'Team Lead',
      department: 'Marketing',
    },
    {
      id: '5',
      name: 'Robert Brown',
      initial: 'R',
      email: 'robert.brown@example.com',
      phone: '+91 9876543214',
      status: 'active',
      createdAt: '2024-01-28',
      lastActive: '3 hours ago',
      role: 'Assistant Manager',
      department: 'Operations',
    },
  ]);

  // Close modals when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowViewModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowDisableModal(false);
        setShowFilterModal(false);
        setShowAddSubAdminModal(false);
        setShowActionsMenu(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showActionsMenu) {
        setShowActionsMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showActionsMenu]);

  // Filtered admins
  const filteredAdmins = subAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || admin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Add Sub-Admin Form Handlers
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (addFormErrors[name as keyof SubAdminFormData]) {
      setAddFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubAdminFormData, string>> = {};

    if (!addFormData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!addFormData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(addFormData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setAddFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddForm()) {
      // Create new sub-admin
      const newSubAdmin: SubAdmin = {
        id: (subAdmins.length + 1).toString(),
        name: addFormData.fullName,
        initial: addFormData.fullName.charAt(0).toUpperCase(),
        email: addFormData.emailId,
        phone: `+91 ${addFormData.mobileNumber}`,
        status: addFormData.status.toLowerCase() as 'active' | 'inactive',
        createdAt: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
        role: addFormData.role,
        department: addFormData.designation,
      };

      // Add to list
      setSubAdmins(prev => [newSubAdmin, ...prev]);
      
      // Reset form and close modal
      setAddFormData({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        role: 'Sub-Admin',
        designation: '',
        status: 'Active',
      });
      setAddFormErrors({});
      setShowAddSubAdminModal(false);
      
      console.log('New sub-admin created:', newSubAdmin);
    }
  };

  const handleAddCancel = () => {
    setAddFormData({
      fullName: '',
      mobileNumber: '',
      emailId: '',
      role: 'Sub-Admin',
      designation: '',
      status: 'Active',
    });
    setAddFormErrors({});
    setShowAddSubAdminModal(false);
  };

  // Manage Sub-Admins Handlers
  const handleEdit = (id: string) => {
    const admin = subAdmins.find(a => a.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      setEditForm({
        name: admin.name,
        phone: admin.phone.replace('+91 ', ''),
        email: admin.email,
        role: admin.role,
        department: admin.department,
        status: admin.status,
      });
      setShowEditModal(true);
    }
    setShowActionsMenu(null);
  };

  const handleSaveEdit = () => {
    if (!selectedAdmin) return;
    
    setSubAdmins(prev => prev.map(a => 
      a.id === selectedAdmin.id 
        ? { 
            ...a, 
            name: editForm.name,
            initial: editForm.name.charAt(0).toUpperCase(),
            phone: `+91 ${editForm.phone}`,
            email: editForm.email,
            role: editForm.role,
            department: editForm.department,
            status: editForm.status,
          } 
        : a
    ));
    
    setShowEditModal(false);
    setSelectedAdmin(null);
  };

  const handleDisableAccount = (id: string) => {
    const admin = subAdmins.find(a => a.id === id);
    setSelectedAdmin(admin || null);
    setDisableSuccess(false);
    setShowDisableModal(true);
    setShowActionsMenu(null);
  };

  const confirmDisableAccount = () => {
    if (!selectedAdmin) return;
    
    setDisableSuccess(true);
    
    setTimeout(() => {
      setSubAdmins(prev => prev.map(a => 
        a.id === selectedAdmin.id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a
      ));
      setShowDisableModal(false);
      setSelectedAdmin(null);
      setDisableSuccess(false);
    }, 1500);
  };

  const handleDeletePermanently = (id: string) => {
    const admin = subAdmins.find(a => a.id === id);
    setSelectedAdmin(admin || null);
    setDeleteSuccess(false);
    setShowDeleteModal(true);
    setShowActionsMenu(null);
  };

  const confirmDeletePermanently = () => {
    if (!selectedAdmin) return;
    
    setDeleteSuccess(true);
    
    setTimeout(() => {
      setSubAdmins(prev => prev.filter(a => a.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      setDeleteSuccess(false);
    }, 1500);
  };

  const handleView = (id: string) => {
    const admin = subAdmins.find(a => a.id === id);
    setSelectedAdmin(admin || null);
    setShowViewModal(true);
    setShowActionsMenu(null);
  };

  const applyFilter = () => {
    setShowFilterModal(false);
  };

  const resetFilter = () => {
    setFilterStatus('all');
    setShowFilterModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal text-gray-800">Manage Sub-Admins</h1>
            <p className="text-gray-500 text-sm mt-1">View and manage sub admins</p>
          </div>
          <button 
            onClick={() => setShowAddSubAdminModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-md text-sm font-medium shadow-sm flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Sub-Admin
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg border">
          {/* Search and Filter */}
          <div className="p-5 border-b flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm hover:bg-gray-50"
            >
              <Filter size={16} />
              Filter
              {filterStatus !== 'all' && (
                <span className="ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">1</span>
              )}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-white">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Created At
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Last Active
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No sub-admins found
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm">
                            {admin.initial}
                          </div>
                          <span className="text-sm text-gray-900">{admin.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded ${
                            admin.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{admin.createdAt}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{admin.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowActionsMenu(showActionsMenu === admin.id ? null : admin.id);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          >
                            <MoreVertical size={18} className="text-gray-500" />
                          </button>
                          
                          {showActionsMenu === admin.id && (
                            <div 
                              className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleView(admin.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Eye size={16} />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleEdit(admin.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Edit size={16} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDisableAccount(admin.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                                >
                                  <UserX size={16} />
                                  {admin.status === 'active' ? 'Disable Account' : 'Enable Account'}
                                </button>
                                <div className="border-t my-1" />
                                <button
                                  onClick={() => handleDeletePermanently(admin.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={16} />
                                  Delete Permanently
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t flex items-center justify-between bg-white">
            <div className="text-sm text-gray-600">
              Showing {filteredAdmins.length > 0 ? 1 : 0} to {filteredAdmins.length} of {filteredAdmins.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3.5 py-2 text-sm bg-indigo-600 text-white rounded">
                1
              </button>
              <button className="px-3.5 py-2 text-sm text-gray-600 border rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3.5 py-2 text-sm text-gray-600 border rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sub-Admin Modal */}
      {showAddSubAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Add New Sub-Admin
                </h3>
                <p className="mt-1 text-slate-600 text-sm">
                  Create a Sub-Admin account with limited permissions
                </p>
              </div>
              <button 
                onClick={handleAddCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={addFormData.fullName}
                  onChange={handleAddInputChange}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    addFormErrors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-900 placeholder-slate-400`}
                />
                {addFormErrors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{addFormErrors.fullName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={addFormData.mobileNumber}
                  onChange={handleAddInputChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    addFormErrors.mobileNumber ? 'border-red-300 bg-red-50' : 'border-slate-200'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-900 placeholder-slate-400`}
                />
                {addFormErrors.mobileNumber && (
                  <p className="mt-1 text-sm text-red-600">{addFormErrors.mobileNumber}</p>
                )}
                <p className="mt-1 text-xs text-slate-500">
                  Primary identifier for login via OTP
                </p>
              </div>

              {/* Email ID */}
              <div>
                <label htmlFor="emailId" className="block text-sm font-medium text-slate-700 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={addFormData.emailId}
                  onChange={handleAddInputChange}
                  placeholder="subadmin@company.com (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={addFormData.role}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>

              {/* Designation */}
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-slate-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={addFormData.designation}
                  onChange={handleAddInputChange}
                  placeholder="e.g., Support Manager, Sales Lead (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={addFormData.status}
                  onChange={handleAddInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-slate-900 bg-white cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  An OTP-based invitation will be sent to the mobile number for account activation. 
                  Sub-Admins can only manage Buyers and Users.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleAddCancel}
                  className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200 flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-teal-600/30"
                >
                  <Plus size={18} />
                  Create Sub-Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Filter Sub-Admins</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={filterStatus === 'all'}
                      onChange={() => setFilterStatus('all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={filterStatus === 'active'}
                      onChange={() => setFilterStatus('active')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={filterStatus === 'inactive'}
                      onChange={() => setFilterStatus('inactive')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t">
              <button
                onClick={resetFilter}
                className="flex-1 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={applyFilter}
                className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-md text-sm hover:bg-emerald-600"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disable Account Modal */}
      {showDisableModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              {!disableSuccess ? (
                <>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-orange-100 rounded-full mb-4">
                    <UserX className="text-orange-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {selectedAdmin.status === 'active' ? 'Disable Account' : 'Enable Account'}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-6">
                    Are you sure you want to {selectedAdmin.status === 'active' ? 'disable' : 'enable'} <span className="font-semibold">{selectedAdmin.name}'s</span> account?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDisableModal(false);
                        setSelectedAdmin(null);
                      }}
                      className="flex-1 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDisableAccount}
                      className="flex-1 px-4 py-2 text-white rounded-md text-sm hover:opacity-90"
                      style={{ backgroundColor: '#2e3192' }}
                    >
                      {selectedAdmin.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-4" style={{ backgroundColor: '#2e3192' }}>
                    <Check className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {selectedAdmin.status === 'active' ? 'Account Disabled!' : 'Account Enabled!'}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {selectedAdmin.name}'s account has been {selectedAdmin.status === 'active' ? 'disabled' : 'enabled'} successfully.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              {!deleteSuccess ? (
                <>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4" style={{ backgroundColor: '#2e3192' }}>
                    <Trash2 className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Delete Permanently
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-6">
                    Are you sure you want to permanently delete <span className="font-semibold">{selectedAdmin.name}</span>? This action cannot be undone and all data associated with this account will be permanently removed.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setSelectedAdmin(null);
                      }}
                      className="flex-1 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeletePermanently}
                      className="flex-1 px-4 py-2 text-white rounded-md text-sm hover:opacity-90"
                      style={{ backgroundColor: '#2e3192' }}
                    >
                      Delete Permanently
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-4" style={{ backgroundColor: '#2e3192' }}>
                    <Check className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Deleted Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {selectedAdmin.name} has been permanently deleted from the system.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Sub-Admin Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-2xl">
                  {selectedAdmin.initial}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedAdmin.name}</h4>
                  <p className="text-sm text-gray-500">{selectedAdmin.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAdmin.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAdmin.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAdmin.department}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${
                      selectedAdmin.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedAdmin.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Created At</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAdmin.createdAt}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Last Active</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAdmin.lastActive}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 border rounded-md text-sm hover:bg-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedAdmin.id);
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-md text-sm hover:bg-emerald-600"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Edit Sub-Admin Details</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">Primary identifier for login via OTP</p>
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  placeholder="Admin"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  placeholder="IT Manager"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-700">
                  Changes will be saved immediately upon submission.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t bg-white sticky bottom-0">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-emerald-500 text-white rounded-md text-sm hover:bg-emerald-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}