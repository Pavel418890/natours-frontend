import { baseProtectedApi } from './index';
import { Booking } from '../../features/user/Profile/bookingSlice';

export interface CheckoutSession {
  url: string;
}

const bookingApi = baseProtectedApi.injectEndpoints({
  endpoints: (build) => ({
    getCheckoutSession: build.mutation<CheckoutSession, string>({
      query: (tourId) => ({ url: `/v1/bookings/${tourId}/` }),
    }),
    getCustomerBookings: build.query<Booking[], void>({
      query: () => `/v1/bookings/my/`,
    }),
  }),
});

export const { useGetCheckoutSessionMutation, useGetCustomerBookingsQuery } =
  bookingApi;
