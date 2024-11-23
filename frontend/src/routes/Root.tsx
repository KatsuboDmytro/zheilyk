import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  AccountActivationPage, Cart, Catalog, Checkout,
  Confirm, Contacts, Delivery, FAQs, GoodDetails, LogIn, Main, NotFound, SignUp, SuccessOrder,
  WarningList
} from '../modules/pages';
import { App } from '../App';
import { Menu } from '../components';
import { Reset } from '../modules/pages/Reset/Reset.module';
import { GridModal } from '../modules/pages/GoodDetails/components';
import React from 'react';

export const Root = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <React.Fragment>
    <Routes location={previousLocation || location}>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="menu" element={<Menu />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="good/:goodId" element={<GoodDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="reset" element={<Reset />} />
        <Route path="confirm/:token" element={<Confirm />} />
        <Route path="success-order" element={<SuccessOrder />} />
        <Route path="warning-list" element={<WarningList />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="faqs" element={<FAQs />} />
        <Route
          path="activate/:activationToken"
          element={<AccountActivationPage />}
          />
        {/* <Route path="/" element={<RequireAuth />}>
          <Route
          path="account"
          element={<Account />}
          />
          </Route> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    {previousLocation && (
      <Routes>
        <Route path="/modal" element={<GridModal />} />
      </Routes>
    )}
    </React.Fragment>
  );
};
