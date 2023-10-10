import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendNui } from '../../utils/sendNui';

export interface reasonState {
  reason: string;
  hasFailed: boolean;
}

const initialState: reasonState = {
  reason: '',
  hasFailed: false,
};

export const failedSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFailedReason: (state, action: PayloadAction<string>) => {
      state.reason = action.payload;
    },
    setFailed: (state, action: PayloadAction<[boolean, string]>) => {
      state.hasFailed = action.payload[0];
      if (state.hasFailed) {
        setTimeout(() => {
          sendNui('gameFinished', {
            game: action.payload[1],
            success: false,
          });
        }, 2500);
      }
    },
    setFailedStart: (state) => {
      state.hasFailed = false;
      state.reason = '';
    },
  },
});

export default failedSlice.reducer;
export const { setFailedReason, setFailed, setFailedStart } =
  failedSlice.actions;
