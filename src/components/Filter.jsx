import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Filter = () => {
  const { categoryFilter, setCategoryFilter, priceFilter, setPriceFilter } =
    useContext(AppContext);

  const categories = [
    "Todos",
    "Higiene",
    "Desinfección",
    "Utensilios",
    "Limpieza",
    "Protección",
    "Lavandería",
    "Organización",
    "Aromatización",
    "Baño",
    "Pisos",
    "Muebles",
  ];

  const handleClearFilters = () => {
    setCategoryFilter("");
    setPriceFilter("");
  };

  return (
    <div className="filter-container">
      <h3>Filtrar Productos</h3>
      <div className="filter-row">
        <div className="form-group">
          <label>Categoría</label>
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category === "Todos" ? "" : category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ordenar por Precio</label>
          <select
            className="form-control"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Sin orden</option>
            <option value="low">Menor a Mayor</option>
            <option value="high">Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="btn btn-secondary btn-small"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filter;
