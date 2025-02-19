import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme
} from '@mui/material';
import {
  Person,
  EmojiEvents,
  ExitToApp,
  Schedule,
  LocationOn,
  Groups,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

// Import images
import iplBanner from '../assets/ipl.jpg';
import t20Banner from '../assets/t20_wc.jpg';
import asiaCupBanner from '../assets/asiacup.jpg';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState('info');

  // Memoize the tournaments data
  const tournaments = useMemo(() => [
    {
      id: 1,
      name: "IPL 2025",
      image: iplBanner,
      status: "Live",
      startDate: "March 22, 2025",
      endDate: "May 26, 2025",
      teams: "10 Teams",
      venue: "Multiple Venues, India",
      description: "The biggest T20 cricket league is back with its 18th season!"
    },
    {
      id: 2,
      name: "T20 World Cup 2025",
      image: t20Banner,
      status: "Upcoming",
      startDate: "June 15, 2025",
      endDate: "July 15, 2025",
      teams: "16 Teams",
      venue: "West Indies & USA",
      description: "The ultimate T20 showdown between cricket nations."
    },
    {
      id: 3,
      name: "Asia Cup 2025",
      image: asiaCupBanner,
      status: "Completed",
      startDate: "February 1, 2025",
      endDate: "February 28, 2025",
      teams: "6 Teams",
      venue: "Dubai, UAE",
      description: "Asian cricket giants battled for continental supremacy."
    }
  ], []); // Empty dependency array as data is static

  // Memoize the getStatusColor function
  const getStatusColor = useMemo(() => (status) => {
    switch (status) {
      case 'Live':
        return 'error';
      case 'Upcoming':
        return 'primary';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  }, []);

  // Memoize the tournament cards
  const TournamentCard = useMemo(() => ({ tournament }) => (
    <Card 
      elevation={4}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box sx={{ 
        position: 'relative',
        height: '240px',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          image={tournament.image}
          alt={tournament.name}
          sx={{ 
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderBottom: `4px solid ${theme.palette.primary.main}`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <Chip 
          label={tournament.status}
          color={getStatusColor(tournament.status)}
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: 600,
            animation: tournament.status === 'Live' ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            }
          }}
        />
      </Box>

      <CardContent sx={{ 
        p: 3,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography 
            variant="h5" 
            fontWeight={700}
            gutterBottom
            sx={{ minHeight: '64px' }}
          >
            {tournament.name}
          </Typography>

          <Typography 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              minHeight: '60px',
              lineHeight: 1.5
            }}
          >
            {tournament.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1.5,
              height: '24px'
            }}>
              <Schedule sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                {tournament.startDate} - {tournament.endDate}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1.5,
              height: '24px'
            }}>
              <Groups sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                {tournament.teams}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              height: '24px'
            }}>
              <LocationOn sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                {tournament.venue}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => navigate(`/tournament/${tournament.id}`)}
          sx={{ 
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  ), [navigate, theme, getStatusColor]);

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        // Use CSS containment for better performance
        contain: 'content'
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* User Section */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                background: 'linear-gradient(45deg,rgb(29, 158, 218) 0%,rgb(92, 191, 206) 100%)',
                color: 'white'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    margin: '0 auto',
                    border: '3px solid white'
                  }}
                >
                  U
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                  User Name
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  user@email.com
                </Typography>
              </Box>

              <List component="nav" sx={{ mt: 2 }}>
                <ListItem 
                  button 
                  selected={selectedOption === 'info'}
                  onClick={() => setSelectedOption('info')}
                  sx={{ 
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }
                  }}
                >
                  <ListItemIcon>
                    <Person sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="My Information" />
                </ListItem>

                <ListItem 
                  button 
                  selected={selectedOption === 'winnings'}
                  onClick={() => setSelectedOption('winnings')}
                  sx={{ 
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }
                  }}
                >
                  <ListItemIcon>
                    <EmojiEvents sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="My Winnings" />
                </ListItem>

                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                <ListItem 
                  button 
                  onClick={() => navigate('/auth/login')}
                  sx={{ 
                    borderRadius: 1,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  <ListItemIcon>
                    <ExitToApp sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Tournament Section */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                gutterBottom
                sx={{
                  background: 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Tournaments
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Explore upcoming and ongoing cricket tournaments
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {tournaments.map((tournament) => (
                <Grid item xs={12} md={6} lg={4} key={tournament.id}>
                  <TournamentCard tournament={tournament} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Memoize the entire component
export default React.memo(Home);