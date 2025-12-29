import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Cards from "./pages/Cards";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductsA from "./pages/ProductsA";
import Collections from "./pages/Collections";
import Support from "./pages/Support";
import Clothshop from "./pages/Clothshop";
import FAQ from "./components/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/all-products" element={<ProductsA />} />
        <Route path="/carts" element={<Cards />} />
        <Route path="/support" element={<Support />} />
        <Route path="/clothshop" element={<Clothshop />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
