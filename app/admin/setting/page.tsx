// app/admin/settings/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Bell, 
  Lock, 
  Database, 
  Check, 
  AlertCircle,
  Save,
  RefreshCw,
  Download,
  History,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Mail,
  UserPlus,
  Settings,
  ChevronDown,
  Info,
  X
} from 'lucide-react';

// Types
interface AuthenticationSettings {
  loginSystem: boolean;
  signupSystem: boolean;
  twoFactorAuth: boolean;
  oauthProviders: {
    google: boolean;
    github: boolean;
    microsoft: boolean;
  };
}

interface NotificationSettings {
  emailNotifications: boolean;
  emailTemplate: string;
  smtpServer: string;
  smtpPort: number;
  senderEmail: string;
  senderName: string;
  newUserRegistration: boolean;
  passwordReset: boolean;
  accountStatusChanges: boolean;
  loginAlerts: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
}

interface SecuritySettings {
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordMinLength: number;
  passwordComplexity: 'low' | 'medium' | 'high';
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  forcePasswordChange: boolean;
  passwordExpiryDays: number;
  ipWhitelist: string[];
  allowedDomains: string[];
}

interface BackupRecord {
  id: string;
  timestamp: string;
  size: string;
  status: 'completed' | 'in_progress' | 'failed';
  type: 'automatic' | 'manual';
}

interface DataManagementSettings {
  backupSchedule: string;
  backupTime: string;
  dataRetentionPeriod: number;
  autoCleanup: boolean;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  lastBackup: string;
  nextBackup: string;
  backupHistory: BackupRecord[];
  storageUsed: string;
  storageTotal: string;
}

interface SystemSettings {
  authentication: AuthenticationSettings;
  notification: NotificationSettings;
  security: SecuritySettings;
  dataManagement: DataManagementSettings;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// Default settings for reset functionality
const defaultSettings: SystemSettings = {
  authentication: {
    loginSystem: true,
    signupSystem: true,
    twoFactorAuth: false,
    oauthProviders: {
      google: true,
      github: false,
      microsoft: false,
    },
  },
  notification: {
    emailNotifications: true,
    emailTemplate: 'default',
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    senderEmail: 'noreply@example.com',
    senderName: 'System Administrator',
    newUserRegistration: true,
    passwordReset: true,
    accountStatusChanges: true,
    loginAlerts: false,
    securityAlerts: true,
    marketingEmails: false,
  },
  security: {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    passwordMinLength: 8,
    passwordComplexity: 'medium',
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    forcePasswordChange: true,
    passwordExpiryDays: 90,
    ipWhitelist: [],
    allowedDomains: [],
  },
  dataManagement: {
    backupSchedule: '6hours',
    backupTime: '02:00',
    dataRetentionPeriod: 365,
    autoCleanup: true,
    compressionEnabled: true,
    encryptionEnabled: true,
    lastBackup: '2 hours ago',
    nextBackup: 'in 4 hours',
    backupHistory: [
      { id: '1', timestamp: new Date(Date.now() - 7200000).toISOString(), size: '2.4 GB', status: 'completed', type: 'automatic' },
      { id: '2', timestamp: new Date(Date.now() - 28800000).toISOString(), size: '2.3 GB', status: 'completed', type: 'automatic' },
      { id: '3', timestamp: new Date(Date.now() - 86400000).toISOString(), size: '2.3 GB', status: 'completed', type: 'manual' },
    ],
    storageUsed: '45.2 GB',
    storageTotal: '100 GB',
  },
};

// Toggle Switch Component
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  checked, 
  onChange, 
  disabled = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-8',
    md: 'h-6 w-11',
    lg: 'h-8 w-14'
  };
  
  const thumbSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };
  
  const translateClasses = {
    sm: checked ? 'translate-x-4' : 'translate-x-0.5',
    md: checked ? 'translate-x-6' : 'translate-x-1',
    lg: checked ? 'translate-x-6' : 'translate-x-1'
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${checked ? 'bg-emerald-500' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
        ${sizeClasses[size]}
      `}
    >
      <span
        className={`
          inline-block transform rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out
          ${thumbSizes[size]}
          ${translateClasses[size]}
        `}
      />
    </button>
  );
};

// Checkbox Component
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  label, 
  description,
  disabled = false
}) => {
  return (
    <label className={`flex items-start space-x-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} group`}>
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
          ${checked 
            ? 'bg-red-500 border-red-500' 
            : 'bg-white border-gray-300 group-hover:border-gray-400'
          }
          ${disabled ? '' : 'group-active:scale-95'}
        `}>
          {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
      </div>
      <div className="flex-1">
        <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</span>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </label>
  );
};

