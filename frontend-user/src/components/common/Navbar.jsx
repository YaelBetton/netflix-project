import { useState } from 'react';
import SearchBar from '../movies/SearchBar';
import CartButton from './CartButton';
import { Link, NavLink } from 'react-router-dom';


function Navbar({ movies = [], cartItems = [], onRemoveFromCart = () => {} }) {
  const [isScrolled] = useState(false);

  const handleSearch = (movie) => {
    console.log("Film sélectionné depuis Navbar:", movie);
    // TODO: Implémenter la navigation vers la page de détail du film
  };

  // Note : useEffect sera vu au TP 03
  // Pour l'instant, version statique

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
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
            {/* Search Bar */}
            <SearchBar movies={movies} onSearch={handleSearch} />

            {/* Cart Button */}
            <CartButton cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

            {/* User Avatar */}
            <Link to="/login" className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
              <span className="text-sm font-bold">U</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;