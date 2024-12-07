import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Back, Loading } from '../../../components';
import { setCart } from '../../../features/cartSlice';
import cartService from '../../../services/goods/cartService';
import { Error } from '../../../components/Warnings/Error';
import { Empty } from '../../../components/Warnings/Empty';
import { Good } from './components/Good';
import './cart.scss';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../app/useAuth';
import useNotification from '../../../app/useNotification';

export const Cart: React.FC = () => {
  const [t] = useTranslation("global");
  const { cart } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useNotification();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.goods.language as string);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await cartService.getCart();
        dispatch(setCart(response[0].basket_items));
      } catch (error) {
        showError(String(error) || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetch();
  }, [dispatch, language, navigate]);

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, good) => acc + good.price * good.quantity, 0));
  }, [cart]);

  const handleCheckout = async () => {
    try {
      navigate('/checkout');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <section className='cart container'>
      {isAuthenticated ? (
        cart.length > 0 ? (
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Back />
              <h1 className='cart__title'>{t("cart.title")}</h1>
              <div className='cart__grid'>
                <aside className='cart__items'>
                  {cart.map((good) => (
                    <Good key={good.id} good={good} />
                  ))}
                </aside>
                <aside className='cart__total'>
                  <h3 className='cart__price'>{t("cart.total")}: {totalPrice} {t("cart.good.uah")}</h3>
                    <div className="cart__button">
                      <p className="mas">{t("cart.checkout")}</p>
                      <button
                        className='cart__button'
                        onClick={handleCheckout}
                      >
                        {t("cart.checkout")}
                      </button>
                    </div>
                </aside>
              </div>
            </>
          )
        ) : (
          <Empty text={t("cart.empty")} isCart={true} />
        )
      ) : (
        <Error isCart={true} />
      )}
    </section>
  );
};
