import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  useTheme
} from '@mui/material';
import {
  SportsScore,
  EmojiEvents,
  Timeline,
  Groups,
  HowToReg,
  SportsCricket,
  Stars,
  Email
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import Grid from '@mui/material/Grid';

const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const features = [
    {
      icon: <SportsScore />, title: "Live Ball-by-Ball Predictions",
      description: "Test your cricket instincts with real-time predictions"
    },
    {
      icon: <EmojiEvents />, title: "Exciting Rewards & Leaderboards",
      description: "Earn points and climb the rankings"
    },
    {
      icon: <Timeline />, title: "User Statistics & Tracking",
      description: "Monitor and improve your prediction accuracy"
    },
    {
      icon: <Groups />, title: "Community Engagement",
      description: "Compete with friends and other cricket enthusiasts"
    }
  ];

  const steps = [
    { icon: <HowToReg />, title: "Register & Join", description: "Sign up and join a live match" },
    { icon: <SportsCricket />, title: "Make Predictions", description: "Predict the next ball's outcome" },
    { icon: <Stars />, title: "Earn Points", description: "Get points for correct predictions" },
    { icon: <EmojiEvents />, title: "Win Rewards", description: "Redeem rewards and track progress" }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        background: mode === 'dark' ? 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)' :
          'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)',
        py: 8, color: 'white', textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            🏏 Predict & Win: The Ultimate Cricket Prediction Game!
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Make ball-by-ball predictions, earn rewards, and challenge your friends!
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/auth/signup')} sx={{
            bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem', fontWeight: 600,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)', transform: 'translateY(-2px)' }
          }}>
            Start Predicting Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom align="center">
          Why Choose Us? 🔥
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>{feature.icon}</Avatar>
                  <Typography variant="h6" fontWeight={600} align="center">{feature.title}</Typography>
                  <Typography color="text.secondary" align="center">{feature.description}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center">
          How It Works? 🎯
        </Typography>
        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3, borderRadius: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mb: 2 }}>{step.icon}</Avatar>
                <Typography variant="h6" fontWeight={600}>{step.title}</Typography>
                <Typography color="text.secondary">{step.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Get In Touch 📩
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Have questions or feedback? We'd love to hear from you!
        </Typography>
        <Button variant="contained" size="large" startIcon={<Email />} onClick={() => navigate('/contact')} sx={{
          px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem'
        }}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default About;
