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
<<<<<<< Updated upstream
  Grid,
  Chip,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
<<<<<<< HEAD
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../store/slices/user';
=======
import { useMediaQuery } from '@mui/material';
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
=======
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Using Grid2
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
>>>>>>> Stashed changes

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
<<<<<<< Updated upstream
  const [selectedTab, setSelectedTab] = useState('info');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

=======
  const [selectedTab, setSelectedTab] = useState("info");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
>>>>>>> Stashed changes

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');

    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, { withCredentials: true });
      if (res.data.success) {
        toast.success("Logout Successfully", toastId);
        // remove from storage
        dispatch(userNotExists());
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed", toastId);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const navigationItems = [
    {
<<<<<<< Updated upstream
      title: 'Home',
      icon: <Home />,
      path: '/',
    },
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      title: 'About Us',
      icon: <Info />,
      path: '/about',
    },
    {
      title: 'Contact',
      icon: <ContactSupport />,
      path: '/contact',
=======
      title: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      title: "About Us",
      icon: <Info />,
      path: "/about",
    },
    {
      title: "Contact",
      icon: <ContactSupport />,
      path: "/contact",
>>>>>>> Stashed changes
    },
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

<<<<<<< Updated upstream
  const { user } = useSelector(state => state.user);
  const profilePicture = user?.avatar || "https://www.gravatar.com/avatar/?d=mp";
=======
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const profilePicture = userInfo?.avatar || "https://www.gravatar.com/avatar/?d=mp";
>>>>>>> Stashed changes

  return (
    <Paper
      elevation={2}
      sx={{
        py: 1.5,
        px: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: "background.paper",
        borderRadius: 0,
      }}
    >
<<<<<<< Updated upstream
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            '& .logo-icon': {
              transform: 'rotate(20deg)'
            }
          }
        }}>
          <SportsCricket
            className="logo-icon"
            sx={{
              color: mode === 'dark' ? '#90caf9' : '#1976d2',
              fontSize: { xs: 28, md: 32 },
              transition: 'all 0.3s ease'
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
=======
      {/* Left Section: Logo and Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              "& .logo-icon": {
                transform: "rotate(20deg)",
              },
            },
          }}
        >
          <SportsCricket
            className="logo-icon"
>>>>>>> Stashed changes
            sx={{
              color: mode === "dark" ? "#90caf9" : "#1976d2",
              fontSize: { xs: 28, md: 32 },
              transition: "all 0.3s ease",
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: mode === "dark" ? "#fff" : "#1976d2",
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              transition: "all 0.3s ease",
              textShadow: mode === "dark" ? "0 0 20px rgba(144, 202, 249, 0.5)" : "none",
              letterSpacing: "0.5px",
            }}
          >
            CrickPredict
          </Typography>
        </Box>

        {/* Navigation Links (Desktop) */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
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
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                  borderBottom: location.pathname === item.path ? 2 : 0,
                  borderColor: "primary.main",
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* Right Section: Theme Toggle, Notifications, Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
        {/* Theme Toggle and Notifications (Desktop) */}
        {!isMobile && (
          <>
            <IconButton onClick={toggleColorMode} color="primary">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
            <IconButton color="primary">
              <Badge badgeContent={3} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </>
        )}

<<<<<<< Updated upstream
        {user ?
          <Avatar
            src={profilePicture}
            onClick={handleMenuOpen}
            sx={{
              bgcolor: 'primary.main',
              cursor: 'pointer',
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.9,
                transform: 'scale(1.1)',
                boxShadow: `0 0 20px ${theme.palette.primary.main}40`
              }
            }}
          /> : (<Button
            component={Link}
            to={'/auth/login'}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'ButtonFace'
              },
              borderRadius: 0,
              border: 2,
              px: 2,
              py: 1
            }}
          >
            Log In
          </Button>)}
