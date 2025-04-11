import { Container, Paper, Stack, Typography, Button, Card, CardContent, CardHeader, Box, Divider, Avatar, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import {
  AddCircleOutline as AssignIcon,
  RemoveCircleOutline as UnassignIcon
} from '@mui/icons-material';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ActionIcon = styled(Box)(({ theme }) => ({
  padding: '6px',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  transition: 'box-shadow 0.3s, background-color 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[6],
    backgroundColor: '#f8f8f8',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: '#fafafa',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.3rem',
  backgroundColor: '#286675',
  color: 'white',
  padding: theme.spacing(1.5, 3),
  borderRadius: '10px 10px 0 0',
  letterSpacing: '0.5px',
}));

const TournamentTeams = () => {
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournamentId');
  const [availableTeams, setAvailableTeams] = useState([]);
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tournamentDetails, setTournamentDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/${tournamentId}`);
        console.log("Fetched Tournament:", res.data.tournaments); 
        setTournamentDetails(res.data.tournaments);
      } catch (err) {
        console.error('Error fetching tournament details:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableTeams = async () => {
      try {
        setLoading(true);
        const teamsResponse = await axiosInstance.get('/admin/teams');
        setAvailableTeams(teamsResponse.data.teams || []);
      } catch (error) {
        console.error('Error fetching available teams:', error);
        toast.error('Failed to load available teams');
      } finally {
        setLoading(false);
      }
    };

    const fetchAssignedTeams = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/admin/tournaments?isPopulateTeams=true`);
        const tournaments = response.data.tournaments || [];
        const currentTournament = tournaments.find(t => t.tournament_id.toString() === tournamentId);

        if (currentTournament && currentTournament.teams) {
          setAssignedTeams(currentTournament.teams);
        } else {
          setAssignedTeams([]);
        }
      } catch (error) {
        console.error('Error fetching assigned teams:', error);
        toast.error('Failed to load assigned teams');
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentDetails();
      fetchAvailableTeams();
      fetchAssignedTeams();
    }
  }, [tournamentId]);

  const handleAssignTeam = async (teamId) => {
    try {
      await axiosInstance.post(`/admin/tournament/team?teamId=${teamId}&tournamentId=${tournamentId}`);
      const teamToAssign = availableTeams.find(team => team.team_id === teamId);
      if (teamToAssign) {
        setAssignedTeams(prev => [...prev, teamToAssign]);
      }
      toast.success('Team assigned to tournament successfully');
      const response = await axiosInstance.get(`/admin/tournaments?isPopulateTeams=true`);
      const tournaments = response.data.tournaments || [];
      const currentTournament = tournaments.find(t => t.tournament_id.toString() === tournamentId);

      if (currentTournament && currentTournament.teams) {
        setAssignedTeams(currentTournament.teams);
      }
    } catch (error) {
      console.error('Error assigning team:', error);
      toast.error('Failed to assign team to tournament');
    }
  };

  const handleUnassignTeam = async (teamId) => {
    try {
      await axiosInstance.put(`/admin/tournament/team/${tournamentId}?teamId=${teamId}`);
      setAssignedTeams(prev => prev.filter(team => team.team_id !== teamId));
      toast.success('Team removed from tournament successfully');
    } catch (error) {
      console.error('Error removing team from tournament:', error);
      toast.error('Failed to remove team from tournament');
    }
  };

  const filteredAvailableTeams = availableTeams.filter(
    availableTeam => !assignedTeams.some(
      assignedTeam => assignedTeam.team_id === availableTeam.team_id
    )
  );

  return (
    <Container component="main" sx={{ py: 4, maxWidth: 'xl' }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: '#286675',
          textAlign: 'center',
          mb: 4,
          letterSpacing: '1px',
        }}
      >
        {tournamentDetails?.name || 'Tournament'} Team Management
      </Typography>

      <StyledPaper elevation={0}>
        {/* Assigned Teams Section */}
        <Box sx={{ mb: 3 }}>
          <SectionHeader>Assigned Teams</SectionHeader>
          <Box sx={{ bgcolor: '#f0f4f8', p: { xs: 2, sm: 3 }, borderRadius: '0 0 10px 10px' }}>
            {loading ? (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                Loading teams...
              </Typography>
            ) : !Array.isArray(assignedTeams) || assignedTeams.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                No teams assigned to this tournament
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {assignedTeams.map((team) => (
                  <Grid item xs={12} sm={4} key={team.team_id}>
                    <StyledCard>
                      <CardHeader
                        avatar={
                          <Avatar
                            src={team.logo || 'https://via.placeholder.com/48'}
                            alt={`${team.name} logo`}
                            sx={{ width: 48, height: 48, border: '2px solid #286675' }}
                          />
                        }
                        title={
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>
                              {team.name}
                            </Typography>
                            <ActionIcon
                              onClick={() => handleUnassignTeam(team.team_id)}
                              sx={{ color: '#ff9800' }}
                              title="Unassign Team"
                            >
                              <UnassignIcon fontSize="medium" />
                            </ActionIcon>
                          </Stack>
                        }
                        sx={{ pb: 1 }}
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Stack spacing={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Players:</strong> {team.main_players?.length || 0}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2, bgcolor: '#286675', opacity: 0.3 }} />

        {/* Available Teams Section */}
        <Box>
          <SectionHeader>Available Teams</SectionHeader>
          <Box sx={{ bgcolor: '#f0f4f8', p: { xs: 2, sm: 3 }, borderRadius: '0 0 10px 10px' }}>
            {loading ? (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                Loading teams...
              </Typography>
            ) : !Array.isArray(filteredAvailableTeams) || filteredAvailableTeams.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                No teams available
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {filteredAvailableTeams.map((team) => (
                  <Grid item xs={12} sm={4} key={team.team_id}>
                    <StyledCard>
                      <CardHeader
                        avatar={
                          <Avatar
                            src={team.logo || 'https://via.placeholder.com/48'}
                            alt={`${team.name} logo`}
                            sx={{ width: 48, height: 48, border: '2px solid #286675' }}
                          />
                        }
                        title={
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>
                              {team.name}
                            </Typography>
                            <ActionIcon
                              onClick={() => handleAssignTeam(team.team_id)}
                              sx={{ color: '#4caf50' }}
                              title="Assign Team"
                            >
                              <AssignIcon fontSize="medium" />
                            </ActionIcon>
                          </Stack>
                        }
                        sx={{ pb: 1 }}
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Stack spacing={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Players:</strong> {team.main_players?.length || 0}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </StyledPaper>

      <Button
        variant="contained"
        onClick={() => navigate(`/admin/match-management?tournamentId=${tournamentId}`)}
        sx={{
          mt: 3,
          bgcolor: '#286675',
          borderRadius: '8px',
          padding: '12px 32px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#1e4d5a',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          transition: 'background-color 0.3s, box-shadow 0.3s',
          display: 'block',
          mx: 'auto',
        }}
      >
        Manage Matches
      </Button>
    </Container>
  );
};

export default TournamentTeams;