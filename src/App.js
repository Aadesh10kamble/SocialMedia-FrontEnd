import React from "react";
import store from "./redux";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CustomizedSnackBar from "./component/SnackBar";
import NavBar from './component/NavBar';
import StartComponent from "./AuthPage/StartComponent";

function App() {

  return (
    <Provider store={store}>
      <CustomizedSnackBar />
      <CssBaseline />
      <BrowserRouter>
        < NavBar />
        <StartComponent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
