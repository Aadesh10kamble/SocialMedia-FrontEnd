import React from 'react';
import { createTour } from '../actions/tour.actions';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from "../component/Loader";
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import {
    Typography,
    TextField,
    Container,
    Grid,
    Button
} from '@mui/material';


const CreateTourPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.isToursLoading);
    const [caption, setCaption] = React.useState('');
    const [images, setImages] = React.useState([]);
    const [imageUrl, setImageUrl] = React.useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const payload = { caption, images };
        dispatch(createTour(payload, navigate));
    };


    const onChangeImageHandler = (event) => {
        event.preventDefault();
        const images = [...event.target.files];
        const imageUrls = images.map(img => URL.createObjectURL(img));
        setImageUrl(imageUrls);
        setImages(images);
    };

    return (<ThemeProvider theme={theme}>
        <Container maxWidth='sm' sx={{ marginTop: '30px' }} component='form'
            encType='multipart/form-data'
            onSubmit={onSubmitHandler}>
            <Typography variant='h5'>
                Create Post
            </Typography >
            <Typography variant='body1' sx={{ marginTop: '20px' }}>
                Add a use Post.
            </Typography >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic"
                        fullWidth
                        label="Caption" value={caption} variant="standard"
                        onChange={(event) => setCaption(event.target.value)}
                        helperText='Caption for the post.' />
                </Grid>
                <Grid item xs={12}>
                    <label>
                        <input type='file' name='images'
                            onChange={onChangeImageHandler}
                            multiple style={{ display: 'none' }} />
                        <Button color='primary' component='span'>
                            Upload Images
                        </Button>
                    </label>
                    {!!imageUrl.length && <ImageList sx={{ width: 500, height: 260 }} cols={2} rowHeight={250}>
                        {!!imageUrl.length && imageUrl.map((image, index) =>
                            <ImageListItem key={index}>
                                <img src={image} alt={image} />
                            </ImageListItem>
                        )}
                    </ImageList>}
                </Grid>
            </Grid>
            <Button fullWidth
                type="submit" color='primary'
                variant="contained" sx={{ mt: '30px', mb: 2 }}
            >
                {isLoading ? (<LoaderComponent size='small' />) : 'Create Tour'}
            </Button>
        </Container>
    </ThemeProvider>);
};

export default CreateTourPage;