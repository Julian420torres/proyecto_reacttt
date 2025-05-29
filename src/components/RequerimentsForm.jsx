import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RequirementsForm = () => {
  const { setUserRequirements } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    address: "",
    deliveryType: "standard",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
    else if (formData.name.length > 20) newErrors.name = "Máximo 20 caracteres";

    if (!formData.budget) newErrors.budget = "Presupuesto es requerido";
    else if (isNaN(formData.budget)) newErrors.budget = "Debe ser un número";

    if (!formData.address.trim()) newErrors.address = "Dirección es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUserRequirements(formData);
      navigate("/products");
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      budget: "",
      address: "",
      deliveryType: "standard",
    });
    setErrors({});
  };

  return (
    <div className="requirements-container">
      <h1>Requerimientos De Compra</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="20"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Presupuesto Máximo:</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
          {errors.budget && <span className="error">{errors.budget}</span>}
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Tipo de Entrega:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="deliveryType"
                value="standard"
                checked={formData.deliveryType === "standard"}
                onChange={handleChange}
              />
              Estándar (5-7 días)
            </label>
            <label>
              <input
                type="radio"
                name="deliveryType"
                value="express"
                checked={formData.deliveryType === "express"}
                onChange={handleChange}
              />
              Express (1-2 días)
            </label>
          </div>
        </div>

        <div className="button-group">
          <button type="submit">Iniciar Compra</button>
          <button type="button" onClick={handleClear}>
            Limpiar Campos
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequirementsForm;
