import React from 'react';
import { 
  Container, 
  Paper, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Link 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logging from '../assets/Signup.jpg';

const Signup = () => {
  return (
    <Container maxWidth={false} sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex', 
      alignItems: 'center',
      overflow: 'hidden',
      p: 0
    }}>
      <Grid 
        container 
        component={Paper} 
        elevation={6} 
        sx={{ 
          borderRadius: 0,
          overflow: 'hidden',
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          height: '100vh',
          width: '100%',
          m: 0
        }}
      >
        {/* Left side - Form */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.2,
              px: { xs: 4, md: 6, lg: 8 },
              py: { xs: 2, md: 3 },
              width: '100%'
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              align="center" 
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1.5
              }}
            >
              Sign Up
            </Typography>
            
            <TextField
              required
              size="small"
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              variant="outlined"
            />
            
            <TextField
              required
              size="small"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              variant="outlined"
            />
            
            <TextField
              required
              size="small"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />
            
            <TextField
              required
              size="small"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
            />
            
            <TextField
              required
              size="small"
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ 
                mt: 1,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 12px 20px -6px rgba(0,0,0,0.3)',
                }
              }}
            >
              Sign Up
            </Button>

            <Box sx={{ 
              mt: 2, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5
            }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    color: 'primary.dark',
                    textDecoration: 'underline'
                  }
                }}
              >
                Login here
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'primary.light',
            height: '100%',
            width: '100%'
          }}
        >
          <img 
            src={logging} 
            alt="Sign up illustration" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;