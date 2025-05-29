import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const ProductDetail = ({ product }) => {
  const { addToCart } = useContext(AppContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Oculta después de 2 segundos
  };

  return (
    <div className="product-detail">
      <img
        src={
          product.image ||
          `https://via.placeholder.com/300?text=${product.name}`
        }
        alt={product.name}
        className="product-detail-image"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/300?text=${product.name}`;
        }}
      />
      <h3>{product.name}</h3>
      <p className="product-price">${product.price.toLocaleString()}</p>

      <div className="product-detail-attributes">
        <div className="attribute">
          <span className="attribute-label">Categoría:</span>
          <span className="attribute-value">{product.category}</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">Marca:</span>
          <span className="attribute-value">{product.brand}</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">Disponibles:</span>
          <span className="attribute-value">{product.stock}</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">Calificación:</span>
          <span className="attribute-value">{product.rating}/5</span>
        </div>
      </div>

      <p className="product-detail-description">{product.description}</p>

      <button
        className="btn btn-primary add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        {product.stock > 0 ? "Agregar al Carrito" : "Agotado"}
      </button>

      {showNotification && (
        <div className="add-to-cart-notification">
          ✓ {product.name} añadido al carrito
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
