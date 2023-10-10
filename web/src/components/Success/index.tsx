import style from './index.module.css';
import { useAppSelector } from '../../store/store';
import Lottie from 'react-lottie';
import animation from '../../assests/success.json';
import { useMemo } from 'react';
import audioFile from '../../assests/success.mp3';

const Success = () => {
  const audio = new Audio(audioFile);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useMemo(() => {
    audio.play();
  }, []);
  return (
    <div className={style.finished}>
      <Lottie options={defaultOptions} height={100} width={100} />{' '}
    </div>
  );
};

export default Success;
