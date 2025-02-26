import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from '@mui/material';
import {
  SportsCricket,
  LocationOn,
  AccessTime,
  Groups,
  Close,
  Person,
} from '@mui/icons-material';

const Upcoming = () => {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Team data with players
  const teamsData = {
    'Afghanistan': {
      players: [
        { name: 'Rahmanullah Gurbaz', role: 'WK, Batsman' },
        { name: 'Ibrahim Zadran', role: 'Batsman' },
        { name: 'Najibullah Zadran', role: 'Batsman' },
        { name: 'Hashmatullah Shahidi', role: 'Batsman, Captain' },
        { name: 'Mohammad Nabi', role: 'All-rounder' },
        { name: 'Rashid Khan', role: 'All-rounder' },
        { name: 'Mujeeb Ur Rahman', role: 'Bowler' },
        { name: 'Naveen-ul-Haq', role: 'Bowler' },
        { name: 'Fazalhaq Farooqi', role: 'Bowler' },
        { name: 'Noor Ahmad', role: 'Bowler' },
        { name: 'Azmatullah Omarzai', role: 'Bowler' },
      ]
    },
    'Australia': {
      players: [
        { name: 'David Warner', role: 'Batsman' },
        { name: 'Travis Head', role: 'Batsman' },
        { name: 'Steve Smith', role: 'Batsman' },
        { name: 'Glenn Maxwell', role: 'All-rounder' },
        { name: 'Mitchell Marsh', role: 'All-rounder, Captain' },
        { name: 'Alex Carey', role: 'WK, Batsman' },
        { name: 'Pat Cummins', role: 'Bowler' },
        { name: 'Mitchell Starc', role: 'Bowler' },
        { name: 'Josh Hazlewood', role: 'Bowler' },
        { name: 'Adam Zampa', role: 'Bowler' },
        { name: 'Cameron Green', role: 'Bowler' },
      ]
    },
    'Bangladesh': {
      players: [
        { name: 'Litton Das', role: 'WK, Batsman' },
        { name: 'Najmul Hossain Shanto', role: 'Batsman, Captain' },
        { name: 'Shakib Al Hasan', role: 'All-rounder' },
        { name: 'Towhid Hridoy', role: 'Batsman' },
        { name: 'Mushfiqur Rahim', role: 'Batsman' },
        { name: 'Mahmudullah', role: 'All-rounder' },
        { name: 'Mehidy Hasan Miraz', role: 'Bowler' },
        { name: 'Taskin Ahmed', role: 'Bowler' },
        { name: 'Mustafizur Rahman', role: 'Bowler' },
        { name: 'Shoriful Islam', role: 'Bowler' },
        { name: 'Hasan Mahmud', role: 'Bowler' },
      ]
    },
    'Canada': {
      players: [
        { name: 'Aaron Johnson', role: 'Batsman' },
        { name: 'Navneet Dhaliwal', role: 'Batsman, Captain' },
        { name: 'Pargat Singh', role: 'Batsman' },
        { name: 'Ravinderpal Singh', role: 'Batsman' },
        { name: 'Saad Bin Zafar', role: 'All-rounder' },
        { name: 'Dilpreet Bajwa', role: 'All-rounder' },
        { name: 'Hamza Tariq', role: 'WK, Batsman' },
        { name: 'Kaleem Sana', role: 'Bowler' },
        { name: 'Jeremy Gordon', role: 'Bowler' },
        { name: 'Nikhil Dutta', role: 'Bowler' },
        { name: 'Dilon Heyliger', role: 'Bowler' },
      ]
    },
    'England': {
      players: [
        { name: 'Jos Buttler', role: 'WK, Batsman, Captain' },
        { name: 'Jonny Bairstow', role: 'Batsman' },
        { name: 'Joe Root', role: 'Batsman' },
        { name: 'Harry Brook', role: 'Batsman' },
        { name: 'Ben Stokes', role: 'All-rounder' },
        { name: 'Moeen Ali', role: 'All-rounder' },
        { name: 'Chris Woakes', role: 'Bowler' },
        { name: 'Jofra Archer', role: 'Bowler' },
        { name: 'Mark Wood', role: 'Bowler' },
        { name: 'Adil Rashid', role: 'Bowler' },
        { name: 'Sam Curran', role: 'Bowler' },
      ]
    },
    'India': {
      players: [
        { name: 'Rohit Sharma', role: 'Batsman, Captain' },
        { name: 'Shubman Gill', role: 'Batsman' },
        { name: 'Virat Kohli', role: 'Batsman' },
        { name: 'Suryakumar Yadav', role: 'Batsman' },
        { name: 'Hardik Pandya', role: 'All-rounder' },
        { name: 'Ravindra Jadeja', role: 'All-rounder' },
        { name: 'KL Rahul', role: 'WK, Batsman' },
        { name: 'Jasprit Bumrah', role: 'Bowler' },
        { name: 'Mohammed Siraj', role: 'Bowler' },
        { name: 'Kuldeep Yadav', role: 'Bowler' },
        { name: 'Mohammed Shami', role: 'Bowler' },
      ]
    },
    'Ireland': {
      players: [
        { name: 'Paul Stirling', role: 'Batsman, Captain' },
        { name: 'Andrew Balbirnie', role: 'Batsman' },
        { name: 'Harry Tector', role: 'Batsman' },
        { name: 'Lorcan Tucker', role: 'WK, Batsman' },
        { name: 'Curtis Campher', role: 'All-rounder' },
        { name: 'George Dockrell', role: 'All-rounder' },
        { name: 'Gareth Delany', role: 'Bowler' },
        { name: 'Josh Little', role: 'Bowler' },
        { name: 'Mark Adair', role: 'Bowler' },
        { name: 'Barry McCarthy', role: 'Bowler' },
        { name: 'Craig Young', role: 'Bowler' },
      ]
    },
    'Namibia': {
      players: [
        { name: 'Stephan Baard', role: 'Batsman' },
        { name: 'Gerhard Erasmus', role: 'Batsman, Captain' },
        { name: 'Jan Nicol Loftie-Eaton', role: 'Batsman' },
        { name: 'Zane Green', role: 'WK, Batsman' },
        { name: 'JJ Smit', role: 'All-rounder' },
        { name: 'David Wiese', role: 'All-rounder' },
        { name: 'Bernard Scholtz', role: 'Bowler' },
        { name: 'Ruben Trumpelmann', role: 'Bowler' },
        { name: 'Ben Shikongo', role: 'Bowler' },
        { name: 'Tangeni Lungameni', role: 'Bowler' },
        { name: 'Michael van Lingen', role: 'Bowler' },
      ]
    },
    'Nepal': {
      players: [
        { name: 'Kushal Bhurtel', role: 'Batsman' },
        { name: 'Rohit Paudel', role: 'Batsman, Captain' },
        { name: 'Aasif Sheikh', role: 'WK, Batsman' },
        { name: 'Dipendra Singh Airee', role: 'Batsman' },
        { name: 'Gyanendra Malla', role: 'Batsman' },
        { name: 'Sompal Kami', role: 'All-rounder' },
        { name: 'Karan KC', role: 'All-rounder' },
        { name: 'Sandeep Lamichhane', role: 'Bowler' },
        { name: 'Abinash Bohara', role: 'Bowler' },
        { name: 'Lalit Rajbanshi', role: 'Bowler' },
        { name: 'Kushal Malla', role: 'Bowler' },
      ]
    },
    'Netherlands': {
      players: [
        { name: 'Max O\'Dowd', role: 'Batsman' },
        { name: 'Vikramjit Singh', role: 'Batsman' },
        { name: 'Bas de Leede', role: 'All-rounder' },
        { name: 'Colin Ackermann', role: 'All-rounder' },
        { name: 'Scott Edwards', role: 'WK, Batsman, Captain' },
        { name: 'Roelof van der Merwe', role: 'All-rounder' },
        { name: 'Logan van Beek', role: 'Bowler' },
        { name: 'Fred Klaassen', role: 'Bowler' },
        { name: 'Paul van Meekeren', role: 'Bowler' },
        { name: 'Tim Pringle', role: 'Bowler' },
        { name: 'Aryan Dutt', role: 'Bowler' },
      ]
    },
    'USA': {
      players: [
        { name: 'Steven Taylor', role: 'Batsman' },
        { name: 'Monank Patel', role: 'WK, Batsman, Captain' },
        { name: 'Aaron Jones', role: 'Batsman' },
        { name: 'Corey Anderson', role: 'All-rounder' },
        { name: 'Saurabh Netravalkar', role: 'Bowler' },
        { name: 'Ali Khan', role: 'Bowler' },
        { name: 'Rusty Theron', role: 'Bowler' },
        { name: 'Nisarg Patel', role: 'Bowler' },
        { name: 'Jessy Singh', role: 'Bowler' },
        { name: 'Nosthush Kenjige', role: 'Bowler' },
        { name: 'Gajanand Singh', role: 'All-rounder' },
      ]
    },
    'Pakistan': {
      players: [
        { name: 'Babar Azam', role: 'Batsman, Captain' },
        { name: 'Mohammad Rizwan', role: 'WK, Batsman' },
        { name: 'Fakhar Zaman', role: 'Batsman' },
        { name: 'Iftikhar Ahmed', role: 'Batsman' },
        { name: 'Shadab Khan', role: 'All-rounder' },
        { name: 'Mohammad Nawaz', role: 'All-rounder' },
        { name: 'Shaheen Afridi', role: 'Bowler' },
        { name: 'Haris Rauf', role: 'Bowler' },
        { name: 'Naseem Shah', role: 'Bowler' },
        { name: 'Mohammad Wasim Jr', role: 'Bowler' },
        { name: 'Imad Wasim', role: 'Bowler' },
      ]
    },
    'Scotland': {
      players: [
        { name: 'George Munsey', role: 'Batsman' },
        { name: 'Richie Berrington', role: 'Batsman, Captain' },
        { name: 'Matthew Cross', role: 'WK, Batsman' },
        { name: 'Michael Jones', role: 'Batsman' },
        { name: 'Chris Greaves', role: 'All-rounder' },
        { name: 'Mark Watt', role: 'All-rounder' },
        { name: 'Safyaan Sharif', role: 'Bowler' },
        { name: 'Josh Davey', role: 'Bowler' },
        { name: 'Brad Wheal', role: 'Bowler' },
        { name: 'Chris Sole', role: 'Bowler' },
        { name: 'Alasdair Evans', role: 'Bowler' },
      ]
    },
    'Oman': {
      players: [
        { name: 'Jatinder Singh', role: 'Batsman' },
        { name: 'Aqib Ilyas', role: 'Batsman, Captain' },
        { name: 'Zeeshan Maqsood', role: 'All-rounder' },
        { name: 'Ayaan Khan', role: 'All-rounder' },
        { name: 'Naseem Khushi', role: 'WK, Batsman' },
        { name: 'Mohammad Nadeem', role: 'Bowler' },
        { name: 'Kaleemullah', role: 'Bowler' },
        { name: 'Bilal Khan', role: 'Bowler' },
        { name: 'Fayyaz Butt', role: 'Bowler' },
        { name: 'Khawar Ali', role: 'Bowler' },
        { name: 'Suraj Kumar', role: 'Bowler' },
      ]
    },
    'West Indies': {
      players: [
        { name: 'Shai Hope', role: 'WK, Batsman, Captain' },
        { name: 'Nicholas Pooran', role: 'Batsman' },
        { name: 'Rovman Powell', role: 'Batsman' },
        { name: 'Shimron Hetmyer', role: 'Batsman' },
        { name: 'Jason Holder', role: 'All-rounder' },
        { name: 'Andre Russell', role: 'All-rounder' },
        { name: 'Alzarri Joseph', role: 'Bowler' },
        { name: 'Akeal Hosein', role: 'Bowler' },
        { name: 'Sheldon Cottrell', role: 'Bowler' },
        { name: 'Gudakesh Motie', role: 'Bowler' },
        { name: 'Romario Shepherd', role: 'Bowler' },
      ]
    },
    'New Zealand': {
      players: [
        { name: 'Devon Conway', role: 'WK, Batsman' },
        { name: 'Kane Williamson', role: 'Batsman, Captain' },
        { name: 'Daryl Mitchell', role: 'All-rounder' },
        { name: 'Glenn Phillips', role: 'All-rounder' },
        { name: 'Tom Latham', role: 'Batsman' },
        { name: 'Mitchell Santner', role: 'Bowler' },
        { name: 'Trent Boult', role: 'Bowler' },
        { name: 'Tim Southee', role: 'Bowler' },
        { name: 'Lockie Ferguson', role: 'Bowler' },
        { name: 'Ish Sodhi', role: 'Bowler' },
        { name: 'Rachin Ravindra', role: 'Batsman' },
      ]
    },
    'Uganda': {
      players: [
        { name: 'Simon Ssesazi', role: 'Batsman' },
        { name: 'Ronak Patel', role: 'Batsman' },
        { name: 'Brian Masaba', role: 'Batsman, Captain' },
        { name: 'Riazat Ali Shah', role: 'All-rounder' },
        { name: 'Dinesh Nakrani', role: 'All-rounder' },
        { name: 'Kenneth Waiswa', role: 'Bowler' },
        { name: 'Frank Nsubuga', role: 'Bowler' },
        { name: 'Henry Ssenyondo', role: 'Bowler' },
        { name: 'Cosmas Kyewuta', role: 'Bowler' },
        { name: 'Charles Waiswa', role: 'Bowler' },
        { name: 'Fred Achelam', role: 'WK, Batsman' },
      ]
    },
    'South Africa': {
      players: [
        { name: 'Quinton de Kock', role: 'WK, Batsman' },
        { name: 'Temba Bavuma', role: 'Batsman, Captain' },
        { name: 'Aiden Markram', role: 'Batsman' },
        { name: 'Heinrich Klaasen', role: 'Batsman' },
        { name: 'David Miller', role: 'Batsman' },
        { name: 'Marco Jansen', role: 'All-rounder' },
        { name: 'Keshav Maharaj', role: 'Bowler' },
        { name: 'Kagiso Rabada', role: 'Bowler' },
        { name: 'Anrich Nortje', role: 'Bowler' },
        { name: 'Lungi Ngidi', role: 'Bowler' },
        { name: 'Tabraiz Shamsi', role: 'Bowler' },
      ]
    },
    'Sri Lanka': {
      players: [
        { name: 'Pathum Nissanka', role: 'Batsman' },
        { name: 'Kusal Mendis', role: 'WK, Batsman, Captain' },
        { name: 'Charith Asalanka', role: 'Batsman' },
        { name: 'Dhananjaya de Silva', role: 'All-rounder' },
        { name: 'Wanindu Hasaranga', role: 'All-rounder' },
        { name: 'Dasun Shanaka', role: 'Batsman' },
        { name: 'Maheesh Theekshana', role: 'Bowler' },
        { name: 'Kasun Rajitha', role: 'Bowler' },
        { name: 'Dilshan Madushanka', role: 'Bowler' },
        { name: 'Lahiru Kumara', role: 'Bowler' },
        { name: 'Matheesha Pathirana', role: 'Bowler' },
      ]
    },
    'Zimbabwe': {
      players: [
        { name: 'Craig Ervine', role: 'Captain, Batsman' },
        { name: 'Sikandar Raza', role: 'All-rounder' },
        { name: 'Sean Williams', role: 'All-rounder' },
        { name: 'Blessing Muzarabani', role: 'Bowler' },
        { name: 'Richard Ngarava', role: 'Bowler' },
        { name: 'Ryan Burl', role: 'All-rounder' },
        { name: 'Wesley Madhevere', role: 'All-rounder' },
        { name: 'Tendai Chatara', role: 'Bowler' },
        { name: 'Milton Shumba', role: 'Batsman' },
        { name: 'Innocent Kaia', role: 'Batsman' },
        { name: 'Clive Madande', role: 'WK, Batsman' },
      ]
    },
  };

  const matches = [
    // Group Matches
    {
      id: 1,
      stage: 'group',
      group: 'A',
      date: '2025-06-15',
      time: '19:30',
      team1: 'India',
      team2: 'Ireland',
      venue: 'Central Broward Park, Florida',
    },
    {
      id: 2,
      stage: 'group',
      group: 'A',
      date: '2025-06-16',
      time: '19:30',
      team1: 'USA',
      team2: 'Pakistan',
      venue: 'Nassau County, New York',
    },
    {
      id: 3,
      stage: 'group',
      group: 'A',
      date: '2025-06-17',
      time: '19:30',
      team1: 'Canada',
      team2: 'India',
      venue: 'Grand Prairie, Texas',
    },

    // Group B Matches
    {
      id: 4,
      stage: 'group',
      group: 'B',
      date: '2025-06-18',
      time: '19:30',
      team1: 'Australia',
      team2: 'England',
      venue: 'Broward County Stadium, Florida',
    },
    {
      id: 5,
      stage: 'group',
      group: 'B',
      date: '2025-06-19',
      time: '19:30',
      team1: 'Scotland',
      team2: 'Namibia',
      venue: 'Morrisville, North Carolina',
    },
    {
      id: 6,
      stage: 'group',
      group: 'B',
      date: '2025-06-20',
      time: '19:30',
      team1: 'Oman',
      team2: 'Australia',
      venue: 'Nassau County, New York',
    },

    // Group C Matches
    {
      id: 7,
      stage: 'group',
      group: 'C',
      date: '2025-06-21',
      time: '19:30',
      team1: 'West Indies',
      team2: 'Afghanistan',
      venue: 'Grand Prairie, Texas',
    },
    {
      id: 8,
      stage: 'group',
      group: 'C',
      date: '2025-06-22',
      time: '19:30',
      team1: 'New Zealand',
      team2: 'Uganda',
      venue: 'Broward County Stadium, Florida',
    },
    {
      id: 9,
      stage: 'group',
      group: 'C',
      date: '2025-06-23',
      time: '19:30',
      team1: 'Zimbabwe',
      team2: 'West Indies',
      venue: 'Morrisville, North Carolina',
    },

    // Group D Matches
    {
      id: 10,
      stage: 'group',
      group: 'D',
      date: '2025-06-24',
      time: '19:30',
      team1: 'South Africa',
      team2: 'Bangladesh',
      venue: 'Nassau County, New York',
    },
    {
      id: 11,
      stage: 'group',
      group: 'D',
      date: '2025-06-25',
      time: '19:30',
      team1: 'Sri Lanka',
      team2: 'Netherlands',
      venue: 'Grand Prairie, Texas',
    },
    {
      id: 12,
      stage: 'group',
      group: 'D',
      date: '2025-06-26',
      time: '19:30',
      team1: 'Nepal',
      team2: 'South Africa',
      venue: 'Broward County Stadium, Florida',
    },

    // Super Eights Matches
    {
      id: 13,
      stage: 'super-eight',
      group: '1',
      date: '2025-07-01',
      time: '19:30',
      team1: 'Group A Winner',
      team2: 'Group B Runner-up',
      venue: 'Nassau County, New York',
    },
    {
      id: 14,
      stage: 'super-eight',
      group: '2',
      date: '2025-07-03',
      time: '19:30',
      team1: 'Group C Winner',
      team2: 'Group D Runner-up',
      venue: 'Grand Prairie, Texas',
    },

    // Semi Finals
    {
      id: 15,
      stage: 'semi-final',
      date: '2025-07-10',
      time: '19:30',
      team1: 'Super 8 Group 1 Winner',
      team2: 'Super 8 Group 2 Runner-up',
      venue: 'Nassau County, New York',
    },
    {
      id: 16,
      stage: 'semi-final',
      date: '2025-07-12',
      time: '19:30',
      team1: 'Super 8 Group 2 Winner',
      team2: 'Super 8 Group 1 Runner-up',
      venue: 'Grand Prairie, Texas',
    },

    // Final
    {
      id: 17,
      stage: 'final',
      date: '2025-07-15',
      time: '19:30',
      team1: 'Semi Final 1 Winner',
      team2: 'Semi Final 2 Winner',
      venue: 'Nassau County, New York',
    },
  ];

  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamsData[teamName]);
    setModalOpen(true);
  };

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

  const filteredMatches = matches.filter(match => 
    filter === 'all' || match.stage === filter
  );

  // Update the filter options to include super-eight stage
  const filterOptions = [
    { value: 'all', label: 'All Matches' },
    { value: 'group', label: 'Group Stage' },
    { value: 'super-eight', label: 'Super Eights' },
    { value: 'semi-final', label: 'Semi Finals' },
    { value: 'final', label: 'Final' },
  ];

  // Add a helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
          T20 World Cup 2025
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          The ultimate T20 showdown between cricket nations
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Chip 
            icon={<AccessTime />} 
            label="June 15 - July 15, 2025" 
            variant="outlined" 
          />
          <Chip 
            icon={<Groups />} 
            label="16 Teams" 
            variant="outlined" 
          />
          <Chip 
            icon={<LocationOn />} 
            label="West Indies & USA" 
            variant="outlined" 
          />
        </Box>

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
          sx={{ mb: 3 }}
        >
          {filterOptions.map((option) => (
            <ToggleButton key={option.value} value={option.value} sx={{ px: 3 }}>
              {option.label}
            </ToggleButton>
          ))}
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
                      label={`${match.stage.toUpperCase()} - GROUP ${match.group}`}
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

                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button 
                        onClick={() => handleTeamClick(match.team1)}
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '100%',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Avatar sx={{ width: 60, height: 60, mb: 1 }}>
                          {match.team1.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {match.team1}
                        </Typography>
                        <Chip
                          icon={<Groups />}
                          label="View Squad"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleTeamClick(match.team1)}
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" color="text.secondary">vs</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button 
                        onClick={() => handleTeamClick(match.team2)}
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '100%',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Avatar sx={{ width: 60, height: 60, mb: 1 }}>
                          {match.team2.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {match.team2}
                        </Typography>
                        <Chip
                          icon={<Groups />}
                          label="View Squad"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleTeamClick(match.team2)}
                        />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Team Players Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="team-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              Team Squad
            </Typography>
            <IconButton onClick={() => setModalOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
          
          {selectedTeam && selectedTeam.players.map((player, index) => (
            <Box key={index} sx={{ 
              py: 1,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: index !== selectedTeam.players.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider'
            }}>
              <Typography variant="body1">{player.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {player.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </Container>
  );
};

export default Upcoming;