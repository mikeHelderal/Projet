import { io } from "socket.io-client";


export const socket = io(import.meta.env.REACT_APP_BACKEND_URL, {
    //reconnectionDelayMax: 10000,
    //reconnectionAttempts: 5,
    }
);
