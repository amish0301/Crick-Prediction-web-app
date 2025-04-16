import { Container, Paper, Stack, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Image as ImageIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link as LinkComponent } from 'react-router-dom';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Link = styled(LinkComponent)({
  textDecoration: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  color: '#1976d2',
  backgroundColor: '#e3f2fd',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#bbdefb',
    color: '#1565c0',
    transform: 'translateY(-2px)',
  },
});

const FileInput = styled('input')({
  display: 'none',
});

const TeamManagement = () => {
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teamIdToDelete, setTeamIdToDelete] = useState(null);






  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/admin/teams`);
      if (response.data.success && Array.isArray(response.data.teams)) {
        const fetchedTeams = response.data.teams.map(team => ({
          id: team.team_id,
          name: team.name,
          logo: team.logo,
          main_players: team.main_players || [],
          playerCount: team.total_players || 0
        }));
        setTeams(fetchedTeams);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to fetch teams');
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (teamId) => {
    setTeamIdToDelete(teamId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setTeamIdToDelete(null);
  };

  const handleDeleteTeam = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/admin/team?teamId=${teamIdToDelete}`);
      if (response.data.success) {
        setTeams(prev => prev.filter(team => team.id !== teamIdToDelete));
        toast.success('Team deleted successfully');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('Failed to delete team');
    } finally {
      setLoading(false);
      handleCloseDeleteDialog();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamLogo(file);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);


  const handleValidation = async (e) => {
    e.preventDefault();
    if (!teamName || !teamLogo) {
      return toast.info('Team Name and Logo are required');
    }

    const formData = new FormData();
    formData.append('name', teamName);
    formData.append('logo', teamLogo);

    const toastId = toast.loading('Adding Team...');
    try {
      const res = await axiosInstance.post('admin/team', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        const newTeam = {
          id: res.data.team.team_id,
          name: res.data.team.name,
          logo: res.data.team.logo,
          main_players: res.data.team.main_players || [],
          playerCount: 0
        };
        setTeams((prev) => [...prev, newTeam]);
        setTeamName('');
        setTeamLogo(null);
        toast.update(toastId, {
          render: 'Team added successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        await fetchTeams();
      }
    } catch (error) {
      console.error('Error adding team:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add team';
      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };
  if (loading) return <Loader />

  return (
    <Container component="main" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: '700',
          color: 'text.primary',
          margin: '0 0 2rem 0',
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Team Management
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
        {/* Team List Table */}
        <TableContainer sx={{ mb: 2 }}>
          <Typography
            sx={{
              bgcolor: '#286675',
              color: 'white',
              p: 2,
              borderRadius: '12px 12px 0 0',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            All Teams
          </Typography>
          {loading ? (
            <Typography sx={{ p: 2 }}>Loading teams...</Typography>
          ) : teams.length === 0 ? (
            <Typography sx={{ p: 2 }}>No teams found</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Team Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Players</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box 
                          component="img" 
                          src={team.logo} 
                          alt={team.name} 
                          sx={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <Typography>{team.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{team.main_players.length > 0 ? team.main_players.length : 0}</TableCell>
                    <TableCell>
                      <Link to={`/admin/teams/assign/${team.id}?name=${team.name}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(team.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Add Team Section */}
        <Box sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Typography
            sx={{
              bgcolor: '#286675',
              color: 'white',
              p: 2,
              borderRadius: '12px 12px 0 0',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            Create New Team
          </Typography>
          <Box sx={{ bgcolor: '#fafafa', p: 2 }}>
            <Stack spacing={2.5} component="form" onSubmit={handleValidation}>
              <TextField
                label="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                fullWidth
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
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
                {teamLogo && (
                  <Typography variant="body2" color="text.secondary">
                    {teamLogo.name}
                  </Typography>
                )}
              </Stack>
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
                Create Team
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-team-dialog-title"
        aria-describedby="delete-team-dialog-description"
      >
        <DialogTitle id="delete-team-dialog-title">Confirm Team Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-team-dialog-description">
            Are you sure you want to delete this team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTeam} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeamManagement;