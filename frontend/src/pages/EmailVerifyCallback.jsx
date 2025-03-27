import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setToken, userExists } from '../store/slices/user';

const EmailVerifyCallback = () => {

    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isTokenExpire, setIsTokenExpire] = useState(false);
    const token = searchParams.get("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const verifyToken = async () => {

            const tId = toast.loading("Verifying Token...");

            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`, {}, { withCredentials: true });
                if (res.data.success) {
                    dispatch(userExists({ ...res.data.user }));
                    dispatch(setToken(res.data.accessToken));

                    localStorage.removeItem("email");
                    localStorage.removeItem("emailSent");

                    toast.update(tId, {
                        render: "Login Now",
                        autoClose: 2000,
                        type: 'success',
                        closeButton: true,
                        isLoading: false
                    });
                    navigate('/auth/login', { replace: true });
                }
            } catch (error) {
                setIsTokenExpire(true);
                toast.error('Token Expired, Please Signup Again');
            } finally {
                toast.dismiss(tId);
                setIsLoading(false);
            }
        }

        verifyToken();
    }, [token, dispatch]);
    return (
        <>
            {isLoading && <Loader />}
            {isTokenExpire && (
                <a
                    href='/auth/signup'
                    style={{
                        padding: '3px 6px',
                        backgroundColor: 'blueviolet',
                        color: 'white',
                        textDecoration: 'none'
                    }}
                >
                    SignUp Again!
                </a>
            )}
        </>
    );
}

export default EmailVerifyCallback