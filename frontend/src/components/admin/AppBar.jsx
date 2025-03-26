import React, { useEffect, useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { IoSettingsOutline as SettingIcon, IoSearchOutline as SearchIcon, IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import { MdOutlineMail as Mailbox } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URI } from '../../constant/variables';
import axiosInstance from '../../hooks/useAxios';
import { setAdmin, userNotExists } from '../../store/slices/user';
import { toast } from 'react-toastify';

export const SearchField = ({ search, setSearch }) => {

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                setSearch('')
            }
        })
    }, [])

    return (
        <Box sx={{
            padding: '0.5rem',
            borderRadius: '.5rem',
            width: { xs: '90%', sm: '60%', lg: '40%' },
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#eff7f9',
        }}>
            <SearchIcon className={`text-xl opacity-50 ${search && 'hidden'}`} />
            <span className='ml-2 w-full'>
                <input type='text' name='search' placeholder='Search here...' className='border-none outline-none bg-transparent py-1 w-full' onChange={e => setSearch(e.target.value)} value={search} />
            </span>
        </Box>
    );
}

const AppBar = () => {
    const [search, setSearch] = useState('');
    const { user } = useSelector(state => state.user);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch();
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const logoutHandler = async () => {
        const toastId = toast.loading('Logging out...');

        try {
            const res = await axiosInstance.get(`/admin/logout`);
            
            if (res.data.success) {
                dispatch(setAdmin(false));
                toast.success('Admin Logged out successfully!', toastId);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed', toastId);
            throw error;
        } finally {
            toast.dismiss(toastId);
        }
    }

    const settings = [{ name: 'Profile', href: '/profile' }, { name: 'Account', href: '#' }, { name: 'Logout', href: `${SERVER_URI}/auth/logout`, handler: logoutHandler }];
    return (
        <Paper elevation={1} sx={{
            padding: { xs: '0.5rem', sm: '1rem' },
            margin: { xs: '0.5rem', sm: '1rem 2.5rem' },
            borderRadius: '1rem',
            maxWidth: { xs: '100vw', sm: '85vw', lg: '70vw' },
            bgcolor: '#ffffff',
            position: '-moz-initial',
        }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'space-between'}>
                <SearchField search={search} setSearch={setSearch} />
                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} sx={{ flexWrap: 'wrap', mt: { xs: '1rem', sm: 0 } }}>
                    {/* all Icons */}
                    <Tooltip title="Settings">
                        <IconButton size='small'>
                            <SettingIcon className='text-xl' />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Notifications">
                        <IconButton size='small' >
                            <NotificationIcon className='text-xl' />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Mailbox">
                        <IconButton size='small'>
                            <Mailbox className='text-xl' />
                        </IconButton>
                    </Tooltip>

                    {/* Profile */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile" src={user?.profileImage} sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={setting.handler}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default AppBar;