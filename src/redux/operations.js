import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://64b177f2062767bc48264194.mockapi.io/tweetsUsers';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const updateFollowingStatus = createAsyncThunk(
  'users/updateFollowingStatus',
  async ({ id, isFollowing, followers }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await axios.put(`${BASE_URL}/${id}`, {
        isFollowing,
        followers 
      });
      return  {
        id,
        isFollowing
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);