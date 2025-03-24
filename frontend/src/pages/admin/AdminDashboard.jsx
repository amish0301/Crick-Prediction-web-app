import { Container, Paper, Stack, Typography, Drawer, IconButton, Box } from '@mui/material';
import React, { Suspense, useState } from 'react';
import { styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { 
  Dashboard as DashboardIcon, 
  People as ManageAccountsIcon, 
  EmojiEvents as TournamentIcon, 
  SportsCricket as MatchIcon, 
  MonetizationOn as RewardIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link as LinkComponent, useLocation } from 'react-router-dom';

// Dummy Chart Components (for design purposes only)
const LineChart = () => (
  <Box sx={{ height: '200px', bgcolor: '#e0e0e0', borderRadius: '8px' }}>
    <Typography sx={{ textAlign: 'center', pt: '80px', color: '#666' }}>
      Line Chart Placeholder
    </Typography>
  </Box>
);

const PieChart = () => (
  <Box sx={{ height: '150px', width: '150px', bgcolor: '#e0e0e0', borderRadius: '50%', m: 'auto' }}>
    <Typography sx={{ textAlign: 'center', pt: '65px', color: '#666' }}>
      Pie Chart Placeholder
    </Typography>
  </Box>
);

// Dummy Widget Component
const Widget = ({ title, value, Icon }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 2, 
      minWidth: '150px', 
      textAlign: 'center', 
      bgcolor: 'white',
      borderRadius: '12px'
    }}
  >
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      {Icon}
      <Typography variant="h6" sx={{ fontWeight: '600' }}>{value}</Typography>
    </Stack>
    <Typography variant="body2" color="textSecondary">{title}</Typography>
  </Paper>
);

// Styled Link Component
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

// Admin Tabs Configuration
const adminTabs = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { name: "User Management", icon: <ManageAccountsIcon />, path: "/admin/users" },
  { name: "Tournament Management", icon: <TournamentIcon />, path: "/admin/tournaments" },
  { name: "Match Management", icon: <MatchIcon />, path: "/admin/matches" },
  { name: "Reward Management", icon: <RewardIcon />, path: "/admin/rewards" },
];

// Tab Item Component
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

// Sidebar Component
const SideBar = ({ w = '100%', onClose }) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Stack
      width={{ xs: '100%', sm: '80%', md: w }}
      sx={{
        padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        height: '100%',
        bgcolor: '#286675',
        position: { xs: 'relative', sm: 'sticky' },
        top: 0,
        overflow: 'auto',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }}
      spacing={{ xs: '1rem', sm: '1.5rem', md: '2rem' }}
    >
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

// Dummy AppBar Component
const AppBar = () => (
  <Box sx={{ 
    bgcolor: 'white', 
    p: 2, 
    borderRadius: '12px', 
    mb: 2, 
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <Typography variant="h6">Admin Panel</Typography>
  </Box>
);

// Admin Layout Component
const AdminLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid container sx={{ minHeight: '100vh', bgcolor: '#eff7f9' }}>
        <Box sx={{ 
          display: { xs: 'block', sm: 'none' }, 
          position: 'fixed', 
          right: '1rem', 
          top: '1rem', 
          zIndex: 1200,
          bgcolor: '#286675',
          borderRadius: '50%',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          <IconButton onClick={handleOpen} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Grid
          size={{ xs: 0, sm: 4, md: 3, lg: 2.5 }}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <SideBar />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 8, md: 9, lg: 9.5 }}
          sx={{
            overflowY: 'auto',
            p: { xs: 1, sm: 2, md: 3 },
            height: '100vh',
            bgcolor: '#eff7f9',
          }}
        >
          <AppBar />
          <Box sx={{ py: { xs: 1, sm: 2, md: 3 } }}>
            {children}
          </Box>
        </Grid>

        <Drawer
          open={drawerOpen}
          onClose={handleClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              width: { xs: '75vw', sm: '50vw' }, 
              maxWidth: '300px', 
              borderRadius: '0 12px 12px 0',
            },
          }}
        >
          <SideBar onClose={handleClose} />
        </Drawer>
      </Grid>
    </Suspense>
  );
};

// Admin Dashboard Component with Dummy Data
const AdminDashboard = () => {
  // Dummy data
  const dummyStats = {
    usersCount: 1250,
    ongoingTournaments: 3,
    upcomingMatches: 8,
    completedMatches: 45,
  };

  const Widgets = (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={{ xs: '1rem', sm: '2rem' }} 
      justifyContent={'space-between'} 
      alignItems={'center'} 
      gap={{ xs: '1rem', sm: '2rem' }} 
      margin={'2rem 0'}
    >
      <Widget title={"Total Users"} value={dummyStats.usersCount} Icon={<ManageAccountsIcon />} />
      <Widget title={"Ongoing Tournaments"} value={dummyStats.ongoingTournaments} Icon={<TournamentIcon />} />
      <Widget title={"Upcoming Matches"} value={dummyStats.upcomingMatches} Icon={<MatchIcon />} />
      <Widget title={"Completed Matches"} value={dummyStats.completedMatches} Icon={<MatchIcon />} />
    </Stack>
  );

  const QuickLinks = (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={2} 
      sx={{ margin: '2rem 0' }}
    >
      <Link to="/admin/tournaments">
        <Typography sx={{ color: '#286675', fontWeight: '600' }}>
          Add New Tournament
        </Typography>
      </Link>
      <Link to="/admin/users">
        <Typography sx={{ color: '#286675', fontWeight: '600' }}>
          Manage Users
        </Typography>
      </Link>
    </Stack>
  );

  return (
      <Container component={'main'}>
        <Typography 
          variant='h5' 
          component={'h1'} 
          sx={{ fontWeight: '600', color: 'GrayText', margin: '2rem 0' }}
        >
          Dashboard Overview
        </Typography>

        {Widgets}
        {QuickLinks}

        <Stack 
          direction={{ xs: 'column', lg: 'row' }} 
          sx={{ gap: '1rem', width: '100%' }} 
          justifyContent={'space-between'} 
          alignItems={{ xs: 'center', lg: 'stretch' }} 
          flexWrap={'wrap'}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '1rem 2rem', 
              borderRadius: '1rem', 
              width: '100%', 
              maxWidth: '30rem', 
              bgcolor: 'rgba(0,0,0,0.03)' 
            }}
          >
            <Typography 
              textTransform={'capitalize'} 
              variant='h6' 
              sx={{ marginBottom: '1.5rem', fontWeight: '600' }}
            >
              User Engagement
            </Typography>
            <LineChart />
          </Paper>

          <Paper 
            elevation={3} 
            sx={{ 
              padding: '1rem', 
              borderRadius: '1rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '100%', 
              maxWidth: '20rem', 
              bgcolor: 'rgba(0,0,0,0.03)' 
            }}
          >
            <Typography 
              variant='h6' 
              textTransform={'capitalize'} 
              sx={{ fontWeight: '600', marginBottom: '1rem' }}
            >
              Recent Matches Summary
            </Typography>
            <PieChart />
          </Paper>
        </Stack>
      </Container>
  );
};

export default AdminDashboard;