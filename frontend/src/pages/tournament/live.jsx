import React, { useState, useEffect } from "react";
import { Container, Box, Tabs, Tab, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Live = () => {
  const [tabValue, setTabValue] = useState("all");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tournamentId, setTournamentId] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredMatches = {
    all: matches,
    upcoming: matches.filter(match => new Date(match.match_time) > new Date()),
    completed: matches.filter(match => new Date(match.match_time) < new Date())
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/matches/${tournamentId}`);
        if (res.data.success) {
          setMatches(res.data.matches || []);
        } else {
          setMatches([]);
          toast.error('No matches found');
        }
      } catch (err) {
        toast.error('Failed to fetch matches');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) fetchMatches();
  }, [tournamentId]);

  const formatMatchData = (match) => ({
    id: match.match_id,
    teams: `${match.team1_name || 'TBD'} vs ${match.team2_name || 'TBD'}`,
    status: new Date(match.match_time) > new Date() ? 'Upcoming' : 'Completed',
    location: match.venue || 'TBA',
    time: new Date(match.match_time).toLocaleString()
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="All Matches" value="all" />
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {filteredMatches[tabValue].length > 0 ? (
            filteredMatches[tabValue].map((match) => {
              const formattedMatch = formatMatchData(match);
              return (
                <Card key={match.match_id} sx={{ width: 300, p: 2, textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{formattedMatch.teams}</Typography>
                    <Typography variant="body2" color="text.secondary">{formattedMatch.location}</Typography>
                    <Typography variant="body2" color="text.secondary">{formattedMatch.time}</Typography>
                    <Typography variant="body2" color="primary">{formattedMatch.status}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/predict?matchId=${match.match_id}&userId=${userId}`)}
                      fullWidth
                    >
                      Let's Predict
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              No {tabValue} matches found.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Live;