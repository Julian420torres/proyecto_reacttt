import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, userRequirements, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [showCvc, setShowCvc] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const deliveryFee = 10000;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const validateCard = () => {
    const newErrors = {};

    // Validar número de tarjeta (simplificado)
    if (!cardData.number.match(/^\d{16}$/)) {
      newErrors.number = "Número de tarjeta inválido";
    }

    // Validar fecha de expiración
    if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.expiry = "Formato MM/AA inválido";
    }

    // Validar CVC
    if (!cardData.cvc.match(/^\d{3}$/)) {
      newErrors.cvc = "Código inválido";
    }

    // Validar nombre
    if (!cardData.name.trim()) {
      newErrors.name = "Nombre del titular requerido";
    }

    // Validar presupuesto
    if (total > userRequirements.budget) {
      newErrors.budget = "El total excede tu presupuesto máximo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      setIsProcessing(true);

      // Simular procesamiento de pago
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        clearCart();

        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }, 2000);
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>¡Pago realizado con éxito!</h2>
        <p>Serás redirigido a la página principal para realizar otra compra.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>

      <div className="cart-content">
        <div className="cart-items-section">
          <h2>Productos Seleccionados</h2>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="cart-summary-section">
          <h2>Resumen de Compra</h2>

          <div className="summary-details">
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Domicilio: ${deliveryFee.toLocaleString()}</p>
            <p className="total">Total: ${total.toLocaleString()}</p>
            <p>
              Presupuesto máximo: ${userRequirements.budget.toLocaleString()}
            </p>

            {errors.budget && <p className="error">{errors.budget}</p>}
          </div>

          <div className="cart-buttons">
            <button onClick={handleContinueShopping}>Seguir Comprando</button>
            <button onClick={handleCancel}>Cancelar Compra</button>
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h2>Información de Pago</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Número de Tarjeta:</label>
            <input
              type="text"
              name="number"
              value={cardData.number}
              onChange={handleCardChange}
              placeholder="1234123412341234"
              maxLength="16"
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
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="payment-buttons">
            <button type="submit" disabled={isProcessing || cart.length === 0}>
              {isProcessing ? "Procesando..." : "Confirmar Compra"}
            </button>
            <button
              type="button"
              onClick={() =>
                setCardData({
                  number: "",
                  expiry: "",
                  cvc: "",
                  name: "",
                })
              }
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
