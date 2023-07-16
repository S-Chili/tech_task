import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import EclipseAvatar from '../assets/EllipseAvatar.png';
import LogoContent from '../assets/Logo.png';
import ImgBig from '../assets/contentImg.png';
import { faker } from '@faker-js/faker';
import { 
  IconButton, 
  Box, 
  Card, 
  CardContent, 
  Typography,
} from '@mui/material';

const Tweets = () => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [tweets, setTweets] = useState('');
  const [followers, setFollowers] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fetch(`https://64b177f2062767bc48264194.mockapi.io/tweetsUsers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setTweets(data.tweets);
        setFollowers(data.followers);
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  };

  const generateRandomDate = () => {
    const startDate = new Date(2010, 0, 1);
    const endDate = new Date();
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toLocaleDateString();
  };

  const generateRandomText = () => {
    return faker.lorem.sentence();
  };

  return (
    <Box>
      <Link to="/">
        <IconButton 
          aria-label="delete" 
          disabled color="primary" 
        >
          <ArrowBackOutlinedIcon 
            sx={{
              color: '#5CD3A8',
            }}
          />
        </IconButton>
      </Link>
      <Box style={containerStyle}>
        <Card
          sx={{
            width: 760,
            height: 250,
            borderRadius: 5,
            backgroundImage:
              'linear-gradient(142deg, #471CA9 0%, #5736A3 69.10%, #4B2A99 100%)',
            boxShadow:
              '-2.5776965618133545px 6.873857021331787px 20.621572494506836px 0px rgba(0, 0, 0, 0.23)',
            margin: 0,
          }}
        >
          <CardContent sx={{ position: 'relative', height: '100%', padding: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}>
              <img src={LogoContent} alt="LogoContent" style={{ width: '76px', marginTop: '20px', marginLeft: '20px' }} />
              <img src={ImgBig} alt="ImgBig" style={{ width: '308px', height: '168px', marginLeft: '36px', marginTop: '-15px' }} />
              <Box sx={{ position: 'absolute', top: '44.2%', left: '90%', transform: 'translate(-50%, -50%)' }}>
                <img src={EclipseAvatar} alt="EclipseAvatar" style={{ width: '120px', height: '120px', position: 'absolute', marginTop: '6px', left: '50%', transform: 'translate(-50%, -50%)' }} />
                {avatar && (
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{
                      width: '90px',
                      height: '90px',
                      position: 'absolute',
                      top: '90%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  sx={{
                    color: '#EBD8FF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '25px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user}
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <Typography
                    sx={{
                      color: '#EBD8FF',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tweets} tweets
                  </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                  sx={{
                    color: '#EBD8FF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {formatNumberWithCommas(followers)} Followers
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ margin: '0 auto', marginTop: '30px', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', flexDirection: 'row' }}>
        {[...Array(tweets)].map((_, index) => (
          <Card
            key={index}
            sx={{
              flex: '0 0 calc(50% - 10px)',
              backgroundColor: '#F3F3F3',
              borderRadius: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent sx={{ padding: '12px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>{user}</Typography>
              <Typography sx={{ marginTop: '8px' }}>{generateRandomText()}</Typography>
              <Typography variant="caption" sx={{ color: 'gray', marginTop: '12px' }}>
                {generateRandomDate()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '50px' }}>
        <span style={{ color: '#808080' }}>© 2023 All Rights Reserved | Made by&nbsp; </span>
        <Link to="https://www.linkedin.com/in/anastasiia-tatarova1/" target="_blank" rel="noopener noreferrer" style={{ color: '#808080' }}>Anastasiia Tatarova</Link>
      </Box>
    </Box>
  );
};

export default Tweets;