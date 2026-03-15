import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const USERS_SLICE_NAME = 'users';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

export const getUsersThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const result = await API.getUsers();
      return result.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getUsersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    });

    builder.addCase(getUsersThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
