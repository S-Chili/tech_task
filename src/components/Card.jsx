import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rectangle from '../assets/Rectangle.png';
import EclipseAvatar from '../assets/EllipseAvatar.png';
import LogoContent from '../assets/Logo.png';
import ImgBig from '../assets/contentImg.png';
import EclipseCircle from '../assets/EllipseColor.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { updateFollowingStatus } from 'redux/operations';
import { Link } from 'react-router-dom';
import { updateFollowers } from '../redux/userSlice';

const OutlinedCard = ({ user, tweets, followers, avatar, id, isFollowing }) => {
  const dispatch = useDispatch();
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const [followingStatus, setFollowingStatus] = useState(isFollowing);

  useEffect(() => {
    setFollowingStatus(isFollowing);
  }, [isFollowing]);

  const handleFollowClick = async () => {
    const updatedFollowersCount = followingStatus ? currentFollowers - 1 : currentFollowers + 1;
  
    setFollowingStatus(!followingStatus);
    setCurrentFollowers(updatedFollowersCount);
  
    dispatch(
      updateFollowingStatus({
        id,
        isFollowing: !followingStatus,
        followers: updatedFollowersCount,
      })
    )
      .then((response) => {
        const { id } = response.payload;
        dispatch(updateFollowers({ userId: id, updatedFollowers: updatedFollowersCount }));
      })
      .catch((error) => {
        console.log(error);
        setFollowingStatus(!followingStatus);
        setCurrentFollowers(followers);
      });
  };

  const formatNumberWithCommas = (number) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  return (
    <Box sx={{ margin: 0 }}>
      <Card
        sx={{
          width: 380,
          height: 460,
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
            <Box sx={{ position: 'absolute', top: '44.2%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <img src={Rectangle} alt="Rectangle" style={{ width: '380px', height: '14px' }} />
              <img src={EclipseCircle} alt="EclipseCircle" style={{ width: '70px', height: '70px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <img src={EclipseAvatar} alt="EclipseAvatar" style={{ width: '80px', height: '80px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: '55px',
                    height: '55px',
                    position: 'absolute',
                    top: '28%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                  }}
                />
              )}
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
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user}
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', top: '66%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Link to={`/tweets/${id}`} style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: '#EBD8FF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    textTransform: 'uppercase',
                    '&:hover': {
                      color: '#5CD3A8',
                    },
                    '&:active': {
                      color: '#5CD3A8',
                    },
                  }}
                >
                  {tweets} tweets
                </Typography>
              </Link>
            </Box>
            <Box sx={{ position: 'absolute', top: '74%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                {formatNumberWithCommas(currentFollowers)} Followers
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '5.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Button
                sx={{
                  width: '196px',
                  borderRadius: '10.311px',
                  background: followingStatus ? '#5CD3A8' : '#EBD8FF',
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
                    background: followingStatus ? '#5CD3A8' : '#EBD8FF',
                  },
                  '&:active': {
                    background: followingStatus ? '#5CD3A8' : '#EBD8FF',
                  },
                }}
                variant="contained"
                onClick={handleFollowClick}
              >
                {followingStatus ? 'Following' : 'Follow'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;