import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Good } from '../../../types/Good'
import { useParams } from 'react-router-dom'
import { Data, Info } from './components'
import './goodDetails.scss'
import { Loading } from '../../../components'
import goodsService from '../../../services/goods/goodsService'

export const GoodDetails: React.FC = () => {
  const language = useAppSelector((state) => state.goods.language as string);
  const [good, setGood] = useState<Good | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
	const dispatch = useAppDispatch()
	const { goodId } = useParams()

	useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
			try {
				const response = await goodsService.getOneItem(goodId, language)
        setGood(response.data || response)
        setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				setErrorText(error as string)
			}
		}
		fetch()
	}, [dispatch])

	return (
    <section className='details container'>
      {isLoading ? (
				<Loading />
			) : errorText.length !== 0 ? (
				<p className='catalog__error'>{errorText}</p>
			) : (
				<>
          <h1 className='details__title'>{good?.name}</h1>
    
          <Data good={good} />
    
          <Info good={good} />
        </>
      )}
		</section>
	)
}
