import axios from "axios";
import { Actions } from "../redux/index";

export const getTours = (type, filters = {}) => {
    return (dispatch) => {
        dispatch(Actions.toursLoading(true));
        axios.get(`tour/`, { params: { ...filters, type } })
            .then(res => {
                if (!res.data.isSuccess) return;
                dispatch(Actions.getTours(res.data.data));
            })
            .catch(error => console.log(error))
            .finally(() => dispatch(Actions.toursLoading(false)))
    };
};

export const getRequestedTour = (tourId) => {
    return (dispatch) => {
        dispatch(Actions.toursLoading(true));
        axios.get(`/tour/${tourId}`)
            .then(res => {
                if (!res.data.isSuccess) return;
                dispatch(Actions.setTourOnView(res.data.data));
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.toursLoading(false)));
    };
};

export const createTour = (payload, navigate) => {
    const formData = new FormData ();
    formData.append ('caption',payload.caption);
    payload.images.forEach (img => formData.append ('images',img));
    
    return (dispatch) => {
        dispatch(Actions.toursLoading(true));
        axios.post(`/tour`, formData)
            .then((res) => {
                if (!res.data.isSuccess) return console.log('failed to create tour');
                console.log('tour created');
                navigate('/');
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(Actions.toursLoading(false)));
    };
};

export const setTourOnDefault = () => (dispatch) => dispatch(Actions.setTourOnView({}));

