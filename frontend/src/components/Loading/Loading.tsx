import React from 'react'
import { Rings } from 'react-loader-spinner'

interface LoadingProp {
  color?: string;
  btnSize?: string;
  top?: string;
}

export const Loading: React.FC<LoadingProp> = ({ color, btnSize, top }) => {
	return (
		<div className='loading'>
			<Rings
				visible={true}
				height={btnSize || '80'}
				width={btnSize || '80'}
				color={`#${color || '000000'}`}
				ariaLabel='rings-loading'
				wrapperStyle={{ bottom: top || '8px' }}
				wrapperClass={btnSize ? 'loading__btn' : ''}
			/>
		</div>
	)
}
