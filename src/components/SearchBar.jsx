import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder, initialPrompt }) => {
  const [searchTerm, setSearchTerm] = useState(initialPrompt || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto text-center px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400 text-center text-base font-fredoka shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white/90 transition-all duration-200"
      />
    </form>
  );
};

export default SearchBar;
