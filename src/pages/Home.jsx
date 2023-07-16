import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/operations';
import { nextPage } from '../redux/userSlice';
import OutlinedCard from '../components/Card';
import { 
  Button, 
  Box, 
  Checkbox, 
  TextField, 
  Autocomplete,
  Link,
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

  const handleFilterChange = (event, value) => {
    if (value.length === 0) {
      setFilter('Show All');
    } else {
      const selectedFilter = value[0].title;
      const isValidFilter = choosesVars.some((option) => option.title === selectedFilter);
      if (isValidFilter) {
        setFilter(selectedFilter);
      }
    }
  };
  
  const handleAutocompleteClick = (event) => {
    if (event.target.textContent === 'Show All') {
      setFilter('Show All');
    }
  };

  return (
    <Box style={containerMain} >
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        onClick={handleAutocompleteClick}
        options={choosesVars}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.title}
          </li>
        )}
        style={{
          width: '100%',
          backgroundColor: '#EBD8FF',
          boxShadow: '-2.5776965618133545px 6.873857021331787px 20.621572494506836px 0px rgba(0, 0, 0, 0.23)',
        }}
        value={filter === 'Show All' ? [] : [{ title: filter }]}
        onChange={handleFilterChange}
        renderInput={(params) => <TextField {...params} label="Select which type of cards you want to view?" />}
        isOptionEqualToValue={(option, value) => option.title === value.title}
      />
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