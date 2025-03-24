import { Container, Paper, Stack, Typography, TextField, Button, Accordion, AccordionSummary, Box,AccordionDetails, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { Link as LinkComponent, useLocation } from 'react-router-dom';
import csk from '../../assets/csk.png';
import mi from '../../assets/mi.png';


// Styled Link Component
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

// Styled File Input
const FileInput = styled('input')({
  display: 'none',
});

// TeamManagement Component
const TeamManagement = () => {
  // State for form inputs
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null); // Changed to store file object
  const [mainPlayer, setMainPlayer] = useState('');

  // Dummy team data with nested players
  const dummyTeams = [
    { 
      id: 1, 
      name: "Mumbai Indians", 
      logo: mi, 
      mainPlayer: "Rohit Sharma",
      totalPlayers: 18,
      players: [
        { id: 1, name: "Rohit Sharma", age: 36, position: "Batter" },
        { id: 2, name: "Jasprit Bumrah", age: 29, position: "Bowler" },
        { id: 3, name: "Hardik Pandya", age: 30, position: "All-rounder" },
      ]
    },
    { 
      id: 2, 
      name: "Chennai Super Kings", 
      logo: csk,
      mainPlayer: "MS Dhoni",
      totalPlayers: 20,
      players: [
        { id: 4, name: "MS Dhoni", age: 42, position: "Batter" },
        { id: 5, name: "Ravindra Jadeja", age: 34, position: "All-rounder" },
        { id: 6, name: "Deepak Chahar", age: 31, position: "Bowler" },
      ]
    },
  ];

  const handleAddTeam = () => {
    console.log("Adding Team:", { teamName, teamLogo, mainPlayer });
    setTeamName('');
    setTeamLogo(null); // Reset to null after submission
    setMainPlayer('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamLogo(file); // Store the file object
    }
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
        {/* Team List Accordion */}
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
            <Typography sx={{ fontWeight: '600', fontSize: '1.1rem' }}>All Teams</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa', p: 2 }}>
            <Stack spacing={2}>
              {dummyTeams.map((team) => (
                <Accordion key={team.id} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      bgcolor: '#f5f5f5', 
                      '&:hover': { bgcolor: '#ececec' },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box 
                        component="img" 
                        src={team.logo} 
                        alt={team.name} 
                        sx={{ width: 40, height: 40, borderRadius: '50%' }} 
                     
                      />
                      <Typography sx={{ fontWeight: '500', fontSize: '1rem' }}>
                        {team.name}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: 'white', p: 2 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Main Player: {team.mainPlayer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Players: {team.totalPlayers}
                      </Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ mt: 1 }}>
                        Team Players:
                      </Typography>
                      {team.players.map((player) => (
                        <Paper 
                          key={player.id} 
                          elevation={1} 
                          sx={{ 
                            p: 1, 
                            borderRadius: '6px', 
                            bgcolor: '#f9f9f9' 
                          }}
                        >
                          <Typography variant="body2">
                            {player.name} - Age: {player.age}, Position: {player.position}
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Add Team Accordion */}
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
            <Typography sx={{ fontWeight: '600', fontSize: '1.1rem' }}>Create New Team</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa', p: 2 }}>
            <Stack spacing={2.5}>
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
                  required
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

              <TextField
                label="Main Player"
                value={mainPlayer}
                onChange={(e) => setMainPlayer(e.target.value)}
                fullWidth
                variant="outlined"
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />


              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddTeam}
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
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default TeamManagement;