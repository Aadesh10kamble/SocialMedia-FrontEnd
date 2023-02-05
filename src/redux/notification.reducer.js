import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationList : []
};

const notification = createSlice ({
    name : 'notification',
    initialState,
    reducers : {
        addToList (state,action) {
            state.notificationList.push (action.payload);
        }
    }
});

export const NotificationActions = notification.actions;
export const notificationReducer = notification.reducer;
