import React, { useEffect, useState } from 'react'
import { Card, MainFilter, TopFilter } from './components'
import './catalog.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setFilters, setGoods } from '../../../features/goodsSlice'
import { useSearchParams } from 'react-router-dom'
import { WAYS } from '../../../vars'
import { Loading } from '../../../components'
import goodsService from '../../../services/goods/goodsService'
import useWideScreen from '../../../app/useWideScreen'
import { Error } from '../../../components/Warnings/Error'
import { Empty } from '../../../components/Warnings/Empty'

export const Catalog: React.FC = () => {
  const { isWideScreen } = useWideScreen();
  const language = useAppSelector((state) => state.goods.language as string);
	const { goods, inputFilter } = useAppSelector((state) => state.goods)
	const dispatch = useAppDispatch()

	const [searchParams, setSearchParams] = useSearchParams()
	const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
  const [isOpenFilter, setIsOpenFilter] = useState(false)

	const getInitialValues = (param: string) => {
		const values = searchParams.get(param)
		return values ? values.split(',') : []
	}

	const [choosedSizes, setChoosedSizes] = useState<string[]>(() =>
		getInitialValues('size')
	)
	const [choosedColors, setChoosedColors] = useState<string[]>(() =>
		getInitialValues('color')
	)
	const [choosedBrands, setChoosedBrands] = useState<string[]>(() =>
		getInitialValues('brand')
	)
	const [isSale, setIsSale] = useState(
		() => searchParams.get('sale') === 'true'
	)
	const [isAvailable, setIsAvailable] = useState(
		() => searchParams.get('available') === 'true'
	)
	const [wayToFilter, setWayToFilter] = useState<string>(() => {
		const initialWay = searchParams.get('way')
		return initialWay ? initialWay : WAYS[0]
	})

	useEffect(() => {
		const params: any = {}

		if (choosedSizes.length > 0) params.size = choosedSizes.join(',')
		if (choosedColors.length > 0) params.color = choosedColors.join(',')
		if (choosedBrands.length > 0) params.brand = choosedBrands.join(',')
		if (isSale) params.sale = 'true'
		if (isAvailable) params.available = 'true'
		params.way = wayToFilter

		setSearchParams(params)
	}, [
		choosedSizes,
		choosedColors,
		choosedBrands,
		isSale,
		isAvailable,
		wayToFilter,
		setSearchParams,
	])

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)
      try {
				const response = await goodsService.getItems(language)
				dispatch(setGoods(response.data || response))
				dispatch(setFilters(response.data || response))
				setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				setErrorText(error as string)
			}
		}
		fetch()
  }, [dispatch, language])
  
  const filteredGoods = goods
  .filter((good) => {
    const matchesSize =
      choosedSizes.length === 0 ||
      choosedSizes.some((size) =>
        good.additional_info.some((info) => info.size === size)
      );

    const matchesColor =
      choosedColors.length === 0 ||
      choosedColors.some((color) =>
        good.additional_info.some((info) => info.color === color)
      );

    const matchesBrand =
      choosedBrands.length === 0 || choosedBrands.includes(good.brand);

    const matchesSale = !isSale || good.sale_price !== null;

    const matchesAvailability = !isAvailable || good.in_stock;

    const matchesInput =
      !inputFilter || good.name.toLowerCase().includes(inputFilter.toLowerCase());

    return (
      matchesSize &&
      matchesColor &&
      matchesBrand &&
      matchesSale &&
      matchesAvailability &&
      matchesInput
    );
  })
  .sort((a, b) => {
    if (wayToFilter === WAYS[0]) {
      const dateA = a.date_added ? new Date(a.date_added).getTime() : 0;
      const dateB = b.date_added ? new Date(b.date_added).getTime() : 0;

      return dateA - dateB;
    } else if (wayToFilter === WAYS[1]) {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (wayToFilter === WAYS[2]) {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

	return (
		<section className='catalog container'>
			{isLoading ? (
				<Loading />
			) : errorText.length !== 0 ? (
				<Error />
			) : (
        <>
          <div className="contents">
            <div
              className="filter__title"
              onClick={() => setIsOpenFilter((prev) => !prev)}
            >
              <img
                src="img/icons/filter.svg"
                className="filter__title--img"
                alt="filter"
              />
              <h3 className="filter__title--text">
                {isWideScreen ? 'Фільтри' : (
                  `${isOpenFilter ? 'Закрити' : 'Відкрити'} фільтри`
                )}
              </h3>
            </div>
            <div
              className='catalog__tablet--filters'
              style={{ left: isOpenFilter ? '24px' : '-250px' }}
            >
              <MainFilter
                setIsOpenFilter={setIsOpenFilter}
                choosedSizes={choosedSizes}
                setChoosedSizes={setChoosedSizes}
                choosedColors={choosedColors}
                setChoosedColors={setChoosedColors}
                choosedBrands={choosedBrands}
                setChoosedBrands={setChoosedBrands}
                isSale={isSale}
                setIsSale={setIsSale}
                isAvailable={isAvailable}
                setIsAvailable={setIsAvailable}
              />
              <TopFilter
                wayToFilter={wayToFilter}
                setWayToFilter={setWayToFilter}
              />
            </div>
          </div>
          <aside className='catalog__aside' style={{left: !isOpenFilter ? '0px' : '250px'}}>
            {filteredGoods.length === 0 ? (
              <Empty text={'Пу пу.. а такого товару немає :('} />
						) : (
							filteredGoods.map((good) => <Card key={good.id} good={good} />)
						)}
					</aside>
				</>
			)}
		</section>
	)
}
