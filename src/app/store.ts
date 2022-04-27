import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";

import { authApi } from "./services/auth";
import auth, { AuthState } from "../features/user/userSlice";
import ui from "../features/ui/uiSlice";
import tours, { toursAdapter } from "../features/tours/tourSlice";

import { setLocalStorageEncryptedItem } from "../utils/encryption";
import { loadState } from "../utils/localStorage";
import { baseApi, baseProtectedApi } from "./services/";

const authState = loadState("user", "token") as AuthState;
const preloadedState = { auth: authState };

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      auth,
      ui,
      tours,
      [authApi.reducerPath]: authApi.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [baseProtectedApi.reducerPath]: baseProtectedApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        baseApi.middleware,
        authApi.middleware,
        baseProtectedApi.middleware
      ),
    preloadedState,
    ...options,
  });

export const store = createStore();

store.subscribe(() => {
  try {
    const authState = store.getState().auth;
    const { user, refresh } = authState;
    if (!user || !refresh) return;
    setLocalStorageEncryptedItem("user", user);
    setLocalStorageEncryptedItem("refresh", refresh);
  } catch (e) {
    return null;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const tourSelectors = toursAdapter.getSelectors<RootState>(
  (state) => state.tours
);
