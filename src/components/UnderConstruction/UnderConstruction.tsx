import React from "react";
import "./UnderConstruction.css";
import { Construction } from "lucide-react";

const UnderConstruction: React.FC = () => {
  return (
    <div className="under-construction">
      <div className="under-construction__icon">
        <Construction size={48} strokeWidth={2.5} />
      </div>
      <h1 className="under-construction__title">Página en construcción</h1>
      <p className="under-construction__message">
        Estamos trabajando en esta sección. Vuelve pronto para ver lo nuevo. 🚧
      </p>
    </div>
  );
};

export default UnderConstruction;
