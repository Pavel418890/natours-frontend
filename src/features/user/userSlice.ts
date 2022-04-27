import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import type { SignInResponse } from '../../app/services/auth';
import { setLocalStorageEncryptedItem } from '../../utils/encryption';

export enum Role {
  admin = 'admin',
  user = 'user',
  guide = 'guide',
  leadGuide = 'lead-guide',
}
export interface Profile {
  first_name: string;
  last_name: string;
  photo: string;
  id: number;
}

export interface Token {
  token: string;
  expires_at: number;
}

export interface TokenPair {
  access: Token;
  refresh: Token;
}

export interface User {
  id: number;
  email: string;
  last_login?: Date;
  is_email_confirmed?: boolean;
  role?: Role;
  profile: Profile;
}

export type AuthState = {
  user: User | null;
  refresh: Token | null;
};

const initialState = { user: null, refresh: null } as AuthState;
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<SignInResponse | undefined>
    ) => {
      if (!payload) return;
      state.refresh = payload.token.refresh;
      state.user = payload.user;
      localStorage.setItem('access', JSON.stringify(payload.token.access));
    },
    updateUserProfile: (state, actions) => {
      state.user!.profile.first_name = actions.payload.first_name;
      state.user!.profile.last_name = actions.payload.last_name;
      setLocalStorageEncryptedItem('user', state.user);
    },
    updateUserPhoto: (state, actions) => {
      state.user!.profile.photo = actions.payload.photo;
      setLocalStorageEncryptedItem('user', state.user);
    },
    updateUserEmailAddress: (state, actions) => {
      state.user!.email = actions.payload.email;
      setLocalStorageEncryptedItem('user', state.user);
    },
    logout: (state) => {
      state.user = null;
      state.refresh = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
