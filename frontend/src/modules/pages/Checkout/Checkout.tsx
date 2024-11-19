import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { Loading } from '../../../components'
import { Empty } from '../../../components/Warnings/Empty'
import { Error } from '../../../components/Warnings/Error'
import { useNavigate } from 'react-router-dom'
import ContactInfo from './components/ContactInfo'
import DeliveryMethod from './components/DeliveryMethod'
import DeliveryDetails from './components/DeliveryDetails'
import PaymentMethod from './components/PaymentMethod'
import OrderSummary from './components/OrderSummary'
import Comment from './components/Comment'
import cartService from '../../../services/goods/cartService'
import useAuth from '../../../app/useAuth'
import './checkout.scss'
import './scroll.scss'

export const Checkout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { cart } = useAppSelector((state) => state.cart);
  const language = useAppSelector((state) => state.goods.language as string);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    user: null,
    payment_type: '',
    delivery_info: {
      full_name: '',
      number: '',
      email: '',
      post_department: {},
      comments: '',
      delivery_method: 'New Post',
      order: null,
    },
  });

  const handleChange = useCallback(
    (field: keyof typeof clientData, value: string | object) => {
      const fieldParts = field.split('.')

      setClientData((prevData: any) => {
        let updatedData = { ...prevData }

        if (fieldParts.length === 1) {
          updatedData[fieldParts[0]] = value
        } else if (fieldParts.length === 2) {
          const [parent, child] = fieldParts
          updatedData = {
            ...prevData,
            [parent]: {
              ...prevData[parent],
              [child]: value,
            },
          }
        }

        return updatedData
      })
    },
    []
  );

  const isFormValid = (): boolean => {
    const { full_name, number, email, post_department } = clientData.delivery_info;
    const payment_type = clientData.payment_type;
  
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;
  
    // Check if all required fields are valid
    return (
      !!full_name.trim() && // Full name is not empty
      phoneRegex.test(number) && // Valid phone number
      emailRegex.test(email) && // Valid email
      !!payment_type.trim() && // Payment type is not empty
      Object.keys(post_department).length > 0 // Post department is populated
    );
  };

  const handleCheckout = async () => {
    if (!isFormValid()) {
      setError('Заповніть ВСІ поля коректно');
      return
    } else {
      const data = {
        payment_type: clientData.payment_type,
        delivery_info: {
          full_name: clientData.delivery_info.full_name,
          number: clientData.delivery_info.number,
          email: clientData.delivery_info.email,
          comments: clientData.delivery_info.comments,
          delivery_type: clientData.delivery_info.delivery_method,
          order: 'null',
          post_department: {
            city: '',
            state: '',
            address: '',
          } as Record<string, any>,
        },
      }

      Object.entries(clientData.delivery_info.post_department).forEach(
        ([key, value], i) => {
          const val = value as { label: string; value: string }
          if (i === 0) data.delivery_info.post_department.state = val.label
          if (i === 1) data.delivery_info.post_department.city = val.label
          if (i === 2) data.delivery_info.post_department.address = val.label
        }
      )

      console.log('data:', data)
      try {
        setError('')
        setIsLoading(true)
        const response = await cartService.createOrder(data, language);
        console.log("🚀 ~ handleCheckout ~ response:", response);
        navigate('/success-order');
      } catch (error) {
        setIsLoading(false)
        setError('Помилка при оформленні замовлення');
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [error]);

	return (
		<section className='checkout container'>
      {isAuthenticated ? (
        cart.length > 0 ? (
          !isLoading ? (
            <Loading />
          ) : (
            <>
              <aside className='checkout__info'>
                <h1 className='checkout__title'>Оформлення замовлення</h1>
                <ContactInfo
                  clientData={clientData}
                  handleChange={handleChange}
                />
                <DeliveryMethod
                  deliveryMethod={clientData.delivery_info.delivery_method}
                  handleChange={handleChange}
                />
                {clientData.delivery_info.delivery_method === 'New Post' ? (
                  <DeliveryDetails
                    handleChange={handleChange}
                    clientData={clientData}
                  />
                ) : (
                  <div className='account__pickup checkout__form'>
                    <article className='account__pickup--card'>
                      <img src='img/icons/geo.svg' alt='geo' />
                      <div className='account__pickup--card-data'>
                        <h3>Адреса магазину</h3>
                        <p>м.Чернівці, Ентузіастів, 3А</p>
                      </div>
                    </article>
                    <article className='account__pickup--card'>
                      <img src='img/icons/clock.svg' alt='clock' />
                      <div className='account__pickup--card-data'>
                        <h3>Графік роботи магазину</h3>
                        <p>10:00 - 19:00</p>
                      </div>
                    </article>
                  </div>
                )}
                <PaymentMethod
                  payment={clientData.payment_type}
                  handleChange={handleChange}
                />
                <Comment
                  comment={clientData.delivery_info.comments}
                  handleChange={handleChange}
                />
              </aside>
              <OrderSummary
                handleCheckout={handleCheckout}
                cart={cart}
                formValid={isFormValid}
                error={error}
                isLoading={isLoading}
              />
            </>
          )
        ) : (
          <Empty text={'Ваш кошик порожній.'} isCart={true} />
        )
      ) : (
        <Error isCart={true} />
      )}
		</section>
	)
}
