import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Close as CloseIcon,
  ContactSupport,
  Dashboard as DashboardIcon,
  ExitToApp,
  Home,
  Info,
  Menu as MenuIcon,
  NotificationsOutlined,
  SportsCricket,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Using Grid2
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useThemeContext } from "../context/ThemeContext";
import axiosInstance from "../hooks/useAxios";
import { userNotExists } from "../store/slices/user";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("info");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profilePicture = user?.avatar || "https://www.gravatar.com/avatar/?d=mp";

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const res = await axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.update(toastId, {
          render: "Logout Successful",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        dispatch(userNotExists());
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.update(toastId, {
        render: error?.response?.data?.message || "Logout Failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const navigationItems = [
    { title: "Home", icon: <Home />, path: "/" },
    { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { title: "About Us", icon: <Info />, path: "/about" },
    { title: "Contact", icon: <ContactSupport />, path: "/contact" },
  ];

  const userStats = {
    totalPredictions: 150,
    accuracy: "65.3%",
    points: 2450,
    rank: 123,
    winnings: "₹1,200",
  };

  const menuItems = [
    {
      label: "Manage Account",
      icon: <AccountCircle sx={{ fontSize: 20 }} />,
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        py: { xs: 1, md: 1.5 },
        px: { xs: 1.5, md: 3 },
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: "background.paper",
        borderRadius: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
        {/* Left Section: Logo and Navigation */}
        <Grid size={{ xs: 6, md: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 } }}>
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover .logo-icon": { transform: "rotate(20deg)" },
              }}
            >
              <SportsCricket
                className="logo-icon"
                sx={{
                  color: mode === "dark" ? "#90caf9" : "#1976d2",
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  transition: "transform 0.3s ease",
                }}
              />
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  color: mode === "dark" ? "#fff" : "#1976d2",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  letterSpacing: "0.5px",
                }}
              >
                CrickPredict
              </Typography>
            </Box>

            {/* Navigation Links (Desktop/Tablet) */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path ? "primary.main" : "text.secondary",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      px: { xs: 1, sm: 2 },
                      py: 0.5,
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                      },
                      borderBottom: location.pathname === item.path ? 2 : 0,
                      borderColor: "primary.main",
                      borderRadius: 0,
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right Section: Controls */}
        <Grid size={{ xs: 6, md: 4 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 2 } }}>
            {/* Theme Toggle and Notifications (Desktop/Tablet) */}
            {!isMobile && (
              <>
                <IconButton
                  onClick={toggleColorMode}
                  sx={{ color: "primary.main", p: { xs: 0.5, md: 1 } }}
                >
                  {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <IconButton sx={{ color: "primary.main", p: { xs: 0.5, md: 1 } }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsOutlined />
                  </Badge>
                </IconButton>
              </>
            )}

            {/* Profile or Login */}
            {user ? (
              <Avatar
                src={profilePicture}
                onClick={handleMenuOpen}
                sx={{
                  bgcolor: "primary.main",
                  cursor: "pointer",
                  width: { xs: 30, sm: 36, md: 40 },
                  height: { xs: 30, sm: 36, md: 40 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
                  },
                }}
              />
            ) : (
              <Button
                component={Link}
                to="/auth/login"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  px: { xs: 1, sm: 2 },
                  py: 0.5,
                  border: 1,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                    borderColor: "primary.main",
                  },
                }}
              >
                Log In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{ ml: { xs: 0.5, sm: 1 }, color: "text.primary" }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMobile && mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "70%", sm: "50%" },
            maxWidth: 300,
            bgcolor: "background.paper",
            px: 2,
            py: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: location.pathname === item.path ? "action.selected" : "transparent",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon
                sx={{ color: location.pathname === item.path ? "primary.main" : "text.secondary" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ color: location.pathname === item.path ? "primary.main" : "text.primary" }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItemButton onClick={toggleColorMode} sx={{ borderRadius: 2 }}>
            <ListItemIcon>{mode === "dark" ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
            <ListItemText primary="Toggle Theme" />
          </ListItemButton>
          {user && (
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "error.main" }}>
              <ListItemIcon>
                <ExitToApp color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          )}
        </List>
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            width: { xs: 280, sm: 320 },
            maxHeight: "85vh",
            borderRadius: 2,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar
            src={profilePicture}
            sx={{
              width: { xs: 60, sm: 70 },
              height: { xs: 60, sm: 70 },
              margin: "0 auto",
              bgcolor: "primary.main",
              border: "2px solid",
              borderColor: "primary.light",
            }}
          />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
            {user?.name || "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
            {user?.email || "user@gmail.com"}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
            <Chip
              label="Info"
              onClick={() => setSelectedTab("info")}
              color={selectedTab === "info" ? "primary" : "default"}
              size="small"
              sx={{ px: 1, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
            />
            <Chip
              label="Winnings"
              onClick={() => setSelectedTab("winnings")}
              color={selectedTab === "winnings" ? "primary" : "default"}
              size="small"
              sx={{ px: 1, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
            />
          </Box>

          {selectedTab === "info" ? (
            <Grid container spacing={1}>
              <Grid size={{ xs: 6 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    height:"auto"
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    {userStats.points}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                    Points
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    textAlign: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    height:"auto"
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    {userStats.accuracy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                    Accuracy
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                Total Winnings: {userStats.winnings}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                <Chip
                  size="small"
                  icon={<TrendingUp />}
                  label="Last Week: ₹300"
                  sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                />
                <Chip
                  size="small"
                  icon={<TrendingUp />}
                  label="This Month: ₹800"
                  sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                />
              </Box>
            </Box>
          )}
        </Box>

        <Divider />

        {menuItems.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick} sx={{ py: 1, px: 2 }}>
            <ListItemIcon sx={{ color: "primary.main", minWidth: 36 }}>{item.icon}</ListItemIcon>
            <Typography variant="body2">{item.label}</Typography>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "error.main",
            py: 1,
            px: 2,
            "&:hover": { bgcolor: "error.lighter" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <ExitToApp fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default Navbar;