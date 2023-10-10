import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configSlice } from './features/configSlice';
import { failedSlice } from './features/failedSlice';
import { numberCounterSlice } from './minigames/numberCountSlice';
import { currentGameSlice } from './features/currentGame';

export const minigamesStore = configureStore({
  reducer: {
    config: configSlice.reducer,
    failed: failedSlice.reducer,
    currentGame: currentGameSlice.reducer,
    numberCounter: numberCounterSlice.reducer,
  },
});

export const useAppDistpatch: () => typeof minigamesStore.dispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof minigamesStore.getState>
> = useSelector;
