import React, { useState, useEffect } from "react";
import { Container, Box, Tabs, Tab, Card, CardContent, Typography, Button, Paper, CircularProgress, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Live = () => {
  const [tabValue, setTabValue] = useState("live");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [outcomes, setOutcomes] = useState({});
  const navigate = useNavigate();

  const [tournamentId, setTournamentId] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Helper function to determine if a match is live
  const isMatchLive = (matchTime) => {
    const matchDate = new Date(matchTime);
    const now = new Date();
    const twoHoursLater = new Date(matchTime);
    twoHoursLater.setHours(twoHoursLater.getHours() + 4);

    return now >= matchDate && now <= twoHoursLater;
  };

  // Filter matches based on their status
  const filteredMatches = {
    live: matches.filter(match => match.isLive),
    upcoming: matches.filter(match => {
      const matchDate = new Date(match.match_time);
      const now = new Date();
      return matchDate > now;
    }),
    completed: matches.filter(match => {
      const matchDate = new Date(match.match_time);
      const fourHoursLater = new Date(match.match_time);
      fourHoursLater.setHours(fourHoursLater.getHours() + 4);
      const now = new Date();
      return now > fourHoursLater;
    })
  };

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/${tournamentId}`);
        setTournamentDetails(res.data.tournaments);
      } catch (err) {
        console.error('Error fetching tournament details:', err.response?.data || err.message);
        toast.error('Failed to fetch tournament details');
      } finally {
        setLoading(false);
      }
    };

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/tournament/matches/${tournamentId}`);
        if (res.data.success) {
          const updatedMatches = (res.data.matches || []).map(match => ({
            ...match,
            isLive: isMatchLive(match.match_time)
          }));
        
          setMatches(updatedMatches);
        
          const liveMatches = updatedMatches.filter(match => match.isLive);
        
          // Set outcomes
          const simulatedOutcomes = {};
          liveMatches.forEach(match => {
            simulatedOutcomes[match.match_id] = Math.floor(Math.random() * 7);
          });
          setOutcomes(simulatedOutcomes);
        
          // Set default predictions if not already set
          setPredictions(prev => {
            const newPredictions = { ...prev };
            liveMatches.forEach(match => {
              if (newPredictions[match.match_id] === undefined) {
                newPredictions[match.match_id] = 0; // or any default value
              }
            });
            return newPredictions;
          });
        
        } else {
          setMatches([]);
          toast.error('No matches found for this tournament');
        }
        
      } catch (err) {
        console.error('Error fetching matches:', err.response?.data || err.message);
        toast.error('Failed to fetch matches');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentDetails();
      fetchMatches();
    }

    // Set up a polling interval for live match updates (every 30 seconds)
    const intervalId = setInterval(() => {
      if (tabValue === "live") {
        // In a real app, you would update the current outcomes here
        setOutcomes(prevOutcomes => {
          const newOutcomes = { ...prevOutcomes };
          Object.keys(newOutcomes).forEach(matchId => {
            newOutcomes[matchId] = Math.floor(Math.random() * 7); // 0 to 6
          });
          return newOutcomes;
        });
      }
    }, 30000);

    return () => clearInterval(intervalId);

  }, [tournamentId, tabValue]);

  // Format the match data for display
  const formatMatchData = (match) => {
    const teams = `${match.team1_name || 'TBD'} vs ${match.team2_name || 'TBD'}`;
    const location = match.venue || 'TBA';
    const time = match.isLive ? 'Ongoing' : new Date(match.match_time).toLocaleString();
    const prediction = match.isLive ? 'Available' : match.match_time < Date.now() ? 'Not Available' : 'Available Soon';

    return {
      id: match.match_id,
      teams,
      status: match.isLive ? 'Live' : match.match_time > Date.now() ? 'Upcoming' : 'Completed',
      location,
      time,
      prediction
    };
  };

  // Handle prediction selection
  const handlePrediction = (matchId, value) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: value
    }));

    toast.success(`You predicted ${value} for this ball!`);

    // In a real app, you would send this prediction to your backend
    // Example:
    // axiosInstance.post('/predictions', { matchId, value });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* IPL 2025 Info Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {tournamentDetails?.tournament_name || "IPL 2025"}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {tournamentDetails?.description || "The biggest T20 cricket league returns with its 17th season!"}
        </Typography>
        <Typography variant="body1" fontWeight="bold" mt={1}>
          {tournamentDetails ?
            `${new Date(tournamentDetails.start_date).toLocaleDateString()} - ${new Date(tournamentDetails.end_date).toLocaleDateString()}` :
            "March 22, 2025 - May 26, 2025"}
        </Typography>
        <Typography variant="body2">
          {tournamentDetails?.teams_count || "10"} Teams | Multiple Venues, India
        </Typography>
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
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
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

                    {tabValue === "live" && (
                      <>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          Predict the next ball:
                        </Typography>

                        <ButtonGroup variant="contained" color="primary" sx={{ mt: 1 }} fullWidth>
                          {[0, 1, 2, 3, 4, 6].map((value) => (
                            <Button
                              key={value}
                              onClick={() => handlePrediction(match.match_id, value)}
                              variant={predictions[match.match_id] === value ? "contained" : "outlined"}
                              sx={{
                                bgcolor: predictions[match.match_id] === value ? 'primary.main' : 'white',
                                color: predictions[match.match_id] === value ? 'white' : 'primary.main',
                              }}
                            >
                              {value}
                            </Button>
                          ))}
                        </ButtonGroup>

                        {predictions[match.match_id] !== undefined && (
                          <Box sx={{ mt: 2, p: 1, bgcolor: "#f0f8ff", borderRadius: 1 }}>
                            <Typography variant="body2">
                              Your prediction: <strong>{predictions[match.match_id]}</strong>
                            </Typography>
                            {outcomes[match.match_id] !== undefined && (
                              <Typography variant="body2">
                                Current outcome: <strong>{outcomes[match.match_id]}</strong>
                              </Typography>
                            )}
                            {predictions[match.match_id] === outcomes[match.match_id] && (
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                Correct prediction! 🎉
                              </Typography>
                            )}
                          </Box>
                        )}

                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ mt: 2 }}
                          onClick={() => navigate(`/match/${match.match_id}`)}
                          fullWidth
                        >
                          Match Details
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              No {tabValue} matches found at the moment.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Live;