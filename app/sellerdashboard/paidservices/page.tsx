'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { 
  Check, 
  X, 
  Star, 
  Phone, 
  Activity, 
  Eye, 
  MessageSquare, 
  LayoutGrid, 
  Headphones, 
  PhoneCall, 
  Play 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type PlanFeature = {
  text: string;
  included: boolean;
};

type PricingPlan = {
  id: string;
  name: string;
  displayName?: string;
  badge?: string;
  price: string;
  priceSubtext: string;
  buyLeads: string;
  perLeadPrice: string;
  features: PlanFeature[];
  isPopular?: boolean;
};

// --- Data ---
const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Listing',
    badge: 'BASIC',
    price: '',
    priceSubtext: '',
    buyLeads: '0',
    perLeadPrice: '₹399',
    features: [
      { text: 'Lower Visibility', included: false },
      { text: 'Lead Manager (Desktop Only)', included: false },
      { text: 'TrustSEAL Badge', included: false },
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    badge: 'BEST VALUE',
    price: '₹2,667',
    priceSubtext: 'per month (Billed Annually)',
    buyLeads: '74*',
    perLeadPrice: '₹36',
    features: [
      { text: 'Higher Visibility', included: true },
      { text: 'Lead Manager (Desktop + App)', included: true },
      { text: 'TrustSEAL Badge', included: false },
    ],
    isPopular: true,
  },
  {
    id: 'trustseal',
    name: 'TrustSeal Pro 1 Year',
    price: '₹4,167',
    priceSubtext: 'per month (Billed Annually)',
    buyLeads: '91*',
    perLeadPrice: '₹46',
    features: [
      { text: 'Higher Visibility', included: true },
      { text: 'Lead Manager (Desktop + App)', included: true },
      { text: 'TrustSEAL Badge', included: true },
    ],
  },
];

const FEATURES = [
  {
    icon: Activity,
    title: 'BuyLeads at Lower Cost',
    description: 'Connect with verified buyers who are looking for the right suppliers for their requirements.',
  },
  {
    icon: Eye,
    title: 'Increased Credibility',
    description: 'Better visibility and credibility through the TrustSEAL badge.',
  },
  {
    icon: MessageSquare,
    title: 'More Business Enquiries',
    description: 'Get direct enquiries from buyers actively looking for your products or services.',
  },
  {
    icon: LayoutGrid,
    title: 'Lead Manager CRM',
    description: 'Organize, track, and manage all your leads in one place. Available on desktop and mobile app.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Manager',
    description: 'Get 24x7 priority support from a specialist to maximize your IndiaMART success.',
  },
  {
    icon: PhoneCall,
    title: 'Preferred Number Service',
    description: 'A cloud telephony service that connects up to 5 phone numbers, so no buyer call is missed.',
  },
];

const SUCCESS_STORIES = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    name: 'Danish Warsi',
    company: 'Dua Metal',
    location: 'Uttar Pradesh',
    testimonial: 'Partnering with IndiaMART boosted our growth by 30%, helping us reach new markets. Quality, innovation, and customer trust drive our success.',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    name: 'Madhavi Kadam',
    company: 'Robust Enterprises',
    location: 'Pune',
    testimonial: 'I have been associated with IndiaMART for 5 years now. And today, 95% of my business happens through IndiaMART only.',
  },
];

// --- Components ---

