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
      description: "The biggest T20 cricket league returns with its 17th season!"
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
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={800}
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Cricket Tournaments
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join and predict matches in ongoing tournaments
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          sx={{ px: { xs: 2, md: 4 } }}
        >
          {tournaments.map((tournament) => (
            <Grid item xs={12} md={6} lg={4} key={tournament.id}>
              <Card 
                elevation={4}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  position: 'relative',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={tournament.image}
                    alt={tournament.name}
                    sx={{ 
                      width: '100%',
                      height: 290,
                      objectFit: 'cover',
                    }}
                  />
                  <Chip 
                    label={tournament.status}
                    color={getStatusColor(tournament.status)}
                    sx={{ 
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      bgcolor: 'primary.main',
                      backgroundImage: 'linear-gradient(to right, #1976d2, #64b5f6)',
                    }} 
                  />
                </Box>

                <Divider sx={{ 
                  borderColor: 'divider',
                  borderWidth: 1,
                  width: '100%',
                }} />

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight={700}>
                    {tournament.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {tournament.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        {tournament.startDate} - {tournament.endDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Groups sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        {tournament.teams}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        {tournament.venue}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                    <Button 
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/tournament/${tournament.id}`)}
                      sx={{ 
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Memoize the entire component
export default React.memo(Home);