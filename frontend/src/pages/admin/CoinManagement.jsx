import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Tabs,
    Tab,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
} from '@mui/material';
import Grid from "@mui/material/Grid2"; // Updated Grid2 import
import { styled } from '@mui/material/styles';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

const CoinManagementPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [coinAmount, setCoinAmount] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock data fetching (replace with actual API calls)
    useEffect(() => {
        // Fetch users
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', coins: 500, status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', coins: 750, status: 'Active' },
        ];
        setUsers(mockUsers);

        // Fetch transactions
        const mockTransactions = [
            { id: 1, userId: 1, amount: 100, type: 'Credit', date: '2025-04-06', reason: 'Match Prediction Win' },
            { id: 2, userId: 2, amount: -50, type: 'Debit', date: '2025-04-05', reason: 'Entry Fee' },
        ];
        setTransactions(mockTransactions);
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleDistributeCoins = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleSubmitCoins = () => {
        // Implement API call to distribute coins
        console.log(`Distributing ${coinAmount} coins to ${selectedUser.name}`);
        setOpenDialog(false);
        setCoinAmount('');
        setSelectedUser(null);
    };

    // Tab content component
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Coin Management
            </Typography>

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Users Overview" />
                <Tab label="Transaction History" />
                <Tab label="Bulk Distribution" />
            </Tabs>

            {/* Users Overview Tab */}
            <TabPanel value={activeTab} index={0}>
                <StyledPaper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Coins</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.coins}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status}
                                                color={user.status === 'Active' ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleDistributeCoins(user)}
                                            >
                                                Add Coins
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledPaper>
            </TabPanel>

            {/* Transaction History Tab */}
            <TabPanel value={activeTab} index={1}>
                <StyledPaper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Reason</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.userId}</TableCell>
                                        <TableCell
                                            sx={{ color: transaction.amount > 0 ? 'green' : 'red' }}
                                        >
                                            {transaction.amount}
                                        </TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.reason}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledPaper>
            </TabPanel>

            {/* Bulk Distribution Tab */}
            <TabPanel value={activeTab} index={2}>
                <StyledPaper>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6">Bulk Coin Distribution</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Coin Amount"
                                type="number"
                                variant="outlined"
                                onWheel={(e) => e.target.blur()}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Distribution Reason"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained" color="primary">
                                Distribute to All Active Users
                            </Button>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </TabPanel>

            {/* Coin Distribution Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Distribute Coins to {selectedUser?.name}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Coin Amount"
                        type="number"
                        fullWidth
                        value={coinAmount}
                        onChange={(e) => setCoinAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmitCoins} variant="contained">
                        Distribute
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CoinManagementPage;