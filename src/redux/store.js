import { createStore } from 'redux';

const initialState = {
  followersCount: 100500,
  isFollowing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        followersCount: state.followersCount + 1,
        isFollowing: true
      };
    case 'UNFOLLOW':
      return {
        ...state,
        followersCount: state.followersCount - 1,
        isFollowing: false
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;