import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les locations depuis le localStorage
    const savedRentals = JSON.parse(localStorage.getItem("rentals") || "[]");
    setRentals(savedRentals);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20 pt-24">
        <h1 className="text-4xl font-bold mb-8">Mes locations</h1>

        {rentals.length === 0 ? (
          /* État vide */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-gray-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-8">Aucune location pour le moment</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"
            >
              Découvrir des films
            </Button>
          </div>
        ) : (
          /* Grille de films loués */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {rentals.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg object-cover aspect-[2/3]"
                />
                <div className="mt-2 px-1">
                  <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">
                    Expiré le : {new Date(new Date(movie.rentalDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyRentals;
