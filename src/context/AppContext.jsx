import React, { createContext, useState, useEffect } from "react";
import { products } from "../data/products";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userRequirements, setUserRequirements] = useState({
    name: "",
    budget: 0,
    address: "",
    deliveryType: "standard",
  });

  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Filtros
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Paginación
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Aplicar filtros
    let result = [...products];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (priceFilter === "low") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high") {
      result = result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Resetear a la primera página al cambiar filtros
    setHasMoreProducts(result.length > itemsPerPage);
  }, [categoryFilter, priceFilter]);

  useEffect(() => {
    // Calcular productos a mostrar basado en la página actual
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    setDisplayedProducts(productsToShow);
    setHasMoreProducts(endIndex < filteredProducts.length);
  }, [filteredProducts, currentPage]);

  const loadMoreProducts = () => {
    if (hasMoreProducts) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        userRequirements,
        setUserRequirements,
        products,
        filteredProducts: displayedProducts, // Solo enviamos los productos a mostrar
        setFilteredProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        categoryFilter,
        setCategoryFilter,
        priceFilter,
        setPriceFilter,
        loadMoreProducts,
        hasMoreProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
