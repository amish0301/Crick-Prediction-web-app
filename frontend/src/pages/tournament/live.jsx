import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Card, CardContent, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const matchesData = {
  live: [
    { id: 1, teams: "MI vs CSK", status: "Live", location: "Mumbai", time: "Ongoing", prediction: "Available" },
    { id: 2, teams: "RCB vs KKR", status: "Live", location: "Bangalore", time: "Ongoing", prediction: "Available" },
  ],
  upcoming: [
    { id: 3, teams: "SRH vs RR", status: "Upcoming", location: "Hyderabad", time: "March 25, 7:00 PM", prediction: "Available Soon" },
  ],
  completed: [
    { id: 4, teams: "DC vs PBKS", status: "Completed", location: "Delhi", time: "March 22", prediction: "Not Available" },
  ],
};

const Live = () => {
  const [tabValue, setTabValue] = useState("live");
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* IPL 2025 Info Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">IPL 2025</Typography>
        <Typography variant="h6" color="text.secondary">The biggest T20 cricket league returns with its 17th season!</Typography>
        <Typography variant="body1" fontWeight="bold" mt={1}>March 22, 2025 - May 26, 2025</Typography>
        <Typography variant="body2">10 Teams | Multiple Venues, India</Typography>
      </Paper>

      {/* Tabs for Filtering Matches */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Live Matches" value="live" />
          <Tab label="Upcoming Matches" value="upcoming" />
          <Tab label="Completed Matches" value="completed" />
        </Tabs>
      </Box>

      {/* Match Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {matchesData[tabValue].map((match) => (
          <Card key={match.id} sx={{ width: 300, p: 2, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{match.teams}</Typography>
              <Typography variant="body2" color="text.secondary">{match.location}</Typography>
              <Typography variant="body2" color="text.secondary">{match.time}</Typography>
              <Typography variant="body2" color="primary">{match.prediction}</Typography>
              {tabValue === "live" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  Let's Predict
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Live;
