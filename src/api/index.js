import axios from "axios";

const API = axios.create({ baseURL: "https://athletistan.herokuapp.com" });
const url = "https://athletistan.herokuapp.com/olympics";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
// abay yahan kuch ni hy no redux just axios se kiya
export const signIn = (formData) =>
  API.post("/routes/signin_api/signIn", formData);
export const coachsignUp = (formData) =>
  API.post("/routes/signin_api/coachsignUp", formData);
export const athletesignUp = (formData) =>
  API.post("/routes/signin_api/athletesignUp", formData);

export const resetpassword = (resetpass) =>
  API.post("/routes/dashboard/resetpassword", resetpass);
export const resetathletepassword = (resetpass) =>
  API.post("/routes/dashboard/resetathletepassword", resetpass);
export const updatemyprofdata = (resetprofile) =>
  API.post("/routes/dashboard/updatemyprofdata", resetprofile);
export const updateathleteprofdata = (resetprofile) =>
  API.post("/routes/dashboard/updateathleteprofdata", resetprofile);
export const Availabilityandfee = (mydetails) =>
  API.post("/routes/dashboard/availabilityandfee", mydetails);
export const report = (report) => API.post("/routes/dashboard/report", report);
export const evalform = (alldetails) =>
  API.post("/routes/dashboard/evalform", alldetails);
export const contactus = (details) =>
  API.post("/routes/home/contactus", details);
export const breaktherecord = (details) =>
  API.post("/routes/guinness/breaktherecordform", details);
export const addtraining = (alldetails) =>
  API.post("/routes/searchacoach/submittraining", alldetails);
export const addcustraining = (alldetails) =>
  API.post("/routes/searchacoach/submitcustraining", alldetails);

// export const getdetails = (email) =>
//   API.get("/routes/dashboard/getdetails", {
//     params: email,
//   });