// Input Field Component
interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number' | 'password' | 'email';
  min?: number;
  max?: number;
  placeholder?: string;
  suffix?: string;
  prefix?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  min, 
  max,
  placeholder,
  suffix,
  prefix,
  disabled = false,
  required = false,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            if (type === 'number') {
              const val = e.target.value === '' ? '' : parseFloat(e.target.value);
              if (val !== '' && min !== undefined && val < min) return;
              if (val !== '' && max !== undefined && val > max) return;
              onChange(val);
            } else {
              onChange(e.target.value);
            }
          }}
          className={`
            block w-full rounded-lg border transition-all duration-200
            ${prefix ? 'pl-10' : 'pl-4'}
            ${suffix || isPassword ? 'pr-10' : 'pr-4'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
            py-2.5 text-sm focus:ring-2 focus:outline-none
          `}
          min={min}
          max={max}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {suffix && !isPassword && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Select Field Component
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  options,
  disabled = false,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-1.5 relative">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between px-4 py-2.5 text-left rounded-lg border transition-all duration-200
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 hover:border-gray-400 cursor-pointer'}
            ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'}
          `}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption?.label || 'Select an option'}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && !disabled && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                    ${option.value === value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Setting Row Component
interface SettingRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ title, description, children, icon }) => {
  return (
    <div className="flex items-center justify-between py-4 group hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors duration-200">
      <div className="flex-1 pr-4 flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 text-gray-400 group-hover:text-indigo-500 transition-colors">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};

// Card Component
interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, action, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Toast Component
const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right-full fade-in duration-300
            ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : ''}
            ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
            ${toast.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
          `}
        >
          {toast.type === 'success' && <Check className="w-5 h-5 text-emerald-600" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
          <span className="font-medium text-sm">{toast.message}</span>
          <button onClick={() => onRemove(toast.id)} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// Backup History Modal
const BackupHistoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  backups: BackupRecord[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
}> = ({ isOpen, onClose, backups, onRestore, onDelete, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Backup History</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{new Date(backup.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      backup.type === 'automatic' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{backup.size}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      backup.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      backup.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        backup.status === 'completed' ? 'bg-emerald-500' :
                        backup.status === 'in_progress' ? 'bg-yellow-500 animate-pulse' :
                        'bg-red-500'
                      }`} />
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onDownload(backup.id)}
                        disabled={backup.status !== 'completed'}
                        className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRestore(backup.id)}
                        disabled={backup.status !== 'completed'}
                        className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Restore"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(backup.id)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reset Confirmation Modal Component
interface ResetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-red-50">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Reset All Settings?</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to reset all settings to their default values? This action cannot be undone and all your current configurations will be lost.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function SystemSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showBackupHistory, setShowBackupHistory] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'auth' | 'notification' | 'security' | 'data'>('all');

  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Track changes - compare with default to determine if changes exist
  useEffect(() => {
    const hasAnyChanges = JSON.stringify(settings) !== JSON.stringify(defaultSettings);
    setHasChanges(hasAnyChanges);
  }, [settings]);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const updateAuthSetting = useCallback(<K extends keyof AuthenticationSettings>(
    key: K, 
    value: AuthenticationSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      authentication: { ...prev.authentication, [key]: value }
    }));
  }, []);

  const updateOAuthProvider = useCallback((provider: keyof AuthenticationSettings['oauthProviders'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      authentication: {
        ...prev.authentication,
        oauthProviders: { ...prev.authentication.oauthProviders, [provider]: value }
      }
    }));
  }, []);

  const updateNotificationSetting = useCallback(<K extends keyof NotificationSettings>(
    key: K, 
    value: NotificationSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      notification: { ...prev.notification, [key]: value }
    }));
  }, []);

  const updateSecuritySetting = useCallback(<K extends keyof SecuritySettings>(
    key: K, 
    value: SecuritySettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }));
  }, []);

  const updateDataManagementSetting = useCallback(<K extends keyof DataManagementSettings>(
    key: K, 
    value: DataManagementSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      dataManagement: { ...prev.dataManagement, [key]: value }
    }));
  }, []);

  const handleGenerateBackup = useCallback(async () => {
    const newBackup: BackupRecord = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      size: 'Calculating...',
      status: 'in_progress',
      type: 'manual',
    };

    setSettings(prev => ({
      ...prev,
      dataManagement: {
        ...prev.dataManagement,
        backupHistory: [newBackup, ...prev.dataManagement.backupHistory],
        lastBackup: 'In progress...',
      }
    }));

    addToast('info', 'Backup generation started...');

    // Simulate backup process
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        dataManagement: {
          ...prev.dataManagement,
          backupHistory: prev.dataManagement.backupHistory.map(b => 
            b.id === newBackup.id ? { ...b, size: '2.5 GB', status: 'completed' } : b
          ),
          lastBackup: 'Just now',
          nextBackup: 'in 6 hours',
        }
      }));
      addToast('success', 'Backup completed successfully!');
    }, 3000);
  }, [addToast]);

  const handleRestoreBackup = useCallback((id: string) => {
    if (confirm('Are you sure you want to restore this backup? Current data will be replaced.')) {
      addToast('info', 'Restoring backup...');
      setTimeout(() => {
        addToast('success', 'System restored successfully!');
      }, 2000);
    }
  }, [addToast]);

  const handleDeleteBackup = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setSettings(prev => ({
        ...prev,
        dataManagement: {
          ...prev.dataManagement,
          backupHistory: prev.dataManagement.backupHistory.filter(b => b.id !== id)
        }
      }));
      addToast('success', 'Backup deleted successfully!');
    }
  }, [addToast]);

  const handleDownloadBackup = useCallback((id: string) => {
    addToast('info', 'Preparing download...');
    setTimeout(() => {
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `backup-${id}.zip`;
      // In real app, this would be a real URL
      addToast('success', 'Download started!');
    }, 1000);
  }, [addToast]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate occasional error
    if (Math.random() > 0.9) {
      addToast('error', 'Failed to save settings. Please try again.');
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setHasChanges(false);
    addToast('success', 'All settings saved successfully!');
  }, [addToast]);

  // FIXED: Proper reset handler with custom modal
  const handleResetClick = useCallback(() => {
    setShowResetModal(true);
  }, []);

  const handleResetConfirm = useCallback(() => {
    setSettings(defaultSettings);
    setShowResetModal(false);
    addToast('success', 'Settings reset to defaults!');
  }, [addToast]);

  const handleResetCancel = useCallback(() => {
    setShowResetModal(false);
  }, []);

  const testSMTPConnection = useCallback(async () => {
    addToast('info', 'Testing SMTP connection...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast('success', 'SMTP connection successful!');
  }, [addToast]);

  const sendTestEmail = useCallback(async () => {
    addToast('info', 'Sending test email...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('success', 'Test email sent successfully!');
  }, [addToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  const backupOptions = [
    { value: '1hour', label: 'Every hour' },
    { value: '6hours', label: 'Every 6 hours' },
    { value: '12hours', label: 'Every 12 hours' },
    { value: '24hours', label: 'Every 24 hours' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const emailTemplateOptions = [
    { value: 'default', label: 'Default Template' },
    { value: 'modern', label: 'Modern Template' },
    { value: 'minimal', label: 'Minimal Template' },
    { value: 'branded', label: 'Branded Template' },
  ];

  const complexityOptions = [
    { value: 'low', label: 'Low (letters only)' },
    { value: 'medium', label: 'Medium (letters + numbers)' },
    { value: 'high', label: 'High (letters + numbers + symbols)' },
  ];

  const filteredCards = {
    auth: activeTab === 'all' || activeTab === 'auth',
    notification: activeTab === 'all' || activeTab === 'notification',
    security: activeTab === 'all' || activeTab === 'security',
    data: activeTab === 'all' || activeTab === 'data',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
      
      {/* Reset Confirmation Modal */}
      <ResetConfirmationModal
        isOpen={showResetModal}
        onClose={handleResetCancel}
        onConfirm={handleResetConfirm}
      />
      
      <BackupHistoryModal
        isOpen={showBackupHistory}
        onClose={() => setShowBackupHistory(false)}
        backups={settings.dataManagement.backupHistory}
        onRestore={handleRestoreBackup}
        onDelete={handleDeleteBackup}
        onDownload={handleDownloadBackup}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-600" />
              System Settings
            </h1>
            <p className="mt-2 text-gray-600">Configure system-wide settings and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-sm text-amber-600 font-medium flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleResetClick}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className={`
                inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-200
                ${isSaving || !hasChanges
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95'
                }
              `}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'all', label: 'All Settings', icon: Settings },
              { id: 'auth', label: 'Authentication', icon: Shield },
              { id: 'notification', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'data', label: 'Data Management', icon: Database },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Authentication Settings */}
          {filteredCards.auth && (
            <Card title="Authentication Settings" icon={<Shield className="w-5 h-5" />}>
              <div className="space-y-2">
                <SettingRow 
                  title="Login System" 
                  description="Enable or disable user login functionality"
                  icon={<Key className="w-4 h-4" />}
                >
                  <ToggleSwitch 
                    checked={settings.authentication.loginSystem}
                    onChange={(checked) => updateAuthSetting('loginSystem', checked)}
                  />
                </SettingRow>
                
                <div className="border-t border-gray-100" />
                
                <SettingRow 
                  title="Signup System" 
                  description="Enable or disable new user registrations"
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  <ToggleSwitch 
                    checked={settings.authentication.signupSystem}
                    onChange={(checked) => updateAuthSetting('signupSystem', checked)}
                  />
                </SettingRow>
                
                <div className="border-t border-gray-100" />
                
                <SettingRow 
                  title="Two-Factor Authentication" 
                  description="Require 2FA for all users"
                  icon={<Lock className="w-4 h-4" />}
                >
                  <ToggleSwitch 
                    checked={settings.authentication.twoFactorAuth}
                    onChange={(checked) => updateAuthSetting('twoFactorAuth', checked)}
                  />
                </SettingRow>

                <div className="border-t border-gray-100" />
                
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">OAuth Providers</h4>
                  <div className="space-y-3">
                    <Checkbox
                      checked={settings.authentication.oauthProviders.google}
                      onChange={(checked) => updateOAuthProvider('google', checked)}
                      label="Google"
                      description="Allow users to sign in with Google"
                    />
                    <Checkbox
                      checked={settings.authentication.oauthProviders.github}
                      onChange={(checked) => updateOAuthProvider('github', checked)}
                      label="GitHub"
                      description="Allow users to sign in with GitHub"
                    />
                    <Checkbox
                      checked={settings.authentication.oauthProviders.microsoft}
                      onChange={(checked) => updateOAuthProvider('microsoft', checked)}
                      label="Microsoft"
                      description="Allow users to sign in with Microsoft"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notification Settings */}
          {filteredCards.notification && (
            <Card title="Notification Settings" icon={<Bell className="w-5 h-5" />}>
              <div className="space-y-6">
                <SettingRow 
                  title="Email Notifications" 
                  description="Master toggle for all email notifications"
                  icon={<Mail className="w-4 h-4" />}
                >
                  <ToggleSwitch 
                    checked={settings.notification.emailNotifications}
                    onChange={(checked) => updateNotificationSetting('emailNotifications', checked)}
                  />
                </SettingRow>
                
                <div className={settings.notification.emailNotifications ? '' : 'opacity-50 pointer-events-none'}>
                  <div className="space-y-4">
                    <SelectField
                      label="Email Template"
                      value={settings.notification.emailTemplate}
                      onChange={(value) => updateNotificationSetting('emailTemplate', value)}
                      options={emailTemplateOptions}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="SMTP Server"
                        value={settings.notification.smtpServer}
                        onChange={(value) => updateNotificationSetting('smtpServer', value as string)}
                        placeholder="smtp.example.com"
                      />
                      <InputField
                        label="SMTP Port"
                        value={settings.notification.smtpPort}
                        onChange={(value) => updateNotificationSetting('smtpPort', value as number)}
                        type="number"
                        min={1}
                        max={65535}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Sender Email"
                        value={settings.notification.senderEmail}
                        onChange={(value) => updateNotificationSetting('senderEmail', value as string)}
                        type="email"
                      />
                      <InputField
                        label="Sender Name"
                        value={settings.notification.senderName}
                        onChange={(value) => updateNotificationSetting('senderName', value as string)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={testSMTPConnection}
                        className="flex-1 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        Test Connection
                      </button>
                      <button
                        onClick={sendTestEmail}
                        className="flex-1 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        Send Test Email
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Notification Events
                      </label>
                      <div className="space-y-3">
                        <Checkbox
                          checked={settings.notification.newUserRegistration}
                          onChange={(checked) => updateNotificationSetting('newUserRegistration', checked)}
                          label="New user registration"
                        />
                        <Checkbox
                          checked={settings.notification.passwordReset}
                          onChange={(checked) => updateNotificationSetting('passwordReset', checked)}
                          label="Password reset"
                        />
                        <Checkbox
                          checked={settings.notification.accountStatusChanges}
                          onChange={(checked) => updateNotificationSetting('accountStatusChanges', checked)}
                          label="Account status changes"
                        />
                        <Checkbox
                          checked={settings.notification.loginAlerts}
                          onChange={(checked) => updateNotificationSetting('loginAlerts', checked)}
                          label="New login alerts"
                        />
                        <Checkbox
                          checked={settings.notification.securityAlerts}
                          onChange={(checked) => updateNotificationSetting('securityAlerts', checked)}
                          label="Security alerts"
                        />
                        <Checkbox
                          checked={settings.notification.marketingEmails}
                          onChange={(checked) => updateNotificationSetting('marketingEmails', checked)}
                          label="Marketing emails"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {filteredCards.security && (
            <Card title="Security Settings" icon={<Lock className="w-5 h-5" />}>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Session Timeout"
                    value={settings.security.sessionTimeout}
                    onChange={(value) => updateSecuritySetting('sessionTimeout', value as number)}
                    type="number"
                    min={5}
                    max={1440}
                    suffix="min"
                  />
                  <InputField
                    label="Max Login Attempts"
                    value={settings.security.maxLoginAttempts}
                    onChange={(value) => updateSecuritySetting('maxLoginAttempts', value as number)}
                    type="number"
                    min={1}
                    max={10}
                  />
                </div>

                <InputField
                  label="Lockout Duration"
                  value={settings.security.lockoutDuration}
                  onChange={(value) => updateSecuritySetting('lockoutDuration', value as number)}
                  type="number"
                  min={5}
                  max={1440}
                  suffix="min"
                />

                <SelectField
                  label="Password Complexity"
                  value={settings.security.passwordComplexity}
                  onChange={(value) => updateSecuritySetting('passwordComplexity', value as any)}
                  options={complexityOptions}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Min Password Length"
                    value={settings.security.passwordMinLength}
                    onChange={(value) => updateSecuritySetting('passwordMinLength', value as number)}
                    type="number"
                    min={4}
                    max={128}
                  />
                  <InputField
                    label="Password Expiry"
                    value={settings.security.passwordExpiryDays}
                    onChange={(value) => updateSecuritySetting('passwordExpiryDays', value as number)}
                    type="number"
                    min={1}
                    max={365}
                    suffix="days"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Checkbox
                    checked={settings.security.requireSpecialChars}
                    onChange={(checked) => updateSecuritySetting('requireSpecialChars', checked)}
                    label="Require special characters"
                  />
                  <Checkbox
                    checked={settings.security.requireNumbers}
                    onChange={(checked) => updateSecuritySetting('requireNumbers', checked)}
                    label="Require numbers"
                  />
                  <Checkbox
                    checked={settings.security.requireUppercase}
                    onChange={(checked) => updateSecuritySetting('requireUppercase', checked)}
                    label="Require uppercase letters"
                  />
                  <Checkbox
                    checked={settings.security.forcePasswordChange}
                    onChange={(checked) => updateSecuritySetting('forcePasswordChange', checked)}
                    label="Force password change periodically"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Data Management */}
          {filteredCards.data && (
            <Card 
              title="Data Management" 
              icon={<Database className="w-5 h-5" />}
              action={
                <button
                  onClick={() => setShowBackupHistory(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  <History className="w-4 h-4" />
                  History
                </button>
              }
            >
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Backup Schedule"
                    value={settings.dataManagement.backupSchedule}
                    onChange={(value) => updateDataManagementSetting('backupSchedule', value)}
                    options={backupOptions}
                  />
                  <InputField
                    label="Backup Time"
                    value={settings.dataManagement.backupTime}
                    onChange={(value) => updateDataManagementSetting('backupTime', value as string)}
                    type="text"
                    placeholder="HH:MM"
                  />
                </div>

                <InputField
                  label="Data Retention Period"
                  value={settings.dataManagement.dataRetentionPeriod}
                  onChange={(value) => updateDataManagementSetting('dataRetentionPeriod', value as number)}
                  type="number"
                  min={1}
                  max={3650}
                  suffix="days"
                />

                <div className="space-y-3">
                  <Checkbox
                    checked={settings.dataManagement.autoCleanup}
                    onChange={(checked) => updateDataManagementSetting('autoCleanup', checked)}
                    label="Automatic cleanup of old data"
                    description="Automatically delete data older than retention period"
                  />
                  <Checkbox
                    checked={settings.dataManagement.compressionEnabled}
                    onChange={(checked) => updateDataManagementSetting('compressionEnabled', checked)}
                    label="Enable compression"
                    description="Compress backups to save storage space"
                  />
                  <Checkbox
                    checked={settings.dataManagement.encryptionEnabled}
                    onChange={(checked) => updateDataManagementSetting('encryptionEnabled', checked)}
                    label="Enable encryption"
                    description="Encrypt backups with AES-256"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleGenerateBackup}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Database className="w-4 h-4" />
                    Generate Backup Now
                  </button>
                </div>

                {/* Storage Usage */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-semibold text-gray-900">{settings.dataManagement.storageUsed} / {settings.dataManagement.storageTotal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>

                {/* Backup Status */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Last backup: <span className="font-semibold text-gray-900">{settings.dataManagement.lastBackup}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    <span>Next backup: <span className="font-semibold text-gray-900">{settings.dataManagement.nextBackup}</span></span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Floating Save Button for Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className={`
              w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200
              ${isSaving || !hasChanges
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110 active:scale-95'
              }
            `}
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}