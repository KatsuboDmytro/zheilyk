import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface BackProps {
	path?: string
}

export const Back: React.FC<BackProps> = ({ path }) => {
	const [t] = useTranslation('global')
	const link: string | number = path || -1
	const navigate = useNavigate()

	const handleGoBack = () => {
    if (typeof link === 'number') {
      console.log('link is number')
			navigate(link)
		} else {
			navigate(link as string)
		}
	}

	return (
		<div className='log__back' onClick={handleGoBack}>
			<img src='img/icons/arrow-left.svg' alt='arrow-left' />
			&nbsp;
			<span>{t('signup.back')}</span>
		</div>
	)
}
