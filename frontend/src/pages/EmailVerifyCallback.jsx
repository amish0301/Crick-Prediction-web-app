import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerifyCallback = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const verifyToken = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`, {withCredentials: true});
            if (res.data.success) {
                // store in stat
                localStorage.setItem("user", JSON.stringify(res.data?.user));
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            console.log('error while verifying email');
        }

    }

    // useEffect
    useEffect(() => {
        verifyToken();
    }, [])


    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
        </Box>
    )
}

export default EmailVerifyCallback