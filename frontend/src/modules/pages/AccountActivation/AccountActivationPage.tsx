import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { activate } from '../../../features/authSlice';
import '../Account/account.scss';
import { Loading } from '../../../components';

export const AccountActivationPage:React.FC = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { activationToken } = useParams();
  const { language } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivation = async () => {
      try {
        await dispatch(activate({activationToken, language})).unwrap();
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
    return <Loading />
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