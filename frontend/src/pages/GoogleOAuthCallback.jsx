import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GoogleOAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // useEffect
    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const userEncodedInfo = searchParams.get("user");

        if (accessToken && userEncodedInfo) {
            const user = JSON.parse(decodeURIComponent(userEncodedInfo));
            // add user value in state

            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(() => navigate('/'), 1000);
        }else {
            console.log('error in getting accesstoken');
        }

    }, [])

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        </>
    )
}

export default GoogleOAuthCallback