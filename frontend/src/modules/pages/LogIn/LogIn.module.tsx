import React, { useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { login } from '../../../features/authSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import './logIn.scss'
import classNames from 'classnames'

interface FormInputs {
	email: string
	password: string
}

export const LogIn: React.FC = () => {
  const { language } = useAppSelector((state) => state.goods);
	const dispatch = useAppDispatch()
  const [errorLife, setErrorLife] = useState(false);
	const [error, setError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>()
	const [type, setType] = useState('password')
	const [icon, setIcon] = useState(eyeOff)
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
    navigate(-1);
	}

	const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
		try {
			await dispatch(login({language, email, password})).unwrap()
      navigate('/')
      setError('')
      setErrorLife(false)
		} catch (error: any) {
      setError(error)
      setErrorLife(true)

      setTimeout(() => {
        setErrorLife(false)
      }, 5000);
		}
	}

	return (
		<section className='log'>
			<aside className='log__welcome'>
				<div className='log__back' onClick={handleGoBack}>
					<img src='img/icons/arrow-left.svg' alt='arrow-left' />
					&nbsp;
					<span>Назад</span>
				</div>
				<div className='log__center'>
					<div className='log__hello'>
						<h1 className='log__title'>Раді бачити знову!</h1>
						<p className='log__description'>
							Ще не маєш акаунт?&nbsp;
							<Link to='/sign-up' className='log__action'>
								Зареєструватись
							</Link>
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='log__form'>
						<div className='log__mail'>
							<label htmlFor='email' className='log__label'>
								Email
							</label>
							<input
								type='email'
								id='email'
                className={classNames(
                  'log__input',
                  { 'log__input--error': error }
                )}
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
									className={classNames(
                    'log__input',
                    { 'log__input--error': error }
                  )}
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
            <div className="log__above">
              {errorLife && <span className='log__above--error'>{error}</span>}
              <a className='log__forget'>Забули пароль?</a>
            </div>
						<button className='log__button' type='submit'>
							Зайти
						</button>
					</form>
				</div>
				<div className='log__or'>
					<div className='log__or--line'></div>
					<span className='log__or--text'>або</span>
					<div className='log__or--line'></div>
				</div>
			</aside>
			<aside className='log__img'>
				<img src='img/logOrSign/logIn-photo.png' alt='logOrSign' />
			</aside>
		</section>
	)
}
