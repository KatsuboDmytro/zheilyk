import React from 'react'
import { Rings } from 'react-loader-spinner';

export const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#000000"
        ariaLabel="rings-loading"
        wrapperStyle={{ }}
        wrapperClass=""
      />
    </div>
  );
};
