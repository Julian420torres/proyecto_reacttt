import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import RequirementsForm from "./components/RequerimentsForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<RequirementsForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
