'use client';

import Image from 'next/image';
import Boat from '../../../public/images/boat.png';
import { useState } from 'react';

// SVG Flag Components for better desktop visibility
const FlagIcon = ({ countryCode }: { countryCode: string }) => {
 const flags: Record<string, React.ReactNode> = {
    IN: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <g transform="matrix(3.2 0 0 3.2 320 240)">
          <circle r="20" fill="#008" />
          <circle r="17.5" fill="#fff" />
          <circle r="3.5" fill="#008" />
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="a" fill="#008">
                  <circle r=".9" transform="rotate(7.5 -8.8 133.5)" />
                  <path d="M0 17.5L.6 7 0 2l-.6 5z" />
                </g>
                <use href="#a" transform="rotate(15)" />
              </g>
              <use href="#b" transform="rotate(30)" />
            </g>
            <use href="#c" transform="rotate(60)" />
          </g>
          <use href="#d" transform="rotate(120)" />
          <use href="#d" transform="rotate(-120)" />
        </g>
      </svg>
    ),
    US: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#bd3d44" d="M0 0h640v480H0" />
        <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
        <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
        <g fill="#fff">
          <path d="M0 0L16.5 1 0 3l19 2-21 2 23 2-24 2 25 2-26 2 27 2-28 2 29 2-30 2 31 2-32 2 33 2-34 2 35 2-36 2 37 2-38 2 39 2-40 2 41 2-42 2 43 2-44 2 45 2-46 2 47 2-48 2 49 2-50 2 51 2-52 2 53 2-54 2 55 2-56 2 57 2-58 2 59 2-60 2 61 2-62 2 63 2-64 2 65 2-66 2 67 2-68 2 69 2-70 2 71 2-72 2 73 2-74 2 75 2-76 2 77 2-78 2 79 2-80 2 81 2-82 2 83 2-84 2 85 2-86 2 87 2-88 2 89 2-90 2 91 2-92 2 93 2-94 2 95 2-96 2 97 2-98 2 99 2-100 2" />
        </g>
      </svg>
    ),
    AE: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#00732f" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#000" d="M0 320h640v160H0z" />
        <path fill="red" d="M0 0h220v480H0z" />
      </svg>
    ),
    GB: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
        <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
        <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
      </svg>
    ),
    AU: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#00008B" d="M0 0h640v480H0z" />
        <g stroke="#fff" strokeWidth="1.6">
          <path fill="#fff" d="M0 0l320 240H0zM0 480l320-240H0zM640 0L320 240h320zM640 480L320 240h320zM320 0v480M0 240h640" />
        </g>
        <g fill="#fff">
          <path d="M0 0l40 24H24l40 24-16 8 24 16-8 8 16 24-8 16 24 40-16 8 16 24-8 8 16 24-16 8 24 16-8 16 24 40-16-8 16-24-8-8 16-24-16-8 24-16-8-16 24-40-16-8 16-24-8-8 16-24-16-8 24-16-8-16-24-40 16 8-16 24 8 8-16 24 16 8-24 16 8 16-24 40 16 8-16 24 8 8-16 24 16 8-24 16 8 16 24 40z" />
        </g>
        <path fill="#fff" d="M0 0h160v120H0z" />
        <path fill="#C8102E" d="M0 0l80 60H0v60h80l-80 60h40l80-60h80v60h-80l80 60h-40l-80-60H0v-60h80L0 60h40l80 60h80V60h-80L120 0H80l-80 60V0z" />
        <path fill="#C8102E" d="M70 0v120h20V0H70zM0 50h160v20H0V50z" />
        <circle fill="#fff" cx="480" cy="120" r="40" />
        <path fill="#C8102E" d="M480 80l12 36h38l-30 22 12 36-30-22-30 22 12-36-30-22h38z" />
      </svg>
    ),
    CA: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#f00" d="M0 0h213.3v480H0zM426.7 0H640v480H426.7z" />
        <path fill="#f00" d="M272 69.5l-17.3 65.2 17.3 65.2-17.3-65.2 17.3-65.2zm-17.3 65.2l-65.2 17.3 65.2-17.3 65.2 17.3-65.2-17.3zm0 0l-46.1 46.1 46.1-46.1 46.1 46.1-46.1-46.1zm0 0l-46.1-46.1 46.1 46.1 46.1-46.1-46.1 46.1zM320 40l-12 45.2 12 45.2-12-45.2 12-45.2zm-12 45.2l-45.2 12 45.2-12 45.2 12-45.2-12zm0 0l-32 32 32-32 32 32-32-32zm0 0l-32-32 32 32 32-32-32 32z" />
      </svg>
    ),
    DE: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#ffce00" d="M0 320h640v160H0z" />
        <path d="M0 0h640v160H0z" />
        <path fill="#d00" d="M0 160h640v160H0z" />
      </svg>
    ),
    FR: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#002395" d="M0 0h213.3v480H0z" />
        <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
      </svg>
    ),
    JP: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <circle fill="#bc002d" cx="320" cy="240" r="120" />
      </svg>
    ),
    CN: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#de2910" d="M0 0h640v480H0z" />
        <g fill="#ffde00">
          <path d="M127.8 49l14.2 43.5h46l-37.2 27 14.2 43.5-37.2-27-37.2 27 14.2-43.5-37.2-27h46z" />
          <path d="M260 0l4.4 13.5h14.2l-11.5 8.4 4.4 13.5-11.5-8.4-11.5 8.4 4.4-13.5-11.5-8.4h14.2z" />
          <path d="M298.2 34.8l4.4 13.5h14.2l-11.5 8.4 4.4 13.5-11.5-8.4-11.5 8.4 4.4-13.5-11.5-8.4h14.2z" />
          <path d="M298.2 83.5l4.4 13.5h14.2l-11.5 8.4 4.4 13.5-11.5-8.4-11.5 8.4 4.4-13.5-11.5-8.4h14.2z" />
          <path d="M260 117.8l4.4 13.5h14.2l-11.5 8.4 4.4 13.5-11.5-8.4-11.5 8.4 4.4-13.5-11.5-8.4h14.2z" />
        </g>
      </svg>
    ),
    SG: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#fff" d="M0 0h640v240H0z" />
        <path fill="#ed2939" d="M0 240h640v240H0z" />
        <g fill="#fff">
          <circle cx="160" cy="120" r="36" />
          <g transform="translate(160 120) scale(1.2)">
            <path d="M0-30L6.5-9.3h21.4l-17.3 12.6 6.6 20.3L0 10.9l-17.3 12.6 6.6-20.3-17.3-12.6h21.4z" />
          </g>
        </g>
      </svg>
    ),
    NZ: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <g stroke="#fff" strokeWidth="1.6">
          <path fill="#fff" d="M0 0l320 240H0zM0 480l320-240H0zM640 0L320 240h320zM640 480L320 240h320zM320 0v480M0 240h640" />
        </g>
        <g fill="#fff">
          <path d="M0 0l40 24H24l40 24-16 8 24 16-8 8 16 24-8 16 24 40-16 8 16 24-8 8 16 24-16 8 24 16-8 16 24 40-16-8 16-24-8-8 16-24-16-8 24-16-8-16 24-40-16-8 16-24-8-8 16-24-16-8 24-16-8-16-24-40 16 8-16 24 8 8-16 24 16 8-24 16 8 16-24 40 16 8-16 24 8 8-16 24 16 8-24 16 8 16 24 40z" />
        </g>
        <path fill="#fff" d="M0 0h160v120H0z" />
        <path fill="#C8102E" d="M0 0l80 60H0v60h80l-80 60h40l80-60h80v60h-80l80 60h-40l-80-60H0v-60h80L0 60h40l80 60h80V60h-80L120 0H80l-80 60V0z" />
        <path fill="#C8102E" d="M70 0v120h20V0H70zM0 50h160v20H0V50z" />
        <path fill="#012169" d="M280 120l10 30h32l-26 18 10 30-26-18-26 18 10-30-26-18h32zM480 200l10 30h32l-26 18 10 30-26-18-26 18 10-30-26-18h32zM400 320l10 30h32l-26 18 10 30-26-18-26 18 10-30-26-18h32z" />
      </svg>
    ),
  };

  return flags[countryCode] || <span className="text-lg">🏳️</span>;
};

