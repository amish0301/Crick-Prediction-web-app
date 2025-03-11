import React, { useState } from "react";
import { Leaderboard, TrendingUp, Whatshot, AccountCircle } from "@mui/icons-material";

const Dashboard = () => {

  const [prediction, setPrediction] = useState("");
  // Dummy Data (Replace with API Data)
  const leaderboard = [
    { name: "Priyanshu", points: 1500 },
    { name: "Priyanshu", points: 1450 },
    { name: "Priyanshu", points: 1400 },
  ];

  const matchHistory = [
    { match: "India vs Australia", result: "Won" },
    { match: "England vs Pakistan", result: "Lost" },
    { match: "South Africa vs New Zealand", result: "Won" },
  ];
  const handlePrediction = (value) => {
    setPrediction(`Your prediction: ${value}`);
  };

  return (
    <div className="dashboard-container">
      {/* Profile Section */}
      <div className="profile-card">
        <AccountCircle className="profile-icon" fontSize="large" />
        <h2>Welcome, Priyanshu</h2>
        <p>🏆 Total Points: <strong>1500</strong></p>
      </div>

      {/* User Stats Section */}
      <div className="user-stats">
        <div className="stat-card">
          <Leaderboard className="stat-icon" fontSize="large" />
          <p>Points</p>
          <h3>1500</h3>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" fontSize="large" />
          <p>Accuracy</p>
          <h3>85%</h3>
        </div>
        <div className="stat-card">
          <Whatshot className="stat-icon" fontSize="large" />
          <p>Streak</p>
          <h3>5🔥</h3>
        </div>
      </div>

      {/* Live Matches Section */}
      <div className="live-matches">
        <h2>🏏 Live Matches</h2>
        <div className="match-card">
          <p>India vs Australia</p>
          <p>Overs: 12.3</p>
          <p>Score: 89/2</p>
        </div>
      </div>

      {/* Prediction Section */}
      <div className="prediction-section">
        <h2>Make Your Prediction</h2>
        <div className="prediction-options">
          {["0", "1", "2", "3", "4", "6", "W"].map((option, index) => (
            <button
              key={index}
              className={`predict-btn option-${option}`}
              onClick={() => handlePrediction(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {prediction && <p className="prediction-result">{prediction}</p>}
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard">
        <h2>🏆 Leaderboard</h2>
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>{index + 1}. {player.name} - {player.points} pts</li>
          ))}
        </ul>
      </div>

      {/* Match History */}
      <div className="match-history">
        <h2>📜 Match History</h2>
        <ul>
          {matchHistory.map((match, index) => (
            <li key={index}>{match.match} - <strong>{match.result}</strong></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
