import React from 'react'
import { Back } from '../../../components'
import { useTranslation } from 'react-i18next';

export const Contacts: React.FC = () => {
  const [t] = useTranslation("global");

	return (
		<div className='main container'>
			<Back />
			<h1 className='main__title list-title'>{t("contacts.title")}</h1>
			<div className='contacts'>
				<aside className='contacts__left'>
					<div className='contacts__item'>
						<h4 className='contacts__title'>{t("contacts.address_title")}</h4>
						<p className='contacts__text'>{t("contacts.address")}</p>
					</div>
					<div className='contacts__item'>
						<h4 className='contacts__title'>{t("contacts.phone_title")}</h4>
						<p className='contacts__text'>+38(095)812 56 66</p>
					</div>
					<div className='contacts__item'>
						<h4 className='contacts__title'>{t("contacts.socials_title")}</h4>
            <div className="contacts__socials">
              <a href="https://www.instagram.com/multibrand_zheilyk?igsh=c25qcTgydTl1anh3">
                <img src="img/icons/instagram.svg" alt="instagram" />
              </a>
              <a href="https://t.me/zheilyk_multibrand">
                <img src="img/icons/telegram.svg" alt="telegram" />
              </a>
            </div>
					</div>
				</aside>
				<aside className='contacts__right'>
					<h4 className='contacts__title'>{t("contacts.map")}</h4>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.2432587074827!2d25.94989337596429!3d48.2596930426524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47340f2b1bedb44d%3A0xdc4ccf3d1270c734!2z0LLRg9C70LjRhtGPINCV0L3RgtGD0LfRltCw0YHRgtGW0LIsIDPQsCwg0KfQtdGA0L3RltCy0YbRliwg0KfQtdGA0L3RltCy0LXRhtGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNTgwMDA!5e0!3m2!1suk!2sua!4v1732308389890!5m2!1suk!2sua'
						width='600'
						height='450'
						style={{border:0}}
						loading='lazy'>
            </iframe>
				</aside>
			</div>
		</div>
	)
}
