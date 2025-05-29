import React from "react";

const Product = ({ product, onSelect }) => {
  const getStockClass = () => {
    if (product.stock > 20) return "in-stock";
    if (product.stock > 0) return "low-stock";
    return "out-of-stock";
  };

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <img
        src={
          product.image ||
          `https://via.placeholder.com/100?text=${product.name}`
        }
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/100?text=${product.name}`;
        }}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <span className={`product-stock ${getStockClass()}`}>
          {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
        </span>
        <span className="product-category">{product.category}</span>
      </div>
    </div>
  );
};

export default Product;
