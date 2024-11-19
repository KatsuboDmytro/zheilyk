import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { accessTokenService } from '../../../services/access/accessTokenService';
import { Loading } from '../../../components';
import { setCart } from '../../../features/cartSlice';
import cartService from '../../../services/goods/cartService';
import { Error } from '../../../components/Warnings/Error';
import { Empty } from '../../../components/Warnings/Empty';
import { Good } from './components/Good';
import './cart.scss';

export const Cart: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.goods.language as string);

  useEffect(() => {
    const fetch = async () => {
      const accessToken = accessTokenService.get();
      if (accessToken !== null) {
        setIsLoading(true);
        try {
          const response = await cartService.getCart(language);
          dispatch(setCart(response[0].basket_items));

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          if (error instanceof Error) {
            setErrorText('An unexpected error occurred');
          } else {
            setErrorText('An unknown error occurred');
          }
        }
      }
    };
    fetch();
  }, [dispatch, language]);

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
      {isLoading ? (
        <Loading />
      ) : errorText.length !== 0 ? (
        <Error />
      ) : cart.length === 0 ? (
        <Empty text={'Ваш кошик порожній'} />
      ) : (
        <>
          <h1 className='cart__title'>Кошик</h1>
          <div className='cart__grid'>
            <aside className='cart__items'>
              {cart.map((good) => (
                <Good key={good.id} good={good} />
              ))}
            </aside>
            <aside className='cart__total'>
              <h3 className='cart__price'>Загальна сума: {totalPrice} грн</h3>
              <button
                className='cart__button'
                onClick={handleCheckout}>
                Оформити замовлення
              </button>
            </aside>
          </div>
        </>
        )
      }
    </section>
  );
};
