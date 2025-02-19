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
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <Paper 
      elevation={2}
      sx={{
        py: 1.5,
        px: 3,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
              fontSize: 32,
              transition: 'all 0.3s ease'
            }} 
          />
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{
              color: mode === 'dark' ? '#fff' : '#1976d2',
              transition: 'all 0.3s ease',
              textShadow: mode === 'dark' 
                ? '0 0 20px rgba(144, 202, 249, 0.5)'
                : 'none',
              letterSpacing: '0.5px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
          >
            CrickPredict
          </Typography>
        </Box>

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
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={toggleColorMode} 
          color="primary"
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(180deg)'
            }
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        
        <IconButton color="primary">
          <Badge badgeContent={3} color="error">
            <NotificationsOutlined />
          </Badge>
        </IconButton>

        <Avatar 
          onClick={handleMenuOpen}
          sx={{ 
            bgcolor: 'primary.main',
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 }
          }}
        >
          U
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: theme.shadows[8]
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/profile')}>
            Manage Account
          </MenuItem>
          <MenuItem onClick={() => navigate('/winning')}>
            My Balance
          </MenuItem>
          <MenuItem onClick={() => navigate('/settings')}>
            Settings
          </MenuItem>
          <MenuItem onClick={() => navigate('/auth/login')}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;