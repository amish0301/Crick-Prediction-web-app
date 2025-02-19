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
      divider: true,
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
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <MenuItem 
                onClick={item.onClick}
                sx={{
                  color: item.label === 'Logout' ? 'error.main' : 'text.primary',
                  '& .MuiSvgIcon-root': {
                    color: item.label === 'Logout' ? 'error.main' : 'primary.main',
                  }
                }}
              >
                {item.icon}
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </MenuItem>
              {item.divider && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Menu>
      </Box>
    </Paper>
  );
};

export default Navbar;