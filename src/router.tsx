import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './pages/product/product';
import Main from './pages/main/main';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default Router;
