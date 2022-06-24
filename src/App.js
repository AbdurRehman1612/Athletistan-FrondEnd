import "./App.css";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./Component/Pages/Home/Home";
import Searchacoach from "./Component/Pages/SearchCoach/searchacoach";
import guinnesscategories from "./Component/Pages/Guinness/guinnesscategories";
import categoryrecords from "./Component/Pages/Guinness/categoryrecords";
import recorddetails from "./Component/Pages/Guinness/recorddetails";
import olympicsdetails from "./Component/Pages/Olympics/olympicsdetails";
import historyolympics from "./Component/Pages/Olympics/historyolympics";
import Dashboard from "./Component/Pages/Dashboard/dashboard";
import MyAthlete from "./Component/Pages/Dashboard/myathletes";
import MyProfile from "./Component/Pages/Dashboard/myprofile";
import availabilityandfee from "./Component/Pages/Dashboard/availabilityandfee";
import testimonials from "./Component/Pages/Dashboard/testimonials";
import myschedule from "./Component/Pages/Dashboard/myschedule";
import evaluationform from "./Component/Pages/Dashboard/evaluationform";
import athleteprofile from "./Component/Pages/Dashboard/athleteprofile";
import report from "./Component/Pages/Dashboard/report";
import requests from "./Component/Pages/Dashboard/requests";
import scheduleathlete from "./Component/Pages/Dashboard/scheduleathlete";
import athleteevaluation from "./Component/Pages/Dashboard/athleteevaluation";
import Login from "./Component/Pages/Auth/Login";
import CoachSignup from "./Component/Pages/Auth/Coach";
import AthleteSignup from "./Component/Pages/Auth/Athlete";
import breaktherecord from "./Component/Pages/Guinness/breaktherecord";
import ForgetPassword from "./Component/Pages/Auth/forgetpassword";
import Olympics from "./Component/Pages/Olympics/olympics";
import POA from "./Component/Pages/POA/poa";
import { getauth } from "./actions/auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const isLoading = useSelector((state) => state.auth?.loading);
  const l = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getauth(l));
  }, [dispatch]);
  `App.js l`, l?.token;
  if (isLoading) {
    return null;
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/forgetpassword/:id/:token" component={ForgetPassword} />
        <Route path="/categoryrecords/:catname" component={categoryrecords} />
        <Route path="/recorddetails/:who" component={recorddetails} />
        <Route path="/olympicsdetails/:name" component={olympicsdetails} />
        <Route path="/olympics" component={Olympics} />
        <Route path="/athleterequests" component={requests} />
        <Route path="/historyolympics" component={historyolympics} />
        <Route path="/coachsignup" component={CoachSignup} />
        <Route path="/guinnesscategories" component={guinnesscategories} />
        <Route path="/breaktherecord" component={breaktherecord} />
        <Route path="/athletesignup" component={AthleteSignup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/myathlete" component={MyAthlete} />
        <Route path="/myprofile" component={MyProfile} />
        <Route path="/availabilityandfee" component={availabilityandfee} />
        <Route path="/requests" component={testimonials} />
        <Route path="/myschedule" component={myschedule} />
        <Route path="/evaluationform" component={evaluationform} />
        <Route path="/athleteevaluation" component={athleteevaluation} />
        <Route path="/athleteprofile" component={athleteprofile} />
        <Route path="/scheduleathlete" component={scheduleathlete} />
        <Route path="/searchacoach" component={Searchacoach} />
        <Route path="/poa" component={POA} />
        <Route path="/report" component={report} />
      </Switch>
    </Router>
  );
}

export default App;
