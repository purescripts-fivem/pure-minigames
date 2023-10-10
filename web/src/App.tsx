import { useMemo, useState } from 'react';
import { debugData } from './utils/debugData';
import { fetchNui } from './utils/fetchNui';
import { useAppDistpatch, useAppSelector } from './store/store';
import { setConfig, setLanguage, setTheme } from './store/features/configSlice';
import { getThemeVariables } from './utils/getThemeVariables';
import GameHousing from './components/GameHousing';
import { setStartingData } from './store/minigames/numberCountSlice';
import { useNuiEvent } from './hooks/useNuiEvent';
import { setFailedStart } from './store/features/failedSlice';
import { setCurrentGame } from './store/features/currentGame';
import { startGameData } from './types/startGame';
import { isEnvBrowser } from './utils/misc';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const App = () => {
  const dispatch = useAppDistpatch();
  const numberCounter = useAppSelector((state) => state.numberCounter);
  const [loaded, setLoaded] = useState(false);

  useMemo(() => {
    const asyncConfig = async () => {
      const themeVariables = await getThemeVariables();
      dispatch(setTheme(themeVariables));
      setLoaded(true);
    };
    asyncConfig();

    fetchNui('getConfig', {}, {})
      .then((config) => {
        dispatch(setConfig(config));
      })
      .catch((err) => {
        console.log(err);
      });

    fetchNui(
      'getLanguage',
      {},
      {
        failed: 'Failed.',
        loadingNextGame: 'Loading Next Game...',
        wrongOrder: 'Wrong Order.',
        tooSlow: 'Too Slow.',
        loadingDevice: 'Loading Device...',
      }
    )
      .then((config) => {
        dispatch(setLanguage(config));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useNuiEvent('startGame', (data) => {
    startGame(data);
  });

  const startGame = (data: startGameData) => {
    const startingData = {
      totalNumbers: data.totalNumbers,
      seconds: data.seconds,
      timesToChangeNumbers: data.timesToChangeNumbers,
      amountOfGames: data.amountOfGames,
      gamesCompleted: 0,
      gameSuccess: false,
      showGame: true,
      incrementByAmount: data.incrementByAmount,
    };
    dispatch(setCurrentGame(data.game));
    dispatch(setFailedStart());
    dispatch(setStartingData(startingData));
  };

  if (!loaded) return null;

  return (
    <>
      {!numberCounter.showGame && isEnvBrowser() && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
          <label htmlFor='totalNo'>Total Number</label>
          <input type='number' id='fname' name='totalNo' placeholder='12' />
          <label htmlFor='seconds'>Seconds</label>
          <input type='number' id='fname' name='seconds' placeholder='15' />
          <label htmlFor='ttcn'>Times To Change Numbers</label>
          <input type='number' id='fname' name='ttcn' placeholder='1' />
          <label htmlFor='aog'>Amount of Games</label>
          <input type='number' id='fname' name='aog' placeholder='2' />
          <label htmlFor='iba'>Increment By Amount</label>
          <input type='number' id='fname' name='iba' placeholder='0' />
          <button
            onClick={(e) => {
              console.log('click', e);
            }}>
            Start Game
          </button>
          {/* <button
            onClick={() => {
              startGame({
                game: 'numberCounter',
                totalNumbers: 12,
                seconds: 20,
                timesToChangeNumbers: 2,
                amountOfGames: 2,
                incrementByAmount: 0,
              });
            }}>
            Start Game
          </button> */}
        </div>
      )}
      {numberCounter.showGame && <GameHousing />}
    </>
  );
};

export default App;
