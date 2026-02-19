'use client';
import React, { useState, useRef, useEffect } from 'react';

import { 
  Grid, 
  MessageSquare, 
  Shield, 
  User, 
  Truck, 
  Ticket, 
  Edit3, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [pendingRoute, setPendingRoute] = useState<string>('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Check if already verified on mount (optional: persist in localStorage)
  useEffect(() => {
    const verified = sessionStorage.getItem('sidebarVerified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>, route: string) => {
    // If already verified, allow normal navigation
    if (isVerified) {
      return; // Let the Link work normally
    }
    
    // Otherwise show popup
    e.preventDefault();
    setPendingRoute(route);
    setShowPopup(true);
    setOtpSent(false);
    setOtp(['', '', '', '']);
  };

  const closePopup = () => {
    setShowPopup(false);
    setOtpSent(false);
    setOtp(['', '', '', '']);
    setPendingRoute('');
  };

  const handleSendOTP = () => {
    setOtpSent(true);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (index === 3 && value) {
      // OTP complete - verify and navigate
      setTimeout(() => {
        completeVerification();
      }, 300);
    }
  };

  const completeVerification = () => {
    setIsVerified(true);
    sessionStorage.setItem('sidebarVerified', 'true');
    setShowPopup(false);
    setOtp(['', '', '', '']);
    setOtpSent(false);
    
    // Navigate to the pending route if exists
    if (pendingRoute) {
      window.location.href = pendingRoute;
    }
    setPendingRoute('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSignInDifferent = () => {
    // Reset verification
    setIsVerified(false);
    sessionStorage.removeItem('sidebarVerified');
    closePopup();
  };

  // If popup is shown, render only the popup
  if (showPopup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-indigo-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">
              Login with One Time Password (OTP)
            </h2>
            <button 
              onClick={closePopup}
              className="text-white hover:text-gray-200 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="p-8 text-center">
            {!otpSent ? (
              <>
                <h3 className="text-gray-800 text-lg font-medium mb-2">
                  To Continue with Login
                </h3>
                <p className="text-gray-600 mb-6">
                  Click below to get One Time Password (OTP)<br />
                  on your mobile
                </p>
                
                <button 
                  onClick={handleSendOTP}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-12 rounded transition-colors"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Enter the 4 digit One Time Password (OTP) sent to<br />
                  your mobile number
                </p>
                
                <h3 className="text-gray-800 text-lg font-semibold mb-4">
                  Enter OTP
                </h3>
                
                <div className="flex justify-center gap-3 mb-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 border-2 border-gray-400 rounded text-center text-xl font-semibold focus:border-indigo-500 focus:outline-none"
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mb-8">
                  Didn&apos;t receive OTP on mobile? <span className="text-teal-600 cursor-pointer hover:underline">Resend (00:27)</span>
                </p>
              </>
            )}
            
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-600 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            
            <button 
              onClick={handleSignInDifferent}
              className="text-gray-600 hover:text-gray-800 underline font-medium"
            >
              Sign In as Different User
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal sidebar view
  return (
    <div className="w-65 bg-white min-h-screen p-4 flex flex-col font-sans">
      <div className="flex items-center gap-4 mb-6 px-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
          R
        </div>
        <div className="text-xl font-semibold text-gray-900">Ritik</div>
      </div>

      <nav className="flex flex-col gap-1">
        {/* Dashboard - Always accessible */}
        <Link
          href="/dashboard/buyer"
          className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-indigo-50 text-indigo-600 cursor-pointer group"
        >
          <Grid size={20} strokeWidth={2} />
          <span className="flex-1 text-[15px] font-medium">Dashboard</span>
          <ChevronRight size={18} className="text-gray-400" />
        </Link>

        {/* Messages */}
        {isVerified ? (
          <Link
            href="/component/messages"
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <MessageSquare size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">Messages</span>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '/component/messages')}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <MessageSquare size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">Messages</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}

        {/* Know Your Seller */}
        {isVerified ? (
          <Link
            href="/dashboard/knowyourseller"
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-teal-50 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors group"
          >
            <Shield size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px] font-medium">Know Your Seller</span>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          </Link>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '/dashboard/knowyourseller')}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-teal-50 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors group"
          >
            <Shield size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px] font-medium">Know Your Seller</span>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          </div>
        )}

        {/* My Profile */}
        {isVerified ? (
          <Link href="/dashboard/profile" className="block">
            <div className="flex items-start gap-3 px-4 pt-3.5 pb-7 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group relative">
              <div className="relative">
                <User size={20} strokeWidth={2} />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 absolute -top-0.5 -right-0.5 border-2 border-white"></div>
              </div>
              <span className="flex-1 text-[15px]">My Profile</span>
              <ChevronRight size={18} className="text-gray-400 mt-0.5" />
              <div className="absolute left-12 bottom-2 text-xs font-medium text-orange-500">complete</div>
            </div>
          </Link>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '/dashboard/profile')}
            className="flex items-start gap-3 px-4 pt-3.5 pb-7 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group relative"
          >
            <div className="relative">
              <User size={20} strokeWidth={2} />
              <div className="w-2.5 h-2.5 rounded-full bg-orange-400 absolute -top-0.5 -right-0.5 border-2 border-white"></div>
            </div>
            <span className="flex-1 text-[15px]">My Profile</span>
            <ChevronRight size={18} className="text-gray-400 mt-0.5" />
            <div className="absolute left-12 bottom-2 text-xs font-medium text-orange-500">complete</div>
          </div>
        )}

        {/* Ship With IM */}
        {isVerified ? (
          <Link href="/component/shipwitheim" className="block">
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group">
              <Truck size={20} strokeWidth={2} />
              <span className="flex-1 text-[15px]">Ship With IM</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </Link>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '/component/shipwitheim')}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <Truck size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">Ship With IM</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}

        {/* My Tickets */}
        {isVerified ? (
          <Link href="/dashboard/mytickets" className="block">
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group">
              <Ticket size={20} strokeWidth={2} />
              <span className="flex-1 text-[15px]">My Tickets</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </Link>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '/dashboard/mytickets')}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <Ticket size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">My Tickets</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}

        {/* Any Suggestion */}
        {isVerified ? (
          <div
            onClick={() => {/* Handle suggestion modal */}}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <Edit3 size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">Any Suggestion</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        ) : (
          <div
            onClick={(e) => handleNavigation(e, '')}
            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
          >
            <Edit3 size={20} strokeWidth={2} />
            <span className="flex-1 text-[15px]">Any Suggestion</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}
      </nav>

      {/* Help Card */}
      <div className="mt-6">
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900 mb-0.5">Need Help?</div>
              <div className="text-sm text-gray-600">Call: 096-9696-9696</div>
            </div>
          </div>
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat With Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;