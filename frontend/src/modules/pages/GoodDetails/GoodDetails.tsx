import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../app/hooks';
import { Good } from '../../../types/Good';
import { goodsService } from '../../../services/goodsService';
import { useParams } from 'react-router-dom';
import { Data, Info } from './components';
import './goodDetails.scss';

export const GoodDetails: React.FC = () => {
  const [good, setGood] = useState<Good | null>(null);
  const dispatch = useAppDispatch();
  const { goodId } = useParams();
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await goodsService.getOneItem(goodId);
        setGood(response.data || response);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dispatch]);

  return (
    <section className="details container">
      <h1 className="details__title">{good?.name}</h1>

      <Data
        good={good}
      />

      <Info good={good} />
    </section>
  );
};
