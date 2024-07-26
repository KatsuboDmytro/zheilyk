import { Navigate, Route, Routes } from 'react-router-dom';
import { Account, Cart, Catalog, Main, NotFound } from '../modules/pages';
import { App } from '../App';
import { Menu } from '../components';

export const Root = () => {

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="menu" element={<Menu />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
