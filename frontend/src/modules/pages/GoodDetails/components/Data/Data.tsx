import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Good } from '../../../../../types/Good'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GridModal from '../GridModal/GridModal'
import ScaleModal from '../ScaleModal/ScaleModal'
import cartService from '../../../../../services/goods/cartService'
import { Loading } from '../../../../../components'
import useAuth from '../../../../../app/useAuth'

interface Props {
	good: Good | null
}

export const Data: React.FC<Props> = ({ good }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { language } = useAppSelector((state) => state.goods)
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
	const [isAddedInCart, setIsAddedInCart] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScaleModalOpen, setIsScaleModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [chooseValidator, setChooseValidator] = useState({
		color: {
			error: false,
			message: 'Вам треба спершу обрати бажаний колір',
		},
		size: {
			error: false,
			message: 'Який розмір вам личить?',
		},
	})
  const navigate = useNavigate()

	const getInitialValues = (param: string) => {
		const values = searchParams.get(param)
		return values || null
  }

	const [choosedColor, setChoosedColor] = useState(() =>
		getInitialValues('color')
	)
	const [choosedSizes, setChoosedSizes] = useState<string | null>(() =>
		getInitialValues('size')
  )

  const totalAmount = good?.additional_info.reduce((total, info) => total + info.amount, 0);
  const filteredAmount = good?.additional_info
    .filter((info) => {
        return (
            (!choosedColor || info.color === choosedColor) &&
            (!choosedSizes || info.size === choosedSizes)
        );
    })
    .reduce((total, info) => total + info.amount, 0) || 0;

  const COLORS = Array.from(new Set(good?.additional_info.map((info) => info.color)));
  const SIZES = Array.from(new Set(good?.additional_info.map((info) => info.size)));  
  const AMOUNT = choosedColor || choosedSizes ? filteredAmount : totalAmount;

	useEffect(() => {
		const params: { color?: string; size?: string } = {}
		if (choosedColor) params.color = choosedColor
		if (choosedSizes) params.size = choosedSizes
		setSearchParams(params)
	}, [choosedColor, choosedSizes, setSearchParams])

	const openSizeModal = () => {
		setIsModalOpen(true)
	}

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
		return `${process.env.REACT_APP_API_URL}${img}`
  }

  const addressToCart = () => {
    navigate('/cart');
  }

  const handleAddToCart = async () => {
    const colorError = !choosedColor;
    const sizeError = !choosedSizes;
  
    setChooseValidator({
      color: {
        error: colorError,
        message: 'Вам треба спершу обрати бажаний колір',
      },
      size: {
        error: sizeError,
        message: 'Який розмір вам личить?',
      },
    });
  
    if (colorError || sizeError) {
      return;
    }
  
    if (!isAuthenticated) {
      navigate('/log-in');
    } else {
      try {
        setIsLoading(true);
        const choosedGood = {
          item: good?.name || 'Unnamed item',
          size: choosedSizes || 'No size',
          color: choosedColor || 'No color',
          quantity: 1,
        };
  
        await cartService.addCartItem(choosedGood, language);
        setIsAddedInCart(true);
      } catch (error) {
        setIsAddedInCart(false);
        console.error('Failed to add item to cart:', error || error);
      } finally {
        setIsLoading(false);
      }
    }
  };

	return (
		<div className='details__data'>
			<aside className='details__images'>
				<img
					src={`${process.env.REACT_APP_API_URL}${good?.images[activeImage]}`}
					alt='every-day'
					className='details__images--main'
					onClick={openScaleModal}
				/>
				<div className='details__images--blocks'>
					{good?.images.map((image, index) => (
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
			<aside className='details__filters'>
				<div className='details__colors'>
					<div className='details__colors--text'>
						<p className='details__colors--title'>Доступні кольори</p>
						<div className="details__colors--info">
              <p className='details__colors--id'>Артикул: {good?.id}</p> <br />
              <p
                className='details__colors--id'
                style={{
                  color: AMOUNT && AMOUNT > 0 ? 'green' : 'red',
                }}
              >
                {AMOUNT && AMOUNT > 0 ? 'В наявності' : 'Немає в наявності'}
              </p>
              <p className='details__colors--id'>Кількість: {AMOUNT}</p>
            </div>
					</div>
					<div className='details__filters--colors'>
						{COLORS?.map((color, index) => (
							<div
								key={index}
								className={classNames('details__filters--colors-block', {
									'details__filters--colors-block-active':
										color === choosedColor,
								})}
								onClick={() => setChoosedColor(color)}>
								<div
									className='color'
									style={{ backgroundColor: color.toLowerCase() }}
								/>
							</div>
						))}
						{chooseValidator.color.error && (
							<span className='details__filters--error'>
								{chooseValidator.color.message}
							</span>
						)}
					</div>
				</div>
				<div className='details__capacity'>
					<p className='details__capacity--title'>Доступні розміри</p>
					<div className='details__capacity--capacities'>
						{SIZES?.map((size, index) => (
							<div
								key={index}
								className={classNames('details__capacity--capacities-block', {
									'details__capacity--capacities-block-active':
										size === choosedSizes,
								})}
								onClick={() => setChoosedSizes(size)}>
								{size}
							</div>
						))}
						{chooseValidator.size.error && (
							<span className='details__filters--error'>
								{chooseValidator.size.message}
							</span>
						)}
					</div>
				</div>
				<div className='details__buy'>
					<div className='details__buy--price'>
						<span>{good?.price} грн</span>
						{good?.sale_price && <span>${good?.sale_price} грн</span>}
					</div>
					<div className='details__buy--buttons'>
						<button
							type='button'
							className={classNames(
								{
									'details__buy--buttons-cart': !isAddedInCart,
								},
								{
									'details__buy--buttons-disabled': filteredAmount === 0,
								},
								{
									'details__buy--buttons-added': isAddedInCart,
								}
							)}
              disabled={filteredAmount === 0}
              onClick={isAddedInCart ? addressToCart : handleAddToCart}
            >
              {isAddedInCart ? 'Вже у кошику' : 'Придбати'}
              {isLoading && <Loading color={'fff'} btnSize={'30'} />}
						</button>
					</div>
					<div className='details__buy--buttons'>
						<button
							type='button'
							className='details__buy--buttons-sizes'
							onClick={openSizeModal}>
							Розмірна сітка
						</button>
					</div>
				</div>
			</aside>
			<GridModal isOpen={isModalOpen} onClose={closeSizeModal} />
			<ScaleModal
				isOpen={isScaleModalOpen}
				onClose={closeScaleModal}
				img={good?.images[activeImage]}
				name={good?.name}
			/>
		</div>
	)
}
