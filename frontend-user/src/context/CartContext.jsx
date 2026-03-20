import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cart';
const RENTALS_STORAGE_KEY = 'rentals';

const readStorageArray = (key) => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : [];
	} catch {
		localStorage.removeItem(key);
		return [];
	}
};

export function CartProvider({ children }) {
	// Chargez et initialisez le panier et les locations
	const [cart, setCart] = useState(() => readStorageArray(CART_STORAGE_KEY));
	const [rentals, setRentals] = useState(() => readStorageArray(RENTALS_STORAGE_KEY));

	// Sauvegardez le panier et les locations a chaque modif
	useEffect(() => {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		localStorage.setItem(RENTALS_STORAGE_KEY, JSON.stringify(rentals));
	}, [rentals]);

	// Ajouter au panier
	const addToCart = (movie) => {
		if (!movie || !movie.id) return;

		setCart((previousCart) => {
			if (previousCart.some((item) => item.id === movie.id)) {
				return previousCart;
			}
			return [...previousCart, movie];
		});
	};

	// Retirer du panier
	const removeFromCart = (movieId) => {
		setCart((previousCart) => previousCart.filter((item) => item.id !== movieId));
	};

	// Vider le panier
	const clearCart = () => {
		setCart([]);
	};

	// Calculer le total
	const getCartTotal = () => {
		return cart.reduce((total, item) => total + Number(item.price || 0), 0);
	};

	// Nombre d'items
	const getCartCount = () => {
		return cart.length;
	};

	// Louer un film
	const rentMovie = (movie) => {
		if (!movie || !movie.id) {
			return { success: false, error: 'Film invalide.' };
		}

		if (rentals.some((rentalItem) => rentalItem.movieId === movie.id)) {
			return { success: false, error: 'Ce film est deja loue.' };
		}

		const rentalDate = new Date();
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours

		const rental = {
			id: Date.now(),
			movieId: movie.id,
			title: movie.title,
			poster: movie.poster,
			price: movie.price,
			rentalDate: rentalDate.toISOString(),
			expiryDate: expiryDate.toISOString(),
		};

		// Mettre a jour la liste des films loues
		setRentals((previousRentals) => [...previousRentals, rental]);
		// Supprimer le film du panier
		setCart((previousCart) => previousCart.filter((item) => item.id !== movie.id));

		return { success: true, rental };
	};

	// Louer tous les films du panier
	const rentAllInCart = () => {
		const now = Date.now();
		const newRentals = cart
			.filter((movie) => !rentals.some((rentalItem) => rentalItem.movieId === movie.id))
			.map((movie, index) => {
				const rentalDate = new Date();
				const expiryDate = new Date();
				expiryDate.setDate(expiryDate.getDate() + 7);

				return {
					id: now + index,
					movieId: movie.id,
					title: movie.title,
					poster: movie.poster,
					price: movie.price,
					rentalDate: rentalDate.toISOString(),
					expiryDate: expiryDate.toISOString(),
				};
			});

		setRentals((previousRentals) => [...previousRentals, ...newRentals]);
		// vider le panier
		setCart([]);

		return { success: true, count: newRentals.length };
	};

	// Verifier si un film est loue
	const isRented = (movieId) => {
		return rentals.some((rental) => rental.movieId === movieId);
	};

	// Obtenir la location d'un film
	const getRentalByMovieId = (movieId) => {
		return rentals.find((rental) => rental.movieId === movieId);
	};

	// Verifier si un film est dans le panier
	const isInCart = (movieId) => {
		return cart.some((item) => item.id === movieId);
	};

	const value = {
		cart,
		rentals,
		addToCart,
		removeFromCart,
		clearCart,
		getCartTotal,
		getCartCount,
		rentMovie,
		rentAllInCart,
		isRented,
		getRentalByMovieId,
		isInCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used within CartProvider');
	}

	return context;
}