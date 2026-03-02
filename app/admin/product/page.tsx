// app/products/page.tsx
'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  Plus,
  Edit3,
  Trash2,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Image as ImageIcon
} from 'lucide-react';

type ProductStatus = 'Active' | 'Pending' | 'Inactive';

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  minOrder: string;
  status: ProductStatus;
  uploadedBy: string;
  date: string;
  description?: string;
  price?: string;
  stock?: number;
  image?: string;
}

interface FilterState {
  category: string;
  status: ProductStatus | 'All';
  dateRange: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Industrial Safety Helmet',
    category: 'Safety Equipment',
    subCategory: 'Head Protection',
    minOrder: '100 Pieces',
    status: 'Active',
    uploadedBy: 'admin@company.com',
    date: '2026-01-15',
    description: 'High-quality industrial safety helmet with adjustable straps',
    price: '$25.00',
    stock: 500,
  },
  {
    id: '2',
    name: 'Heavy Duty Gloves',
    category: 'Safety Equipment',
    subCategory: 'Hand Protection',
    minOrder: '500 Pairs',
    status: 'Active',
    uploadedBy: 'subadmin@company.com',
    date: '2026-01-14',
    description: 'Cut-resistant heavy duty work gloves',
    price: '$12.50',
    stock: 1000,
  },
  {
    id: '3',
    name: 'Fire Extinguisher 5kg',
    category: 'Fire Safety',
    subCategory: 'Extinguishers',
    minOrder: '50 Units',
    status: 'Pending',
    uploadedBy: 'subadmin@company.com',
    date: '2026-01-18',
    description: 'ABC type fire extinguisher, 5kg capacity',
    price: '$45.00',
    stock: 200,
  },
  {
    id: '4',
    name: 'Safety Goggles',
    category: 'Safety Equipment',
    subCategory: 'Eye Protection',
    minOrder: '200 Pieces',
    status: 'Active',
    uploadedBy: 'admin@company.com',
    date: '2026-01-12',
    description: 'Anti-fog safety goggles with UV protection',
    price: '$8.99',
    stock: 750,
  },
  {
    id: '5',
    name: 'Reflective Jacket',
    category: 'Safety Equipment',
    subCategory: 'Body Protection',
    minOrder: '300 Pieces',
    status: 'Inactive',
    uploadedBy: 'admin@company.com',
    date: '2026-01-10',
    description: 'High-visibility reflective safety jacket',
    price: '$18.00',
    stock: 0,
  },
];

const CATEGORIES = ['All', 'Safety Equipment', 'Fire Safety', 'Electrical Safety', 'Chemical Safety'];
const SUB_CATEGORIES: Record<string, string[]> = {
  'Safety Equipment': ['Head Protection', 'Hand Protection', 'Eye Protection', 'Body Protection', 'Foot Protection'],
  'Fire Safety': ['Extinguishers', 'Alarms', 'Blankets', 'Sprinklers'],
  'Electrical Safety': ['Insulation', 'Grounding', 'Circuit Breakers'],
  'Chemical Safety': ['Spill Control', 'Storage', 'PPE'],
};

