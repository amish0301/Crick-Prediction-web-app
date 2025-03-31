import { useParams, useSearchParams } from 'react-router-dom';
import { 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Button, 
    Paper, 
    Container,
    TablePagination,
    TableFooter
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';

// Separate PlayersTable component with pagination
const PlayersTable = ({ availablePlayers, loading, handleAddPlayer }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer sx={{ bgcolor: "#fafafa", borderRadius: "0 0 12px 12px", overflow: "auto" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "600" }}>Age</TableCell>
                        <TableCell sx={{ fontWeight: "600" }}>Position</TableCell>
                        <TableCell sx={{ fontWeight: "600" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography>Loading players...</Typography>
                            </TableCell>
                        </TableRow>
                    ) : availablePlayers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography>No players available</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        availablePlayers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((player) => (
                                <TableRow key={player.id} sx={{ "&:hover": { bgcolor: "#f0f0f0" } }}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{player.age}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            startIcon={<AddIcon />}
                                            onClick={() => handleAddPlayer(player.id)}
                                            sx={{
                                                bgcolor: "#286675",
                                                "&:hover": { bgcolor: "#1e4d5a" },
                                                borderRadius: "6px",
                                                fontSize: "0.75rem",
                                                px: 2,
                                            }}
                                            disabled={!player.id}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={availablePlayers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            component="div"
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

const AddPlayerPage = () => {
    const { teamId } = useParams();
    const [searchParams] = useSearchParams();
    const teamName = searchParams.get("name");
    const [loading, setLoading] = useState(true);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [removedPlayerId, setRemovedPlayerId] = useState(null);

    // Fetch team players
    const fetchTeamPlayers = async () => {
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/admin/team/${teamId}?isPopulate=true`);
            console.log(response.data)
            if (response.data.success && response.data.players) {
                setTeamPlayers(response.data.players.map(player => ({
                    id: player.player_id,
                    name: player.name || 'Unnamed',
                    age: player.age || 'N/A',
                    position: player.position || 'N/A',
                })));
            }
        } catch (error) {
            console.error('Fetch team players error:', error);
            toast.error('Failed to fetch team players');
        }
    };

    // Fetch available players
    const fetchAvailablePlayers = async () => {
        try {
            const response = await axiosInstance.get('/admin/players/available');
            console.log("avil pl ",response.data)
            if (response.data.success && response.data.players) {
                const players = Array.isArray(response.data.players) 
                    ? response.data.players 
                    : [response.data.players];
                setAvailablePlayers(players.map(player => ({
                    id: player.player_id,
                    name: player.name || 'Unnamed',
                    age: player.age || 'N/A',
                    position: player.position || 'N/A',
                })));
            }
        } catch (error) {
            console.error('Fetch available players error:', error);
            toast.error('Failed to fetch available players');
        } finally {
            setLoading(false);
        }
    };

    const removePlayers = async (playerId) => {
        try {
            const response = await axiosInstance.post(`${import.meta.env.VITE_SERVER_URL}/admin/assign-player?playerId=${playerId}&teamId=${teamId}&isRemove=true`, 
            );

            if (response.data.success) {
                setTeamPlayers(teamPlayers.filter(player => player.id !== playerId));
                setRemovedPlayerId(null);
                toast.success('Player removed successfully');
            }
        } catch (error) {
            console.error('Remove player error:', error);
            toast.error('Failed to remove player');
        }
    };
    console.log('teamName:', teamName);

    // Add player to team
    const handleAddPlayer = async (playerId) => {
        if (!teamId || !playerId) {
            toast.error('Team ID or Player ID is missing');
            return;
        }

        const toastId = toast.loading(`Adding player ${playerId} to team ${teamId}...`);
        try {
            const response = await axiosInstance.post(
                `${import.meta.env.VITE_SERVER_URL}/admin/assign-player?playerId=${playerId}&teamId=${teamId}`
            );
            if (response.data.success) {
                toast.update(toastId, {
                    render: 'Player added successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                // Update both lists
                const playerToAdd = availablePlayers.find(p => p.id === playerId);
                setTeamPlayers(prev => [...prev, playerToAdd]);
                setAvailablePlayers(prev => prev.filter(p => p.id !== playerId));
            }
        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || 'Failed to add player',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    // Fetch data on mount
    useEffect(() => {
        fetchTeamPlayers();
        fetchAvailablePlayers();
    }, [teamId,teamName]);

    return (
        <Container component="main" sx={{ py: 4 }}>
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    fontWeight: '700',
                    color: 'text.primary',
                    mb: 3,
                    textAlign: 'center',
                    letterSpacing: '0.5px',
                }}
            >
                Team {teamName || 'Players'} Players
            </Typography>

            {/* Current Team Players */}
            <Paper
                elevation={6}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: '16px',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        bgcolor: '#286675',
                        color: 'white',
                        p: 2,
                        borderRadius: '12px 12px 0 0',
                    }}
                >
                    Current Team Players
                </Typography>
                <TableContainer sx={{ bgcolor: '#fafafa', borderRadius: '0 0 12px 12px',overflow:'auto' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: '600' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: '600' }}>Age</TableCell>
                        <TableCell sx={{ fontWeight: '600' }}>Position</TableCell>
                        <TableCell sx={{ fontWeight: '600' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography>Loading players...</Typography>
                            </TableCell>
                        </TableRow>
                    ) : teamPlayers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography>No players in team</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        teamPlayers.map((player) => (
                            <TableRow key={player.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.age}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        onClick={() => removePlayers(player.id)}
                                        disabled={removedPlayerId === player.id}
                                    >
                                        {removedPlayerId === player.id ? 'Removing...' : 'Remove'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
            </Paper>

            {/* Available Players Accordion */}
            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    bgcolor: "#286675",
                    color: "white",
                    p: 2,
                    borderRadius: "12px 12px 0 0",
                }}
            >
                Available Players
            </Typography>
            <PlayersTable 
                availablePlayers={availablePlayers}
                loading={loading}
                handleAddPlayer={handleAddPlayer}
            />
        </Container>
    );
};

export default AddPlayerPage;