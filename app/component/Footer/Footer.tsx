'use client';

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaApple,
  FaAndroid,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#f2f2f2] border-t border-[#e1e1e1]"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-[6px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <p className="text-sm sm:text-[14px] font-semibold text-[#2d3dbf]">
            We are here to help you!
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-[13px] text-black">
            <div className="flex items-center gap-2">
              <span>Go Mobile:</span>
              <FaApple className="text-base sm:text-[16px] cursor-pointer hover:text-[#2d3dbf] transition-colors" />
              <FaAndroid className="text-base sm:text-[16px] cursor-pointer hover:text-[#2d3dbf] transition-colors" />
            </div>

            <div className="flex items-center gap-2">
              <span>Follow us on:</span>
              <FaFacebookF className="text-[#1877f2] cursor-pointer hover:opacity-80 transition-opacity" />
              <FaXTwitter className="cursor-pointer hover:text-[#2d3dbf] transition-colors" />
              <FaLinkedinIn className="text-[#0a66c2] cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-[10px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 text-xs sm:text-[13px] text-[#7a7a7a] leading-relaxed sm:leading-[18px]">
          {/* Column 1 - About & Company */}
          <div>
            <ul className="space-y-2 sm:space-y-[4px]">
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  IndiaMART Export
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Join Sales
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Press Section
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Advertise with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Support */}
          <div>
            <ul className="space-y-2 sm:space-y-[4px]">
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Jobs & Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Complaints
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Customer Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Suppliers Tool Kit */}
          <div>
            <h4 className="text-sm sm:text-[15px] font-semibold text-black mb-2 sm:mb-[4px]">
              Suppliers Tool Kit
            </h4>
            <ul className="space-y-2 sm:space-y-[4px]">
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Sell on IndiaMART
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Latest BuyLead
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Learning Centre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Ship With IndiaMART
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Buyers Tool Kit */}
          <div>
            <h4 className="text-sm sm:text-[15px] font-semibold text-black mb-2 sm:mb-[4px]">
              Buyers Tool Kit
            </h4>
            <ul className="space-y-2 sm:space-y-[4px]">
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Post Your Requirement
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Products You Buy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Search Products & Suppliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Accounting Solutions */}
          <div>
            <h4 className="text-sm sm:text-[15px] font-semibold text-black mb-2 sm:mb-[4px]">
              Accounting Solutions
            </h4>
            <ul className="space-y-2 sm:space-y-[4px]">
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Accounting Software
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  Tally on Mobile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                  GST e-Invoice
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e1e1e1] py-3 sm:py-[6px] text-[11px] sm:text-[12px] text-[#7a7a7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center sm:text-left">
            <p>
              Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-1">
              <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                Terms of Use
              </Link>
              <span className="hidden sm:inline mx-1">-</span>
              <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline mx-1">-</span>
              <Link href="#" className="hover:text-[#2d3dbf] hover:underline transition-colors">
                Link to Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}