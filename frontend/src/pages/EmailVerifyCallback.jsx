import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { setToken, userExists } from '../store/slices/user';

const EmailVerifyCallback = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const dispatch = useDispatch();


    const verifyToken = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`, { withCredentials: true });
            if (res.data.success) {
                console.log('from email verifycallback', res.data);

                // storing info
                dispatch(userExists({ ...res.data.user }));
                dispatch(setToken(res.data.accessToken));
                setTimeout(() => navigate('/'), 1000);
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
        <Loader />
    );
}

export default EmailVerifyCallback