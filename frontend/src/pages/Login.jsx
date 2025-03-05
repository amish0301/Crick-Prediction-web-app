import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Typography } from '@mui/material';
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

        if (!formData.uname || !formData.password) {
            toast.info('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, formData);
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

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
                            name="uname"
                            variant="outlined"
                            fullWidth
                            autoComplete="username"
                            required
                            value={formData.uname}
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
                       <center> <p className="text-white">OR</p></center>
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
