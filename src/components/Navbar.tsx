import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-500 p-4 text-white flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">FlavorAI</div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-green-200 transition-colors">
          Home
        </Link>
        <Link to="/recipes" className="hover:text-green-200 transition-colors">
          Recipes
        </Link>
        <Link to="/login" className="hover:text-green-200 transition-colors">
          Login
        </Link>
        <Link to="/register" className="hover:text-green-200 transition-colors">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
