import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Back: React.FC = () => {
  const [t] = useTranslation("global");
	const navigate = useNavigate()

  const handleGoBack = () => {
		navigate(-1)
  }
  
  return (
    <div className='log__back' onClick={handleGoBack}>
      <img src='img/icons/arrow-left.svg' alt='arrow-left' />
      &nbsp;
      <span>{t("signup.back")}</span>
    </div>
  );
};
