import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateFollowingStatus } from './operations';

const initialState = {
  users: [],
  currentPage: 1,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    updateFollowers: (state, action) => {
      const { userId, updatedFollowers } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.followers = updatedFollowers;
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (Array.isArray(users)) {
        state.users = users.map((user) => ({ ...user, id: user.id }));
      }
    })
      .addCase(updateFollowingStatus.fulfilled, (state, action) => {
        const { id, isFollowing, updatedFollowers } = action.payload;
        const user = state.users.find((user) => user.id === id);
        if (user) {
          user.isFollowing = isFollowing;
          user.followers = updatedFollowers;
        }
      });
  },
});

export const { nextPage, updateFollowers } = usersSlice.actions;

export default usersSlice.reducer;