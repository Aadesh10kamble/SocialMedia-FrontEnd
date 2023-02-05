import { io } from "socket.io-client";
import _ from "underscore";

const socket = io(process.env.REACT_APP_LOCAL_API);
window.socket = socket;

export const registerUserSocket = (user) => {
    if (_.isEmpty(user)) return;
    console.log ("Join request send");
    socket.emit('join', { userId: user._id || user.id });
};
