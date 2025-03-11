import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Card, CardContent, Typography, Chip, Paper } from "@mui/material";

const completedMatches = [
  { id: 1, teams: "India vs Pakistan", location: "Dubai", date: "Feb 5", winner: "India", score: "India 180/7 - Pakistan 170/9", type: "League Match" },
  { id: 2, teams: "Sri Lanka vs Bangladesh", location: "Dubai", date: "Feb 10", winner: "Sri Lanka", score: "Sri Lanka 160/6 - Bangladesh 158/8", type: "League Match" },
  { id: 3, teams: "Pakistan vs Sri Lanka", location: "Dubai", date: "Feb 20", winner: "Pakistan", score: "Pakistan 175/5 - Sri Lanka 172/7", type: "Semifinal" },
  { id: 4, teams: "India vs Afghanistan", location: "Dubai", date: "Feb 21", winner: "India", score: "India 190/5 - Afghanistan 140/10", type: "Semifinal" },
  { id: 5, teams: "India vs Pakistan", location: "Dubai", date: "Feb 28", winner: "India", score: "India 200/6 - Pakistan 180/8", type: "Final" },
];

const Completed = () => {
  const [tabValue, setTabValue] = useState("League Match");

  // Filter matches based on selected tab
  const filteredMatches = completedMatches.filter((match) => match.type === tabValue);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Asia Cup 2024 Info Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">Asia Cup 2024</Typography>
        <Typography variant="h6" color="text.secondary">Asian cricket giants battled for continental supremacy.</Typography>
        <Typography variant="body1" fontWeight="bold" mt={1}>February 1, 2024 - February 28, 2024</Typography>
        <Typography variant="body2">6 Teams | Dubai, UAE</Typography>
      </Paper>

      {/* Tabs for Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} variant="fullWidth">
          <Tab label="League Matches" value="League Match" />
          <Tab label="Semifinal" value="Semifinal" />
          <Tab label="Final" value="Final" />
        </Tabs>
      </Box>

      {/* Completed Match Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <Card key={match.id} sx={{ width: 300, p: 2, textAlign: "center", position: "relative" }}>
              <CardContent>
                {/* Match Type Label */}
                <Chip label={match.type} color={match.type === "Final" ? "error" : match.type === "Semifinal" ? "warning" : "default"} sx={{ position: "absolute", top: 8, right: 8 }} />

                <Typography variant="h6" fontWeight="bold">{match.teams}</Typography>
                <Typography variant="body2" color="text.secondary">{match.location} - {match.date}</Typography>
                <Typography variant="body2" color="text.secondary">{match.score}</Typography>
                <Typography variant="body2" color="green" fontWeight="bold">Winner: {match.winner}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">No matches found</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Completed;
