import { Container, Paper, Stack, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { Link as LinkComponent, useLocation } from 'react-router-dom';

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

// PlayerManagement Component
const PlayerManagement = () => {
  // State for form inputs
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');

  // Dummy player data
  const dummyPlayers = [
    { id: 1, name: "Virat Kohli", age: 34, position: "Batter" },
    { id: 2, name: "Jasprit Bumrah", age: 29, position: "Bowler" },
    { id: 3, name: "Hardik Pandya", age: 30, position: "All-rounder" },
    { id: 4, name: "Rohit Sharma", age: 36, position: "Batter" },
  ];

  // Positions
  const positions = ['Batter', 'Bowler', 'All-rounder'];

  const handleAddPlayer = () => {
    console.log("Adding player:", { playerName, playerAge, playerPosition });
    setPlayerName('');
    setPlayerAge('');
    setPlayerPosition('');
  };

  return (
    <Container component={'main'}>
      <Typography
        variant='h5'
        component={'h1'}
        sx={{ fontWeight: '600', color: 'GrayText', margin: '2rem 0' }}
      >
        Player Management
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: '12px',
          bgcolor: 'white'
        }}
      >
        {/* Player List Accordion */}
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: '#f5f5f5', borderRadius: '8px', mb: 1 }}
          >
            <Typography sx={{ fontWeight: '600' }}>Player List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {dummyPlayers.map((player) => (
                <Accordion key={player.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ bgcolor: '#fafafa', borderRadius: '8px' }}
                  >
                    <Typography sx={{ fontWeight: '500' }}>{player.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      <Typography>Age: {player.age}</Typography>
                      <Typography>Position: {player.position}</Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Add Player Accordion */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}
          >
            <Typography sx={{ fontWeight: '600' }}>Add New Player</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                label="Player Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Player Age"
                type="number"
                value={playerAge}
                onChange={(e) => setPlayerAge(e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 15, max: 50 }}
              />

              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  value={playerPosition}
                  onChange={(e) => setPlayerPosition(e.target.value)}
                >
                  <MenuItem value="">
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
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPlayer}
                sx={{
                  bgcolor: '#286675',
                  '&:hover': { bgcolor: '#1e4d5a' },
                  maxWidth: '200px'
                }}
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