"use client";

import { useState, useCallback } from "react";

type Channel = "email" | "sms" | "app" | "whatsapp";

interface NotificationRow {
  id: string;
  label: string;
  description: string;
  subNote?: string;
  channels: Partial<Record<Channel, boolean | null>>;
}

interface Section {
  id: string;
  title: string;
  rows: NotificationRow[];
}

interface Language {
  id: string;
  label: string;
  checked: boolean;
}

interface LinkedNumber {
  id: string;
  number: string;
  isPrimary: boolean;
  officeHours: boolean;
  nonOfficeHours: boolean;
}

interface ExcludedLocation {
  id: string;
  name: string;
}

interface ExcludedCategory {
  id: string;
  name: string;
}

const CHANNELS: { key: Channel; label: string; value?: string }[] = [
  { key: "email", label: "Email", value: "jainritik829@gmail.com" },
  { key: "sms", label: "SMS", value: "8518900153" },
  { key: "app", label: "APP" },
  { key: "whatsapp", label: "WhatsApp" },
];

const INITIAL_SECTIONS: Section[] = [
  {
    id: "enquiries",
    title: "Enquiries",
    rows: [
      { id: "business_enquiries", label: "Business Enquiries", description: "Sent to you by buyers.", channels: { email: true, sms: null, app: null, whatsapp: null } },
      { id: "replies_responses", label: "Replies to your responses", description: "Receive notification of replies sent by the buyer to your responses.", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "followup_reminders", label: "Follow-up Reminders", description: "Get notified 10 min before the upcoming reminders.", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "missed_pns_calls", label: "Missed PNS* Calls", description: "Receive details of the buyer whose call from was missed by you.", subNote: "*PNS - Preferred Number Service", channels: { email: false, sms: true, app: null, whatsapp: null } },
      { id: "answered_pns_calls", label: "Answered PNS* Calls", description: "Receive details of the buyer whose call from was answered by you. Also get the details of the phone number from which the call was answered.", channels: { email: false, sms: null, app: null, whatsapp: null } },
    ],
  },
  {
    id: "buyleads",
    title: "BuyLeads / Tenders",
    rows: [
      { id: "buyleads_day", label: "BuyLeads / Tenders", description: "Receive latest requirements posted by the buyers between 8 AM to 9 PM.", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "buylead_night", label: "BuyLead Night Notifications", description: "Receive latest buylead notifications between 9 PM – 12 AM (midnight)", channels: { email: null, sms: null, app: null, whatsapp: null } },
      { id: "buylead_post_purchase", label: "BuyLead Post Purchase", description: "Email with details and contact info of the buyer whose BuyLead the seller has consumed", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "ima_allocation_lapse", label: "IMA: Allocation and Lapse", description: "BuyLeads allocation and Lapse information under the IndiaMART Advantage Programme", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "tender_alerts", label: "Tender Alerts", description: "Recommended Tenders available for your products", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "tender_post_purchase", label: "Tender Post Purchase", description: "Email with details of Tenders that the seller has consumed/purchased on IndiaMART", channels: { email: false, sms: null, app: null, whatsapp: null } },
    ],
  },
  {
    id: "promotional",
    title: "Promotional Communication",
    rows: [
      { id: "indiamart_new_offerings", label: "IndiaMART's New Offerings", description: "To help you grow your business with newly launched products & services.", channels: { email: true, sms: true, app: null, whatsapp: null } },
      { id: "third_party_offers", label: "Third Party Promotional Offers", description: "Receive exclusive business offers only for IndiaMART's members.", channels: { email: false, sms: true, app: null, whatsapp: null } },
      { id: "business_surveys", label: "Business Surveys", description: "To participate in market research conducted by independent third parties to understand business/industry trends.", channels: { email: false, sms: null, app: null, whatsapp: null } },
    ],
  },
  {
    id: "service_messages",
    title: "Service Messages",
    rows: [
      { id: "indiamart_service_messages", label: "IndiaMART Service Messages", description: "Messages about your active services & business promotion on IndiaMART.", channels: { email: true, sms: true, app: null, whatsapp: null } },
    ],
  },
  {
    id: "buying_activities",
    title: "Your Buying Activities",
    rows: [
      { id: "buying_alerts", label: "Buying Alerts", description: "Reminders for products you may want to buy.", channels: { email: false, sms: null, app: null, whatsapp: null } },
      { id: "whatsapp_communication", label: "WhatsApp Communication", description: "Confirmation alerts for your buying requirements", channels: { email: null, sms: null, app: null, whatsapp: true } },
    ],
  },
  {
    id: "catalog",
    title: "Catalog",
    rows: [
      { id: "catalog_approval", label: "Catalog Approval Status", description: "Get notified when your catalog is approved or rejected.", channels: { email: false, sms: null, app: null, whatsapp: null } },
    ],
  },
  {
    id: "account",
    title: "Account",
    rows: [
      { id: "membership_expiry", label: "Membership Expiry", description: "Receive reminders before your membership expires.", channels: { email: false, sms: false, app: null, whatsapp: null } },
      { id: "payment_alerts", label: "Payment Alerts", description: "Get notified about payment confirmations and failures.", channels: { email: false, sms: false, app: null, whatsapp: null } },
    ],
  },
];

