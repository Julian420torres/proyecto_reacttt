import React, { useState, useEffect, useContext } from "react";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import Filter from "./Filter";
import Navbar from "./Navbar";
import { AppContext } from "../context/AppContext";

const ProductList = () => {
  const { filteredProducts, loadMoreProducts, hasMoreProducts } =
    useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 100 ||
      loading ||
      !hasMoreProducts
    ) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loadMoreProducts();
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMoreProducts]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="product-list-container">
      <Navbar />
      <h1>Productos De Limpieza</h1>

      <Filter />

      <div className="product-content">
        <div className="product-scroll-section">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
            />
          ))}
          {loading && <div className="loading">Cargando más productos...</div>}
          {!hasMoreProducts && filteredProducts.length > 0 && (
            <div className="end-message">No hay más productos para mostrar</div>
          )}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              No se encontraron productos con estos filtros
            </div>
          )}
        </div>

        <div className="product-detail-section">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} />
          ) : (
            <div className="no-product-selected">
              Selecciona un producto para ver los detalles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
