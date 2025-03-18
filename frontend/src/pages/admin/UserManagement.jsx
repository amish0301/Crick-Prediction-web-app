import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Mock data - replace with your API call
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', status: 'active', totalPredictions: 145 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', status: 'active', totalPredictions: 89 },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '(555) 456-7890', status: 'inactive', totalPredictions: 56 },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '(555) 789-0123', status: 'active', totalPredictions: 212 },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '(555) 234-5678', status: 'inactive', totalPredictions: 34 },
];

const UsersManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState(mockUsers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setDeleteDialogOpen(false);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setViewProfileOpen(true);
  };

  const handleCloseViewProfile = () => {
    setViewProfileOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Users Management
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {!isMobile && <TableCell>Email</TableCell>}
                {!isMobile && <TableCell>Phone</TableCell>}
                <TableCell>Status</TableCell>
                <TableCell>Predictions</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    {!isMobile && <TableCell>{user.email}</TableCell>}
                    {!isMobile && <TableCell>{user.phone}</TableCell>}
                    <TableCell>
                      <Chip 
                        label={user.status === 'active' ? 'Active' : 'Inactive'} 
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.totalPredictions}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => handleViewProfile(user)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <Button
                          variant="outlined"
                          size="small"
                          color={user.status === 'active' ? 'warning' : 'success'}
                          onClick={() => handleToggleStatus(user.id)}
                          sx={{ ml: 1, fontSize: isMobile ? '0.7rem' : '0.8rem', px: 1 }}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleOpenDeleteDialog(user)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Profile Dialog */}
      <Dialog
        open={viewProfileOpen}
        onClose={handleCloseViewProfile}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">{selectedUser.name}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                <Typography><strong>Phone:</strong> {selectedUser.phone}</Typography>
                <Typography><strong>Status:</strong> {selectedUser.status === 'active' ? 'Active' : 'Inactive'}</Typography>
                <Typography><strong>Total Predictions:</strong> {selectedUser.totalPredictions}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewProfile}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersManagement;