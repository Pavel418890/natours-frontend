import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import Notification from '../../components/UI/Notification';

export interface NotificationState {
  status: QueryStatus;
  title?: string | number;
  message?: string;
}
export interface UIState {
  notification: NotificationState | null;
}

const initialState: UIState = { notification: null };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (
      state,
      { payload: { message, status, title } }: PayloadAction<NotificationState>
    ) => {
      state.notification = { message, status, title };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const { showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;
export const selectCurrentNotificationState = (state: RootState) =>
  state.ui.notification;
