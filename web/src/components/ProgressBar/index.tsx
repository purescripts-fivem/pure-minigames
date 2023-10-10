import { useEffect, useMemo, useState } from 'react';
import { useAppDistpatch, useAppSelector } from '../../store/store';
import style from './index.module.css';
import { setFailed, setFailedReason } from '../../store/features/failedSlice';
import {
  randomiseNumbers,
  setShowGame,
} from '../../store/minigames/numberCountSlice';

interface IProps {
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
}

const ProgressBar = (props: IProps) => {
  const config = useAppSelector((state) => state.config);
  const numberCounter = useAppSelector((state) => state.numberCounter);
  const failed = useAppSelector((state) => state.failed);
  const theme = config.theme;
  const language = config.language;
  const [width, setWidth] = useState<number>(100);
  const seconds = numberCounter.seconds;
  const dispatch = useAppDistpatch();
  
  useEffect(() => {
    setWidth(100);
  }, [props.isFinished]);

  let isFinished = props.isFinished;
  const widthChange = 100 / seconds;

  useMemo(() => {
    setWidth(100);
    setTimeout(() => {
      setWidth((prev) => prev - widthChange);
    }, 50);
  }, []);

  if (width < 0) {
    setWidth(0);
  }

  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  useEffect(() => {
    let left = seconds;
    const interval = setInterval(() => {
      left--;
      if (left <= 0) {
        clearInterval(interval);
        props.setIsFinished(true);
        dispatch(setFailedReason(language.tooSlow));
        dispatch(setFailed([true, currentGame]));
        setTimeout(() => {
          dispatch(setShowGame(false));
        }, 2500);
        return;
      }
      setWidth((prev) => prev - widthChange);
    }, 1000);
    if (isFinished) {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [isFinished]);

  return (
    <div
      className={style.progress}
      style={{
        backgroundColor: failed.hasFailed
          ? theme.progressBar.failedBackground
          : theme.progressBar.background,
      }}>
      <div
        className={style.progressInner}
        style={{
          width: props.isFinished ? 0 : `${width}%`,
          backgroundColor: theme.progressBar.progress,
        }}></div>
    </div>
  );
};

export default ProgressBar;
