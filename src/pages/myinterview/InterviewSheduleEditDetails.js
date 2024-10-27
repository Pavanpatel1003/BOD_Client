import React from "react";

const InterviewSheduleEditDetails = () => {
  return (
    <>
      <div className="container-fluid table-format">
        {/* Button to trigger the modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#scheduleInterviewModal"
        >
          Open Schedule Interview Modal
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="scheduleInterviewModal"
          tabIndex="-1"
          aria-labelledby="scheduleInterviewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered custom-modal-width">
            {/* Centered modal */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="scheduleInterviewModalLabel">
                  Schedule Interview
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <form>
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-3">
                      <div className="col label-set">
                        <label htmlFor="projectName" className="form-label">
                          Project Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="projectName"
                          placeholder="Proj 1"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="requirement" className="form-label">
                          Requirement
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="requirement"
                          placeholder="Full Stack"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="candidateName" className="form-label">
                          Candidate Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="candidateName"
                          placeholder="React Node Guy"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="date" className="form-label">
                          Date
                        </label>
                        <input type="date" className="form-control" id="date" />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="time" className="form-label">
                          Time
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="time"
                          placeholder="Full Stack"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="zone" className="form-label">
                          Zone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zone"
                          placeholder="React Node Guy"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="meetingURL" className="form-label">
                          Meeting URL
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          id="meetingURL"
                          placeholder="Enter meeting URL"
                        />
                      </div>
                      <div className="col label-set">
                        <label htmlFor="note" className="form-label">
                          Note
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="note"
                          placeholder="Enter any note"
                        />
                      </div>
                    </div>
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="sendUpdates"
                      />
                      <label
                        className="form-check-label mx-3"
                        htmlFor="sendUpdates"
                      >
                        <span className="me-2">Send updates to partner</span>
                        <span className="exclaim">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </span>
                      </label>
                    </div>
                    <div className="edit-schedule-button">
                      <button
                        type="button"
                        className="skip-btn btn btn-secondary"
                      >
                        Skip
                      </button>
                      <button
                        type="submit"
                        className="schedule-btn btn btn-primary"
                      >
                        Schedule
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewSheduleEditDetails;
