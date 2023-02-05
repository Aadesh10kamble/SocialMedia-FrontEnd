import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUserOnViewToDefault } from "../actions/auth.actions";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { followUser } from '../actions/auth.actions';
import { getProfilePicURL } from '../helper';
import _ from "underscore";

const UserPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { userOnView, isAuthLoading, loginUser } = useSelector(state => state);

    React.useEffect(() => {
        dispatch(getUser(userId));
        return () => dispatch(setUserOnViewToDefault());
    }, [dispatch, userId]);

    const onClickHandler = () => dispatch(followUser(userOnView.id || userOnView._id));
    const followButton = () => {
        if (_.isEmpty (loginUser)) return;
        const isCurrentUser = userOnView._id.toString() === loginUser._id.toString();
        const isAlreadyFollowing = userOnView.follower.includes(loginUser._id.toString());

        if (isCurrentUser) return;
        if (!isCurrentUser) {
            if (!isAlreadyFollowing) return (<Button variant="contained" color="primary" onClick={() => onClickHandler()}>Follow</Button>);
            else return (<Button variant="contained" color="secondary" onClick={() => onClickHandler()}>Unfollow</Button>)
        };
    };

    return <>
        {!isAuthLoading ? (!_.isEmpty(userOnView) ? (<Card sx={{ margin: 'auto', marginTop: '10px', maxWidth: '600px' }}>
            <CardActionArea >
                <CardMedia
                    component='img'
                    sx={{ height: '200px', width: 'auto', borderRadius: '50%', margin: 'auto' }}
                    src={getProfilePicURL(userOnView.profilePic)}
                />
                <CardContent>
                    <Stack direction='column' spacing={10}>
                        <Typography variant="h5" align="center" marginBottom={'30px'}>
                            {userOnView.firstName} {userOnView.lastName}
                        </Typography>
                        <Stack direction='row' spacing={4} sx={{ margin: 'auto!important' }}>
                            <Stack direction='column'>
                                <Typography variant="h6" align='center'>
                                    Following
                                </Typography>
                                <Typography variant="caption" align="center">
                                    {userOnView.following.length}
                                </Typography>
                            </Stack>
                            <Stack direction='column'>
                                <Typography variant="h6" align='center'>
                                    Follower
                                </Typography>
                                <Typography variant="caption" align="center">
                                    {userOnView.follower.length}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing sx={{ margin: 'auto' }}>
                {followButton()}
            </CardActions>
        </Card>) : <h1>ON USER FOUND.</h1>) : <CircularProgress size={40} sx={{ margin: 'auto' }} />}
    </>
};

export default UserPage;