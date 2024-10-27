import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../components/Layout"; // Only used for authenticated routes
import Dashboard from "../pages/Dashboard";
import Openposition from "../pages/openPosition/OpenPosition";
import EligibleBenchCandidates from "../pages/openPosition/EligibleBenchCandidates";
import CurrentBenchinfo from "../pages/currentavailablebench/CurrentBenchinfo";
import UserDetails from "../pages/currentavailablebench/UserDetails";
import UpcomingProject from "../pages/upcomingproject/UpcomingProject";
import CurrentProject from "../pages/currentprojects/CurrentProject";
import CurrentProjectDetails from "../pages/currentprojects/ProjectDetails";
import AddRequirement from "../pages/currentprojects/AddRequirement";
import Project from "../pages/project/Project";
import MyPartner from "../pages/mypartner/MyPartner";
import Create from "../pages/mypartner/Create";
import PartnerDetails from "../pages/mypartner/PartnerDetails";
import Mailbox from "../pages/mailbox/Mailbox";
import MyInterview from "../pages/myinterview/MyInterview";
import InterviewDetails from "../pages/myinterview/InterviewDetails";
import InterviewSheduleEditDetails from "../pages/myinterview/InterviewSheduleEditDetails";
import InterviewSheduleDetails from "../pages/myinterview/InterviewSheduleDetails";
import ShortlistCandidates from "../pages/shortlistedcandidate/ShortlistCandidates";
import Notification from "../pages/notification/Notification";
import Login from "../pages/login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Redirect to Login if trying to access root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes wrapped in Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />{" "}
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Openposition"
          element={
            <PrivateRoute>
              <Layout>
                <Openposition />{" "}
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/EligibleBenchCandidates"
          element={
            <PrivateRoute>
              <Layout>
                <EligibleBenchCandidates />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/CurrentBenchinfo"
          element={
            <PrivateRoute>
              <Layout>
                <CurrentBenchinfo />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/UserDetails"
          element={
            <PrivateRoute>
              <Layout>
                <UserDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/UpcomingProject"
          element={
            <PrivateRoute>
              <Layout>
                <UpcomingProject />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/CurrentProject"
          element={
            <PrivateRoute>
              <Layout>
                <CurrentProject />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/CurrentProjectDetails/:id"
          element={
            <PrivateRoute>
              <Layout>
                <CurrentProjectDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/AddRequirement"
          element={
            <PrivateRoute>
              <Layout>
                <AddRequirement />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Project"
          element={
            <PrivateRoute>
              <Layout>
                <Project />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/MyPartner"
          element={
            <PrivateRoute>
              <Layout>
                <MyPartner />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/PartnerDetails/:id"
          element={
            <PrivateRoute>
              <Layout>
                <PartnerDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Create"
          element={
            <PrivateRoute>
              <Layout>
                <Create />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Mailbox"
          element={
            <PrivateRoute>
              <Layout>
                <Mailbox />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/MyInterview"
          element={
            <PrivateRoute>
              <Layout>
                <MyInterview />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/interviewdetails/:id"
          element={
            <PrivateRoute>
              <Layout>
                <InterviewDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/interviewsheduleeditdetails"
          element={
            <PrivateRoute>
              <Layout>
                <InterviewSheduleEditDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/InterviewSheduleDetails"
          element={
            <PrivateRoute>
              <Layout>
                <InterviewSheduleDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ShortlistCandidates"
          element={
            <PrivateRoute>
              <Layout>
                <ShortlistCandidates />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Notification"
          element={
            <PrivateRoute>
              <Layout>
                <Notification />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
