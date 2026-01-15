'use client';

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND IMAGE - FULL VISIBLE */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/backgroundimage.jpg" // Your background image
          alt="Business Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Very light overlay for slight readability */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* CONTENT WITH MORE TRANSPARENT BACKGROUNDS */}
      <div className="relative">
        {/* TOP SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-2 bg-white/20 rounded-xl blur-lg"></div>
              <Image
                src="/seller.png"
                alt="Seller"
                width={350}
                height={450}
                className="object-contain relative rounded-lg w-full max-w-[350px] shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="lg:col-span-1 space-y-8 flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight drop-shadow-sm">
              Sell for free on India&apos;s largest online B2B marketplace
            </h1>

            {/* STATS */}
            <div className="flex justify-between lg:justify-around gap-4">
              <Stat value="21.9 crore+" label="Buyers" />
              <Stat value="86 lakh+" label="Suppliers" />
              <Stat value="12.4 crore+" label="Products & Services" />
            </div>
          </div>

          {/* LOGIN CARD - MORE TRANSPARENT */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Free Registration/Sign In</h2>

            <div className="border border-gray-300/50 rounded-lg bg-white/90 flex items-center px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all">
              <span className="text-sm mr-2">🇮🇳 +91</span>
              <input
                type="tel"
                placeholder="Enter 10 digit mobile number"
                className="w-full outline-none text-sm bg-transparent"
                maxLength={10}
                pattern="[0-9]{10}"
              />
            </div>

            <p className="text-xs text-orange-600 mt-1 font-medium">
              Please enter a valid 10 digit mobile number
            </p>

            <button className="w-full mt-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]">
              Login →
            </button>
          </div>
        </section>

        {/* SELL ON INDIAMART */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* LEFT INFO BOX */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 space-y-6 shadow-2xl border border-white/20">
            <Info
              title="Grow your Business"
              desc="Sell to buyers anytime, anywhere"
            />
            <Info
              title="Zero Cost"
              desc="No commission or transaction fee"
            />
            <Info
              title="Manage your Business Better"
              desc="Lead Management System & other features"
            />
          </div>

          {/* STEPS */}
          <div className="lg:col-span-2">
            <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-900 drop-shadow-sm">
              Get a free listing in 3 simple steps:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Step
                step="1"
                title="Create Account"
                desc="Add your name and phone number to get started"
              />
              <Step
                step="2"
                title="Add Business"
                desc="Add name, address & e-mail of your company, store/ business."
              />
              <Step
                step="3"
                title="Add Products/ Services"
                desc="Minimum 3 products/ services needed for your free listing page."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-700 font-medium mt-1">{label}</p>
    </div>
  );
}

function Info({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-blue-700 font-bold text-lg">{title}</h3>
      <p className="text-gray-800 font-medium">{desc}</p>
    </div>
  );
}

function Step({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-2xl border border-white/20 h-full flex flex-col items-center">
      <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
        {step}
      </div>
      <h3 className="text-blue-700 font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-800 font-medium text-sm flex-grow">{desc}</p>
    </div>
  );
}