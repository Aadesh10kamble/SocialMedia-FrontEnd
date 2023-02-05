import axios from "axios";
import { Actions } from "../redux/index";

export const signUp = (data, setMode) => {
    const payload = {
        firstName: data.firstName.value,
        lastName: data.lastName.value,
        email: data.email.value,
        password: data.password.value,
        confirmPassword: data.confirmPassword.value,
    };

    return (dispatch) => {
        dispatch(Actions.authLoader(true));
        axios.post(`/user/signup`, payload)
            .then(res => {
                if (!res.data.isSuccess) return dispatch(Actions.snackBar({
                    isOpen: true, message: res.data.error,
                    severity: 'error'
                }));
                dispatch(Actions.snackBar({
                    isOpen: true, message: res.data.message,
                    severity: 'success'
                }));
                setMode('login');
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.authLoader(false)));
    }
};

export const logIn = (data, navigate) => {
    const payload = {
        email: data.email.value,
        password: data.password.value
    };

    return (dispatch) => {
        dispatch(Actions.authLoader(true));
        axios.post(`/user/login`, payload)
            .then(res => {
                if (!res.data.isSuccess) return dispatch(Actions.snackBar({ isOpen: true, message: res.data.error, severity: 'error' }));
                dispatch(Actions.snackBar({ isOpen: true, message: res.data.message, severity: 'success' }));
                const { user, token } = res.data.data;
                dispatch(Actions.loginUser({ user, token }));
                dispatch (Actions.setIsLoggedIn (true));
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.authLoader(false)));
    }
};

export const logOut = () => (dispatch) => {
    dispatch(Actions.loginUser({ user: {} }));
    dispatch (Actions.setNotificationList ([]));
    dispatch (Actions.setIsLoggedIn (false));

    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const updateUserProfile = (payload) => {
    return (dispatch) => {
        dispatch(Actions.authLoader(true));
        axios.patch(`/user/profile`, payload)
            .then(res => {
                console.log(res.data);
                if (!res.data.isSuccess) return console.log('failed updating');
                dispatch(Actions.updateLoginUser(res.data.data));
                localStorage.setItem('user', JSON.stringify(res.data.data));
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.authLoader(false)));
    }
};

export const setUserWishlist = (tourId) => {
    return (dispatch) => {
        axios.post(`/tour/likedPosts/${tourId}`)
            .then(res => {
                if (!res.data.isSuccess) return console.log('failed to set likedPosts');
                dispatch(Actions.updateLoginUser(res.data.data));
                localStorage.setItem('user', JSON.stringify(res.data.data));
            })
            .catch(err => console.log(err));
    }
};

export const followUser = (userId) => {
    return (dispatch) => {
        axios.put(`/user/following/${userId}`)
            .then(res => {
                if (!res.data.isSuccess) throw new Error('failed to follow');
                dispatch(Actions.updateFollowerList(res.data.data))
                dispatch(Actions.snackBar({ isOpen: true, message: 'followed successfully.', severity: 'success' }))
            })
            .catch(err => console.log(err));
    }
};
export const getNotifications = (userId) => {
    return (dispatch) => {
        axios.get(`/notification/${userId}`)
            .then(res => {
                if (!res.data.isSuccess) throw new Error('failed to fetch notification');
                dispatch(Actions.setNotificationList(res.data.data));
            })
            .catch(err => console.log(err));
    }
};

export const getUser = (userId) => {
    return dispatch => {
        dispatch(Actions.authLoader(true));
        axios.get(`/user/${userId}`)
            .then(res => {
                if (!res.data.isSuccess) throw new Error('user not found.');
                dispatch(Actions.setUserOnView(res.data.data));
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.authLoader(false)));
    }
};

export const setUserOnViewToDefault = () => dispatch => dispatch (Actions.setUserOnView ({}));
export const addToNotificationList = notification => (dispatch) => dispatch(Actions.addToNotificationList(notification));
export const setSnackBarToDefault = () => (dispatch) => dispatch(Actions.snackBar({ isOpen: false, message: '' }));