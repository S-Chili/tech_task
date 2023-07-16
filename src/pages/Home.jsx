import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/operations';
import { nextPage } from '../redux/userSlice';
import OutlinedCard from '../components/Card';
import { 
  Button, 
  Box, 
  Checkbox, 
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentPage = useSelector((state) => state.users.currentPage);
  const [filter, setFilter] = useState('Show All');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    dispatch(nextPage());
  };

  const containerMain = {
    marginTop: '10px',
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const inputLabelStyle = {
    transform: 'translateY(-50%)',
    position: 'absolute',
    left: '60%',
    top: '50%',
    pointerEvents: 'none',
    color: '#808080',
    fontSize: '16px',
    fontWeight: '400',
  };

  const renderedCards = users
    .filter((user) => {
      if (filter === 'Show All') return true;
      if (filter === 'Follow') return !user.isFollowing;
      if (filter === 'Following') return user.isFollowing;
      return true;
    })
    .slice(0, currentPage * 3)
    .map((user) => (
      <OutlinedCard
        key={user.id}
        user={user.user}
        tweets={user.tweets}
        followers={user.followers}
        avatar={user.avatar}
        id={user.id}
        isFollowing={user.isFollowing}
      />
    ));

  const choosesVars = [
    { title: 'Show All' },
    { title: 'Follow' },
    { title: 'Following' },
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box style={containerMain} >
      <FormControl style={{ width: '100%' }}>
      <InputLabel shrink style={inputLabelStyle}>
          Select which type of cards you want to view?
        </InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          style={{
            backgroundColor: '#EBD8FF',
            boxShadow: '-2.5776965618133545px 6.873857021331787px 20.621572494506836px 0px rgba(0, 0, 0, 0.23)',
            color: '#FFFFFF',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          {choosesVars.map((option) => (
            <MenuItem key={option.title} value={option.title}>
              <Checkbox checked={option.title === filter} style={{ color: '#5CD3A8' }} />
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ marginTop: '100px', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', flexDirection: 'row', justifyContent: 'center' }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '150px' }}>
        <span style={{ color: '#808080' }}>© 2023 All Rights Reserved | Made by&nbsp; </span>
        <Link href="https://www.linkedin.com/in/anastasiia-tatarova1/" target="_blank" rel="noopener noreferrer" style={{ color: '#808080' }}>Anastasiia Tatarova</Link>
      </Box>
    </Box>
  );
};

export default Home;