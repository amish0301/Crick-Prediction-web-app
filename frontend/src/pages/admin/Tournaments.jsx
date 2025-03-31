import { Container, Paper, Stack, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';

const Link = styled('div')({
  textDecoration: 'none',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: '#cecfce',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#333333',
    color: 'white',
    transform: 'translateX(4px)',
  },
});

const ActionIcon = styled(Box)({
  padding: '4px',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const TournamentManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalTeams, setTotalTeams] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const tournamentTypes = ['T20', 'ODI', 'TEST']; // Updated to match API expectations

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/admin/tournaments`);
        console.log(response.data);
        const tournamentData = Array.isArray(response.data.tournaments) ? response.data.tournaments : [];
        setTournaments(tournamentData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        toast.error('Failed to load tournaments');
        setTournaments([]);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleAddTournament = async (e) => {
    e.preventDefault();

    // Validation
    if (!tournamentName || !tournamentType || !startDate || !endDate || !totalTeams) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      // Format dates to ISO 8601
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const newTournament = {
        name: tournamentName,
        startDate,
        endDate,
        tournamentType,
        totalTeams: parseInt(totalTeams), // Ensure it's a number
        location: location || null // Send null if empty
      };

      const response = await axiosInstance.post('/admin/tournament', newTournament);
      console.log(response.data);
      setTournaments(prevTournaments => [...prevTournaments, response.data.tournament]);
      toast.success('Tournament created successfully');
      
      // Reset form
      setTournamentName('');
      setTournamentType('');
      setStartDate('');
      setEndDate('');
      setTotalTeams('');
      setLocation('');
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast.error(error.response?.data?.errors?.map(err => err.message).join(', ') || 'Failed to create tournament');
    }
  };

  const handleDeleteTournament = async (tournamentId) => {
    try {
      await axiosInstance.delete('/admin/tournament/');
      setTournaments(prevTournaments => prevTournaments.filter(tournament => tournament.tournament_id !== tournamentId));
      toast.success('Tournament deleted successfully');
    } catch (error) {
      console.error('Error deleting tournament:', error);
      toast.error('Failed to delete tournament');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container component={'main'} sx={{ py: 4 }}>
      <Typography
        variant='h5'
        component={'h1'}
        sx={{
          fontWeight: '700',
          color: 'text.primary',
          margin: '0 0 2rem 0',
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Tournament Management
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 3,
          borderRadius: '16px',
          bgcolor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Accordion defaultExpanded sx={{ mb: 2, borderRadius: '12px', overflow: 'hidden' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: '#286675',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              '&:hover': { bgcolor: '#1e4d5a' },
            }}
          >
            <Typography sx={{ fontWeight: '600', fontSize: '1.1rem' }}>All Tournaments</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa', p: 2 }}>
            {loading ? (
              <Typography>Loading tournaments...</Typography>
            ) : !Array.isArray(tournaments) || tournaments.length === 0 ? (
              <Typography>No tournaments found</Typography>
            ) : (
              <Stack spacing={2}>
                {tournaments.map((tournament) => (
                  <Accordion key={tournament.tournament_id} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: '#f5f5f5',
                        '&:hover': { bgcolor: '#ececec' },
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography sx={{ fontWeight: '500', fontSize: '1rem' }}>
                          {tournament.name} ({tournament.tournament_type})
                        </Typography>
                        <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                          <ActionIcon sx={{ color: '#286675' }}>
                            <EditIcon fontSize="small" />
                          </ActionIcon>
                          <ActionIcon onClick={() => handleDeleteTournament(tournament.tournament_id)} sx={{ color: '#d32f2f' }}>
                            <DeleteIcon fontSize="small" />
                          </ActionIcon>
                        </Stack>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: 'white', p: 2 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Type: {tournament.tournament_type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Schedule: {formatDate(tournament?.schedule[0]?.value)} to {formatDate(tournament?.schedule[1]?.value)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {tournament.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Teams: {tournament.total_teams}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Location: {tournament.location || 'Not specified'}
                        </Typography>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: '#286675',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              '&:hover': { bgcolor: '#1e4d5a' },
            }}
          >
            <Typography sx={{ fontWeight: '600', fontSize: '1.1rem' }}>Create New Tournament</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa', p: 2 }}>
            <Stack spacing={2.5} component="form" onSubmit={handleAddTournament}>
              <TextField
                label="Tournament Name"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                fullWidth
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <FormControl fullWidth required>
                <InputLabel>Tournament Type</InputLabel>
                <Select
                  value={tournamentType}
                  onChange={(e) => setTournamentType(e.target.value)}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="">
                    <em>Select Type</em>
                  </MenuItem>
                  {tournamentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <TextField
                label="Total Teams"
                type="number"
                value={totalTeams}
                onChange={(e) => setTotalTeams(e.target.value)}
                fullWidth
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: '#286675',
                  '&:hover': {
                    bgcolor: '#1e4d5a',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  },
                  borderRadius: '8px',
                  fontWeight: '600',
                  maxWidth: '200px',
                  alignSelf: 'flex-start',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                Create Tournament
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default TournamentManagement;