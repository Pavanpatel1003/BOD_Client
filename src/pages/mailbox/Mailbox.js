import React, { useState } from "react";
import letsiconsfilter from "../../assets/image/letsiconsfilter.png";

const Mailbox = () => {
    // State to track which notifications are new
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "A new candidate was added by BenchOnDemand LLP.",
            description:
                "Dear Akash BOD, a new candidate was added by BenchOnDemand LLP with skills React (6 years), Node.js (6 years).",
            date: "28 Jul 2024",
            isNew: true,
        },
        {
            id: 2,
            message: "A new candidate was added by BenchOnDemand LLP.",
            description:
                "Dear Akash BOD, a new candidate was added by BenchOnDemand LLP with skills React (6 years), Node.js (6 years).",
            date: "28 Jul 2024",
            isNew: true,
        },
    ]);

    // Function to mark a notification as "seen"
    const handleCheckNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, isNew: false }
                    : notification
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

            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="notification-card"
                    onClick={() => handleCheckNotification(notification.id)} // Mark notification as seen on click
                >
                    <div className="desc-date">
                        <div className="d-flex">
                            <div
                                className={`notification-icon ${notification.isNew ? "notification-icon-active" : ""
                                    }`}
                            >
                                <i className="fa-regular fa-bell"></i>
                            </div>
                            <div
                                className={`notification-card-details ${notification.isNew ? "new-notification-details" : ""
                                    }`}
                            >
                                <h5>{notification.message}</h5>
                                <p className="mb-0">{notification.description}</p>
                            </div>
                        </div>
                        <div className="date-text">{notification.date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Mailbox;

