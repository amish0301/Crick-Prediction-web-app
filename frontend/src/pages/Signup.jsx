import React from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import logging from '../assets/image.png';

const Signup = () => {
  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2} component={Paper} elevation={3} sx={{ p: 4 }}>
        {/* Left side - Form */}
        <Grid item xs={12} md={6}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Sign Up
            </Typography>

            <TextField
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              variant="outlined"
            />

            <TextField
              required
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
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />

            <TextField
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
            />

            <TextField
              required
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
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Sign Up
            </Button>
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
            justifyContent: 'center'
          }}
        >
          <img
            src={logging}
            alt="Sign up illustration"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;