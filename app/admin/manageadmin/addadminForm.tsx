'use client';

import { useState } from 'react';

interface AdminForm {
  fullName: string;
  mobile: string;
  email: string;
  role: string;
  designation: string;
  status: 'Active' | 'Inactive';
}

interface AddAdminFormProps {
  onCancel: () => void;
  onSubmitSuccess?: () => void;
}

export default function AddAdminForm({ onCancel, onSubmitSuccess }: AddAdminFormProps) {
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

    // 🔗 API integration later
    console.log('Admin Created:', form);
    alert('Admin account created successfully!');
    
    // Reset form
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      role: 'Admin',
      designation: '',
      status: 'Active',
    });

    // Call success callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto"> {/* Increased width container */}
      <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Two column layout on medium screens */}
          {/* Full Name */}
          <div className="md:col-span-2"> {/* Full width on medium screens */}
            <label className="block text-sm font-medium mb-2"> {/* Increased margin */}
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" // Larger input
            />
          </div>

          {/* Mobile */}
          <div className="md:col-span-2"> {/* Full width on medium screens */}
            <label className="block text-sm font-medium mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2"> {/* Increased text size */}
              Primary identifier for login via OTP
            </p>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Email ID
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@company.com (optional)"
              className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Role
            </label>
            <input
              value="Admin"
              disabled
              className="w-full bg-gray-100 border rounded-lg px-4 py-3 text-base text-gray-500"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Designation
            </label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g., IT Manager, Operations Head (optional)"
              className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-4 rounded-lg"> {/* Larger info box */}
          An OTP-based invitation will be sent to the mobile number for account activation.
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6"> {/* Increased padding and gap */}
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors" // Larger button
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors"
          >
            Create Admin Account
          </button>
        </div>
      </form>
    </div>
  );
}