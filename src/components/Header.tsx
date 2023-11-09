import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterSongsBySearch } from "./store/actions";
import useFirebaseAuth from "./Firebase/firebase-Auth";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, signOutFromGoogle, user, isAdmin } = useFirebaseAuth();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(filterSongsBySearch(query));
  };
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <header className="bg-gray-900 py-4 text-white flex justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:m-0 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center ">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
            Worship Songs
          </h1>
          <div className="md:flex md:items-center space-x-4 w-full md:w-auto hidden md:block">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-300 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              All Songs
            </Link>
          </div>
          <input
            className="border rounded px-4 py-2 focus:outline-none placeholder-gray-400 text-black mt-4 md:mt-0 md:w-1/2 w-full"
            type="text"
            placeholder="Search songs..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <button
        className="settings-button hidden md:block"
        onClick={handleTogglePopup}
      >
        <i className="fas fa-cog e"></i>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      {showPopup && <Sidebar isOpen={showPopup} onClose={handleTogglePopup} />}
    </header>
  );
};

export default Header;
