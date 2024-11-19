import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useAppSelector } from '../../../app/hooks'
import classNames from 'classnames'
import { Loading } from '../../../components'
import authService from '../../../services/access/authService'
import { useTranslation } from 'react-i18next'
import './logIn.scss'

interface FormInputs {
	email: string
	password: string
}

export const LogIn: React.FC = () => {
  const [t] = useTranslation("global");
  const { language } = useAppSelector((state) => state.goods)
  const [type, setType] = useState('password')
	const [icon, setIcon] = useState(eyeOff)
	const [isLoading, setIsLoading] = useState(false)
	const [errorLife, setErrorLife] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const {
    register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormInputs>()
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

	const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
		try {
      setIsLoading(true)
      await authService.login(language, email, password);
			navigate('/')
			setError('')
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
				<div className='log__back' onClick={handleGoBack}>
					<img src='img/icons/arrow-left.svg' alt='arrow-left' />
					&nbsp;
					<span>{t("login.back")}</span>
				</div>
				<div className='log__center'>
					<div className='log__hello'>
						<h1 className='log__title'>{t("login.title")}</h1>
						<p className='log__description'>
              {t("login.description")}&nbsp;
							<Link to='/sign-up' className='log__action'>
                {t("login.action")}
							</Link>
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className='log__form'>
						<div className='log__mail'>
							<label htmlFor='email' className='log__label'>
                {t("login.email.standart")}
							</label>
							<input
								type='email'
								id='email'
								className={classNames('log__input', {
									'log__input--error': error,
								})}
								placeholder='example@gmail.com'
								{...register('email', { required: t("login.email.error") })}
							/>
							{errors.email && (
								<span className='log__field--error'>
									{errors.email.message}
								</span>
							)}
						</div>
						<div className='log__mail'>
							<label htmlFor='password' className='log__label'>
                {t("login.password.standart")}
							</label>
							<div className='log__password'>
								<input
									type={type}
									id='password'
									className={classNames('log__input', {
										'log__input--error': error,
									})}
									placeholder={t("login.password.standart")}
									{...register('password', {
										required: t("login.password.error"),
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
						<div className='log__above'>
							{errorLife && <span className='log__above--error'>{error}</span>}
              <Link to="/reset" className='log__forget'>{t("login.forget")}</Link>
						</div>
						<button
							className='log__button'
							type='submit'
							disabled={
								isLoading ||
								errorLife ||
								watch('email') === '' ||
								watch('password') === ''
							}
            >
							{t("login.submit")}
							{isLoading && <Loading color={'fff'} btnSize={'30'} top={'12px'} />}
						</button>
            <div className='log__or'>
              <div className='log__or--line'></div>
              <span className='log__or--text'>{t("login.or")}</span>
              <div className='log__or--line'></div>
            </div>
            <button
              className='log__button'
              type='submit'
              disabled={
                isLoading ||
                errorLife ||
                watch('email') === '' ||
                watch('password') === ''
              }>
              Google
              {isLoading && <Loading color={'fff'} btnSize={'30'} top={'12px'} />}
            </button>
					</form>
				</div>
			</aside>
			<aside className='log__img'>
				<img src='img/logOrSign/logIn-photo.png' alt='logOrSign' />
			</aside>
		</section>
	)
}
