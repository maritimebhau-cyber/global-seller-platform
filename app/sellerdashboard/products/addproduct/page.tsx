'use client';
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { 
  Camera, 
  Video, 
  FileText, 
  ChevronLeft, 
  Info, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 text-gray-600',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const Label = ({ children, className, required }: { children: React.ReactNode, className?: string, required?: boolean }) => (
  <label className={cn("text-sm font-medium text-gray-700 mb-1.5 block", className)}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// --- Main Page Component ---

export default function AddProductPage() {
  // State
  const [activeTab, setActiveTab] = useState<'basic' | 'specs'>('basic');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for file inputs
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Calculate Score
  const calculateScore = () => {
    let score = 0;
    if (productName.length > 3) score += 20;
    if (price) score += 20;
    if (unit) score += 10;
    if (description.length > 20) score += 30;
    if (images.length > 0) score += 20;
    return score;
  };

  const score = calculateScore();

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  // Rich Text Handlers (Simulation)
  const applyFormat = (command: string) => {
    document.execCommand(command, false, undefined);
    // In a real app, we'd manage state more strictly, but for this UI demo, execCommand is fine for visual feedback
    const editor = document.getElementById('rich-editor');
    if (editor) setDescription(editor.innerText);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Head>
        <title>Add Product / Service</title>
      </Head>

      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">Add Product / Service</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <span>Need help?</span>
                <button className="text-blue-600 font-medium hover:underline">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form */}
          <div className="flex-1 min-w-0">
            
            {/* Tabs */}
            <div className="bg-white rounded-t-lg border-b border-gray-200 flex">
              <button
                onClick={() => setActiveTab('basic')}
                className={cn(
                  "flex-1 py-4 text-sm font-medium text-center transition-colors relative",
                  activeTab === 'basic' ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Basic Details
                {activeTab === 'basic' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={cn(
                  "flex-1 py-4 text-sm font-medium text-center transition-colors relative",
                  activeTab === 'specs' ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Specification/Additional Details
                {activeTab === 'specs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="bg-white p-6 sm:p-8 rounded-b-lg shadow-sm border border-t-0 border-gray-200 min-h-[600px]">
              {activeTab === 'basic' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Product Name */}
                  <div>
                    <Label required>Product/Service Name</Label>
                    <Input 
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  {/* Price Section */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-5">
                      <Label required>Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <Input 
                          className="pl-8"
                          placeholder="0.00"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 text-center pb-3 text-gray-400 font-medium">
                      - per -
                    </div>
                    <div className="md:col-span-5">
                      <Label required>Unit</Label>
                      <Input 
                        placeholder="Enter Unit (e.g., Piece, Kg)"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <Label>Product/Service Description</Label>
                      <span className="text-xs text-gray-400">Uses, Details, Benefits, etc.</span>
                    </div>
                    
                    {/* Rich Text Toolbar */}
                    <div className="border border-gray-300 border-b-0 rounded-t-md bg-gray-50 p-2 flex gap-1 flex-wrap">
                      <ToolbarButton icon={<Bold className="w-4 h-4" />} onClick={() => applyFormat('bold')} />
                      <ToolbarButton icon={<Italic className="w-4 h-4" />} onClick={() => applyFormat('italic')} />
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <ToolbarButton icon={<List className="w-4 h-4" />} onClick={() => applyFormat('insertUnorderedList')} />
                      <ToolbarButton icon={<ListOrdered className="w-4 h-4" />} onClick={() => applyFormat('insertOrderedList')} />
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <ToolbarButton icon={<LinkIcon className="w-4 h-4" />} onClick={() => applyFormat('createLink')} />
                    </div>

                    {/* Editor Area */}
                    <div 
                      id="rich-editor"
                      className="min-h-[200px] p-4 border border-gray-300 rounded-b-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                      contentEditable
                      onInput={(e) => setDescription(e.currentTarget.innerText)}
                      suppressContentEditableWarning
                    />
                    
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-gray-400">
                        {description.length} character (maximum of 4000) including formatting.
                      </span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-gray-300" />
                  </div>
                  <p>Specification details form would appear here.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab('basic')}>
                    Back to Basic Details
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end">
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
                disabled={score < 40}
              >
                Save and Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            
            {/* Product Score Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 font-semibold mb-4">Product Score:</h3>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  {/* Circular Progress Background */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={351.86}
                      strokeDashoffset={351.86 - (351.86 * score) / 100}
                      className={cn(
                        "transition-all duration-1000 ease-out",
                        score < 30 ? "text-red-500" : score < 70 ? "text-yellow-500" : "text-green-500"
                      )}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{score}</span>
                    <span className="text-xs text-gray-500">out of 100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <ScoreItem 
                  label="Basic details" 
                  completed={productName.length > 3 && price.length > 0 && unit.length > 0} 
                />
                <ScoreItem 
                  label="Specifications" 
                  completed={false} 
                />
                <ScoreItem 
                  label="Images & Media" 
                  completed={images.length > 0} 
                />
              </div>
            </div>

            {/* Media Upload Sidebar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Media</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{images.length} added</span>
              </div>

              <div className="space-y-3">
                {/* Photo Upload Area */}
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[160px] relative overflow-hidden group",
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
                    images.length > 0 ? "bg-gray-50" : "bg-white"
                  )}
                  onClick={() => photoInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    ref={photoInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                  
                  {images.length === 0 ? (
                    <>
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Add Photo</span>
                      <span className="text-xs text-gray-400 mt-1">Click or drag here</span>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-md overflow-hidden group/img">
                          <img src={img} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50">
                        <span className="text-gray-400 text-2xl">+</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Add Video</div>
                    <div className="text-xs text-gray-400">MP4, MOV up to 50MB</div>
                  </div>
                </button>

                {/* PDF Upload */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-left group">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Add PDF</div>
                    <div className="text-xs text-gray-400">Brochures, Specs</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tips</h4>
                  <ul className="text-xs text-blue-800 space-y-1.5 list-disc pl-3.5">
                    <li>Use high-quality images (min 500x500px)</li>
                    <li>Write detailed descriptions with keywords</li>
                    <li>Add technical specifications for better reach</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- Subcomponents ---

function ToolbarButton({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
      type="button"
    >
      {icon}
    </button>
  );
}

function ScoreItem({ label, completed }: { label: string, completed: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
      )}
    </div>
  );}