import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>Suministros de Limpieza</h2>
      <div className="nav-buttons">
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          Cancelar Compra
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/cart")}>
          Ver Carrito
        </button>
      </div>
    </div>
  );
};

export default Navbar;
