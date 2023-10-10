import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDistpatch, useAppSelector } from '../../store/store';
import style from './index.module.css';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../ProgressBar';
import Failed from '../Failed';
import { setFailed, setFailedReason } from '../../store/features/failedSlice';
import {
  addGamesCompleted,
  randomiseNumbers,
  setGameSuccess,
  setNumbers,
  setShowGame,
  setTotalNumbers,
} from '../../store/minigames/numberCountSlice';
import Success from '../Success';
import audioFile from '../../assests/click.mp3';
import { sendNui } from '../../utils/sendNui';
import Loading from '../Loading';

const NumberCounter = () => {
  const config = useAppSelector((state) => state.config);
  const numberCounter = useAppSelector((state) => state.numberCounter);
  const failed = useAppSelector((state) => state.failed);
  const theme = config.theme;
  const language = config.language;
  const totalNumbers = numberCounter.totalNumbers;
  const dispatch = useAppDistpatch();

  const [lastNumber, setLastNumber] = useState<number>(0);
  const [numbersClicked, setNumbersClicked] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(100);

  let timeBeen = 0;
  let index = 0;

  const isSquare = Math.sqrt(totalNumbers) % 1 === 0;

  const getFactors = (num: number) => {
    const isEven = num % 2 === 0;
    const max = Math.sqrt(num);
    const inc = isEven ? 1 : 2;
    let factors = [1, num];

    for (let curFactor = isEven ? 2 : 3; curFactor <= max; curFactor += inc) {
      if (num % curFactor !== 0) continue;
      factors.push(curFactor);
      let compliment = num / curFactor;
      if (compliment !== curFactor) factors.push(compliment);
    }

    return factors;
  };

  const factors = getFactors(totalNumbers);
  const lastTwoDigits = factors.slice(-2);

  const gridLayout = isSquare
    ? [lastTwoDigits[1], lastTwoDigits[1]]
    : [lastTwoDigits[1], lastTwoDigits[0]];

  useMemo(() => {
    const numbersToSet = Array.from(Array(totalNumbers).keys());
    numbersToSet
      .sort(() => Math.random() - Math.random())
      .slice(0, totalNumbers);
    dispatch(setNumbers(numbersToSet));
    setIsSuccess(false);
    setLastNumber(0);
    setIsFinished(false);
    dispatch(setFailed([false, '']));
    dispatch(randomiseNumbers([]));
  }, []);

  const audio = new Audio(audioFile);

  const currentGame = useAppSelector((state) => state.currentGame.currentGame);

  const handleClick = (number: number) => {
    if (isFinished) return;
    setNumbersClicked([...numbersClicked, number]);
    audio.volume = 0.2;
    audio.play();
    if (lastNumber !== number) {
      setIsFinished(true);
      dispatch(setFailedReason(language.wrongNumber));
      dispatch(setFailed([true, currentGame]));
      setTimeout(() => {
        dispatch(setShowGame(false));
      }, 2500);
      return;
    }
    if (number + 1 === totalNumbers) {
      setIsFinished(true);
      dispatch(addGamesCompleted(1));
      dispatch(setTotalNumbers(totalNumbers + numberCounter.incrementByAmount));
      return;
    }
    setLastNumber(number + 1);
  };

  useEffect(() => {
    if (numberCounter.gamesCompleted >= numberCounter.amountOfGames) {
      setIsSuccess(true);
      return;
    }
    if (!failed.hasFailed && numberCounter.gamesCompleted > 0) {
      setTimeout(() => {
        setNumbersClicked([]);
        dispatch(randomiseNumbers([]));
        setLastNumber(0);
        setIsFinished(false);
      }, 3000);
    }
  }, [numberCounter.gamesCompleted]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setGameSuccess(true));
        dispatch(setShowGame(false));
        sendNui('gameFinished', { game: currentGame, success: true });
      }, 2500);
    }
  }, [isSuccess]);

  const timesToChangeNumbers = numberCounter.timesToChangeNumbers;
  const seconds = numberCounter.seconds;

  const generateTime = () => {
    if (timesToChangeNumbers === 1) {
      return [Math.floor(seconds / 2)];
    }
    const stuff = Math.round(seconds / timesToChangeNumbers / 2) + 1;
    let lastNumber = 0;
    const toReturn: number[] = [];
    for (let i = 0; i < timesToChangeNumbers; i++) {
      lastNumber = lastNumber + stuff;
      toReturn.push(lastNumber);
    }
    toReturn.reverse();
    return toReturn;
  };

  const whenToChangeNumbers = generateTime();

  useMemo(() => {
    setWidth(100);
    setTimeout(() => {
      setWidth((prev) => prev - 100 / (seconds - whenToChangeNumbers[0]));
    }, 50);
  }, []);

  const generateWidthChange = () => {
    return 100 / (seconds - timeBeen - whenToChangeNumbers[index]);
  };

  if (width < 0) {
    setWidth(0);
  }

  useEffect(() => {
    if (numberCounter.gamesCompleted === 0) return;
    if (isFinished) return;
    setWidth(100);
    setTimeout(() => {
      setWidth((prev) => prev - 100 / (seconds - whenToChangeNumbers[0]));
    }, 2500);
  }, [isFinished]);

  useEffect(() => {
    let left = seconds;
    let amountToChange = generateWidthChange();

    const interval = setInterval(() => {
      left--;
      timeBeen++;
      if (index === whenToChangeNumbers.length) {
        setWidth(0);
        clearInterval(interval);
        return;
      }
      if (whenToChangeNumbers.includes(left)) {
        index++;
        dispatch(randomiseNumbers([]));
        if (index !== whenToChangeNumbers.length) {
          setWidth(100);
        }
        amountToChange = generateWidthChange();
      }
      setWidth((prev) => prev - amountToChange);
    }, 1000);
    if (isFinished) {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [isFinished]);

  return (
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
        <ProgressBar setIsFinished={setIsFinished} isFinished={isFinished} />
      </div>
      <div className={style.bottom}>
        {isFinished && failed.hasFailed && <Failed />}
        {isFinished && !failed.hasFailed && !isSuccess && (
          <Loading text={language.loadingNextGame} />
        )}
        {isSuccess && <Success />}
        <div
          className={style.buttonHolder}
          style={{
            gridTemplateColumns: `repeat(${gridLayout[1]}, 1fr)`,
            gridTemplateRows: `repeat(${gridLayout[0]}, 1fr)`,
            opacity: isFinished ? 0.045 : 1,
          }}>
          {numberCounter.numbers.map((i) => (
            <div
              key={i}
              className={style.button}
              onClick={() => {
                handleClick(i);
              }}
              style={{
                backgroundColor: numbersClicked.includes(i)
                  ? theme.button.buttonSelected
                  : theme.button.buttonBackground,
                color: theme.button.buttonText,
                width: '100% !important',
                height: '100% !important',
                fontSize: '1.5rem',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.button.buttonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = numbersClicked.includes(
                  i
                )
                  ? theme.button.buttonSelected
                  : theme.button.buttonBackground;
              }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className={style.progBar}>
        <div
          className={style.progress}
          style={{
            backgroundColor: theme.progressBar.numberRandomiserBackground,
          }}>
          <div
            className={style.progressInner}
            style={{
              width: `${width}%`,
              backgroundColor: theme.progressBar.numberRandomiserProgress,
            }}></div>
        </div>
      </div>
    </>
  );
};

export default NumberCounter;
