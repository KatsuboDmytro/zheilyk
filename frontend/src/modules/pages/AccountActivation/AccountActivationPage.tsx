import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import '../Account/account.scss';
import { Loading } from '../../../components';
import authService from '../../../services/access/authService';
import { useTranslation } from 'react-i18next';

export const AccountActivationPage: React.FC = () => {
  const [t] = useTranslation("global");
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { activationToken } = useParams();
  const { language } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivation = async () => {
      try {
        await authService.activate(language, activationToken || '');
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
      <h1 className="activation__title">{t("activation.title")}</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="activation__notification">
          {t("activation.description")}
        </p>
      )}
    </section>
  );
};