'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  WifiOff, 
  Plus, 
  Search, 
  ChevronDown, 
  Edit3, 
  HelpCircle, 
  Play, 
  FileText,
  MoreVertical,
  Check,
  Trash2,
  Video,
  FileUp,
  ArrowLeft
} from 'lucide-react';
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  hasExistingPhoto: boolean;
  price: string;
  originalPrice: string;
  group: string;
  description: string;
  category: string;
  photos: string[];
  video: boolean;
  pdf: boolean;
  specifications: Record<string, string>;
}

interface QuickAddProduct {
  id: string;
  photos: string[];
  name: string;
  price: string;
  unit: string;
}

const initialProducts: Product[] = [
  { 
    id: '1', 
    name: 'Made Easy Book Of Electrical And Electronics', 
    hasExistingPhoto: true, 
    price: '222', 
    originalPrice: '233', 
    group: 'New Items',
    description: '',
    category: '',
    photos: ['https://via.placeholder.com/150/2AA9A9/FFFFFF?text=W  '],
    video: false,
    pdf: false,
    specifications: {}
  },
  { 
    id: '2', 
    name: 'Software Development Services', 
    hasExistingPhoto: true, 
    price: '222', 
    originalPrice: '180', 
    group: 'New Items',
    description: '',
    category: '',
    photos: ['https://via.placeholder.com/150/9333EA/FFFFFF?text=S  '],
    video: false,
    pdf: false,
    specifications: {}
  },
  { 
    id: '3', 
    name: 'Preliminary Civil Engineering Guide', 
    hasExistingPhoto: true, 
    price: '450', 
    originalPrice: '500', 
    group: 'Books',
    description: '',
    category: '',
    photos: ['https://via.placeholder.com/150/EA580C/FFFFFF?text=C  '],
    video: false,
    pdf: false,
    specifications: {}
  },
  { 
    id: '4', 
    name: '18 Years Question Bank Collection', 
    hasExistingPhoto: true, 
    price: '350', 
    originalPrice: '400', 
    group: 'Study Material',
    description: '',
    category: '',
    photos: ['https://via.placeholder.com/150/16A34A/FFFFFF?text=Q  '],
    video: false,
    pdf: false,
    specifications: {}
  },
];

const tabs = [
  { id: 'active', label: 'Active', count: 4, active: true },
  { id: 'inactive', label: 'Inactive', count: 1, active: false },
];

