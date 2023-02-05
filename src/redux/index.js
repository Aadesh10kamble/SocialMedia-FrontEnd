import { configureStore, createSlice } from "@reduxjs/toolkit";
import _ from "underscore";

const initialState = {
    loginUser: JSON.parse(localStorage.getItem('user')) || {},
    isLoggedIn : !!JSON.parse(localStorage.getItem('user')),
    isAuthLoading: false,
    isSnackBarOpen: false,
    message: '',
    severity: 'success',
    allTours: [],
    isToursLoading: false,
    tourOnView: {},
    notificationList: [],
    userOnView : {}
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTourOnView(state, action) {
            state.tourOnView = action.payload;
        },
        setIsLoggedIn (state,action) {
            state.isLoggedIn = action.payload;
        },
        toursLoading(state, action) {
            state.isToursLoading = action.payload;
        },
        getTours(state, action) {
            state.allTours = action.payload;
        },
        updateLoginUser(state, action) {
            if (action.payload) state.loginUser = action.payload;
        },
        loginUser(state, action) {
            state.loginUser = action.payload.user;
        },
        authLoader(state, action) {
            state.isAuthLoading = action.payload;
        },
        snackBar(state, action) {
            const { isOpen, message, severity } = action.payload;
            state.isSnackBarOpen = isOpen;
            state.message = message;
            if (severity) state.severity = severity;
        },
        addToNotificationList(state, action) {
            state.notificationList.unshift(action.payload);
        },
        setNotificationList (state,action) {
            state.notificationList = action.payload;
        },
        updateFollowerList(state, action) {
            const { userId, followerList } = action.payload;
            state.allTours.forEach(tour => {
                if (tour.user._id.toString () === userId) tour.user.follower = followerList;
            });
            if (!_.isEmpty (state.userOnView)) {
                if (state.userOnView._id.toString () === userId) state.userOnView.follower = followerList;
            }
        },
        setUserOnView (state,action) {
            state.userOnView = action.payload;
        }
    }
});

export const Actions = authReducer.actions;

const store = configureStore({
    reducer: authReducer.reducer
});

export default store;