import {
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  IconButton,
  FormControlLabel,
  RadioGroup,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Image as ImageIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const ActionIcon = styled(IconButton)({
  padding: '4px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  backgroundColor: '#fafafa',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const TournamentManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalTeams, setTotalTeams] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const [tlogo, settlogo] = useState(null);

  const tournamentTypes = ['T20', 'ODI', 'TEST'];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      settlogo(file);
    }
  };

  if (loading) return <Loader />;

  const handleAddTournament = async (e) => {
    e.preventDefault();

    if (!tournamentName || !tournamentType || !startDate || !endDate || !totalTeams || !location) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", tournamentName);
      formData.append("logo", tlogo);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("tournamentType", tournamentType);
      formData.append("totalTeams", parseInt(totalTeams));
      formData.append("location", location);


      const response = await axiosInstance.post('/admin/tournament', formData);
      setTournaments((prevTournaments) => [...prevTournaments, response.data.tournament]);
      toast.success('Tournament created successfully');

      setTournamentName('');
      setTournamentType('');
      setStartDate('');
      setEndDate('');
      setTotalTeams('');
      setLocation('');
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast.error(
        error.response?.data?.errors?.map((err) => err.message).join(', ') || 'Failed to create tournament'
      );
    }
  };

  const handleDeleteTournament = async (tournamentId) => {
    try {
      await axiosInstance.delete(`/admin/tournament?tournamentId=${tournamentId}`);
      setTournaments((prevTournaments) =>
        prevTournaments.filter((tournament) => tournament.tournament_id !== tournamentId)
      );
      toast.success('Tournament deleted successfully');
    } catch (error) {
      console.error('Error deleting tournament:', error);
      toast.error('Failed to delete tournament');
    }
  };

  const handleEditTournament = (tournamentId) => {
    navigate(`/admin/tournament/team?tournamentId=${tournamentId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    if (statusFilter === 'all') return true;
    return tournament.status.toLowerCase() === statusFilter;
  });

  const FileInput = styled('input')({
    display: 'none',
  });

  return (
    <Container component="main" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 4,
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Tournament Management
      </Typography>

      {/* Tournaments Section */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: '16px',
          bgcolor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: '#286675' }}
        >
          Filter Tournaments
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming" />
            <FormControlLabel value="live" control={<Radio />} label="Live" />
          </RadioGroup>
        </FormControl>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mt: 4, mb: 3, color: '#286675' }}
        >
          All Tournaments
        </Typography>
        {loading ? (
          <Typography>Loading tournaments...</Typography>
        ) : filteredTournaments.length === 0 ? (
          <Typography>No tournaments found</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredTournaments.map((tournament) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tournament.tournament_id}>
                <StyledCard>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" sx={{ fontWeight: 500, color: '#286675' }}>
                        {tournament.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#1e4d5a', fontWeight: 600 }}>
                        {tournament.tournament_type}
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Schedule: {formatDate(tournament?.schedule[0]?.value)} to{' '}
                        {formatDate(tournament?.schedule[1]?.value)}
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
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <ActionIcon
                      onClick={() => handleEditTournament(tournament.tournament_id)}
                      sx={{ color: '#286675' }}
                    >
                      <EditIcon fontSize="small" />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => handleDeleteTournament(tournament.tournament_id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </ActionIcon>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Create Tournament Accordion */}
      <Accordion
        defaultExpanded
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: '#286675',
            color: 'white',
            borderRadius: '12px 12px 0 0',
            '&:hover': { bgcolor: '#1e4d5a' },
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            Create New Tournament
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: '#fafafa', p: 4 }}>
          <Stack spacing={3} component="form" onSubmit={handleAddTournament}>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <FileInput
                type="file"
                accept="image/*"
                id="team-logo-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="team-logo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<ImageIcon />}
                  sx={{
                    borderRadius: '8px',
                    borderColor: '#286675',
                    color: '#286675',
                    '&:hover': {
                      borderColor: '#1e4d5a',
                      bgcolor: '#f0f7f9',
                    },
                  }}
                >
                  Upload Logo*
                </Button>
              </label>
              {tlogo && (
                <Typography variant="body2" color="text.secondary">
                  {tlogo.name}
                </Typography>
              )}
            </Stack>
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
              required // Made required to match backend
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
                fontWeight: 600,
                maxWidth: '230px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              Create Tournament
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default TournamentManagement;