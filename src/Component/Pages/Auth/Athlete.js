import { React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import "react-phone-number-input/style.css";
import validator from "validator";
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
  accounttype: "Athlete",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  nic: "",
  dateofbirth: "",
  age: "",
  gender: "",
  contactno: "",
  address: "",
  country: "Pakistan",
  city: "",
  images: [],
  areaofinterestolympics: "",
  areaofinterestguinness: "",
  noofexp: "",
  desc: "",
};

const Athlete = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [olympicssportsname, setolympicssportsname] = useState([]);
  const [guinnesscatname, setguinnesscatname] = useState([]);
  const [imagename, setimagename] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/sportslist`)
      .then((res) => {
        console.log("olympics>", res.data);
        setolympicssportsname(res.data);
      });

    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/guinnesscatlist`)
      .then((resp) => {
        console.log("guinness>", resp.data);
        setguinnesscatname(resp.data);
      });

    {
      const arr = [];
      form.images.map((img) => {
        img.map((i) => {
          arr.push(i.name);
        });
        setimagename(arr);
      });
    }
  }, [form]);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const routelogin = () => {
    history.push("/login");
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [emailerror, setEmailError] = useState("");

  const [wp, setwp] = useState(false);
  const [e, sete] = useState(false);
  const mess = useSelector((state) => state.auth?.error);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(athletesignup(form, history));
    } else {
      dispatch(auth(form, history));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form?.password.length > 0) {
      validate(form?.password);
    }
    if (form?.email.length > 0) {
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

  const handleOnChange = (value) => {
    setForm({ ...form, contactno: value });
  };

  console.log("form:>> ", form);

  const noofexperience = [
    "Less than 1 year",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 10 years",
    "10 or more",
  ];

  // const selectCountry = (val) => {
  //   setForm({ ...form, country: val });
  // };

  // const selectRegion = (val) => {
  //   setForm({ ...form, city: val });
  // };

  const handleClick = () => {
    history.push("/coachsignup");
  };

  console.log("e", e);
  const s = guinnesscatname.sort();

  console.log("wp", wp);
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

            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
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

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {form?.password !== "" ? (
              <text
                style={{
                  color: wp ? "red" : "green",
                }}
              >
                {errorMessage}
              </text>
            ) : null}

            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
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
                  {form?.password !== form?.confirmPassword
                    ? "Password does not match"
                    : null}
                </text>
              </>
            )}

            {isSignup && (
              <Input
                style={{ marginTop: "8px" }}
                name="nic"
                label="CNIC e.g(42501xxxxxxxx)"
                handleChange={handleChange}
                type="number"
              />
            )}
            <div style={{ color: "red", marginLeft: "9px" }}>
              {form.nic.length > 13 ? <p>Invalid CNIC no</p> : ""}
            </div>

            {isSignup && (
              <FormControl className={classes.inputfield}>
                <FormLabel
                  style={{
                    marginLeft: "8px",
                    marginRight: "8px",
                    marginTop: "8px",
                  }}
                >
                  Gender*
                </FormLabel>
                <RadioGroup row name="gender" onChange={handleChange}>
                  <FormControlLabel
                    style={{
                      marginLeft: "8px",
                      marginBottom: "8px",
                      marginTop: "8px",
                    }}
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    style={{ marginBottom: "8px", marginTop: "8px" }}
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {isSignup && (
              <Input
                style={{ marginTop: "10px" }}
                class="birthdate"
                type="date"
                data-date-split-input="true"
                name="dateofbirth"
                handleChange={handleChange}
                half
              />
            )}
            {isSignup && (
              <Input
                label="Age"
                half
                type="number"
                name="age"
                handleChange={handleChange}
              />
            )}

            {isSignup && (
              <TextField
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "8px",
                }}
                fullWidth={true}
                name="address"
                label="Address*"
                onChange={handleChange}
                multiline
                rows={4}
              />
            )}

            {/* {isSignup && (
              <Input
                disabled
                style={{ marginTop: "8px" }}
                name="country"
                label="Country"
                value="Pakistan"
                handleChange={handleChange}
                half
              />
            )} */}
            {isSignup && (
              <TextField
                disabled
                style={{
                  marginTop: "16px",
                  width: 182,
                  marginLeft: "8px",
                  marginBottom: "8px",
                  color: "black",
                }}
                name="country"
                label="Country"
                value="Pakistan"
                handleChange={handleChange}
                half
              />
            )}
            {/* {isSignup && (
              <Input
                style={{ marginTop: "8px" }}
                name="city"
                label="City"
                handleChange={handleChange}
                half
              />
            )} */}

            {isSignup && (
              <FormControl style={{ minWidth: 182, marginTop: "-2px" }}>
                <InputLabel style={{ marginLeft: "8px", marginTop: "18px" }}>
                  City*
                </InputLabel>
                <Select
                  name="city"
                  label="City"
                  onChange={handleChange}
                  style={{ marginLeft: "8px", marginTop: "18px" }}
                >
                  <MenuItem value="" disabled style={{ fontWeight: "bold" }}>
                    Select The City
                  </MenuItem>
                  <MenuItem value="Islamabad">Islamabad</MenuItem>
                  <MenuItem value="" disabled style={{ fontWeight: "bold" }}>
                    Punjab Cities
                  </MenuItem>
                  <MenuItem value="Ahmed Nager Chatha">
                    Ahmed Nager Chatha
                  </MenuItem>
                  <MenuItem value="Ahmadpur East">Ahmadpur East</MenuItem>
                  <MenuItem value="Ali Khan Abad">Ali Khan Abad</MenuItem>
                  <MenuItem value="Alipur">Alipur</MenuItem>
                  <MenuItem value="Arifwala">Arifwala</MenuItem>
                  <MenuItem value="Attock">Attock</MenuItem>
                  <MenuItem value="Bhera">Bhera</MenuItem>
                  <MenuItem value="Bhalwal">Bhalwal</MenuItem>
                  <MenuItem value="Bahawalnagar">Bahawalnagar</MenuItem>
                  <MenuItem value="Bahawalpur">Bahawalpur</MenuItem>
                  <MenuItem value="Bhakkar">Bhakkar</MenuItem>
                  <MenuItem value="Burewala">Burewala</MenuItem>
                  <MenuItem value="Chillianwala">Chillianwala</MenuItem>
                  <MenuItem value="Chakwal">Chakwal</MenuItem>
                  <MenuItem value="Chichawatni">Chichawatni</MenuItem>
                  <MenuItem value="Chiniot">Chiniot</MenuItem>
                  <MenuItem value="Chishtian">Chishtian</MenuItem>
                  <MenuItem value="Daska">Daska</MenuItem>
                  <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                  <MenuItem value="Dera Ghazi Khan">Dera Ghazi Khan</MenuItem>
                  <MenuItem value="Dhaular">Dhaular</MenuItem>
                  <MenuItem value="Dina">Dina</MenuItem>
                  <MenuItem value="Dinga">Dinga</MenuItem>
                  <MenuItem value="Dipalpur">Dipalpur</MenuItem>
                  <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                  <MenuItem value="Ferozewala">Ferozewala</MenuItem>
                  <MenuItem value="Fateh Jhang">Fateh Jang</MenuItem>
                  <MenuItem value="Ghakhar Mandi">Ghakhar Mandi</MenuItem>
                  <MenuItem value="Gojra">Gojra</MenuItem>
                  <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                  <MenuItem value="Gujrat">Gujrat</MenuItem>
                  <MenuItem value="Gujar Khan">Gujar Khan</MenuItem>
                  <MenuItem value="Hafizabad">Hafizabad</MenuItem>
                  <MenuItem value="Haroonabad">Haroonabad</MenuItem>
                  <MenuItem value="Hasilpur">Hasilpur</MenuItem>
                  <MenuItem value="Haveli Lakha">Haveli Lakha</MenuItem>
                  <MenuItem value="Jatoi">Jatoi</MenuItem>
                  <MenuItem value="Jalalpur">Jalalpur</MenuItem>
                  <MenuItem value="Jattan">Jattan</MenuItem>
                  <MenuItem value="Jampur">Jampur</MenuItem>
                  <MenuItem value="Jaranwala">Jaranwala</MenuItem>
                  <MenuItem value="Jhang">Jhang</MenuItem>
                  <MenuItem value="Jhelum">Jhelum</MenuItem>
                  <MenuItem value="Kalabagh">Kalabagh</MenuItem>
                  <MenuItem value="Karor Lal Esan">Karor Lal Esan</MenuItem>
                  <MenuItem value="Kasur">Kasur</MenuItem>
                  <MenuItem value="Kamalia">Kamalia</MenuItem>
                  <MenuItem value="Kamoke">Kamoke</MenuItem>
                  <MenuItem value="Khanewal">Khanewal</MenuItem>
                  <MenuItem value="Khanpur">Khanpur</MenuItem>
                  <MenuItem value="Kharian">Kharian</MenuItem>
                  <MenuItem value="Khushab">Khushab</MenuItem>
                  <MenuItem value="Kot Addu">Kot Addu</MenuItem>
                  <MenuItem value="Jauharabad">Jauharabad</MenuItem>
                  <MenuItem value="Lahore">Lahore</MenuItem>
                  <MenuItem value="Lalamusa">Lalamusa</MenuItem>
                  <MenuItem value="Layyah">Layyah</MenuItem>
                  <MenuItem value="Liaquat Pur">Liaquat Pur</MenuItem>
                  <MenuItem value="Lodhran">Lodhran</MenuItem>
                  <MenuItem value="Malakwal">Malakwal</MenuItem>
                  <MenuItem value="Mamoori">Mamoori</MenuItem>
                  <MenuItem value="Mailsi">Mailsi</MenuItem>
                  <MenuItem value="Mandi Bahauddin">Mandi Bahauddin</MenuItem>
                  <MenuItem value="Mian Channu">Mian Channu</MenuItem>
                  <MenuItem value="Mianwali">Mianwali</MenuItem>
                  <MenuItem value="Multan">Multan</MenuItem>
                  <MenuItem value="Murree">Murree</MenuItem>
                  <MenuItem value="Muridke">Muridke</MenuItem>
                  <MenuItem value="Mianwali Bangla">Mianwali Bangla</MenuItem>
                  <MenuItem value="Muzaffargarh">Muzaffargarh</MenuItem>
                  <MenuItem value="Narowal">Narowal</MenuItem>
                  <MenuItem value="Nankana Sahib">Nankana Sahib</MenuItem>
                  <MenuItem value="Okara">Okara</MenuItem>
                  <MenuItem value="Renala Khurd">Renala Khurd</MenuItem>
                  <MenuItem value="Pakpattan">Pakpattan</MenuItem>
                  <MenuItem value="Pattoki">Pattoki</MenuItem>
                  <MenuItem value="Pir Mahal">Pir Mahal</MenuItem>
                  <MenuItem value="Qaimpur">Qaimpur</MenuItem>
                  <MenuItem value="Qila Didar Singh">Qila Didar Singh</MenuItem>
                  <MenuItem value="Rabwah">Rabwah</MenuItem>
                  <MenuItem value="Raiwind">Raiwind</MenuItem>
                  <MenuItem value="Rajanpur">Rajanpur</MenuItem>
                  <MenuItem value="Rahim Yar Khan">Rahim Yar Khan</MenuItem>
                  <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                  <MenuItem value="Sadiqabad">Sadiqabad</MenuItem>
                  <MenuItem value="Safdarabad">Safdarabad</MenuItem>
                  <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                  <MenuItem value="Sangla Hill">Sangla Hill</MenuItem>
                  <MenuItem value="Sarai Alamgir">Sarai Alamgir</MenuItem>
                  <MenuItem value="Sargodha">Sargodha</MenuItem>
                  <MenuItem value="Shakargarh">Shakargarh</MenuItem>
                  <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                  <MenuItem value="Sialkot">Sialkot</MenuItem>
                  <MenuItem value="Sohawa">Sohawa</MenuItem>
                  <MenuItem value="Soianwala">Soianwala</MenuItem>
                  <MenuItem value="Siranwali">Siranwali</MenuItem>
                  <MenuItem value="Talagang">Talagang</MenuItem>
                  <MenuItem value="Taxila">Taxila</MenuItem>
                  <MenuItem value="Toba Tek Singh">Toba Tek Singh</MenuItem>
                  <MenuItem value="Vehari">Vehari</MenuItem>
                  <MenuItem value="Wah Cantonment">Wah Cantonment</MenuItem>
                  <MenuItem value="Wazirabad">Wazirabad</MenuItem>
                  <MenuItem value="" disabled style={{ fontWeight: "bold" }}>
                    Sindh Cities
                  </MenuItem>
                  <MenuItem value="Badin">Badin</MenuItem>
                  <MenuItem value="Bhirkan">Bhirkan</MenuItem>
                  <MenuItem value="Rajo Khanani">Rajo Khanani</MenuItem>
                  <MenuItem value="Chak">Chak</MenuItem>
                  <MenuItem value="Dadu">Dadu</MenuItem>
                  <MenuItem value="Digri">Digri</MenuItem>
                  <MenuItem value="Diplo">Diplo</MenuItem>
                  <MenuItem value="Dokri">Dokri</MenuItem>
                  <MenuItem value="Ghotki">Ghotki</MenuItem>
                  <MenuItem value="Haala">Haala</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Islamkot">Islamkot</MenuItem>
                  <MenuItem value="Jacobabad">Jacobabad</MenuItem>
                  <MenuItem value="Jamshoro">Jamshoro</MenuItem>
                  <MenuItem value="Jungshahi">Jungshahi</MenuItem>
                  <MenuItem value="Kandhkot">Kandhkot</MenuItem>
                  <MenuItem value="Kandiaro">Kandiaro</MenuItem>
                  <MenuItem value="Karachi">Karachi</MenuItem>
                  <MenuItem value="Kashmore">Kashmore</MenuItem>
                  <MenuItem value="Keti Bandar">Keti Bandar</MenuItem>
                  <MenuItem value="Khairpur">Khairpur</MenuItem>
                  <MenuItem value="Kotri">Kotri</MenuItem>
                  <MenuItem value="Larkana">Larkana</MenuItem>
                  <MenuItem value="Matiari">Matiari</MenuItem>
                  <MenuItem value="Mehar">Mehar</MenuItem>
                  <MenuItem value="Mirpur Khas">Mirpur Khas</MenuItem>
                  <MenuItem value="Mithani">Mithani</MenuItem>
                  <MenuItem value="Mithi">Mithi</MenuItem>
                  <MenuItem value="Mehrabpur">Mehrabpur</MenuItem>
                  <MenuItem value="Moro">Moro</MenuItem>
                  <MenuItem value="Nagarparkar">Nagarparkar</MenuItem>
                  <MenuItem value="Naudero">Naudero</MenuItem>
                  <MenuItem value="Naushahro Feroze">Naushahro Feroze</MenuItem>
                  <MenuItem value="Naushara">Naushara</MenuItem>
                  <MenuItem value="Nawabshah">Nawabshah</MenuItem>
                  <MenuItem value="Nazimabad">Nazimabad</MenuItem>
                  <MenuItem value="Qambar">Qambar</MenuItem>
                  <MenuItem value="Qasimabad">Qasimabad</MenuItem>
                  <MenuItem value="Ranipur">Ranipur</MenuItem>
                  <MenuItem value="Ratodero">Ratodero</MenuItem>
                  <MenuItem value="Rohri">Rohri</MenuItem>
                  <MenuItem value="Sakrand">Sakrand</MenuItem>
                  <MenuItem value="Sanghar">Sanghar</MenuItem>
                  <MenuItem value="Shahbandar">Shahbandar</MenuItem>
                  <MenuItem value="Shahdadkot">Shahdadkot</MenuItem>
                  <MenuItem value="Shahdadpur">Shahdadpur</MenuItem>
                  <MenuItem value="Shahpur Chakar">Shahpur Chakar</MenuItem>
                  <MenuItem value="Shikarpaur">Shikarpaur</MenuItem>
                  <MenuItem value="Sukkur">Sukkur</MenuItem>
                  <MenuItem value="Tangwani">Tangwani</MenuItem>
                  <MenuItem value="Tando Adam Khan">Tando Adam Khan</MenuItem>
                  <MenuItem value="Tando Allahyar">Tando Allahyar</MenuItem>
                  <MenuItem value="Tando Muhammad Khan">
                    Tando Muhammad Khan
                  </MenuItem>
                  <MenuItem value="Thatta">Thatta</MenuItem>
                  <MenuItem value="Umerkot">Umerkot</MenuItem>
                  <MenuItem value="Warah">Warah</MenuItem>
                  <MenuItem value="" disabled style={{ fontWeight: "bold" }}>
                    Khyber Cities
                  </MenuItem>
                  <MenuItem value="Abbottabad">Abbottabad</MenuItem>
                  <MenuItem value="Adezai">Adezai</MenuItem>
                  <MenuItem value="Alpuri">Alpuri</MenuItem>
                  <MenuItem value="Akora Khattak">Akora Khattak</MenuItem>
                  <MenuItem value="Ayubia">Ayubia</MenuItem>
                  <MenuItem value="Banda Daud Shah">Banda Daud Shah</MenuItem>
                  <MenuItem value="Bannu">Bannu</MenuItem>
                  <MenuItem value="Batkhela">Batkhela</MenuItem>
                  <MenuItem value="Battagram">Battagram</MenuItem>
                  <MenuItem value="Birote">Birote</MenuItem>
                  <MenuItem value="Chakdara">Chakdara</MenuItem>
                  <MenuItem value="Charsadda">Charsadda</MenuItem>
                  <MenuItem value="Chitral">Chitral</MenuItem>
                  <MenuItem value="Daggar">Daggar</MenuItem>
                  <MenuItem value="Dargai">Dargai</MenuItem>
                  <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                  <MenuItem value="Dera Ismail Khan">Dera Ismail Khan</MenuItem>
                  <MenuItem value="Doaba">Doaba</MenuItem>
                  <MenuItem value="Dir">Dir</MenuItem>
                  <MenuItem value="Drosh">Drosh</MenuItem>
                  <MenuItem value="Hangu">Hangu</MenuItem>
                  <MenuItem value="Haripur">Haripur</MenuItem>
                  <MenuItem value="Karak">Karak</MenuItem>
                  <MenuItem value="Kohat">Kohat</MenuItem>
                  <MenuItem value="Kulachi">Kulachi</MenuItem>
                  <MenuItem value="Lakki Marwat">Lakki Marwat</MenuItem>
                  <MenuItem value="Latamber">Latamber</MenuItem>
                  <MenuItem value="Madyan">Madyan</MenuItem>
                  <MenuItem value="Mansehra">Mansehra</MenuItem>
                  <MenuItem value="Mardan">Mardan</MenuItem>
                  <MenuItem value="Mastuj">Mastuj</MenuItem>
                  <MenuItem value="Mingora">Mingora</MenuItem>
                  <MenuItem value="Nowshera">Nowshera</MenuItem>
                  <MenuItem value="Paharpur">Paharpur</MenuItem>
                  <MenuItem value="Pabbi">Pabbi</MenuItem>
                  <MenuItem value="Peshawar">Peshawar</MenuItem>
                  <MenuItem value="Saidu Sharif">Saidu Sharif</MenuItem>
                  <MenuItem value="Shorkot">Shorkot</MenuItem>
                  <MenuItem value="Shewa Adda">Shewa Adda</MenuItem>
                  <MenuItem value="Swabi">Swabi</MenuItem>
                  <MenuItem value="Swat">Swat</MenuItem>
                  <MenuItem value="Tangi">Tangi</MenuItem>
                  <MenuItem value="Tank">Tank</MenuItem>
                  <MenuItem value="Thall">Thall</MenuItem>
                  <MenuItem value="Timergara">Timergara</MenuItem>
                  <MenuItem value="Tordher">Tordher</MenuItem>
                  <MenuItem value="" disabled style={{ fontWeight: "bold" }}>
                    Balochistan Cities
                  </MenuItem>
                  <MenuItem value="Awaran">Awaran</MenuItem>
                  <MenuItem value="Barkhan">Barkhan</MenuItem>
                  <MenuItem value="Chagai">Chagai</MenuItem>
                  <MenuItem value="Dera Bugti">Dera Bugti</MenuItem>
                  <MenuItem value="Gwadar">Gwadar</MenuItem>
                  <MenuItem value="Harnai">Harnai</MenuItem>
                  <MenuItem value="Jafarabad">Jafarabad</MenuItem>
                  <MenuItem value="Jhal Magsi">Jhal Magsi</MenuItem>
                  <MenuItem value="Kacchi">Kacchi</MenuItem>
                  <MenuItem value="Kalat">Kalat</MenuItem>
                  <MenuItem value="Kech">Kech</MenuItem>
                  <MenuItem value="Kharan">Kharan</MenuItem>
                  <MenuItem value="Khuzdar">Khuzdar</MenuItem>
                  <MenuItem value="Killa Abdullah">Killa Abdullah</MenuItem>
                  <MenuItem value="Killa Saifullah">Killa Saifullah</MenuItem>
                  <MenuItem value="Kohlu">Kohlu</MenuItem>
                  <MenuItem value="Lasbela">Lasbela</MenuItem>
                  <MenuItem value="Lehri">Lehri</MenuItem>
                  <MenuItem value="Loralai">Loralai</MenuItem>
                  <MenuItem value="Mastung">Mastung</MenuItem>
                  <MenuItem value="Musakhel">Musakhel</MenuItem>
                  <MenuItem value="Nasirabad">Nasirabad</MenuItem>
                  <MenuItem value="Nushki">Nushki</MenuItem>
                  <MenuItem value="Panjgur">Panjgur</MenuItem>
                  <MenuItem value="Pishin Valley">Pishin Valley</MenuItem>
                  <MenuItem value="Quetta">Quetta</MenuItem>
                  <MenuItem value="Sherani">Sherani</MenuItem>
                  <MenuItem value="Sibi">Sibi</MenuItem>
                  <MenuItem value="Sohbatpur">Sohbatpur</MenuItem>
                  <MenuItem value="Washuk">Washuk</MenuItem>
                  <MenuItem value="Zhob">Zhob</MenuItem>
                  <MenuItem value="Ziarat">Ziarat</MenuItem>
                </Select>
              </FormControl>
            )}

            {isSignup && (
              <MuiPhoneNumber
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "8px",
                }}
                defaultCountry="pk"
                variant="outlined"
                fullWidth={true}
                onChange={handleOnChange}
              />
            )}

            {isSignup && (
              <TextField
                style={{
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "8px",
                }}
                fullWidth={true}
                name="desc"
                label="Describe Yourself*"
                onChange={handleChange}
                multiline
                rows={4}
              />
            )}

            {isSignup && (
              <FormControl style={{ minWidth: 373 }}>
                <InputLabel style={{ marginLeft: "8px", marginTop: "18px" }}>
                  Area of Interest (Olympics)*
                </InputLabel>
                <Select
                  name="areaofinterestolympics"
                  label="area of interest (Olympics)*"
                  onChange={handleChange}
                  style={{ marginLeft: "8px", marginTop: "20px" }}
                >
                  {olympicssportsname.map((names) => (
                    <MenuItem key={names} value={names}>
                      {names}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {isSignup && (
              <FormControl style={{ minWidth: 373 }}>
                <InputLabel style={{ marginLeft: "8px", marginTop: "18px" }}>
                  Area of Interest (Guinness)*
                </InputLabel>
                <Select
                  name="areaofinterestguinness"
                  label="area of interest (Guinness)*"
                  onChange={handleChange}
                  style={{ marginLeft: "8px", marginTop: "20px" }}
                >
                  {s.map((names) => (
                    <MenuItem key={names} value={names}>
                      {names}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {isSignup && (
              <FormControl style={{ minWidth: 373 }}>
                <InputLabel style={{ marginLeft: "8px", marginTop: "18px" }}>
                  Number of Experience*
                </InputLabel>
                <Select
                  name="noofexp"
                  label="Number of Experience"
                  onChange={handleChange}
                  style={{ marginLeft: "8px", marginTop: "20px" }}
                >
                  {noofexperience.map((exp) => (
                    <MenuItem key={exp} value={exp}>
                      {exp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          {mess ? (
            <text
              style={{ marginLeft: "12px", color: "red", marginTop: "8px" }}
            >
              <br /> {mess}
            </text>
          ) : null}
          <Button
            type="submit"
            disabled={
              form?.firstName === "" ||
              form?.lastName === "" ||
              form?.email === "" ||
              form?.password === "" ||
              form?.confirmPassword === "" ||
              form?.nic === "" ||
              form?.nic?.length !== 13 ||
              form?.dateofbirth === "" ||
              form?.age === "" ||
              form?.age === "" ||
              form?.gender === "" ||
              form?.contactno === "" ||
              form?.contactno?.length !== 15 ||
              form?.address === "" ||
              form?.country === "" ||
              form?.city === "" ||
              form?.areaofinterestolympics === "" ||
              form?.noofexp === "" ||
              form?.desc === "" ||
              e === true ||
              wp === true ||
              form?.password !== form?.confirmPassword
                ? true
                : false
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifycontent="center">
            <Grid item>
              <Button onClick={routelogin} style={{ color: "blue" }}>
                Already have an account? Sign in
              </Button>

              <Button
                onClick={handleClick}
                justifycontent="center"
                style={{ color: "blue" }}
              >
                {isSignup && "Register as Coach"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* <pre>{JSON.stringify(initialState.dateofbirth, null, 1)}</pre> */}
    </Container>
  );
};

export default Athlete;
