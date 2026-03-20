// app/page.js
'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SellerManagement() {
  const initialFormState = {
    companyName: '',
    businessType: '',
    productCategory: '',
    registrationNumber: '',
    gstin: '',
    yearEstablished: '',
    firstName: '',
    lastName: '',
    designation: '',
    primaryContact: '',
    alternateContact: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    gstinCertificate: null,
    panCard: null,
    shopCertificate: null
  };

  type FormData = typeof initialFormState;

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSuccessMessage('Seller registered successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddNewSeller = () => {
    // Reset form to add new seller (like IndiaMART)
    setFormData(initialFormState);
    setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      setFormData(initialFormState);
      setSuccessMessage('');
    }
  };

  const triggerFileInput = (inputId: string): void => {
    document.getElementById(inputId)?.click();
  };

  // Required field indicator component
  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <label className={styles.label}>
      {children} <span className={styles.required}>*</span>
    </label>
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Seller Management</h1>
          <p className={styles.subtitle}>Register and manage seller profiles</p>
        </div>
        <button 
          type="button"
          onClick={handleAddNewSeller} 
       className={`${styles.addSellerBtn} bg-green-700 my-5 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-300`}
          
        >
          + Add New Seller
        </button>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Seller</h2>
          
          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Column 1: Business Information */}
              <div className={styles.column}>
                <h3 className={styles.sectionTitle}>Business Information</h3>
                
                <div className={styles.formGroup}>
                  <RequiredLabel>Company Name</RequiredLabel>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Business Type</RequiredLabel>
                  <div className={styles.selectWrapper}>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Manufacturer, Distributor, Wholesaler</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="retailer">Retailer</option>
                      <option value="exporter">Exporter</option>
                    </select>
                    <span className={styles.arrow}>▼</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Primary Product Category</RequiredLabel>
                  <div className={styles.selectWrapper}>
                    <select
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">e.g. Industrial Machinery, Textiles, Electronics</option>
                      <option value="machinery">Industrial Machinery</option>
                      <option value="textiles">Textiles</option>
                      <option value="electronics">Electronics</option>
                      <option value="chemicals">Chemicals</option>
                      <option value="food">Food & Beverages</option>
                    </select>
                    <span className={styles.arrow}>▼</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Business Registration Number (CIN/LLPIN)</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="Business Registration Number (CIN/LLPIN)"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>GSTIN</RequiredLabel>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="GSTIN"
                    className={styles.input}
                    maxLength={15}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Year Established</label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    placeholder="Year Established"
                    className={styles.input}
                    min={1900}
                    max={2026}
                  />
                </div>
              </div>

              {/* Column 2: Contact Details */}
              <div className={styles.column}>
                <h3 className={styles.sectionTitle}>Contact Details</h3>
                
                <div className={styles.formGroup}>
                  <RequiredLabel>Contact Person Name</RequiredLabel>
                  <div className={styles.nameRow}>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First"
                      className={styles.input}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Designation</RequiredLabel>
                  <div className={styles.selectWrapper}>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Designation</option>
                      <option value="owner">Owner</option>
                      <option value="manager">Manager</option>
                      <option value="director">Director</option>
                      <option value="sales">Sales Head</option>
                      <option value="other">Other</option>
                    </select>
                    <span className={styles.arrow}>▼</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Contact Number (Primary)</RequiredLabel>
                  <input
                    type="tel"
                    name="primaryContact"
                    value={formData.primaryContact}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    className={styles.input}
                    maxLength={10}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Contact Number (Alternate)</label>
                  <input
                    type="tel"
                    name="alternateContact"
                    value={formData.alternateContact}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    className={styles.input}
                    maxLength={10}
                  />
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Email Address</RequiredLabel>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              {/* Column 3: Address & Location + Verification */}
              <div className={styles.column}>
                <h3 className={styles.sectionTitle}>Address & Location</h3>
                
                <div className={styles.formGroup}>
                  <RequiredLabel>Registered Office Address</RequiredLabel>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Registered Office Address"
                    className={styles.textarea}
                    rows={3}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>State/Union Territory</RequiredLabel>
                  <div className={styles.selectWrapper}>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamilnadu">Tamil Nadu</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="uttarpradesh">Uttar Pradesh</option>
                      <option value="westbengal">West Bengal</option>
                      <option value="telangana">Telangana</option>
                      <option value="rajasthan">Rajasthan</option>
                    </select>
                    <span className={styles.arrow}>▼</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.locationRow}>
                    <div className={styles.locationField}>
                      <RequiredLabel>City</RequiredLabel>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.locationField}>
                      <RequiredLabel>Pincode</RequiredLabel>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        className={styles.input}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                </div>

                <h3 className={`${styles.sectionTitle} ${styles.verificationTitle}`}>Verification & Files</h3>
                
                <div className={styles.formGroup}>
                  <RequiredLabel>Upload GSTIN Certificate</RequiredLabel>
                  <div className={styles.fileUpload}>
                    <input
                      type="text"
                      value={formData.gstinCertificate || ''}
                      placeholder=""
                      className={styles.fileInput}
                      readOnly
                    />
                    <input
                      type="file"
                      id="gstinCert"
                      onChange={(e) => handleFileChange(e, 'gstinCertificate')}
                      className={styles.hiddenFile}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileInput('gstinCert')}
                      className={styles.browseBtn}
                    >
                      Browse...
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <RequiredLabel>Upload Business PAN Card</RequiredLabel>
                  <div className={styles.fileUpload}>
                    <input
                      type="text"
                      value={formData.panCard || ''}
                      placeholder=""
                      className={styles.fileInput}
                      readOnly
                    />
                    <input
                      type="file"
                      id="panCard"
                      onChange={(e) => handleFileChange(e, 'panCard')}
                      className={styles.hiddenFile}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileInput('panCard')}
                      className={styles.browseBtn}
                    >
                      Browse...
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Upload Shop Establishment Certificate</label>
                  <div className={styles.fileUpload}>
                    <input
                      type="text"
                      value={formData.shopCertificate || ''}
                      placeholder=""
                      className={styles.fileInput}
                      readOnly
                    />
                    <input
                      type="file"
                      id="shopCert"
                      onChange={(e) => handleFileChange(e, 'shopCertificate')}
                      className={styles.hiddenFile}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileInput('shopCert')}
                      className={styles.browseBtn}
                    >
                      Browse...
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Register Seller
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
