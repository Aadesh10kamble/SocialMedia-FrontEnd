import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoaderComponent from "../component/Loader";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { splitWord } from "../helper";
import { signUpForm, logInForm } from "../forms";
import { signUp, logIn } from "../actions/auth.actions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const customStyle = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const customContainer = {
  backgroundColor: '#84ef94',
  borderRadius: '15px',
};

const customAvatar = {
  m: 1,
  bgcolor: "#84ef94",
  color: 'black',
  width: 56, height: 56
};

const buttonDisability = (fields) => {
  for (let field of Object.keys(fields)) {
    if (fields[field].isEmpty) return true;
  }
};

const SignUp = () => {
  const [mode, setMode] = React.useState("login");
  const [loginCred, setLoginCred] = React.useState(signUpForm);
  const isLoading = useSelector(state => state.isAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (mode === 'login') return setLoginCred(logInForm);
    setLoginCred(signUpForm);
  }, [mode]);

  const linkHandler = () => mode === "login" ? setMode("signUp") : setMode("login");
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginCred((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value, isEmpty: !value },
    }));
  };

  const onBlurHandler = (event) => {
    const { name } = event.target;
    setLoginCred((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isTouched: true },
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (mode === "login") return dispatch(logIn(loginCred, navigate));
    dispatch(signUp(loginCred, setMode));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={customContainer} >
        <CssBaseline />
        <Box sx={customStyle} >
          <Avatar sx={customAvatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === "login" ? "Log In" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {Object.keys(loginCred).map((field, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  sm={field.includes("Name") ? 6 : 12}
                >
                  <TextField
                    variant="standard" value={loginCred[field].value}
                    onChange={onChangeHandler} onBlur={onBlurHandler}
                    error={
                      loginCred[field].isEmpty && loginCred[field].isTouched
                    }
                    name={field}
                    fullWidth
                    type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                    helperText={
                      loginCred[field].isEmpty &&
                      loginCred[field].isTouched &&
                      `${splitWord(field)} required`
                    }
                    label={splitWord(field)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              disabled={buttonDisability(loginCred)}
              fullWidth
              color='secondary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!isLoading ? (mode === "login" ? "Log In" : "Sign Up") : <LoaderComponent size='small' />}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ paddingBottom: '10px' }}>
                <Link onClick={linkHandler} variant="body2" >
                  {mode === "login"
                    ? "Already have an account? Login in"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;