import { useState } from 'react';
import CartButton from './CartButton';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


function Navbar() {
  const [isScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  // Note : useEffect sera vu au TP 03
  // Pour l'instant, version statique

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-linear-to-b from-black/80 to-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-primary text-3xl font-bold tracking-tight">
              NETFLIX
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/movies" 
                  className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'}
                >
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/my-rentals" 
                  className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'}
                >
                  Mes locations
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-300 transition-colors" aria-label="Rechercher">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart Button */}
            <CartButton />

            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=e50914&color=fff`}
                    alt={user?.name || 'Utilisateur'}
                    className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"
                  />
                  <span className="hidden md:block text-sm">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mon profil
                    </button>
                    <NavLink
                      to="/my-rentals"
                      className="block px-4 py-2 hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mes locations
                    </NavLink>
                    <hr className="border-gray-800 my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-red-400"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded transition">
                  Connexion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;