import React from 'react';
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
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import { useMediaQuery } from '@mui/material';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
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

  const menuItems = [
    {
      label: 'Manage Account',
      icon: <AccountCircle sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'My Balance',
      icon: <AccountBalanceWallet sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/balance'),
    },
    {
      label: 'Settings',
      icon: <Settings sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/settings'),
    },
    {
      label: 'Logout',
      icon: <ExitToApp sx={{ fontSize: 20 }} />,
      onClick: () => navigate('/auth/login'),
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
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
                gap: 2,
                borderRadius: 1,
                mx: 0.5,
                my: 0.25,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
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
          {[
            ...menuItems.slice(0, -1).map((item) => (
              <MenuItem 
                key={item.label}
                onClick={item.onClick}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main',
                  }
                }}
              >
                {item.icon}
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </MenuItem>
            )),
            <Divider key="divider" sx={{ my: 1 }} />,
            <MenuItem 
              key="logout"
              onClick={menuItems[menuItems.length - 1].onClick}
              sx={{
                color: 'error.main',
                '& .MuiSvgIcon-root': {
                  color: 'error.main',
                }
              }}
            >
              {menuItems[menuItems.length - 1].icon}
              <Typography variant="body2">
                {menuItems[menuItems.length - 1].label}
              </Typography>
            </MenuItem>
          ]}
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;