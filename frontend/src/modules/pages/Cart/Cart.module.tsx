import React, { useEffect } from 'react'
import { checkAuth } from '../../../features/authSlice';
import { useAppDispatch } from '../../../app/hooks';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div>Cart.module</div>
  )
}
