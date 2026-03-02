'use client';
import React, { useState, useRef, useCallback } from 'react';
import { 
  UploadCloud, 
  File, 
  X, 
  CheckCircle, 
  Image as ImageIcon, 
  FileText, 
  FileSpreadsheet, 
  FileType, 
  FileArchive, 
  MoreVertical,
  Info
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: string;
  category: 'photo' | 'pdf' | 'excel' | 'word' | 'zip' | 'other';
  savedAsProduct?: boolean;
}

type FilterType = 'all' | 'photo' | 'pdf' | 'excel' | 'word' | 'zip' | 'other';

const mockFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'landing-logo-3',
    size: 1024000,
    type: 'image/svg+xml',
    url: 'https://via.placeholder.com/150?text=SVG',
    uploadDate: '28-02-2026',
    category: 'other'
  },
  {
    id: '2',
    name: 'software',
    size: 2048000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/9333ea/ffffff?text=Software',
    uploadDate: '15-02-2026',
    category: 'photo',
    savedAsProduct: true
  },
  {
    id: '3',
    name: 'preliminary-civil-services-exam',
    size: 3072000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/9333ea/ffffff?text=Civil',
    uploadDate: '15-02-2026',
    category: 'photo',
    savedAsProduct: true
  },
  {
    id: '4',
    name: 'gemini-generated-image',
    size: 1536000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/ffffff/000000?text=WebTech',
    uploadDate: '07-02-2026',
    category: 'photo'
  },
  {
    id: '5',
    name: 'made-easy-book-of-electrical',
    size: 2560000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/000000/ffffff?text=Book',
    uploadDate: '07-02-2026',
    category: 'photo',
    savedAsProduct: true
  },
  {
    id: '6',
    name: 'preliminary-civil-services-exam-2',
    size: 1800000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/1f2937/ffffff?text=Civil+2',
    uploadDate: '07-02-2026',
    category: 'photo'
  },
  {
    id: '7',
    name: '18-yrs-questions-paper-book',
    size: 2200000,
    type: 'image/png',
    url: 'https://via.placeholder.com/150/e5e7eb/000000?text=Questions',
    uploadDate: '07-02-2026',
    category: 'photo',
    savedAsProduct: true
  }
];

const filters = [
  { key: 'all', label: 'All Files', count: 7, icon: File },
  { key: 'photo', label: 'Photos', count: 7, icon: ImageIcon },
  { key: 'pdf', label: 'PDFs', count: 0, icon: FileText },
  { key: 'excel', label: 'Excel Sheets', count: 0, icon: FileSpreadsheet },
  { key: 'word', label: 'Word Docs', count: 0, icon: FileType },
  { key: 'zip', label: 'Zip Files', count: 0, icon: FileArchive },
  { key: 'other', label: 'Other Files', count: 0, icon: File },
] as const;

export default function FileUploadWidget() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(file => 
    activeFilter === 'all' ? true : file.category === activeFilter
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'photo': return <ImageIcon className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4" />;
      case 'word': return <FileType className="w-4 h-4" />;
      case 'zip': return <FileArchive className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section - Gray Background */}
      <div className="w-full  px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Text Content */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-1">
              My Photos & Documents
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              All your photos and documents at one place!
            </p>
          </div>

          {/* Right: Upload Action */}
          <div className="flex flex-col items-end gap-1">
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                group relative flex items-center gap-3 px-8 py-3.5 rounded cursor-pointer
                transition-all duration-300 ease-out
                ${isDragging 
                  ? 'bg-teal-600 scale-105 shadow-lg' 
                  : 'bg-teal-500 hover:bg-teal-600 hover:shadow-md'
                }
              `}
            >
              <UploadCloud 
                className={`w-5 h-5 text-white transition-transform duration-300 ${isDragging ? 'animate-bounce' : 'group-hover:-translate-y-1'}`} 
              />
              <span className="text-white font-semibold tracking-wide">
                Select File
              </span>
            </label>

            <p className="text-xs text-gray-500 font-medium">
              or <span className="text-gray-700 font-semibold cursor-pointer hover:text-teal-600 transition-colors">Drag & Drop</span> files to upload
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4 max-w-2xl bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
              <File className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-800">Uploading...</span>
                <span className="text-xs font-bold text-teal-600">{uploadProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="w-full border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as FilterType)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                <span className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs
                  ${isActive ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  ({filter.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Files Grid Section */}
      <div className="w-full px-6 py-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {activeFilter === 'all' ? 'All files' : filters.find(f => f.key === activeFilter)?.label} ({filteredFiles.length})
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select className="bg-transparent font-medium text-gray-800 focus:outline-none cursor-pointer">
              <option>Recent added</option>
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
              <option>Size (Large-Small)</option>
              <option>Size (Small-Large)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file) => (
            <div 
              key={file.id} 
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* File Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 min-w-0">
                  {getFileIcon(file.category)}
                  <span className="text-xs text-gray-600 truncate max-w-[120px]" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">({formatFileSize(file.size)})</span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* File Preview */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative">
                {file.category === 'photo' ? (
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    {getFileIcon(file.category)}
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* File Footer */}
              <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-500">Uploaded: {file.uploadDate}</span>
                {file.savedAsProduct ? (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span>Photo saved as product</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                ) : (
                  <button className="px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded hover:bg-teal-600 transition-colors">
                    Save as Product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <File className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No files found</p>
            <p className="text-sm">Upload files to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}