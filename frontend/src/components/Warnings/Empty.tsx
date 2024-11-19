import React from 'react'
import { Link } from 'react-router-dom';

interface EmptyProps {
  text: string;
  isCart?: boolean;
}

export const Empty: React.FC<EmptyProps> = ({ text, isCart }) => {
  return (
    <div className="empty">
      <img src="img/media/items/empty-box.svg" alt="empty" />
      <h3 className="empty__title">{text}</h3>
      {isCart && <Link to='/catalog' className='checkout__warning--link'>Обрати товар</Link>}
    </div>
  );
};
