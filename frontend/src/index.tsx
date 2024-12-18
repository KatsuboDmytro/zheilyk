import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Root } from './routes/Root'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { global_en, global_ro, global_uk } from './translations'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const supportedLanguages = ['en', 'ro', 'uk']

const savedLanguage = localStorage.getItem('language') || 'uk'

const languageToUse = supportedLanguages.includes(savedLanguage)
	? savedLanguage
	: 'uk'

i18next.init({
	interpolation: { escapeValue: false },
	lng: languageToUse,
	resources: {
		en: {
			global: global_en,
		},
		ro: {
			global: global_ro,
		},
		uk: {
			global: global_uk,
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<Provider store={store}>
				<Router>
					<Root />
					<ToastContainer />
				</Router>
			</Provider>
		</I18nextProvider>
	</React.StrictMode>
)
