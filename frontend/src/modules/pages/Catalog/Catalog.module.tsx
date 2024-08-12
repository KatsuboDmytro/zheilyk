import React, { useEffect } from 'react'
import { Card, MainFilter, TopFilter } from './components';
import './catalog.scss';
import { goodsService } from '../../../services/goodsService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setGoods } from '../../../features/goodsSlice';

export const Catalog: React.FC = () => {
  const { goods } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await goodsService.getItems();
        dispatch(setGoods(response.data || response));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dispatch]);

  return (
    <section className="catalog container">
      <MainFilter />
      <TopFilter />
      <aside className="catalog__aside">
        {goods.map((good) => {
          return (
            <Card
              key={good.id}
              good={good}
            />
          );
        })}
      </aside>
    </section>
  );
};
