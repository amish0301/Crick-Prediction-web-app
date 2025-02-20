import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
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

const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const features = [
    {
      icon: <SportsScore />,
      title: "Live Ball-by-Ball Predictions",
      description: "Test your cricket instincts with real-time predictions"
    },
    {
      icon: <EmojiEvents />,
      title: "Exciting Rewards & Leaderboards",
      description: "Earn points and climb the rankings"
    },
    {
      icon: <Timeline />,
      title: "User Statistics & Tracking",
      description: "Monitor and improve your prediction accuracy"
    },
    {
      icon: <Groups />,
      title: "Community Engagement",
      description: "Compete with friends and other cricket enthusiasts"
    }
  ];

  const steps = [
    {
      icon: <HowToReg />,
      title: "Register & Join",
      description: "Sign up and join a live match"
    },
    {
      icon: <SportsCricket />,
      title: "Make Predictions",
      description: "Predict the next ball's outcome"
    },
    {
      icon: <Stars />,
      title: "Earn Points",
      description: "Get points for correct predictions"
    },
    {
      icon: <EmojiEvents />,
      title: "Win Rewards",
      description: "Redeem rewards and track progress"
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: mode === 'dark'
            ? 'linear-gradient(45deg, #1a237e 30%, #0288d1 90%)'
            : 'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)',
          py: 8,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            fontWeight={800} 
            gutterBottom
            sx={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            🏏 Predict & Win: The Ultimate Cricket Prediction Game!
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Make ball-by-ball predictions, earn rewards, and challenge your friends!
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/auth/signup')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            Start Predicting Now
          </Button>
        </Container>
      </Box>

      {/* What is CrickPredict */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom align="center">
          What is CrickPredict?
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 8 }}>
          CrickPredict is an interactive cricket prediction platform where users predict ball outcomes in real-time and earn rewards. 
          Perfect for cricket fans and fantasy gamers who want to test their cricket knowledge and intuition.
        </Typography>

        {/* Features */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
          Why Choose Us? 🔥
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={4}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* How It Works */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
            How It Works? 🎯
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 60,
                        height: 60,
                        margin: '0 auto 16px'
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Get In Touch 📩
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Have questions or feedback? We'd love to hear from you!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Email />}
            onClick={() => navigate('/contact')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;