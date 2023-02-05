import React from "react";
import _ from "underscore";
import Router from "./root.router";
import { useSelector, useDispatch } from "react-redux";
import { registerUserSocket } from "../configureSocket";
import { getNotifications, addToNotificationList } from "../actions/auth.actions";

const StartComponent = () => {
    const dispatch = useDispatch();
    const { loginUser, isLoggedIn } = useSelector(state => state);

    React.useEffect(() => {
        if (_.isEmpty(loginUser)) return;
        registerUserSocket(loginUser);
        dispatch(getNotifications(loginUser._id || loginUser.id));
    }, [dispatch, isLoggedIn]);

    React.useEffect(() => {
        window.socket.on('notification', notification => {
            dispatch(addToNotificationList(notification));
        });
    }, [dispatch]);

    return (<Router />);
};

export default StartComponent;
