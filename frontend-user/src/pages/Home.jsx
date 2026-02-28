import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import MoviesHero from "../components/movies/MoviesHero";
import MovieList from "../components/movies/MovieList";
import MovieFilter from "../components/movies/MovieFilter";
import Footer from "../components/layout/Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (movie) => {
    const rentals = JSON.parse(localStorage.getItem("rentals") || "[]");
    const exists = rentals.find(item => item.id === movie.id);
    if (!exists) {
      rentals.push({ ...movie, rentalDate: new Date().toISOString() });
      localStorage.setItem("rentals", JSON.stringify(rentals));
      setCartItems([...cartItems, movie]);
      alert(`${movie.title} a été ajouté à vos locations !`);
    } else {
      alert(`${movie.title} est déjà dans vos locations.`);
    }
  };

  const removeFromCart = (movieId) => {
    setCartItems(cartItems.filter(item => item.id !== movieId));
    console.log("Film retiré du panier");
  };

  useEffect(() => {
    // Charger les films depuis le fichier JSON
    fetch("/data/movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setAllMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des films:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  // Le premier film sera mis en avant
  const featuredMovie = movies[0];

  // 5 films populaires au hasard
  const getRandomMovies = (movies, count) => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const popularMovies = getRandomMovies(movies, 5);

  // Films d'un genre spécifique (Science-Fiction) - 5 films
  const sciFiMovies = movies
    .filter((movie) => movie.genre === "Science-Fiction")
    .slice(0, 5);

  // Films récents (après 2010)
  const recentMovies = movies.filter((movie) => movie.year > 2010).slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar movies={allMovies} cartItems={cartItems} onRemoveFromCart={removeFromCart} />

      {/* Grande bannière hero avec le premier film */}
      {featuredMovie && <MoviesHero movie={featuredMovie} onAddToCart={addToCart} />}

      <div className="container mx-auto">
        <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
        <MovieList title="Films disponibles" movies={filteredMovies} onAddToCart={addToCart} />
      </div>

      {/* Section Films populaires */}
      {popularMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieList title="Films populaires" movies={popularMovies} onAddToCart={addToCart} />
        </div>
      )}

      {/* Section Science-Fiction */}
      {sciFiMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieList title="Science-Fiction" movies={sciFiMovies} onAddToCart={addToCart} />
        </div>
      )}

      {/* Section Films récents */}
      {recentMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieList title="Films récents" movies={recentMovies} onAddToCart={addToCart} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
