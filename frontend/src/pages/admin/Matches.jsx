import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const MatchManagement = () => {
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournamentId');
  const [tournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [teams, setTeams] = useState([]);
  const [statusFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    team1Id: '',
    team2Id: '',
    match_time: '',
    location: '',
  });

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/${tournamentId}`);
        setTournamentDetails(res.data.tournaments);
      } catch (err) {
        console.error('Error fetching tournament details:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
    fetchMatches();
    fetchTeams();
  }, [tournamentId]);

  const fetchMatches = async () => {
    try {
      const res = await axiosInstance.get(`/admin/tournament/matches/${tournamentId}`)
      if (res.data.success)
      setMatches(res.data?.matches);
    } catch (err) {
      toast.error('Failed to fetch matches');
      console.log(err)
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axiosInstance.get(`/admin/tournaments?isPopulateTeams=true`);
      const tournament = await res.data.tournaments.find(t => t.tournament_id.toString() === tournamentId);
      setTeams(tournament?.teams || []);
    } catch (err) {
      toast.error('Failed to fetch teams');
    }
  };


  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeleteTeam = async (matchId) => {
    try {
      const res = await axiosInstance.delete(`/admin/match/${matchId}`)
      if (res.data.success) {
        await fetchMatches();
      }
      toast.success('Match deleted');
    } catch (err) {
      toast.error('Failed to delete match');
    }
  }
  const filteredTournaments = tournaments.filter((tournament) => {
    if (statusFilter === 'all') return true;
    return tournament.status.toLowerCase() === statusFilter;
  });

  const handleCreateMatch = async () => {
    if (formData.team1Id === formData.team2Id) {
      toast.error('Team A and Team B cannot be the same.');
      return;
    }
    try {
      await axiosInstance.post(`/admin/match/create?tournamentId=${tournamentId}`, {
        ...formData,
        tournamentId
      });
      toast.success('Match created');
      fetchMatches();
      setOpenDialog(false);
      setFormData({ team1Id: '', team2Id: '', match_time: '', location: '' });
    } catch (err) {
      toast.error('Error creating match');
    }
  };
  if (loading) return <Loader />



  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: '600', textAlign: 'center' }}>
        {tournamentDetails?.name ? `${tournamentDetails.name} Match Management` : "Match Management"}
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
        Add New Match
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f1f1f1' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Team A</TableCell>
              <TableCell>Team B</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && matches.map((match, index) => (
              <TableRow key={match._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{match.Team1.name}</TableCell>
                <TableCell>{match.Team2.name}</TableCell>
                <TableCell>{new Date(match.match_time).toLocaleString()}</TableCell>
                <TableCell>{match.status}</TableCell>
                <TableCell>{match.location}</TableCell>
                <TableCell>
                  {/* Edit/Delete buttons (optional) */}
                  <Button size="small" color="error" onClick={() => handleDeleteTeam(match.match_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Match Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Team A</InputLabel>
              <Select
                name="team1Id"
                value={formData.team1Id}
                onChange={handleInputChange}
                label="Team A"
              >
                {teams.map(team => (
                  <MenuItem key={team.team_id} value={team.team_id}>{team.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Team B</InputLabel>
              <Select
                name="team2Id"
                value={formData.team2Id}
                onChange={handleInputChange}
                label="Team B"
              >
                {teams.map(team => (
                  <MenuItem key={team.team_id} value={team.team_id}>{team.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="match_time"
              label="Date & Time"
              type="datetime-local"
              value={formData.match_time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              name="location"
              label="Venue"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateMatch}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MatchManagement;