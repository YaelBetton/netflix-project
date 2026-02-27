import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les films et trouver celui correspondant à l'ID
    fetch("/data/movies.json")
      .then((response) => response.json())
      .then((data) => {
        const foundMovie = data.find((m) => m.id === parseInt(id));
        setMovie(foundMovie);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du film:", error);
        setLoading(false);
      });
  }, [id]);

  const handleRent = () => {
    if (movie) {
      const rentals = JSON.parse(localStorage.getItem("rentals") || "[]");
      rentals.push({ ...movie, rentalDate: new Date().toISOString() });
      localStorage.setItem("rentals", JSON.stringify(rentals));
      alert(`${movie.title} a été ajouté à vos locations !`);
      navigate("/my-rentals");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 pt-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Film non trouvé</h1>
          <Button onClick={() => navigate("/")}>Retour à l&apos;accueil</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section avec image de fond */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12 pt-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4 text-lg">
              <span className="text-yellow-400">⭐ {movie.rating}/10</span>
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
              <span className="px-3 py-1 bg-red-600 rounded">{movie.genre}</span>
            </div>
            <p className="text-gray-300 text-lg mb-6">{movie.description}</p>
            <div className="flex space-x-4">
              <Button size="lg" onClick={handleRent}>
                ▶ Louer pour {movie.price}€
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
                ← Retour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-400">{movie.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Détails</h2>
            <div className="space-y-2 text-gray-400">
              <p><span className="font-semibold text-white">Genre:</span> {movie.genre}</p>
              <p><span className="font-semibold text-white">Année:</span> {movie.year}</p>
              <p><span className="font-semibold text-white">Durée:</span> {movie.duration} minutes</p>
              <p><span className="font-semibold text-white">Note:</span> {movie.rating}/10</p>
              <p><span className="font-semibold text-white">Prix de location:</span> {movie.price}€</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;
