import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void; // Callback function to handle search
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gray-900 py-4 text-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-yellow-500">
            BBC Worship Songs
          </h1>
        </div>
        <div className="flex items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            All Songs
          </Link>
          <Link
            to="/add-song"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Song
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <input
          className="w-full border rounded px-4 py-2 focus:outline-none placeholder-gray-400 text-black"
          type="text"
          placeholder="Search songs..."
          onChange={handleInputChange}
        />
      </div>
    </header>
  );
};

export default Header;
