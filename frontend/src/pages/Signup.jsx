import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Link as RouterLink } from 'react-router-dom';
import logging from '../assets/Signup.jpg';
import { toast } from 'react-toastify';

const Signup = () => {

  const [formData, setFormData] = useState({ name: '', password: '', email: '', confirmPassword: '', age: '' });

  // this below will update form states
  const handleStateUpdate = (e) => {
    setFormData({...formData, [e.target.name] : [e.target.value]})
  }

  const handleValidation = (e) => {
    e.preventDefault();

    // validation
    const ansObj = Object.values(formData).filter(item => !item);
    if(ansObj && ansObj.length) toast.info('All Fields are required');    
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        p: 0
      }}
    >
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
          size={{ xs: 12, md: 6 }}
          sx={{
            height: '100%',
            display: 'flex',
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box
            component="form"
            onSubmit={handleValidation}
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
              onChange={handleStateUpdate}
              variant="outlined"
            />

            <TextField
              required
              size="small"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              onChange={handleStateUpdate}
              autoComplete="email"
              variant="outlined"
            />

            <TextField
              required
              size="small"
              fullWidth
              id="age"
              label="Age"
              name="age"
              onChange={handleStateUpdate}
              type="number"
              variant="outlined"
            />

            <TextField
              required
              size="small"
              fullWidth
              id="password"
              label="Password"
              name="password"
              onChange={handleStateUpdate}
              type="password"
              variant="outlined"
              autoComplete="new-password" 
            />

            <TextField
              required
              size="small"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleStateUpdate}
              type="password"
              variant="outlined"
              autoComplete="new-password" 
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 12px 20px -6px rgba(0,0,0,0.3)'
                }
              }}
            >
              Sign Up
            </Button>

            <Box
              sx={{
                mt: 2,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <RouterLink to="/auth/login">Login here</RouterLink>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid
          size={{ xs: 12, md: 6 }}
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
