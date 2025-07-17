 import React from 'react';
import { Search } from 'lucide-react';
 
 export const SearchBar = React.memo(({ searchTerm, onSearchChange }) => (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  ));