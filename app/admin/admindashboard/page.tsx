'use client';
import React, { useState } from 'react';
import { BarChart3, Users, ShoppingCart, DollarSign, TrendingUp, Search, Bell, Settings, Menu, Home, Package, FileText, MessageSquare, Calendar, LogOut, X } from 'lucide-react';



// Main Dashboard Component
const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  

  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: <DollarSign size={24} />, isPositive: true },
    { title: 'Total Users', value: '2,345', change: '+15.3%', icon: <Users size={24} />, isPositive: true },
    { title: 'Total Orders', value: '1,234', change: '-5.2%', icon: <ShoppingCart size={24} />, isPositive: false },
    { title: 'Conversion Rate', value: '3.24%', change: '+8.1%', icon: <TrendingUp size={24} />, isPositive: true },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Placed a new order #12345', time: '2 mins ago', avatar: 'JD' },
    { id: 2, user: 'Sarah Smith', action: 'Updated profile information', time: '15 mins ago', avatar: 'SS' },
    { id: 3, user: 'Mike Johnson', action: 'Cancelled order #12344', time: '1 hour ago', avatar: 'MJ' },
    { id: 4, user: 'Emily Brown', action: 'Left a 5-star review', time: '2 hours ago', avatar: 'EB' },
  ];

  const orders = [
    { id: '#12345', customer: 'John Doe', date: '2024-01-23', status: 'Completed', amount: '$299.00' },
    { id: '#12346', customer: 'Sarah Smith', date: '2024-01-23', status: 'Processing', amount: '$159.00' },
    { id: '#12347', customer: 'Mike Johnson', date: '2024-01-22', status: 'Shipped', amount: '$449.00' },
    { id: '#12348', customer: 'Emily Brown', date: '2024-01-22', status: 'Completed', amount: '$89.00' },
  ];

  const handleLogout = () => {
    console.log('Logout functionality here');
    alert('Logout clicked!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Using the Sidebar Component */}
     

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings size={24} className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

       
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
                    <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-lg transition-colors">
                Add Admin
              </button>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-lg transition-colors">
                Add Sub-Admin
              </button>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-lg transition-colors">
                Add Buyer
              </button>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-lg transition-colors">
                Add User
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-lg border border-gray-300 transition-colors">
                View Users
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;