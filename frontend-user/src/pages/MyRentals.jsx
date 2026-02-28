import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

function MyRentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Charger les locations depuis le localStorage
    const savedRentals = JSON.parse(localStorage.getItem("rentals") || "[]");
    setRentals(savedRentals);
  }, []);

  const handleRemoveRental = (id) => {
    const updatedRentals = rentals.filter((rental) => rental.id !== id);
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20 pt-24">
        <h1 className="text-4xl font-bold mb-8">Mes Locations</h1>

        {rentals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">
              Vous n'avez pas encore de location
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Découvrir les films
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-400 mb-4">
                    Loué le : {new Date(movie.rentalDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.location.href = `/movie/${movie.id}`}
                    >
                      Voir détails
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveRental(movie.id)}
                    >
                      Retirer
                    </Button>
                  </div>
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
