import Movie from "../models/Movie.js";

// @desc    Obtenir tous les films
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
  try {
    const {
      genre,
      year,
      minPrice,
      maxPrice,
      minRating,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 10,
    } = req.query;

    // Construction du filtre
    const filter = { isAvailable: true };

    if (genre) filter.genre = genre;
    if (year) filter.year = Number(year);
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Recherche textuelle
    let query;
    if (search) {
      query = Movie.find({
        ...filter,
        $text: { $search: search },
      });
    } else {
      query = Movie.find(filter);
    }

    // Tri
    query = query.sort(sort);

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit));

    // Exécution
    const movies = await query;
    const total = await Movie.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: movies.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un film par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      const error = new Error('Film non trouvé');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      const err = new Error('ID de film invalide');
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
};

// @desc    Créer un nouveau film
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      poster,
      backdrop,
      genre,
      year,
      duration,
      price,
      rating,
    } = req.body;

    // Créer le film
    const movie = await Movie.create({
      title,
      description,
      poster,
      backdrop,
      genre,
      year,
      duration,
      price,
      rating,
    });

    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      const err = new Error(messages.join(', '));
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
  try {
    // Mise à jour
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Retourner le document modifié
        runValidators: true, // Exécuter les validations
      },
    );

    if (!updatedMovie) {
      const error = new Error('Film non trouvé');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      const err = new Error(messages.join(', '));
      err.statusCode = 400;
      return next(err);
    }
    if (error.name === 'CastError') {
      const err = new Error('ID de film invalide');
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
  try {
    // Vérifier qu'il n'y a pas de locations
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      const error = new Error('Film non trouvé');
      error.statusCode = 404;
      return next(error);
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Film supprimé avec succès',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      const err = new Error('ID de film invalide');
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
  try {
    // Nombre total de films
    const totalMovies = await Movie.countDocuments();

    // Calcul du revenu total
    const totalRevenue = await Movie.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$rentalCount'] } },
        },
      },
    ]);

    // Statistiques par genre
    const bygenre = await Movie.aggregate([
      {
        $unwind: '$genre',
      },
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          avgRating: { $avg: '$rating' },
          totalRentals: { $sum: '$rentalCount' },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMovies,
        totalRedRevenue: totalRevenue[0]?.total || 0,
        bygenre,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir des films similaires
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
  try {
    // Trouver le film actuel
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      const error = new Error('Film non trouvé');
      error.statusCode = 404;
      return next(error);
    }

    // Trouver des films du même genre
    const similarMovies = await Movie.find({
      genre: { $in: movie.genre },
      _id: { $ne: movie._id }, // Exclure le film actuel
      isAvailable: true,
    })
      .sort({ rating: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: similarMovies.length,
      data: similarMovies,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      const err = new Error('ID de film invalide');
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
};
