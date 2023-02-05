import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarToDefault } from '../actions/auth.actions';

const CustomizedSnackBar = () => {
    const dispatch = useDispatch();
    const { isSnackBarOpen, message, severity } = useSelector(state => state);
    const handleClose = () => dispatch(setSnackBarToDefault ());

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isSnackBarOpen}
            onClose={handleClose}
            autoHideDuration={6000}>
            <MuiAlert
                severity={severity}
                elevation={6}
                variant="filled"
                sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
};

export default CustomizedSnackBar;