import { io } from "socket.io-client";
import { useSelector, } from "react-redux";
import _ from "underscore";

const SocketConnection = () => {
    const socket = io.connect('http://localhost:8000');
    const { loginUser } = useSelector(state => state);
    if (!_.isEmpty(loginUser)) {
        const userId = loginUser._id || loginUser.id;
        socket.emit('join', { userId });
    };
}

export default (SocketConnection);