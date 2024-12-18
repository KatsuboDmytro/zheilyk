import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useAppSelector } from '../../../app/hooks'
import classNames from 'classnames'
import { Loading } from '../../../components'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../../services/access/authService'
import { useTranslation } from 'react-i18next'
import useNotification from '../../../app/useNotification'

interface FormInputs {
	new_password: string
	confirm_password: string
}

export const Confirm: React.FC = () => {
	const [t] = useTranslation('global')
	const { language } = useAppSelector((state) => state.goods)
	const [passwordVisibility, setPasswordVisibility] = useState({
		new_password: false,
		confirm_password: false,
	})
	const [isLoading, setIsLoading] = useState(false)
	const { showSuccess, showError } = useNotification()
	const { token } = useParams() as { token: string }
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormInputs>()

	const handleToggle = (field: 'new_password' | 'confirm_password') => {
		setPasswordVisibility((prev) => ({
			...prev,
			[field]: !prev[field],
		}))
	}

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		const { new_password, confirm_password } = data

		try {
			if (new_password !== confirm_password) {
				showError(t('reset.new_password.error'))
				return
			}

			setIsLoading(true)
			await authService.confirm(language, new_password, confirm_password, token)
			showSuccess(t('signup.title'))
			setTimeout(() => {
				navigate('/log-in')
			}, 2000)
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || 'An unknown error occurred'
			showError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='log'>
			<aside className='log__welcome'>
				<div className='log__center'>
					<h1 className='log__title'>{t('reset.title')}</h1>
					<p className='log__description'></p>
					<form onSubmit={handleSubmit(onSubmit)} className='log__form'>
						<div className='log__mail'>
							<label htmlFor='new_password' className='log__label'>
								{t('reset.new_password.standart')}
							</label>
							<div className='log__password'>
								<input
									type={passwordVisibility.new_password ? 'text' : 'password'}
									id='new_password'
									className={classNames('log__input', {
										'log__input--error': errors.new_password,
									})}
									placeholder={t('reset.new_password.standart')}
									{...register('new_password', {
										required: t('reset.new_password.error'),
									})}
								/>
								<span
									className='log__input--eye'
									onClick={() => handleToggle('new_password')}>
									<Icon
										icon={passwordVisibility.new_password ? eye : eyeOff}
										size={25}
									/>
								</span>
							</div>
						</div>

						<div className='log__mail'>
							<label htmlFor='confirm_password' className='log__label'>
								{t('reset.confirm_password.standart')}
							</label>
							<div className='log__password'>
								<input
									type={
										passwordVisibility.confirm_password ? 'text' : 'password'
									}
									id='confirm_password'
									className={classNames('log__input', {
										'log__input--error': errors.confirm_password,
									})}
									placeholder={t('reset.confirm_password.standart')}
									{...register('confirm_password', {
										required: t('reset.confirm_password.standart'),
									})}
								/>
								<span
									className='log__input--eye'
									onClick={() => handleToggle('confirm_password')}>
									<Icon
										icon={passwordVisibility.confirm_password ? eye : eyeOff}
										size={25}
									/>
								</span>
							</div>
						</div>

						<button
							className='log__button'
							type='submit'
							disabled={
								isLoading ||
								!watch('new_password') ||
								!watch('confirm_password')
							}>
							{t('reset.save')}
							{isLoading && (
								<Loading color={'fff'} btnSize={'30'} top={'12px'} />
							)}
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
