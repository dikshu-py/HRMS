import React, { useState, useEffect, useRef } from 'react';

const AttendanceDropdown = ({ value, onChange, options ,className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = options.find(opt => opt.value === value) || options[0];

  const handleSelect = (status) => {
    onChange(status.value);
    setIsOpen(false);
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex justify-between items-center w-32 rounded-full border shadow-sm px-4 py-1.5 text-sm font-medium 
        ${value === ('Present' || 'Selected')
          ? 'text-green-800  border-[#ABABAB] hover:bg-green-200' 
          : 'text-black-700 border-[#ABABAB]'}
        `}
      >
        {selected.label}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((status) => (
              <button
                key={status.value}
                onClick={() => handleSelect(status)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDropdown;
