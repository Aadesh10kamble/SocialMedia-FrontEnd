import React from 'react';
import { getTours } from '../actions/tour.actions';
import { Stack, Container, CssBaseline, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setUserWishlist } from '../actions/auth.actions';
import { useDispatch, useSelector, } from 'react-redux';
import { followUser } from '../actions/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { descriptionLength, getImageURL, getProfilePicURL } from '../helper';
import Avatar from '@mui/material/Avatar';
import camera from '../assets/camera.png'
import '../css/homepage.css';
import _ from 'underscore';

const containerStyle = {
    justifyContent: 'center',
    maxWidth: '600px!important',
    display: 'flex',
    flexDirection: 'column',
};

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { type } = useParams();
    const { allTours, isToursLoading, loginUser } = useSelector(state => state);
    // const [user, setUser] = React.useState(loginUser);

    React.useEffect(() => {
        dispatch(getTours(type));
    }, [dispatch, type]);

    // React.useEffect(() => {
    //     const requiredUser = !_.isEmpty(loginUser) ? loginUser : JSON.parse(localStorage.getItem('user'));
    //     setUser(requiredUser);
    // }, [loginUser]);

    const wishListHandler = (tourId) => dispatch(setUserWishlist(tourId));
    const individualPostHandler = (tour) => navigate(`/tour/view/${tour._id}`);

    const noPostView = (
        <Container sx={{ ...containerStyle, marginTop: '100px' }} >
            <img src={camera} alt="camera" className='image-dimension' loading="lazy" />
            <Typography variant='h4' sx={{ margin: 'auto' }}>
                No post yet.
            </Typography>
        </Container>);

    const followButtonHandler = (tour) => {
        if (_.isEmpty(loginUser)) return '';

        const isCurrentUser = tour.user._id.toString() !== loginUser._id.toString();
        const isAlreadyFollowing = tour.user.follower.includes(loginUser._id.toString());

        if (isCurrentUser && !isAlreadyFollowing) return (<Button
            onClick={() => dispatch(followUser(tour.user.id || tour.user._id))}
            size='small'>
            Follow
        </Button>);
        else return '';
    };
    return (<>
        <CssBaseline />
        <Container sx={{ ...containerStyle, marginTop: '10px', marginBottom: '20px' }}>
            {!isToursLoading ? (!!allTours.length ? (allTours.map((tour, index) => (
                <Card key={index} sx={{ marginTop: '10px' }}>
                    <CardHeader
                        onClick={() => console.log("User")}
                        avatar={<Avatar aria-label="recipe"
                            component={Link}
                            to={`user/${tour.user._id}`}
                            alt={`${tour.user.firstName}`}
                            src={getProfilePicURL(tour.user.profilePic)}
                        />}
                        title={<Typography variant='h6'>{tour.user.firstName} {tour.user.lastName}</Typography>}
                        subheader={followButtonHandler(tour, index)}
                    />
                    <CardActionArea onClick={() => individualPostHandler(tour)}>
                        <CardMedia
                            component='img'
                            sx={{ height: '400px' }}
                            image={getImageURL(tour.images[0])}
                            title={tour.name}
                        />
                        <CardContent>
                            {descriptionLength(tour.caption)}
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing sx={{ mt: "auto" }}>
                        <Stack direction='row' spacing={2}>
                            <Stack direction='column'>
                                <IconButton aria-label="settings"
                                    onClick={() => wishListHandler(tour._id, index)}>
                                    {!_.isEmpty(loginUser) && (loginUser.likedPosts.includes(tour._id) ?
                                        <FavoriteIcon color='primary' /> :
                                        <FavoriteBorderIcon />)}
                                </IconButton>
                            </Stack>
                        </Stack>
                    </CardActions>
                </Card>))) : noPostView) : <CircularProgress size={40} sx={{margin : 'auto'}}/>}
        </Container>
    </>)
};

export default HomePage;