const TABS = ["Notification Settings", "Account Settings", "PNS Call Settings", "BuyLead Preferences"];

const INITIAL_LANGUAGES: Language[] = [
  { id: "english", label: "English", checked: true },
  { id: "hindi", label: "Hindi", checked: false },
  { id: "marathi", label: "Marathi", checked: false },
  { id: "gujarati", label: "Gujarati", checked: false },
  { id: "kannada", label: "Kannada", checked: false },
  { id: "telugu", label: "Telugu", checked: false },
  { id: "bengali", label: "Bengali", checked: false },
  { id: "tamil", label: "Tamil", checked: false },
  { id: "malayalam", label: "Malayalam", checked: false },
];

const FAQS = [
  { id: "what_is_pns", question: "What is PNS?", answer: "PNS (Preferred Number Service) is a unique virtual number provided by IndiaMART that forwards calls to your linked phone numbers." },
  { id: "benefits", question: "What benefits do I get?", answer: "You get a single professional contact number, call forwarding to multiple devices, and detailed call tracking." },
  { id: "sequence", question: "In what sequence my numbers would be connected?", answer: "Calls are forwarded simultaneously to all linked numbers that are enabled for the current time slot." },
  { id: "timings", question: "What are office & non-office hour timings?", answer: "Office Hours: 9 am - 7 pm, Mon-Sat. Non-office Hours: 7 pm - 9 am, Mon-Sat, and all day on Holidays." },
  { id: "numbers_count", question: "How many mobile & landline numbers can be managed via this service?", answer: "You can link up to 5 different phone numbers with your PNS number." },
  { id: "where_seen", question: "Where can the buyers see my Preferred Number?", answer: "Your PNS number is displayed on your IndiaMART profile, product listings, and all promotional materials." },
  { id: "set_hours", question: "How do I set the office hour phone numbers & non-office hour phone numbers?", answer: "Use the toggle switches in the table above to enable/disable numbers for office and non-office hours." },
  { id: "sms_issue", question: "I am not able to receive / send SMS on this number?", answer: "PNS numbers are designed for voice calls only. SMS functionality is not supported on these numbers." },
];

function buildSettingsSummary(sections: Section[]): string {
  const lines: string[] = ["NOTIFICATION SETTINGS SUMMARY", "=".repeat(40), ""];
  sections.forEach((section) => {
    lines.push(`[ ${section.title.toUpperCase()} ]`);
    section.rows.forEach((row) => {
      lines.push(`  ${row.label}`);
      const active: string[] = [];
      (["email", "sms", "app", "whatsapp"] as Channel[]).forEach((ch) => {
        if (row.channels[ch] === true) active.push(ch.toUpperCase());
      });
      lines.push(`    Channels: ${active.length ? active.join(", ") : "None enabled"}`);
    });
    lines.push("");
  });
  return lines.join("\n");
}

