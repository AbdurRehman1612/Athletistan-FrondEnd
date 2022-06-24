import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./breaktherecord.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import validator from "validator";
import FileBase from "react-file-base64";
import "./navbar.css";
import { Breakrecord } from "../../../actions/guinness";

const Breaktherecord = () => {
  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/guinness/guinnesscatlist`)
      .then((resp) => {
        setguinnesscatname(resp.data);
      });
  }, []);

  let history = useHistory();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [wp, setwp] = useState(false);
  const [e, sete] = useState(false);
  const [err, seterr] = useState(false);

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailError("");
      sete(false);
    } else {
      setEmailError("Email is not valid");
      sete(true);
    }
  };

  const gdetails = {
    name: "",
    email: "",
    age: "",
    contact: "",
    country: "Pakistan",
    city: "",
    address: "",
    category: "",
    recordname: "",
    prevrecord: "",
    stime: "",
    etime: "",
    desc: "",
    video: "",
  };

  const [details, setdetails] = useState(gdetails);
  const [guinnesscatname, setguinnesscatname] = useState([]);

  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Breakrecord(details));
    alert(
      "Your information has been submitted. We will get back to you shortly!"
    );
  };

  const s = guinnesscatname.sort();

  return (
    <div>
      <body>
        <div
          className="container-fluid"
          style={{ backgroundColor: "rgb(0, 28, 51)" }}
        >
          <div className="row mh-100vh">
            <div
              className={`col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg_white ${styles.p_5}  my-5 my-lg-0`}
              id="login-block"
              style={{ marginLeft: "-15px" }}
            >
              <div className="m-auto w-lg-75 w-xl-50" style={{ width: "auto" }}>
                <h2
                  className="text-info fw-light mb-5"
                  style={{
                    textAlign: "center",
                    color: "rgb(13,104,240) !important",
                    fontWeight: "bold !important",
                    marginTop: "30px",
                  }}
                >
                  <strong>Guinness Applicant Form</strong>
                </h2>
                <form
                  style={{
                    width: "auto",
                  }}
                >
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Full Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={handleChange}
                        />
                        {details?.name !== "" && details?.name.length < 1 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Record name is required
                          </text>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          onChange={handleChange}
                        />
                        {details?.email !== "" ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            {emailerror}
                          </text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Age
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          name="age"
                          onChange={handleChange}
                        />

                        {details?.age !== "" && details?.age < 1 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Age is invalid
                          </text>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Contact Number
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          name="contact"
                          onChange={handleChange}
                        />
                        {details?.contact !== "" &&
                        details?.contact.length !== 11 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Contact number is invalid
                          </text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Country
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Pakistan"
                          disabled=""
                          readonly=""
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{
                            color: "#ffffff !important",
                            marginLeft: "6px",
                          }}
                        >
                          City
                        </label>
                        <br />
                        <Select
                          name="city"
                          label="City"
                          onChange={handleChange}
                          style={{
                            marginLeft: "5px",
                            height: "36px",
                            width: "308px",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Select The City
                          </MenuItem>
                          <MenuItem value="Islamabad">Islamabad</MenuItem>
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Punjab Cities
                          </MenuItem>
                          <MenuItem value="Ahmed Nager Chatha">
                            Ahmed Nager Chatha
                          </MenuItem>
                          <MenuItem value="Ahmadpur East">
                            Ahmadpur East
                          </MenuItem>
                          <MenuItem value="Ali Khan Abad">
                            Ali Khan Abad
                          </MenuItem>
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
                          <MenuItem value="Dera Ghazi Khan">
                            Dera Ghazi Khan
                          </MenuItem>
                          <MenuItem value="Dhaular">Dhaular</MenuItem>
                          <MenuItem value="Dina">Dina</MenuItem>
                          <MenuItem value="Dinga">Dinga</MenuItem>
                          <MenuItem value="Dipalpur">Dipalpur</MenuItem>
                          <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                          <MenuItem value="Ferozewala">Ferozewala</MenuItem>
                          <MenuItem value="Fateh Jhang">Fateh Jang</MenuItem>
                          <MenuItem value="Ghakhar Mandi">
                            Ghakhar Mandi
                          </MenuItem>
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
                          <MenuItem value="Karor Lal Esan">
                            Karor Lal Esan
                          </MenuItem>
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
                          <MenuItem value="Mandi Bahauddin">
                            Mandi Bahauddin
                          </MenuItem>
                          <MenuItem value="Mian Channu">Mian Channu</MenuItem>
                          <MenuItem value="Mianwali">Mianwali</MenuItem>
                          <MenuItem value="Multan">Multan</MenuItem>
                          <MenuItem value="Murree">Murree</MenuItem>
                          <MenuItem value="Muridke">Muridke</MenuItem>
                          <MenuItem value="Mianwali Bangla">
                            Mianwali Bangla
                          </MenuItem>
                          <MenuItem value="Muzaffargarh">Muzaffargarh</MenuItem>
                          <MenuItem value="Narowal">Narowal</MenuItem>
                          <MenuItem value="Nankana Sahib">
                            Nankana Sahib
                          </MenuItem>
                          <MenuItem value="Okara">Okara</MenuItem>
                          <MenuItem value="Renala Khurd">Renala Khurd</MenuItem>
                          <MenuItem value="Pakpattan">Pakpattan</MenuItem>
                          <MenuItem value="Pattoki">Pattoki</MenuItem>
                          <MenuItem value="Pir Mahal">Pir Mahal</MenuItem>
                          <MenuItem value="Qaimpur">Qaimpur</MenuItem>
                          <MenuItem value="Qila Didar Singh">
                            Qila Didar Singh
                          </MenuItem>
                          <MenuItem value="Rabwah">Rabwah</MenuItem>
                          <MenuItem value="Raiwind">Raiwind</MenuItem>
                          <MenuItem value="Rajanpur">Rajanpur</MenuItem>
                          <MenuItem value="Rahim Yar Khan">
                            Rahim Yar Khan
                          </MenuItem>
                          <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                          <MenuItem value="Sadiqabad">Sadiqabad</MenuItem>
                          <MenuItem value="Safdarabad">Safdarabad</MenuItem>
                          <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                          <MenuItem value="Sangla Hill">Sangla Hill</MenuItem>
                          <MenuItem value="Sarai Alamgir">
                            Sarai Alamgir
                          </MenuItem>
                          <MenuItem value="Sargodha">Sargodha</MenuItem>
                          <MenuItem value="Shakargarh">Shakargarh</MenuItem>
                          <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                          <MenuItem value="Sialkot">Sialkot</MenuItem>
                          <MenuItem value="Sohawa">Sohawa</MenuItem>
                          <MenuItem value="Soianwala">Soianwala</MenuItem>
                          <MenuItem value="Siranwali">Siranwali</MenuItem>
                          <MenuItem value="Talagang">Talagang</MenuItem>
                          <MenuItem value="Taxila">Taxila</MenuItem>
                          <MenuItem value="Toba Tek Singh">
                            Toba Tek Singh
                          </MenuItem>
                          <MenuItem value="Vehari">Vehari</MenuItem>
                          <MenuItem value="Wah Cantonment">
                            Wah Cantonment
                          </MenuItem>
                          <MenuItem value="Wazirabad">Wazirabad</MenuItem>
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
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
                          <MenuItem value="Naushahro Feroze">
                            Naushahro Feroze
                          </MenuItem>
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
                          <MenuItem value="Shahpur Chakar">
                            Shahpur Chakar
                          </MenuItem>
                          <MenuItem value="Shikarpaur">Shikarpaur</MenuItem>
                          <MenuItem value="Sukkur">Sukkur</MenuItem>
                          <MenuItem value="Tangwani">Tangwani</MenuItem>
                          <MenuItem value="Tando Adam Khan">
                            Tando Adam Khan
                          </MenuItem>
                          <MenuItem value="Tando Allahyar">
                            Tando Allahyar
                          </MenuItem>
                          <MenuItem value="Tando Muhammad Khan">
                            Tando Muhammad Khan
                          </MenuItem>
                          <MenuItem value="Thatta">Thatta</MenuItem>
                          <MenuItem value="Umerkot">Umerkot</MenuItem>
                          <MenuItem value="Warah">Warah</MenuItem>
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Khyber Cities
                          </MenuItem>
                          <MenuItem value="Abbottabad">Abbottabad</MenuItem>
                          <MenuItem value="Adezai">Adezai</MenuItem>
                          <MenuItem value="Alpuri">Alpuri</MenuItem>
                          <MenuItem value="Akora Khattak">
                            Akora Khattak
                          </MenuItem>
                          <MenuItem value="Ayubia">Ayubia</MenuItem>
                          <MenuItem value="Banda Daud Shah">
                            Banda Daud Shah
                          </MenuItem>
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
                          <MenuItem value="Dera Ismail Khan">
                            Dera Ismail Khan
                          </MenuItem>
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
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
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
                          <MenuItem value="Killa Abdullah">
                            Killa Abdullah
                          </MenuItem>
                          <MenuItem value="Killa Saifullah">
                            Killa Saifullah
                          </MenuItem>
                          <MenuItem value="Kohlu">Kohlu</MenuItem>
                          <MenuItem value="Lasbela">Lasbela</MenuItem>
                          <MenuItem value="Lehri">Lehri</MenuItem>
                          <MenuItem value="Loralai">Loralai</MenuItem>
                          <MenuItem value="Mastung">Mastung</MenuItem>
                          <MenuItem value="Musakhel">Musakhel</MenuItem>
                          <MenuItem value="Nasirabad">Nasirabad</MenuItem>
                          <MenuItem value="Nushki">Nushki</MenuItem>
                          <MenuItem value="Panjgur">Panjgur</MenuItem>
                          <MenuItem value="Pishin Valley">
                            Pishin Valley
                          </MenuItem>
                          <MenuItem value="Quetta">Quetta</MenuItem>
                          <MenuItem value="Sherani">Sherani</MenuItem>
                          <MenuItem value="Sibi">Sibi</MenuItem>
                          <MenuItem value="Sohbatpur">Sohbatpur</MenuItem>
                          <MenuItem value="Washuk">Washuk</MenuItem>
                          <MenuItem value="Zhob">Zhob</MenuItem>
                          <MenuItem value="Ziarat">Ziarat</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          placeholder=""
                          name="address"
                          onChange={handleChange}
                        ></textarea>
                        {details?.address !== "" &&
                        details?.address.length === 0 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Address is required
                          </text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Category
                        </label>
                        <br />
                        <Select
                          name="category"
                          onChange={handleChange}
                          style={{
                            height: "36px",
                            width: "305px",
                            backgroundColor: "#ffffff",
                            paddingRight: "8px",
                          }}
                        >
                          <MenuItem
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Select The Category
                          </MenuItem>
                          {s.map((names) => (
                            <MenuItem key={names} value={names}>
                              {names}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Guinness Record Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="recordname"
                          onChange={handleChange}
                        />
                        {details?.recordname !== "" &&
                        details?.recordname.length < 1 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Record name is required
                          </text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Previous Record
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="prevrecord"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col" style={{ marginTop: "10px" }}>
                      <div className="row" style={{ marginLeft: "50px" }}>
                        <div className="col">
                          <label
                            className="form-label d-xl-flex d-xxl-flex justify-content-xl-center justify-content-xxl-center"
                            style={{ color: "#ffffff" }}
                          >
                            Start Time
                          </label>
                          <form>
                            <div className="d-xl-flex justify-content-xl-center field">
                              <input
                                className={`${styles.form_control}`}
                                type="time"
                                name="stime"
                                onChange={handleChange}
                                style={{
                                  textAlign: "center",
                                  border: "0",
                                  background: "transparent",
                                  borderBottom: "1px solid silver",
                                  borderRadius: "0px !important",
                                  color: "rgb(255,255,255)",
                                  width: "100px",
                                }}
                              />
                            </div>
                          </form>
                        </div>
                        <div className="col">
                          <label
                            className="form-label d-xl-flex justify-content-xl-center"
                            style={{ color: "#ffffff" }}
                          >
                            End Time
                          </label>
                          <div className="d-xl-flex justify-content-xl-center field">
                            <input
                              className={`${styles.form_control}`}
                              type="time"
                              name="etime"
                              onChange={handleChange}
                              style={{
                                textAlign: "center",
                                border: "0",
                                background: "transparent",
                                borderBottom: "1px solid silver",
                                borderRadius: "0px !important",
                                color: "rgb(255,255,255)",
                                width: "100px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <div
                        className={`${styles.modern_form}__form-group--padding-t form-group mb-3`}
                        style={{ paddingTop: "20px" }}
                      >
                        <label
                          className="form-label text-secondary"
                          style={{ color: "#ffffff !important" }}
                        >
                          Write the details about the record that you want to
                          break.
                        </label>
                        <textarea
                          className="form-control"
                          placeholder=""
                          name="desc"
                          onChange={handleChange}
                        ></textarea>
                        {details?.desc !== "" && details?.desc.length < 1 ? (
                          <text
                            style={{
                              color: e ? "red" : null,
                            }}
                          >
                            Record details is required
                          </text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col">
                      <small
                        className="form-text text-muted d-xl-flex d-xxl-flex justify-content-xl-center justify-content-xxl-center"
                        style={{
                          fontSize: "16.8px",
                          height: "auto",
                          marginTop: "20px",
                          color: "#ffffff !important",
                          marginBottom: "0px",
                          marginLeft: "25px",
                          marginRight: "25px",
                        }}
                      >
                        Please&nbsp;share a video (max 2 mins) and describe how
                        will you able to break this
                      </small>
                      <small
                        className="form-text text-muted d-xl-flex d-xxl-flex justify-content-xl-center justify-content-xxl-center"
                        style={{
                          fontSize: "16.8px",
                          height: "auto",
                          marginTop: "-2px",
                          color: "#ffffff !important",
                          marginBottom: "0px",
                          marginLeft: "25px",
                          marginRight: "25px",
                        }}
                      >
                        record that help us to shortlist you and highlight your
                        ability.
                        <br />
                        <br />
                      </small>
                      <div style={{ marginTop: "0px" }}>
                        <div className="d-xl-flex justify-content-xl-center form-group mb-3">
                          <div className="col-sm-10">
                            <div
                              className="row mx-auto"
                              style={{ marginTop: "0px", width: "100%" }}
                            >
                              <div className="col">
                                <div
                                  className="mb-3"
                                  style={{ marginLeft: "190px" }}
                                >
                                  <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) =>
                                      setdetails({ ...details, video: base64 })
                                    }
                                  ></FileBase>
                                  <div>
                                    {/* <label
                            className="image-upload"
                            className="btn btn-primary btn-sm"
                          >
                            Change Picture
                          </label> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ width: "auto" }}>
                    <div className="col text-center">
                      <button
                        className="btn btn-primary sub-now"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ marginBottom: "80px" }}
                        disabled={
                          details?.name === "" ||
                          details?.email === "" ||
                          details?.age === "" ||
                          details?.age.length < 1 ||
                          details?.contact === "" ||
                          details?.category === "" ||
                          details?.contact.length !== 11 ||
                          details?.address === "" ||
                          details?.recordname === "" ||
                          details?.desc === ""
                            ? true
                            : false
                        }
                      >
                        Submit Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className={`col-lg-6 ${styles.d_flex} align-items-end`}
              id="bg-block"
              style={{
                backgroundImage: "url(/aldain-austria-316143-unsplash.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                marginLeft: "14px",
              }}
            ></div>
          </div>
        </div>
        <footer
          className="d-xl-flex justify-content-xl-center align-items-xl-center"
          style={{ height: "90px", background: "#001c33" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col d-xl-flex justify-content-xl-center align-items-xl-center"
                style={{ textAlign: "center" }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgb(133,135,150)",
                  }}
                >
                  Copyright&nbsp;© Athletistan 2022
                  <br />
                </span>
              </div>
              <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-twitter"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-facebook"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-instagram"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
              </div>
              <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
                <a
                  style={{
                    fontSize: "14.4px",
                    marginRight: "8px",
                    color: "rgb(250,184,34)",
                  }}
                >
                  Privacy Policy
                  <br />
                </a>
                <a
                  style={{
                    fontSize: "14.4px",
                    marginRight: "8px",
                    color: "rgb(250,184,34)",
                  }}
                >
                  Terms of Use
                  <br />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Breaktherecord;
