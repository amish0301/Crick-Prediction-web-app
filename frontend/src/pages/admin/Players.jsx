import { Container, Paper, Stack, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Accordion, AccordionSummary, AccordionDetails, Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Link as LinkComponent } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../hooks/useAxios';
import Loader from '../../components/Loader';

const Link = styled(LinkComponent)(`
  text-decoration: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #cecfce;
  transition: all 0.3s ease;
  &:hover {
    background-color: #333333;
    color: white;
    transform: translateX(4px);
  }
`);

const PlayerManagement = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const playersPerPage = 5;

  const positions = ['Batter', 'Bowler', 'All-rounder'];

  const fetchPlayers = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/admin/players`);
      if (response.data.success && Array.isArray(response.data.players)) {
        const fetchedPlayers = response.data.players.map(player => ({
          id: player.id,
          name: player.name,
          age: player.age,
          position: player.role || player.position
        }));
        setPlayers(fetchedPlayers);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('Failed to fetch players');
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading) return <Loader />;

  const handleValidation = async (e) => {
    e.preventDefault();
    const formData = {
      name: playerName,
      age: parseInt(playerAge),
      role: playerPosition,
    };

    const emptyFields = Object.values(formData).filter((item) => !item);
    if (emptyFields.length) {
      return toast.info('All Fields are required');
    }

    if (isNaN(playerAge) || playerAge < 15 || playerAge > 50) {
      return toast.error('Age must be between 15 and 50');
    }

    const toastId = toast.loading('Adding Player...');
    try {
      const res = await axiosInstance.post(`${import.meta.env.VITE_SERVER_URL}/admin/player`, formData);
      if (res.data.success) {
        setPlayers((prev) => [
          ...prev,
          {
            id: res.data.player?.id,
            name: playerName,
            age: playerAge,
            position: playerPosition
          }
        ]);
        setPlayerName('');
        setPlayerAge('');
        setPlayerPosition('');
        toast.update(toastId, {
          render: 'Player added successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || 'Failed to add player',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
      console.error('Error adding player:', error);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(players.length / playersPerPage);
  const startIndex = (page - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const currentPlayers = players.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container component={'main'}>
      <Typography variant='h5' component={'h1'} sx={{ fontWeight: '600', color: 'GrayText', margin: '2rem 0' }}>
        Player Management
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: '12px', bgcolor: 'white' }}>
        <Typography sx={{ fontWeight: '600', bgcolor: '#f5f5f5', borderRadius: '8px', p: 2, mb: 2 }}>
          Player List
        </Typography>
        {loading ? (
          <Typography>Loading players...</Typography>
        ) : players.length === 0 ? (
          <Typography>No players found</Typography>
        ) : (
          <>
            <Stack spacing={2}>
              {currentPlayers.map((player, index) => (
                <Paper key={player.id || `player-${index}`} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: '8px' }}>
                  <Typography sx={{ fontWeight: '500' }}>{player.name || 'Unnamed Player'}</Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <Typography>Age: {player.age || 'N/A'}</Typography>
                    <Typography>Position: {player.position || 'N/A'}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </>
        )}

        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <Typography sx={{ fontWeight: '600' }}>Add New Player</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} component='form' onSubmit={handleValidation}>
              <TextField
                label='Player Name'
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                fullWidth
                variant='outlined'
              />
              <TextField
                label='Player Age'
                type='number'
                value={playerAge}
                onChange={(e) => setPlayerAge(e.target.value)}
                fullWidth
                variant='outlined'
                inputProps={{ min: 15, max: 50 }}
                onWheel={(e) => e.target.blur()}
              />
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select value={playerPosition} onChange={(e) => setPlayerPosition(e.target.value)}>
                  <MenuItem value=''>
                    <em>Select Position</em>
                  </MenuItem>
                  {positions.map((position) => (
                    <MenuItem key={position} value={position}>
                      {position}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type='submit'
                variant='contained'
                startIcon={<AddIcon />}
                sx={{ bgcolor: '#286675', '&:hover': { bgcolor: '#1e4d5a' }, maxWidth: '200px' }}
              >
                Add Player
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default PlayerManagement;