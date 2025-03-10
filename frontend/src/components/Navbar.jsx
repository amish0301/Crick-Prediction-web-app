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
  Settings,
  SportsCricket,
  Stars,
  Timeline,
  TrendingUp
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../store/slices/user';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState('info');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();


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
    },
  ];

  const userStats = {
    totalPredictions: 150,
    accuracy: "65.3%",
    points: 2450,
    rank: 123,
    winnings: "₹1,200"
  };

  const menuItems = [
    {
      label: 'Manage Account',
      icon: <AccountCircle sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Settings',
      icon: <Settings sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/settings'),
    },
  ];

  const { user } = useSelector(state => state.user);
  const profilePicture = user?.avatar || "https://www.gravatar.com/avatar/?d=mp";

  return (
    <Paper
      elevation={2}
      sx={{
        py: 1.5,
        px: { xs: 2, md: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: 'background.paper',
        borderRadius: 0
      }}
    >
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
            sx={{
              color: mode === 'dark' ? '#fff' : '#1976d2',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              transition: 'all 0.3s ease',
              textShadow: mode === 'dark' ? '0 0 20px rgba(144, 202, 249, 0.5)' : 'none',
              letterSpacing: '0.5px'
            }}
          >
            CrickPredict
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  },
                  borderBottom: location.pathname === item.path ? 2 : 0,
                  borderColor: 'primary.main',
                  borderRadius: 0,
                  px: 2,
                  py: 1
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
        {!isMobile && (
          <>
            <IconButton onClick={toggleColorMode} color="primary">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <IconButton color="primary">
              <Badge badgeContent={3} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </>
        )}

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

        {isMobile && (
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ ml: 1 }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}

        <Drawer
          anchor="right"
          open={isMobile && mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 300,
              bgcolor: 'background.paper',
              px: 2,
              py: 3
            }
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary'
                  }}
                />
              </ListItem>
            ))}

            <Divider sx={{ my: 2 }} />

            <ListItem
              button
              onClick={toggleColorMode}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <ListItemText primary="Theme" />
            </ListItem>
          </List>
        </Drawer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              width: 320,
              maxHeight: 'calc(100vh - 96px)',
              borderRadius: 2,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              '& .MuiList-root': {
                padding: 0,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, pb: 1.5, textAlign: 'center' }}>
            <Avatar
              src={profilePicture}
              sx={{
                width: 70,
                height: 70,
                margin: '0 auto',
                bgcolor: 'primary.main',
                border: '3px solid',
                borderColor: 'primary.light',
              }} />
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, fontSize: '1.1rem' }}>
              {user?.name || "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {user?.email || "user@gmail.com"}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ px: 2, py: 1.5 }}>
            <Box sx={{
              display: 'flex',
              gap: 1,
              mb: 1.5,
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
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      textAlign: 'center',
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">
                      {userStats.totalPredictions}
                    </Typography>
                    <Typography variant="caption">
                      Predictions
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      textAlign: 'center',
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">
                      {userStats.accuracy}
                    </Typography>
                    <Typography variant="caption">
                      Accuracy
                    </Typography>
                  </Paper>
                </Grid>
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
              </Grid>
            ) : (
              <Box>
                <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1, fontWeight: 600 }}>
                  Total Winnings: {userStats.winnings}
                </Typography>
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
              </Box>
            )}
          </Box>

          <Divider />

          <Box>
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={item.onClick}
                sx={{
                  py: 1,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
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
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;