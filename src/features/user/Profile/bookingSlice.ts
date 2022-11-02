import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type { User } from '../..//user/userSlice';
import type { Tour } from '../../tours/tourSlice';

export interface Booking {
  readonly id: number;
  created_at: string;
  is_paid: boolean;
  price: number;
  readonly user: User;
  readonly tour: Tour;
}
export const bookingsAdapter = createEntityAdapter<Booking>({
  selectId: (booking) => booking.id,
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: bookingsAdapter.getInitialState(),
  reducers: {
    setBookings: bookingsAdapter.addMany,
    bookingsReceived(state, { payload }: PayloadAction<Booking[]>) {
      bookingsAdapter.setAll(state, payload);
    },
    setBookingDetail: bookingsAdapter.updateOne,
    bookingReceived(state, { payload }: PayloadAction<Booking>) {
      bookingsAdapter.setOne(state, payload);
    },
  },
});

export const { setBookings, setBookingDetail } = bookingSlice.actions;
export default bookingSlice.reducer;
