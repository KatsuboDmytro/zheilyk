import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import classNames from 'classnames'
import { Loading } from '../../../components'
import authService from '../../../services/access/authService'
import './logIn.scss'
import { useTranslation } from 'react-i18next'

interface FormInputs {
	email: string
	password: string
}

export const Reset: React.FC = () => {
  const [t] = useTranslation("global");
  const { language } = useAppSelector((state) => state.goods)
	const [isLoading, setIsLoading] = useState(false)
  const [errorLife, setErrorLife] = useState(false)
  const [isResetSend, setIsResetSend] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const {
    register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormInputs>()
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate(-1)
	}

	const onSubmit: SubmitHandler<FormInputs> = async ({ email }) => {
		try {
      setIsLoading(true)
      await authService.reset(language, email);
			setIsResetSend(true)
			setErrorLife(false)
		} catch (error: any) {
			setError(error)
			setErrorLife(true)

			setTimeout(() => {
				setErrorLife(false)
			}, 5000)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='log'>
			<aside className='log__welcome'>
        {!isResetSend ? (
        <>
          <div className='log__back' onClick={handleGoBack}>
            <img src='img/icons/arrow-left.svg' alt='arrow-left' />
            &nbsp;
            <span>{t("reset.back")}</span>
          </div>
          <div className='log__center'>
            <div className='log__hello'>
              <h1 className='log__title'>{t("reset.title")}</h1>
            </div>
            <p className='log__description'></p>
            <form onSubmit={handleSubmit(onSubmit)} className='log__form'>
              <div className='log__mail'>
                <label htmlFor='email' className='log__label'>
                  {t("reset.email.standart")}
                </label>
                <input
                  type='email'
                  id='email'
                  className={classNames('log__input', {
                    'log__input--error': error,
                  })}
                  placeholder='example@gmail.com'
                  {...register('email', { required: t("reset.email.error") })}
                />
                {errors.email && (
                  <span className='log__field--error'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <button
                className='log__button'
                type='submit'
                disabled={
                  isLoading ||
                  errorLife ||
                  watch('email') === ''
                }
              >
                {t("reset.send")}
                {isLoading && <Loading color={'fff'} btnSize={'30'} top={'12px'} />}
              </button>
            </form>
          </div>
        </>
        ) : (
          <div className='log__hello'>
            <h1 className='log__title'>{t("reset.check_email")}</h1>
            <p className='log__description'>
              {t("reset.check_email_description")}
            </p>
          </div>
        )}
			</aside>
			<aside className='log__img'>
				<img src='img/logOrSign/logIn-photo.png' alt='logOrSign' />
			</aside>
		</section>
	)
}
