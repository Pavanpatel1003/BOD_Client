import React from "react";

const InterviewSheduleDetails = () => {
  return (
    <>
      <div className="container-fluid table-format">
        <div className="table-heading">
          <h5>Schedule Interview</h5>
        </div>
        <form>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-3 label-set">
            <div className="col label-set">
              <label for="projectName" className="form-label">
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
              <label for="requirement" className="form-label">
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
              <label for="candidateName" className="form-label">
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
              <label for="date" className="form-label">
                Date
              </label>
              <input type="date" className="form-control" id="date" />
            </div>
            <div className="col label-set">
              <label for="time" className="form-label">
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
              <label for="zone" className="form-label">
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
              <label for="zone" className="form-label">
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
              <label for="meetingURL" className="form-label">
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
              <label for="note" className="form-label">
                Note
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter any note"
              />
            </div>
            <div className="col label-set">
              <label for="Employee Location" className="form-label">
                Employee Location
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter any note"
              />
            </div>
            <div className="col label-set">
              <label for="Resource Skills" className="form-label">
                Resource Skills
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter any note"
              />
            </div>
            <div className="col label-set">
              <label for="note" className="form-label">
                Note
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter any note"
              />
            </div>
            <div className="col label-set">
              <label for="note" className="form-label">
                Meeting URL
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter any note"
              />
            </div>
            <div className="col label-set">
              <label for="note" className="form-label">
                Interview Status
                <span className="scheduled ms-2">
                  <i className="fa-solid fa-calendar"></i>
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Scheduled"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewSheduleDetails;
