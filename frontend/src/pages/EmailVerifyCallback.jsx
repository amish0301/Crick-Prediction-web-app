import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { setToken, userExists } from '../store/slices/user';
import { toast } from 'react-toastify';

const EmailVerifyCallback = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenExpire, setIsTokenExpire] = useState(false);
    const token = searchParams.get("token");
    const dispatch = useDispatch();


    const verifyToken = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`, { withCredentials: true });
            if (res.data.success) {
                // storing info
                dispatch(userExists({ ...res.data.user }));
                dispatch(setToken(res.data.accessToken));
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (error) {
            setIsTokenExpire(true);
            toast.error('Token Expired, Please Signup Again');
        } finally { setIsLoading(false); }

    }

    // useEffect
    useEffect(() => {
        verifyToken();
    }, [])


    return (
        <>
            {isLoading && <Loader />}
            {isTokenExpire && (
                <a href='/auth/signup' style={{ padding: '3px 6px', backgroundColor: 'blueviolet' }}>SignUp Again!</a>
            )}
        </>
    );
}

export default EmailVerifyCallback