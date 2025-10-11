
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Menu, X, ShoppingCart, Heart } from "lucide-react";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("users"));
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist || []); // ✅ optional fallback

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-violet-600 to-purple-600 bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-lg transition-all duration-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* ✅ Brand */}
        <Link to="/" className="relative group">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            <span className="inline-block transition-transform duration-500 group-hover:scale-110 group-hover:text-white drop-shadow-md animate-pulse">
              E-Digi Shop
            </span>
          </h2>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* ✅ Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/allproduct">All Product</Link>

          {!user && <Link to="/signup">Signup</Link>}
          {!user && <Link to="/login">Login</Link>}

          {user?.role === "user" && <Link to="/user-dashboard">User</Link>}
          {user?.role === "admin" && <Link to="/admin-dashboard">Admin</Link>}

          {user && (
            <span
              onClick={logout}
              className="cursor-pointer hover:text-gray-200 transition"
            >
              Logout
            </span>
          )}

          {/* ✅ Wishlist */}
          <Link
            to="/my-wishlist"
            className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 transition"
          >
            <Heart size={20} />
            ({wishlistItems.length})
          </Link>

          {/* ✅ Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 transition"
          >
            <ShoppingCart size={20} />({cartItems.length})
          </Link>

          {/* ✅ SearchBar */}
          <div className="w-56">
            <SearchBar />
          </div>
        </div>

        {/* ✅ Mobile Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white focus:outline-none"
          >
            <Search size={22} />
          </button>

          <Link to="/my-wishlist" className="text-white relative">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-violet-700 text-xs font-bold rounded-full px-1.5 py-0.5">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="text-white relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-violet-700 text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Search */}
      {showSearch && (
        <div className="md:hidden bg-white/10 px-4 pb-3">
          <SearchBar />
        </div>
      )}

      {/* ✅ Improved Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-violet-700 to-purple-700/95 text-white text-center space-y-3 py-4 font-medium rounded-b-2xl shadow-lg backdrop-blur-md">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/allproduct" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
            All Product
          </Link>

          {!user && (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
                Signup
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
                Login
              </Link>
            </>
          )}

          {user?.role === "user" && (
            <Link to="/user-dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
              User
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200 transition">
              Admin
            </Link>
          )}

          {user && (
            <span
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="cursor-pointer block hover:text-gray-200 transition"
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
