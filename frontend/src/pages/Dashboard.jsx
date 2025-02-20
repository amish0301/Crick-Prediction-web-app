import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useTheme
} from '@mui/material';
import {
  Home,
  ContactSupport,
  Info,
  SportsCricket,
  Dashboard as DashboardIcon,
  NotificationsOutlined,
  Person,
  EmojiEvents,
  ExitToApp,
  Schedule,
  LocationOn,
  Groups,
  Timeline,
  FilterList,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleColorMode } = useThemeContext();
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [leaderboardTab, setLeaderboardTab] = useState(0);

  const navigationItems = [
    { 
      title: 'Home', 
      icon: <Home />, 
      path: '/',
    },
    { 
      title: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
    },
    { 
      title: 'About Us', 
      icon: <Info />, 
      path: '/about',
    },
    { 
      title: 'Contact', 
      icon: <ContactSupport />, 
      path: '/contact',
    },
  ];

  const liveMatches = [
    {
      id: 1,
      title: "India vs Australia",
      venue: "Eden Gardens, Kolkata",
      time: "7:30 PM IST",
      status: "Live",
      score: "IND 245/4 (35.2)"
    },
    {
      id: 2,
      title: "England vs South Africa",
      venue: "Lords, London",
      time: "3:30 PM GMT",
      status: "Live",
      score: "ENG 180/3 (25.0)"
    }
  ];

  const predictionOptions = [
    { value: '0', label: 'Dot Ball', color: '#e0e0e0' },
    { value: '1', label: 'Single', color: '#90caf9' },
    { value: '2', label: 'Double', color: '#81c784' },
    { value: '3', label: 'Three Runs', color: '#7986cb' },
    { value: '4', label: 'Four', color: '#4caf50' },
    { value: '6', label: 'Six', color: '#f44336' },
    { value: 'W', label: 'Wicket', color: '#ff9800' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* User Stats Section */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={4}
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgb(29, 158, 218) 0%, rgb(92, 191, 206) 100%)',
                boxShadow: '0 8px 32px rgba(29, 158, 218, 0.2)'
              }}
            >
              <Box sx={{ 
                p: 4, 
                textAlign: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  zIndex: 1
                }
              }}>
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: '0 auto',
                    border: '4px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  U
                </Avatar>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: 'white' }}>
                  User Name
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                  500 Points
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      75%
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Accuracy
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                      10
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Streak
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

              <List component="nav" sx={{ p: 2 }}>
                <ListItem 
                  component="div"
                  selected={leaderboardTab === 0}
                  onClick={() => setLeaderboardTab(0)}
                  sx={{ 
                    borderRadius: 2,
                    mb: 1,
                    cursor: 'pointer',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <ListItemIcon>
                    <Timeline sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="My Predictions" />
                </ListItem>

                <ListItem 
                  component="div"
                  selected={leaderboardTab === 1}
                  onClick={() => setLeaderboardTab(1)}
                  sx={{ 
                    borderRadius: 2,
                    mb: 1,
                    cursor: 'pointer',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <ListItemIcon>
                    <EmojiEvents sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Leaderboard" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Main Content Section */}
          <Grid item xs={12} md={9}>
            {/* Live Matches */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography 
                  variant="h4" 
                  fontWeight={800}
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Live Matches
                </Typography>
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Filter Matches
                </Button>
              </Box>

              <Grid container spacing={3}>
                {liveMatches.map((match) => (
                  <Grid item xs={12} md={6} key={match.id}>
                    <Card 
                      elevation={4}
                      sx={{ 
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                          <Typography variant="h5" fontWeight={700}>
                            {match.title}
                          </Typography>
                          <Chip 
                            label={match.status} 
                            color="error"
                            sx={{ 
                              fontWeight: 600,
                              animation: 'pulse 1.5s infinite',
                              '@keyframes pulse': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.7 },
                                '100%': { opacity: 1 },
                              }
                            }}
                          />
                        </Box>

                        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                          {match.score}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2">
                            {match.venue}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Schedule sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2">
                            {match.time}
                          </Typography>
                        </Box>

                        <Button 
                          variant="contained"
                          fullWidth
                          sx={{ 
                            borderRadius: 2,
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600
                          }}
                        >
                          Predict Now
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Prediction Section */}
            <Box sx={{ mb: 4 }}>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 100%)'
                }}
              >
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Predict Next Ball
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {predictionOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={selectedPrediction === option.value ? "contained" : "outlined"}
                      onClick={() => setSelectedPrediction(option.value)}
                      sx={{ 
                        minWidth: '80px',
                        borderRadius: 2,
                        py: 1,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderColor: option.color,
                        bgcolor: selectedPrediction === option.value ? option.color : 'transparent',
                        color: selectedPrediction === option.value ? 'white' : option.color,
                        '&:hover': {
                          bgcolor: option.color,
                          color: 'white',
                          opacity: 0.9
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {option.value}
                    </Button>
                  ))}
                </Box>

                {selectedPrediction && (
                  <Typography color="primary" fontWeight={600}>
                    Your Prediction: {selectedPrediction}
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Leaderboard */}
            <Box>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 3,
                  borderRadius: 3
                }}
              >
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Top Predictors
                </Typography>

                {[1, 2, 3].map((position) => (
                  <Box
                    key={position}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 2,
                      borderBottom: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Typography 
                      fontWeight={700} 
                      color="primary"
                      sx={{ fontSize: '1.2rem' }}
                    >
                      #{position}
                    </Typography>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={600}>User Name</Typography>
                      <Typography variant="body2" color="text.secondary">
                        1200 points
                      </Typography>
                    </Box>
                    <EmojiEvents color="primary" />
                  </Box>
                ))}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 