const countries = [
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'US', name: 'United States Of America', dialCode: '+1' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
];

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedCountries = showAll ? countries : countries.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">

      {/* TOP SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* IMAGE */}
        <div className="flex justify-center lg:justify-start">
          <Image
            src={Boat}
            alt="Seller Top Image"
            className="w-full max-w-xs h-auto"
            priority
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="space-y-6 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            <span className="font-bold">Sell for free</span> on India's largest online B2B marketplace
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            <Stat value="21.9 crore+" label="Buyers" icon="chart" />
            <Stat value="86 lakh+" label="Suppliers" icon="rupee" />
            <Stat value="12.4 crore+" label="Products & Services" icon="box" />
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-gray-100 rounded-lg p-5 relative">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Free Registration/Sign In
          </h2>

          <div className="border border-teal-500 rounded flex items-center bg-white overflow-hidden relative z-10">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <FlagIcon countryCode={selectedCountry.code} />
              <span className="text-xs text-gray-500">▼</span>
            </button>
            <span className="px-3 text-gray-700 text-sm font-medium">{selectedCountry.dialCode}</span>
            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              className="w-full outline-none text-gray-700 text-sm py-2 pr-3"
              maxLength={10}
            />
          </div>

          {/* Country Dropdown */}
          {isOpen && (
            <div className="absolute left-5 right-5 top-[88px] bg-white border border-gray-200 rounded shadow-lg z-20 max-h-60 overflow-y-auto">
              {displayedCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm"
                >
                  <FlagIcon countryCode={country.code} />
                  <span className="text-gray-700">{country.name}</span>
                  <span className="text-gray-500 ml-auto">{country.dialCode}</span>
                </button>
              ))}
              {!showAll && countries.length > 5 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="w-full text-right px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border-t border-gray-100"
                >
                  Show More
                </button>
              )}
            </div>
          )}

          <button className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded text-sm font-semibold flex items-center justify-center gap-2">
            Start Selling
            <span>→</span>
          </button>
        </div>
      </section>

      {/* SELL ON PLATFORM */}
      <section className="max-w-7xl mx-auto px-4 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT INFO */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Sell on IndiaMART</h2>
          <div className="space-y-5">
            <Info title="Grow your Business" desc="Sell to buyers anytime, anywhere" icon="chart" />
            <Info title="Zero Cost" desc="No commission or transaction fee" icon="rupee" />
            <Info
              title="Manage your Business Better"
              desc="Lead Management System & other features"
              icon="hands"
            />
          </div>
        </div>

        {/* STEPS */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Get a free listing in 3 simple steps:
          </h2>

          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            {/* Background diagonal stripes */}
            <div className="absolute inset-0 flex">
              <div className="w-1/3 bg-gray-100"></div>
              <div className="w-1/3 bg-white transform -skew-x-12 origin-top-left translate-x-6"></div>
              <div className="w-1/3 bg-gray-50 transform -skew-x-12 origin-top-left translate-x-6"></div>
            </div>

            <div className="relative p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Step
                step="1"
                title="Create Account"
                desc="Add your name and phone number to get started"
                icon="edit"
              />
              <Step
                step="2"
                title="Add Business"
                desc="Add name, address & e-mail of your company, store/ business."
                icon="location"
              />
              <Step
                step="3"
                title="Add Products/ Services"
                desc="Minimum 3 products/ services needed for your free listing page."
                icon="store"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Stat({ value, label, icon }: { value: string; label: string; icon: string }) {
  const iconSvg = {
    chart: (
      <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
        <path d="M17 4v6h-6" />
      </svg>
    ),
    rupee: (
      <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 7h6M8 11h6M8 15h6M9 7l3 3-3 3" />
      </svg>
    ),
    box: (
      <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <path d="M12 12v10" />
      </svg>
    ),
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-1">{iconSvg[icon as keyof typeof iconSvg]}</div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

function Info({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  const iconSvg = {
    chart: (
      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
        <path d="M17 4v6h-6" />
      </svg>
    ),
    rupee: (
      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 7h6M8 11h6M8 15h6M9 7l3 3-3 3" />
      </svg>
    ),
    hands: (
      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2a3 3 0 0 0-3 3v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" />
        <path d="M12 11v6" />
        <path d="M9 14h6" />
      </svg>
    ),
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">{iconSvg[icon as keyof typeof iconSvg]}</div>
      <div>
        <h3 className="text-blue-600 font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function Step({
  step,
  title,
  desc,
  icon,
}: {
  step: string;
  title: string;
  desc: string;
  icon: string;
}) {
  const iconSvg = {
    edit: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    store: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  };

  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-blue-600 flex items-center justify-center bg-white relative">
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
          {step}
        </span>
        {iconSvg[icon as keyof typeof iconSvg]}
      </div>
      <h3 className="text-blue-600 font-semibold text-sm">{title}</h3>
      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}