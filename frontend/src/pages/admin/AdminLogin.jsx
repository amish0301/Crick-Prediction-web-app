import { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DarkMode, LightMode, SportsCricket } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/user";
import axios from "axios";

const AdminLogin = () => {
  const [adminDetails, setAdminDetails] = useState({ email: "", adminKey: "", rememberMe: false });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleLogin = async (e) => {
      e.preventDefault();
      
              if (!adminDetails.email || !adminDetails.adminKey) {
                  toast.info('All fields are required');
                  return;
              }
      
              dispatch(setLoading(true));
      
              try {
                  const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/register`, adminDetails, { withCredentials: true });
      
                  if (response.data.success) {
                      toast.success('Login Successfully!');
                      navigate('/admin');
                  }
              } catch (error) {
                  toast.error(error.response?.data?.message || 'Login failed');
              } finally {
                  dispatch(setLoading(false));
              }
  };
  

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1976d2" },
      background: { default: darkMode ? "#121212" : "#f4f6f8", paper: darkMode ? "#1e1e1e" : "#fff" },
    },
    typography: { fontFamily: "'Poppins', sans-serif" },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "background.default" }}>
        <Paper elevation={4} sx={{ p: 4, width: 380, textAlign: "center", borderRadius: 3, position: "relative", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
          {/* Dark Mode Toggle */}
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ position: "absolute", top: 15, right: 15 }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Logo & Branding */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
            <SportsCricket sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h5" fontWeight={600} color="primary.main">
              CrickPredict
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Admin Login
            <AdminPanelSettingsIcon
              sx={{
                fontSize: 40,
                color: darkMode ? "#90caf9" : "#1976d2",
                mb: 1, 
              }}
            />
          </Typography>

          <TextField fullWidth label="Email" name="email" type="email" variant="outlined" size="small" onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Admin Key" name="adminKey" type="password" variant="outlined" size="small" onChange={handleChange} sx={{ mb: 2 }} />

          <FormControlLabel
            control={<Checkbox name="rememberMe" checked={adminDetails.rememberMe} onChange={handleChange} />}
            label="Remember Me"
            sx={{ mb: 2, width: "100%" }}
          />

          <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mb: 2, fontWeight: "bold" }}>
            Login
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
            Forgot Admin Key?
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;