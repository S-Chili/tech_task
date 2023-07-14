import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rectangle from '../assets/Rectangle.png';
import EclipseAvatar from '../assets/EllipseAvatar.png'
import LogoContent from '../assets/Logo.png'
import ImgBig from '../assets/contentImg.png'
import EclipseCircle from '../assets/EllipseColor.png'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const OutlinedCard = () => {
  const storedFollowersCount = localStorage.getItem('followersCount');
  const storedIsFollowing = localStorage.getItem('isFollowing');

  const [followersCount, setFollowersCount] = useState(
    storedFollowersCount ? parseInt(storedFollowersCount) : 100500
  );
  const [isFollowing, setIsFollowing] = useState(
    storedIsFollowing ? storedIsFollowing === 'true' : false
  );

  useEffect(() => {
    // Збереження значень в localStorage при зміні стану
    localStorage.setItem('followersCount', followersCount.toString());
    localStorage.setItem('isFollowing', isFollowing.toString());
  }, [followersCount, isFollowing]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount(prevCount => prevCount - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount(prevCount => prevCount + 1);
      setIsFollowing(true);
    }
  };

  return (
    <Box>
      <Card sx={{ width: 380, height: 460, borderRadius: 5, backgroundImage: 'linear-gradient(142deg, #471CA9 0%, #5736A3 69.10%, #4B2A99 100%)', boxShadow: '-2.5776965618133545px 6.873857021331787px 20.621572494506836px 0px rgba(0, 0, 0, 0.23)' }}>
        <CardContent sx={{ position: 'relative', height: '100%', padding: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}>
            <img src={LogoContent} alt="LogoContent" style={{ width: '76px', marginTop: '20px', marginLeft: '20px' }} />
            <img src={ImgBig} alt="ImgBig" style={{ width: '308px', height: '168px', marginLeft: '36px', marginTop: '-15px' }} />
            <Box sx={{ position: 'absolute', top: '44.2%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <img src={Rectangle} alt="Rectangle" style={{ width: '380px', height: '14px', }} />
              <img src={EclipseCircle} alt="EclipseCircle" style={{ width: '70px', height: '70px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <img src={EclipseAvatar} alt="EclipseAvatar" style={{ width: '80px', height: '80px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </Box>
            <Box sx={{ position: 'absolute', top: '59%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Typography sx={{
                color: '#EBD8FF',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textTransform: 'uppercase'
              }}>
                777 tweets
              </Typography>
            </Box>
            <Box sx={{ width: '214px', position: 'absolute', top: '67%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Typography sx={{
                color: '#EBD8FF',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                textTransform: 'uppercase'
              }}>
                {followersCount.toLocaleString('en', { maximumFractionDigits: 0 })}
                {' '}
                Followers
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '10.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Button
                sx={{
                  width: '196px',
                  borderRadius: '10.311px',
                  background: isFollowing ? '#5CD3A8' : '#EBD8FF',
                  boxShadow: '0px 3.4369285106658936px 3.4369285106658936px 0px rgba(0, 0, 0, 0.25)',
                  padding: '14px 28px',
                  color: '#373737',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  textTransform: 'uppercase',
                  '&:hover': {
                    background: '#5CD3A8',
                  },
                  '&:active': {
                    background: '#5CD3A8',
                  }
                }}
                variant="contained"
                onClick={handleFollowClick}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;