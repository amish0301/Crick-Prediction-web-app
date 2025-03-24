import { Box, Drawer, IconButton, Stack, Typography, styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { Suspense, useState } from 'react';
import { 
  Dashboard as DashboardIcon, 
  People as ManageAccountsIcon, 
  EmojiEvents as TournamentIcon, 
  SportsCricket as MatchIcon, 
  MonetizationOn as RewardIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  People,
} from '@mui/icons-material';
import { Link as LinkComponent, Outlet, useLocation } from 'react-router-dom';
import AppBar from '../components/admin/AppBar';
import { AdminLayoutLoader } from '../layout/LayoutLoaders';

const Link = styled(LinkComponent)(`
  text-decoration: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #cecfce;
  transition: all 0.3s ease;
  &:hover {
    background-color: #333333;
    color: white;
    transform: translateX(4px);
  }
`);

const adminTabs = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { name: "Players", icon:<People/>, path: "/admin/players" },
  { name: "Team Management", icon: <ManageAccountsIcon />, path: "/admin/teams" },
  { name: "Tournament Management", icon: <TournamentIcon />, path: "/admin/tournaments" },
  { name: "Match Management", icon: <MatchIcon />, path: "/admin/matches" },
  { name: "Reward Management", icon: <RewardIcon />, path: "/admin/rewards" },
];

const TabItem = ({ Icon, name }) => (
  <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
    {Icon}
    <Typography
      variant="body1"
      sx={{ 
        fontWeight: '600', 
        fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </Typography>
  </Stack>
);

const SideBar = ({ w = '100%', onClose }) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Stack
      width={{ xs: '100%', sm: '80%', md: w }}
      sx={{
        padding: { xs: '1rem', sm: '1.5rem', md: '0rem' },
        height: '100%',
        bgcolor: '#286675',
        position: { xs: 'relative', sm: 'sticky' },
        top: 0,
        overflow: 'auto',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }}
      spacing={{ xs: '1rem', sm: '1.5rem', md: '2rem' }}
    >
      {/* Platform Title */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: { xs: 1, md: 2 } 
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, md: 1 },
            padding:{md: '0.7rem'},
            '&:hover': { '& .logo-icon': { transform: 'rotate(20deg)' } },
          }}
        >
          <MatchIcon
            className="logo-icon"
            sx={{
              color: '#90caf9',
              fontSize: { xs: 22, sm: 26, md: 30 },
              transition: 'all 0.3s ease',
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: '#fff',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
              transition: 'all 0.3s ease',
              textShadow: '0 0 20px rgba(144, 202, 249, 0.5)',
              letterSpacing: '0.5px',
            }}
          >
            CrickPredict
          </Typography>
        </Box>
        {onClose && (
          <IconButton 
            onClick={onClose} 
            sx={{ display: { xs: 'flex', sm: 'none' }, color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Admin Tabs */}
      <Stack spacing={{ xs: '0.5rem', sm: '0.75rem', md: '1rem' }} sx={{ mt: { xs: '1rem', sm: '1.5rem' } }}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={{
              ...(location.pathname === tab.path && {
                bgcolor: '#030303',
                color: '#ffffff',
                transform: 'translateX(4px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }),
            }}
            onClick={onClose}
          >
            <TabItem Icon={tab.icon} name={tab.name} />
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <>
      
    </>
  );
};

export default AdminLayout;