import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import {
  EmojiEvents,
  SportsCricket,
  LocationOn,
  AccessTime,
  Star,
  Groups,
} from '@mui/icons-material';

const Completed = () => {
  const [filter, setFilter] = useState('all');

  const matches = [
    {
      id: 1,
      stage: 'final',
      date: '2024-02-28',
      time: '19:00',
      team1: { name: 'India', score: '325/6' },
      team2: { name: 'Pakistan', score: '290/8' },
      venue: 'Dubai International Stadium, UAE',
      winner: 'India',
      margin: '35 runs',
      playerOfMatch: 'Virat Kohli',
      performance: '120(98) & 1/45',
    },
    {
      id: 2,
      stage: 'semi-final',
      date: '2024-02-26',
      time: '19:00',
      team1: { name: 'India', score: '356/4' },
      team2: { name: 'Bangladesh', score: '245/10' },
      venue: 'Dubai International Stadium, UAE',
      winner: 'India',
      margin: '111 runs',
      playerOfMatch: 'Rohit Sharma',
      performance: '145(112) & 2 catches',
    },
    {
      id: 3,
      stage: 'semi-final',
      date: '2024-02-25',
      time: '19:00',
      team1: { name: 'Pakistan', score: '289/7' },
      team2: { name: 'Sri Lanka', score: '285/8' },
      venue: 'Sharjah Cricket Stadium, UAE',
      winner: 'Pakistan',
      margin: '4 runs',
      playerOfMatch: 'Babar Azam',
      performance: '95(85) & 1 catch',
    },
    {
      id: 4,
      stage: 'group',
      date: '2024-02-20',
      time: '19:00',
      team1: { name: 'India', score: '302/5' },
      team2: { name: 'Sri Lanka', score: '198/10' },
      venue: 'Abu Dhabi Cricket Stadium, UAE',
      winner: 'India',
      margin: '104 runs',
      playerOfMatch: 'Shubman Gill',
      performance: '128(110) & 1 catch',
    },
    {
      id: 5,
      stage: 'group',
      date: '2024-02-18',
      time: '19:00',
      team1: { name: 'Pakistan', score: '315/6' },
      team2: { name: 'Afghanistan', score: '220/10' },
      venue: 'Dubai International Stadium, UAE',
      winner: 'Pakistan',
      margin: '95 runs',
      playerOfMatch: 'Shaheen Afridi',
      performance: '5/35',
    },
    {
      id: 6,
      stage: 'group',
      date: '2024-02-16',
      time: '19:00',
      team1: { name: 'Bangladesh', score: '278/7' },
      team2: { name: 'Afghanistan', score: '245/9' },
      venue: 'Sharjah Cricket Stadium, UAE',
      winner: 'Bangladesh',
      margin: '33 runs',
      playerOfMatch: 'Shakib Al Hasan',
      performance: '85(75) & 3/45',
    },
    {
      id: 7,
      stage: 'group',
      date: '2024-02-14',
      time: '19:00',
      team1: { name: 'India', score: '248/6' },
      team2: { name: 'Pakistan', score: '245/8' },
      venue: 'Dubai International Stadium, UAE',
      winner: 'India',
      margin: '3 runs',
      playerOfMatch: 'Jasprit Bumrah',
      performance: '4/35',
    },
    {
      id: 8,
      stage: 'group',
      date: '2024-02-12',
      time: '19:00',
      team1: { name: 'Sri Lanka', score: '289/6' },
      team2: { name: 'Afghanistan', score: '220/10' },
      venue: 'Abu Dhabi Cricket Stadium, UAE',
      winner: 'Sri Lanka',
      margin: '69 runs',
      playerOfMatch: 'Kusal Mendis',
      performance: '115(98)',
    },
    {
      id: 9,
      stage: 'group',
      date: '2024-02-10',
      time: '19:00',
      team1: { name: 'Pakistan', score: '295/7' },
      team2: { name: 'Bangladesh', score: '235/10' },
      venue: 'Dubai International Stadium, UAE',
      winner: 'Pakistan',
      margin: '60 runs',
      playerOfMatch: 'Mohammad Rizwan',
      performance: '105(89) & 2 stumpings',
    },
    {
      id: 10,
      stage: 'group',
      date: '2024-02-08',
      time: '19:00',
      team1: { name: 'India', score: '375/4' },
      team2: { name: 'Afghanistan', score: '225/10' },
      venue: 'Sharjah Cricket Stadium, UAE',
      winner: 'India',
      margin: '150 runs',
      playerOfMatch: 'KL Rahul',
      performance: '155(115) & 1 catch',
    }
  ];

  const filteredMatches = matches.filter(match => 
    filter === 'all' || match.stage === filter
  );

  const getStageColor = (stage) => {
    switch(stage) {
      case 'final':
        return 'error';
      case 'semi-final':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
          Completed Matches
        </Typography>
        
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="all" sx={{ px: 3 }}>
            All Matches
          </ToggleButton>
          <ToggleButton value="group" sx={{ px: 3 }}>
            Group Stage
          </ToggleButton>
          <ToggleButton value="semi-final" sx={{ px: 3 }}>
            Semi Finals
          </ToggleButton>
          <ToggleButton value="final" sx={{ px: 3 }}>
            Final
          </ToggleButton>
        </ToggleButtonGroup>

        <Stack spacing={3}>
          {filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              elevation={2}
              sx={{ 
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 6,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={match.stage.toUpperCase()}
                      color={getStageColor(match.stage)}
                      size="small"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                      <AccessTime sx={{ fontSize: 18 }} />
                      <Typography variant="body2">
                        {formatDate(match.date)} | {match.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <LocationOn sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{match.venue}</Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}>
                        {match.team1.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {match.team1.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {match.team1.score}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" color="text.secondary">vs</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}>
                        {match.team2.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {match.team2.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {match.team2.score}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>   

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEvents sx={{ color: 'primary.main' }} />
                      <Typography variant="body1" fontWeight={600}>
                        {match.winner} won by {match.margin}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: 'warning.main' }} />
                    <Typography variant="body2">
                      Player of the Match: {match.playerOfMatch} ({match.performance})
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Completed;