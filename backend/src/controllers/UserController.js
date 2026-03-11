// Logique pour récupérer un utilisateur
export const getUserProfile = (req, res) => {
 const userId = req.params.id;
 // Logique métier (ex: appel base de données) ici...
 res.status(200).json({
 id: userId,
 name: "Marc"
 });
};
// Logique pour créer un utilisateur
export const createUser = (req, res) => {
 res.status(201).json({ message: "Utilisateur créé !" });
};