const DEFAULT_FORM_DATA: Omit<Product, 'id' | 'uploadedBy' | 'date'> = {
  name: '',
  category: 'Safety Equipment',
  subCategory: 'Head Protection',
  minOrder: '',
  status: 'Pending',
  description: undefined,
  price: undefined,
  stock: undefined,
  image: undefined,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    status: 'All',
    dateRange: 'all',
  });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'uploadedBy' | 'date'>>(DEFAULT_FORM_DATA);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modals are open
  useEffect(() => {
    if (isModalOpen || viewingProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, viewingProduct]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setViewingProduct(null);
        setActionMenuOpen(null);
        setIsFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Click outside handler for action menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setActionMenuOpen(null);
      }
    };
    if (actionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [actionMenuOpen]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subCategory.toLowerCase().includes(query) ||
        product.uploadedBy.toLowerCase().includes(query)
      );
    }

    if (filters.category !== 'All') {
      result = result.filter(product => product.category === filters.category);
    }

    if (filters.status !== 'All') {
      result = result.filter(product => product.status === filters.status);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (filters.dateRange) {
        case 'today':
          result = result.filter(p => new Date(p.date).toDateString() === now.toDateString());
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          result = result.filter(p => new Date(p.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          result = result.filter(p => new Date(p.date) >= filterDate);
          break;
      }
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [products, searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    pending: products.filter(p => p.status === 'Pending').length,
    inactive: products.filter(p => p.status === 'Inactive').length,
  }), [products]);

  const handleSort = (key: keyof Product) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(new Set(paginatedProducts.map(p => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setActionMenuOpen(null);
      setSelectedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, []);

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.size} products?`)) {
      setProducts(prev => prev.filter(p => !selectedProducts.has(p.id)));
      setSelectedProducts(new Set());
    }
  };

  const handleStatusChange = (id: string, newStatus: ProductStatus) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
    setActionMenuOpen(null);
  };

  const handleBulkStatusChange = (status: ProductStatus) => {
    setProducts(prev => prev.map(p => 
      selectedProducts.has(p.id) ? { ...p, status } : p
    ));
    setSelectedProducts(new Set());
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(DEFAULT_FORM_DATA);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      minOrder: product.minOrder,
      status: product.status,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const openViewModal = (product: Product) => {
    setViewingProduct(product);
    setActionMenuOpen(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(DEFAULT_FORM_DATA);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (!formData.category) {
      alert('Category is required');
      return;
    }
    if (!formData.subCategory) {
      alert('Sub-category is required');
      return;
    }
    if (!formData.minOrder.trim()) {
      alert('Minimum order is required');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    if (editingProduct) {
      setProducts(prev => prev.map(p => {
        if (p.id !== editingProduct.id) return p;
        return {
          ...p,
          name: formData.name.trim(),
          category: formData.category,
          subCategory: formData.subCategory,
          minOrder: formData.minOrder.trim(),
          status: formData.status,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          image: formData.image,
          date: currentDate,
        };
      }));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        category: formData.category,
        subCategory: formData.subCategory,
        minOrder: formData.minOrder.trim(),
        status: formData.status,
        uploadedBy: 'admin@company.com',
        date: currentDate,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        image: formData.image,
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    
    closeModal();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newProducts: Product[] = [
              {
                id: Date.now().toString(),
                name: 'Imported Product 1',
                category: 'Safety Equipment',
                subCategory: 'Head Protection',
                minOrder: '50 Pieces',
                status: 'Pending',
                uploadedBy: 'admin@company.com',
                date: new Date().toISOString().split('T')[0],
              },
              {
                id: (Date.now() + 1).toString(),
                name: 'Imported Product 2',
                category: 'Fire Safety',
                subCategory: 'Extinguishers',
                minOrder: '25 Units',
                status: 'Pending',
                uploadedBy: 'admin@company.com',
                date: new Date().toISOString().split('T')[0],
              },
            ];
            setProducts(prev => [...newProducts, ...prev]);
            setUploadProgress(null);
            alert('Products uploaded successfully!');
          }, 500);
          return null;
        }
        return (prev || 0) + 10;
      });
    }, 200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: undefined }));
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Product Name', 'Category', 'Sub-Category', 'Min Order', 'Status', 'Uploaded By', 'Date', 'Price', 'Stock'].join(','),
      ...filteredProducts.map(p => 
        [p.name, p.category, p.subCategory, p.minOrder, p.status, p.uploadedBy, p.date, p.price || '', p.stock || ''].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: ProductStatus) => {
    const styles = {
      Active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      Pending: 'bg-amber-50 text-amber-600 border-amber-200',
      Inactive: 'bg-rose-50 text-rose-600 border-rose-200',
    };

    const icons = {
      Active: <CheckCircle2 className="w-3 h-3 mr-1" />,
      Pending: <Clock className="w-3 h-3 mr-1" />,
      Inactive: <XCircle className="w-3 h-3 mr-1" />,
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and approve product uploads</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
              id="excel-upload"
              ref={fileInputRef}
            />
            <label
              htmlFor="excel-upload"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadProgress !== null ? `Uploading ${uploadProgress}%` : 'Upload Products (Excel)'}
            </label>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  isFilterOpen 
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {Object.values(filters).some(v => v !== 'All' && v !== 'all') && (
                  <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                )}
              </button>
              <button
                onClick={exportToExcel}
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ProductStatus | 'All' }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button
                  onClick={() => setFilters({ category: 'All', status: 'All', dateRange: 'all' })}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedProducts.size > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-sm text-emerald-800 font-medium">
              {selectedProducts.size} product(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusChange('Active')}
                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded hover:bg-emerald-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkStatusChange('Inactive')}
                className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium rounded hover:bg-rose-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div 
            onClick={() => setFilters(prev => ({ ...prev, status: 'All' }))}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Products</p>
            <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div 
            onClick={() => setFilters(prev => ({ ...prev, status: 'Active' }))}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active</p>
            <p className="text-3xl font-semibold text-emerald-600 mt-2">{stats.active}</p>
          </div>
          <div 
            onClick={() => setFilters(prev => ({ ...prev, status: 'Pending' }))}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Approval</p>
            <p className="text-3xl font-semibold text-amber-600 mt-2">{stats.pending}</p>
          </div>
          <div 
            onClick={() => setFilters(prev => ({ ...prev, status: 'Inactive' }))}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Inactive</p>
            <p className="text-3xl font-semibold text-rose-600 mt-2">{stats.inactive}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={paginatedProducts.length > 0 && paginatedProducts.every(p => selectedProducts.has(p.id))}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  {[
                    { key: 'name', label: 'Product Name' },
                    { key: 'category', label: 'Category' },
                    { key: 'subCategory', label: 'Sub-Category' },
                    { key: 'minOrder', label: 'Min Order' },
                    { key: 'status', label: 'Status' },
                    { key: 'uploadedBy', label: 'Uploaded By' },
                    { key: 'date', label: 'Date' },
                  ].map((column) => (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key as keyof Product)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {sortConfig?.key === column.key && (
                          sortConfig.direction === 'asc' 
                            ? <ChevronUp className="w-3 h-3" />
                            : <ChevronDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedProducts.has(product.id) ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {product.image && (
                          <img src={product.image} alt="" className="w-8 h-8 rounded object-cover" />
                        )}
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.subCategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.minOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 relative">
                      <button 
                        onClick={() => setActionMenuOpen(actionMenuOpen === product.id ? null : product.id)}
                        className="hover:text-gray-600 transition-colors p-1"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {actionMenuOpen === product.id && (
                        <div 
                          ref={actionMenuRef}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1"
                          style={{ top: '100%' }}
                        >
                          <button
                            onClick={() => openViewModal(product)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          {product.status !== 'Active' && (
                            <button
                              onClick={() => handleStatusChange(product.id, 'Active')}
                              className="w-full px-4 py-2 text-left text-sm text-emerald-600 hover:bg-gray-50 flex items-center"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Activate
                            </button>
                          )}
                          {product.status !== 'Inactive' && (
                            <button
                              onClick={() => handleStatusChange(product.id, 'Inactive')}
                              className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-gray-50 flex items-center"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Deactivate
                            </button>
                          )}
                          <div className="border-t border-gray-200 my-1" />
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-gray-50 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No products found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ category: 'All', status: 'All', dateRange: 'all' });
                }}
                className="mt-2 text-emerald-600 text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-emerald-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload Section */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-gray-200" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="product-image"
                      ref={imageInputRef}
                    />
                    <label
                      htmlFor="product-image"
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {formData.image ? 'Change Photo' : 'Add Photo'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value,
                      subCategory: SUB_CATEGORIES[e.target.value]?.[0] || ''
                    }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category *</label>
                  <select
                    required
                    value={formData.subCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SUB_CATEGORIES[formData.category || 'Safety Equipment']?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Order *</label>
                  <input
                    required
                    type="text"
                    value={formData.minOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, minOrder: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., 100 Pieces"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ProductStatus }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^\$?\d*\.?\d{0,2}$/.test(value.replace('$', ''))) {
                        setFormData(prev => ({ ...prev, price: value.startsWith('$') ? value : value ? `$${value}` : '' }));
                      }
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="$0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, stock: Math.max(0, value) }));
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingProduct(null);
          }}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <button
                onClick={() => setViewingProduct(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {viewingProduct.image && (
                <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <img src={viewingProduct.image} alt={viewingProduct.name} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{viewingProduct.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{viewingProduct.category} → {viewingProduct.subCategory}</p>
                </div>
                {getStatusBadge(viewingProduct.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Min Order:</span>
                  <p className="font-medium text-gray-900">{viewingProduct.minOrder}</p>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p className="font-medium text-gray-900">{viewingProduct.price || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Stock:</span>
                  <p className="font-medium text-gray-900">{viewingProduct.stock ?? 'N/A'} units</p>
                </div>
                <div>
                  <span className="text-gray-500">Uploaded By:</span>
                  <p className="font-medium text-gray-900">{viewingProduct.uploadedBy}</p>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium text-gray-900">{viewingProduct.date}</p>
                </div>
              </div>
              
              {viewingProduct.description && (
                <div>
                  <span className="text-gray-500 text-sm">Description:</span>
                  <p className="mt-1 text-sm text-gray-700">{viewingProduct.description}</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setViewingProduct(null)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setViewingProduct(null);
                    openEditModal(viewingProduct);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}