import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components';
import { useAppDispatch } from '../../../app/hooks';
import { activate } from '../../../features/authSlice';

export const AccountActivationPage:React.FC = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { activationToken } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleActivation = async () => {
      try {
        await dispatch(activate(activationToken)).unwrap();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Wrong activation link');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setDone(true);
      }
    };

    handleActivation();
  }, [activationToken, dispatch]);

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="notification is-success is-light">
          Your account is now active
        </p>
      )}
    </>
  );
};