=======
        {/* Profile Avatar */}
        <Avatar
          src={profilePicture}
          onClick={handleMenuOpen}
          sx={{
            bgcolor: "primary.main",
            cursor: "pointer",
            width: { xs: 32, md: 40 },
            height: { xs: 32, md: 40 },
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.1)",
              boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
            },
          }}
        />
>>>>>>> Stashed changes

        {/* Mobile Menu Toggle */}
        {isMobile && (
<<<<<<< Updated upstream
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ ml: 1 }}
          >
=======
          <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ ml: 1 }}>
>>>>>>> Stashed changes
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={isMobile && mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          slotProps={{
            sx: {
              width: "80%",
              maxWidth: 300,
              bgcolor: "background.paper",
              px: 2,
              py: 3,
            },
          }}
        >
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? "primary.main" : "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
<<<<<<< Updated upstream
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary'
=======
                    color: location.pathname === item.path ? "primary.main" : "text.primary",
>>>>>>> Stashed changes
                  }}
                />
              </ListItem>
            ))}

            <Divider sx={{ my: 2 }} />

<<<<<<< Updated upstream
            <ListItem
              button
              onClick={toggleColorMode}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
=======
            <ListItem button onClick={toggleColorMode} sx={{ borderRadius: 2 }}>
              <ListItemIcon>{mode === "dark" ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
>>>>>>> Stashed changes
              <ListItemText primary="Theme" />
            </ListItem>
          </List>
        </Drawer>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              elevation: 2,
              sx: {
                mt: 1.5,
                width: { xs: "300px", sm: "320px" },
                maxHeight: "85vh",
                borderRadius: 2,
                overflow: "visible",
                "& .MuiList-root": {
                  padding: 0,
                },
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
            },
          }}

          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
<<<<<<< Updated upstream
<<<<<<< HEAD
          <Box sx={{ p: 2, pb: 1.5, textAlign: 'center' }}>
            <Avatar
              src={profilePicture}
              sx={{
                width: 70,
                height: 70,
=======
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 64,
                height: 64,
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
                margin: '0 auto',
                bgcolor: 'primary.main',
                border: '3px solid',
                borderColor: 'primary.light',
<<<<<<< HEAD
              }} />
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, fontSize: '1.1rem' }}>
              {user?.name || "Unknown"}
=======
                mb: 1
=======
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                margin: "0 auto",
                bgcolor: "primary.main",
                border: "3px solid",
                borderColor: "primary.light",
                mb: 1,
>>>>>>> Stashed changes
              }}
            >
              U
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
              User Name
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
            </Typography>
<<<<<<< Updated upstream
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {user?.email || "user@gmail.com"}
=======
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              user@email.com
>>>>>>> Stashed changes
            </Typography>
          </Box>

          <Divider />

<<<<<<< Updated upstream
          <Box sx={{ px: 2, py: 1.5 }}>
