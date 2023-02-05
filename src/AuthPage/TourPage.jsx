import React from "react";
import { useParams } from "react-router-dom";
import { getRequestedTour, setTourOnDefault } from "../actions/tour.actions";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { getImageURL } from "../helper";

const cardStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
    maxWidth: '600px!important',
    display: 'flex',
    flexDirection: 'column'
};

const TourPage = () => {
    const { tourId } = useParams();
    const dispatch = useDispatch();
    const tourOnView = useSelector(state => state.tourOnView);

    React.useEffect(() => {
        dispatch(getRequestedTour(tourId));
        return () => dispatch(setTourOnDefault());
    }, [dispatch, tourId]);

    return (<>
        {/* <NavBar /> */}
        {/* <Grid container  alignItems="center" justify="center"> */}
        <Card sx={cardStyle}>
            <Stack direction='row' spacing={2}>
                {!!tourOnView.images && (tourOnView.images.map((image, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        alt="green iguana"
                        height="400"
                        image={getImageURL (image)}
                    />
                )))}
            </Stack>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {tourOnView.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginTop: '10px' }}>
                    {tourOnView.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {!!tourOnView.comments && tourOnView.comments.map((comment, index) => (<Typography key={index}>
                    {comment.comment}
                </Typography>))}
            </CardActions>
        </Card>
        {/* </Grid> */}
    </>);
};

export default TourPage;