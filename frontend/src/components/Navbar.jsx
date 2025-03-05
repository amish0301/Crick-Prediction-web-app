import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
  Badge,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  ListItemButton,
  Stack,
} from '@mui/material';
import {
  Home,
  ContactSupport,
  Info,
  SportsCricket,
  Dashboard as DashboardIcon,
  NotificationsOutlined,
  Brightness4,
  Brightness7,
  AccountCircle,
  AccountBalanceWallet,
  Settings,
  ExitToApp,
  Menu as MenuIcon,
  Close as CloseIcon,
  Stars,
  Timeline,
  TrendingUp,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState('info');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

        <Avatar 
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
        >
          U
        </Avatar>

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
            elevation: 2,
            sx: {
              mt: 1.5,
              width: { xs: '300px', sm: '320px' },
              maxHeight: '85vh',
              borderRadius: 2,
              overflow: 'auto',
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
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 64,
                height: 64,
                margin: '0 auto',
                bgcolor: 'primary.main',
                border: '3px solid',
                borderColor: 'primary.light',
                mb: 1
              }}
            >
              U
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              User Name
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              user@email.com
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 2,
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
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid xs={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
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
                <Grid xs={6}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
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
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Total Winnings: {userStats.winnings}
                </Typography>
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
              </Box>
            )}
          </Box>

          <Divider />

          <List sx={{ py: 0 }}>
            {menuItems.map((item) => (
              <ListItem 
                key={item.label}
                disablePadding
              >
                <ListItemButton
                  onClick={item.onClick}
                  sx={{ py: 1, px: 2 }}
                >
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider />

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/auth/login');
                  handleMenuClose();
                }}
                sx={{ 
                  py: 1,
                  px: 2,
                  color: 'error.main',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ExitToApp color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;