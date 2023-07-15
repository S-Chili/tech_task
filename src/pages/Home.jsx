import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/operations';
import { nextPage } from '../redux/userSlice';
import OutlinedCard from '../components/Card';
import { Button, Box } from '@mui/material';

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

  const containerMain = {
    marginTop: '100px',
  };
  
  const cardGridStyle = {
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gridGap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vh',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderedCards = users.slice(0, currentPage * 3).map((user) => (
    <OutlinedCard
      key={user.id}
      user={user.user}
      tweets={user.tweets}
      followers={user.followers}
      avatar={user.avatar}
      id={user.id}
    />
  ));

  return (
    <Box style={containerMain} >
      <Box style={cardGridStyle}>
        {renderedCards}
      </Box>
      {currentPage * 3 < users.length && (
        <Box style={containerStyle}>
        <Button 
          variant="outlined" 
          onClick={handleLoadMoreClick}
          sx={{
            marginTop: '20px',
            width: '196px',
            borderRadius: '10.311px',
            background: '#EBD8FF',
            borderColor: 'transparent',
            boxShadow: '0px 3.4369285106658936px 3.4369285106658936px 0px rgba(0, 0, 0, 0.25)',
            padding: '14px 28px',
            color: '#ffffff',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            textTransform: 'uppercase',
            '&:hover': {
              background: '#5CD3A8',
              borderColor: 'transparent',
            },
            '&:active': {
              background: '#5CD3A8',
              borderColor: 'transparent',
            },
          }}
        >
          Load More
        </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;