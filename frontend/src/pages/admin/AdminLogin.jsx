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
  const { isLoading } = useSelector((state) => state.user);

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
      toast.info("All fields are required");
      return;
    }

    setLoading(true);

    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(`/admin/register`, adminDetails);
      if (response.data.success) {
        toast.success('Admin Login Successfully!');
        dispatch(setAdmin(true));
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
      setLoading(false);
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#64b5f6" : "#1976d2" }, // Softer blue for dark, vibrant for light
      background: { default: darkMode ? "#1a1a1a" : "#f5f7fa" },
      paper: darkMode ? "#252525" : "#ffffff",
      text: {
        primary: darkMode ? "#e0e0e0" : "#212121",
        secondary: darkMode ? "#b0b0b0" : "#757575",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h6: { fontWeight: 600 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: darkMode
              ? "0 6px 20px rgba(255, 255, 255, 0.05)"
              : "0 6px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 20px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover fieldset": {
                borderColor: darkMode ? "#90caf9" : "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#64b5f6" : "#1976d2",
              },
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: darkMode ? "#90caf9" : "#1976d2",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          background: darkMode
            ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)",
          px: { xs: 2, sm: 0 },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: { xs: "100%", sm: 400 },
            maxWidth: 400,
            p: { xs: 3, sm: 4 },
            position: "relative",
            transition: "all 0.3s ease",
          }}
        >
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={handleToggleDarkMode}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "primary.main",
              bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              "&:hover": { bgcolor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)" },
              borderRadius: "50%",
              p: 0.8,
            }}
          >
            {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>

          {/* Logo & Branding */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <SportsCricket
              sx={{
                fontSize: { xs: 36, sm: 40 },
                color: "primary.main",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "rotate(15deg)" },
              }}
            />
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                letterSpacing: "0.5px",
              }}
            >
              CrickPredict
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: "text.primary",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            Admin Login
            <AdminPanelSettingsIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: "primary.main" }} />
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              size="medium"
              value={adminDetails.email}
              onChange={handleChange}
              sx={{ mb: 2.5 }}
              disabled={isLoading}
              InputProps={{ sx: { fontSize: { xs: "0.9rem", sm: "1rem" } } }}
              InputLabelProps={{ sx: { fontSize: { xs: "0.9rem", sm: "1rem" } } }}
            />

            <TextField
              fullWidth
              label="Admin Key"
              name="adminKey"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="medium"
              value={adminDetails.adminKey}
              onChange={handleChange}
              sx={{ mb: 2.5 }}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: "text.secondary" }}
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { fontSize: { xs: "0.9rem", sm: "1rem" } },
              }}
              InputLabelProps={{ sx: { fontSize: { xs: "0.9rem", sm: "1rem" } } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={adminDetails.rememberMe}
                  onChange={handleChange}
                  color="primary"
                  disabled={isLoading}
                  sx={{ transform: "scale(0.9)" }}
                />
              }
              label="Remember Me"
              sx={{
                mb: 2.5,
                width: "100%",
                color: "text.secondary",
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                py: 1.2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: darkMode ? "#42a5f5" : "#1565c0" },
              }}
            >
              {isLoading ? "Logging In..." : "Login"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 2,
                cursor: "pointer",
                "&:hover": { color: "primary.main", textDecoration: "underline" },
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              Forgot Admin Key?
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;