import React, { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import newPostService from '../../../../services/goods/newPostService'
import { useTranslation } from 'react-i18next'

interface DeliveryDetailsProps {
	handleChange: (field: any, value: string | object) => void
	clientData: any
}

export type OptionType = {
	value: string
	label: string
}

export type MethodDetailsType = {
	відділення: {
		область: OptionType | string
		місто: OptionType | string
		відділення: OptionType | string
	}
	поштомат: {
		область: OptionType | string
		місто: OptionType | string
		поштомат: OptionType | string
	}
	"кур'єр": {
		область: OptionType | string
		місто: OptionType | string
		адреса: OptionType | string
	}
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
	handleChange,
	clientData,
}) => {
	const [method, setMethod] = useState<keyof MethodDetailsType>('відділення')
	const [selectedRegion, setSelectedRegion] = useState<OptionType | null>(null)
	const [selectedCity, setSelectedCity] = useState<OptionType | null>(null)
	const [newPostAreas, setNewPostAreas] = useState<OptionType[]>([])
	const [newPostCities, setNewPostCities] = useState<OptionType[]>([])
	const [newPostWarehouses, setNewPostWarehouses] = useState<OptionType[]>([])
	const [t] = useTranslation('global')

	const [methodDetails, setMethodDetails] = useState<MethodDetailsType>({
		відділення: {
			область: '',
			місто: '',
			відділення: '',
		},
		поштомат: {
			область: '',
			місто: '',
			поштомат: '',
		},
		"кур'єр": {
			область: '',
			місто: '',
			адреса: '',
		},
	})

	const handleRegionChange = (
		selectedOption: SingleValue<string | OptionType>
	) => {
		if (selectedOption && typeof selectedOption === 'object') {
			setSelectedRegion(selectedOption)
			setMethodDetails((prev) => ({
				...prev,
				[method]: {
					...prev[method],
					область: selectedOption,
				},
			}))
		}
	}

	const handleCityChange = (
		selectedOption: SingleValue<string | OptionType>
	) => {
		if (selectedOption && typeof selectedOption === 'object') {
			setSelectedCity(selectedOption)
			setMethodDetails((prev) => ({
				...prev,
				[method]: {
					...prev[method],
					місто: selectedOption,
				},
			}))
		}
	}

	const handleAdressChange = (
		selectedOption: SingleValue<string | OptionType>
	) => {
		if (selectedOption && typeof selectedOption === 'object') {
			setMethodDetails((prev) => ({
				...prev,
				[method]: {
					...prev[method],
					[method === 'відділення' ? 'відділення' : 'поштомат']: selectedOption,
				},
			}))
		}
	}

	const handleAdressToDeliverChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMethodDetails((prev) => ({
			...prev,
			[method]: {
				...prev[method],
				['адреса']: { value: '', label: event.target.value },
			},
		}))
	}

	useEffect(() => {
		const fetchNewPostData = async () => {
			try {
				const response = await newPostService.getNewPostAreas()
				const data = response.data.data
				console.log('New post data:', data)
				setNewPostAreas(
					data.map((area: any) => ({
						value: area.Ref,
						label: area.Description,
					}))
				)
			} catch (error) {
				console.error('Error fetching New Post data:', error)
			}
		}
		fetchNewPostData()
	}, [])

	useEffect(() => {
		const fetchNewPostCities = async () => {
			const area =
				typeof selectedRegion === 'object' && selectedRegion !== null
					? selectedRegion.value
					: undefined

			if (area) {
				try {
					const response = await newPostService.getNewPostCities(area)
					const data = response.data.data
					console.log('New post cities:', data)
					setNewPostCities(
						data.map((city: any) => ({
							value: city.Ref,
							label: city.Description,
						}))
					)
				} catch (error) {
					console.error('Error fetching New Post cities:', error)
				}
			}
		}
		fetchNewPostCities()
	}, [selectedRegion])

	useEffect(() => {
		const fetchNewPostWarehouses = async () => {
			const city =
				typeof selectedCity === 'object' && selectedCity !== null
					? selectedCity.value
					: undefined

			if (city) {
				try {
					const response = await newPostService.getNewPostWarehouses(city)
					const data = response.data.data
					console.log('New post warehouses:', data)
					setNewPostWarehouses(
						data.map((warehouse: any) => ({
							value: warehouse.Ref,
							label: warehouse.Description,
						}))
					)
				} catch (error) {
					console.error('Error fetching New Post warehouses:', error)
				}
			}
		}
		fetchNewPostWarehouses()
	}, [selectedCity])

	useEffect(() => {
		handleChange('delivery_info.post_department', methodDetails[method])
	}, [method, methodDetails, handleChange])

	const getCurrentOption = (
		value: OptionType | string,
		options: OptionType[]
	): OptionType | string => {
		if (typeof value === 'object' && value !== null) {
			return options.find((option) => option.value === value.value) || ''
		}
		return ''
	}

	const warehouseValue =
		method === 'відділення'
			? methodDetails['відділення'].відділення
			: methodDetails['поштомат'].поштомат

	const isWarehouseValueOptionType =
		typeof warehouseValue === 'object' && warehouseValue !== null

	return (
		<>
			<div className='account__cell--row'>
				<button
					className='account__newpost'
					onClick={() => setMethod('відділення')}
					style={{ borderColor: method === 'відділення' ? '#f00' : '' }}>
					{t('checkout.post.department')}
				</button>
				<button
					className='account__newpost'
					onClick={() => setMethod('поштомат')}
					style={{ borderColor: method === 'поштомат' ? '#f00' : '' }}>
					{t('checkout.post.post_office')}
				</button>
				<button
					className='account__newpost'
					onClick={() => setMethod("кур'єр")}
					style={{ borderColor: method === "кур'єр" ? '#f00' : '' }}>
					{t('checkout.post.address')}
				</button>
			</div>
			<div className='account__cell'>
				<div className='form-container'>
					<div className='form-group'>
						<label htmlFor='region'>{t('checkout.post.region.standart')}</label>
						<Select
							id='region'
							options={newPostAreas}
							placeholder={t('checkout.post.region.placeholder')}
							isSearchable={true}
							onChange={handleRegionChange}
							value={getCurrentOption(
								methodDetails[method]['область'],
								newPostAreas
							)}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='city'>{t('checkout.post.city.standart')}</label>
						<Select
							id='city'
							options={newPostCities}
							placeholder={t('checkout.post.city.placeholder')}
							isSearchable={true}
							onChange={handleCityChange}
							value={getCurrentOption(
								methodDetails[method]['місто'],
								newPostCities
							)}
							isDisabled={!selectedRegion}
						/>
					</div>

					<div className='form-group checkout__cell'>
						<label htmlFor='warehouse'>
							{method === "кур'єр"
								? t('checkout.post.street.method1')
								: t('checkout.post.street.method2')}
						</label>
						{method === "кур'єр" ? (
							<input
								type='text'
								name='name1'
								id='name1'
								placeholder={t('checkout.post.street.standart')}
								value={
									typeof methodDetails[method]['адреса'] === 'object'
										? methodDetails[method]['адреса'].label
										: ''
								}
								onChange={handleAdressToDeliverChange}
								required
							/>
						) : (
							<Select
								id='warehouse'
								options={newPostWarehouses}
								placeholder={
									method === 'відділення'
										? t('checkout.post.street.choose_dep')
										: t('checkout.post.street.choose_post')
								}
								isSearchable={true}
								onChange={handleAdressChange}
								value={
									isWarehouseValueOptionType
										? getCurrentOption(warehouseValue, newPostWarehouses)
										: ''
								}
								isDisabled={!selectedCity}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default DeliveryDetails
