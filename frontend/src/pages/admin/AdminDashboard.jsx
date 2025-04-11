import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Using Grid2
import { styled } from '@mui/material/styles';
import {
  People as ManageAccountsIcon,
  EmojiEvents as TournamentIcon,
  SportsCricket as MatchIcon,
} from '@mui/icons-material';
import { Link as LinkComponent } from 'react-router-dom';

// Styled Components
const WelcomePaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[8],
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const WidgetPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[4],
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
}));

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
  },
}));

const StyledLink = styled(LinkComponent)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 600,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

// Dummy Chart Components (Enhanced)
const LineChart = () => (
  <Box
    sx={{
      height: { xs: '150px', sm: '200px', md: '250px' },
      bgcolor: '#f0f4f8',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
      Interactive Line Chart (User Engagement)
    </Typography>
  </Box>
);

const PieChart = () => (
  <Box
    sx={{
      height: { xs: '120px', sm: '150px', md: '180px' },
      width: { xs: '120px', sm: '150px', md: '180px' },
      bgcolor: '#f0f4f8',
      borderRadius: '50%',
      m: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography sx={{ color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
      Match Summary Pie
    </Typography>
  </Box>
);

// Widget Component
const Widget = ({ title, value, Icon, color }) => {
  const theme = useTheme();
  return (
    <WidgetPaper>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <Box
          sx={{
            bgcolor: color || theme.palette.primary.light,
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Icon}
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Stack>
    </WidgetPaper>
  );
};

// AdminDashboard Component
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user); // Get user from Redux
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dummy data
  const dummyStats = {
    usersCount: 1250,
    ongoingTournaments: 3,
    upcomingMatches: 8,
    completedMatches: 45,
  };

  return (
    <Container component="main" sx={{ py: { xs: 2, md: 3 } }}>
      {/* Welcome Section */}
      <WelcomePaper>
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
          }}
        >
          {user?.name?.charAt(0) || 'A'}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Welcome, {user?.name || 'Admin'}!
          </Typography>
          <Typography variant="body1">
            Ready to manage your cricket predictions? Check the latest stats below.
          </Typography>
        </Box>
      </WelcomePaper>

      {/* Widgets */}
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Widget
            title="Total Users"
            value={dummyStats.usersCount}
            Icon={<ManageAccountsIcon sx={{ color: theme.palette.common.white }} />}
            color={theme.palette.info.light}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Widget
            title="Ongoing Tournaments"
            value={dummyStats.ongoingTournaments}
            Icon={<TournamentIcon sx={{ color: theme.palette.common.white }} />}
            color={theme.palette.success.light}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Widget
            title="Upcoming Matches"
            value={dummyStats.upcomingMatches}
            Icon={<MatchIcon sx={{ color: theme.palette.common.white }} />}
            color={theme.palette.warning.light}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Widget
            title="Completed Matches"
            value={dummyStats.completedMatches}
            Icon={<MatchIcon sx={{ color: theme.palette.common.white }} />}
            color={theme.palette.error.light}
          />
        </Grid>
      </Grid>

      {/* Quick Links */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ my: 3, justifyContent: { xs: 'center', sm: 'flex-start' } }}
      >
        <StyledLink to="/admin/tournaments">
          Add New Tournament
        </StyledLink>
        <StyledLink to="/admin/users">
          Manage Users
        </StyledLink>
        <StyledLink to="/admin/teams">
          Schedule Teams
        </StyledLink>
      </Stack>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ChartPaper>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              User Engagement
            </Typography>
            <LineChart />
          </ChartPaper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <ChartPaper>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              Recent Matches Summary
            </Typography>
            <PieChart />
          </ChartPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;