import React from 'react'

export const NotFound: React.FC = () => {
  return (
    <div className="empty">
      <img src="img/media/items/page-not-found.svg" alt="page-not-found" />
      <h3 className="empty__title">Такої сторінки не існує</h3>
    </div>
  );
};
