import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import logging from '../assets/Signup.jpg';
import { toast } from 'react-toastify';


const Signup = () => {
  const [formData, setFormData] = useState({ name: '', password: '', email: '', confirmPassword: '', age: '' });

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

            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>Sign Up</Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">Already have an account? <RouterLink to="/auth/login">Login here</RouterLink></Typography>
            </Box>
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
