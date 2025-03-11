import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Correct Grid import
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logging from '../assets/Signup.jpg';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
    age: "",
  });
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(
    localStorage.getItem("emailSent") === "true"
  );
  const navigate = useNavigate();

  const handleStateUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setShowConfirmPassword((prev) => !prev);
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    console.log(formData);

    const ansObj = Object.values(formData).filter((item) => !item);
    if (ansObj.length) return toast.info("All Fields are required");

    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");
    const toastId = toast.loading("Creating an Account...");

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, formData);
      if (res.data.success) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("emailSent", "true");
        setEmailSent(formData.email)
        setEmail(true);
        toast.dismiss(toastId)
      }
    } catch (error) {
      toast.error('Signup failed', toastId);
    } finally { toast.dismiss(toastId) }
  };

  // polling for checking whether user verified or not 
  useEffect(() => {
    if (!emailSent || !email) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/check-verification?email=${email}`, { withCredentials: true });
        if (response.data.isVerified) {
          toast.success("Account Verified! Redirecting...");
          setEmail(false);
          setEmailSent("");

          clearInterval(interval);
        }
      } catch (error) {
        console.error("Verification Check Error:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [emailSent, email]);


  // if(isLoading) 

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        component={Paper}
        elevation={6}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* Left Section - Signup Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 4, md: 6, lg: 8 },
          }}
        >
          {email ? (
            <Typography variant="h5" align="center" color="primary">
              Check your email for the verification link.
            </Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleValidation}
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
              >
                Sign Up
              </Typography>

              <TextField required size="small" fullWidth label="Your Name" name="name" onChange={handleStateUpdate} />
              <TextField required size="small" fullWidth label="Email" name="email" type="email" onChange={handleStateUpdate} />
              <TextField required size="small" fullWidth label="Age" name="age" type="number" onChange={handleStateUpdate} />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                variant="outlined"
                onChange={handleStateUpdate}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />


              <TextField
                required
                size="small"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleStateUpdate}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />


              <Button type="submit" fullWidth variant="contained" size="large">
                Sign Up
              </Button>

              <Divider sx={{ mt: 2, mb: 2 }}>or</Divider>

              <Button
                variant="outlined"
                fullWidth
                onClick={() =>
                  window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_blank")
                }
                sx={{
                  py: 1,
                  borderColor: "grey.600",
                  color: "text.info",
                  display: "flex",
                  gap: 2,
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "grey.50",
                  },
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

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <RouterLink to="/auth/login" style={{ color: "primary.main" }}>
                    Login here
                  </RouterLink>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Right Section - Image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            height: "100%",
          }}
        >
          <img src={logging} alt="Signup" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