<<<<<<< HEAD
            <Box sx={{
              display: 'flex',
              gap: 1,
              mb: 1.5,
=======
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 2,
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
              justifyContent: 'center'
            }}>
              <Chip
                label="Info"
                onClick={() => setSelectedTab('info')}
                color={selectedTab === 'info' ? 'primary' : 'default'}
                size="small"
                sx={{ px: 1 }}
              />
              <Chip
                label="Winnings"
                onClick={() => setSelectedTab('winnings')}
                color={selectedTab === 'winnings' ? 'primary' : 'default'}
                size="small"
                sx={{ px: 1 }}
              />
            </Box>

            {selectedTab === 'info' ? (
<<<<<<< HEAD
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
=======
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid xs={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
                      textAlign: 'center',
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      fontWeight="bold"
                      sx={{ mb: 0.5 }}
                    >
                      {userStats.points}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      Points
                    </Typography>
                  </Paper>
                </Grid>
<<<<<<< HEAD
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
=======
                <Grid xs={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
                      textAlign: 'center',
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      fontWeight="bold"
                      sx={{ mb: 0.5 }}
                    >
                      {userStats.accuracy}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      Accuracy
                    </Typography>
                  </Paper>
                </Grid>
<<<<<<< HEAD
                <Grid item xs={12}>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}>
                      <Stars fontSize="small" color="primary" />
                      Rank: #{userStats.rank}
                    </Typography>
                    <Typography variant="body2" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '0.875rem'
                    }}>
                      <Timeline fontSize="small" color="primary" />
                      Points: {userStats.points}
                    </Typography>
                  </Box>
                </Grid>
=======
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Total Winnings: {userStats.winnings}
                </Typography>
<<<<<<< HEAD
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Chip
                    size="small"
                    icon={<TrendingUp />}
                    label="Last Week: ₹300"
                    sx={{ fontSize: '0.75rem' }}
                  />
                  <Chip
                    size="small"
                    icon={<TrendingUp />}
                    label="This Month: ₹800"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
=======
                <Stack spacing={1}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'action.hover',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: 0.5
                    }}>
                      <TrendingUp fontSize="small" color="primary" />
                      Last Week: ₹300
                    </Typography>
                  </Paper>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'action.hover',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: 0.5
                    }}>
                      <TrendingUp fontSize="small" color="primary" />
                      This Month: ₹800
                    </Typography>
                  </Paper>
                </Stack>
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
=======
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px", 
              maxHeight: "90vh", 
              overflow: "hidden", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.paper",
            }}
          >
            {/* Content Wrapper to Handle Inner Scrolling */}
            <Box
              sx={{
                width: "100%",
                maxHeight: "75vh", 
                overflowY: "auto", 
                padding: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Chip
                  label="Info"
                  onClick={() => setSelectedTab("info")}
                  color={selectedTab === "info" ? "primary" : "default"}
                  size="small"
                  sx={{ px: 1 }}
                />
                <Chip
                  label="Winnings"
                  onClick={() => setSelectedTab("winnings")}
                  color={selectedTab === "winnings" ? "primary" : "default"}
                  size="small"
                  sx={{ px: 1 }}
                />
>>>>>>> Stashed changes
              </Box>

              {selectedTab === "info" ? (
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "action.hover",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "80px",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {userStats.points}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Points
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "action.hover",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "80px",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {userStats.accuracy}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Accuracy
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Total Winnings: {userStats.winnings}
                  </Typography>
                  <Stack spacing={1} sx={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        <TrendingUp fontSize="small" color="primary" />
                        Last Week: ₹300
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        <TrendingUp fontSize="small" color="primary" />
                        This Month: ₹800
                      </Typography>
                    </Paper>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>


          <Divider />

          <List sx={{ py: 0 }}>
            {menuItems.map((item) => (
<<<<<<< Updated upstream
<<<<<<< HEAD
              <MenuItem
=======
              <ListItem 
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
                key={item.label}
                disablePadding
              >
                <ListItemButton
                  onClick={item.onClick}
                  sx={{ py: 1, px: 2 }}
                >
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 36 }}>
=======
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={item.onClick} sx={{ py: 1, px: 2 }}>
                  <ListItemIcon sx={{ color: "primary.main", minWidth: 36 }}>
>>>>>>> Stashed changes
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { fontSize: "0.9rem" } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider />

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/auth/login");
                  handleMenuClose();
                }}
                sx={{
                  py: 1,
                  px: 2,
                  color: "error.main",
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ExitToApp color="error" />
                </ListItemIcon>
<<<<<<< Updated upstream
<<<<<<< HEAD
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{
              color: 'error.main',
              py: 1,
              px: 2,
              '&:hover': {
                bgcolor: 'error.lighter',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ExitToApp fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
=======
                <ListItemText 
=======
                <ListItemText
>>>>>>> Stashed changes
                  primary="Logout"
                  slotProps={{ primary: { sx: { fontSize: "0.9rem" } } }}
                />

              </ListItemButton>
            </ListItem>
          </List>
>>>>>>> ad8c4405fc4e63c36d98f37a0d4de6749de0713f
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;