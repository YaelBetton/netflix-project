import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

function MoviesHero({ movie, onAddToCart = () => {} }) {
	const navigate = useNavigate();
	
	const handleRent = () => {
		onAddToCart(movie);
	};
	
	const handleMoreInfo = () => {
		navigate(`/movie/${movie.id}`);
	};

	return (
		<div className="relative h-[80vh] w-full">
			{/* Background Image */}
			<div className="absolute inset-0">
				<img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
			</div>

			{/* Gradient overlays */}
			<div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

			{/* Content */}
			<div className="relative container mx-auto px-4 h-full flex items-center">
				<div className="max-w-2xl">
					{/* Title */}
					<h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">{movie.title}</h1>

					{/* Meta information */}
					<div className="flex items-center flex-wrap gap-3 mb-4">
						<span className="bg-primary px-3 py-1 rounded text-sm font-bold">{movie.rating}/10</span>
						<span className="text-gray-300">{movie.year}</span>
						<span className="text-gray-300">{movie.duration} min</span>
						<span className="border border-gray-500 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
					</div>

					{/* Description */}
					<p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed drop-shadow-lg">{movie.description}</p>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-4">
						<Button size="lg" className="shadow-2xl" onClick={handleRent}>
							<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.5 3.5v13l11-6.5-11-6.5z" />
							</svg>
							Louer pour {movie.price}€
						</Button>

						<Button variant="secondary" size="lg" onClick={handleMoreInfo}>
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
							</svg>
							Plus d'infos
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoviesHero;