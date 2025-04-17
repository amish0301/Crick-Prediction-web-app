import { io } from 'socket.io-client';


const server_url = "http://localhost:8000";
const socket = io(server_url, { withCredentials: true });

export default socket;