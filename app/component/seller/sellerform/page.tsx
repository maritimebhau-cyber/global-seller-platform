'use client';

import React, { useState, useEffect } from 'react';

// --- Types ---
type Product = {
  id: number;
  name: string;
  image: string | null;
};

export default function BusinessOnboarding() {
  // State to manage the current step (1: Create, 2: Business, 3: Product, 4: GST)
  const [currentStep, setCurrentStep] = useState(2);
  
  // Track completed steps
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Mock Data for Business Details - matching the image exactly
  const [businessData, setBusinessData] = useState({
    name: '',
    companyName: '',
    pinCode: '',
    city: '',
    state: '',
    email: '',
  });

  // State for Product Details
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '', image: null },
    { id: 2, name: '', image: null },
    { id: 3, name: '', image: null },
  ]);

  // State for GST/PAN
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [hasGST, setHasGST] = useState(false);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Real-time validation effect
  useEffect(() => {
    if (currentStep === 2) {
      validateBusinessDetails(false);
    } else if (currentStep === 3) {
      validateProductDetails(false);
    }
  }, [businessData, products, currentStep]);

  const handleImageUpload = (id: number) => {
    const mockImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80";
    setProducts(prev => prev.map(p => p.id === id ? { ...p, image: mockImage } : p));
  };

  const handleProductNameChange = (id: number, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, name: value } : p));
  };

  // GST Validation - Strict 15 character alphanumeric format
  const validateGST = (gst: string): boolean => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  // PAN Validation - Strict 10 character format (AAAAA9999A)
  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateBusinessDetails = (showErrors = true) => {
    const newErrors: Record<string, string> = {};
    
    if (!businessData.name.trim()) {
      newErrors.name = 'Please enter Name';
    }
    if (!businessData.companyName.trim()) {
      newErrors.companyName = 'Company name cannot be blank';
    }
    if (!businessData.pinCode.trim()) {
      newErrors.pinCode = '*Please enter PIN code';
    }
    if (!businessData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!businessData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!businessData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    }

    if (showErrors) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const validateProductDetails = (showErrors = true) => {
    const newErrors: Record<string, string> = {};
    
    products.forEach((product, index) => {
      if (!product.name.trim()) {
        newErrors[`product_${index}`] = 'Product/Service Name is required';
      }
    });

    if (showErrors) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const validateGSTStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (hasGST) {
      if (!gstNumber.trim()) {
        newErrors.gst = 'Please enter a valid 15 character GST number.';
      } else if (gstNumber.trim().length !== 15) {
        newErrors.gst = 'Please enter a valid 15 character GST number.';
      } else if (!validateGST(gstNumber.trim())) {
        newErrors.gst = 'Please enter a valid GST number format (e.g., 22AAAAA0000A1Z5).';
      }
    } else {
      if (!panNumber.trim()) {
        newErrors.pan = 'PAN Number is required';
      } else if (panNumber.trim().length !== 10) {
        newErrors.pan = 'Please enter a valid 10 character PAN number.';
      } else if (!validatePAN(panNumber.trim())) {
        newErrors.pan = 'Please enter a valid PAN format (e.g., AAAAA0000A).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    let isValid = false;

    if (currentStep === 2) {
      isValid = validateBusinessDetails();
    } else if (currentStep === 3) {
      isValid = validateProductDetails();
    } else if (currentStep === 4) {
      isValid = validateGSTStep();
    }

    if (isValid) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        alert('Registration completed successfully!');
      }
    }
  };

  const handleStepClick = (stepId: number) => {
    // Can only navigate to completed steps or the next immediate step
    if (completedSteps.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
    }
    // If trying to go to a future step, show alert
    else if (stepId > currentStep) {
      // Check if all previous steps are completed
      const allPreviousCompleted = Array.from({length: stepId - 1}, (_, i) => i + 1)
        .every(step => completedSteps.includes(step));
      
      if (!allPreviousCompleted) {
        alert('Please complete all previous steps first.');
      }
    }
  };

  const isStepAccessible = (stepId: number) => {
    return completedSteps.includes(stepId) || stepId === currentStep;
  };

  // --- Render Helpers ---

  const renderProgressBar = () => {
    const steps = [
      { id: 1, label: 'Create Account' },
      { id: 2, label: 'Business Details' },
      { id: 3, label: 'Product Details' },
      { id: 4, label: 'Add GST' },
    ];

    return (
      <div className="w-full mb-6 relative">
        {/* Connecting Line Background */}
        <div className="absolute top-[20px] left-[80px] right-[80px] h-[2px] bg-[#e0e0e0] -z-0"></div>
        {/* Active Line */}
        <div 
          className="absolute top-[20px] left-[80px] h-[2px] bg-[#00a699] -z-0 transition-all duration-500"
          style={{ 
            width: completedSteps.length > 1 
              ? `${((Math.max(...completedSteps) - 1) / 3) * 100}%` 
              : '0%' 
          }}
        ></div>

        <div className="flex justify-between relative z-10">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStep === step.id;
            const isAccessible = isStepAccessible(step.id);
            
            let circleClass = "w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 transition-all duration-300 ";
            let textClass = "text-[11px] mt-1 font-medium text-center w-[100px] transition-colors duration-300 ";
            
            if (isCompleted) {
              circleClass += "bg-[#00a699] border-[#00a699] text-white cursor-pointer";
              textClass += "text-[#00a699]";
            } else if (isActive) {
              circleClass += "bg-[#f0f0f5] border-[#4a5cb8] text-[#4a5cb8]";
              textClass += "text-[#4a5cb8]";
            } else {
              circleClass += "bg-white border-[#ccc] text-[#999]";
              textClass += "text-[#888]";
            }

            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center"
                onClick={() => isAccessible && handleStepClick(step.id)}
              >
                <div className={circleClass}>
                  {/* Step 1: Create Account - Checkmark when completed */}
                  {step.id === 1 && isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  
                  {/* Step 2: Business Details - Document icon */}
                  {step.id === 2 && !isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {step.id === 2 && isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  
                  {/* Step 3: Product Details - Box/Package icon (3D box style) */}
                  {step.id === 3 && !isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                  {step.id === 3 && isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  
                  {/* Step 4: Add GST - Bookmark/Badge with ₹ symbol */}
                  {step.id === 4 && !isCompleted && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2h12a2 2 0 012 2v16l-8-4-8 4V4a2 2 0 012-2z" />
                      <text x="12" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">₹</text>
                    </svg>
                  )}
                  {step.id === 4 && isCompleted && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={textClass}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBusinessDetailsForm = () => {
    const isComplete = validateBusinessDetails(false);
    
    return (
      <div className="w-full animate-in fade-in duration-300">
        {/* Success Message */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-[#00a699] flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[14px] text-[#00a699]">Account created successfully</span>
        </div>

        <h1 className="text-[26px] font-bold text-[#2d3a8c] mb-1">Business Details</h1>
        <p className="text-[14px] text-[#666] mb-6">Start adding your business details:</p>

        <div className="space-y-4">
          {/* Your Name Field */}
          <div className="relative">
            <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.name ? 'border-red-500' : 'border-gray-300'}`}>
              <div className="mr-3 flex items-center justify-center w-5">
                <svg className={`w-5 h-5 ${errors.name ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 relative">
                {!businessData.name && (
                  <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.name ? 'text-red-500' : 'text-gray-500'}`}>
                    Your Name<span className="text-red-500">*</span>
                  </label>
                )}
                <input
                  type="text"
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                />
              </div>
            </div>
            {errors.name && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.name}</p>}
          </div>

          {/* Company/Business/Shop Name Field */}
          <div className="relative">
            <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}>
              <div className="mr-3 flex items-center justify-center w-5">
                <svg className={`w-5 h-5 ${errors.companyName ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 relative">
                {!businessData.companyName && (
                  <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.companyName ? 'text-red-500' : 'text-gray-500'}`}>
                    Company/Business/Shop Name<span className="text-red-500">*</span>
                  </label>
                )}
                <input
                  type="text"
                  value={businessData.companyName}
                  onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                  className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                />
              </div>
            </div>
            {errors.companyName && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.companyName}</p>}
          </div>

          {/* Three Column Row: Pin Code, City, State */}
          <div className="grid grid-cols-3 gap-3">
            {/* Pin Code Field */}
            <div className="relative">
              <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="mr-2 flex items-center justify-center w-5">
                  <svg className={`w-5 h-5 ${errors.pinCode ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 relative">
                  {!businessData.pinCode && (
                    <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.pinCode ? 'text-red-500' : 'text-gray-500'}`}>
                      Pin Code<span className="text-red-500">*</span>
                    </label>
                  )}
                  <input
                    type="text"
                    value={businessData.pinCode}
                    onChange={(e) => setBusinessData({ ...businessData, pinCode: e.target.value })}
                    className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              {errors.pinCode && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.pinCode}</p>}
            </div>

            {/* City Field */}
            <div className="relative">
              <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.city ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="mr-2 flex items-center justify-center w-5">
                  <svg className={`w-5 h-5 ${errors.city ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1 relative">
                  {!businessData.city && (
                    <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.city ? 'text-red-500' : 'text-gray-500'}`}>
                      City<span className="text-red-500">*</span>
                    </label>
                  )}
                  <input
                    type="text"
                    value={businessData.city}
                    onChange={(e) => setBusinessData({ ...businessData, city: e.target.value })}
                    className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* State Field */}
            <div className="relative">
              <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="mr-2 flex items-center justify-center w-5">
                  <svg className={`w-5 h-5 ${errors.state ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1 relative">
                  {!businessData.state && (
                    <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.state ? 'text-red-500' : 'text-gray-500'}`}>
                      State<span className="text-red-500">*</span>
                    </label>
                  )}
                  <input
                    type="text"
                    value={businessData.state}
                    onChange={(e) => setBusinessData({ ...businessData, state: e.target.value })}
                    className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email ID Field */}
          <div className="relative">
            <div className={`border rounded-[6px] px-3 py-3 bg-white flex items-center ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
              <div className="mr-3 flex items-center justify-center w-5">
                <svg className={`w-5 h-5 ${errors.email ? 'text-red-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 relative">
                {!businessData.email && (
                  <label className={`absolute left-0 top-1/2 -translate-y-1/2 text-[14px] ${errors.email ? 'text-red-500' : 'text-gray-500'}`}>
                    Email ID<span className="text-red-500">*</span>
                  </label>
                )}
                <input
                  type="email"
                  value={businessData.email}
                  onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                  className="w-full text-[14px] text-gray-900 focus:outline-none bg-transparent"
                />
              </div>
            </div>
            {errors.email && <p className="text-[12px] text-red-500 mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Verify Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleContinue}
              className="bg-[#2db5a5] hover:bg-[#259e8f] text-white font-medium text-[14px] px-8 py-2.5 rounded-[4px] transition-colors duration-200 flex items-center gap-2"
            >
              Verify
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProductDetailsForm = () => {
    const isComplete = validateProductDetails(false);
    
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Success Banner */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-[18px] h-[18px] rounded-full bg-[#00a699] flex items-center justify-center">
            <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[13px] text-[#666]">Business details added successfully</span>
        </div>

        <h1 className="text-[24px] font-bold text-[#2d3a8c] mb-1">Product Details</h1>
        <p className="text-[12px] text-[#888] mb-6">Add 3 products/services you wish to sell, you can add more later :</p>

        <div className="space-y-6">
          {/* Photo Upload Grid */}
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-2">
                <div 
                  onClick={() => handleImageUpload(product.id)}
                  className={`
                    aspect-square rounded-[4px] border border-[#ddd] flex flex-col items-center justify-center cursor-pointer transition-all
                    ${product.image ? 'bg-gray-50' : 'bg-white hover:bg-gray-50 hover:border-[#00a699]'}
                  `}
                >
                  {product.image ? (
                    <img src={product.image} alt="Product" className="w-full h-full object-cover rounded-[4px]" />
                  ) : (
                    <>
                      <div className="relative mb-1">
                        <svg className="w-6 h-6 text-[#00a699]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00a699] rounded-full flex items-center justify-center text-white text-[8px] font-bold">+</div>
                      </div>
                      <span className="text-[12px] text-[#00a699] font-medium">Add Photo</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Product Name Inputs */}
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
               <div key={`input-${product.id}`} className="relative">
                 <label className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-[#555] font-medium">Product/Service Name*</label>
                 <input 
                   type="text"
                   value={product.name}
                   onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                   className={`w-full border rounded-[4px] px-3 py-2 text-[12px] text-[#333] outline-none focus:border-[#4a5cb8] transition-colors ${errors[`product_${index}`] ? 'border-[#d32f2f]' : 'border-[#ccc]'}`}
                 />
                 {errors[`product_${index}`] && <p className="text-[10px] text-[#d32f2f] mt-1">{errors[`product_${index}`]}</p>}
               </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button 
              onClick={handleContinue}
              disabled={!isComplete}
              className={`font-medium text-[13px] px-8 py-2 rounded-[4px] shadow-md transition-all active:scale-95 ${
                isComplete
                  ? 'bg-[#00a699] hover:bg-[#008f82] text-white cursor-pointer'
                  : 'bg-[#ccc] text-[#666] cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGSTForm = () => {
    // Check if current input is valid for button state
    const isComplete = hasGST 
      ? validateGST(gstNumber.trim())
      : validatePAN(panNumber.trim());
    
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Success Banner */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-[18px] h-[18px] rounded-full bg-[#00a699] flex items-center justify-center">
            <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[13px] text-[#666]">Product details added successfully</span>
        </div>

        <h1 className="text-[24px] font-bold text-[#2d3a8c] mb-1">GST Details</h1>
        <p className="text-[13px] text-[#666] mb-6">Add your statutory details</p>

        <div className="space-y-5">
          {/* Radio Buttons */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => setHasGST(true)}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${hasGST ? 'border-[#00a699]' : 'border-[#ccc]'}`}>
                {hasGST && <div className="w-2 h-2 rounded-full bg-[#00a699]"></div>}
              </div>
              <input 
                type="radio" 
                name="gstOption" 
                className="hidden" 
                checked={hasGST}
                onChange={() => setHasGST(true)}
              />
              <span className="text-[13px] text-[#333]">I have GSTN</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => setHasGST(false)}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!hasGST ? 'border-[#00a699]' : 'border-[#ccc]'}`}>
                {!hasGST && <div className="w-2 h-2 rounded-full bg-[#00a699]"></div>}
              </div>
              <input 
                type="radio" 
                name="gstOption" 
                className="hidden" 
                checked={!hasGST}
                onChange={() => setHasGST(false)}
              />
              <span className="text-[13px] text-[#333]">I don't have it</span>
            </label>
          </div>

          {/* Conditional Input Field */}
          {hasGST ? (
            // GST Number Field
            <div className="relative">
              <div className={`border rounded-[4px] px-0 py-0 flex items-center overflow-hidden ${errors.gst ? 'border-[#d32f2f]' : 'border-[#ccc]'}`}>
                {/* Icon Box */}
                <div className="bg-[#f5f5f5] border-r border-[#ddd] px-3 py-2.5 flex items-center justify-center">
                  <div className="w-5 h-5 border border-[#999] rounded flex items-center justify-center bg-white">
                    <span className="text-[#666] text-[10px] font-bold">₹</span>
                  </div>
                </div>
                <div className="flex-1 relative px-3 py-1.5">
                  <label className="absolute -top-0 left-2 bg-white px-1 text-[10px] text-[#666] font-medium">
                    GST Number<span className="text-[#d32f2f]">*</span>
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    maxLength={15}
                    className="w-full text-[13px] text-[#333] outline-none bg-transparent pt-1 uppercase"
                  />
                </div>
              </div>
              {errors.gst && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.gst}</p>}
              <p className="text-[10px] text-[#888] mt-1">Format: 22AAAAA0000A1Z5</p>
            </div>
          ) : (
            // PAN Number Field
            <div className="relative">
              <div className="border border-[#ccc] rounded-[4px] px-0 py-0 flex items-center overflow-hidden">
                {/* Icon Box */}
                <div className="bg-[#f5f5f5] border-r border-[#ddd] px-3 py-2.5 flex items-center justify-center">
                  <div className="w-5 h-5 border border-[#999] rounded flex items-center justify-center bg-white">
                    <span className="text-[#666] text-[10px] font-bold">₹</span>
                  </div>
                </div>
                <div className="flex-1 relative px-3 py-1.5">
                  <label className="absolute -top-0 left-2 bg-white px-1 text-[10px] text-[#666] font-medium">
                    PAN Number<span className="text-[#d32f2f]">*</span>
                  </label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="w-full text-[13px] text-[#333] outline-none bg-transparent pt-1 uppercase"
                  />
                </div>
              </div>
              {errors.pan && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.pan}</p>}
              <p className="text-[10px] text-[#888] mt-1">Format: AAAAA0000A</p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleContinue}
              disabled={!isComplete}
              className={`font-medium text-[14px] px-8 py-2.5 rounded-[4px] transition-colors duration-200 ${
                isComplete
                  ? 'bg-[#2db5a5] hover:bg-[#259e8f] text-white cursor-pointer'
                  : 'bg-[#ccc] text-[#666] cursor-not-allowed'
              }`}
            >
              Start Selling
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex font-sans">
      {/* Left Section - White Background Container */}
      <div className="flex-1 flex flex-col items-center py-8 px-6">
        <div className="w-full max-w-[600px] bg-white rounded-lg shadow-sm p-8">
          {renderProgressBar()}
          
          {/* Conditional Rendering based on Step */}
          {currentStep === 2 && renderBusinessDetailsForm()}
          {currentStep === 3 && renderProductDetailsForm()}
          {currentStep === 4 && renderGSTForm()}
          {currentStep === 1 && (
             <div className="mt-20 text-gray-500 text-center">Account already created. Please continue with business details.</div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[380px] bg-[#f0f0f0] flex flex-col px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[6px] p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#eee]">
            <div className="w-6 h-6 rounded-full bg-[#e8e8e8] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h2 className="text-[14px] font-bold text-[#222]">Your Profile So Far</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-[13px]">
              <span className="text-[#888] w-24">Your Name</span>
              <span className="text-[#ccc] mx-2">:</span>
              <span className="text-[#333] font-medium">{businessData.name || 'Ritik Jain'}</span>
            </div>
            <div className="flex items-center text-[13px]">
              <span className="text-[#888] w-24">Email</span>
              <span className="text-[#ccc] mx-2">:</span>
              <span className="text-[#333] font-medium flex-1 truncate">ritikjain9303.rj@gmail.com</span>
              <div className="w-4 h-4 rounded-full bg-[#00a699] flex items-center justify-center flex-shrink-0 ml-2">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="mt-auto">
          <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
            <div className="flex">
              {/* Left Side - Image */}
              <div className="w-[45%] relative">
                 <img 
                   src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" 
                   alt="Testimonial" 
                   className="w-full h-full object-cover absolute inset-0"
                 />
              </div>
              
              {/* Right Side - Content */}
              <div className="w-[55%] p-4 flex flex-col justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8f0ff]">
                <div className="mb-2">
                   <span className="text-[#4a5cb8] text-4xl font-serif leading-none">"</span>
                </div>
                <p className="text-[#333] text-[13px] leading-snug mb-1">
                  My business grew <span className="text-[#00a699] font-bold text-[15px]">10X</span>
                </p>
                <p className="text-[#555] text-[11px] leading-snug mb-1">
                  with trusted digital presence
                </p>
                <p className="text-[#555] text-[11px] leading-snug mb-3">
                  using <span className="text-[#00a699] font-bold text-[13px]">Indiamart</span>
                </p>
                <p className="text-[#777] text-[10px] italic">- owner Moorti Mahal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}