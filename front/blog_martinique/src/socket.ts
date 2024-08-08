import { io } from "socket.io-client";
import { URl } from "./Utils/Constant/URL";


export const socket = io(URl.BACK);