import { BeatLoader } from 'react-spinners';
import { useAppSelector } from '../../store/store';
import style from './index.module.css';

interface Props {
  text: string;
}

const Loading = (props: Props) => {
  const theme = useAppSelector((state) => state.config.theme);
  return (
    <div
      className={style.finished}
      style={{
        color: theme.textColour,
        fontSize: '1.3em',
      }}>
      <BeatLoader color={theme.progressBar.progress} />
      <h3
        style={{
          color: theme.button.buttonHover,
        }}>
        {props.text}
      </h3>
    </div>
  );
};

export default Loading;
