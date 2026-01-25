'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* TOP SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* EMPTY LEFT */}
        <div />

        {/* CENTER CONTENT */}
        <div className="space-y-8 flex flex-col justify-center">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
            Sell for free on India’s largest online B2B marketplace
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            <Stat value="21.9 crore+" label="Buyers" />
            <Stat value="86 lakh+" label="Suppliers" />
            <Stat value="12.4 crore+" label="Products & Services" />
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Free Registration/Sign In
          </h2>

          <div className="border border-teal-500 rounded-md flex items-center px-3 py-2 bg-white">
            <span className="mr-2">🇮🇳 +91</span>
            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              className="w-full outline-none"
              maxLength={10}
            />
          </div>

          <p className="text-xs text-orange-500 mt-1">
            Please enter a valid 10 digit mobile number
          </p>

          <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-semibold">
            Login →
          </button>
        </div>
      </section>

      {/* SELL ON INDIAMART */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT INFO */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md space-y-6">
          <Info title="Grow your Business" desc="Sell to buyers anytime, anywhere" />
          <Info title="Zero Cost" desc="No commission or transaction fee" />
          <Info title="Manage your Business Better" desc="Lead Management System & other features" />
        </div>

        {/* STEPS WITH ANGLED BACKGROUND */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-lg bg-gray-100">

          {/* ANGLED SHAPES */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 h-full w-1/3 bg-white skew-x-[-12deg] origin-top" />
            <div className="absolute left-2/3 top-0 h-full w-1/3 bg-gray-50 skew-x-[-12deg] origin-top" />
          </div>

          {/* CONTENT */}
          <div className="relative p-8">
            <h2 className="text-xl font-semibold mb-8">
              Get a free listing in 3 simple steps:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function Info({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-blue-600 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
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
    <div className="text-center">
      <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center font-semibold">
        {step}
      </div>
      <h3 className="text-blue-600 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  );
}
