import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken, userExists } from '../store/slices/user';
import { useSelector } from 'react-redux';

const GoogleOAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    // useEffect
    useEffect(() => {
        const handleOAuthCallback = async () => {
            const accessToken = searchParams.get("accessToken");
            const userEncodedInfo = searchParams.get("user");

            if (accessToken && userEncodedInfo) {
                const user = JSON.parse(decodeURIComponent(userEncodedInfo));
                dispatch(userExists(user));
                dispatch(setToken(accessToken));
            } else {
                console.log('Error in getting access token');
            }
        };

        handleOAuthCallback();
    }, [searchParams, dispatch, navigate]);

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);


    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        </>
    )
}

export default GoogleOAuthCallback