import { React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import "react-phone-number-input/style.css";
import TextField from "@mui/material/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FileBase64 from "react-file-base64";

// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";

import Icon from "./Icon";
import { auth, athletesignup } from "../../../actions/auth";
import { AUTH } from "../../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const mess = useSelector((state) => state.auth?.error);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup === false) {
      dispatch(auth(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClick = () => {
    history.push("/coachsignup");
  };
  const handleClick1 = () => {
    history.push("/athletesignup");
  };
  const handleClick2 = () => {
    history.push("/forgetpassword");
  };

  console.log("form", form);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        {/* <Avatar className={classes.avatar}></Avatar> */}
        <img src="/LogoFinal.png" width="280" height="280" />

        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <TextField
                style={{
                  marginLeft: "80px",
                  marginBottom: "8px",
                  fontStyle: "bold",
                }}
                id="outlined-read-only-input"
                label="Account Type"
                defaultValue="Athlete"
                InputProps={{
                  readOnly: true,
                }}
              />
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {mess ? (
              <text style={{ marginLeft: "8px", color: "red" }}>{mess}</text>
            ) : null}
          </Grid>
          <Button
            disabled={form.email === "" || form.password === "" ? true : false}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
            {/* {mess !== null ? alert(mess) : null} */}
          </Button>

          <Grid container justifycontent="center">
            <Grid item>
              <Button
                onClick={handleClick}
                justifycontent="center"
                style={{ color: "blue" }}
              >
                {isSignup ? null : "Register as Coach"}
              </Button>
              <br />
              <Button
                onClick={handleClick1}
                justifycontent="center"
                style={{ color: "blue" }}
              >
                {isSignup ? null : "Register as Athlete"}
              </Button>
              <br />
              <Button
                onClick={handleClick2}
                justifycontent="center"
                style={{ color: "blue" }}
              >
                {isSignup ? null : "Forget Password?"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* <pre>{JSON.stringify(initialState.dateofbirth, null, 1)}</pre> */}
    </Container>
  );
};

export default Login;
