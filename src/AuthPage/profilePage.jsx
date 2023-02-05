import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import LoaderComponent from "../component/Loader";
import { updateUserProfile } from "../actions/auth.actions";
import { useNavigate } from 'react-router-dom';
import _ from 'underscore';
import {
    Typography,
    TextField,
    Container,
    Grid,
    Button,
    Avatar
} from '@mui/material';


const ProfilePage = () => {
    const navigate = useNavigate ();
    const dispatch = useDispatch();
    const { isAuthLoading,loginUser } = useSelector(state => state);
    const [firstName, setFirstName] = React.useState({ value: '', disabled: true });
    const [lastName, setLastName] = React.useState({ value: '', disabled: true });
    const [isPicDisabled, setPicDisabled] = React.useState(true);
    const [newImage, setNewImage] = React.useState(null);

    React.useEffect(() => {
        if (_.isEmpty (loginUser)) return navigate ('/tour/account/new');
        setFirstName(prevState => ({ ...prevState, value: loginUser.firstName }));
        setLastName(prevState => ({ ...prevState, value: loginUser.lastName }));
    }, [loginUser,navigate]);

    const profilePicHandler = (event) => setNewImage(event.target.files[0]);

    const onClickHandler = (event) => {
        event.preventDefault();
        const payload = new FormData();
        const user = JSON.parse(localStorage.getItem('user'));
        if (firstName !== user.firstName) payload.append('firstName', firstName.value);
        if (lastName !== user.lastName) payload.append('lastName', lastName.value);
        if (newImage) payload.append('profilePic', newImage);
        dispatch(updateUserProfile(payload));
    };

    return (<>
        <Container maxWidth='sm' sx={{ marginTop: '40px' }} component='form' encType="multipart/form-data">
            <Typography variant='h5'>
                Profile
            </Typography >
            <Grid container spacing={3} sx={{ marginTop: '30px' }}>
                <Grid item xs={12} >
                    <TextField id="outlined-basic"
                        fullWidth
                        disabled={firstName.disabled}
                        value={firstName.value} label="First Name" variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <EditIcon fontSize='small' onClick={() => setFirstName(prevState => ({ ...prevState, disabled: !prevState.disabled }))} />
                            </InputAdornment>,
                        }}
                        onChange={(event) => setFirstName(prevState => ({ ...prevState, value: event.target.value }))}
                        helperText='Enter the First name' />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic"
                        fullWidth
                        value={lastName.value} label="Last Name" variant="standard"
                        disabled={lastName.disabled}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <EditIcon fontSize='small' onClick={() => setLastName(prevState => ({ ...prevState, disabled: !prevState.disabled }))} />
                            </InputAdornment>,
                        }}
                        onChange={(event) => setLastName(prevState => ({ ...prevState, value: event.target.value }))}
                        helperText='Enter the last name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic"
                        fullWidth
                        type='file'
                        variant="outlined"
                        disabled={isPicDisabled}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <EditIcon fontSize='small' onClick={() => setPicDisabled(prevState => !prevState)} />
                            </InputAdornment>,
                        }}
                        onChange={profilePicHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Avatar src={newImage === null ? "http://localhost:8000/profilePic/loginUser.profilePic" : URL.createObjectURL(newImage)}
                        sx={{ width: 56, height: 56 }}
                    />
                </Grid>
            </Grid>
            <Button fullWidth
                type="submit" color='primary'
                variant="contained" sx={{ mt: 10, mb: 2 }}
                onClick={onClickHandler}
            >
                {isAuthLoading ? (<LoaderComponent size='small' />) : 'Update Profile'}
            </Button>
        </Container>
    </>);
};

export default ProfilePage;