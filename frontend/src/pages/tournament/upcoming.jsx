import React, { useState } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Paper,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Updated Grid2 import
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import GroupsIcon from "@mui/icons-material/Groups";

const upcomingMatches = [
  { id: 1, team1: "India", team2: "Australia", location: "West Indies", date: "June 20" },
  { id: 2, team1: "England", team2: "Pakistan", location: "USA", date: "June 22" },
];

const teamSquads = {
  India: [
    { name: "Rohit Sharma", role: "Batsman" },
    { name: "Virat Kohli", role: "Batsman" },
    { name: "Shubman Gill", role: "Batsman" },
    { name: "Suryakumar Yadav", role: "Batsman" },
    { name: "Hardik Pandya", role: "All-Rounder" },
    { name: "Ravindra Jadeja", role: "All-Rounder" },
    { name: "KL Rahul", role: "Wicketkeeper" },
    { name: "Jasprit Bumrah", role: "Bowler" },
    { name: "Mohammed Shami", role: "Bowler" },
    { name: "Kuldeep Yadav", role: "Bowler" },
    { name: "Yuzvendra Chahal", role: "Bowler" },
  ],
};

const teamFlags = {
  India: "https://flagcdn.com/w40/in.png",
  Australia: "https://flagcdn.com/w40/au.png",
  England: "https://flagcdn.com/w40/gb.png",
  Pakistan: "https://flagcdn.com/w40/pk.png",
};

const getRoleIcon = (role) => {
  if (role.includes("Batsman")) return <SportsCricketIcon color="primary" />;
  if (role.includes("Bowler")) return <SportsBaseballIcon color="error" />;
  if (role.includes("All-Rounder")) return <GroupsIcon color="success" />;
  return <SportsCricketIcon color="secondary" />;
};

const Upcoming = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Attractive Title */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", background: "#fffbe6" }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "Georgia, serif", color: "#2C3E50" }}>
          🏆 T20 World Cup 2025 🏏
        </Typography>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value="upcoming" variant="fullWidth">
          <Tab label="Upcoming Matches" value="upcoming" />
        </Tabs>
      </Box>

      {/* Match Cards */}
      <Grid container spacing={2} justifyContent="center">
        {upcomingMatches.map((match) => (
          <Grid key={match.id} xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {match.team1} vs {match.team2}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {match.location} - {match.date}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor: "#1565C0",
                      "&:hover": { backgroundColor: "#0D47A1" },
                    }}
                    onClick={() => handleOpen(match.team1)}
                  >
                    <img src={teamFlags[match.team1]} alt={match.team1} width={24} height={16} />
                    {match.team1} Squad
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor: "#D32F2F",
                      "&:hover": { backgroundColor: "#B71C1C" },
                    }}
                    onClick={() => handleOpen(match.team2)}
                  >
                    <img src={teamFlags[match.team2]} alt={match.team2} width={24} height={16} />
                    {match.team2} Squad
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Separate Modal for Each Team */}
      {selectedTeam && (
        <Modal open={open} onClose={handleClose} aria-labelledby="team-squad-modal">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "50%", md: "40%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            {/* Team Title with Flag */}
            <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center" justifyContent="center" gap={1}>
              <img src={teamFlags[selectedTeam]} alt={selectedTeam} width={32} height={24} /> {selectedTeam} Squad
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Captain Section (Centered & Bigger) */}
            <Paper
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                boxShadow: 2,
                borderRadius: 1,
                bgcolor: "#e3f2fd",
                width: "100%",
                fontSize: "1.2rem",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Captain: {teamSquads[selectedTeam][0].name}
              </Typography>
              {getRoleIcon(teamSquads[selectedTeam][0].role)}
            </Paper>

            {/* Players Grid (5 Left / 5 Right) - Bigger & Centered */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                {teamSquads[selectedTeam].slice(1, 6).map((player, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      boxShadow: 2,
                      borderRadius: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    {getRoleIcon(player.role)}
                    <Typography variant="body2" fontWeight="bold">{player.name}</Typography>
                  </Paper>
                ))}
              </Grid>

              <Grid item xs={6}>
                {teamSquads[selectedTeam].slice(6, 11).map((player, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      boxShadow: 2,
                      borderRadius: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    {getRoleIcon(player.role)}
                    <Typography variant="body2" fontWeight="bold">{player.name}</Typography>
                  </Paper>
                ))}
              </Grid>
            </Grid>

            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Modal>
      )}


    </Container>
  );
};

export default Upcoming;
