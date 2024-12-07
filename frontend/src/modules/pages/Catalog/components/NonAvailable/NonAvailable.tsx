import React from 'react'
import { useTranslation } from 'react-i18next';

export const NonAvailable: React.FC = () => {
  const [t] = useTranslation('global')

  return (
    <div className="good__availability">
      <div className="stripes stripes-1" style={{ backgroundColor: 'black' }}>
        <div className="stripes__lines"></div>
        <p>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="stripes__text">
              {t('details.is_not_available')}
            </span>
          ))}
        </p>
        <div className="stripes__lines"></div>
      </div>
      <div className="stripes stripes-2" style={{ backgroundColor: 'black' }}>
        <div className="stripes__lines"></div>
        <p>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="stripes__text">
              {t('details.is_not_available')}
            </span>
          ))}
        </p>
        <div className="stripes__lines"></div>
      </div>
    </div>
  );
};
