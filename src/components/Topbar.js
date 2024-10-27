import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import dashboard from "../assets/image/dashboard.svg";
import tabler_arrow_back from "../assets/image/tabler_arrow_back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { get } from "../services/API";
import { useDispatch, useSelector } from "react-redux";
import { setAuthLogin } from "../redux/reducers/isAuth";
import { toast } from "react-toastify";

const Topbar = ({ onToggleSidebar, title, folderStructure }) => {
  const currentDate = format(new Date(), "dd MMM yyyy");
  const { logData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
    navigate("/Mailbox");
  };

  const renderLeftIcon = () => {
    if (location.pathname === "/dashboard") {
      return (
        <img
          src={dashboard}
          alt="Home"
          className="me-2 dashboard-icon"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else {
      return (
        <button className="back-light me-2" onClick={() => navigate(-1)}>
          <img
            src={tabler_arrow_back}
            alt="Back"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
      );
    }
  };

  useEffect(() => {
    get("/get/partners", {
      partner_id: "f71050d7-3bbb-40ac-bbea-7fb0adf5cbde",
    }).then((response) => {
      const notificationInfo = response.data;
      setNotificationCount(notificationInfo.count || 0);
    });
  }, []);

  const handleLogOut = () => {
    toast.success("LogOut Successful.");
    dispatch(setAuthLogin({ isLogIn: false, data: {} }));
    navigate("/login");
  };

  return (
    <nav className="topbar">
      <div className="topbar-wrap">
        <button
          className="btn btn-dark toggle-btn"
          type="button"
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <div className="topbar-left">
          {renderLeftIcon()}
          <span className="navbar-brand">{title}</span>
        </div>
        <div className="topbar-right">
          <button className="btn btn-light">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="calendar-date ms-2">{currentDate}</span>
          </button>
          <button className="btn btn-light" onClick={handleNotificationClick}>
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsIcon />
            </Badge>
          </button>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle topbar-right-dropdown"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="profile-avatar">AP</div>
              <div className="me-2">
                <div className="person-top">{logData?.name}</div>
                <div className="person-top-down">{logData?.role}</div>
              </div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li
                onClick={handleLogOut}
                className="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conditionally render folder structure */}
      {location.pathname !== "/dashboard" && folderStructure.length > 0 && (
        <div className="folder-set">
          <nav>
            <ol className="breadcrumb">
              {folderStructure.map((folder, index) => (
                <li className="breadcrumb-item" key={index}>
                  <span className="me-2">
                    <i className="fa-regular fa-folder"></i>
                  </span>
                  {index === folderStructure.length - 1 ? (
                    <span>{folder}</span>
                  ) : (
                    <Link to={folder.path}>{folder}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
