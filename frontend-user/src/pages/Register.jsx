import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Valider le nom
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    // Valider l'email
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    // Valider le mot de passe
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulation d'inscription
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
      );
      setLoading(false);
      // Aller à l'accueil
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-black/70 rounded-lg p-8 border border-gray-700">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600">Netflix</h1>
        </div>

        {/* Titre */}
        <h2 className="text-3xl font-bold mb-8">S&apos;inscrire</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-gray-700 border-2 ${errors.name ? "border-red-600" : "border-gray-600"} rounded px-4 py-3 text-white placeholder-gray-400`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-700 border-2 ${errors.email ? "border-red-600" : "border-gray-600"} rounded px-4 py-3 text-white placeholder-gray-400`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-gray-700 border-2 ${errors.password ? "border-red-600" : "border-gray-600"} rounded px-4 py-3 text-white placeholder-gray-400`}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmez le Mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full bg-gray-700 border-2 ${errors.confirmPassword ? "border-red-600" : "border-gray-600"} rounded px-4 py-3 text-white placeholder-gray-400`}
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Bouton */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-4 transition-colors"
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>

        {/* Lien connexion */}
        <p className="text-center mt-4 text-gray-400">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-semibold">
            Se connecter
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default Register;