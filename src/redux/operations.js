import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://64b177f2062767bc48264194.mockapi.io/tweetsUsers');
  return response.data;
});

export const getFollowingStatus = async (id) => {
    try {
      const response = await fetch(`https://64b177f2062767bc48264194.mockapi.io/tweetsUsers/${id}`);
      const data = await response.json();
      return data.isFollowing;
    } catch (error) {
      console.log(`Помилка при отриманні стану фоловінгу для користувача ${id}:`, error);
      throw error;
    }
  };
  
  export const updateFollowingStatus = createAsyncThunk(
    'users/updateFollowingStatus',
    async ({ id, isFollowing }, thunkAPI) => {
      try {
        const response = await axios.put(`https://64b177f2062767bc48264194.mockapi.io/tweetsUsers/${id}`, {
          isFollowing
        });
        const data = response.data;
        return data.isFollowing;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  
  
  
  
  