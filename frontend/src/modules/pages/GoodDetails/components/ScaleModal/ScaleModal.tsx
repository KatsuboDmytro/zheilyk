import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import './scaleModal.scss'

interface ModalProps {
	img: string | undefined
	name: string | undefined
	isOpen: boolean
	onClose: () => void
	setActiveImage: (index: (prev: number) => number) => void
	totalImages: number // The total number of images
}

const ScaleModal: React.FC<ModalProps> = ({
	isOpen,
	img,
	name,
	onClose,
	setActiveImage,
	totalImages,
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null)

	// Close modal when 'Escape' key is pressed
	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}
		window.addEventListener('keydown', handleEscapeKey)

		return () => {
			window.removeEventListener('keydown', handleEscapeKey)
		}
	}, [onClose])

	useEffect(() => {
		const modalElement = modalRef.current
		if (isOpen && modalElement) {
			disableBodyScroll(modalElement)
		} else {
			if (modalElement) {
				enableBodyScroll(modalElement)
			}
		}

		return () => {
			if (modalElement) {
				enableBodyScroll(modalElement)
			}
		}
	}, [isOpen])

	if (!isOpen) {
		return null
	}

	const handlePrevImage = (e: React.MouseEvent) => {
		e.stopPropagation()
		setActiveImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1)) // Loop to the last image if at first
	}

	const handleNextImage = (e: React.MouseEvent) => {
		e.stopPropagation()
		setActiveImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1)) // Loop to the first image if at last
	}

	return ReactDOM.createPortal(
		<div className='modal-overlay' onClick={onClose} ref={modalRef}>
			<div className='img-content' onClick={(e) => e.stopPropagation()}>
				<div className='img__top' onClick={onClose}>
					<img src='img/icons/white-close.svg' alt='close' />
				</div>
				<div className='img__images'>
					{/* Left arrow */}
					<img
						className='img__img--icon'
						src='img/icons/arrow-left-white.svg'
						alt='arrow-left'
						onClick={handlePrevImage}
					/>
					<img className='img__img' src={img || ''} alt={name || 'image'} />
					{/* Right arrow */}
					<img
						className='img__img--icon'
						src='img/icons/arrow-right.svg'
						alt='arrow-right'
						onClick={handleNextImage}
					/>
				</div>
			</div>
		</div>,
		document.getElementById('scale-img') as HTMLElement
	)
}

export default ScaleModal
