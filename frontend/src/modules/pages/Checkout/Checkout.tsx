import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { Back, Loading } from '../../../components'
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
import { useTranslation } from 'react-i18next'
import useAuth from '../../../app/useAuth'
import './checkout.scss'

export const Checkout: React.FC = () => {
  const [t] = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false)
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
      delivery_method: 'new_post',
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
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;
  
    return (
      !!full_name.trim() &&
      phoneRegex.test(number) &&
      emailRegex.test(email) &&
      !!payment_type.trim() &&
      Object.keys(post_department).length > 0
    );
  };

  const handleCheckout = async () => {
    if (!isFormValid()) {
      setError(t("checkout.errors.all"));
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
        },
        post_department: {
          city: '',
          state: '',
          address: '',
        } as Record<string, any>,
      }
      console.log('clientData:', clientData)
      Object.entries(clientData.delivery_info.post_department).forEach(
        ([key, value], i) => {
          const val = value as { label: string | null; value: string };
          const label = val.label ?? '';
          if (i === 0) data.post_department.state = label;
          if (i === 1) data.post_department.city = label;
          if (i === 2) data.post_department.address = label;
        }
      ); 

      try {
        setError('')
        setIsLoading(true)
        const response = await cartService.createOrder(data, language);
        console.log("🚀 ~ handleCheckout ~ response:", response);
        window.location.href = response.checkout_url;
      } catch (error) {
        setIsLoading(false)
        setError(t("checkout.errors.manage"));
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
          isLoading ? (
            <Loading />
          ) : (
            <>
              <aside className='checkout__info'>
                <Back />
                <h1 className='checkout__title'>{t("checkout.title")}</h1>
                <ContactInfo
                  clientData={clientData}
                  handleChange={handleChange}
                />
                <DeliveryMethod
                  deliveryMethod={clientData.delivery_info.delivery_method}
                  handleChange={handleChange}
                />
                {clientData.delivery_info.delivery_method === 'new_post' ? (
                  <DeliveryDetails
                    handleChange={handleChange}
                    clientData={clientData}
                  />
                ) : (
                  <div className='account__pickup checkout__form'>
                    <article className='account__pickup--card'>
                      <img src='img/icons/geo.svg' alt='geo' />
                      <div className='account__pickup--card-data'>
                        <h3>{t("checkout.by_self.address")}</h3>
                        <p>{t("checkout.by_self.city")}</p>
                      </div>
                    </article>
                    <article className='account__pickup--card'>
                      <img src='img/icons/clock.svg' alt='clock' />
                      <div className='account__pickup--card-data'>
                        <h3>{t("checkout.by_self.info")}</h3>
                        <p>{t("checkout.by_self.time")}</p>
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
          <Empty text={t("checkout.empty_cart")} isCart={true} />
        )
      ) : (
        <Error isCart={true} />
      )}
		</section>
	)
}
