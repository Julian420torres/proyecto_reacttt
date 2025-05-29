import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(AppContext);

  return (
    <tr>
      <td className="cart-item-name">
        <img
          src={item.image || `https://via.placeholder.com/60?text=${item.name}`}
          alt={item.name}
          className="cart-item-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/60?text=${item.name}`;
          }}
        />
        {item.name}
      </td>
      <td>${item.price.toLocaleString()}</td>
      <td>
        <div className="quantity-control">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>${(item.price * item.quantity).toLocaleString()}</td>
      <td>
        <button
          className="remove-item-btn"
          onClick={() => removeFromCart(item.id)}
          title="Eliminar producto"
        >
          ×
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
