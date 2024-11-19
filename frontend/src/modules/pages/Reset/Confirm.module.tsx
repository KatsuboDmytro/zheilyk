import React, { useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import './logIn.scss'
import classNames from 'classnames'
import { Loading } from '../../../components'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../../services/access/authService'

interface FormInputs {
  new_password: string
  confirm_password: string
}

export const Confirm: React.FC = () => {
  const { language } = useAppSelector((state) => state.goods)
  const [passwordVisibility, setPasswordVisibility] = useState({
    new_password: false,
    confirm_password: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useParams() as { token: string };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>()
  const dispatch = useAppDispatch()

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
        setError('Passwords do not match')
        setTimeout(() => setError(null), 5000)
        return
      }

      setIsLoading(true)
      await authService.confirm(language, new_password, confirm_password, token)
      setError(null)
      setIsSuccess(true)
      
      setTimeout(() => {
        navigate('/log-in');
        setIsSuccess(false);
      }, 2000)
    } catch (error: any) {
      setError(error?.message || 'Something went wrong')
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='log'>
      <aside className='log__welcome'>
        <div className='log__center'>
          <h1 className='log__title'>Відновлення паролю</h1>
          <p className='log__description'></p>
          <form onSubmit={handleSubmit(onSubmit)} className='log__form'>
            <div className='log__mail'>
              <label htmlFor='new_password' className='log__label'>
                New password
              </label>
              <div className='log__password'>
                <input
                  type={passwordVisibility.new_password ? 'text' : 'password'}
                  id='new_password'
                  className={classNames('log__input', {
                    'log__input--error': errors.new_password || error,
                  })}
                  placeholder='Новий пароль'
                  {...register('new_password', { required: '* New password is required' })}
                />
                <span className='log__input--eye' onClick={() => handleToggle('new_password')}>
                  <Icon icon={passwordVisibility.new_password ? eye : eyeOff} size={25} />
                </span>
              </div>
              {errors.new_password && (
                <span className='log__field--error'>{errors.new_password.message}</span>
              )}
            </div>

            <div className='log__mail'>
              <label htmlFor='confirm_password' className='log__label'>
                Confirm password
              </label>
              <div className='log__password'>
                <input
                  type={passwordVisibility.confirm_password ? 'text' : 'password'}
                  id='confirm_password'
                  className={classNames('log__input', {
                    'log__input--error': errors.confirm_password || error,
                  })}
                  placeholder='Повтори пароль'
                  {...register('confirm_password', { required: '* Confirm password is required' })}
                />
                <span className='log__input--eye' onClick={() => handleToggle('confirm_password')}>
                  <Icon icon={passwordVisibility.confirm_password ? eye : eyeOff} size={25} />
                </span>
              </div>
              {errors.confirm_password && (
                <span className='log__field--error'>{errors.confirm_password.message}</span>
              )}
            </div>

            <button
              className='log__button'
              type='submit'
              disabled={isLoading || !watch('new_password') || !watch('confirm_password')}
            >
              Зберегти пароль
              {isLoading && <Loading color={'fff'} btnSize={'30'} top={'12px'} />}
              {isSuccess && <img src="img/logOrSign/success.png" alt='success' className='log__success' />}
            </button>

            {error && <div className='log__error'>{error}</div>}
          </form>
        </div>
      </aside>
			<aside className='log__img'>
				<img src='img/logOrSign/logIn-photo.png' alt='logOrSign' />
			</aside>
    </section>
  );
};
