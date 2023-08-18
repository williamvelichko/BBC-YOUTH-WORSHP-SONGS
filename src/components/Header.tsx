import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setSearchQuery } from "./store/actions";

// interface HeaderProps {
//   onSearch: (query: string) => void; // Callback function to handle search
// }
interface HeaderProps {
  searchQuery: string; // Add searchQuery prop
  setSearchQuery: (query: string) => void; // Add setSearchQuery prop
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchQuery = e.target.value;
  //   onSearch(searchQuery);
  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery); // Update search query in Redux store
  };

  return (
    <header className="bg-gray-900 py-4 text-white flex justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:m-0 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-yellow-500 mb-4 md:mb-0">
            BBC Worship Songs
          </h1>
          <div className="md:flex md:items-center space-x-4 w-full md:w-auto">
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
          <input
            className="lg:w-1/2  border rounded px-4 py-2 focus:outline-none placeholder-gray-400 text-black mt-4 md:mt-0"
            type="text"
            placeholder="Search songs..."
            onChange={handleInputChange}
          />
        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => ({
  searchQuery: state.searchQuery,
});

const mapDispatchToProps = {
  setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
