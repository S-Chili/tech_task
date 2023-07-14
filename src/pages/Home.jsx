import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/operations';
import { nextPage } from 'redux/userSlice';
import OutlinedCard from '../components/Card';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentPage = useSelector((state) => state.users.currentPage);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    dispatch(nextPage());
  };

  const renderedCards = [];
  for (let i = 0; i < currentPage * 3; i += 3) {
    const cardUsers = users.slice(i, i + 3);
    const renderedCard = (
      <div key={i}>
        {cardUsers.map((user) => (
          <OutlinedCard
            key={user.id}
            user={user.user}
            tweets={user.tweets}
            followers={user.followers}
            avatar={user.avatar}
            id={user.id}
          />
        ))}
      </div>
    );
    renderedCards.push(renderedCard);
  }

  return (
    <div>
      {renderedCards}
      {currentPage * 3 < users.length && (
        <button onClick={handleLoadMoreClick}>Load More</button>
      )}
    </div>
  );
};

export default Home;