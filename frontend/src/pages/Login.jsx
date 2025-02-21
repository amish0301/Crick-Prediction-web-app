import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loginimg from '../assets/login.jpg';
import axios from "axios";


const Login = () => {

    const [formData, setFormData] = useState({ uname: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleForm = (e) => {
        e.preventDefault();

    }

    
  const handleValidation = (e) => {
    e.preventDefault();

    // validation
    const ansObj = Object.values(formData).filter(item => !item);
    if(ansObj && ansObj.length) toast.info('All Fields are required');    
  }


    return (
        <section
            aria-label="login-form"
            className="flex h-screen w-full"
        >
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2 h-full">
                <img
                    src={loginimg}
                    alt="login"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-8 md:px-16 shadow-xl">
                <div className="w-full max-w-md">
                    {/* Welcome Heading */}
                    <Typography
                        variant="h4"
                        className="dark:text-green-500 font-bold text-left"
                        sx={{ marginBlock: '20px' }}
                    >
                        <span className="inline-block animate-wave">👋</span> Welcome Back
                    </Typography>

                    {/* Login Form */}
                    <form className="flex flex-col gap-6" onSubmit={handleValidation}>
                        {/* Username Input */}
                        <TextField
                            label="Username"
                            name="uname"
                            variant="outlined"
                            fullWidth
                            autoComplete="username"
                            required
                            value={formData.uname}
                            onChange={handleChange}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    '& fieldset': { borderColor: 'gray' }, // Default border
                                    '&:hover fieldset': { borderColor: 'blue' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: 'blue' } // Focus effect
                                },
                                '& .MuiInputLabel-root': { color: 'gray' }, // Label color
                                '& .MuiInputLabel-root.Mui-focused': { color: 'blue' } // Focused label
                            }}
                        />

                        {/* Password Input */}
                        <div className="relative w-full">
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                autoComplete="current-password"
                                // required
                                value={formData.password}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': { borderColor: 'gray' },
                                        '&:hover fieldset': { borderColor: 'blue' },
                                        '&.Mui-focused fieldset': { borderColor: 'blue' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'blue' },
                                }}
                            />
                            {/* Password Toggle Icon */}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-600 hover:text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-3 primary-btn disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-left text-sm font-semibold text-gray-600 dark:text-gray-300 mt-4">
                        Don't have an account?{" "}
                        <Link to={"/auth/signup"} className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>

        </section>
    )
}

    
export default Login