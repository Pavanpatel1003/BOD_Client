import React, { useState, useEffect } from "react";
import letsiconsfilter from "../../assets/image/letsiconsfilter.png";
import { get } from '../../services/API';


const Notification = () => {


  const [notificationData, setNotificationData] = useState([])

  // useEffect(() => {
  //   get('/get/open-position-requirements').then((response) => {
  //     const notificationInfo = response.data;
  //     console.log('notificationData', notificationInfo);
  //     setNotificationData(notificationInfo.data)
  //   })
  // }, [])

  // Function to mark a notification as "seen"
  const handleCheckNotification = (id) => {
    setNotificationData((prevNotifications) =>
      prevNotifications.map((notifications) =>
        notifications.id === id
          ? { ...notifications, isNew: false }
          : notifications
      )
    );
  };

  return (
    <div className="container-fluid table-format">
      <div className="date-btn-set">
        <button className="date-btn">
          <span className="me-2">Date</span>
          <span>
            <img src={letsiconsfilter} alt="Filter Icon" />
          </span>
        </button>
      </div>

      {notificationData.map(notifications => (
        <div
          className="notification-card"
          onClick={() => handleCheckNotification(notifications.id)} // Mark notification as seen on click
        >
          <div className="desc-date">
            <div className="d-flex">
              <div
                className={`notification-icon ${notifications.isNew ? "notification-icon-active" : ""
                  }`}
              >
                <i className="fa-regular fa-bell"></i>
              </div>
              <div
                className={`notification-card-details ${notifications.isNew ? "new-notification-details" : ""
                  }`}
              >
                <h5>{notifications.message}</h5>
                <p className="mb-0">{notifications.description}</p>
              </div>
            </div>
            <div className="date-text">{notifications.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
