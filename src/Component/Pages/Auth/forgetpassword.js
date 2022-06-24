import { React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

// import { GoogleLogin } from "react-google-login";
// import "react-phone-number-input/style.css";
// import TextField from "@mui/material/TextField";
// import MuiPhoneNumber from "material-ui-phone-number";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

// import FileBase64 from "react-file-base64";

// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";
import validator from "validator";
import Icon from "./Icon";
import { forgetpassword } from "../../../actions/auth";
import { AUTH } from "../../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  email: "",
  newpass: "",
  retypenewpass: "",
};
const ForgetPassword = ({ match }) => {
  const mess = useSelector((state) => state.auth?.error);
  const [form, setForm] = useState(initialState);
  //   const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fp, setfp] = useState(false);
  const params = useParams();
  // const [showPassword, setShowPassword] = useState(false);
  // const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [emailerror, setEmailError] = useState("");
  const [e, sete] = useState(false);
  const [wp, setwp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const switchMode = () => {
  //   setForm(initialState);

  //   setShowPassword(false);
  // };

  useEffect(() => {
    async function verifyToken() {
      try {
        await axios.post(
          `https://athletistan.herokuapp.com/routes/signin_api/verify-token`,
          {
            token: params.token,
            id: params.id,
          }
        );
        setIsLoading(false);
        setfp(true);
      } catch (error) {
        history.push("/login");
      }
    }

    if (match.params.id) {
      verifyToken();
    }
  }, []);

  console.log("hhhhhhhhhhhhhhhhhhh", params);
  // const [showPassword, setShowPassword] = useState(false);
  // const handleShowPassword = () => setShowPassword(!showPassword);

  // const switchMode = () => {
  //   setForm(initialState);

  //   setShowPassword(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fp) {
      await axios.post(
        `https://athletistan.herokuapp.com/routes/signin_api/newpassword`,
        {
          form: { ...form, id: match.params.id },
        }
      );
      alert("Password changed successfully!");
      history.push("/login");
    } else {
      await axios.post(
        `https://athletistan.herokuapp.com/routes/signin_api/forgetpassword`,
        {
          form,
        }
      );
      alert("Email for reset password has been sent successfully!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form?.newpass?.length > 0) {
      validate(form?.newpass);
    }
    if (form?.email?.length > 0) {
      validateEmail(form?.email);
    }
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailError("");
      sete(false);
    } else {
      setEmailError("Email is not valid");
      sete(true);
    }
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Strong Password");
      setwp(false);
    } else {
      setErrorMessage(
        "Weak Password (Must contain capital and small letters with a number and a symbol)"
      );
      setwp(true);
    }
  };

  const handleClick = () => {
    history.push("/login");
  };
  const handleClick1 = () => {
    setfp(false);
  };
  //   const handleClick1 = () => {
  //     history.push("/athletesignup");
  //   };

  console.log("form", form);

  if (fp) {
    if (isLoading) {
      return null;
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <img src="/LogoFinal.png" width="280" height="280" />

        <Typography component="h1" variant="h5">
          {fp ? "New Password" : "Forget Password?"}
        </Typography>
        <br />
        <p style={{ fontSize: "18px" }}>
          {fp
            ? "Please create a new password"
            : "Please enter you email address"}
        </p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fp && (
              <>
                <Input
                  name="newpass"
                  label="Password"
                  type="password"
                  handleChange={handleChange}
                  // type={showPassword ? "text" : "password"}
                  // handleShowPassword={handleShowPassword}
                />

                {form?.newpass !== "" ? (
                  <text
                    style={{
                      color: wp ? "red" : "green",
                      marginLeft: "10px",
                    }}
                  >
                    {errorMessage}
                  </text>
                ) : null}

                <Input
                  name="retypenewpass"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />

                <text
                  style={{
                    marginLeft: "8px",
                    marginRight: "8px",
                    marginTop: "8px",
                    color: "red",
                  }}
                >
                  {form?.newpass !== form?.retypenewpass
                    ? "Password does not match"
                    : null}
                </text>
              </>
            )}

            {!fp && (
              <>
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
                {form?.email !== "" ? (
                  <text
                    style={{
                      color: e ? "red" : null,
                      marginLeft: "8px",
                    }}
                  >
                    {emailerror}
                  </text>
                ) : null}
              </>
            )}
          </Grid>
          <Button
            disabled={wp === true || e === true ? true : false}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ marginLeft: "130px", width: "100px" }}
          >
            {fp ? "Save" : "Done"}
          </Button>

          <Grid container justifycontent="center">
            <Grid item>
              {fp ? (
                <>
                  <Button
                    onClick={handleClick1}
                    justifycontent="center"
                    style={{ color: "blue", marginLeft: "50px" }}
                  >
                    Go back to forget password
                  </Button>
                </>
              ) : null}

              <Button
                onClick={handleClick}
                justifycontent="center"
                style={{ color: "blue", marginLeft: "80px" }}
              >
                Go back to login page
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* <pre>{JSON.stringify(initialState.dateofbirth, null, 1)}</pre> */}
    </Container>
  );
};

export default ForgetPassword;
