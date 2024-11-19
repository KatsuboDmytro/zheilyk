import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, ErrorOption } from 'react-hook-form'
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import '../LogIn/logIn.scss'
import classNames from 'classnames'
import authService from '../../../services/access/authService'
import { useAppSelector } from '../../../app/hooks'

interface SignUpFormInputs {
	email: string
	password: string
	acceptTerms: boolean
}

export const SignUp: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<SignUpFormInputs>()
	const [type, setType] = useState('password')
	const [icon, setIcon] = useState(eyeOff)
	const [isAccepted, setIsAccepted] = useState(false)
  const [registered, setRegistered] = useState(false)
  const { language } = useAppSelector((state) => state.goods);
	const navigate = useNavigate()

	const handleToggle = () => {
		if (type === 'password') {
			setIcon(eye)
			setType('text')
		} else {
			setIcon(eyeOff)
			setType('password')
		}
	}

	const handleGoBack = () => {
		navigate(-1)
	}

	const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
		if (!isAccepted) {
			setError('acceptTerms', {
				type: 'manual',
				message: '* You must accept the terms',
			})
			return
		}

		try {
			await authService.register(language, data.email, data.password)
			setRegistered(true)
		} catch (error: any) {
			if (error.response?.data) {
				const { email, password } = error.response.data
				if (email) {
					setError('email', { type: 'manual', message: email[0] })
				}

				if (password) {
					setError('password', { type: 'manual', message: password[0] })
				}
			}
		}
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsAccepted(e.target.checked)
		if (e.target.checked) {
			clearErrors('acceptTerms')
		}
	}

	return (
		<section className='log'>
			<aside className='log__welcome'>
        {!registered ? (
          <>
            <div className='log__back' onClick={handleGoBack}>
              <img src='img/icons/arrow-left.svg' alt='arrow-left' />
              &nbsp;
              <span>Назад</span>
            </div>
            <div className='log__center'>
              <div className='log__hello'>
                <h1 className='log__title'>Привіт!</h1>
                <p className='log__description'>
                  Вже маєш акаунт?&nbsp;
                  <Link to='/log-in' className='log__action'>
                    Ввійти
                  </Link>
                </p>
              </div>
              <form className='log__form' onSubmit={handleSubmit(onSubmit)}>
                <div className='log__mail'>
                  <label htmlFor='email' className='log__label'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className={classNames('log__input', {
                      'log__input--error': errors?.email,
                    })}
                    placeholder='example@gmail.com'
                    {...register('email', { required: '* Email is required' })}
                  />
                  {errors.email && (
                    <span className='log__field--error'>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className='log__mail'>
                  <label htmlFor='password' className='log__label'>
                    Пароль
                  </label>
                  <div className='log__password'>
                    <input
                      type={type}
                      id='password'
                      className={classNames('log__input', {
                        'log__input--error': errors?.password,
                      })}
                      placeholder='Твій пароль'
                      {...register('password', {
                        required: '* Password is required',
                      })}
                    />
                    <span className='log__input--eye' onClick={handleToggle}>
                      <Icon icon={icon} size={25} />
                    </span>
                  </div>
                  {errors.password && (
                    <span className='log__field--error'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className='log__mail log__mail--box'>
                  <label htmlFor='checkbox' className='log__label'>
                    Прийняти все
                  </label>
                  <input
                    type='checkbox'
                    id='checkbox'
                    className='log__checkbox'
                    onChange={handleCheckboxChange}
                  />
                  {errors.acceptTerms && (
                    <span className='log__checkbox--error'>
                      {errors.acceptTerms.message}
                    </span>
                  )}
                </div>
                <button className='log__button' type='submit'>
                  Зайти
                </button>
              </form>
              <div className='log__or'>
                <div className='log__or--line'></div>
                <span className='log__or--text'>або</span>
                <div className='log__or--line'></div>
              </div>
            </div>
          </>
        ) : (
          <div className='log__hello'>
            <h1 className='log__title'>Перевір пошту</h1>
            <p className='log__description'>
              Ми вже надіслали тобі листа з посиланням для активації
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
