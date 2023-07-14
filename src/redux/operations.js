import axios from 'axios';

// Дія для отримання твітів
export const fetchTweets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://64b177f2062767bc48264194.mockapi.io/:tweetsUsers/tweets');
      const tweets = response.data;
      // Викликаємо дію для збереження твітів у Redux сторі
      dispatch(saveTweets(tweets));
    } catch (error) {
      // Обробка помилки, якщо не вдалося отримати твіти
      console.error('Failed to fetch tweets', error);
    }
  };
};

// Дія для отримання фоловерів
export const fetchFollowers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://64b177f2062767bc48264194.mockapi.io/:tweetsUsers/followers');
      const followers = response.data;
      // Викликаємо дію для збереження фоловерів у Redux сторі
      dispatch(saveFollowers(followers));
    } catch (error) {
      // Обробка помилки, якщо не вдалося отримати фоловерів
      console.error('Failed to fetch followers', error);
    }
  };
};

// Дія для збереження твітів
export const saveTweets = (tweets) => {
    return {
      type: 'SAVE_TWEETS',
      payload: tweets,
    };
  };
  
  // Дія для збереження фоловерів
  export const saveFollowers = (followers) => {
    return {
      type: 'SAVE_FOLLOWERS',
      payload: followers,
    };
  };