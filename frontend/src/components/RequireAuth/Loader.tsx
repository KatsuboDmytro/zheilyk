import React from 'react'
import { ColorRing } from 'react-loader-spinner';

export const Loader: React.FC = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#222529', '#353A3F', '#4A5056', '#878E95', '#F1F3F5']}
    />
  );
};