const PricingCard = ({
  plan,
  isSelected,
  onSelect,
}: {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'relative flex flex-col h-full rounded-2xl bg-white p-6 transition-all duration-200 cursor-pointer border-2',
        isSelected
          ? 'border-blue-600 shadow-xl z-10 scale-[1.02]'
          : 'border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-200'
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          className={cn(
            'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm',
            plan.isPopular
              ? 'bg-blue-600 text-white'
              : 'bg-gray-400 text-white'
          )}
        >
          {plan.badge}
        </div>
      )}

      {/* Selection Indicator - Top Left */}
      <div className="absolute top-4 left-4">
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>

      {/* Header */}
      <div className="mt-8 text-center">
        {plan.id === 'free' ? (
          <h3 className="text-2xl font-bold text-gray-900 mt-4">Free Listing</h3>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <div className="mt-2 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-xs text-gray-500 mt-1">{plan.priceSubtext}</span>
            </div>
          </>
        )}
      </div>

      {/* BuyLeads Info Box */}
      <div className={cn(
        "mt-6 rounded-lg p-4 flex justify-between items-center text-sm",
        plan.id === 'free' ? "bg-white border border-gray-200" : "bg-blue-50"
      )}>
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">BuyLeads</span>
          <span className="font-bold text-gray-900">{plan.buyLeads} <span className="text-xs font-normal text-gray-500">in a month</span></span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-500 text-xs">Per BuyLead Price</span>
          <span className="font-bold text-gray-900">{plan.perLeadPrice}</span>
        </div>
      </div>

      {/* Features List - flex-1 pushes content to equalize height */}
      <ul className="mt-6 space-y-4 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={cn(
              "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
              feature.included ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
            )}>
              {feature.included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            </div>
            <span className={cn(
              "text-sm",
              feature.included ? "text-gray-700" : "text-gray-400"
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: typeof FEATURES[0]) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const SuccessStoryCard = ({ thumbnail, name, company, location, testimonial }: typeof SUCCESS_STORIES[0]) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
    {/* Video Thumbnail */}
    <div className="relative group cursor-pointer bg-gray-900">
      <img 
        src={thumbnail} 
        alt={name}
        className="w-full h-64 object-cover opacity-90 group-hover:opacity-75 transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-7 h-7 text-white ml-1" fill="white" />
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-blue-600 text-sm mb-4">{company}, {location}</p>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">"{testimonial}"</p>
    </div>
  </div>
);

const StickyFooter = ({ selectedPlan }: { selectedPlan: PricingPlan }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-teal-100 border-t border-teal-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 ml-[8em]  rounded-lg  mx-auto">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Promo */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="font-medium">Choose One <span className="font-bold text-gray-900">FREE</span> 6-Month Subscription From</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-green-700 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> Live Keeping
            </span>
            <span className="text-gray-400">OR</span>
            <span className="flex items-center gap-1 text-red-600 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full" /> Vyapar
            </span>
          </div>
        </div>

        {/* Right: Action */}
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-gray-900">
              {selectedPlan.name} {selectedPlan.price && `${selectedPlan.price} / month`}
            </div>
            {selectedPlan.price && (
              <div className="text-xs text-gray-500">
                you pay ₹ 32,000 + GST
              </div>
            )}
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-lg font-semibold shadow-md transition-colors whitespace-nowrap">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function PricingPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('yearly');
  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans text-slate-900">
      <Head>
        <title>Pricing Plans | Grow Your Business</title>
        <meta name="description" content="Choose the best plan to grow your business faster" />
      </Head>

      {/* Injecting custom animation styles for the "Blink" effect */}
      <style jsx global>{`
        @keyframes blink-animation {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7); }
          50% { opacity: 0.8; transform: scale(1.05); box-shadow: 0 0 0 10px rgba(20, 184, 166, 0); }
        }
        .animate-blink-ring {
          animation: blink-animation 2s infinite ease-in-out;
        }
      `}</style>

      {/* Top Stats Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-2 text-white text-sm font-medium">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>2 Crores+ Buyers | 2 Lakhs+ Paid Suppliers | 3.5 Crores+ Enquiries</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grow your business faster - Pick your plan today
          </h1>
        </div>

        {/* Pricing Grid - Added items-stretch to ensure row alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-4 text-xs text-gray-500 max-w-6xl mx-auto text-right pr-4">
          * Includes 1 Daily Bonus BuyLead
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Features included in our paid plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Success Stories from Our Sellers</h2>
          <p className="text-gray-500 text-center mb-8">See how IndiaMART has transformed businesses across India</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {SUCCESS_STORIES.map((story) => (
              <SuccessStoryCard key={story.id} {...story} />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Help Button - Added Blink Animation */}
      <div className="fixed right-6 bottom-24 z-40 flex flex-col items-center gap-1">
        <button className="w-14 h-14 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 animate-blink-ring">
          <Phone className="w-7 h-7" />
        </button>
        <span className="text-xs font-bold text-gray-700">Need Help?</span>
        <span className="text-xs text-gray-500">Request a Call Back</span>
      </div>

      {/* Sticky Footer */}
      <StickyFooter selectedPlan={selectedPlan} />
    </div>
  );
}