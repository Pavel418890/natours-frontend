import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type { Locations, StartLocation } from '../locations/locationsSlice';
import type { Role } from '../user/userSlice';
import type { Review } from '../reviews/reviewsSlice';

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  difficult = 'difficult',
}

export interface Guide {
  role: Role.leadGuide | Role.guide;
  profile: {
    first_name: string;
    last_name: string;
    photo: string;
  };

  email: string;
  readonly id: string;
}

export interface StartDate {
  start_date: string;
}
export interface Tour {
  name: string;
  image_cover: string;
  duration: number;
  max_group_size: number;
  difficulty: Difficulty;
  secret_tour: boolean;
  start_dates: StartDate[];
  price: number;
  readonly id: string;
  readonly slug: string;
  discount_price: number;
  summary: string;
  description: string;
  readonly reviews?: Review[];
  readonly guides?: Guide[];
  readonly locations: Locations[];
  readonly start_locations: StartLocation[];
  images: { image: string }[];
  ratings_avg: number;
  ratings_quantity: number;
}

export const toursAdapter = createEntityAdapter<Tour>({
  selectId: (tour) => tour.id,
});

const tourSlice = createSlice({
  name: 'tours',
  initialState: toursAdapter.getInitialState(),
  reducers: {
    setTours: toursAdapter.addMany,
    toursReceived(state, { payload }: PayloadAction<Tour[]>) {
      toursAdapter.setAll(state, payload);
    },
    setTourDetail: toursAdapter.updateOne,
    tourReceived(state, { payload }: PayloadAction<Tour>) {
      toursAdapter.setOne(state, payload);
    },
  },
});

export const { setTours, setTourDetail } = tourSlice.actions;
export default tourSlice.reducer;
