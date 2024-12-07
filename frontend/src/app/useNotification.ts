import { toast } from 'react-toastify'

const useNotification = () => {
	const showSuccess = (message: string) => {
		toast.success(message, {
			position: 'bottom-right',
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
		})
	}

	const showError = (message: string) => {
		toast.error(message, {
			position: 'bottom-right',
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
		})
	}

	return { showSuccess, showError }
}

export default useNotification
