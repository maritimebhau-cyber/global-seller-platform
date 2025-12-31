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
      <div className="max-w-7xl mx-auto px-6 py-[6px] flex justify-between items-center">
        <p className="text-[14px] font-semibold text-[#2d3dbf]">
          We are here to help you!
        </p>

        <div className="flex items-center gap-3 text-[13px] text-black">
          <span>Go Mobile:</span>
          <FaApple className="text-[16px]" />
          <FaAndroid className="text-[16px]" />

          <span className="ml-3">Follow us on:</span>
          <FaFacebookF className="text-[#1877f2]" />
          <FaXTwitter />
          <FaLinkedinIn className="text-[#0a66c2]" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-[10px] grid grid-cols-5 gap-6 text-[13px] text-[#7a7a7a] leading-[18px]">
        {/* Column 1 */}
        <ul className="space-y-[4px]">
          <li><Link href="#">About Us</Link></li>
          <li><Link href="#">IndiaMART Export</Link></li>
          <li><Link href="#">Join Sales</Link></li>
          <li><Link href="#">Success Stories</Link></li>
          <li><Link href="#">Press Section</Link></li>
          <li><Link href="#">Advertise with Us</Link></li>
        </ul>

        {/* Column 2 */}
        <ul className="space-y-[4px]">
          <li><Link href="#">Jobs & Careers</Link></li>
          <li><Link href="#">Help</Link></li>
          <li><Link href="#">Feedback</Link></li>
          <li><Link href="#">Complaints</Link></li>
          <li><Link href="#">Customer Care</Link></li>
          <li><Link href="#">Contact Us</Link></li>
        </ul>

        {/* Column 3 */}
        <div>
          <h4 className="text-[15px] font-semibold text-black mb-[4px]">
            Suppliers Tool Kit
          </h4>
          <ul className="space-y-[4px]">
            <li><Link href="#">Sell on IndiaMART</Link></li>
            <li><Link href="#">Latest BuyLead</Link></li>
            <li><Link href="#">Learning Centre</Link></li>
            <li><Link href="#">Ship With IndiaMART</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-[15px] font-semibold text-black mb-[4px]">
            Buyers Tool Kit
          </h4>
          <ul className="space-y-[4px]">
            <li><Link href="#">Post Your Requirement</Link></li>
            <li><Link href="#">Products You Buy</Link></li>
            <li><Link href="#">Search Products & Suppliers</Link></li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h4 className="text-[15px] font-semibold text-black mb-[4px]">
            Accounting Solutions
          </h4>
          <ul className="space-y-[4px]">
            <li><Link href="#">Accounting Software</Link></li>
            <li><Link href="#">Tally on Mobile</Link></li>
            <li><Link href="#">GST e-Invoice</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e1e1e1] py-[6px] text-[12px] text-[#7a7a7a]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <p>
            Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.
          </p>
          <p>
            <Link href="#">Terms of Use</Link> -{" "}
            <Link href="#">Privacy Policy</Link> -{" "}
            <Link href="#">Link to Us</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
