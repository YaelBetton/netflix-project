import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-3">Page introuvable</h2>
        <p className="text-gray-400 mb-8">Oups ! La page que vous recherchez n&apos;existe pas.</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"
        >
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
