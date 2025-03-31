import { Container, Paper, Stack, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axiosInstance from '../../hooks/useAxios'; // Assuming this is your custom Axios instance
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

  // Tournament types
  const tournamentTypes = ['T20', 'ODI', 'Test'];

  // Dummy tournament data
  const dummyTournaments = [
    { 
      id: 1, 
      name: "IPL 2024", 
      type: "T20",
      startDate: "2024-03-15", 
      endDate: "2024-05-30", 
      status: "Upcoming",
      matches: [
        { id: 1, title: "MI vs CSK" },
        { id: 2, title: "RCB vs KKR" },
      ]
    },
    { 
      id: 2, 
      name: "T20 World Cup 2024", 
      type: "T20",
      startDate: "2024-06-01", 
      endDate: "2024-06-29", 
      status: "Upcoming",
      matches: [
        { id: 3, title: "IND vs PAK" },
        { id: 4, title: "AUS vs ENG" },
      ]
    },
    { 
      id: 3, 
      name: "BBL 2023", 
      type: "T20",
      startDate: "2023-12-07", 
      endDate: "2024-01-24", 
      status: "Completed",
      matches: [
        { id: 5, title: "Sydney Sixers vs Melbourne Stars" },
      ]
    },
    { 
      id: 4, 
      name: "Ashes 2023", 
      type: "Test",
      startDate: "2023-06-16", 
      endDate: "2023-07-31", 
      status: "Completed",
      matches: [
        { id: 6, title: "ENG vs AUS 1st Test" },
      ]
    },
  ];

  const handleAddTournament = () => {
    console.log("Adding Tournament:", { tournamentName, tournamentType, startDate, endDate });
    setTournamentName('');
    setTournamentType('');
    setStartDate('');
    setEndDate('');
  };

  const handleEditTournament = (tournament) => {
    console.log("Editing Tournament:", tournament);
  };

  const handleDeleteTournament = (tournamentId) => {
    console.log("Deleting Tournament ID:", tournamentId);
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
        {/* Tournament List Accordion */}
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
            ) : tournaments.length === 0 ? (
              <Typography>No tournaments found</Typography>
            ) : (
              <Stack spacing={2}>
                {tournaments.map((tournament) => (
                  <Accordion key={tournament.id} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
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
                          <ActionIcon onClick={() => handleDeleteTournament(tournament.id)} sx={{ color: '#d32f2f' }}>
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
                          Schedule: {tournament.schedule}
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
                        {tournament.matches?.length > 0 && (
                          <>
                            <Typography variant="body2" fontWeight="600" sx={{ mt: 1 }}>
                              Linked Matches:
                            </Typography>
                            {tournament.matches.map((match) => (
                              <Paper
                                key={match.match_id}
                                elevation={1}
                                sx={{
                                  p: 1,
                                  borderRadius: '6px',
                                  bgcolor: '#f9f9f9',
                                }}
                              >
                                <Typography variant="body2">
                                  {match.title}
                                </Typography>
                              </Paper>
                            ))}
                          </>
                        )}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Create Tournament Accordion */}
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
            <Stack spacing={2.5} component="form" onSubmit={handleValidation}>
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