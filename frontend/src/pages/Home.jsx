import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider
} from '@mui/material';
import { Schedule, LocationOn, Groups } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import axiosInstance from '../hooks/useAxios';// Adjust path as needed
import Loader from '../components/Loader'; // Adjust path as needed

const Home = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/tournaments?isPopulateTeams=true');
        const tournamentData = Array.isArray(response.data.tournaments) ? response.data.tournaments : [];
        setTournaments(tournamentData);
        setLoading(false);
      } catch (error) {
        setTournaments([]);
        setLoading(false);
      }
    };

    
    fetchTournaments();
  }, []);
  const handleEditTournament = (tournamentId) => {
    navigate(`/tournament/team?tournamentId=${tournamentId}`);
  };

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

  if (loading) return <Loader />;

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        py: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={800}
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Cricket Tournaments
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' } }}
          >
            Join and predict matches in ongoing tournaments
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 2, md: 3 }}
          justifyContent="center"
          alignItems="stretch"
          sx={{ 
            px: { xs: 1, sm: 1, md: 0 }, 
            flexWrap: { md: 'nowrap' },
          }}
        >
          {tournaments.map((tournament) => (
            <Grid 
              xs={12} 
              sm={6} 
              md={4} 
              key={tournament._id || tournament.id}
              sx={{ 
                display: 'flex',
                flex: { md: '1 1 0px' },
                minWidth: 0,
                width: '100%'
              }}
            >
              <Card 
                elevation={4}
                sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: { xs: 2, md: 3 },
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={tournament.image || 'https://via.placeholder.com/300x200'} // Fallback image
                    alt={tournament.name}
                    sx={{ 
                      width: '100%',
                      height: { xs: 180, sm: 220, md: 240 },
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
                      fontWeight: 'bold',
                      px: 1
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      backgroundImage: 'linear-gradient(to right, #1976d2, #64b5f6)',
                    }} 
                  />
                </Box>

                <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom 
                    fontWeight={700}
                    sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' } }}
                  >
                    {tournament.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      minHeight: { xs: 'auto', sm: '40px', md: '50px' },
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {tournament.description || 'No description available.'}
                  </Typography>
                  
                  <Divider sx={{ width: '100%', my: 1.5 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <Schedule sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        Schedule: {formatDate(tournament?.schedule[0]?.value)} to{' '}
                        {formatDate(tournament?.schedule[1]?.value)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <Groups sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>
                        {tournament.teams?.length || 'N/A'} Teams
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>
                        {tournament.location || 'TBD'}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ width: '100%', my: 1.5 }} />

                  <Box sx={{ mt: 'auto' }}>
                    <Button 
                      variant="contained"
                      fullWidth
                      onClick={() => handleEditTournament(tournament.tournament_id)}
                      sx={{ 
                        borderRadius: { xs: 1.5, md: 2 },
                        py: { xs: 0.75, md: 1 },
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' },
                        fontWeight: 600,
                        boxShadow: 2,
                        '&:hover': {
                          boxShadow: 4,
                          background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)'
                        }
                      }}
                    >
                      View {tournament.status}
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

export default React.memo(Home);