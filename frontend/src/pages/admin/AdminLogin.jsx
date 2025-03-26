import { DarkMode, LightMode, SportsCricket, Visibility, VisibilityOff } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosInstance from "../../hooks/useAxios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAdmin, setLoading } from "../../store/slices/user";

const AdminLogin = () => {
  const [adminDetails, setAdminDetails] = useState({ email: "", adminKey: "", rememberMe: false });
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.user);

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

    try {
      const response = await axiosInstance.post(`/admin/register`, adminDetails);
      if (response.data.success) {
        toast.success('Admin Login Successfully!');
        dispatch(setAdmin(true));
        navigate('/admin', { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#286675" },
      background: { default: darkMode ? "#121212" : "#eff7f9" },
      paper: darkMode ? "#1e1e1e" : "#fff",
    },
    typography: { fontFamily: "'Poppins', sans-serif" },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: darkMode
              ? '0 4px 20px rgba(255, 255, 255, 0.1)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            padding: '10px 20px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          },
        },
      },
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          background: darkMode
            ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
            : 'linear-gradient(135deg, #eff7f9 0%, #ffffff 100%)',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 4 },
            width: { xs: 320, sm: 400 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              color: "primary.main",
              bgcolor: darkMode ? "#333" : "#f0f0f0",
              '&:hover': { bgcolor: darkMode ? "#444" : "#e0e0e0" },
            }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Logo & Branding */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 3,
              bgcolor: "primary.main",
              py: 2,
              borderRadius: '8px 8px 0 0',
              position: "relative",
              top: "-32px",
              left: "-32px",
              right: "-32px",
            }}
          >
            <SportsCricket sx={{ fontSize: 40, color: darkMode ? "#121212" : "#fff" }} />
            <Typography
              variant="h5"
              fontWeight={700}
              color={darkMode ? "#121212" : "#fff"}
              sx={{ letterSpacing: '1px' }}
            >
              CrickPredict
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 3, color: "text.primary" }}
          >
            Admin Login
            <AdminPanelSettingsIcon
              sx={{
                fontSize: 32,
                color: "primary.main",
                ml: 1,
                verticalAlign: 'middle'
              }}
            />
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            size="small"
            onChange={handleChange}
            sx={{ mb: 2.5 }}
          />

          <TextField
            fullWidth
            label="Admin Key"
            name="adminKey"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="small"
            onChange={handleChange}
            sx={{ mb: 2.5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{ color: "text.secondary" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={adminDetails.rememberMe}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember Me"
            sx={{ mb: 2.5, width: "100%", color: "text.secondary" }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={handleLogin}
            sx={{
              mb: 2,
              fontWeight: "bold",
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {isLoading ? "Loging in..." : "Login"}
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.main"
              }
            }}
          >
            Forgot Admin Key?
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;