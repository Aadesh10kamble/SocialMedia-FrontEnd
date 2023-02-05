import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { getTours } from '../actions/tour.actions'
import { useParams } from 'react-router-dom';

const Filter = () => {
    const { type } = useParams ();
    const [price, setPrice] = React.useState(2000);
    const [people, setPeople] = React.useState(20);
    const [duration, setDuration] = React.useState(10);
    const [difficulty, setDifficulty] = React.useState({
        easy: false,
        medium: false,
        hard: false,
    });

    const dispatch = useDispatch();
    const difficultyHandler = (event) => {
        let { name } = event.target;
        setDifficulty(prevState => ({
            ...prevState, [name]: !prevState[name]
        }))
    };

    const onClickHandler = () => {
        const filter = {
            difficulty: Object.keys(difficulty).filter(diff => difficulty[diff]),
            price, people, duration
        };
        dispatch(getTours(type,filter));
    };

    return (
        <Box sx={{ width: 350, marginTop: '30px', marginLeft: '30px' }}>
            <Typography variant='h3' marginTop={'10px'}>
                Filters
            </Typography>
            <Typography id="input-slider" gutterBottom>
                Price
            </Typography>
            <Slider defaultValue={price}
                value={price}
                valueLabelDisplay="auto"
                onChange={(event) => setPrice(event.target.value)}
                step={50}
                min={100}
                max={2000}

            />
            <Typography id="input-slider" gutterBottom>
                Number of People
            </Typography>
            <Slider defaultValue={people}
                value={people}
                valueLabelDisplay="auto"
                onChange={(event) => setPeople(event.target.value)}
                step={5}
                min={2}
                max={20}

            />
            <Typography id="input-slider" gutterBottom>
                Duration
            </Typography>
            <Slider defaultValue={duration}
                value={duration}
                valueLabelDisplay="auto"
                onChange={(event) => setDuration(event.target.value)}
                step={5}
                min={2}
                max={10}

            />
            <Typography id="input-slider" gutterBottom>
                Difficulty
            </Typography>
            <FormControl sx={{ marginLeft: 3 }} component="fieldset" variant="standard">
                <FormGroup>
                    {Object.keys(difficulty).map((diff, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={difficulty.diff}
                                    onChange={difficultyHandler}
                                    name={diff} />
                            }
                            label={diff}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <Button
                onClick={onClickHandler}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Search
            </Button>
        </Box>
    )
}

export default Filter;