import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logging from '../assets/Signup.jpg';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', password: '', email: '', confirmPassword: '', age: '' });
  const navigate = useNavigate();

  const handleStateUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    const ansObj = Object.values(formData).filter((item) => !item);
    if (ansObj.length) return toast.info('All Fields are required');

    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
    const toastId = toast.loading("loading...")
    try {
      const API = `${import.meta.env.VITE_SERVER_URL}/auth/register`;
      const response = await axios.post(API, formData);
      toast.success('Signup successful', toastId);
    } catch (error) {
      toast.error('Signup failed',toastId);
    }finally{toast.dismiss(toastId)}
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const toastId = toast.loading("Processing Google Sign Up...");
    try {
      const API = `${import.meta.env.VITE_SERVER_URL}/auth/google-signup`;
      const response = await axios.post(API, {
        credential: credentialResponse.credential
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      
      toast.success('Google signup successful');
    } catch (error) {
      toast.error('Google signup failed');
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Container maxWidth={false} sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', overflow: 'hidden', p: 0 }}>
      <Grid container component={Paper} elevation={6} sx={{ borderRadius: 0, overflow: 'hidden', height: '100vh', width: '100%', m: 0 }}>
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box component="form" onSubmit={handleValidation} sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, px: { xs: 4, md: 6, lg: 8 }, py: { xs: 2, md: 3 } }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>Sign Up</Typography>

            <TextField required size="small" fullWidth label="Your Name" name="name" onChange={handleStateUpdate} />
            <TextField required size="small" fullWidth label="Email" name="email" type="email" onChange={handleStateUpdate} />
            <TextField required size="small" fullWidth label="Age" name="age" type="number" onChange={handleStateUpdate} />
            <TextField required size="small" fullWidth label="Password" name="password" type="password" onChange={handleStateUpdate} />
            <TextField required size="small" fullWidth label="Confirm Password" name="confirmPassword" type="password" onChange={handleStateUpdate} />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large" 
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>

            <Divider sx={{ mt: 2, mb: 2 }}>or</Divider>

            {/* Google Sign In Button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                const googleLoginButton = document.querySelector('[role="button"]');
                if (googleLoginButton) googleLoginButton.click();
              }}
              sx={{
                py: 1,
                borderColor: 'grey.600',
                color: 'text.info',
                display: 'flex',
                gap: 2,
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'grey.50'
                }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <RouterLink to="/auth/login" className="text-blue-500 hover:underline" style={{ color: 'primary.main'}}>
                  Login here
                </RouterLink>
              </Typography>
            </Box>
          </Box>

          {/* Hidden Google Login Button */}
          <Box sx={{ display: 'none' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google signup failed')}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <img src={logging} alt="Sign up illustration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
