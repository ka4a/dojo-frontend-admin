import { createSlice } from '@reduxjs/toolkit';
import { displayOptionName } from '../../utils';
import { roleOptions } from '../../utils/constants';

const baseLayoutSlice = createSlice({
  name: 'baseLayout',
  initialState: {
    toast: {
      isOpened: false,
      body: '',
    },
  },
  reducers: {
    setToast(state, action) {
      const role = action.payload.body
        .split(' ')
        .find((word) => Object.values(roleOptions).includes(word));

      state.toast.body = action.payload.body.replace(
        role,
        displayOptionName(role),
      );

      state.toast.isOpened = true;
    },
    closeToast(state) {
      state.toast.isOpened = false;
    },
  },
});

export const {
  actions: { setToast, closeToast },
  reducer: baseLayoutReducer,
} = baseLayoutSlice;
