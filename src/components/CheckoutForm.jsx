import React, { useState } from "react";

const CheckoutForm = ({ total, userBudget, onConfirm, isProcessing }) => {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [showCvc, setShowCvc] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    // Formatear número de tarjeta con espacios cada 4 dígitos
    if (name === "number") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }

    // Formatear fecha de expiración con /
    if (
      name === "expiry" &&
      value.length === 2 &&
      !cardData.expiry.includes("/")
    ) {
      setCardData((prev) => ({ ...prev, [name]: value + "/" }));
      return;
    }

    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar número de tarjeta (16 dígitos sin espacios)
    const cardNumber = cardData.number.replace(/\s/g, "");
    if (!cardNumber.match(/^\d{16}$/)) {
      newErrors.number = "Número de tarjeta inválido (16 dígitos)";
    }

    // Validar fecha de expiración (MM/AA)
    if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.expiry = "Formato MM/AA inválido";
    }

    // Validar CVC (3 dígitos)
    if (!cardData.cvc.match(/^\d{3}$/)) {
      newErrors.cvc = "Código de seguridad inválido";
    }

    // Validar nombre
    if (!cardData.name.trim()) {
      newErrors.name = "Nombre del titular requerido";
    }

    // Validar presupuesto
    if (total > userBudget) {
      newErrors.budget = "El total excede tu presupuesto máximo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm();
    }
  };

  const handleClear = () => {
    setCardData({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Número de Tarjeta:</label>
        <input
          type="text"
          name="number"
          value={cardData.number}
          onChange={handleCardChange}
          placeholder="1234 1234 1234 1234"
          maxLength="19"
          className="form-control"
        />
        {errors.number && <span className="error">{errors.number}</span>}
      </div>

      <div className="form-group">
        <label>Fecha de Expiración (MM/AA):</label>
        <input
          type="text"
          name="expiry"
          value={cardData.expiry}
          onChange={handleCardChange}
          placeholder="MM/AA"
          maxLength="5"
          className="form-control"
        />
        {errors.expiry && <span className="error">{errors.expiry}</span>}
      </div>

      <div className="form-group">
        <label>Código de Seguridad:</label>
        <div className="cvc-input">
          <input
            type={showCvc ? "text" : "password"}
            name="cvc"
            value={cardData.cvc}
            onChange={handleCardChange}
            placeholder="***"
            maxLength="3"
            className="form-control"
          />
          <button
            type="button"
            onClick={() => setShowCvc(!showCvc)}
            className="show-cvc"
          >
            {showCvc ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {errors.cvc && <span className="error">{errors.cvc}</span>}
      </div>

      <div className="form-group">
        <label>Nombre del Titular:</label>
        <input
          type="text"
          name="name"
          value={cardData.name}
          onChange={handleCardChange}
          className="form-control"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {errors.budget && <div className="error">{errors.budget}</div>}

      <div className="payment-buttons">
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="loading-spinner"></span>
              Procesando...
            </>
          ) : (
            "Confirmar Compra"
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
