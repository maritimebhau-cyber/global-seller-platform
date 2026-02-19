// components/GSTVerificationForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, TrendingUp, Users, Info, Camera, Edit2, FileText, AlertCircle, X, ChevronRight, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  hasPhoto: boolean;
  photoUrl?: string;
  description?: string;
}

interface GSTVerificationFormProps {
  onComplete?: () => void;
}

export default function GSTVerificationForm({ onComplete }: GSTVerificationFormProps) {
  const [currentStep, setCurrentStep] = useState<'gst' | 'photos' | 'requirements'>('gst');
  const [gstDigits, setGstDigits] = useState<string[]>(Array(15).fill(''));
  const [isGstValid, setIsGstValid] = useState(false);
  const [dontHaveGst, setDontHaveGst] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product 1', hasPhoto: false, description: '' },
    { id: '2', name: 'Product 2', hasPhoto: false, description: '' },
    { id: '3', name: 'Product 3', hasPhoto: false, description: '' }
  ]);

  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState('');
  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  // Requirements page state
  const [requirementInput, setRequirementInput] = useState('');
  const [isSubmittingRequirement, setIsSubmittingRequirement] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate missing items
  const missingPhotoCount = products.filter(p => !p.hasPhoto).length;
  const missingDescCount = products.filter(p => !p.description?.trim()).length;
  const totalMissing = missingPhotoCount + missingDescCount;

  // Validate GST whenever digits change
  useEffect(() => {
    const isValid = gstDigits.every(digit => digit !== '') && gstDigits.length === 15;
    setIsGstValid(isValid);
  }, [gstDigits]);

  // Check if all photos and descriptions are complete
  useEffect(() => {
    if (currentStep === 'photos' && missingPhotoCount === 0 && missingDescCount === 0) {
      const timer = setTimeout(() => {
        setCurrentStep('requirements');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, missingPhotoCount, missingDescCount]);

  // GST Input Handlers
  const handleGstChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newGstDigits = [...gstDigits];
    newGstDigits[index] = value.toUpperCase();
    setGstDigits(newGstDigits);
    setShowError(false);

    if (value && index < 14) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleGstKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !gstDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleGstPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\s/g, '').toUpperCase();
    
    if (pastedData.length <= 15) {
      const newDigits = [...gstDigits];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setGstDigits(newDigits);
      
      const nextEmptyIndex = newDigits.findIndex(d => d === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[14]?.focus();
      }
    }
  };

  const handleSkipGst = () => {
    setDontHaveGst(!dontHaveGst);
    setShowError(false);
    if (!dontHaveGst) {
      setGstDigits(Array(15).fill(''));
    }
  };

  const handleGstSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dontHaveGst) {
      setCurrentStep('photos');
      return;
    }

    if (!isGstValid) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('photos');
    }, 500);
  };

  // Product Photo Handlers
  const handleFileSelect = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoError(null);
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target?.result as string;
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { ...p, hasPhoto: true, photoUrl } 
          : p
      ));
    };
    reader.onerror = () => {
      setPhotoError('Error reading file');
    };
    reader.readAsDataURL(file);
    
    event.target.value = '';
  };

  const triggerFileInput = (productId: string) => {
    fileInputRefs.current[productId]?.click();
  };

  const removePhoto = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, hasPhoto: false, photoUrl: undefined } 
        : p
    ));
  };

  // Description Handlers
  const startEditingDescription = (product: Product) => {
    setEditingDescription(product.id);
    setTempDescription(product.description || '');
  };

  const saveDescription = (productId: string) => {
    if (!tempDescription.trim()) {
      setPhotoError('Description cannot be empty');
      return;
    }
    
    if (tempDescription.trim().length < 10) {
      setPhotoError('Description must be at least 10 characters long');
      return;
    }
    
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, description: tempDescription.trim() } 
        : p
    ));
    setEditingDescription(null);
    setTempDescription('');
    setPhotoError(null);
  };

  const cancelEditingDescription = () => {
    setEditingDescription(null);
    setTempDescription('');
    setPhotoError(null);
  };

  // Name Edit Handlers
  const startEditingName = (product: Product) => {
    setEditingName(product.id);
    setTempName(product.name);
  };

  const saveName = (productId: string) => {
    if (!tempName.trim()) {
      setPhotoError('Product name cannot be empty');
      return;
    }
    
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, name: tempName.trim() } 
        : p
    ));
    setEditingName(null);
    setTempName('');
    setPhotoError(null);
  };

  const cancelEditingName = () => {
    setEditingName(null);
    setTempName('');
    setPhotoError(null);
  };

  const handleComplete = () => {
    if (missingPhotoCount === 0 && missingDescCount === 0) {
      setCurrentStep('requirements');
    }
  };

  // Requirement submission handler
  const handleRequirementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirementInput.trim()) return;
    
    setIsSubmittingRequirement(true);
    setTimeout(() => {
      setIsSubmittingRequirement(false);
      setShowSuccess(true);
      setRequirementInput('');
      onComplete?.();
    }, 1000);
  };

  // GST Input Fields
  const renderGstInputs = () => (
    <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
      {Array.from({ length: 15 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          maxLength={1}
          value={gstDigits[index]}
          onChange={(e) => handleGstChange(index, e.target.value)}
          onKeyDown={(e) => handleGstKeyDown(index, e)}
          onPaste={handleGstPaste}
          disabled={dontHaveGst}
          className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 rounded-lg transition-all ${
            showError && !dontHaveGst
              ? 'border-red-500 bg-red-50'
              : dontHaveGst
              ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
              : 'border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          }`}
          aria-label={`GST digit ${index + 1}`}
        />
      ))}
    </div>
  );

  // Product Card Component
  const renderProductCard = (product: Product) => (
    <div key={product.id} className="relative group">
      <div className={`border-2 rounded-xl p-4 transition-all ${
        !product.hasPhoto || !product.description 
          ? 'border-orange-200 bg-orange-50/30' 
          : 'border-green-200 bg-white hover:border-green-300 hover:shadow-md'
      }`}>
        
        <input
          type="file"
          ref={(el) => { fileInputRefs.current[product.id] = el; }}
          onChange={(e) => handleFileSelect(product.id, e)}
          accept="image/*"
          className="hidden"
          aria-label={`Upload photo for ${product.name}`}
        />

        <div 
          onClick={() => !product.hasPhoto && triggerFileInput(product.id)}
          className={`aspect-square flex items-center justify-center mb-3 bg-white rounded-xl border-2 ${
            product.hasPhoto 
              ? 'border-green-200' 
              : 'border-dashed border-gray-300 hover:border-blue-400 cursor-pointer'
          } overflow-hidden transition-colors`}
        >
          {product.hasPhoto && product.photoUrl ? (
            <div className="relative w-full h-full">
              <img 
                src={product.photoUrl} 
                alt={product.name} 
                className="w-full h-full object-contain p-2"
              />
              <button
                onClick={(e) => removePhoto(product.id, e)}
                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
              <Camera className="w-10 h-10 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Click to add photo</span>
              <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
            </div>
          )}
        </div>

        {editingName === product.id ? (
          <div className="mb-3 space-y-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Product name"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveName(product.id)}
                className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={cancelEditingName}
                className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-sm font-medium text-gray-900 truncate flex-1" title={product.name}>
              {product.name || 'Unnamed Product'}
            </p>
            <button 
              onClick={() => startEditingName(product)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Edit product name"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="border-t pt-3">
          {editingDescription === product.id ? (
            <div className="space-y-2">
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                placeholder="Enter product description (minimum 10 characters)"
                className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveDescription(product.id)}
                  className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditingDescription}
                  className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : product.description ? (
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600 line-clamp-2 flex-1">{product.description}</p>
              <button 
                onClick={() => startEditingDescription(product)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Edit description"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => startEditingDescription(product)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors w-full justify-center py-2 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Add Description</span>
            </button>
          )}
        </div>
      </div>

      {product.hasPhoto && product.description && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  );

  // Requirements Page Component
  const renderRequirementsPage = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Tell us what you need
            </h2>
            <p className="text-gray-600">
              Describe your requirements and get connected with verified sellers
            </p>
          </div>

          <form onSubmit={handleRequirementSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want quotes for
              </label>
              <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                placeholder="Enter product or service name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingRequirement || !requirementInput.trim()}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isSubmittingRequirement ? (
                'Submitting...'
              ) : (
                <>
                  Submit Requirement
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Best Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Profile Completed Successfully!</h4>
              <p className="text-sm text-green-700">You are now a verified seller. You can start posting your requirements.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Promotional Banner Component
  const renderPromoBanner = () => (
    <div className=" bg-gradient-to-r mx-8 from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Confetti decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-6 left-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-4 left-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
        <div className="absolute top-8 left-2 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-2 left-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-3 left-16 w-1 h-1 bg-green-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
        
        {/* Streamer decorations */}
        <svg className="absolute top-0 left-0 w-24 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,0 Q15,50 5,100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none"/>
          <path d="M20,0 Q25,50 15,100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
          <path d="M5,0 Q10,50 0,100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div className="w-11xl mx-4 px-1 sm:px-6 lg:px-8 py-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg transform -rotate-2">
                Limited Time Offer
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            </div>
            <div className="text-white text-sm sm:text-base text-center sm:text-left">
              <span className="font-semibold">+ Choose One FREE</span> 6-Month Subscription From
              <div className="font-bold text-yellow-300">Live Keeping / Vyapar</div>
            </div>
          </div>

          {/* Center Section */}
          <div className="text-center flex-1 px-4">
            <p className="text-white text-base sm:text-lg font-medium">
              Currently <span className="font-bold text-xl">9</span> new buyers from <span className="font-bold">Sihora</span> are looking for your products.
            </p>
            <p className="text-white/90 text-sm mt-1">
              Get started at <span className="font-bold text-lg">₹4,000/month</span>
            </p>
          </div>

          {/* Right Section - CTA Button */}
          <div className="flex-shrink-0">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-200 text-base min-w-[140px]">
              Avail Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Promotional Banner at the top */}
      {renderPromoBanner()}
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Progress Header - Only show if not on requirements page */}
            {currentStep !== 'requirements' && (
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="6" fill="white" />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={totalMissing === 0 ? "#10b981" : "#f59e0b"}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${((3 - totalMissing) / 3) * 251.2} 251.2`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">{totalMissing}</span>
                        <span className="text-xs text-gray-600">Steps Left</span>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Complete Your Profile to Become a{' '}
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">Verified Seller</span>
                      </h1>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          Higher listing priority
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-green-500" />
                          More buyer enquiries
                        </span>
                      </div>
                    </div>
                  </div>

                  {currentStep === 'photos' && totalMissing > 0 && (
                    <div className="flex gap-3 text-sm">
                      {missingPhotoCount > 0 && (
                        <div className="px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-semibold text-orange-600">{missingPhotoCount}</span>
                          <span className="text-gray-600 ml-1">Photo{missingPhotoCount > 1 ? 's' : ''} needed</span>
                        </div>
                      )}
                      {missingDescCount > 0 && (
                        <div className="px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-semibold text-orange-600">{missingDescCount}</span>
                          <span className="text-gray-600 ml-1">Description{missingDescCount > 1 ? 's' : ''} needed</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center mt-8 max-w-2xl mx-auto">
                  {['Basic Details', 'GST Verification', 'Product Photos'].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          index === 0
                            ? 'bg-green-100 border-2 border-green-500'
                            : index === 1
                            ? currentStep === 'photos' || dontHaveGst
                              ? 'bg-green-100 border-2 border-green-500'
                              : 'bg-white border-2 border-gray-300'
                            : index === 2
                            ? currentStep === 'photos'
                              ? 'bg-blue-600 border-2 border-blue-600'
                              : 'bg-white border-2 border-gray-300'
                            : 'bg-white border-2 border-gray-300'
                        }`}>
                          {index === 0 ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : index === 1 && (currentStep === 'photos' || dontHaveGst) ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-xs mt-1.5 font-medium ${
                          index === 2 && currentStep === 'photos'
                            ? 'text-blue-600'
                            : index <= 1 && (currentStep === 'photos' || dontHaveGst)
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`}>
                          {step}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`flex-1 h-0.5 mx-2 transition-all ${
                          index === 0 || (index === 1 && (currentStep === 'photos' || dontHaveGst))
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6">
              {/* Error Message Display */}
              {photoError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{photoError}</p>
                  <button 
                    onClick={() => setPhotoError(null)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {currentStep === 'gst' ? (
                <form onSubmit={handleGstSubmit} className="max-w-3xl mx-auto">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Add GST to Double Your Business
                      </h2>
                      <span className="text-red-500">*</span>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="GST number helps build trust with buyers and enables B2B transactions"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {showError && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-700">
                          Please enter a valid 15-digit GST number
                        </p>
                      </div>
                    )}

                    {renderGstInputs()}

                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Enter your 15-character GST identification number
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={dontHaveGst}
                        onChange={handleSkipGst}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        I don&apos;t have GST yet (skip for now)
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={(!dontHaveGst && !isGstValid) || isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 min-w-[140px] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <>
                          {dontHaveGst ? 'Continue' : 'Submit GST'}
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : currentStep === 'photos' ? (
                <div className="space-y-6">
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(renderProductCard)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => setCurrentStep('gst')}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleComplete}
                      className={`px-8 py-2.5 text-white text-sm font-medium rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        totalMissing === 0
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      disabled={totalMissing > 0}
                    >
                      Complete Verification
                    </button>
                  </div>
                </div>
              ) : (
                renderRequirementsPage()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}