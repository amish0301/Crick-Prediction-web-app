import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    useTheme,
    useMediaQuery,
    Container,
    Paper,
    IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Using Grid2
import {
    PeopleOutline,
    EmojiEvents,
    SportsEsports,
    CheckCircleOutline,
    Add,
    PersonAdd,
    BarChart,
    Timeline,
    TrendingUp,
    ArrowUpward,
    ArrowDownward,
    SportsCricket
} from '@mui/icons-material';
import Admin from './Admin'; // Import the Admin layout component

// Sample data for charts
const userEngagementData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 300 },
    { month: 'Mar', users: 550 },
    { month: 'Apr', users: 780 },
    { month: 'May', users: 690 },
    { month: 'Jun', users: 850 }
];

const matchSummaryData = [
    { type: 'Cricket', completed: 42, upcoming: 15 },
    { type: 'T20', completed: 28, upcoming: 10 },
    { type: 'ODI', completed: 18, upcoming: 8 },
    { type: 'Test', completed: 12, upcoming: 4 }
];

// Enhanced chart components
const UserEngagementChart = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Typography variant="h6" component="h3" fontWeight={600}>User Engagement</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} />
                        23.4%
                    </Typography>
                    <IconButton size="small" sx={{ bgcolor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)' }}>
                        <BarChart fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                pt: 2,
                pb: 1
            }}>
                {userEngagementData.map((item) => (
                    <Box
                        key={item.month}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '14%'
                        }}
                    >
                        <Box
                            sx={{
                                height: `${(item.users / 900) * 180}px`,
                                width: '70%',
                                background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                                borderRadius: '4px 4px 0 0',
                                minHeight: '10px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Typography variant="caption" sx={{ mt: 1 }}>{item.month}</Typography>
                    </Box>
                ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                User predictions increased by 23.4% since last month
            </Typography>
        </Box>
    );
};

const MatchSummaryChart = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Typography variant="h6" component="h3" fontWeight={600}>Cricket Matches Summary</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="warning.main" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                        +12
                    </Typography>
                    <IconButton size="small" sx={{ bgcolor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)' }}>
                        <Timeline fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
                {matchSummaryData.map((item) => (
                    <Box key={item.type} sx={{ mb: 2.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" fontWeight={500}>{item.type}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.completed} completed, {item.upcoming} upcoming
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
                            <Box sx={{
                                background: `linear-gradient(90deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.main} 100%)`,
                                width: `${(item.completed / (item.completed + item.upcoming)) * 100}%`
                            }} />
                            <Box sx={{
                                background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 100%)`,
                                width: `${(item.upcoming / (item.completed + item.upcoming)) * 100}%`
                            }} />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 'auto', color: 'text.secondary' }}>
                12 new cricket matches scheduled this week
            </Typography>
        </Box>
    );
};

// Dashboard component
const AdminDashboard = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const StatCard = ({ icon, title, value, change, color }) => (
        <Card elevation={0} sx={{
            height: '100%',
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            borderRadius: 3,
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark ? '0 10px 20px rgba(0, 0, 0, 0.3)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
            }
        }}>
            <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                            {value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {change > 0 ? (
                                <ArrowUpward fontSize="small" sx={{ color: 'success.main', mr: 0.5, fontSize: '1rem' }} />
                            ) : (
                                <ArrowDownward fontSize="small" sx={{ color: 'error.main', mr: 0.5, fontSize: '1rem' }} />
                            )}
                            <Typography
                                variant="caption"
                                sx={{
                                    color: change > 0 ? 'success.main' : 'error.main',
                                    fontWeight: 500
                                }}
                            >
                                {Math.abs(change)}% {change > 0 ? 'increase' : 'decrease'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: isDark ? `${color}.dark` : `${color}.light`,
                            color: isDark ? `${color}.light` : `${color}.dark`,
                            p: 1.5,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    const QuickLinkCard = ({ icon, title, description, buttonText, buttonIcon }) => (
        <Card elevation={0} sx={{
            height: '100%',
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            borderRadius: 3,
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
        }}>
            <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box
                            sx={{
                                mr: 1.5,
                                display: 'flex',
                                p: 1,
                                borderRadius: 2,
                                bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.08)'
                            }}
                        >
                            {icon}
                        </Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                        {description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                        <Button
                            variant="contained"
                            startIcon={buttonIcon}
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                py: 1,
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    const dashboard = (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back, Admin! Here's what's happening with your cricket tournaments.
                </Typography>
            </Box>

            {/* Key Stats Section */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="h2" fontWeight={600}>
                    Key Stats
                </Typography>
                <Button color="primary" sx={{ textTransform: 'none' }}>
                    View Details
                </Button>
            </Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<PeopleOutline />}
                        title={<span style={{ paddingRight: '10px' }}>Total Users</span>}

                        value="2,458"
                        change={12.5}
                        color="primary"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} >
                    <StatCard
                        icon={<EmojiEvents />}
                        title={<span style={{ paddingRight: '10px' }}>Active Tournaments</span>}
                        value="12"
                        change={8.3}
                        color="success"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<SportsEsports />}
                        title={<span style={{ paddingRight: '10px' }}>Upcoming Matches</span>}

                        value="45"
                        change={15.8}
                        color="warning"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<CheckCircleOutline />}
                        title={<span style={{ paddingRight: '10px' }}>Completed Matches</span>}
                        value="119"
                        change={-4.2}
                        color="info"
                    />
                </Grid>
            </Grid>

            {/* Quick Links Section */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="h2" fontWeight={600}>
                    Quick Actions
                </Typography>
            </Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid xs={12} md={6}>
                    <QuickLinkCard
                        icon={<SportsCricket color="primary" />}
                        title="Create Tournament"
                        description="Set up a new cricket tournament with customizable rules, teams, and match schedules."
                        buttonText="Create Tournament"
                        buttonIcon={<Add />}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <QuickLinkCard
                        icon={<PeopleOutline color="primary" />}
                        title="Manage Teams & Players"
                        description="View, edit, and manage cricket teams, player profiles, and performance statistics."
                        buttonText="View Teams"
                        buttonIcon={<PersonAdd />}
                    />
                </Grid>
            </Grid>

            {/* Graphs Section */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="h2" fontWeight={600}>
                    Analytics Overview
                </Typography>
                <Button color="primary" sx={{ textTransform: 'none' }}>
                    View All Reports
                </Button>
            </Box>
            <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                    <Paper elevation={0} sx={{
                        height: '100%',
                        minHeight: 350,
                        borderRadius: 3,
                        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                        background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    }}>
                        <UserEngagementChart />
                    </Paper>
                </Grid>
                <Grid xs={12} md={6}>
                    <Paper elevation={0} sx={{
                        height: '100%',
                        minHeight: 350,
                        borderRadius: 3,
                        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                        background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    }}>
                        <MatchSummaryChart />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Admin>
            {dashboard}
        </Admin>
    );
};

export default AdminDashboard;