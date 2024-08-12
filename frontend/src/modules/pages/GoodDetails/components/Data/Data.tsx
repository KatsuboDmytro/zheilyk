import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Good } from '../../../../../types/Good';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { SIZES } from '../../../../../vars';
import { addInCart } from '../../../../../features/goodsSlice';

interface Props {
  good: Good | null;
}

const images = ["img/main/accessories.png", "img/main/parties.png", "img/main/every_day.png"];
const colorsAvailable = ["Зелений", "Синій", "Срібний"];

export const Data: React.FC<Props> = ({ good }) => {
  const [isAddedInCart, setIsAddedInCart] = useState(false);
  const [choosedColor, setChoosedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [choosedSizes, setChoosedSizes] = useState<string | undefined>(
    '',
  );
  const { goods } = useAppSelector(state => state.goods);
  const dispatch = useAppDispatch();

  const imageToDisplay = (img: string) => {
    return img;
  };

  const handleAddToCart = async () => {
    dispatch(addInCart(good));
  };

  return (
    <div className="details__data">
      <aside className="details__images">
        <img
          src={images[activeImage]}
          alt="every-day"
          className="details__images--main"
        />
        <div className="details__images--blocks">
          {images.map((image, index) => (
            <div
              key={index}
              className={classNames('details__images--blocks-img', {
                'details__images--blocks-img-active': index === activeImage,
              })}
              onClick={() => setActiveImage(index)}
            >
              <img src={imageToDisplay(image)} alt="device" />
            </div>
          ))}
        </div>
      </aside>
      <aside className="details__filters">
        <div className="details__colors">
          <div className="details__colors--text">
            <p className="details__colors--title">Доступні кольори</p>
            <p className="details__colors--id">ID: {good?.id}</p>
          </div>
          <div className="details__filters--colors">
            {colorsAvailable.map((color, index) => (
              <div
                key={index}
                className={classNames('details__filters--colors-block', {
                  'details__filters--colors-block-active':
                    color === choosedColor,
                })}
                onClick={() => setChoosedColor(color)}
              >
                <div className="color" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>
        </div>
        <div className="details__capacity">
          <p className="details__capacity--title">Доступні розміри</p>
          <div className="details__capacity--capacities">
            {SIZES.map((size, index) => (
              <div
                key={index}
                className={classNames('details__capacity--capacities-block', {
                  'details__capacity--capacities-block-active':
                  size === choosedSizes,
                })}
                onClick={() => setChoosedSizes(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="details__buy">
          <div className="details__buy--price">
            <span>${good?.price}</span>
            <span>${good?.price}</span>
          </div>
          <div className="details__buy--buttons">
            <button
              type="button"
              className={classNames(
                {
                  'details__buy--buttons-cart': !isAddedInCart,
                },
                {
                  'details__buy--buttons-added': isAddedInCart,
                },
              )}
              onClick={handleAddToCart}
            >
              {isAddedInCart ? 'Вже у кошику' : 'Придбати'}
            </button>
          </div>
        </div>
      </aside>
      <div className="details__specs">
        <div className="details__spec">
          <span className="details__spec-label">Screen</span>
          <span className="details__spec-value">product?.screen</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">Resolution</span>
          <span className="details__spec-value">product?.resolution</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">Processor</span>
          <span className="details__spec-value">product?.processor</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">RAM</span>
          <span className="details__spec-value">product?.ram</span>
        </div>
      </div>
    </div>
  );
};
