import { baseApi, baseProtectedApi } from "./index";
import type { Tour } from "../../features/tours/tourSlice";

const allToursApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTours: build.query<Tour[], void>({
      query: () => "/v2/tours/",
    }),
  }),
});

const getTourApi = baseProtectedApi.injectEndpoints({
  endpoints: (build) => ({
    getTour: build.query<Tour, string>({
      query: (slug) => `/v2/tours/${slug}/`,
    }),
  }),
});

export const { useGetAllToursQuery } = allToursApi;
export const { useGetTourQuery } = getTourApi;
