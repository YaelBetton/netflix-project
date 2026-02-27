import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Simuler l'enregistrement
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((u) => u.email === formData.email);

    if (userExists) {
      setError("Un compte existe déjà avec cet email");
      return;
    }

    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name: formData.name, email: formData.email }));
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 pt-24">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Créer un compte</h2>
          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              S&apos;inscrire
            </Button>
          </form>
          <p className="text-center mt-4 text-gray-400">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
