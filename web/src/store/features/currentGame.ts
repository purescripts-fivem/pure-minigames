import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface currentGameState {
  currentGame: string;
}

const initialState: currentGameState = {
  currentGame: '',
};

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<string>) => {
      state.currentGame = action.payload;
    },
  },
});

export default currentGameSlice.reducer;
export const { setCurrentGame } = currentGameSlice.actions;
