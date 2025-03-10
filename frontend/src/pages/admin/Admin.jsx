import { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const getFunnyGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌞 Good morning, Admin! Have some coffee!";
    if (hour < 18) return "🌆 Good afternoon, Boss! More work, less sleep!";
    return "🌙 Good night, Admin! Why are you still working?! 😴";
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("🚪 Are you sure you lazy admin?");
    if (confirmLogout) {
        alert("👋 Bye bye! Now go touch some grass! 🌿😆");
      navigate("/admin/login"); // Navigate after confirming logout
    } else {
      alert("😏 Thought so! Back to work!");
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#f4f6f8",
        color: darkMode ? "#fff" : "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top Right Buttons */}
      <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
        {/* Dark Mode Toggle Button */}
        <IconButton
          onClick={() => {
            setDarkMode(!darkMode);
            toast.success(darkMode ? "☀️ Aww, you like the sun!" : "🌚 Welcome to the dark side!");
          }}
        >
          {darkMode ? <LightMode sx={{ color: "#ffeb3b" }} /> : <DarkMode sx={{ color: "#90caf9" }} />}
        </IconButton>

        {/* Funny Logout Button */}
        <Button variant="contained" color="error" startIcon={<Logout />} onClick={handleLogout}>
          🚪 Logout
        </Button>
      </Box>

      {/* Funny Greeting */}
      <Typography variant="h6" fontWeight="bold">
        {getFunnyGreeting()}
      </Typography>
    </Box>
  );
};

export default Admin;
