import { useState, useMemo } from 'react';

function SearchBar({ movies, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const suggestions = useMemo(() => {
    if (searchTerm.length >= 2) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sliced = filtered.slice(0, 5);
      console.log("Suggestions:", sliced);
      return sliced;
    }
    return [];
  }, [searchTerm, movies]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    console.log("Film sélectionné:", movie);
    if (onSearch) {
      onSearch(movie);
    }
  };

  const handleFocus = () => {};

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
        />
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-gray-400"
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
      </div>

      {searchTerm.length >= 2 && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition text-left border-b border-gray-700 last:border-b-0"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.year} · {movie.genre}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
