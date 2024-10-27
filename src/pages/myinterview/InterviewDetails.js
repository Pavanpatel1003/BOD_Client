import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBYID } from "../../services/API";
import moment from "moment";

const InterviewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [interviewDetails, setInterviewDetails] = useState({});

  const handleSheduleviewDetails = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  useEffect(() => {
    getBYID(`get/interview?id=`, id).then((response) => {
      const interviewDetails = response.data;
      if (interviewDetails?.data) {
        setInterviewDetails(interviewDetails.data);
      }
    });
  }, [id]);

  console.log("cProject/////////////////////", interviewDetails);
  return (
    <>
      <div className="container-fluid table-format">
        <div className="table-heading">
          <h5>Interview Details</h5>
        </div>

        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-2 g-lg-3">
          <div className="col">
            <div className="summary-card">
              <h6>Project Name</h6>
              <p>Project 2 C1 Vinesh</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Interview Date</h6>
              <p>
                {moment(Number(interviewDetails?.date)).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Interview Time</h6>
              <p>{interviewDetails?.time}</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Work Location</h6>
              <p>IND Banglore</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Work Location</h6>
              <p>IND Banglore</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Interview Skills</h6>
              <p>Node.js</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Experience Required</h6>
              <p>9</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Partner Updated</h6>
              <p>Yes</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Candidate Items</h6>
              <p>Amit</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Experience Required</h6>
              <p>9</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Employee Location</h6>
              <p>IND, Banglore</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Resource Skills</h6>
              <p>Node.js</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Interview status</h6>
              <p className="badge-ind">{interviewDetails?.interview_status}</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Meeting URL</h6>
              <p className="link-set">{interviewDetails?.meeting_url ? interviewDetails?.meeting_url : "-"}</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>
                Interview status
                <span className="scheduled">
                  <i className="fa-solid fa-calendar"></i>
                </span>
              </h6>
              <p className="badge-scheduled">Scheduled</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Meeting URL</h6>
              <p className="link-set">https://www.notion.co/</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Interview status</h6>
              <p className="badge-ind">
                <select className="form-select" id="interviewStatus">
                  <option selected>Shortlisted</option>
                  <option value="1">Scheduled</option>
                  <option value="2">Completed</option>
                  <option value="3">Rejected</option>
                </select>
                <button
                  className="interview-details-update"
                  onClick={() => handleSheduleviewDetails("/InterviewDetails")}
                >
                  Update Status
                </button>
              </p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Meeting URL</h6>
              <p className="link-set">https://www.notion.co/</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewDetails;
