import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Good } from '../../../types/Good'
import { useParams } from 'react-router-dom'
import { Data, Info } from './components'
import { Back, Loading } from '../../../components'
import goodsService from '../../../services/goods/goodsService'
import { Error } from '../../../components/Warnings/Error'
import './goodDetails.scss'

export const GoodDetails: React.FC = () => {
  const language = useAppSelector((state) => state.goods.language as string);
  const [good, setGood] = useState<Good | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
	const { goodId } = useParams()
	const dispatch = useAppDispatch()

	useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
			try {
				const response = await goodsService.getOneItem(goodId)
        setGood(response.data || response)
        setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				setErrorText(error as string)
			}
		}
		fetch()
  }, [dispatch, goodId, language])

	return (
    <section className='details container'>
      {isLoading ? (
				<Loading />
			) : errorText.length !== 0 ? (
				<Error />
			) : (
				<>
          <Back path={'/catalog'} />
          <h1 className='details__title'>{good?.name}</h1>
    
          <Data good={good} />
    
          <Info good={good} />
        </>
      )}
		</section>
	)
}
