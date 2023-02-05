import React from "react";
import { Route, Routes, } from "react-router-dom";
import TourPage from "./TourPage";
import CreateTourPage from "./CreateTourPage";
import ProfilePage from "./profilePage";
import HomePage from "./HomePage";
import SignUpPage from "./signInPage";
import UserPage from "./UserPage";


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tour/:mode' element={<CreateTourPage />} />
            <Route path='/tour/view/:tourId' element={<TourPage />} />
            <Route path='/my-profile' element={<ProfilePage />} />
            <Route path='/tour/account/new' element={<SignUpPage />} />
            <Route path='/user/:userId' element={<UserPage />} />
        </Routes>)
};

export default Router;