import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("dashboard");
  const [folderStructure, setFolderStructure] = useState([]);

  // Update title and folder structure based on the current path
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    if (currentPath === "/dashboard") {
      setPageTitle("dashboard");
      setFolderStructure([]);  // No breadcrumb for Dashboard
    } else {
      setPageTitle(getTitleFromPath(currentPath));
      setFolderStructure(getBreadcrumbFromPath(currentPath));
    }
  }, [location.pathname]);

  // Get the page title based on the current path
  const getTitleFromPath = (path) => {
    if (path.startsWith("/userdetails")) return "User Details";
    if (path.startsWith("/projectdetails")) return "Project Details";
    if (path.startsWith("/addrequirement")) return "Add Requirement";
    if (path.startsWith("/currentprojectdetails")) return "Current Project";
    if (path.startsWith("/interviewdetails")) return "Interview Details";
    if (path.startsWith("/EligibleBenchCandidates")) return "Open Positions";

    switch (path) {
      case "/openposition": return "Open Positions";
      case "/currentbenchinfo": return "Current Bench Information";
      case "/currentproject": return "Current Project";
      case "/upcomingproject": return "Upcoming Projects";
      case "/project": return "Project";
      case "/mypartner": return "My Partner";
      case "/mailbox": return "Mailbox";
      case "/myinterview": return "My Interviews";
      case "/shortlistcandidates": return "Shortlisted Candidates";
      case "/EligibleBenchCandidates": return "Shortlisted Candidates";
      default: return "Dashboard";
    }
  };

  // Get the breadcrumb path based on the current route
  const getBreadcrumbFromPath = (path) => {
    if (path.startsWith("/userdetails")) return ["Home", "Current Bench Information", "User Details"];
    if (path.startsWith("/projectdetails")) return ["Home", "Current Project", "Project Details"];
    if (path.startsWith("/currentprojectdetails")) return ["Home", "Current Project", "Details"];
    if (path.startsWith("/addrequirement")) return ["Home", "Current Project", "Details", "Add Requirement"];
    if (path.startsWith("/interviewdetails")) return ["Home", "My Interviews", "Details"];
    if (path.startsWith("/EligibleBenchCandidates")) return ["Home", "Open Position", "Eligible Bench Candidates"];

    switch (path) {
      case "/openposition": return ["Home", "Open Positions"];
      case "/currentbenchinfo": return ["Home", "Current Bench Information"];
      case "/currentproject": return ["Home", "Current Project"];
      case "/upcomingproject": return ["Home", "Upcoming Projects"];
      case "/project": return ["Home", "Project"];
      case "/mypartner": return ["Home", "My Partner"];
      case "/mailbox": return ["Home", "Mailbox"];
      case "/myinterview": return ["Home", "My Interviews"];
      case "/shortlistcandidates": return ["Home", "Shortlisted Candidates"];
      case "/EligibleBenchCandidates": return ["Home", "Shortlisted Candidates"];
      default: return [];
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Topbar
        onToggleSidebar={handleToggleSidebar}
        title={pageTitle}
        folderStructure={folderStructure}
      />
      <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
