import React, { useEffect, useState } from 'react'
import { checkAuth } from '../../../features/authSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import './cart.scss'
import { Link } from 'react-router-dom'
import { accessTokenService } from '../../../services/access/accessTokenService'
import { CartType } from '../../../types/Cart'
import { getCartAsync } from '../../../features/goodsSlice'
import { Loading } from '../../../components'

export const Cart: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth)
	const { cart } = useAppSelector((state) => state.goods)
	console.log("🚀 ~ cart:", cart)
	const [number, setNumber] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [errorText, setErrorText] = useState('')

  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.goods);

  // const cartLength = cart.basket_items.length;

	useEffect(() => {
    dispatch(checkAuth(language));
  
    const fetch = async () => {
      const accessToken = accessTokenService.get();
      if (accessToken !== null) {
        setIsLoading(true);
        try {
          const userId = user?.id?.toString() || '';
          await dispatch(getCartAsync(language));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setErrorText(error as string);
        }
      }
    };
    fetch();
  }, [dispatch, user?.id]);  

	const handlePlusQuantity = () => {
		if (number < 5) {
			setNumber((prev) => prev + 1)
		}

		return
	}

	const handleMinusQuantity = () => {
		if (number > 1) {
			setNumber((prev) => prev - 1)
		}

		return
	}

	const handleCheckout = () => {
		console.log('Checkout')
	}

	return (
    <section className='cart container'>
      {isLoading ? (
        <Loading />
      ) : errorText.length !== 0 ? (
        <p className='catalog__error'>{errorText}</p>
        ) : (
          false ? (
              <img
                src="img/main/cartIsEmpty.jpg"
                alt="cartIsEmpty"
                className="cart__empty"
              />
          ) : (
            <>
              <h1 className='cart__title'>Кошик</h1>
              <div className='cart__grid'>
                <aside className='cart__items'>
                  {Array(5).map(item => (
                    <article className='account__order--card account__order--cart'>
                      <img
                        src={`https://inst-store-api.onrender.com/{item.images}`}
                        alt={item.color}
                        className='account__order--card-img'
                      />
                      <div className='account__order--card-data'>
                        <div>
                          <h3 className='account__order--card-title'>item.name</h3>
                          <p>Бренд: item.brand</p>
                          <p>Колір: item.color</p>
                          <p>Розмір: item.size</p>
                        </div>
                        <div className='account__order--right'>
                          <div>
                            <p className='account__order--card-text'>
                              Ціна: {item.price} грн
                            </p>
                            <p className='account__order--card-text'>Кількість: {5}</p>
                          </div>
                          <div className='account__amount'>
                            <div className='account__amount--count'>
                              <button
                                className='account__amount--count-button'
                                onClick={handleMinusQuantity}>
                                -
                              </button>
                              <span className='account__amount--count-number'>
                                {number}
                              </span>
                              <button
                                className='account__amount--count-button'
                                onClick={handlePlusQuantity}>
                                +
                              </button>
                            </div>
                          </div>
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 256 256'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M216 48H176V40C176 33.6348 173.471 27.5303 168.971 23.0294C164.47 18.5286 158.365 16 152 16H104C97.6348 16 91.5303 18.5286 87.0294 23.0294C82.5286 27.5303 80 33.6348 80 40V48H40C37.8783 48 35.8434 48.8429 34.3431 50.3431C32.8429 51.8434 32 53.8783 32 56C32 58.1217 32.8429 60.1566 34.3431 61.6569C35.8434 63.1571 37.8783 64 40 64H48V208C48 212.243 49.6857 216.313 52.6863 219.314C55.6869 222.314 59.7565 224 64 224H192C196.243 224 200.313 222.314 203.314 219.314C206.314 216.313 208 212.243 208 208V64H216C218.122 64 220.157 63.1571 221.657 61.6569C223.157 60.1566 224 58.1217 224 56C224 53.8783 223.157 51.8434 221.657 50.3431C220.157 48.8429 218.122 48 216 48ZM112 168C112 170.122 111.157 172.157 109.657 173.657C108.157 175.157 106.122 176 104 176C101.878 176 99.8434 175.157 98.3431 173.657C96.8429 172.157 96 170.122 96 168V104C96 101.878 96.8429 99.8434 98.3431 98.3431C99.8434 96.8429 101.878 96 104 96C106.122 96 108.157 96.8429 109.657 98.3431C111.157 99.8434 112 101.878 112 104V168ZM160 168C160 170.122 159.157 172.157 157.657 173.657C156.157 175.157 154.122 176 152 176C149.878 176 147.843 175.157 146.343 173.657C144.843 172.157 144 170.122 144 168V104C144 101.878 144.843 99.8434 146.343 98.3431C147.843 96.8429 149.878 96 152 96C154.122 96 156.157 96.8429 157.657 98.3431C159.157 99.8434 160 101.878 160 104V168ZM160 48H96V40C96 37.8783 96.8429 35.8434 98.3431 34.3431C99.8434 32.8429 101.878 32 104 32H152C154.122 32 156.157 32.8429 157.657 34.3431C159.157 35.8434 160 37.8783 160 40V48Z'
                              fill='black'
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  ))}
                </aside>
                <aside className='cart__total'>
                  <h3 className='cart__price'>Загальна сума: 507.12 грн</h3>
                  <Link
                    to='/checkout'
                    className='cart__button'
                    onClick={handleCheckout}>
                    Оформити замовлення
                  </Link>
                </aside>
              </div>
            </>
          )
        )}
		</section>
	)
}
