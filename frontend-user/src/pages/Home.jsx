import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import MoviesHero from '../components/movies/MoviesHero';
import MovieList from '../components/movies/MovieList';
import Footer from '../components/layout/Footer';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les films depuis le fichier JSON
    fetch('/data/movies.json')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des films:', error);
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
    .filter((movie) => movie.genre === 'Science-Fiction')
    .slice(0, 5);

  // Films récents (après 2010)
  const recentMovies = movies
    .filter((movie) => movie.year > 2010)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Grande bannière hero avec le premier film */}
      {featuredMovie && <MoviesHero movie={featuredMovie} />}

      {/* Section Films populaires */}
      {popularMovies.length > 0 && (
      <div className="container mx-auto px-4 py-8">
        <MovieList title="Films populaires" movies={popularMovies} />  
      </div>  
      )}


      {/* Section Science-Fiction */}
      {sciFiMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieList title="Science-Fiction" movies={sciFiMovies} />
        </div>
      )}

      {/* Section Films récents */}
      {recentMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieList title="Films récents" movies={recentMovies} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