export default function Page() {
  const [isVisible, setIsVisible] = useState(true);
  const [showSlowNetwork, setShowSlowNetwork] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Products');
  const [activeTab, setActiveTab] = useState('active');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [selectedProductForFile, setSelectedProductForFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'photo' | 'video' | 'pdf'>('photo');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [sortBy, setSortBy] = useState('Recent Modified');
  const moreOptionsRef = useRef<HTMLDivElement>(null);

  // Quick Add Modal State
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddProducts, setQuickAddProducts] = useState<QuickAddProduct[]>([
    { id: '1', photos: [], name: '', price: '', unit: 'Piece' },
    { id: '2', photos: [], name: '', price: '', unit: 'Piece' },
    { id: '3', photos: [], name: '', price: '', unit: 'Piece' },
  ]);
  const quickAddFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedQuickAddRow, setSelectedQuickAddRow] = useState<string | null>(null);

  useEffect(() => {
    const checkNetworkSpeed = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const slow = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target as Node)) {
        setShowMoreOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateScore = (product: Product) => {
    let score = 0;
    if (product.name.split(' ').length >= 3) score += 10;
    if (product.photos.length > 0) score += 10;
    if (product.photos.length >= 2) score += 10;
    if (product.price) score += 15;
    if (product.description.length > 100) score += 5;
    if (product.video) score += 10;
    if (product.pdf) score += 5;
    if (Object.keys(product.specifications).length >= 5) score += 25;
    return score;
  };

  // Calculate individual scores for display
  const getScoreBreakdown = (product: Product) => {
    return {
      name: { score: product.name.split(' ').length >= 3 ? 10 : 0, max: 10 },
      photoDimension: { score: 0, max: 10 }, // Placeholder
      primaryPhoto: { score: product.photos.length > 0 ? 10 : 0, max: 10 },
      secondaryPhotos: { score: 0, max: 10 }, // Category header
      onePhoto: { score: product.photos.length === 1 ? 10 : 0, max: 10 },
      twoOrMorePhotos: { score: product.photos.length >= 2 ? 10 : 0, max: 10 },
      price: { score: product.price ? 15 : 0, max: 15 },
      description: { score: product.description.length > 100 ? 5 : 0, max: 5 },
      video: { score: product.video ? 10 : 0, max: 10 },
      pdf: { score: product.pdf ? 5 : 0, max: 5 },
      specifications: { score: Object.keys(product.specifications).length >= 5 ? 25 : 0, max: 25 },
    };
  };

  const handleEdit = (productId: string, field: string, currentValue: string) => {
    setEditingProduct(productId);
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingProduct && editingField) {
      setProducts(products.map(p => {
        if (p.id === editingProduct) {
          return { ...p, [editingField]: editValue };
        }
        return p;
      }));
      setEditingProduct(null);
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditingField(null);
    setEditValue('');
  };

  const handleFileSelect = (productId: string, type: 'photo' | 'video' | 'pdf') => {
    setSelectedProductForFile(productId);
    setFileType(type);
    if (type === 'photo') fileInputRef.current?.click();
    else if (type === 'video') videoInputRef.current?.click();
    else if (type === 'pdf') pdfInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProductForFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProducts(products.map(p => {
          if (p.id === selectedProductForFile) {
            if (fileType === 'photo') {
              return { ...p, photos: [...p.photos, reader.result as string], hasExistingPhoto: true };
            } else if (fileType === 'video') {
              return { ...p, video: true };
            } else if (fileType === 'pdf') {
              return { ...p, pdf: true };
            }
          }
          return p;
        }));
        setSelectedProductForFile(null);
      };
      if (fileType === 'photo') reader.readAsDataURL(file);
      else reader.readAsText(file);
    }
  };

  const handleRemoveVideo = (productId: string) => {
    setProducts(products.map(p => p.id === productId ? { ...p, video: false } : p));
  };

  const handleRemovePDF = (productId: string) => {
    setProducts(products.map(p => p.id === productId ? { ...p, pdf: false } : p));
  };

  const handleDescriptionClick = (productId: string) => {
    handleEdit(productId, 'description', products.find(p => p.id === productId)?.description || '');
  };

  const handleCategoryClick = (productId: string) => {
    const newCategory = prompt('Enter category name:');
    if (newCategory) {
      setProducts(products.map(p => {
        if (p.id === productId) {
          return { ...p, category: newCategory };
        }
        return p;
      }));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleAddSpecification = (productId: string) => {
    const key = prompt('Enter specification name (e.g., Brand, Material):');
    const value = prompt('Enter specification value:');
    if (key && value) {
      setProducts(products.map(p => {
        if (p.id === productId) {
          return { ...p, specifications: { ...p.specifications, [key]: value } };
        }
        return p;
      }));
    }
  };

  const handleMoreOptionClick = (option: string) => {
    setShowMoreOptions(false);
    switch(option) {
      case 'quickPrice':
        alert('Quick Price Update - Select products to update prices in bulk');
        break;
      case 'manageGroups':
        alert('Manage Groups - Organize your products into groups');
        break;
      case 'categoryReport':
        alert('Category Report - View category-wise product distribution');
        break;
      case 'suggestedProducts':
        alert('Suggested Products - View AI recommended products to add');
        break;
    }
  };

  // Quick Add Handlers
  const handleQuickAddPhotoClick = (rowId: string) => {
    setSelectedQuickAddRow(rowId);
    quickAddFileInputRef.current?.click();
  };

  const handleQuickAddFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && selectedQuickAddRow) {
      const fileArray = Array.from(files).slice(0, 13);
      const newPhotos: string[] = [];
      
      let processedCount = 0;
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          processedCount++;
          if (processedCount === fileArray.length) {
            setQuickAddProducts(prev => prev.map(p => 
              p.id === selectedQuickAddRow 
                ? { ...p, photos: [...p.photos, ...newPhotos].slice(0, 13) }
                : p
            ));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleQuickAddInputChange = (rowId: string, field: keyof QuickAddProduct, value: string) => {
    setQuickAddProducts(prev => prev.map(p => 
      p.id === rowId ? { ...p, [field]: value } : p
    ));
  };

  const handleAddMoreRows = () => {
    const newId = (quickAddProducts.length + 1).toString();
    setQuickAddProducts(prev => [...prev, { 
      id: newId, 
      photos: [], 
      name: '', 
      price: '', 
      unit: 'Piece' 
    }]);
  };

  const handleQuickAddSave = () => {
    const validProducts = quickAddProducts
      .filter(p => p.name.trim() !== '' || p.photos.length > 0 || p.price.trim() !== '')
      .map((p, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: p.name || 'Untitled Product',
        hasExistingPhoto: p.photos.length > 0,
        price: p.price || '0',
        originalPrice: p.price || '0',
        group: 'New Items',
        description: '',
        category: '',
        photos: p.photos.length > 0 ? p.photos : [`https://via.placeholder.com/150/2AA9A9/FFFFFF?text= ${p.name[0] || 'P'}`],
        video: false,
        pdf: false,
        specifications: {}
      }));

    if (validProducts.length > 0) {
      setProducts(prev => [...prev, ...validProducts]);
      alert(`Successfully added ${validProducts.length} product(s)!`);
    }
    
    setShowQuickAdd(false);
    setQuickAddProducts([
      { id: '1', photos: [], name: '', price: '', unit: 'Piece' },
      { id: '2', photos: [], name: '', price: '', unit: 'Piece' },
      { id: '3', photos: [], name: '', price: '', unit: 'Piece' },
    ]);
  };

  const handleQuickAddBack = () => {
    if (confirm('Are you sure you want to leave? Your changes will not be saved.')) {
      setShowQuickAdd(false);
      setQuickAddProducts([
        { id: '1', photos: [], name: '', price: '', unit: 'Piece' },
        { id: '2', photos: [], name: '', price: '', unit: 'Piece' },
        { id: '3', photos: [], name: '', price: '', unit: 'Piece' },
      ]);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All Products') return matchesSearch;
    if (activeFilter === 'No Category') return matchesSearch && !p.category;
    if (activeFilter === 'Low Score') return matchesSearch && calculateScore(p) < 50;
    if (activeFilter === 'No Specifications') return matchesSearch && Object.keys(p.specifications).length === 0;
    if (activeFilter === 'No Descriptions') return matchesSearch && !p.description;
    return matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Recent Modified') return 0;
    if (sortBy === 'Name A-Z') return a.name.localeCompare(b.name);
    if (sortBy === 'Name Z-A') return b.name.localeCompare(a.name);
    if (sortBy === 'Price Low-High') return parseInt(a.price) - parseInt(b.price);
    if (sortBy === 'Price High-Low') return parseInt(b.price) - parseInt(a.price);
    return 0;
  });

  // Quick Add Modal Component
  if (showQuickAdd) {
    return (
      <div className="min-h-screen bg-white">
        <input 
          type="file" 
          ref={quickAddFileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple 
          onChange={handleQuickAddFileChange} 
        />
        
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button 
            onClick={handleQuickAddBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-800">
              Add Multiple Products / Services Quickly
            </h1>
            <span className="text-sm text-gray-500">
              (You can easily add photos, product name and price in one go)
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-2 px-4 py-3 border-r border-gray-200">Photos</div>
              <div className="col-span-6 px-4 py-3 border-r border-gray-200">Name</div>
              <div className="col-span-4 px-4 py-3">Price/ Unit</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {quickAddProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 items-center">
                  {/* Photos Column */}
                  <div className="col-span-2 px-4 py-4 border-r border-gray-200">
                    <button
                      onClick={() => handleQuickAddPhotoClick(product.id)}
                      className="w-24 h-24 border-2 border-dashed border-[#2AA9A9] rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-[#2AA9A9]/5 transition-colors bg-white"
                    >
                      {product.photos.length > 0 ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={product.photos[0]} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {product.photos.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                              +{product.photos.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <Camera size={24} className="text-[#2AA9A9]" />
                          <span className="text-xs text-gray-600 text-center leading-tight">
                            Add Photos<br/>(Upto 13)
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Name Column */}
                  <div className="col-span-6 px-4 py-4 border-r border-gray-200">
                    <input
                      type="text"
                      placeholder="Product/Service Name"
                      value={product.name}
                      onChange={(e) => handleQuickAddInputChange(product.id, 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2AA9A9] focus:ring-1 focus:ring-[#2AA9A9]"
                    />
                  </div>

                  {/* Price/Unit Column */}
                  <div className="col-span-4 px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">₹</span>
                      <input
                        type="text"
                        placeholder="Price"
                        value={product.price}
                        onChange={(e) => handleQuickAddInputChange(product.id, 'price', e.target.value)}
                        className="w-24 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2AA9A9] focus:ring-1 focus:ring-[#2AA9A9]"
                      />
                      <span className="text-gray-500 text-sm">-per-</span>
                      <input
                        type="text"
                        placeholder="Eg-Piece"
                        value={product.unit}
                        onChange={(e) => handleQuickAddInputChange(product.id, 'unit', e.target.value)}
                        className="w-28 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2AA9A9] focus:ring-1 focus:ring-[#2AA9A9]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              onClick={handleAddMoreRows}
              className="text-[#2AA9A9] font-medium text-sm hover:underline flex items-center gap-1"
            >
              <Plus size={16} />
              Add More
            </button>
            <button
              onClick={handleQuickAddSave}
              className="bg-[#2AA9A9] hover:bg-[#248F8F] text-white px-8 py-2.5 rounded text-sm font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />
      <input type="file" ref={pdfInputRef} className="hidden" accept=".pdf" onChange={handleFileChange} />

      {isVisible && (
        <div className="w-full bg-[#FFFBF0] border border-[#E5D5B0] rounded-lg p-4 relative m-4 max-w-[calc(100%-2rem)]">
          {showSlowNetwork && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF3CD] border border-[#FFEAA7] text-[#856404] px-4 py-2 rounded shadow-sm flex items-center gap-2 text-sm">
              <WifiOff size={16} />
              Slow network connection detected.
              <button onClick={() => setShowSlowNetwork(false)} className="ml-2 hover:text-[#5a3f02]"><X size={14} /></button>
            </div>
          )}

          <button onClick={() => setIsVisible(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><X size={20} /></button>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Add More Photos for following <span className="font-bold">{products.length} products</span> to get more <span className="font-bold">Enquiries!</span>
            </h3>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto pb-2">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center flex-shrink-0">
                <div className="grid grid-cols-2 gap-1 w-20 h-20 mb-2">
                  <div className="w-9 h-9 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {product.photos.length > 0 ? (
                      <img src={product.photos[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={16} className="text-gray-400" />
                    )}
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-9 h-9 border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <Camera size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
                <span 
                  className="text-xs text-[#2AA9A9] hover:underline cursor-pointer truncate max-w-[80px] text-center"
                  onClick={() => handleFileSelect(product.id, 'photo')}
                >
                  {product.name.substring(0, 12)}...
                </span>
              </div>
            ))}

            <button 
              className="bg-[#2AA9A9] hover:bg-[#248F8F] text-white text-sm font-medium px-6 py-2.5 rounded-sm flex items-center gap-2 flex-shrink-0 ml-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={16} />
              Add Photo Now
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-[#2AA9A9] text-[#2AA9A9]' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sellerdashboard/products/addproduct">
              <button className="bg-[#2AA9A9] hover:bg-[#248F8F] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium">
                <Plus size={16} />
                Add Product
              </button>
            </Link>
            <button 
              className="border border-[#2AA9A9] text-[#2AA9A9] px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-[#2AA9A9]/5"
              onClick={() => setShowQuickAdd(true)}
            >
              <Plus size={16} />
              Quick Add
            </button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Group, Category or Specification"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-80 text-sm focus:outline-none focus:border-[#2AA9A9]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* More Options Dropdown - Updated to match image */}
            <div className="relative" ref={moreOptionsRef}>
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  showMoreOptions 
                    ? 'bg-[#2AA9A9] text-white' 
                    : 'border border-[#2AA9A9] text-[#2AA9A9] hover:bg-[#2AA9A9]/5'
                }`}
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                More Options
                <ChevronDown size={16} className={`transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} />
              </button>
              
              {showMoreOptions && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg w-48 z-50">
                  <div className="py-1">
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2AA9A9] transition-colors"
                      onClick={() => handleMoreOptionClick('quickPrice')}
                    >
                      Quick Price Update
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2AA9A9] transition-colors"
                      onClick={() => handleMoreOptionClick('manageGroups')}
                    >
                      Manage Groups
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2AA9A9] transition-colors"
                      onClick={() => handleMoreOptionClick('categoryReport')}
                    >
                      Category Report
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2AA9A9] transition-colors"
                      onClick={() => handleMoreOptionClick('suggestedProducts')}
                    >
                      Suggested Products
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <span className="text-gray-600">Filter by :</span>
            {['All Products', 'No Category', 'Low Score', 'No Specifications', 'No Descriptions'].map((filter) => (
              <span 
                key={filter}
                className={`cursor-pointer hover:underline ${activeFilter === filter ? 'text-gray-800 border-b border-gray-800 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter} ({filter === 'All Products' ? products.length : products.filter(p => {
                  if (filter === 'No Category') return !p.category;
                  if (filter === 'Low Score') return calculateScore(p) < 50;
                  if (filter === 'No Specifications') return Object.keys(p.specifications).length === 0;
                  if (filter === 'No Descriptions') return !p.description;
                  return true;
                }).length})
              </span>
            ))}
          </div>
          <div className="relative">
            <button 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              onClick={() => setSortBy(sortBy === 'Recent Modified' ? 'Name A-Z' : sortBy === 'Name A-Z' ? 'Name Z-A' : sortBy === 'Name Z-A' ? 'Price Low-High' : sortBy === 'Price Low-High' ? 'Price High-Low' : 'Recent Modified')}
            >
              Sort by: {sortBy}
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {sortedProducts.map((product) => {
          const scores = getScoreBreakdown(product);
          const totalScore = calculateScore(product);
          
          return (
            <div 
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg flex overflow-hidden relative w-full"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="flex flex-col border-r border-gray-200 bg-white">
                <button 
                  className="w-12 h-12 flex flex-col items-center justify-center border-b border-gray-200 hover:bg-gray-50 text-gray-400"
                  onClick={() => handleFileSelect(product.id, 'photo')}
                >
                  <Camera size={16} />
                  <span className="text-[10px] mt-0.5">Add</span>
                </button>
                {[...Array(4)].map((_, i) => (
                  <button 
                    key={i}
                    className="w-12 h-12 flex items-center justify-center border-b border-gray-200 hover:bg-gray-50 text-gray-400"
                    onClick={() => handleFileSelect(product.id, 'photo')}
                  >
                    <Camera size={16} />
                  </button>
                ))}
              </div>

              <div className="flex flex-1">
                <div className="flex flex-col">
                  <div className="relative w-56 h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.photos.length > 0 ? (
                      <img 
                        src={product.photos[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-2 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl font-bold">{product.name[0]}</span>
                        </div>
                        <div className="text-gray-600 text-xs font-medium">{product.group}</div>
                      </div>
                    )}
                    <button 
                      className="absolute bottom-2 right-2 text-white/70 hover:text-white bg-black/30 rounded p-1"
                      onClick={() => handleFileSelect(product.id, 'photo')}
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>

                  <div className="flex border-t border-gray-200">
                    <button 
                      className={`flex-1 h-16 border-r border-gray-200 flex flex-col items-center justify-center text-sm transition-colors ${product.video ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      onClick={() => product.video ? handleRemoveVideo(product.id) : handleFileSelect(product.id, 'video')}
                    >
                      {product.video ? <Check size={18} className="mb-1" /> : <Video size={18} className="mb-1" />}
                      <span className="text-[11px]">{product.video ? 'Video Added' : 'Add Video'}</span>
                    </button>
                    <button 
                      className={`flex-1 h-16 flex flex-col items-center justify-center text-sm transition-colors ${product.pdf ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      onClick={() => product.pdf ? handleRemovePDF(product.id) : handleFileSelect(product.id, 'pdf')}
                    >
                      {product.pdf ? <Check size={18} className="mb-1" /> : <FileUp size={18} className="mb-1" />}
                      <span className="text-[11px]">{product.pdf ? 'PDF Added' : 'Add PDF'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-5 bg-gray-50/30 min-w-[500px]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {editingProduct === product.id && editingField === 'name' ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-64"
                              autoFocus
                            />
                            <button onClick={handleSave} className="text-green-600 hover:text-green-700"><Check size={16} /></button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-700"><X size={16} /></button>
                          </div>
                        ) : (
                          <>
                            <h2 className="text-base font-semibold text-gray-800">{product.name}</h2>
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleEdit(product.id, 'name', product.name)}
                            >
                              <Edit3 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingProduct === product.id && editingField === 'price' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">₹</span>
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                              autoFocus
                            />
                            <button onClick={handleSave} className="text-green-600 hover:text-green-700"><Check size={14} /></button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-700"><X size={14} /></button>
                          </div>
                        ) : (
                          <>
                            <span className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-lg font-bold text-gray-800 flex items-center gap-1">
                              <span className="text-sm">₹</span> {product.price}
                              <span className="text-sm font-normal text-gray-500 line-through ml-1">{product.originalPrice}m</span>
                            </span>
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleEdit(product.id, 'price', product.price)}
                            >
                              <Edit3 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Score:</span>
                      <span className={`text-sm font-semibold ${totalScore < 50 ? 'text-red-500' : 'text-green-600'}`}>
                        {totalScore}/100
                      </span>
                      <HelpCircle size={14} className="text-gray-400 cursor-help" />
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" 
                          style={{ width: `${totalScore}%` }}
                        />
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-600 ml-1"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-600 text-sm font-medium">Category</span>
                    {product.category ? (
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{product.category}</span>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => handleCategoryClick(product.id)}
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="text-[#2AA9A9] text-sm flex items-center gap-0.5 hover:underline"
                        onClick={() => handleCategoryClick(product.id)}
                      >
                        <Plus size={14} />
                        Add category to get buy leads from relevant customers
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-600 text-sm font-medium block mb-2">Description</span>
                    {editingProduct === product.id && editingField === 'description' ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm w-full h-24 resize-none"
                          placeholder="Enter description..."
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSave}
                            className="bg-[#2AA9A9] text-white px-3 py-1 rounded text-sm hover:bg-[#248F8F]"
                          >
                            Save
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="border border-gray-300 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        className="text-gray-500 hover:text-[#2AA9A9] text-sm bg-white border border-dashed border-gray-300 rounded px-4 py-3 w-full text-left hover:border-[#2AA9A9] transition-colors"
                        onClick={() => handleDescriptionClick(product.id)}
                      >
                        {product.description || 'Click here to Add description...'}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm font-medium">Group</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{product.group}</span>
                  </div>
                </div>

                {/* Right Sidebar - Score Breakdown on Hover */}
                <div className={`border-l border-gray-200 p-4 bg-gray-50/30 transition-all duration-300 ${hoveredProduct === product.id ? 'w-80' : 'w-72'}`}>
                  {hoveredProduct === product.id ? (
                    // HOVER STATE: Exact UI like the image
                    <div className="h-full">
                      {/* Score Header with circular indicator */}
                      <div className="flex items-center justify-end gap-2 mb-4">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {totalScore}/100
                        </span>
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <HelpCircle size={10} className="text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Small progress bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" 
                          style={{ width: `${totalScore}%` }}
                        />
                      </div>

                      {/* Score Breakdown List - Exact like image */}
                      <div className="space-y-1 text-xs">
                        {/* Name - Green if achieved */}
                        <div className="flex items-center justify-between">
                          <span className={scores.name.score > 0 ? 'text-green-600' : 'text-orange-500'}>
                            Name (&gt;=3 Words)
                          </span>
                          <span className={scores.name.score > 0 ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>
                            {scores.name.score}/{scores.name.max}
                          </span>
                        </div>

                        {/* Photo Dimension - Orange */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Photo Dimension (Width or Height &gt;=1000 px)</span>
                          <span className="text-orange-500 font-medium">{scores.photoDimension.score}/{scores.photoDimension.max}</span>
                        </div>

                        {/* Primary Photo - Orange */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Primary Photo</span>
                          <span className="text-orange-500 font-medium">{scores.primaryPhoto.score}/{scores.primaryPhoto.max}</span>
                        </div>

                        {/* Secondary Photos - Orange header */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Secondary Photos</span>
                          <span></span>
                        </div>

                        {/* 1 Photo - Indented */}
                        <div className="flex items-center justify-between pl-4">
                          <span className="text-orange-500">1 Photo</span>
                          <span className="text-orange-500 font-medium">{scores.onePhoto.score}/{scores.onePhoto.max}</span>
                        </div>

                        {/* 2 or More Photos - Indented */}
                        <div className="flex items-center justify-between pl-4">
                          <span className="text-orange-500">2 or More Photos</span>
                          <span className="text-orange-500 font-medium">{scores.twoOrMorePhotos.score}/{scores.twoOrMorePhotos.max}</span>
                        </div>

                        {/* Price - Green if achieved */}
                        <div className="flex items-center justify-between">
                          <span className={scores.price.score > 0 ? 'text-green-600' : 'text-orange-500'}>
                            Price (with unit)
                          </span>
                          <span className={scores.price.score > 0 ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>
                            {scores.price.score}/{scores.price.max}
                          </span>
                        </div>

                        {/* Description - Orange */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Description (&gt;100 chars)</span>
                          <span className="text-orange-500 font-medium">{scores.description.score}/{scores.description.max}</span>
                        </div>

                        {/* Video - Orange */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Video</span>
                          <span className="text-orange-500 font-medium">{scores.video.score}/{scores.video.max}</span>
                        </div>

                        {/* Product Brochure - Orange */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500">Product Brochure (PDF)</span>
                          <span className="text-orange-500 font-medium">{scores.pdf.score}/{scores.pdf.max}</span>
                        </div>

                        {/* Specifications header */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-700 font-medium">Specifications:</span>
                          <span></span>
                        </div>

                        {/* 5 or More Specs - Indented */}
                        <div className="flex items-center justify-between pl-4">
                          <span className={scores.specifications.score > 0 ? 'text-green-600' : 'text-orange-500'}>
                            5 or More Specs.
                          </span>
                          <span className={scores.specifications.score > 0 ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>
                            {scores.specifications.score}/{scores.specifications.max}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // DEFAULT STATE: Show Specifications
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-700">Specification/Additional Details</h3>
                        <button 
                          className="text-[#2AA9A9] text-xs hover:underline"
                          onClick={() => handleAddSpecification(product.id)}
                        >
                          + Add
                        </button>
                      </div>
                      {Object.keys(product.specifications).length > 0 ? (
                        <div className="space-y-1">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-gray-600">{key}:</span>
                              <span className="text-gray-800 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Please map category to add specification.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#2AA9A9] text-white px-2 py-3 rounded-l-lg shadow-lg hover:bg-[#248F8F] flex flex-col items-center gap-1 z-50 cursor-pointer"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        onClick={() => window.open('https://www.youtube.com/results?search_query=indiamart+seller+tutorial  ', '_blank')}
      >
        <Play size={14} />
        <span className="text-xs font-medium">Help Videos</span>
      </button>
    </div>
  );
}