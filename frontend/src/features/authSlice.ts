import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import axios, { AxiosError } from 'axios';
import tokenStorage from '../vars';
import { refreshTokenService } from '../services/refreshTokenService';
import { accessTokenService } from '../services/accessTokenService';
import { User } from '../types/User';
import { LoginArgs, LoginResponse } from '../types/Login';


export interface ActionState {
  isChecked: boolean;
  user: User | null;
}

const loadStateFromLocalStorage = (): ActionState => {
  const isChecked = JSON.parse(localStorage.getItem('isChecked') || 'false');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return { isChecked, user };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('isChecked', JSON.stringify(state.isChecked));
  localStorage.setItem('user', JSON.stringify(state.user));
};

const initialState: ActionState = loadStateFromLocalStorage();

export const activate = createAsyncThunk<
  string,
  string | undefined,
  {
    rejectValue: { message: string };
  }
>(
  'auth/activate',
  async (activationToken, { rejectWithValue }) => {
    try {
      const responseActivate = await authService.activate(activationToken);
      const { access } = responseActivate.data || responseActivate;
      
      const responseUser = await authService.account(access);
      const { user } = responseUser.data || responseUser;
      console.log("🚀 ~ user:", user)
      tokenStorage.accessToken = access;

      return user;
    } catch (error) {
      console.log('activate ERROR', error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const login = createAsyncThunk<
  LoginResponse,
  LoginArgs,
  {
    rejectValue: { message: string };
  }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login({ email, password });
      const { access, refresh } = response.data || response;
      refreshTokenService.save(refresh);
      accessTokenService.save(access);
      tokenStorage.accessToken = access;

      const responseUser = await authService.account(access);
      dispatch(setUser(responseUser.data || responseUser));
      dispatch(setChecked(true));

      return { access, refresh };
    } catch (error: any) {
      console.log(error.response.data.detail);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.detail);
      } else if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const checkAuth = createAsyncThunk<
  { access: string; }, 
  void,
  {
    rejectValue: { message: string };
  }
>(
  'auth/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.refresh(refreshTokenService.get());
      const { access } = response.data || response;
      accessTokenService.save(access);

      return { access };
    } catch (error) {
      console.log('User is not authenticated');
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || 'Authentication failed' });
      } else if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    } finally {
      dispatch(setChecked(true));
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setChecked: (state: ActionState, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
      saveStateToLocalStorage(state);
    },
    setUser: (state: ActionState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      saveStateToLocalStorage(state);
    },
    init: (state: ActionState) => {
      const loadedState = loadStateFromLocalStorage();
      state.isChecked = loadedState.isChecked;
      state.user = loadedState.user;
    },
  },
});

export const {
  setChecked,
  setUser,
  init,
} = authSlice.actions;

export default authSlice.reducer;
