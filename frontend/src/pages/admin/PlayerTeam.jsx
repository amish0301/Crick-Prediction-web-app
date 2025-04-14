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
    TableFooter,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Add as AddIcon,
    ExpandMore as ExpandMoreIcon,
    Star as StarIcon,
    Sports as SportsIcon
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setTeamPlayers, setMainPlayers } from '../../store/slices/admin';

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
    // const [teamPlayers, setTeamPlayers] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [removedPlayerId, setRemovedPlayerId] = useState(null);
    const dispatch = useDispatch();
    const { teamPlayers, mainPlayers } = useSelector(state => state?.admin);
    // console.log(store.getState().);


    // New states for main players and captain functionality
    // const [mainPlayers, setMainPlayers] = useState([]);
    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerRole, setPlayerRole] = useState('extra');

    // Fetch team players
    const fetchTeamPlayers = async () => {
        try {
            const response = await axiosInstance.get(`/admin/team/${teamId}?isPopulate=true`);

            if (response.data.success) {
                // Check if players data exists in the response
                if (!response.data.players) {
                    console.error('No players data in response');
                    dispatch(setTeamPlayers([]));  // Use dispatch instead of setTeamPlayers
                    setMainPlayers([]);
                    return;
                }

                // Correctly handle the nested players array
                const playersData = response.data.players.players || [];
                const mainPlayersIds = response.data.players.main_players || [];

                // Ensure we have an array to work with
                const players = Array.isArray(playersData) ? playersData : [];

                const formattedPlayers = players.map(player => {
                    const role = player.TeamPlayers?.role?.toUpperCase() || 'PLAYER';

                    return {
                        id: player.player_id,
                        name: player.name || 'Unnamed',
                        age: player.age || 'N/A',
                        position: player.position || 'N/A',
                        role,
                        isCaptain: role === 'CAPTAIN',
                        isMain: role === 'MAIN' || role === 'CAPTAIN'  // ✅ Treat CAPTAIN as MAIN also
                    };
                });

                // Dispatch the array as a single argument, not spread
                dispatch(setTeamPlayers(formattedPlayers));
                dispatch(setMainPlayers(formattedPlayers.filter(player => player.isMain)));
            }
        } catch (error) {
            console.error('Fetch team players error:', error);
            dispatch(setTeamPlayers([]));  // Use dispatch in error case too
            setMainPlayers([]);
        }
    };

    // Fetch available players
    const fetchAvailablePlayers = async () => {
        try {
            const response = await axiosInstance.get('/admin/players/available');
            if (response.data.success) {
                // Check if players data exists in the response
                if (!response.data.players) {
                    // console.error('No available players data in response');
                    setAvailablePlayers([]);
                    return;
                }

                // Ensure we have an array to work with
                const playersData = response.data.players;
                const players = Array.isArray(playersData) ? playersData :
                    (playersData ? [playersData] : []);

                const formattedPlayers = players.map(player => ({
                    id: player.player_id,
                    name: player.name || 'Unnamed',
                    age: player.age || 'N/A',
                    position: player.position || 'N/A',
                }));

                setAvailablePlayers(formattedPlayers);
            } else {
                console.error('API returned unsuccessful response', response.data);
                toast.error('Failed to fetch available players');
                setAvailablePlayers([]);
            }
        } catch (error) {
            // console.error('Fetch available players error:', error.response?.data || error.message || error);
            toast.error('Failed to fetch available players');
            setAvailablePlayers([]);
        } finally {
            setLoading(false);
        }
    };

    const removePlayers = async (playerId) => {
        try {
            const response = await axiosInstance.post(
                `${import.meta.env.VITE_SERVER_URL}/admin/assign-player?playerId=${playerId}&teamId=${teamId}&isRemove=true`
            );

            if (response.data.success) {
                dispatch(setTeamPlayers(teamPlayers.filter(player => player.id !== playerId)))
                dispatch(setMainPlayers(mainPlayers.filter(player => player.id !== playerId)));
                setRemovedPlayerId(null);
                toast.success('Player removed successfully');
            }
        } catch (error) {
            // console.error('Remove player error:', error);
            toast.error('Failed to remove player');
        }
    };

    // Add player to team
    const handleAddPlayer = async (playerId) => {
        if (!teamId || !playerId) {
            toast.error('Team ID or Player ID is missing');
            return;
        }

        const toastId = toast.loading(`Adding player ${playerId} to team ${teamId}...`);

        try {
            const response = await axiosInstance.post(
                `/admin/assign-player?playerId=${playerId}&teamId=${teamId}`
            );

            if (response.data.success) {
                toast.update(toastId, {
                    render: 'Player added successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });

                // Refresh the team players list from backend
                await fetchTeamPlayers();

                // Optional: Update available players only
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
    console.log("players", teamPlayers);

    // Toggle main player status
    const toggleMainPlayer = async (playerId, isCurrentlyMain) => {
        // Check if trying to add more than 11 main players
        if (!isCurrentlyMain && mainPlayers.length >= 11) {
            toast.error('Maximum of 11 main players allowed');
            return;
        }

        const toastId = toast.loading(`Updating player status...`);
        try {
            // Use the structure provided by the user

            // Filter out the captain from mainPlayers
            const nonCaptainMainPlayers = mainPlayers.filter(p => p.role !== 'CAPTAIN');

            // Now handle toggle logic without touching captain
            const payloadPlayers = isCurrentlyMain
                ? nonCaptainMainPlayers
                    .filter(player => player.id !== playerId)
                    .map(player => ({ id: player.id, role: "MAIN" }))
                : [...nonCaptainMainPlayers, teamPlayers.find(p => p.id === playerId)]
                    .map(player => ({ id: player.id, role: "MAIN" }));


            const response = await axiosInstance.put(`/admin/team/assign/main-players?teamId=${teamId}`, {
                // teamId is in the query param
                players: payloadPlayers
            });

            if (response.data.success) {
                toast.update(toastId, {
                    render: `Player ${isCurrentlyMain ? 'removed from' : 'added to'} main squad!`,
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });

                // Update local state
                const updatedTeamPlayers = teamPlayers.map(player => {
                    if (player.id === playerId) {
                        const updatedIsMain = !isCurrentlyMain;
                        return {
                            ...player,
                            isMain: updatedIsMain
                        };
                    }
                    return player;
                });
                
                // Dispatch full team update
                dispatch(setTeamPlayers(updatedTeamPlayers));
                
                // Recalculate main players including captain
                const updatedMainPlayers = updatedTeamPlayers.filter(
                    player => player.role === 'CAPTAIN' || player.isMain
                );
                dispatch(setMainPlayers(updatedMainPlayers));
                
            } else {
                toast.update(toastId, {
                    render: response.data.message || 'Failed to update player status',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                console.error("API returned success: false for toggleMainPlayer", response.data);
            }
        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || 'Failed to update player status',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            console.error('Toggle main player error:', error.response?.data || error.message || error);
        }
    };



    // Open dialog to change player role
    const handleOpenRoleDialog = (player) => {
        setSelectedPlayer(player);
        setPlayerRole(player.role);
        setOpenRoleDialog(true);
    };

    // Change player role (e.g., to captain)
    const changePlayerRole = async () => {
        if (!selectedPlayer || !playerRole) {
            toast.error('Player or role not selected');
            return;
        }

        const toastId = toast.loading(`Updating player roles...`);

        try {
            const isNewCaptain = playerRole.toUpperCase() === 'CAPTAIN';
            const currentCaptain = teamPlayers.find(p => p.role === 'CAPTAIN');

            let updatedRolesMap = new Map();

            // Start by assigning all current main players as "MAIN"
            mainPlayers.forEach(player => {
                const playerRole = teamPlayers.find(p => p.id === player.id)?.role?.toUpperCase();

                // Skip if player is already set in updatedRolesMap OR is captain
                // Skip if player is already set in updatedRolesMap OR is captain
                if (!updatedRolesMap.has(player.id) && playerRole !== 'CAPTAIN') {
                    updatedRolesMap.set(player.id, 'MAIN');
                }

            });

            if (isNewCaptain) {
                if (currentCaptain && currentCaptain.id !== selectedPlayer.id) {
                    updatedRolesMap.set(currentCaptain.id, 'MAIN');  // 👈 Revert old captain to MAIN
                }
                updatedRolesMap.set(selectedPlayer.id, 'CAPTAIN'); // 👈 Assign new captain
            } else {
                // Assign selected player to selected role
                updatedRolesMap.set(selectedPlayer.id, playerRole.toUpperCase());
            }

            // Build players payload
            const playersPayload = Array.from(updatedRolesMap).map(([id, role]) => ({ id, role }));

            const response = await axiosInstance.put(`/admin/team/assign/main-players?teamId=${teamId}`, {
                players: playersPayload

            });

            if (response.data.success) {
                const updatedLocalPlayers = teamPlayers.map(player => {
                    const newRole = updatedRolesMap.get(player.id) || 'EXTRA';
                    return {
                        ...player,
                        role: newRole,
                        isMain: newRole === 'MAIN' || newRole === 'CAPTAIN',
                        isCaptain: newRole === 'CAPTAIN'
                    };
                });
                await fetchTeamPlayers();

                updateLocalState(updatedLocalPlayers, toastId);
            } else {
                toast.update(toastId, {
                    render: response.data.message || 'Failed to update player roles',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000
                });
            }
        } catch (error) {
            console.error("❌ Error during role change:", error);
            toast.update(toastId, {
                render: error.response?.data?.message || 'Network/Server Error',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    };






    // Helper function to update local state
    const updateLocalState = (updatedTeamPlayers, toastId) => {
        setTeamPlayers(updatedTeamPlayers);
        setMainPlayers(updatedTeamPlayers.filter(p => p.role === 'MAIN' || p.role === 'CAPTAIN'));
        setOpenRoleDialog(false);

        toast.update(toastId, {
            render: `Player role updated successfully!`,
            type: 'success',
            isLoading: false,
            autoClose: 3000
        });
    };

    // Fetch data on mount
    useEffect(() => {
        if (teamId) {
            fetchTeamPlayers();
            fetchAvailablePlayers();
        }
    }, [teamId]);

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
                Team {teamName || 'Players'} Management
            </Typography>

            {/* Main Player Stats */}
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: '12px',
                    bgcolor: '#f0f8ff',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>
                    <strong>Main Players:</strong> {mainPlayers.length}/11
                </Typography>
                <Typography>
                    <strong>Captain:</strong> {mainPlayers?.find(p => p.role === 'CAPTAIN')?.name || 'Not assigned'}
                </Typography>

            </Paper>

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
                <TableContainer sx={{ bgcolor: '#fafafa', borderRadius: '0 0 12px 12px', overflow: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: '600' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Age</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Position</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography>Loading players...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : teamPlayers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography>No players in team</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                teamPlayers.map((player) => (
                                    <TableRow key={player.id} sx={{
                                        '&:hover': { bgcolor: '#f0f0f0' },
                                        bgcolor: player.isMain ? '#f0f8ff' : 'inherit'
                                    }}>
                                        <TableCell>
                                            {player.name}
                                            {player.role === 'captain' && (
                                                <StarIcon sx={{ ml: 1, color: '#FFD700', fontSize: '1rem' }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{player.age}</TableCell>
                                        <TableCell>{player.position}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={player.isMain ? "Main" : "Extra"}
                                                color={player.isMain ? "primary" : "default"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={player.role === 'CAPTAIN' ? "Captain" : "Main"}
                                                color={player.role === 'CAPTAIN' ? "secondary" : "default"}
                                                size="small"
                                                icon={player.role === 'CAPTAIN' ? <StarIcon /> : null}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color={player.isMain ? "warning" : "success"}
                                                size="small"
                                                onClick={() => toggleMainPlayer(player.id, player.isMain)}
                                                sx={{ mr: 1, mb: { xs: 1, md: 0 } }}
                                                style={{ display: `${player.isMain ? 'none' : ''}` }}
                                            >
                                                {"Add to Main"}
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="info"
                                                size="small"
                                                onClick={() => handleOpenRoleDialog(player)}
                                                disabled={!player.isMain}
                                                sx={{ mr: 1, mb: { xs: 1, md: 0 } }}
                                            >
                                                Change Role
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => removePlayers(player.id)}
                                                disabled={removedPlayerId === player.id}
                                                sx={{ mt: '10px' }}
                                            >
                                                {removedPlayerId === player.id ? 'Removing...' : 'Remove From The Team'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Available Players */}
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

            {/* Role Dialog */}
            <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)}>
                <DialogTitle>Change Player Role</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={playerRole}
                            label="Role"
                            onChange={(e) => setPlayerRole(e.target.value)}
                        >
                            <MenuItem value="extra">Extra</MenuItem>
                            <MenuItem value="captain">Captain</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRoleDialog(false)}>Cancel</Button>
                    <Button onClick={changePlayerRole} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AddPlayerPage;