import { baseProtectedApi } from "./index";
import { User } from "../../features/user/userSlice";
import { Tour } from "../../features/tours/tourSlice";

export interface CheckoutSession {
  url: string;
}

export interface Booking {
  readonly id: number;
  created_at: string;
  is_paid: boolean;
  price: number;
  readonly user: User;
  readonly tour: Tour;
}
const bookingApi = baseProtectedApi.injectEndpoints({
  endpoints: (build) => ({
    getCheckoutSession: build.mutation<CheckoutSession, string>({
      query: (tourId) => ({ url: `/v1/bookings/${tourId}/` }),
    }),
    getCustomerBookings: build.query<Booking[], void>({
      query: () => ({
        url: `/v1/bookings/my/`,
      }),
    }),
  }),
});

export const { useGetCheckoutSessionMutation, useGetCustomerBookingsQuery } =
  bookingApi;
