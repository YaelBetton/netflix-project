import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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
    setMessage("");

    // Simulation de connexion
    setTimeout(() => {
      // Sauvegarde locale de l'utilisateur (temporaire)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          name: formData.email.split("@")[0],
        })
      );

      setLoading(false);
      setMessage("Connexion réussie ! Redirection...");
      // Aller à la page d'accueil
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm bg-black/70 rounded-lg p-8 border border-gray-700">
          {/* Logo NETFLIX */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600">NETFLIX</h1>
          </div>

          {/* Titre */}
          <h2 className="text-3xl font-bold text-center mb-8">Se connecter</h2>

          {/* Message de succès */}
          {message && (
            <div className="bg-green-600 text-white p-3 rounded mb-4 text-center">
              {message}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-gray-700 border-2 ${
                  errors.email ? "border-red-600" : "border-gray-600"
                } rounded px-4 py-3 text-white placeholder-gray-400`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-700 border-2 ${
                  errors.password ? "border-red-600" : "border-gray-600"
                } rounded px-4 py-3 text-white placeholder-gray-400`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Bouton Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-6 transition-colors"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          {/* Lien inscription */}
          <p className="text-center mt-4 text-gray-400">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-red-600 hover:underline font-semibold">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
