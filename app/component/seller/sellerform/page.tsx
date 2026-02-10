'use client';

import React, { useState } from 'react';

// --- Types ---
type Product = {
  id: number;
  name: string;
  image: string | null;
};

export default function BusinessOnboarding() {
  // State to manage the current step (1: Create, 2: Business, 3: Product, 4: GST)
  const [currentStep, setCurrentStep] = useState(4);

  // Mock Data for Business Details - matching the image exactly
  const [businessData, setBusinessData] = useState({
    name: '',
    companyName: '',
    city: '',
    state: '',
    mobileNumber: '',
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
  const [hasGST, setHasGST] = useState(false); // Default to "I don't have it" based on image

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handler for image upload simulation
  const handleImageUpload = (id: number) => {
    const mockImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80 ";
    setProducts(prev => prev.map(p => p.id === id ? { ...p, image: mockImage } : p));
  };

  const handleProductNameChange = (id: number, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, name: value } : p));
  };

  const validateBusinessDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessData.name.trim()) {
      newErrors.name = 'Your Name is required';
    }
    if (!businessData.companyName.trim()) {
      newErrors.companyName = 'Company/Business/Shop Name is required';
    }
    if (!businessData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!businessData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!businessData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProductDetails = () => {
    const newErrors: Record<string, string> = {};
    
    products.forEach((product, index) => {
      if (!product.name.trim()) {
        newErrors[`product_${index}`] = 'Product/Service Name is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGST = () => {
    const newErrors: Record<string, string> = {};
    
    if (hasGST) {
      // Validate GST Number (15 characters)
      if (!gstNumber.trim()) {
        newErrors.gst = 'Please enter a valid 15 character GST number.';
      } else if (gstNumber.trim().length !== 15) {
        newErrors.gst = 'Please enter a valid 15 character GST number.';
      }
    } else {
      // Validate PAN Number (10 characters)
      if (!panNumber.trim()) {
        newErrors.pan = 'PAN Number is required';
      } else if (panNumber.trim().length !== 10) {
        newErrors.pan = 'Please enter a valid 10 character PAN number.';
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
      isValid = validateGST();
    }

    if (isValid && currentStep < 4) {
      setErrors({});
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 4) {
      // Handle final submission
      alert('Registration completed successfully!');
    }
  };

  const handleStepClick = (stepId: number) => {
    // Prevent going back to step 1 (Create Account) since account is already created
    if (stepId >= 2 && stepId <= 4) {
      setCurrentStep(stepId);
    }
  };

  // --- Render Helpers ---

  const renderProgressBar = () => {
    const steps = [
      { id: 1, label: 'Create Account', icon: 'check' },
      { id: 2, label: 'Business Details', icon: 'check' },
      { id: 3, label: 'Product Details', icon: 'check' },
      { id: 4, label: 'Add GST', icon: 'rupee' },
    ];

    return (
      <div className="w-full max-w-[600px] mb-6 relative">
        {/* Connecting Line Background */}
        <div className="absolute top-[18px] left-[70px] right-[70px] h-[2px] bg-[#e0e0e0] -z-0"></div>
        {/* Active Line - All steps completed up to 3 */}
        <div 
          className="absolute top-[18px] left-[70px] h-[2px] bg-[#00a699] -z-0 transition-all duration-500"
          style={{ width: '66%' }}
        ></div>

        <div className="flex justify-between relative z-10">
          {steps.map((step) => {
            const isCompleted = step.id < 4; // First 3 steps completed
            const isActive = currentStep === step.id;
            
            let circleClass = "w-[36px] h-[36px] rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ";
            let textClass = "text-[11px] mt-1 font-medium text-center w-[100px] transition-colors duration-300 ";
            
            if (isCompleted) {
              circleClass += "bg-[#00a699] border-[#00a699] text-white";
              textClass += "text-[#00a699]";
            } else if (isActive) {
              circleClass += "bg-[#f5f5f5] border-[#4a5cb8] text-[#4a5cb8]";
              textClass += "text-[#4a5cb8]";
            } else {
              circleClass += "bg-white border-[#ccc] text-[#999]";
              textClass += "text-[#888]";
            }

            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center"
                onClick={() => handleStepClick(step.id)}
              >
                <div className={circleClass}>
                  {step.icon === 'check' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {step.icon === 'rupee' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12M6 8h12M6 13c0 2.5 2 4 5 4h3M6 18h12"/>
                      <path d="M14 13l3-3m0 0l-3-3m3 3H9"/>
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

  const renderBusinessDetailsForm = () => (
    <div className="w-full max-w-[600px] bg-white p-8 rounded-lg animate-in fade-in duration-300">
      {/* Success Message */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-[18px] h-[18px] rounded-full bg-[#00a699] flex items-center justify-center flex-shrink-0">
          <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-[13px] text-[#00a699]">Account created successfully</span>
      </div>

      <h1 className="text-[28px] font-bold text-[#3d4b87] mb-1">Business Details</h1>
      <p className="text-[13px] text-[#666] mb-8">Start adding your business details:</p>

      <div className="space-y-5">
        {/* Your Name Field */}
        <div className="relative">
          <div className={`border rounded-[6px] px-1 py-1 bg-white flex items-center ${errors.name ? 'border-[#d32f2f]' : 'border-[#333]'}`}>
            <div className="mr-3 flex items-center justify-center w-5">
              {/* Briefcase icon */}
              <svg className="w-[18px] h-[18px] text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 relative">
              <label className="absolute -top-2 left-0 bg-white px-1 text-[11px] text-[#333] font-semibold">
                Your Name<span className="text-[#d32f2f]">*</span>
              </label>
              <input
                type="text"
                value={businessData.name}
                onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                className="w-full text-[14px] text-[#333] focus:outline-none bg-transparent pt-1"
              />
            </div>
          </div>
          {errors.name && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.name}</p>}
        </div>

        {/* Company/Business/Shop Name Field */}
        <div className="relative flex items-start">
          <div className="flex-1">
            <div className={`border rounded-[6px] px-1 py-1 bg-white flex items-center ${errors.companyName ? 'border-[#d32f2f]' : 'border-[#333]'}`}>
              <div className="mr-3 flex items-center justify-center w-5">
                {/* Building icon */}
                <svg className="w-[18px] h-[18px] text-[#555]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              </div>
              <div className="flex-1 relative">
                <label className="absolute -top-2 left-0 bg-white px-1 text-[11px] text-[#333] font-semibold">
                  Company/Business/Shop Name<span className="text-[#d32f2f]">*</span>
                </label>
                <input
                  type="text"
                  value={businessData.companyName}
                  onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                  className="w-full text-[14px] text-[#333] focus:outline-none bg-transparent pt-1"
                />
              </div>
            </div>
            {errors.companyName && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.companyName}</p>}
          </div>
          {/* Info icon outside the field */}
          <button className="ml-2 mt-3 hover:opacity-70 transition-opacity">
            <svg className="w-[18px] h-[18px] text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/>
              <path strokeLinecap="round" d="M12 16v-4m0-4h.01"/>
            </svg>
          </button>
        </div>

        {/* City Field */}
        <div className="relative">
          <div className={`border rounded-[6px] px-1 py-1 bg-white flex items-center ${errors.city ? 'border-[#d32f2f]' : 'border-[#333]'}`}>
            <div className="mr-3 flex items-center justify-center w-5">
              {/* City skyline icon */}
              <svg className="w-[18px] h-[18px] text-[#555]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
              </svg>
            </div>
            <div className="flex-1 relative">
              <label className="absolute -top-2 left-0 bg-white px-1 text-[11px] text-[#333] font-semibold">
                City<span className="text-[#d32f2f]">*</span>
              </label>
              <input
                type="text"
                value={businessData.city}
                onChange={(e) => setBusinessData({ ...businessData, city: e.target.value })}
                className="w-full text-[14px] text-[#333] focus:outline-none bg-transparent pt-1"
              />
            </div>
          </div>
          {errors.city && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.city}</p>}
        </div>

        {/* State Field */}
        <div className="relative">
          <div className={`border rounded-[6px] px-1 py-1 bg-white flex items-center ${errors.state ? 'border-[#d32f2f]' : 'border-[#333]'}`}>
            <div className="mr-3 flex items-center justify-center w-5">
              {/* Building/State icon */}
              <svg className="w-[18px] h-[18px] text-[#555]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="flex-1 relative">
              <label className="absolute -top-2 left-0 bg-white px-1 text-[11px] text-[#333] font-semibold">
                State<span className="text-[#d32f2f]">*</span>
              </label>
              <input
                type="text"
                placeholder="State*"
                value={businessData.state}
                onChange={(e) => setBusinessData({ ...businessData, state: e.target.value })}
                className="w-full text-[14px] text-[#333] placeholder:text-[#999] focus:outline-none bg-transparent pt-1"
              />
            </div>
          </div>
          {errors.state && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.state}</p>}
        </div>

        {/* Mobile Number Field */}
        <div className="relative">
          <div className={`border rounded-[6px] px-1 py-1 bg-white flex items-center ${errors.mobileNumber ? 'border-[#d32f2f]' : 'border-[#333]'}`}>
            <div className="mr-3 flex items-center justify-center w-5">
              {/* Phone icon */}
              <svg className="w-[18px] h-[18px] text-[#555]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div className="flex-1 relative">
              <label className="absolute -top-2 left-0 bg-white px-1 text-[11px] text-[#333] font-semibold">
                Mobile Number<span className="text-[#d32f2f]">*</span>
              </label>
              <input
                type="tel"
                value={businessData.mobileNumber}
                onChange={(e) => setBusinessData({ ...businessData, mobileNumber: e.target.value })}
                className="w-full text-[14px] text-[#333] focus:outline-none bg-transparent pt-1"
              />
            </div>
          </div>
          {errors.mobileNumber && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.mobileNumber}</p>}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleContinue}
            className="bg-[#2db5a5] hover:bg-[#259e8f] text-white font-medium text-[14px] px-8 py-2.5 rounded-[4px] transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductDetailsForm = () => (
    <div className="w-full max-w-[600px] bg-white p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Success Banner */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-[18px] h-[18px] rounded-full bg-[#00a699] flex items-center justify-center">
          <svg className="w-[10px] h-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-[13px] text-[#666]">Business details added successfully</span>
      </div>

      <h1 className="text-[24px] font-bold text-[#3d4b87] mb-1">Product Details</h1>
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
            className="bg-[#00a699] hover:bg-[#008f82] text-white font-medium text-[13px] px-8 py-2 rounded-[4px] shadow-md transition-all active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderGSTForm = () => (
    <div className="w-full max-w-[600px] bg-white p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
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
          // GST Number Field (with validation error state)
          <div className="relative">
            <div className={`border rounded-[4px] px-0 py-0 flex items-center overflow-hidden ${errors.gst ? 'border-[#d32f2f]' : 'border-[#ccc]'}`}>
              {/* Icon Box */}
              <div className="bg-[#f5f5f5] border-r border-[#ddd] px-3 py-2.5 flex items-center justify-center">
                <div className="w-5 h-5 border border-[#999] rounded flex items-center justify-center bg-white">
                  <span className="text-[#666] text-[10px] font-bold">₹</span>
                </div>
              </div>
              <div className="flex-1 relative px-3 py-1.5">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-[#d32f2f] font-medium">
                  GST Number<span className="text-[#d32f2f]">*</span>
                </label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full text-[13px] text-[#333] outline-none bg-transparent pt-1"
                />
              </div>
            </div>
            {errors.gst && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.gst}</p>}
          </div>
        ) : (
          // PAN Number Field (normal state)
          <div className="relative">
            <div className="border border-[#ccc] rounded-[4px] px-0 py-0 flex items-center overflow-hidden">
              {/* Icon Box */}
              <div className="bg-[#f5f5f5] border-r border-[#ddd] px-3 py-2.5 flex items-center justify-center">
                <div className="w-5 h-5 border border-[#999] rounded flex items-center justify-center bg-white">
                  <span className="text-[#666] text-[10px] font-bold">₹</span>
                </div>
              </div>
              <div className="flex-1 relative px-3 py-1.5">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-[#666] font-medium">
                  PAN Number<span className="text-[#d32f2f]">*</span>
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  className="w-full text-[13px] text-[#333] outline-none bg-transparent pt-1"
                />
              </div>
            </div>
            {errors.pan && <p className="text-[11px] text-[#d32f2f] mt-1">{errors.pan}</p>}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleContinue}
            className="bg-[#2db5a5] hover:bg-[#259e8f] text-white font-medium text-[14px] px-8 py-2.5 rounded-[4px] transition-colors duration-200"
          >
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex font-sans">
      {/* Left Section - White Background Container */}
      <div className="flex-1 flex flex-col items-center py-8 px-6">
        <div className="w-full max-w-[700px] bg-white rounded-lg shadow-sm p-8">
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
              <span className="text-[#333] font-medium">Ritik Jain</span>
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
                   src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop " 
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