export default function NotificationSettings() {
  const [activeTab, setActiveTab] = useState(3); // Start with BuyLead Preferences active
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Account Settings state
  const [emailSyncEnabled, setEmailSyncEnabled] = useState(false);
  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(false);
  const [languages, setLanguages] = useState<Language[]>(INITIAL_LANGUAGES);
  const [languageSaved, setLanguageSaved] = useState(false);

  // PNS Call Settings state
  const [foreignCallsOnly, setForeignCallsOnly] = useState(false);
  const [linkedNumbers, setLinkedNumbers] = useState<LinkedNumber[]>([
    { id: "1", number: "+91-8518900153", isPrimary: true, officeHours: true, nonOfficeHours: true },
  ]);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [howPnsExpanded, setHowPnsExpanded] = useState(true);

  // BuyLead Preferences state
  const [locationExpanded, setLocationExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [notPreferredExpanded, setNotPreferredExpanded] = useState(true);
  const [excludedLocation, setExcludedLocation] = useState("");
  const [excludedLocations, setExcludedLocations] = useState<ExcludedLocation[]>([]);
  const [excludedCategory, setExcludedCategory] = useState("");
  const [excludedCategories, setExcludedCategories] = useState<ExcludedCategory[]>([]);

  const handleToggle = useCallback((rowId: string, channel: Channel, checked: boolean) => {
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        rows: s.rows.map((r) =>
          r.id === rowId ? { ...r, channels: { ...r.channels, [channel]: checked } } : r
        ),
      }))
    );
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSettingsSummary(sections)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleLanguageToggle = (id: string) => {
    setLanguages(prev => prev.map(lang => 
      lang.id === id ? { ...lang, checked: !lang.checked } : lang
    ));
  };

  const handleSaveLanguages = () => {
    setLanguageSaved(true);
    setTimeout(() => setLanguageSaved(false), 2500);
  };

  const handleDisableAccount = () => {
    if (confirm("Are you sure you want to disable your account? This will deactivate your profile and remove your product listing.")) {
      alert("Account disabled successfully.");
    }
  };

  const handleSignOutAllDevices = () => {
    if (confirm("Are you sure you want to sign out from all devices?")) {
      alert("Signed out from all devices successfully.");
    }
  };

  const toggleNumberHours = (id: string, type: 'officeHours' | 'nonOfficeHours') => {
    setLinkedNumbers(prev => prev.map(num => 
      num.id === id ? { ...num, [type]: !num[type] } : num
    ));
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleAddExcludedLocation = () => {
    if (excludedLocation.trim()) {
      setExcludedLocations(prev => [...prev, { id: Date.now().toString(), name: excludedLocation.trim() }]);
      setExcludedLocation("");
    }
  };

  const handleAddExcludedCategory = () => {
    if (excludedCategory.trim()) {
      setExcludedCategories(prev => [...prev, { id: Date.now().toString(), name: excludedCategory.trim() }]);
      setExcludedCategory("");
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; }
        .cb {
          appearance: none; -webkit-appearance: none;
          width: 17px; height: 17px;
          border: 2px solid #d1d5db; border-radius: 3px;
          cursor: pointer; position: relative;
          transition: border-color 0.15s, background 0.15s;
          background: white; flex-shrink: 0; display: block;
        }
        .cb:hover { border-color: #3b5bdb; }
        .cb:checked { background: #059669; border-color: #059669; }
        .cb:checked::after {
          content: '';
          position: absolute; left: 3px; top: 0px;
          width: 6px; height: 10px;
          border: 2px solid white; border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .tab-btn { padding: 14px 20px; font-size: 14px; font-weight: 500; cursor: pointer; background: none; border: none; border-bottom: 2px solid transparent; color: #6b7280; transition: color 0.15s, border-color 0.15s; white-space: nowrap; }
        .tab-btn:hover { color: #374151; }
        .tab-btn.active { border-bottom-color: #3b5bdb; color: #3b5bdb; }
        .row-tr { border-bottom: 1px solid #f3f4f6; }
        .row-tr:hover { background: #fafafa; }
        .action-btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid #d1d5db; background: white; color: #374151; display: flex; align-items: center; gap: 6px; }
        .action-btn:hover { background: #f9fafb; }
        .save-btn { padding: 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; background: #3b5bdb; border: none; color: white; }
        .save-btn:hover { background: #3451c7; }
        
        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
          border-radius: 24px;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .toggle-slider {
          background-color: #00a699;
        }
        input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }
        
        /* Section divider */
        .section-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 24px 0;
        }

        /* PNS Toggle Switch - Green */
        .pns-toggle-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
        }
        .pns-toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .pns-toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
          border-radius: 20px;
        }
        .pns-toggle-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .pns-toggle-slider {
          background-color: #00a699;
        }
        input:checked + .pns-toggle-slider:before {
          transform: translateX(16px);
        }

        /* FAQ Styles */
        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-question {
          padding: 12px 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #374151;
        }
        .faq-question:hover {
          color: #111827;
        }
        .faq-answer {
          padding: 0 0 12px 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* BuyLead Preferences Styles */
        .buylead-section {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .buylead-header {
          padding: 16px 20px;
          background: #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        .buylead-header-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }
        .buylead-header-subtitle {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }
        .buylead-content {
          padding: 20px;
          background: #f3f4f6;
        }
        .location-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .location-card-title {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
          text-align: left;
        }
        .location-card-text {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .view-buyleads-link {
          color: #00a699;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .view-buyleads-link:hover {
          text-decoration: underline;
        }
        .not-preferred-title {
          font-size: 13px;
          font-weight: 600;
          color: #3b5bdb;
          margin-bottom: 4px;
        }
        .not-preferred-subtitle {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        .add-btn {
          background: #00a699;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .add-btn:hover {
          background: #059669;
        }
        .no-locations {
          font-size: 13px;
          color: #9ca3af;
          text-align: center;
          padding: 20px;
        }
        .category-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .category-card-title {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
          text-align: left;
        }
        .category-card-text {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .preferred-label {
          font-size: 13px;
          font-weight: 600;
          color: #3b5bdb;
          margin-bottom: 4px;
        }
        .preferred-sublabel {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        .not-preferred-label {
          font-size: 13px;
          font-weight: 600;
          color: #3b5bdb;
          margin-bottom: 4px;
        }
        .not-preferred-sublabel {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 16px;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>

        {/* Tab Bar */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
            {TABS.map((tab, i) => (
              <button key={tab} className={`tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
          {activeTab === 0 ? (
            // Notification Settings Tab
            <div style={{ background: "white", borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>

              {/* Toast messages */}
              {saved && (
                <div style={{ background: "#ecfdf5", borderBottom: "1px solid #a7f3d0", padding: "10px 20px", fontSize: 13, color: "#065f46", fontWeight: 500 }}>
                  ✓ Settings saved successfully!
                </div>
              )}
              {copied && (
                <div style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "10px 20px", fontSize: 13, color: "#1d4ed8", fontWeight: 500 }}>
                  ✓ Settings copied to clipboard!
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "16px 16px 16px 20px", textAlign: "left", borderBottom: "1px solid #e5e7eb", width: "40%", verticalAlign: "bottom" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Notification Settings</div>
                        <div style={{ fontSize: 12, fontWeight: 400, color: "#6b7280" }}>Manage Your Settings for Important Alerts</div>
                      </th>
                      {CHANNELS.map((ch) => (
                        <th key={ch.key} style={{ padding: "16px 12px", textAlign: "center", borderBottom: "1px solid #e5e7eb", minWidth: 110, verticalAlign: "bottom" }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{ch.label}</div>
                          {ch.value && (
                            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400, marginTop: 3, borderTop: "1px solid #e5e7eb", paddingTop: 4 }}>
                              {ch.value}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section) => (
                      <>
                        <tr key={section.id + "_hdr"}>
                          <td colSpan={5} style={{ background: "#f3f4f6", padding: "9px 20px", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>
                              {section.title}
                            </span>
                          </td>
                        </tr>

                        {section.rows.map((row) => (
                          <tr key={row.id} className="row-tr">
                            <td style={{ padding: "14px 16px 14px 20px", verticalAlign: "top", borderBottom: "1px solid #f3f4f6" }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#1f2937", lineHeight: 1.4 }}>{row.label}</div>
                              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3, lineHeight: 1.5 }}>{row.description}</div>
                              {row.subNote && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, fontStyle: "italic" }}>{row.subNote}</div>}
                            </td>
                            {CHANNELS.map((ch) => (
                              <td key={ch.key} style={{ textAlign: "center", verticalAlign: "middle", padding: "14px 12px", borderBottom: "1px solid #f3f4f6" }}>
                                {row.channels[ch.key] === null || row.channels[ch.key] === undefined ? (
                                  <span style={{ color: "#d1d5db", fontSize: 18 }}>—</span>
                                ) : (
                                  <input
                                    type="checkbox"
                                    className="cb"
                                    checked={row.channels[ch.key] as boolean}
                                    onChange={(e) => handleToggle(row.id, ch.key, e.target.checked)}
                                    style={{ margin: "0 auto" }}
                                  />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, padding: "14px 20px", borderTop: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <button className="action-btn" onClick={() => setSections(INITIAL_SECTIONS)}>
                  Reset to Default
                </button>
                <button className="action-btn" onClick={handleCopy} style={{ color: copied ? "#1d4ed8" : "#374151" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  {copied ? "Copied!" : "Copy Settings"}
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Save Settings
                </button>
              </div>
            </div>
          ) : activeTab === 1 ? (
            // Account Settings Tab
            <div style={{ background: "white", borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "24px 32px" }}>
              
              {/* Toast message */}
              {languageSaved && (
                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#065f46", fontWeight: 500, marginBottom: 20 }}>
                  ✓ Languages saved successfully!
                </div>
              )}

              {/* Sync Email Section */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>
                    Sync your E-mail with IndiaMART Lead Manager
                  </span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emailSyncEnabled}
                      onChange={(e) => setEmailSyncEnabled(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 4 }}>
                  Sync all your email replies and email read/unread status to IndiaMART buyers in Lead Manager and have a complete view of your communication in one place.
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>
                  Note: Please wait for a minimum of 24 hours for changes to reflect.
                </p>
              </div>

              <hr className="section-divider" />

              {/* Disable Account Section */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>
                  Disable Account
                </h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 12 }}>
                  Deactivate your profile and remove your product listing and catalog from IndiaMART. By disabling your account, you will stop receiving business enquiries from IndiaMART.
                </p>
                <button
                  onClick={handleDisableAccount}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#00a699",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Disable
                </button>
              </div>

              <hr className="section-divider" />

              {/* Additional Language Section */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1f2937", marginBottom: 16 }}>
                  Additional Language for Communication
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px 24px", marginBottom: 16 }}>
                  {languages.map((lang) => (
                    <label key={lang.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        className="cb"
                        checked={lang.checked}
                        onChange={() => handleLanguageToggle(lang.id)}
                      />
                      <span style={{ fontSize: 13, color: "#374151" }}>{lang.label}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSaveLanguages}
                  style={{
                    padding: "8px 24px",
                    backgroundColor: "#9ca3af",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>

              <hr className="section-divider" />

              {/* Secure Account Section */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>
                  Secure your Account
                </h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 12 }}>
                  This option will allow you to logout your IndiaMART account from all the devices where it is logged in
                </p>
                <button
                  onClick={handleSignOutAllDevices}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#00a699",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Sign Out from all devices
                </button>
              </div>

              <hr className="section-divider" />

              {/* Allow Password Login Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>
                    Allow login through Password
                  </span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={passwordLoginEnabled}
                      onChange={(e) => setPasswordLoginEnabled(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
                  This option will allow to use your password in order to login into your IndiaMART account.
                </p>
              </div>

            </div>
          ) : activeTab === 2 ? (
            // PNS Call Settings Tab
            <div style={{ display: "flex", gap: 24 }}>
              {/* Main Content */}
              <div style={{ flex: 1, background: "white", borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "24px 32px" }}>
                
                {/* PNS Number Display */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>Your PNS No. (Preferred Number) is: </span>
                  <span style={{ fontSize: 16, color: "#111827", fontWeight: 700 }}>08045734240,7092</span>
                </div>

                {/* Foreign Calls Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 14, color: "#374151" }}>
                    Would you like to receive calls only from foreign countries?
                  </span>
                  <label className="pns-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={foreignCallsOnly}
                      onChange={(e) => setForeignCallsOnly(e.target.checked)}
                    />
                    <span className="pns-toggle-slider"></span>
                  </label>
                  <span style={{ fontSize: 12, color: foreignCallsOnly ? "#00a699" : "#9ca3af", fontWeight: 600 }}>
                    {foreignCallsOnly ? "YES" : "NO"}
                  </span>
                </div>

                {/* Link Numbers Info */}
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 14, color: "#111827", fontWeight: 600 }}>
                    You can link up to 5 different phone numbers
                  </span>
                  <span style={{ fontSize: 14, color: "#374151" }}> with your PNS No. to avoid missing a call enquiry:</span>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: "#9ca3af", color: "white", fontSize: 11, marginLeft: 6, cursor: "pointer" }}>?</span>
                </div>

                {/* Linked Numbers Table */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", paddingBottom: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#111827" }}>
                      1/1 Numbers Linked
                    </div>
                    <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#6b7280" }}>
                      <div style={{ fontWeight: 600, color: "#111827" }}>Office Hours</div>
                      <div style={{ fontSize: 11 }}>(9 am - 7 pm, Mon-Sat)</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#6b7280" }}>
                      <div style={{ fontWeight: 600, color: "#111827" }}>Non-office Hours</div>
                      <div style={{ fontSize: 11 }}>(7 pm - 9 am, Mon-Sat, Holidays...)</div>
                    </div>
                  </div>

                  {linkedNumbers.map((num) => (
                    <div key={num.id} style={{ display: "flex", alignItems: "center", background: "#f0fdf4", padding: "12px 16px", borderRadius: 4, marginBottom: 12 }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                        <input 
                          type="checkbox" 
                          className="cb" 
                          checked={true}
                          readOnly
                        />
                        <span style={{ fontSize: 14, color: "#1f2937", fontWeight: 500 }}>
                          {num.number}{num.isPrimary && <span style={{ color: "#6b7280" }}>(Primary)</span>}
                        </span>
                      </div>
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <label className="pns-toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={num.officeHours}
                            onChange={() => toggleNumberHours(num.id, 'officeHours')}
                          />
                          <span className="pns-toggle-slider"></span>
                        </label>
                      </div>
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <label className="pns-toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={num.nonOfficeHours}
                            onChange={() => toggleNumberHours(num.id, 'nonOfficeHours')}
                          />
                          <span className="pns-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  ))}

                  <button style={{ 
                    background: "none", 
                    border: "none", 
                    color: "#3b5bdb", 
                    fontSize: 13, 
                    fontWeight: 500, 
                    cursor: "pointer",
                    padding: 0
                  }}>
                    +Add More Numbers
                  </button>
                </div>

                {/* FAQ Section */}
                <div style={{ marginTop: 32 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Frequently Asked Questions
                  </h3>
                  <div>
                    {FAQS.map((faq) => (
                      <div key={faq.id} className="faq-item">
                        <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                          <span>{faq.question}</span>
                          <span style={{ 
                            transform: expandedFaq === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            fontSize: 12
                          }}>▼</span>
                        </div>
                        {expandedFaq === faq.id && (
                          <div className="faq-answer">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Sidebar - How PNS Works */}
              <div style={{ width: 320, background: "white", borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: 20 }}>
                <div 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: howPnsExpanded ? 16 : 0
                  }}
                  onClick={() => setHowPnsExpanded(!howPnsExpanded)}
                >
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>How PNS Works</h3>
                  <span style={{ 
                    transform: howPnsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: 12,
                    color: "#9ca3af"
                  }}>▲</span>
                </div>
                
                {howPnsExpanded && (
                  <>
                    {/* Diagram */}
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Buyer dials your PNS Number</div>
                      <div style={{ 
                        background: "#f3f4f6", 
                        padding: "12px 16px", 
                        borderRadius: 20, 
                        display: "inline-block",
                        marginBottom: 12,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#374151"
                      }}>
                        08045734240,7092
                      </div>
                      
                      {/* Arrow down */}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                          <path d="M12 0V30M12 30L5 23M12 30L19 23" stroke="#d1d5db" strokeWidth="2"/>
                          <circle cx="12" cy="35" r="3" fill="#d1d5db"/>
                        </svg>
                      </div>

                      {/* Phones */}
                      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
                        <div style={{ width: 24, height: 36, border: "2px solid #9ca3af", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 12, height: 2, background: "#9ca3af", borderRadius: 1 }}></div>
                        </div>
                        <div style={{ width: 28, height: 32, border: "2px solid #9ca3af", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 16, height: 8, border: "1px solid #9ca3af", borderRadius: 2 }}></div>
                        </div>
                        <div style={{ width: 24, height: 36, border: "2px solid #9ca3af", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 12, height: 2, background: "#9ca3af", borderRadius: 1 }}></div>
                        </div>
                      </div>

                      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>
                        Call is forwarded to all of your registered numbers linked to PNS
                      </div>
                    </div>

                    {/* Info Box */}
                    <div style={{ background: "#f9fafb", padding: 16, borderRadius: 6 }}>
                      <div style={{ fontSize: 13, color: "#374151", marginBottom: 12 }}>
                        You will receive calls from <strong style={{ color: "#111827" }}>080-4299-4299</strong>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: "#059669", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 12, color: "#6b7280" }}>Save <strong style={{ color: "#374151" }}>080-4299-4299</strong> as <strong style={{ color: "#374151" }}>IndiaMART Buyer</strong></span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "#059669", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 12, color: "#6b7280" }}>Do not miss any calls from <strong style={{ color: "#374151" }}>080-4299-4299</strong></span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Help Videos Button - Fixed on right side */}
              <button style={{
                position: "fixed",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#00a699",
                color: "white",
                border: "none",
                borderRadius: "4px 0 0 4px",
                padding: "12px 8px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: 1,
                zIndex: 100
              }}>
                Help Videos
              </button>
            </div>
          ) : (
            // BuyLead Preferences Tab
            <div style={{ background: "white", borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "24px" }}>
              
              {/* Page Title */}
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20 }}>
                Set Your BuyLead Preferences
              </h1>

              {/* Category Preferences Section */}
              <div className="buylead-section">
                <div className="buylead-header" onClick={() => setCategoryExpanded(!categoryExpanded)}>
                  <div className="buylead-header-title">Category Preferences</div>
                  <span style={{ 
                    transform: categoryExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: 14,
                    color: "#6b7280"
                  }}>▲</span>
                </div>

                {categoryExpanded && (
                  <div className="buylead-content">
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                      
                      {/* Left Side - Preferred Categories (2 columns) */}
                      <div>
                        <div className="preferred-label">Preferred Categories</div>
                        <div className="preferred-sublabel">You prefer BuyLeads from these categories</div>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                          {/* Based on your products */}
                          <div className="category-card">
                            <div className="category-card-title">Based on your products</div>
                            <div className="category-card-text">
                              Consume buyleads regularly to update your preferences.
                            </div>
                            <a href="#" className="view-buyleads-link">
                              View BuyLeads ↗
                            </a>
                          </div>

                          {/* Based on your BuyLead consumption */}
                          <div className="category-card">
                            <div className="category-card-title">Based on your BuyLead consumption</div>
                            <div className="category-card-text">
                              Consume buyleads regularly to update your preferences.
                            </div>
                            <a href="#" className="view-buyleads-link">
                              View BuyLeads ↗
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Not Preferred Categories (1 column) */}
                      <div>
                        <div className="not-preferred-label">Not Preferred Categories</div>
                        <div className="not-preferred-sublabel">You do not prefer BuyLeads from these categories</div>
                        
                        <div className="category-card" style={{ marginTop: 16, minHeight: "auto" }}>
                          {/* Add Category Input */}
                          <div style={{ display: "flex", gap: 0, marginBottom: excludedCategories.length > 0 ? 16 : 0 }}>
                            <input
                              type="text"
                              placeholder="Search category to exclude BuyLeads"
                              value={excludedCategory}
                              onChange={(e) => setExcludedCategory(e.target.value)}
                              style={{
                                flex: 1,
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "4px 0 0 4px",
                                fontSize: 13,
                                outline: "none"
                              }}
                            />
                            <button 
                              className="add-btn"
                              onClick={handleAddExcludedCategory}
                              style={{ borderRadius: "0 4px 4px 0" }}
                            >
                              Add
                            </button>
                          </div>

                          {/* Excluded Categories List */}
                          {excludedCategories.length === 0 ? (
                            <div style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>
                              No Category/Product to show.
                            </div>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                              {excludedCategories.map((cat) => (
                                <div 
                                  key={cat.id} 
                                  style={{ 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    alignItems: "center",
                                    padding: "10px 16px",
                                    background: "#f9fafb",
                                    borderRadius: 4,
                                    border: "1px solid #e5e7eb"
                                  }}
                                >
                                  <span style={{ fontSize: 13, color: "#374151" }}>{cat.name}</span>
                                  <button
                                    onClick={() => setExcludedCategories(prev => prev.filter(c => c.id !== cat.id))}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#ef4444",
                                      fontSize: 12,
                                      cursor: "pointer",
                                      padding: "4px 8px"
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* View BuyLeads Link */}
                          <div style={{ textAlign: "center" }}>
                            <a href="#" className="view-buyleads-link">
                              View BuyLeads ↗
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Location Preferences Section */}
              <div className="buylead-section">
                <div className="buylead-header" onClick={() => setLocationExpanded(!locationExpanded)}>
                  <div>
                    <div className="buylead-header-title">Location Preferences</div>
                    <div className="buylead-header-subtitle">Your current Location Preference: <strong style={{ color: "#1f2937" }}>Local</strong></div>
                    <div className="buylead-header-subtitle">This is based on your BuyLead consumption behaviour.</div>
                  </div>
                  <span style={{ 
                    transform: locationExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: 14,
                    color: "#6b7280"
                  }}>▲</span>
                </div>

                {locationExpanded && (
                  <div className="buylead-content">
                    {/* Preferred Locations */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#3b5bdb", marginBottom: 4 }}>
                        Preferred Locations
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>
                        Locations from where you consume BuyLeads regularly.
                      </div>

                      {/* Three Column Grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {/* Major Cities */}
                        <div className="location-card">
                          <div className="location-card-title">Major Cities</div>
                          <div className="location-card-text">
                            Consume buyleads regularly to update your preferences.
                          </div>
                          <a href="#" className="view-buyleads-link">
                            View BuyLeads ↗
                          </a>
                        </div>

                        {/* Other Cities */}
                        <div className="location-card">
                          <div className="location-card-title">Other Cities</div>
                          <div className="location-card-text">
                            Consume buyleads regularly to update your preferences.
                          </div>
                          <a href="#" className="view-buyleads-link">
                            View BuyLeads ↗
                          </a>
                        </div>

                        {/* Countries */}
                        <div className="location-card">
                          <div className="location-card-title">Countries</div>
                          <div className="location-card-text">
                            Consume buyleads regularly to update your preferences.
                          </div>
                          <a href="#" className="view-buyleads-link">
                            View BuyLeads ↗
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Not Preferred Locations */}
                    <div>
                      <div className="not-preferred-title">Not Preferred Locations (0)</div>
                      <div className="not-preferred-subtitle">You do not prefer BuyLeads from these locations</div>
                      
                      <div style={{ display: "flex", gap: 0, marginTop: 16, maxWidth: 400 }}>
                        <input
                          type="text"
                          placeholder="Search city/country to exclude BuyLead"
                          value={excludedLocation}
                          onChange={(e) => setExcludedLocation(e.target.value)}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px 0 0 4px",
                            fontSize: 13,
                            outline: "none"
                          }}
                        />
                        <button 
                          className="add-btn"
                          onClick={handleAddExcludedLocation}
                          style={{ borderRadius: "0 4px 4px 0" }}
                        >
                          Add
                        </button>
                      </div>

                      {excludedLocations.length === 0 && (
                        <div className="no-locations">
                          No locations to show.
                        </div>
                      )}

                      {excludedLocations.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16, maxWidth: 400 }}>
                          {excludedLocations.map((loc) => (
                            <div 
                              key={loc.id} 
                              style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center",
                                padding: "10px 16px",
                                background: "#f9fafb",
                                borderRadius: 4,
                                border: "1px solid #e5e7eb"
                              }}
                            >
                              <span style={{ fontSize: 13, color: "#374151" }}>{loc.name}</span>
                              <button
                                onClick={() => setExcludedLocations(prev => prev.filter(l => l.id !== loc.id))}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#ef4444",
                                  fontSize: 12,
                                  cursor: "pointer",
                                  padding: "4px 8px"
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ textAlign: "center", marginTop: 16 }}>
                        <a href="#" className="view-buyleads-link">
                          View BuyLeads ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}