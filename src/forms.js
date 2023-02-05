export const signUpForm = {
    firstName: { value: "", isEmpty: true, isTouched: false },
    lastName: { value: "", isEmpty: true, isTouched: false },
    email: { value: "", isEmpty: true, isTouched: false },
    password: { value: "", isEmpty: true, isTouched: false },
    confirmPassword: { value: "", isEmpty: true, isTouched: false },
};

export const logInForm = {
    email: { value: "", isEmpty: true, isTouched: false },
    password: { value: "", isEmpty: true, isTouched: false },
};

export const sliderState = {
    price: { value: 2000, min: 2000, step: 50 },
    people: { value: 20, min: 2, step: 2 },
    rating: { value: 5, min: 1, step: 1 }, duration: { value: 15, min: 1, step: 1 }
};

export const difficultyState = {
    easy: false,
    medium: false,
    hard: false,
};

export const tourDetails = {
    title : {value : ''},
    description : {value : ''},
    price : {value : 100},
    maxGroupSize : {value : 3},
    duration : {value : 1},
}