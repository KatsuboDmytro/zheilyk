import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import cartService from '../../../../../services/goods/cartService'
import useAuth from '../../../../../app/useAuth'
import { Good } from '../../../../../types/Good'
import { Loading } from '../../../../../components'
import { useTranslation } from 'react-i18next'
import useNotification from '../../../../../app/useNotification'

interface GoodFiltersProps {
	good: Good | null
}

export const GoodFilters: React.FC<GoodFiltersProps> = ({ good }) => {
	const [t] = useTranslation('global')
	const [searchParams, setSearchParams] = useSearchParams()
	const { isAuthenticated } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
  const [isAddedInCart, setIsAddedInCart] = useState(false)
  const { showSuccess, showError } = useNotification();

	const navigate = useNavigate()
	const location = useLocation()

	const getInitialValues = (param: string) => searchParams.get(param) || null

	const [choosedColor, setChoosedColor] = useState(() =>
		getInitialValues('color')
	)
	const [choosedSizes, setChoosedSizes] = useState<string | null>(() =>
		getInitialValues('size')
	)

	const COLORS = Array.from(
		new Set(good?.additional_info.map((info) => info.color))
	)
	const SIZES = Array.from(
		new Set(good?.additional_info.map((info) => info.size))
	)

	const totalAmount = good?.additional_info.reduce(
		(total, info) => total + info.amount,
		0
	)
	const filteredAmount =
		good?.additional_info
			.filter(
				(info) =>
					(!choosedColor || info.color === choosedColor) &&
					(!choosedSizes || info.size === choosedSizes)
			)
			.reduce((total, info) => total + info.amount, 0) || 0

	const AMOUNT =
		choosedColor || choosedSizes ? filteredAmount : totalAmount || 0

	useEffect(() => {
		const params: { color?: string; size?: string; 'size-template'?: string } =
			{}
		if (choosedColor) params.color = choosedColor
		if (choosedSizes) params.size = choosedSizes
		setSearchParams(params)
	}, [choosedColor, choosedSizes, setSearchParams])

	const addressToCart = () => navigate('/cart')

	const handleAddToCart = async () => {
    if (!choosedColor) {
      showError(t('details.available_colors.warning'))
    }
    if (!choosedSizes) {
      showError(t('details.available_sizes.warning'))
    }

		if (!isAuthenticated) {
      showError(t('details.not_authenticated'))
			navigate('/log-in')
		} else {
			try {
				setIsLoading(true)
				const choosedGood = {
					item: good?.name || 'Unnamed item',
					size: choosedSizes || 'No size',
					color: choosedColor || 'No color',
					quantity: 1,
				}
				await cartService.addCartItem(choosedGood)
        setIsAddedInCart(true)
        showSuccess(t('details.added_to_cart'))
			} catch (error) {
				setIsAddedInCart(false)
        showError(t('details.not_added_to_cart'))
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<aside className='details__filters'>
			<div className='details__colors'>
				<div className='details__colors--text'>
					<p className='details__colors--title'>
						{t('details.available_colors.standart')}
					</p>
					<div className='details__colors--info'>
						<p
							className='details__colors--id'
							style={{ color: AMOUNT > 0 ? 'green' : 'red' }}>
							{AMOUNT > 0
								? t('details.is_available')
								: t('details.is_not_available')}
						</p>
						<p className='details__colors--id'>
							{t('details.quantity')}: {AMOUNT}
						</p>
					</div>
				</div>
				<div className='details__filters--colors'>
					{COLORS.map((color, index) => (
						<div
							key={index}
							className={classNames('details__filters--colors-block', {
								'details__filters--colors-block-active': color === choosedColor,
							})}
							onClick={() => setChoosedColor(color)}>
							<div
								className='color'
								style={{ backgroundColor: color.toLowerCase() }}
							/>
						</div>
					))}
				</div>
			</div>

			<div className='details__capacity'>
				<p className='details__capacity--title'>
					{t('details.available_sizes.standart')}
				</p>
				<div className='details__capacity--capacities'>
					{SIZES.map((size, index) => (
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
				</div>
			</div>

			<div className='details__buy'>
				<div className='details__buy--price'>
					<span>
						{good?.price} {t('details.uah')}
					</span>
					{good?.sale_price && (
						<span>
							{good?.sale_price} {t('details.uah')}
						</span>
					)}
				</div>

				<div className='details__buy--buttons'>
					<button
						type='button'
						className={classNames('details__buy--buttons-cart', {
							'details__buy--buttons-disabled': filteredAmount === 0,
							'details__buy--buttons-added': isAddedInCart,
						})}
						disabled={filteredAmount === 0}
						onClick={isAddedInCart ? addressToCart : handleAddToCart}>
						{isAddedInCart ? t('details.at_cart') : t('details.add_to_cart')}
						{isLoading && <Loading color={'fff'} btnSize={'30'} />}
					</button>
				</div>

				<div className='details__buy--buttons'>
					<Link to='/modal' state={{ previousLocation: location }}>
						<button type='button' className='details__buy--buttons-sizes'>
							{t('details.dimensional_grid')}
						</button>
					</Link>
				</div>
			</div>
		</aside>
	)
}
