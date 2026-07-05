import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<ProductList />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
