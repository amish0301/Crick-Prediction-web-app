import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from '../assets/login.jpg';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.info('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, formData, { withCredentials: true });
            if (response.success) toast.success('Login successful');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <p>Loading....</p>

    return (
        <section aria-label="login-form" className="flex h-screen w-full">
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2 h-full">
                <img src={loginimg} alt="login" className="w-full h-full object-cover" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-8 md:px-16 shadow-xl">
                <div className="w-full max-w-md">
                    <Typography variant="h4" className="dark:text-green-500 font-bold text-left" sx={{ marginBlock: '20px' }}>
                        <span className="inline-block animate-wave">👋</span> Welcome Back
                    </Typography>

                    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                        <TextField
                            label="Username"
                            name="email"
                            variant="outlined"
                            fullWidth
                            autoComplete="username"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', color: 'black', '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'blue' }, '&.Mui-focused fieldset': { borderColor: 'blue' } }, '& .MuiInputLabel-root': { color: 'gray' }, '& .MuiInputLabel-root.Mui-focused': { color: 'blue' } }}
                        />

                        <div className="relative w-full">
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', color: 'black', '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'blue' }, '&.Mui-focused fieldset': { borderColor: 'blue' } }, '& .MuiInputLabel-root': { color: 'gray' }, '& .MuiInputLabel-root.Mui-focused': { color: 'blue' } }}
                            />

                            <button type="button" className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-600 hover:text-black" onClick={togglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>

                        <button type="submit" className="mt-3 primary-btn disabled:opacity-50" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
<<<<<<< HEAD
                       <center> <p className="text-white">OR</p></center>
=======
                        <center> <p className="text-white">OR</p></center>
                        {/* <center><h3 className="text-white btn">Log In With Google</h3></center> */}
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_blank")}
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
>>>>>>> origin
                    </form>

                    <p className="text-left text-sm font-semibold text-gray-600 dark:text-gray-300 mt-4">
                        Don't have an account? <Link to="/auth/signup" className="text-blue-500 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;
