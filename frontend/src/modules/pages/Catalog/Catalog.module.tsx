import React, { useEffect, useState, useMemo } from 'react';
import { Card, MainFilter, TopFilter } from './components';
import './catalog.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setFilters, setGoods } from '../../../features/goodsSlice';
import { useSearchParams } from 'react-router-dom';
import { WAYS } from '../../../vars';
import goodsService from '../../../services/goods/goodsService';
import useWideScreen from '../../../app/useWideScreen';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../components';
import { Error } from '../../../components/Warnings/Error';
import { Empty } from '../../../components/Warnings/Empty';

export const Catalog: React.FC = () => {
  const { t } = useTranslation('global');
  const { isWideScreen } = useWideScreen();
  const language = useAppSelector((state) => state.goods.language as string);
  const { goods, inputFilter } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const ways = WAYS(t);

  const getInitialValues = (param: string) => searchParams.get(param)?.split(',') || [];

  const [choosedSizes, setChoosedSizes] = useState(() => getInitialValues('size'));
  const [choosedColors, setChoosedColors] = useState(() => getInitialValues('color'));
  const [choosedBrands, setChoosedBrands] = useState(() => getInitialValues('brand'));
  const [isSale, setIsSale] = useState(() => searchParams.get('sale') === 'true');
  const [isAvailable, setIsAvailable] = useState(() => searchParams.get('available') === 'true');
  const [wayToFilter, setWayToFilter] = useState(() => searchParams.get('way') || ways[0]);

  useEffect(() => {
    const params: Record<string, string> = {
      ...(choosedSizes.length > 0 && { size: choosedSizes.join(',') }),
      ...(choosedColors.length > 0 && { color: choosedColors.join(',') }),
      ...(choosedBrands.length > 0 && { brand: choosedBrands.join(',') }),
      ...(isSale && { sale: 'true' }),
      ...(isAvailable && { available: 'true' }),
      way: wayToFilter,
    };
    setSearchParams(params);
  }, [choosedSizes, choosedColors, choosedBrands, isSale, isAvailable, wayToFilter, setSearchParams]);

  useEffect(() => {
    const fetchGoods = async () => {
      setIsLoading(true);
      try {
        const response = await goodsService.getItems();
        const data = response.data || response;
        dispatch(setGoods(data));
        dispatch(setFilters(data));
      } catch (error) {
        setErrorText(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoods();
  }, [dispatch, language]);

  const filteredGoods = useMemo(() => {
    return goods
      .filter((good) => {
        const matchesSize =
          choosedSizes.length === 0 || choosedSizes.some((size) => good.additional_info.some((info) => info.size === size));
        const matchesColor =
          choosedColors.length === 0 || choosedColors.some((color) => good.additional_info.some((info) => info.color === color));
        const matchesBrand = choosedBrands.length === 0 || choosedBrands.includes(good.brand);
        const matchesSale = !isSale || good.sale_price !== null;
        const matchesAvailability = !isAvailable || good.in_stock;
        const matchesInput = !inputFilter || good.name.toLowerCase().includes(inputFilter.toLowerCase());
        return matchesSize && matchesColor && matchesBrand && matchesSale && matchesAvailability && matchesInput;
      })
      .sort((a, b) => {
        if (wayToFilter === ways[0]) {
          return new Date(a.date_added || 0).getTime() - new Date(b.date_added || 0).getTime();
        }
        const priceDiff = parseFloat(a.price) - parseFloat(b.price);
        return wayToFilter === ways[1] ? priceDiff : -priceDiff;
      });
  }, [goods, choosedSizes, choosedColors, choosedBrands, isSale, isAvailable, inputFilter, wayToFilter, ways]);

  if (isLoading) return <Loading />;
  if (errorText) return <Error />;

  return (
    <section className="catalog container">
      <div className="contents">
        <div className="filter__title" onClick={() => setIsOpenFilter((prev) => !prev)}>
          <img src="img/icons/filter.svg" className="filter__title--img" alt="filter" />
          <h3 className="filter__title--text">
            {isWideScreen
              ? t('catalog.subtitle')
              : isOpenFilter
              ? t('catalog.subtitle_close')
              : t('catalog.subtitle_open')}
          </h3>
        </div>
        <div
          className="catalog__tablet--filters"
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
          <TopFilter wayToFilter={wayToFilter} setWayToFilter={setWayToFilter} />
        </div>
      </div>
      <aside className="catalog__aside" style={{ left: isOpenFilter ? '250px' : '0px' }}>
        {filteredGoods.length === 0 ? (
          <Empty text={t('catalog.not_find')} />
        ) : (
          filteredGoods.map((good) => <Card key={good.id} good={good} />)
        )}
      </aside>
    </section>
  );
};
