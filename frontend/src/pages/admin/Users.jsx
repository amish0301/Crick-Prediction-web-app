import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Stack,
    Typography,
    Box,
    Avatar,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Modal,
    useTheme,
    useMediaQuery,
    InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Using Grid2
import { styled } from '@mui/material/styles';
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Block as BlockIcon,
    People as ManageAccountsIcon,
} from '@mui/icons-material';
import axiosInstance from '../../hooks/useAxios';

// Styled Components
const WelcomePaper = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[8],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const TablePaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[4],
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '400px' },
    bgcolor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[10],
    p: 4,
}));

// UserManagement Component
const UserManagement = () => {
    const { user } = useSelector((state) => state.user); // Get admin user from Redux
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Dummy user data
    const [users, setUsers] = useState([]);

    // State for search, modal, and editing
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

    // Handle search
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle modal open/close
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setEditForm({ name: user.name, email: user.email, role: user.role });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    // Handle edit user
    const handleEditUser = () => {
        setUsers(
            users.map((u) =>
                u.id === selectedUser.id ? { ...u, ...editForm } : u
            )
        );
        handleCloseModal();
    };

    // Handle delete user
    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    // handle fetch users
    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get('/admin/users');
            if (res.data.success) {
                setUsers(res.data.users);
                console.log(res.data.users);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
            toast.error('Failed to fetch users');
        }
    };

    // Handle block/unblock user
    const handleBlockUser = (id) => {
        setUsers(
            users.map((u) =>
                u.id === id
                    ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' }
                    : u
            )
        );
    };
    useEffect(() => {
        fetchUsers();
    }
        , []);

    return (
        <Container component="main" sx={{ py: { xs: 2, md: 3 } }}>
            {/* Welcome Section */}
            <WelcomePaper>
                <Avatar
                    sx={{
                        bgcolor: theme.palette.secondary.main,
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                    }}
                >
                    {user?.name?.charAt(0) || 'A'}
                </Avatar>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Manage Users, {user?.name || 'Admin'}!
                    </Typography>
                    <Typography variant="body1">
                        Search, edit, or update user details below.
                    </Typography>
                </Box>
            </WelcomePaper>

            {/* Search and Actions */}
            <Grid container spacing={2} sx={{ my: 3 }}>
                <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: theme.shape.borderRadius * 1.5,
                            },
                        }}
                    />
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 4, md: 6 }}
                    sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ManageAccountsIcon />}
                        sx={{ borderRadius: theme.shape.borderRadius * 1.5, px: 3 }}
                        onClick={() => alert('Add user functionality coming soon!')}
                    >
                        Add New User
                    </Button>
                </Grid>
            </Grid>

            {/* User Table */}
            <TablePaper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>
                                    Email
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>
                                    Predictions
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>
                                            {user.name
                                                ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                            {user.predictions}
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                color={user.status === 'Active' ? 'success.main' : 'error.main'}
                                            >
                                                {user.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <ActionButton
                                                    onClick={() => handleOpenModal(user)}
                                                    color="primary"
                                                    title="Edit"
                                                >
                                                    <EditIcon />
                                                </ActionButton>
                                                <ActionButton
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    color="error"
                                                    title="Delete"
                                                >
                                                    <DeleteIcon />
                                                </ActionButton>
                                                <ActionButton
                                                    onClick={() => handleBlockUser(user.id)}
                                                    color={user.status === 'Active' ? 'warning' : 'success'}
                                                    title={user.status === 'Active' ? 'Block' : 'Unblock'}
                                                >
                                                    <BlockIcon />
                                                </ActionButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography color="text.secondary">No users found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TablePaper>

            {/* Edit User Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <ModalBox>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Edit User: {selectedUser?.name}
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Role"
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                            SelectProps={{ native: true }}
                            variant="outlined"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </TextField>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCloseModal}
                                sx={{ borderRadius: theme.shape.borderRadius }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditUser}
                                sx={{ borderRadius: theme.shape.borderRadius }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </ModalBox>
            </Modal>
        </Container>
    );
};

export default UserManagement;