import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  // Pour l'instant, on simule avec localStorage
  // plus tard on utilisera Context API
  const isAuthenticated = localStorage.getItem('user') !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Rediriger vers la page de connexion
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
