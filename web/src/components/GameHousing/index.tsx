import { useMemo, useState } from 'react';
import { useAppSelector } from '../../store/store';
import NumberCounter from '../NumberCounter';
import style from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';

const GameHousing = () => {
  const theme = useAppSelector((state) => state.config.theme);
  const language = useAppSelector((state) => state.config.language);
  const [loading, setLoading] = useState<boolean>(true);

  useMemo(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={style.container}>
      <div
        className={style.housing}
        style={{
          backgroundColor: theme.background,
        }}>
        {loading ? (
          <>
            <div className={style.top}>
              <FontAwesomeIcon
                icon={faUserSecret}
                style={{
                  color: theme.button.buttonHover,
                  fontSize: '2.5rem',
                  marginTop: '5%',
                }}
              />
            </div>
            <div className={style.bottom}>
              <Loading text={language.loadingDevice} />
            </div>
          </>
        ) : (
          <NumberCounter />
        )}
      </div>
    </div>
  );
};

export default GameHousing;
