'use client';
import React, { useState } from 'react';

import { 
  Grid, 
  MessageSquare, 
  Shield, 
  User, 
  DollarSign, 
  Truck, 
  Ticket, 
  Edit3, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import SuggestionModal from '../../suggestion/sugesstion';

const Sidebar = () => {
    const [openSuggestion, setOpenSuggestion] = useState(false);

  return (
    <div className="w-80 bg-white min-h-screen p-4 flex flex-col font-sans">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
          R
        </div>
        <div className="text-xl font-semibold text-gray-900">Ritik</div>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1">
        {/* Dashboard - Active */}
<Link
  href="/dashboard/buyer"
  className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-indigo-50 text-indigo-600 cursor-pointer group"
>
  <Grid size={20} strokeWidth={2} />
  <span className="flex-1 text-[15px] font-medium">Dashboard</span>
  <ChevronRight size={18} className="text-gray-400" />
</Link>

        {/* Messages */}
<Link
  href="/component/messages"
  className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
>
  <MessageSquare size={20} strokeWidth={2} />
  <span className="flex-1 text-[15px]">Messages</span>
  <ChevronRight size={18} className="text-gray-400" />
</Link>


        {/* Know Your Seller - Highlighted */}
    <Link
  href="/dashboard/knowyourseller"
  className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-teal-50 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors group"
>
  <Shield size={20} strokeWidth={2} />

  <span className="flex-1 text-[15px] font-medium">
    Know Your Seller
  </span>

  <ChevronRight
    size={18}
    className="text-gray-400 group-hover:text-teal-600 transition-colors"
  />
</Link>


        {/* My Profile with badge */}
      <Link href="/dashboard/profile" className="block">
      <div className="flex items-start gap-3 px-4 pt-3.5 pb-7 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group relative">
        <div className="relative">
          <User size={20} strokeWidth={2} />
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 absolute -top-0.5 -right-0.5 border-2 border-white"></div>
        </div>

        <span className="flex-1 text-[15px]">My Profile</span>

        <ChevronRight size={18} className="text-gray-400 mt-0.5" />

        <div className="absolute left-12 bottom-2 text-xs font-medium text-orange-500">
           complete
        </div>
      </div>
    </Link>
        {/* Finance */}
        {/* <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group">
          <DollarSign size={20} strokeWidth={2} />
          <span className="flex-1 text-[15px]">Finance</span>
          <ChevronRight size={18} className="text-gray-400" />
        </div> */}

        {/* Ship With IM */}
        <Link href="/component/shipwitheim" className="block">
  <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group">
    <Truck size={20} strokeWidth={2} />
    <span className="flex-1 text-[15px]">Ship With IM</span>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
</Link>

        {/* My Tickets */}
       <Link href="/dashboard/mytickets" className="block">
  <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group">
    <Ticket size={20} strokeWidth={2} />
    <span className="flex-1 text-[15px]">My Tickets</span>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
</Link>

        {/* Any Suggestion */}
       <div
  onClick={() => setOpenSuggestion(true)}
  className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer group"
>
  <Edit3 size={20} strokeWidth={2} />
  <span className="flex-1 text-[15px]">Any Suggestion</span>
  <ChevronRight size={18} className="text-gray-400" />
</div>

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
      <SuggestionModal
  open={openSuggestion}
  onClose={() => setOpenSuggestion(false)}
/>

    </div>
  );
};

export default Sidebar;