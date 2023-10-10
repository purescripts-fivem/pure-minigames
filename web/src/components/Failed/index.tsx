import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './index.module.css';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../store/store';

const Failed = () => {
  const config = useAppSelector((state) => state.config);
  const theme = config.theme;
  const language = config.language;
  const failed = useAppSelector((state) => state.failed);
  return (
    <div className={style.finished}>
      <FontAwesomeIcon
        className={style.finishedText}
        icon={faTriangleExclamation}
        style={{
          color: theme.failedTextColour,
          fontSize: '2.5rem',
          filter: 'drop-shadow(0px 0px 5px rgba(1, 1, 1, 0.7))',
        }}
      />
      <h1
        className={style.finishedText}
        style={{
          color: theme.failedTextColour,
          fontSize: '2.5rem',
        }}>
        {language.failed}
      </h1>
      <h3
        className={style.finishedText}
        style={{
          color: theme.failedTextColour,
          fontSize: '0.9rem',
        }}>
        {failed.reason}
      </h3>
    </div>
  );
};

export default Failed;
