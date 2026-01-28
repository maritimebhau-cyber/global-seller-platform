'use client';

import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, MoreVertical } from 'lucide-react';

interface Admin {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  role: string;
  designation: string;
  status: 'Active' | 'Inactive';
}

interface AdminForm {
  fullName: string;
  mobile: string;
  email: string;
  role: string;
  designation: string;
  status: 'Active' | 'Inactive';
}

export default function AdminManagementPage() {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      fullName: 'John Doe',
      mobile: '9876543210',
      email: 'john@company.com',
      role: 'Admin',
      designation: 'IT Manager',
      status: 'Active',
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      mobile: '9876543211',
      email: 'jane@company.com',
      role: 'Admin',
      designation: 'Operations Head',
      status: 'Active',
    },
  ]);

  const [form, setForm] = useState<AdminForm>({
    fullName: '',
    mobile: '',
    email: '',
    role: 'Admin',
    designation: '',
    status: 'Active',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (view === 'edit' && editingAdmin) {
      // Update existing admin
      setAdmins(prev =>
        prev.map(admin =>
          admin.id === editingAdmin.id ? { ...admin, ...form } : admin
        )
      );
      alert('Admin updated successfully!');
    } else {
      // Create new admin
      const newAdmin: Admin = {
        id: Date.now().toString(),
        ...form,
      };
      setAdmins(prev => [...prev, newAdmin]);
      alert('Admin account created successfully!');
    }

    // Reset form and go back to list
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      role: 'Admin',
      designation: '',
      status: 'Active',
    });
    setEditingAdmin(null);
    setView('list');
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setForm({
      fullName: admin.fullName,
      mobile: admin.mobile,
      email: admin.email,
      role: admin.role,
      designation: admin.designation,
      status: admin.status,
    });
    setView('edit');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      alert('Admin deleted successfully!');
    }
  };

  const handleCancel = () => {
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      role: 'Admin',
      designation: '',
      status: 'Active',
    });
    setEditingAdmin(null);
    setView('list');
  };

  // List View
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Admin Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage admin accounts and permissions
              </p>
            </div>
            <button
              onClick={() => setView('add')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700"
            >
              + Add New Admin
            </button>
          </div>

          {/* Admin List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                    Mobile
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                    Designation
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{admin.fullName}</td>
                    <td className="px-4 py-3 text-sm">{admin.mobile}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {admin.email || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">{admin.designation || '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          admin.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(admin)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Add/Edit Form View
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* BACK */}
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 text-sm text-gray-600 mb-4 hover:text-gray-900"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* TITLE */}
      <h1 className="text-xl font-semibold">
        {view === 'edit' ? 'Edit Admin' : 'Add New Admin'}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        {view === 'edit'
          ? 'Update admin account details'
          : 'Create a Super Admin account with full system access'}
      </p>

      {/* FORM CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-lg border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              required
              maxLength={10}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Primary identifier for login via OTP
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email ID</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@company.com (optional)"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              value="Admin"
              disabled
              className="w-full bg-gray-100 border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Designation
            </label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g., IT Manager, Operations Head (optional)"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* INFO BOX */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-md">
            {view === 'edit'
              ? 'Changes will be saved immediately upon submission.'
              : 'An OTP-based invitation will be sent to the mobile number for account activation.'}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="border px-4 py-2 rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700"
            >
              {view === 'edit' ? 'Update Admin' : 'Create Admin Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}