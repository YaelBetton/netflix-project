import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import Breadcrumb from "../components/common/Breadcrumb";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

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
    // Vérifier si l'utilisateur est connecté
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    // Créer la location
    const rental = {
      ...movie,
      rentalDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours
    };

    // Récupérer les locations existantes
    const rentals = JSON.parse(localStorage.getItem("rentals") || "[]");

    // Vérifier si déjà loué avec Array.some
    const alreadyRented = rentals.some((r) => r.id === movie.id);

    if (alreadyRented) {
      setNotification({ type: "error", message: "Vous avez déjà loué ce film" });
      return;
    }

    // Ajouter la nouvelle location et sauvegarder
    rentals.push(rental);
    localStorage.setItem("rentals", JSON.stringify(rentals));
    setNotification({ type: "success", message: "Film loué avec succès !" });

    // Rediriger vers MyRentals après 2 secondes
    setTimeout(() => {
      navigate("/my-rentals");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Message d'attente, pendant la recherche du film</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 pt-24">
          <div className="max-w-md mx-auto text-center bg-gray-900 rounded-lg p-12">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-3xl font-bold mb-4">Film introuvable</h1>
            <p className="text-gray-400 mb-6">Le film que vous recherchez n'existe pas</p>
            <Button onClick={() => navigate("/")} className="bg-red-600 hover:bg-red-700">Retour à l&apos;accueil</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 text-white font-semibold ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      {/* Hero Section avec image de fond en pleine page */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

        {/* Breadcrumb */}
        <div className="relative container mx-auto px-4 pt-24">
          <Breadcrumb items={[
            { label: 'Films', path: '/' },
            { label: movie.genre, path: `/?genre=${movie.genre}` },
            { label: movie.title }
          ]} />
        </div>
        
        {/* Contenu */}
        <div className="relative container mx-auto px-4 pt-64 pb-12">
          {/* Bouton retour, titre et badges */}
          <div className="mb-12">
            {/* Bouton retour */}
            <div className="mb-4">
              <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300 transition-colors">
                ← Retour
              </button>
            </div>
            
            {/* Titre et badges */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600 px-3 py-1 rounded font-bold text-sm">{movie.rating}/10</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="border border-gray-400 px-3 py-1 rounded text-sm">{movie.genre}</span>
            </div>
          </div>

          {/* Synopsis et Poster */}
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Synopsis et infos - 2 colonnes */}
            <div className="md:col-span-2">
              {/* Synopsis */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
                <p className="text-gray-300 text-base leading-relaxed max-w-2xl">{movie.description}</p>
              </div>

              {/* Bouton Louer */}
              <div className="mb-8">
                <Button size="lg" onClick={handleRent} className="bg-red-600 hover:bg-red-700 font-semibold px-8">
                  🎬 Louer pour {movie.price}€
                </Button>
              </div>

              {/* Informations */}
              <div className="flex flex-col h-64">
                <h3 className="text-xl font-bold mb-3">Informations</h3>
                <div className="space-y-2 text-gray-300 bg-black/85 p-6 rounded-lg flex-grow flex flex-col justify-start">
                  <p><span className="font-semibold text-white">Genre:</span> {movie.genre}</p>
                  <p><span className="font-semibold text-white">Année:</span> {movie.year}</p>
                  <p><span className="font-semibold text-white">Durée:</span> {movie.duration} minutes</p>
                  <p><span className="font-semibold text-white">Note:</span> {movie.rating}/10</p>
                </div>
              </div>
            </div>

            {/* Poster du film - 1 colonne */}
            <div className="md:col-span-1 flex justify-center md:justify-end">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full max-w-sm rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;
