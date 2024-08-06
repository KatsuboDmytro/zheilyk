import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../components';
import { useAppDispatch } from '../../../app/hooks';
import { activate } from '../../../features/authSlice';
import '../Account/account.scss';

export const AccountActivationPage:React.FC = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { activationToken } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivation = async () => {
      try {
        await dispatch(activate(activationToken)).unwrap();
        setTimeout(() => {
          navigate('/log-in');
        }, 3000);

        return;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Wrong activation link');
        }
      } finally {
        setDone(true);
        setTimeout(() => {
          navigate('/log-in');
        }, 3000);
      }
    };

    handleActivation();
  }, [activationToken, dispatch]);

  if (!done) {
    return <Loader />
  }

  return (
    <section className='container activation'>
      <h1 className="activation__title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="activation__notification">
          Your account is now active
        </p>
      )}
    </section>
  );
};