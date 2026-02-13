import { useState } from "react";

function MovieDescription({ description }) {
  /* Todo : Créez les variables d’état nécessaires et initialisez-les */
  /* Todo : Créez la fonction qui permet de changer l’état en cliquant sur le bouton */

  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <p className={isExpanded ? "" : "line-clamp-2"}>{description} </p>
      <button onClick={handleClick}>{isExpanded ? "Voir moins" : "Voir plus"}</button>
    </div>
  );
}

export default MovieDescription;
