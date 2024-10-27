import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/image/logo.svg";
import toggle from "../assets/image/toggle.png";
import octicon_project from "../assets/image/octicon_project.png";
import fluent_people from "../assets/image/fluent_people.png";
import hugeicons_mail from "../assets/image/hugeicons_mail.png";
import carbon_user from "../assets/image/carbon_user.png";
import peopleCommunity from "../assets/image/peopleCommunity.png";
import tabler_arrow_back from "../assets/image/tabler_arrow_back.svg";

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <nav className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="position-sticky sidebar-content">
        <NavLink
          className="logo-set"
          to="/dashboard"
          onClick={onToggle}
          activeClassName="active"
        >
          <div className="">
            <img src={logo} alt="toggle" />
          </div>
        </NavLink>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link topbar-left"
              to="/dashboard"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={toggle} alt="toggle" />
              </div>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link topbar-left"
              to="/CurrentProject"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={octicon_project} alt="octicon_project" />
              </div>
              Project
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link topbar-left"
              to="/MyPartner"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={fluent_people} alt="fluent_people" />
              </div>
              My Partner
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link topbar-left"
              to="/Mailbox"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={hugeicons_mail} alt="hugeicons_mail" />
              </div>
              Mailbox
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link topbar-left"
              to="/MyInterview"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={carbon_user} alt="carbon_user" />
              </div>
              My Interview
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link topbar-left"
              to="/ShortlistCandidates"
              onClick={onToggle}
              activeClassName="active"
            >
              <div className="mx-2">
                <img src={peopleCommunity} alt="peopleCommunity" />
              </div>
              Shortlist Candidates
            </NavLink>
          </li>
        </ul>
        {/* Back button at the bottom */}
        <div className="sidebar-back-button">
          <button onClick={onToggle} className="back-button">
            <img src={tabler_arrow_back} /> Back</button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
