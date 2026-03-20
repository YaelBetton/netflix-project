import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

const STORAGE_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      console.error(
        "Impossible de lire les informations utilisateur depuis le stockage local.",
      );
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction de connexion
  const login = async (email) => {
    try {
      // Simulation en attendant le branchement avec la vraie API.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`,
      };
      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  // Fonction d'inscription
  const register = async (name, email) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`,
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!user;
  };
  // Mettre à jour le profil
  const updateProfile = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates }; //ça ne vous rappelle rien ?
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };
  //On met à disposition les éléments pour être utilisés dans les composants
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    updateProfile,
  };
  return (
    <AuthContext.Provider value={value}>
      {" "}
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
}
// Hook personnalisé
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
