import React from "react";
import { Link } from "react-router-dom";
import useFirebaseAuth from "./Firebase/firebase-Auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isLoggedIn, signInWithGoogle, signOutFromGoogle, isAdmin } =
    useFirebaseAuth();

  const handleLogout = () => {
    signOutFromGoogle();
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-md transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:w-64 p-4`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        onClick={onClose}
      >
        <i className="fas fa-times"></i>
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col items-center mt-5 text-center">
        {isLoggedIn ? (
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded my-1"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded my-1"
            onClick={signInWithGoogle}
          >
            Sign In
          </button>
        )}
        {isAdmin && (
          <Link
            to="/addSong"
            className="w-full bg-green-500 text-white px-4 py-2 rounded my-1"
          >
            Controls
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
