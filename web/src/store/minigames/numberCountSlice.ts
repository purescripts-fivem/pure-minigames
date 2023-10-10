import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface numberCounterState {
  totalNumbers: number;
  seconds: number;
  timesToChangeNumbers: number;
  amountOfGames: number;
  gamesCompleted: number;
  gameSuccess: boolean;
  showGame: boolean;
  numbers: number[];
  incrementByAmount: number;
}

const initialState: numberCounterState = {
  totalNumbers: 4,
  seconds: 10,
  timesToChangeNumbers: 2,
  amountOfGames: 1,
  gamesCompleted: 0,
  gameSuccess: false,
  showGame: false,
  numbers: [],
  incrementByAmount: 0,
};

export const numberCounterSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setStartingData: (state, action: PayloadAction<any>) => {
      state.totalNumbers = action.payload.totalNumbers;
      state.seconds = action.payload.seconds;
      state.timesToChangeNumbers = action.payload.timesToChangeNumbers;
      state.amountOfGames = action.payload.amountOfGames;
      state.gamesCompleted = action.payload.gamesCompleted;
      state.gameSuccess = action.payload.gameSuccess;
      state.showGame = action.payload.showGame;
      state.incrementByAmount = action.payload.incrementByAmount;
    },
    addGamesCompleted: (state, action: PayloadAction<number>) => {
      state.gamesCompleted = action.payload + state.gamesCompleted;
    },
    addTotalNumbers: (state, action: PayloadAction<number>) => {
      state.totalNumbers = action.payload;
    },
    setTotalNumbers: (state, action: PayloadAction<number>) => {
      state.totalNumbers = action.payload;
      state.numbers = [];
      state.numbers = [...Array(action.payload).keys()];
    },
    setGameSuccess: (state, action: PayloadAction<boolean>) => {
      state.gameSuccess = action.payload;
    },
    setShowGame: (state, action: PayloadAction<boolean>) => {
      state.showGame = action.payload;
    },
    setNumbers: (state, action: PayloadAction<number[]>) => {
      state.numbers = action.payload;
    },
    randomiseNumbers: (state, action: PayloadAction<number[]>) => {
      state.numbers
        .sort(() => Math.random() - Math.random())
        .slice(0, state.totalNumbers);
    },

    // setConfig: (state, action: PayloadAction<any>) => {
    //   state.config = action.payload;
    // },
    // setLanguage: (state, action: PayloadAction<any>) => {
    //   state.language = action.payload;
    // },
    // setTheme: (state, action: PayloadAction<any>) => {
    //   state.theme = action.payload;
    // },
  },
});

export default numberCounterSlice.reducer;
export const {
  setStartingData,
  addGamesCompleted,
  addTotalNumbers,
  setTotalNumbers,
  setGameSuccess,
  setShowGame,
  setNumbers,
  randomiseNumbers,
} = numberCounterSlice.actions;
