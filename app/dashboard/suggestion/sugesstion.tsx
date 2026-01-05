'use client';

import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SuggestionModal({ open, onClose }: Props) {
  const [suggestion, setSuggestion] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    if (suggestion.trim()) {
      console.log('Suggestion submitted:', suggestion);
      // Add your submission logic here
      setSuggestion('');
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white p-8 shadow-xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          We Value Your Suggestions
        </h2>

        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Write your suggestion here..."
          rows={10}
          className="w-full resize-y rounded-lg border border-gray-200 p-4 text-base text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-teal-500 transition-colors min-h-[200px]"
        />

        <button
          onClick={handleSubmit}
          disabled={!suggestion.trim()}
          className="mt-6 w-full rounded-lg bg-teal-500 py-3.5 text-white font-medium hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
}