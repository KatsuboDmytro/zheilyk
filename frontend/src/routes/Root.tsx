import { Navigate, Route, Routes } from 'react-router-dom';
import { Account, AccountActivationPage, Cart, Catalog, GoodDetails, LogIn, Main, NotFound, SignUp } from '../modules/pages';
import { App } from '../App';
import { Menu, RequireAuth } from '../components';

export const Root = () => {

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="menu" element={<Menu />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="good/:goodId" element={<GoodDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="activate/:activationToken"
          element={<AccountActivationPage />}
        />
        <Route path="/" element={<RequireAuth />}>
          <Route
            path="account"
            element={<Account />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
