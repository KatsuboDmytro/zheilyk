import React, { useState } from 'react'
import classNames from 'classnames'
import { Good } from '../../../../../types/Good'
import ScaleModal from '../ScaleModal/ScaleModal'
import Magnifier from '../Magnifier/Magnifier'
import { GoodFilters } from '../GoodFilters/GoodFilters'

interface Props {
	good: Good | null
}

export const Data: React.FC<Props> = ({ good }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScaleModalOpen, setIsScaleModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const IMAGESS = [
    'https://i.postimg.cc/L4jV3Nd9/image.png',
    'https://i.postimg.cc/66MRZJZn/11.png',
    'https://i.postimg.cc/B6qL8MQm/12.png',
    'https://i.postimg.cc/TPchXgqg/13.jpg',
    'https://i.postimg.cc/1ttRhTz1/14.jpg',
  ]

	const closeSizeModal = () => {
		setIsModalOpen(false)
	}

	const openScaleModal = () => {
		setIsScaleModalOpen(true)
	}

	const closeScaleModal = () => {
		setIsScaleModalOpen(false)
	}

	const imageToDisplay = (img: string) => {
		return `${img}`
		// return `${process.env.REACT_APP_API_URL}${img}`
  }

	return (
		<div className='details__data'>
      <aside className='details__images'>
        <Magnifier
          img={IMAGESS[activeImage]}
          openScaleModal={openScaleModal}
        />
				<div className='details__images--blocks'>
					{/* {good?.images.map((image, index) => ( */}
					{IMAGESS.map((image, index) => (
						<div
							key={index}
							className={classNames('details__images--blocks-img', {
								'details__images--blocks-img-active': index === activeImage,
							})}
              onClick={() => setActiveImage(index)}>
							<img src={imageToDisplay(image)} alt='device' />
						</div>
					))}
				</div>
      </aside>
      <GoodFilters
        good={good}
      />
			<ScaleModal
				isOpen={isScaleModalOpen}
        onClose={closeScaleModal}
        setActiveImage={(updater) =>
          setActiveImage((prev) => {
            const nextIndex = updater(prev);
            return Math.max(0, Math.min(nextIndex, IMAGESS.length - 1));
          })
        }
        totalImages={IMAGESS.length}
				img={IMAGESS[activeImage]}
				// img={good?.images[activeImage]}
				name={good?.name}
			/>
		</div>
	)
}
