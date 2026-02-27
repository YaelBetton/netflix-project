import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 px-4 pt-24">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page non trouvée</h2>
        <p className="text-gray-400 mb-8 text-center">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link to="/">
          <Button>Retour à l&apos;accueil</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
